AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev

.PHONY:install-storage
install-storage:
#		docker run -d -p 8000:8000 --network sam-local --name dynamodb amazon/dynamodb-local
		docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.HelloNounDbTable.Properties > create-table.json

		aws dynamodb describe-table --table-name HelloNounDb --endpoint-url http://localhost:4569 --region $(AWS_REGION) || \
			aws dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:4569/ --table-name HelloNounDbTable --region $(AWS_REGION)
			
		rm create-table.json

#	docker container stop dynamodb
.PHONY:remove-storage
remove-storage:
	docker container stop localstack
	docker container rm localstack
	docker network rm sam-local

.PHONY:reset-storage
reset-storage: remove-storage install-storage




#.PHONY:install 
#install: 
# $(eval JSON_OUTPUT := $(shell docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.HelloNounDbTable.Properties))

# .PHONY:generate-seed-event
# generate-seed-event:
# #	Make the local-seed-event based on the noundb custom resource here
# 	sam local generate-event cloudformation create-request > seed-event.json
# 	docker run -v ${CURDIR}:/workdir mikefarah/yq yq r noun-db-stack.yaml Resources.InitializeHelloNounDbTable.Properties > seed-event.yaml
# 	docker run -v ${CURDIR}:/workdir mikefarah/yq yq p -i seed-event.yaml ResourceProperties
# 	docker run -v ${CURDIR}:/workdir mikefarah/yq yq m -i seed-event.yaml seed-event.json
# 	docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j seed-event.yaml > seed-event.json
# 	rm seed-event.yaml

# .PHONY:seed
# seed:
# #	Invoke the dynamoDbSeeder lambda
# 	cd ../../serverless && \
# 		sam local invoke \
# 			--template ../cloudformation/serverless-stack.yaml \
# 			--profile $(AWS_PROFILE) \
# 			--region $(AWS_REGION) \
# 			--debug \
# 			--docker-network sam-local-dynamodb \
# 			--event ../storage/noun-db/seed-event.json \
# 			DynamoDbSeederLambda
