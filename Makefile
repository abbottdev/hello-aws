include config.Makefile

.PHONY:deps
deps:

	cd backend && $(MAKE) clean

.PHONY:clean
clean: 

	cd backend && $(MAKE) clean
	cd app && $(MAKE) clean
	
.PHONY:install
install:
	cp scripts/githooks/* .git/hooks
	cd backend && $(MAKE) install
	cd app && $(MAKE) install

.PHONY:local-env
local-env:
	cd backend && $(MAKE) local-env
	cd app && $(MAKE) local-env

.PHONY:build
build:

	cd backend && $(MAKE) build
	cd app && $(MAKE) build

.PHONY:start
start:
	$(MAKE) start-api start-app -j 2

.PHONY:start-api
start-api:

	(cd backend && $(MAKE) start ) 

.PHONY:start-app
start-app:
	(cd app && $(MAKE) start )

.PHONY:test
test: 
	cd backend && $(MAKE) test
	cd app && $(MAKE) test 

.PHONY:package
package: 
	cd backend && $(MAKE) package 
#	cd app && $(MAKE) package  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION) STAGE_NAME=$(STAGE_NAME)

.PHONY:outputs
outputs: 

	cd backend && $(MAKE) outputs 
	cd app && $(MAKE) outputs 

.PHONY:deploy

	cd backend && $(MAKE) deploy 
	cd app && $(MAKE) deploy 

.PHONY:infrastructure
infrastructure: 

	cd backend && $(MAKE) infrastructure 
	cd app && $(MAKE) infrastructure 
