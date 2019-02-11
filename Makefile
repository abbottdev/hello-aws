AWS_STACK_NAME = hello-world-master-stack
AWS_PROFILE = hello-world-profile
AWS_REGION=eu-west-2

.PHONY:install
install:
	cp scripts/githooks/* .git/hooks
	cd api && $(MAKE) install  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) install

.PHONY:build
build:
	cd api && $(MAKE) build
	cd app && $(MAKE) build

.PHONY:run
run: build
	cd api && $(MAKE) run
	cd app && $(MAKE) run

.PHONY:test
test: build 
	cd api && $(MAKE) test
	cd app && $(MAKE) test

.PHONY:package
package: test
	cd api && $(MAKE) package  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) package

.PHONY:outputs
outputs: 
	cd api && $(MAKE) outputs  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) outputs

.PHONY:deploy
deploy: package
	cd api && $(MAKE) deploy  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) deploy

.PHONY:infrastructure
infrastructure: 
	cd api && $(MAKE) infrastructure  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) infrastructure
