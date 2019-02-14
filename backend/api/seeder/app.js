var response = require('cfn-response');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

/**
 *
 * @param {Object} event - CloudFormation event object
 * @param {string} event.RequestType - Request Type
 * @param {string} event.ServiceToken - arn address of the executing lambda
 * @param {string} event.ResponseURL - The url to post the success/failure of the custom resource execution
 * @param {string} event.StackId - Id of the stack
 * @param {string} event.RequestId - Request identifier
 * @param {string} event.LogicalResourceId - The logical resource id
 * @param {string} event.PhysicalResourceId - The physical resource id
 * @param {string} event.ResourceType - The resource type
 * @param {Object} event.ResourceProperties - The properties assigned to the custom event
 * @param {string} event.ResourceProperties.ServiceToken - arn address of the executing lambda
 * @param {string} event.ResourceProperties.Region - The Aws Region
 * @param {string} event.ResourceProperties.TableName - The DynamoDb table
 * @param {object} event.ResourceProperties.RequestItems - The items to be created on the dynamodb instance
 **/
exports.handler = function(event, context) {
  const isLocal = process.env["AWS_SAM_LOCAL"] == "true";
  
  if (isLocal)
    console.log("Detected local execution...");
    
  var responseData = {Value: "Custom Response Data"};
  
  let eventJson = JSON.stringify(event);

  console.log("Custom Init Function");
  console.log("Event: ");
  console.log(eventJson);

  switch(event.RequestType) {
    case "Update":
    case "Create":
      addOrUpdateItems(event.ResourceProperties.RequestItems, event.ResourceProperties.Region, event.ResourceProperties.TableName, isLocal);
    default:    
      break;
  }

  if (!isLocal)
    response.send(event, context, response.SUCCESS, responseData);

};

/**
 * @param {object} requestItems
 * @param {string} tableName
 * @param {string} regionName
 **/
addOrUpdateItems = async function (requestItems, regionName, tableName, isLocalExecution) {
  
  let params = {apiVersion: '2012-08-10'}; 

  if (isLocalExecution) {
    AWS.config.update({region: "local", endpoint: "http://localstack:4569"});
  }  else {
    // Set the region
    AWS.config.update({region: regionName});
  }

  // Create DynamoDB service object
  var ddb = new AWS.DynamoDB(params);

  let map = {};
  
  map[tableName] = requestItems;
  
  var writeItemParams = {
    RequestItems: map
  } 

  console.log("Params to write to dynamodb:");
  console.log(JSON.stringify(writeItemParams));

  ddb.batchWriteItem(writeItemParams, (err, data) => {
    if (err)
      console.log("err: " + JSON.stringify(err));
    else  
      console.log("data: " + JSON.stringify(data));
  });
}