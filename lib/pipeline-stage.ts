import * as cdk from 'aws-cdk-lib';
import { BasicAuthLambdaStack } from './basic-auth-lambda-stack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class BasicAuthPipelineStage extends Stage {
  public readonly hcEndpoint: cdk.CfnOutput;
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
      const basicAuthLambdaStack = new BasicAuthLambdaStack(this, 'BasicAuthLambdaStack');
      this.hcEndpoint = basicAuthLambdaStack.hcEndpoint;
    }
}