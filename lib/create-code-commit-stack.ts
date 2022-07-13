import { Stack, StackProps } from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';

export class CreateCodecommitStack extends Stack {
  public readonly codecommitRepo: codecommit.Repository;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    
    this.codecommitRepo = new codecommit.Repository(this, 'BasicAuthHandler', {
      repositoryName: "BasicAuthHandler"
    });
  }
}