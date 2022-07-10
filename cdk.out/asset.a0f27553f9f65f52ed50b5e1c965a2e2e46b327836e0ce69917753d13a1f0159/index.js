"use strict";

// assets/handler/hit-counter/hit-counter-handler.ts
var import_aws_sdk = require("aws-sdk");
exports.handler = async (event) => {
  console.log("request:", JSON.stringify(event, void 0, 2));
  const dynamo = new import_aws_sdk.DynamoDB();
  const lambda = new import_aws_sdk.Lambda();
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: event.rawPath } },
    UpdateExpression: "ADD hits :incr",
    ExpressionAttributeValues: { ":incr": { N: "1" } }
  }).promise();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.rawPath}
`
  };
};
