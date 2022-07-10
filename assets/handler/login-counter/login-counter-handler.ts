import { DynamoDB } from 'aws-sdk';

exports.handler = async (event: any) => {
  console.log("request:", JSON.stringify(event, undefined, 2))
  const { authorizer, http } = event.requestContext;
  const { isAuthorized } = authorizer.lambda;
  const { path } = http;

  // create aws clients
  const dynamo = new DynamoDB();

  const headers: {[index: string]: string} = { 
    "Content-Type": "text/plain",
  };

  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME!,
    Key: { path: { S: path } },
    UpdateExpression: 'ADD SucessHits :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' } }
  }).promise();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(event)
  };
}