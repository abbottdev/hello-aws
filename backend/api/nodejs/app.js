
const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {string} event.resource - Resource path.
 * @param {string} event.path - Path parameter.
 * @param {string} event.httpMethod - Incoming request's method name.
 * @param {Object} event.headers - Incoming request headers.
 * @param {Object} event.queryStringParameters - query string parameters.
 * @param {Object} event.pathParameters - path parameters.
 * @param {Object} event.stageVariables - Applicable stage variables.
 * @param {Object} event.requestContext - Request context, including authorizer-returned key-value pairs, requestId, sourceIp, etc.
 * @param {Object} event.body - A JSON string of the request payload.
 * @param {boolean} event.body.isBase64Encoded - A boolean flag to indicate if the applicable request payload is Base64-encode
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 * @param {string} context.logGroupName - Cloudwatch Log Group name
 * @param {string} context.logStreamName - Cloudwatch Log stream name.
 * @param {string} context.functionName - Lambda function name.
 * @param {string} context.memoryLimitInMB - Function memory.
 * @param {string} context.functionVersion - Function version identifier.
 * @param {function} context.getRemainingTimeInMillis - Time in milliseconds before function times out.
 * @param {string} context.awsRequestId - Lambda request ID.
 * @param {string} context.invokedFunctionArn - Function ARN.
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * @returns {boolean} object.isBase64Encoded - A boolean flag to indicate if the applicable payload is Base64-encode (binary support)
 * @returns {string} object.statusCode - HTTP Status Code to be returned to the client
 * @returns {Object} object.headers - HTTP Headers to be returned
 * @returns {Object} object.body - JSON Payload to be returned
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const MAX_KEY = 5;
        const corsHeaders = {
            "X-Requested-With": '*',
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS',
            "Cache-Control": "no-cache"
        };

        let params = {apiVersion: '2012-08-10'}; 

        const isLocalExecution = process.env["AWS_SAM_LOCAL"] == "true" || process.env.NODE_ENV == "test";

        if (isLocalExecution) {
            console.log("Detected local execution environment");
            AWS.config.update({endpoint: "http://localstack:4569", region: "local"});
        }

        const ret = await axios(url);
        // Create DynamoDB service object
        var ddb = new AWS.DynamoDB(params);

        let key = Number.parseInt(Math.ceil(MAX_KEY * Math.random()));
        
        console.log("key is: " + key.toString());

        var dynamoResponse = await ddb
            .getItem({
                TableName: "NounDynamoDbTable",
                Key: {"NounId": {"S": key.toString() } }
            })
            .promise()
            .then(data => {                        
                console.log("returning");

                return {
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: data.Item.NounName.S + " world",
                        location: ret.data.trim()
                    })        
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    'statusCode': 500,
                    'body': JSON.stringify({
                        message: JSON.stringify(err),
                        location: ""
                    })        
                }
            });

        response = {
            ...dynamoResponse,
            headers: corsHeaders
        };     
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
