

ifeq ($(OS),Windows_NT) 
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
endif

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
	@echo GOPath is: $(GOPATH)
	cd $(GOPATH) && ls
#	cd go && go get .
#	cd go/ && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0&& go build -o "build/main" main.go 
#	cd ./go/ && go build -v -o "build/main" main.go || "Failed"
	ls
	cd ./go/ && ls
	@echo $(CURDIR)
	docker info

	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$(CURDIR)":/usr/src/go-lambda -w /usr/src/go-lambda golang:1.8 ls
	
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$(CURDIR)/go":/usr/src/go-lambda -w /usr/src/go-lambda golang:1.8 go build -v -o "build/main"
	
	#cd go/build && "$(GOPATH)\bin\build-lambda-zip" -o main.zip main

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
	
	cd go/ && go.exe test -v ./
