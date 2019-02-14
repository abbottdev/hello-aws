AWS_STACK_NAME = hello-world
AWS_PROFILE = hello-world-profile
AWS_REGION=eu-west-2

.PHONY:clean
clean:
	cd backend && $(MAKE) clean AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) clean

.PHONY:install
install:
	cp scripts/githooks/* .git/hooks
	cd backend && $(MAKE) install  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) install

.PHONY:build
build:	
	cd backend && $(MAKE) build
	cd app && $(MAKE) build

.PHONY:start
run:
	$(MAKE) start-api start-app -j 2

.PHONY:start-api
start-api:
	(cd backend && $(MAKE) start  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION))

.PHONY:start-app
start-app:
	(cd app && $(MAKE) start  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION))

.PHONY:test
test: 
	cd backend && $(MAKE) test AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) test AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)

.PHONY:package
package: 
	cd backend && $(MAKE) package  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME) AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) package  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)

.PHONY:outputs
outputs: 
	cd backend && $(MAKE) outputs  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) outputs  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)

.PHONY:deploy
deploy: 
	cd backend && $(MAKE) deploy  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION) STAGE_NAME=$(STAGE_NAME)
	cd app && $(MAKE) deploy  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)

.PHONY:infrastructure
infrastructure: 
	cd backend && $(MAKE) infrastructure  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
	cd app && $(MAKE) infrastructure  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION)
