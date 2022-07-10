"use strict";
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// assets/handler/config/test.json
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

// assets/handler/basic-auth-handler.ts
exports.handler = async function(event) {
  console.log(test_exports);
  const auth = event.headers.authorization;
  const [account, password] = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
  console.log(`account, password: '${account}', '${password}'`);
  if (account === "admin" && password === "secret") {
    return {
      isAuthorized: true,
      context: {
        isAuthorized: true
      }
    };
  }
  return {
    isAuthorized: true,
    context: {
      isAuthorized: false
    }
  };
};
