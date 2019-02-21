
.PHONY:clean
clean:
	

.PHONY:install
install:
	$(NPM) install

.PHONY:build
build:
	$(NPM) run build

.PHONY:start
start: 
	$(NPM) start

.PHONY:test
test:  
	$(NPM) run test

.PHONY:package
package: test build

.PHONY:outputs
outputs: 
	

.PHONY:deploy
deploy: build
		$(eval ClientWebsiteBucketName = $(shell cat ./src/config/stack.production.json | docker run -i stedolan/jq -r .ClientWebsiteBucketName)) \
			$(AWS_CLI) s3 sync build/ s3://$(ClientWebsiteBucketName)/ --acl public-read --profile $(AWS_PROFILE) --region $(AWS_REGION) --metadata Cache-Control=no-cache

.PHONY:launch
launch:

		$(eval ClientWebsiteUrl = $(shell cat ./src/config/stack.production.json | docker run -i stedolan/jq -r .ClientWebsiteUrl)) ; open $(ClientWebsiteUrl)
	
.PHONY:infrastructure
infrastructure: 
	
