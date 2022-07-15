.PHONY: build
clear: 
	cdk destroy --all
codecommit:
	cdk deploy CreateCodeCommitStack
pipepline:
	cdk deploy BasicAuthLambdaPipelineStack
