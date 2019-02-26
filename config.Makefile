STAGE_NAME?=dev

ifeq ($(OS),Windows_NT) 
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
endif

export DETECTED_OS
export AWS_STACK_NAME:=hello-world
export AWS_PROFILE:=hello-world-profile
export AWS_REGION:=eu-west-2
#export AWS_SAM_CLI:=docker run -v $(shell pwd):/source/ -w /source/ -v ~/.aws:/home/samcli/.aws pahud/aws-sam-cli:latest sam
export AWS_SAM_CLI:=sam
#export AWS_CLI:=docker run --tty -i --rm -v $(shell pwd):/source -w /source -v ~/.aws:/home/samcli/.aws pahud/aws-sam-cli:latest aws
export AWS_CLI:=aws
export STAGE_NAME
#export NPM:=docker run --tty -i --rm -v $$(CURDIR)/:/home/node/app/ -w /home/node/app/ node:alpine npm
export NPM:=npm
