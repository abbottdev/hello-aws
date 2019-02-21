DOCKER_IMAGE=hello-aws-deps

export RUN_IN_DOCKER:=docker run -it --tty -v /var/run/docker.sock:/var/run/docker.sock -v $(CURDIR):/mount/src/hello-aws -v ~/.aws:/home/samcli/.aws -w /mount/src/hello-aws $(DOCKER_IMAGE)

CMDGOALS=$(MAKECMDGOALS)

# .PHONY:install-docker-image
# install-docker-image:
# 	cd docker && docker build -t $(DOCKER_IMAGE) -f deps.Dockerfile .

%: 
	echo Make CMD Goals is: $(CMDGOALS) 
	$(RUN_IN_DOCKER) "make $(MAKECMDGOALS)"