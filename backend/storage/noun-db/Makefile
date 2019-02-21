TABLE_NAME=NounDynamoDbTable
FULL_TABLE_NAME=$(TABLE_NAME)-$(STAGE_NAME)

.PHONY:clean
clean:
	@echo Removing local table
	@ - $(AWS_CLI) dynamodb delete-table --table-name $(FULL_TABLE_NAME) --region $(AWS_REGION) --endpoint-url http://localhost:4569

.PHONY:install
install: 

.PHONY:local-env
local-env: clean create-table generate-seed-event seed

.PHONY:create-table
create-table:
		docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.$(TABLE_NAME).Properties > create-table.json

		$(AWS_CLI) dynamodb describe-table --table-name $(FULL_TABLE_NAME) --endpoint-url http://localhost:4569 --region $(AWS_REGION) || \
			$(AWS_CLI) dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:4569/ --table-name $(FULL_TABLE_NAME) --region $(AWS_REGION)

.PHONY:generate-seed-event
generate-seed-event:
#	Make the local-seed-event based on the noundb custom resource here

	YQ_CLI = $(docker run -v ${CURDIR}:/workdir mikefarah/yq yq)

	$(AWS_SAM_CLI) local generate-event cloudformation create-request > seed-request-event.json

	$(YQ_CLI) r noun-db-stack.yaml Resources.SeedNounDynamoDbTable.Properties > seed-event.yaml
	$(YQ_CLI) p -i seed-event.yaml ResourceProperties
	$(YQ_CLI) m -i seed-event.yaml seed-request-event.json
	$(YQ_CLI) r -j seed-event.yaml > seed-request-event.json

	rm seed-event.yaml
# Add the stageName to the table name we create locally (This would normally be done because we use !Ref <TABLE> to get a table name, but sam local doesn't transform)
	cat ./seed-request-event.json | docker run -i stedolan/jq ".ResourceProperties.TableName = .ResourceProperties.TableName + \"-$(STAGE_NAME)\" " > seed-event.json	
	rm seed-request-event.json

.PHONY:seed
seed:
#	Invoke the dynamoDbSeeder lambda
	cd ../../ && \
		$(AWS_SAM_CLI) local invoke \
			--template ./cloudformation/api-stack.yaml \
			--profile $(AWS_PROFILE) \
			--region $(AWS_REGION) \
			--debug \
			--docker-network sam-local \
			--event ./storage/noun-db/seed-event.json \
			--parameter-overrides	'ParameterKey=StageName,ParameterValue=$(STAGE_NAME)' \
			CustomResourceSeedDynamoDbFunction
