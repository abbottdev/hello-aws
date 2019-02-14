.PHONY:clean
clean:
	aws dynamodb delete-table --table-name NounDynamoDbTable --region $(AWS_REGION) --endpoint-url http://localhost:4569 

.PHONY:install 
install: create-table generate-seed-event seed

.PHONY:create-table
create-table:
		docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.NounDynamoDbTable.Properties > create-table.json

		aws dynamodb describe-table --table-name NounDynamoDbTable --endpoint-url http://localhost:4569 --region $(AWS_REGION) || \
			aws dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:4569/ --table-name NounDynamoDbTable --region $(AWS_REGION)

.PHONY:generate-seed-event
generate-seed-event:
#	Make the local-seed-event based on the noundb custom resource here
	sam local generate-event cloudformation create-request > seed-event.json
	docker run -v ${CURDIR}:/workdir mikefarah/yq yq r noun-db-stack.yaml Resources.DynamoDbSeederResource.Properties > seed-event.yaml
	docker run -v ${CURDIR}:/workdir mikefarah/yq yq p -i seed-event.yaml ResourceProperties
	docker run -v ${CURDIR}:/workdir mikefarah/yq yq m -i seed-event.yaml seed-event.json
	docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j seed-event.yaml > seed-event.json
	rm seed-event.yaml

.PHONY:seed
seed:
#	Invoke the dynamoDbSeeder lambda
	cd ../../api/ && \
		sam local invoke \
			--template ../cloudformation/api-stack.yaml \
			--profile $(AWS_PROFILE) \
			--region $(AWS_REGION) \
			--debug \
			--docker-network sam-local \
			--event ../storage/noun-db/seed-event.json \
			SeederJsFunction
