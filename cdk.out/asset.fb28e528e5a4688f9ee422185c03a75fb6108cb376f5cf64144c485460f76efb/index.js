"use strict";

// assets/handler/hit-counter/hit-counter-handler.ts
var import_aws_sdk = require("aws-sdk");
exports.handler = async (event) => {
  console.log("request:", JSON.stringify(event, void 0, 2));
  const dynamo = new import_aws_sdk.DynamoDB();
  const lambda = new import_aws_sdk.Lambda();
  console.log("process.env.HITS_TABLE_NAME", process.env.HITS_TABLE_NAME);
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: event.path } },
    UpdateExpression: "ADD hits :incr",
    ExpressionAttributeValues: { ":incr": { N: "1" } }
  }).promise();
  const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event)
  }).promise();
  console.log("downstream response:", JSON.stringify(resp, void 0, 2));
  return JSON.parse(resp.Payload.toString());
};
