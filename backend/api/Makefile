
.PHONY:clean
clean:

.PHONY:local-env
local-env:

.PHONY:install
install:
	cd ./nodejs/ && $(MAKE) install -e

	cd go && go get .

	# go get github.com/aws/aws-lambda-go/lambda
	# go get github.com/aws/aws-lambda-go/events
	# go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip

.PHONY:build
build:
# Can't currently use sam build as go is unsupported...
# sam build -t template.yaml -b ./build/
#	@echo GOPath is: $(GOPATH)
#	cd $(GOPATH) && ls
#	cd go && go get .
#	cd go/ && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0&& go build -o "build/main" main.go 
#	cd ./go/ && go build -v -o "build/main" main.go || "Failed"
#	ls
#	cd ./go/ && ls
#	@echo $(CURDIR)
#	docker info

#	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$(CURDIR)":/usr/src/go-lambda -w /usr/src/go-lambda golang:1.8 ls
	
#	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$(CURDIR)/go":/usr/src/go-lambda -w /usr/src/go-lambda golang:1.8 go build -v -o "build/main"
	
#cd go/build && "$(GOPATH)\bin\build-lambda-zip" -o main.zip main

#		cd go && go get ./...
#	cd ./go/ && go build -v -o "build/main" main.go
#	cd go/build && "$(GOPATH)\bin\build-lambda-zip" -o main.zip main
	sam build -u --template ../cloudformation/api-stack.yaml -s ../api


.PHONY:start
start:
	cd ../ && \
	set StageName=$(STAGE_NAME)&&\
	$(AWS_SAM_CLI) local start-api \
		--template ./cloudformation/api-stack.yaml \
		--profile $(AWS_PROFILE) \
		--region $(AWS_REGION) \
		--debug \
		--docker-network sam-local \
		--port 4000 \
		-n "./api/env.$(STAGE_NAME).json"

.PHONY:test
test:
	cd ./nodejs/ && $(MAKE) test -e
	


.PHONY:package
package: 
	 $(AWS_SAM_CLI) package --template-file ./cloudformation/master-stack.yaml --output-template-file ./cloudformation/master-stack-packaged-$(STAGE_NAME).yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 
#	cd ./cloudformation/ && sam package --template-file ./master-stack.yaml --output-template-file ./master-stack-packaged-$(STAGE_NAME).yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy:
	$(AWS_SAM_CLI) deploy --template-file ./cloudformation/master-stack-packaged-$(STAGE_NAME).yaml --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION) --parameter-overrides StageName=$(STAGE_NAME)
#	cd ./cloudformation/ && sam deploy --template-file ./master-stack-packaged-$(STAGE_NAME).yaml --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --capabilities "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND" "CAPABILITY_NAMED_IAM"  --profile $(AWS_PROFILE) --region $(AWS_REGION) --parameter-overrides StageName=$(STAGE_NAME)

# Capture output
	($(AWS_CLI) cloudformation describe-stacks --stack-name $(AWS_STACK_NAME)-$(STAGE_NAME) --query "Stacks[].Outputs[]" --region $(AWS_REGION)) > ../outputs.json

# Map the output from cloudformation stacks into a better consumable key/value that can be accessed by clients.
	cat ./outputs.json | docker run -i stedolan/jq "[ . [] | [ {\"key\": .OutputKey, \"value\": .OutputValue } ] | from_entries ] | add	" > ../../app/src/config/stack.production.json

.PHONY:infrastructure
infrastructure: 
	$(AWS_CLI) s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || $(AWS_CLI) aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"




