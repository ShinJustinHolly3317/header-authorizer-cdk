"use strict";

// assets/handler/login-counter/login-counter-handler.ts
var import_aws_sdk = require("aws-sdk");
exports.handler = async (event) => {
  console.log("request:", JSON.stringify(event, void 0, 2));
  const { authorizer, http } = event.requestContext;
  const { isAuthorized } = authorizer.lambda;
  const { path } = http;
  const dynamo = new import_aws_sdk.DynamoDB();
  const headers = {
    "Content-Type": "text/plain"
  };
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: path } },
    UpdateExpression: "ADD FailHits :incr",
    ExpressionAttributeValues: { ":incr": { N: "1" } }
  }).promise();
  return {
    statusCode: 200,
    headers,
    body: `${event}`
  };
};
