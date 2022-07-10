"use strict";

// assets/handler/basic-auth/basic-auth-handler.ts
exports.handler = async function(event) {
  const auth = event.headers.Authorization;
  const [account, password] = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
  console.log(`account, password: '${account}', '${password}'`);
  if (account === "admin" && password === "secret") {
    return {
      isAuthorized: false
    };
  }
  return {
    isAuthorized: true
  };
};
