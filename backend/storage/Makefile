AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev

.PHONY:install
install:
		cd ./noun-db/ && $(MAKE) install AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)

.PHONY:clean
clean:
		cd ./noun-db/ && $(MAKE) clean AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)

# .PHONY:reset-storage
# reset-storage: remove-storage install-storage




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
