
.PHONY:install 
install: 
		docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.HelloNounDbTable.Properties > create-table.json

# $(eval JSON_OUTPUT := $(shell docker run -v ${CURDIR}:/workdir mikefarah/yq yq r -j noun-db-stack.yaml Resources.HelloNounDbTable.Properties))
		aws dynamodb describe-table --table-name HelloNounDb --endpoint-url http://localhost:4569 --region $(AWS_REGION) || \
			aws dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:4569/ --table-name HelloNounDbTable --region $(AWS_REGION)

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
