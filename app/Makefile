AWS_STACK_NAME ?= hello-world
AWS_PROFILE ?= hello-world-profile
AWS_REGION ?=eu-west-2

.PHONY:install
install:
	npm install

.PHONY:build
build:
	npm run build

.PHONY:run
run: 
	npm start

.PHONY:test
test:  
	npm run test

.PHONY:package
package: build test

.PHONY:outputs
outputs: 
	

.PHONY:deploy
deploy: 
		$(eval ClientWebsiteBucketName = $(shell cat ./src/config/stack.production.json | docker run -i stedolan/jq -r .ClientWebsiteBucketName)) \
			aws s3 sync build/ s3://$(ClientWebsiteBucketName)/ --acl public-read --profile $(AWS_PROFILE) --region $(AWS_REGION) --website-redirect /index.html

	
.PHONY:infrastructure
infrastructure: 
	
