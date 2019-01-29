# Hello World


## Prerequisites

 - Make
 - AWS CLI
 - AWS SAM CLI
 - Go Lang


### AWS account configuration

This repo uses a named profile to specify credentials - The profile name used is `hello-world-profile`. Ensure your AWS credentials are configured by running `aws configure --profile hello-world-profile`.

Ensure that the user you associate this profile to has the following permissions in AWS:
 - S3 Write Access 
 - CloudFormation
 - API Gateway

