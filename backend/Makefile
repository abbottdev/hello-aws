export AWS_CLOUDFORMATION_BUCKET=stack-templates-$(AWS_STACK_NAME)-$(STAGE_NAME)

.PHONY:clean
clean:
	cd api && $(MAKE) clean -e
	cd storage && $(MAKE) clean -e
	
	docker container inspect localstack && docker container stop localstack 
	docker container inspect localstack && docker container rm localstack 
	docker network inspect sam-local && docker network rm sam-local 

.PHONY:install
install:
	docker network inspect sam-local || docker network create sam-local
	docker container inspect localstack || docker run -d -p 4567-4592:4567-4592 -p 8080:8080 --network sam-local --name localstack localstack/localstack

	cd api && $(MAKE) install -e
	cd storage && $(MAKE) install -e

.PHONY:local-env
local-env:
	cd api && $(MAKE) local-env -e
	cd storage && $(MAKE) local-env -e

.PHONY:build
build:
	cd api && $(MAKE) build -e

.PHONY:start
start: build
	docker container top localstack || docker container start localstack
	cd api && $(MAKE) start -e

.PHONY:test
test:
	cd api && $(MAKE) test -e

.PHONY:package
package: 
	cd ./cloudformation/ && sam package --template-file ./master-stack.yaml --output-template-file ./master-stack-packaged-$(STAGE_NAME).yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy:
	cd ./cloudformation/ && sam deploy --template-file ./master-stack-packaged-$(STAGE_NAME).yaml --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION) --parameter-overrides StageName=$(STAGE_NAME)

# Capture output
	(aws cloudformation describe-stacks --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --query "Stacks[].Outputs[]" --region $(AWS_REGION)) > outputs.json

# Map the output from cloudformation stacks into a better consumable key/value that can be accessed by clients.
	cat ./outputs.json | docker run -i stedolan/jq "[ . [] | [ {\"key\": .OutputKey, \"value\": .OutputValue } ] | from_entries ] | add	" > ../app/src/config/stack.production.json

.PHONY:infrastructure
infrastructure: 
	aws s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"

