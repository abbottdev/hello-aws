AWS_REGION = eu-west-2
AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev
AWS_PROFILE = hello-world-profile
AWS_STACK_NAME = hello-world-stack

.PHONY:install
install:
	cd lambda/nodejs/ && npm install && cd ../

.PHONY:build
build:
	cd lambda/go/ && set GOOS=linux&& set GOARCH=amd64&& go build -i -o "build/main" main.go 

	@echo "-gcflags=-N -gcflags=-l"

.PHONY:run
run: build
	sam local start-api --profile $(AWS_PROFILE) --region $(AWS_REGION) --debug

.PHONY:test
test:
	cd lambda/nodejs/ && npm run test
	cd lambda/go/ && go test -v ./

.PHONY:package
package: build test
	sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy: package
	sam deploy --template-file packaged.yaml --stack-name $(AWS_STACK_NAME) --capabilities CAPABILITY_NAMED_IAM --profile $(AWS_PROFILE)  --region $(AWS_REGION)
	aws cloudformation describe-stacks --stack-name $(AWS_STACK_NAME) --query 'Stacks[].Outputs'

.PHONY:infrastructure
infrastructure: 
	aws s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"
