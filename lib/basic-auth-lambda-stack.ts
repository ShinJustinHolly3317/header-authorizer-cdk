import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaAuthorizer, HttpLambdaResponseType } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

export class BasicAuthLambdaStack extends Stack {
  public readonly hcEndpoint: cdk.CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const basicAuthHandler = new lambda.Function(this, 'basicAuthHalder', {
      functionName: 'basic-auth-handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('build/basic-auth'),
      handler: 'index.handler',
    })

    const table = new dynamodb.Table(this, 'LoginAuthTracker', {
      tableName: 'LoginAuthTracker',
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING},
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const loginCounterHandler = new lambda.Function(this, 'LoginCounterHandler', {
      functionName: 'LoginCounter',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('build/login-counter'),
      handler: 'index.handler',
      environment: {
        HITS_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(loginCounterHandler);

    const loginCounterApi = new apigw.HttpApi(this, 'LoginCounterApi', {
      apiName: 'Login-Counter',
    });

    const authorizer = new HttpLambdaAuthorizer('BasicAuthorizer', basicAuthHandler, {
      authorizerName: 'Basic-authorizer',
      responseTypes: [HttpLambdaResponseType.SIMPLE],
      identitySource: ['$request.header.apiKey']
    });

    loginCounterApi.addRoutes({
      path:'/login',
      methods: [ apigw.HttpMethod.GET ],
      integration: new HttpLambdaIntegration('loginCounterApiIntergration', loginCounterHandler),
      authorizer: authorizer
    });

    this.hcEndpoint = new cdk.CfnOutput(this, 'GatewayUrl', {
      value: loginCounterApi.url!
    })
  }
}
