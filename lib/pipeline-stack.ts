import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import { BasicAuthPipelineStage } from './pipeline-stage'

export class BasicauthPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const repo = codecommit.Repository.fromRepositoryName(this, 'BasicAuthHandler', 'BasicAuthHandler')

      const pipeline = new CodePipeline(this, 'BasicAuthPipeline', {
        pipelineName: 'BasicAuthPipeline',
        synth: new CodeBuildStep('SynthStep', {
          input: CodePipelineSource.codeCommit(repo, 'master'),
          installCommands: [
            'npm install -g yarn',
            'yarn global add aws-cdk',
            'yarn global add esbuild'
          ],
          commands: [
            'yarn',
            'sudo chmod u+x *.sh',
            './esbuild.sh',
            'npx cdk synth'
          ]
        })
      });

      const basicAuthPipelineStage = new BasicAuthPipelineStage(this, 'BasicAuthPipelineStage')
      const deployStage = pipeline.addStage(basicAuthPipelineStage);
      deployStage.addPost(new CodeBuildStep('TestEndpoint', {
        projectName: 'TestEndpoint',
        envFromCfnOutputs: {
          ENDPOINT_URL: basicAuthPipelineStage.hcEndpoint,
        },
        commands: ['curl -Ssf -H "apikey:test YWRtaW46c2VjcmV0" $ENDPOINT_URL/login']
      }))

    }
}