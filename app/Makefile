
.PHONY:install
install:
	npm install

.PHONY:build
build:
	npm run build

.PHONY:run
run: build
	npm start

.PHONY:test
test: build 
	npm run test

.PHONY:package
package: test
	zip build > build.zip

.PHONY:outputs
outputs: 
	

.PHONY:deploy
deploy: package
	
.PHONY:infrastructure
infrastructure: 
	
