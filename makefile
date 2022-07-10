.PHONY: build
build: 
	cdk destroy
	cdk deploy --hotswap