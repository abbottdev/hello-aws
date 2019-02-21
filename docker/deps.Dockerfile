FROM node:alpine

ENV HOME /home/samcli
ENV PATH $HOME/.local/bin:$PATH

RUN mkdir /root/bin /aws; \
	apk add --no-cache groff less bash python jq curl py-pip
	
RUN apk add --no-cache --virtual .build-deps gcc python2-dev python3-dev linux-headers musl-dev && \
	pip install --upgrade pip; \
	adduser samcli -Du 5566; \
	chown -R samcli $HOME;

USER samcli

WORKDIR $HOME

RUN pip install --user --upgrade awscli aws-sam-cli;

USER root

RUN apk add --update make

# Configure git
RUN apk add --update git

# Configure Go
RUN apk add musl-dev go
ENV GOROOT /usr/lib/go
ENV GOPATH /mount
ENV PATH /mount/bin:$PATH

RUN mkdir -p ${GOPATH}/src ${GOPATH}/bin

RUN go get -u github.com/Masterminds/glide/...

# Configure docker (docker client, expectation for client to use docker.sock)
RUN apk add docker

RUN apk del .build-deps; \
	rm -rf /var/cache/apk/*

ENTRYPOINT [ "sh", "-c" ]