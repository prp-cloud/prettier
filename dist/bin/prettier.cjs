#!/usr/bin/env node
"use strict";

// bin/prettier.cjs
var nodeModule = require("module");
if (typeof nodeModule.enableCompileCache === "function") {
  nodeModule.enableCompileCache();
}
function runCli(cli) {
  return cli.run();
}
var dynamicImport = new Function("module", "return import(module)");
var promise = dynamicImport("../internal/cli.mjs").then(runCli);
module.exports.__promise = promise;
