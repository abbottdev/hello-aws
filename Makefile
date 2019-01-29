AWS_REGION = eu-west-2
AWS_BUCKET = hello-world-abbottdev
AWS_PROFILE = hello-world-profile
AWS_STACK_NAME = hello-world-stack 

.PHONY:install
install:
	cp scripts/githooks/* .git/hooks
	cd api && $(MAKE) install

.PHONY:build
build:
	cd api && $(MAKE) build

.PHONY:run
run: build
	cd api && $(MAKE) run

.PHONY:test
test:
	cd api && $(MAKE) test

.PHONY:package
package: 
	cd api && $(MAKE) package

.PHONY:deploy
deploy: package
	cd api && $(MAKE) deploy

.PHONY:infrastructure
infrastructure: 
	cd api && $(MAKE) infrastructure
