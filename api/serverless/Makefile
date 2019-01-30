AWS_REGION = eu-west-2
AWS_PROFILE = hello-world-profile

ifeq ($(OS),Windows_NT) 
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
endif

.PHONY:install
install:
	cd nodejs/ && npm install && cd ../
	go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip
# docker network create sam-local-dynamodb

.PHONY:build
build:
# Can't currently use sam build as go is unsupported...
# sam build -t template.yaml -b ./build/
	cd go/ && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0&& go.exe build -i -o "build/main" main.go 
	cd go/build && "$(GOPATH)\bin\build-lambda-zip.exe" -o main.zip main

.PHONY:run
run: build
	sam local start-api --profile $(AWS_PROFILE) --region $(AWS_REGION) --debug

.PHONY:test
test: build
	cd nodejs/ && npm run test
	cd go/ && go.exe test -v ./
