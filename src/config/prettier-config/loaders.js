import { pathToFileURL } from "node:url";

import parseToml from "@iarna/toml/parse-async.js";
import { load as parseYaml } from "js-yaml";
import json5 from "json5";
import parseJson from "parse-json";

import readFile from "../../utils/read-file.js";

async function readJson(file) {
  const content = await readFile(file);
  try {
    return parseJson(content);
  } catch (/** @type {any} */ error) {
    error.message = `JSON Error in ${file}:\n${error.message}`;
    throw error;
  }
}

async function loadJs(file) {
  const module = await import(pathToFileURL(file).href);
  return module.default;
}

async function loadConfigFromPackageJson(file) {
  const { prettier } = await readJson(file);
  return prettier;
}

async function loadYaml(file) {
  const content = await readFile(file);
  try {
    return parseYaml(content);
  } catch (/** @type {any} */ error) {
    error.message = `YAML Error in ${file}:\n${error.message}`;
    throw error;
  }
}

const loaders = {
  async ".toml"(file) {
    const content = await readFile(file);
    try {
      return await parseToml(content);
    } catch (/** @type {any} */ error) {
      error.message = `TOML Error in ${file}:\n${error.message}`;
      throw error;
    }
  },
  async ".json5"(file) {
    const content = await readFile(file);
    try {
      return json5.parse(content);
    } catch (/** @type {any} */ error) {
      error.message = `JSON5 Error in ${file}:\n${error.message}`;
      throw error;
    }
  },
  ".json": readJson,
  ".js": loadJs,
  ".mjs": loadJs,
  ".cjs": loadJs,
  ".yaml": loadYaml,
  ".yml": loadYaml,
  // No extension
  "": loadYaml,
};

export default loaders;
export { loadConfigFromPackageJson, readJson };
