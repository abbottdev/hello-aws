AWS_STACK_NAME ?= hello-world
AWS_PROFILE ?= hello-world-profile
AWS_REGION ?=eu-west-2


.PHONY:clean
clean:
	
.PHONY:local-env
local-env:
	
.PHONY:install
install:
	npm install

.PHONY:build
build:
	npm run build

.PHONY:start
start: 
	npm start

.PHONY:test
test:  
	npm run test

.PHONY:package
package: test build

.PHONY:outputs
outputs: 
	

.PHONY:deploy
deploy: build
		$(eval ClientWebsiteBucketName = $(shell cat ./src/config/stack.production.json | docker run -i stedolan/jq -r .ClientWebsiteBucketName)) \
			aws s3 sync build/ s3://$(ClientWebsiteBucketName)/ --acl public-read --profile $(AWS_PROFILE) --region $(AWS_REGION) --metadata Cache-Control=no-cache

.PHONY:launch
launch:

		$(eval ClientWebsiteUrl = $(shell cat ./src/config/stack.production.json | docker run -i stedolan/jq -r .ClientWebsiteUrl)) ; open $(ClientWebsiteUrl)
	
.PHONY:infrastructure
infrastructure: 
	
