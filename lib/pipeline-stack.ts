import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";

export class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const repo = new codecommit.Repository(this, 'BasicAuthHandler', {
            repositoryName: "BasicAuthHandler"
        });

        const pipeline = new CodePipeline(this, 'BasicAuthPipeline', {
          pipelineName: 'BasicAuthPipeline',
          
          synth: new CodeBuildStep('SynthStep', {
                  input: CodePipelineSource.codeCommit(repo, 'master'),
                  installCommands: [
                      'npm install -g aws-cdk',
                      'npm install -g yarn'
                  ],
                  commands: [
                      'yarn',
                      'yarn run build',
                      'npx cdk synth'
                  ]
              }
          )
      });
    }
}