include ../config.Makefile

export AWS_CLOUDFORMATION_BUCKET=stack-templates-$(AWS_STACK_NAME)-$(STAGE_NAME)

.PHONY:deps
deps:
	@ echo Configuring docker network
	@ - docker container inspect localstack && docker container stop localstack 
	@ - docker container inspect localstack && docker container rm localstack 
	@ - docker network inspect sam-local && docker network rm sam-local 

	@ docker network inspect sam-local || docker network create sam-local 

	@ echo Configuring localstack mocks
	@ docker container inspect localstack || docker run -d -p 4567-4592:4567-4592 -p 8080:8080 --network sam-local --name localstack localstack/localstack 

.PHONY:clean
clean:
	cd api && $(MAKE) clean 
	cd storage && $(MAKE) clean 

.PHONY:configure-aws
configure-aws:
	@echo Please ensure the AWS profile configuration is correct.
	@$(AWS_CLI) configure --profile $(AWS_PROFILE)

.PHONY:install
install: configure-aws
	cd docker && $(MAKE) build

	cd api && $(MAKE) install
	cd storage && $(MAKE) install

.PHONY:local-env
local-env:
	cd api && $(MAKE) local-env
	cd storage && $(MAKE) local-env

.PHONY:build
build:
	cd api && $(MAKE) build 

.PHONY:start
start:
	@ docker container top localstack || docker container start localstack
	cd api && $(MAKE) start 

.PHONY:test
test:
	cd api && $(MAKE) test 

.PHONY:package
package:
	cd ./api/ && \
	 $(AWS_SAM_CLI) package --template-file ../cloudformation/master-stack.yaml --output-template-file ../cloudformation/master-stack-packaged-$(STAGE_NAME).yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy:
	cd ./api/ && \
	$(AWS_SAM_CLI) deploy --template-file ../cloudformation/master-stack-packaged-$(STAGE_NAME).yaml --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION) --parameter-overrides StageName=$(STAGE_NAME)

	($(AWS_CLI) cloudformation describe-stacks --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --query "Stacks[].Outputs[]" --region $(AWS_REGION)) > outputs.json

# Map the output from cloudformation stacks into a better consumable key/value that can be accessed by clients.
	cat ./outputs.json | docker run -i stedolan/jq "[ . [] | [ {\"key\": .OutputKey, \"value\": .OutputValue } ] | from_entries ] | add	" > ../app/src/config/stack.production.json

.PHONY:infrastructure
infrastructure: 
	$(AWS_CLI) s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || $(AWS_CLI) aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"

