.PHONY: build
clear: 
	cdk destroy
codecommit:
	cdk deploy CreateCodeCommitStack
pipepline:
	cdk deploy BasicAuthLambdaPipelineStack