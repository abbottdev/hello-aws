var response = require('cfn-response');
var AWS = require('aws-sdk');

const localEnvEndpoints = require('./local-stack-endpoints');
const isLocalExecutionEnv = process.env["AWS_SAM_LOCAL"] == "true" || process.env["NODE_ENV"] == "test";
const envRegionName = process.env["AWS_REGION"];

exports.localEnv = {
  endpoints: localEnvEndpoints.default
};

exports.useLocalEnv =  isLocalExecutionEnv;

/**
 * @callback executeCallback
 * @param {string} [regionName]
 * @returns {Promise}
 */

/**
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
 * @param {Object} context - Cloud formation execution context
 * @param {executeCallback} execute - Main execution logic
 **/
exports.cloudFormationEventContext = function(event, context, execute) {

  try {
    let regionName = (isLocalExecutionEnv ? "local" :  event.ResourceProperties["Region"] || envRegionName);

    AWS.config.update({region: regionName});
    
    var promise = execute(regionName);

    if (promise != null) {
      promise.catch(reason => {
        console.log(error);
        if (!isLocalExecutionEnv) response.send(event, context, response.SUCCESS, error); 
      }).then(responseData => {
        if (responseData == null) responseData = {};
    
        if (!isLocalExecutionEnv) response.send(event, context, response.SUCCESS, responseData);
      });

      return;
    }
  } catch (error) {
    if (!isLocalExecutionEnv) response.send(event, context, response.SUCCESS, error);
  }

}
