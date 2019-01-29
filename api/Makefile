AWS_REGION = eu-west-2
AWS_CLOUDFORMATION_BUCKET = hello-world-abbottdev
AWS_PROFILE = hello-world-profile
AWS_STACK_NAME = hello-world-stack

.PHONY:install
install:
	cd lambda/nodejs/ && npm install && cd ../
	go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip

.PHONY:build
build:
	cd lambda/go/ && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0&& go.exe build -i -o "build/main" main.go 
	cd lambda/go/build && "$(GOPATH)\bin\build-lambda-zip.exe" -o main.zip main

.PHONY:run
run: build
	sam local start-api --profile $(AWS_PROFILE) --region $(AWS_REGION) --debug

.PHONY:test
test: build
	cd lambda/nodejs/ && npm run test
	cd lambda/go/ && go.exe test -v ./

.PHONY:package
package: test
	sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $(AWS_CLOUDFORMATION_BUCKET) --profile $(AWS_PROFILE) 

.PHONY:deploy
deploy: package
	sam deploy --template-file packaged.yaml --stack-name $(AWS_STACK_NAME) --capabilities CAPABILITY_NAMED_IAM --profile $(AWS_PROFILE)  --region $(AWS_REGION)
	aws cloudformation describe-stacks --stack-name $(AWS_STACK_NAME) --query 'Stacks[].Outputs'

.PHONY:infrastructure
infrastructure: 
	aws s3 ls s3://$(AWS_CLOUDFORMATION_BUCKET) || aws s3 mb s3://$(AWS_CLOUDFORMATION_BUCKET) --region $(AWS_REGION) --profile $(AWS_PROFILE) || @echo "Could not create bucket. Check your profile"
