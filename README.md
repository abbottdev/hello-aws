# Hello World


## Prerequisites

 - Make
 - Docker (Link: https://www.docker.com/products/docker-engine)
 - AWS CLI (Link: https://aws.amazon.com/cli/)
 - AWS SAM CLI (Link: https://aws.amazon.com/serverless/sam/)
 - Go Lang (Link: https://golang.org/)

### AWS account configuration

This repo uses a named profile to specify credentials - The profile name used is `hello-world-profile`. Ensure your AWS credentials are configured by running `aws configure --profile hello-world-profile`.

Ensure that the user you associate this profile to has the following permissions in AWS:
 - S3 Write Access 
 - CloudFormation
 - API Gateway

## Building

To build locally you must install dependencies, and configure your local environment:

```
  $ make install build local-env
```

## Running locally
```
  $ make start
```

## Make Targets

| Target Name | Description | Requires Target(s) |
|---|---|---|
| `install` | Installs libraries and dependencies required for build   | (none) |
| `build` | Builds the solution recursively | `install` |
| `local-env` | Configures your machine to have the aws environment expected after deployment. (Creates DynamoDb tables, and seeds them) | `build` |
| `clean` | Removes items installed using `install`  |  |
| `package` | Creates a cloudformation package and uploads it to S3 using the configured parameters. | `install`, `build`, `test` |
| `deploy` | Deploys the result of the `package` command. | `package` |
| `outputs` | Generates and displays the outputs of the stack that was last deployed using the `deploy` command. | `deploy` |
| `test` | Runs unit tests. | `build` |
| `start` | Starts a local instance of the API and frontend. | `build` |
| `start-api` | Starts a local instance of the API. | `build` |

### Make parameters

Currently the following parameters are configurable:

| Varaible | Description | Default value | Required? |
|---|---|---|---|
| `STAGE_NAME` | Sets the stage name used across the deployment. This is prefixed/suffixed to all resources | dev | no |
| `AWS_REGION` | Sets region the package and deploy commands deploy to. | eu-west-2 | no |

