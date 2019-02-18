var AWS = require('aws-sdk');
var customResource = require('custom-resource-env');

const s3 = new AWS.S3();    

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
 * @param {string} event.ResourceProperties.BucketName - The name of the bucket to clear
 **/
exports.handler = function(event, context) {
  customResource.cloudFormationEventContext(event, context, async () => {
    if (event.RequestType == "Delete") {
      if (customResource.useLocalEnv) AWS.config.update({ endpoint: customResource.localEnv.endpoints.S3});

      await clearBucket(s3, event.ResourceProperties.BucketName);
    }  
  });
}

/**
 *
 * @param {AWS.S3} client - The aws s3 client to use for the operations
 * @param {object} deleteParams - The params to delete
 **/
deleteObject = async function (client, deleteParams) {
  return await client.deleteObject(deleteParams).promise();
}

/**
 *
 * @param {AWS.S3} client - The aws s3 client to use for the operations
 * @param {string} bucket - The bucket name to remove
 * @returns {Promise} - The clear bucket operation
 **/
clearBucket = async function (client, bucket) {

  let data = await client.listObjects({Bucket: bucket}).promise();

  let items = data.Contents;

  for (var i = 0; i < items.length; i += 1) {
      var deleteParams = {Bucket: bucket, Key: items[i].Key};
      await deleteObject(client, deleteParams);
  }
}