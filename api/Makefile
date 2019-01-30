AWS_REGION = eu-west-2
AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev
AWS_PROFILE = hello-world-profile
AWS_STACK_NAME = hello-world-stack

.PHONY:install
install:
	cd serverless && $(MAKE) install 

.PHONY:build
build:
	cd serverless && $(MAKE) build

.PHONY:run
run: build
	cd serverless && $(MAKE) run

.PHONY:test
test:
	cd serverless && $(MAKE) test


.PHONY:package
package: test
	cd ./cloudformation/ && sam package --template-file ./master-stack.yaml --output-template-file ./master-stack-packaged.yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy: package
	cd ./cloudformation/ && sam deploy --template-file ./master-stack-packaged.yaml --stack-name $(AWS_STACK_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION)

.PHONY:outputs
outputs:
	aws cloudformation describe-stacks --stack-name hello-world-stack  --query "Stacks[].Outputs[]" 
# aws cloudformation describe-stacks --stack-name hello-world-stack  --query "Stacks[0].Outputs[?OutputKey=='HelloWorldGoApiEndpoint'].OutputValue" --output text

#.PHONY:outputs
#outputs:
#		@aws cloudformation describe-stacks \
#			--region $(AWS_REGION) \
#			--stack-name $(AWS_STACK_NAME) > ./outputs/stacks.json

.PHONY:infrastructure
infrastructure: 
	aws s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"
