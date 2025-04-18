#!/usr/bin/env node
"use strict";

// bin/prettier.cjs
var nodeModule = require("module");
if (typeof nodeModule.enableCompileCache === "function") {
  nodeModule.enableCompileCache();
}
var dynamicImport = new Function("module", "return import(module)");
if (process.env.PRETTIER_EXPERIMENTAL_CLI) {
  dynamicImport("@prettier/cli/bin");
} else {
  promise = dynamicImport("../internal/legacy-cli.mjs").then(function runCli(cli) {
    return cli.run();
  });
  module.exports.__promise = promise;
}
var promise;
