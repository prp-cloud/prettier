#!/usr/bin/env node
"use strict";

// bin/prettier.cjs
var nodeModule = require("module");
if (typeof nodeModule.enableCompileCache === "function") {
  nodeModule.enableCompileCache();
}
var dynamicImport = new Function("module", "return import(module)");
var promise;
var index = process.argv.indexOf("--experimental-cli");
if (process.env.PRETTIER_EXPERIMENTAL_CLI || index !== -1) {
  if (index !== -1) {
    process.argv.splice(index, 1);
  }
  promise = dynamicImport("../internal/experimental-cli.mjs").then(
    function(cli) {
      return cli.__promise;
    }
  );
} else {
  promise = dynamicImport("../internal/legacy-cli.mjs").then(function runCli(cli) {
    return cli.run();
  });
}
module.exports.__promise = promise;
