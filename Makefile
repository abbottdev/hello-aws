export AWS_STACK_NAME = hello-world
export AWS_PROFILE = hello-world-profile
export AWS_REGION?=eu-west-2
export STAGE_NAME?=dev

ifeq ($(OS),Windows_NT) 
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
endif

export DETECTED_OS

.PHONY:clean
clean:
	cd backend && $(MAKE) clean -e
	cd app && $(MAKE) clean -e

.PHONY:install
install:
	cp scripts/githooks/* .git/hooks
	cd backend && $(MAKE) install -e
	cd app && $(MAKE) install -e

.PHONY:local-env
local-env:
	cd backend && $(MAKE) local-env -e
	cd app && $(MAKE) local-env -e

.PHONY:build
build:	
	cd backend && $(MAKE) build -e
	cd app && $(MAKE) -e

.PHONY:start
start:
	$(MAKE) start-api start-app -j 2 -e

.PHONY:start-api
start-api:
	(cd backend && $(MAKE) start -e ) 

.PHONY:start-app
start-app:
	(cd app && $(MAKE) start -e )

.PHONY:test
test: 
	cd backend && $(MAKE) test -e
	cd app && $(MAKE) test -e

.PHONY:package
package: 
	cd backend && $(MAKE) package -e
#	cd app && $(MAKE) package  AWS_PROFILE=$(AWS_PROFILE) AWS_STACK_NAME=$(AWS_STACK_NAME)  AWS_REGION=$(AWS_REGION) STAGE_NAME=$(STAGE_NAME)

.PHONY:outputs
outputs: 
	cd backend && $(MAKE) outputs -e
	cd app && $(MAKE) outputs -e

.PHONY:deploy
deploy: 
	cd backend && $(MAKE) deploy -e
	cd app && $(MAKE) deploy -e

.PHONY:infrastructure
infrastructure: 
	cd backend && $(MAKE) infrastructure -e
	cd app && $(MAKE) infrastructure -e
