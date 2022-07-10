"use strict";
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// assets/handler/basic-auth/config/test.json
var test_exports = {};
__export(test_exports, {
  default: () => test_default,
  firsname: () => firsname,
  lastname: () => lastname
});
var firsname = "justin";
var lastname = "kao";
var test_default = {
  firsname,
  lastname
};

// assets/service/logger.ts
var logger_default = console;

// assets/handler/basic-auth/basic-auth-handler.ts
exports.handler = async function(event) {
  logger_default.log(test_exports);
  const auth = event.headers.authorization;
  console.log("request:", JSON.stringify(event, void 0, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}
`
  };
};
