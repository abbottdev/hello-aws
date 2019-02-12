AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev

.PHONY:install
install:
	docker network inspect sam-local || docker network create sam-local
	docker container inspect localstack || docker run -d -p 4567-4578:4567-4578 -p 8080:8080 --network sam-local --name localstack localstack/localstack

	cd serverless && $(MAKE) install AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)
	
	docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j cloudformation/storage-stack.yaml Resources.HelloNounDbTable.Properties > create-table.json

	aws dynamodb describe-table --table-name HelloNounDb --endpoint-url http://localhost:4569 --region $(AWS_REGION) || \
		aws dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:4569/ --table-name HelloNounDbTable --region $(AWS_REGION)

	rm create-table.json

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
package: 
	cd ./cloudformation/ && sam package --template-file ./master-stack.yaml --output-template-file ./master-stack-packaged.yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploysam
deploysam:
	cd ./cloudformation/ && sam deploy --template-file ./master-stack-packaged.yaml --stack-name $(AWS_STACK_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION)

.PHONY:deploy
deploy: deploysam outputs

.PHONY:outputs
outputs:
	(aws cloudformation describe-stacks --stack-name $(AWS_STACK_NAME) --query "Stacks[].Outputs[]" --region $(AWS_REGION)) > outputs.json

# Map the output from cloudformation stacks into a better consumable key/value that can be accessed by clients.
	cat ./outputs.json | docker run -i stedolan/jq "[ . [] | [ {\"key\": .OutputKey, \"value\": .OutputValue } ] | from_entries ] | add	" > ../app/src/config/stack.production.json
#[ . [] | [ {"key": .OutputKey, "value": .OutputValue } ] | from_entries ] | add	

.PHONY:infrastructure
infrastructure: 
	aws s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"

