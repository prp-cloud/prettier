import { createRequire as __prettierCreateRequire } from "module";
import { fileURLToPath as __prettierFileUrlToPath } from "url";
import { dirname as __prettierDirname } from "path";
const require = __prettierCreateRequire(import.meta.url);
const __filename = __prettierFileUrlToPath(import.meta.url);
const __dirname = __prettierDirname(__filename);

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// packages/plugin-oxc/index.js
var index_exports = {};
__export(index_exports, {
  languages: () => languages_evaluate_default,
  options: () => options_default,
  parsers: () => parsers,
  printers: () => printers
});

// src/language-js/parse/oxc.js
var oxc_exports = {};
__export(oxc_exports, {
  oxc: () => oxc,
  "oxc-ts": () => oxcTs
});

// node_modules/index-to-position/index.js
function getPosition(text, textIndex) {
  const lineBreakBefore = textIndex === 0 ? -1 : text.lastIndexOf("\n", textIndex - 1);
  return {
    line: lineBreakBefore === -1 ? 0 : text.slice(0, lineBreakBefore + 1).match(/\n/g).length,
    column: textIndex - lineBreakBefore - 1
  };
}
function indexToPosition(text, textIndex, { oneBased = false } = {}) {
  if (typeof text !== "string") {
    throw new TypeError("Text parameter should be a string");
  }
  if (!Number.isInteger(textIndex)) {
    throw new TypeError("Index parameter should be an integer");
  }
  if (textIndex < 0 || textIndex > text.length) {
    throw new RangeError("Index out of bounds");
  }
  const position = getPosition(text, textIndex);
  return oneBased ? { line: position.line + 1, column: position.column + 1 } : position;
}

// src/language-js/parse/oxc.js
import * as oxcParser from "oxc-parser";

// src/common/parser-create-error.js
function createError(message, options2) {
  const error = new SyntaxError(
    message + " (" + options2.loc.start.line + ":" + options2.loc.start.column + ")"
  );
  return Object.assign(error, options2);
}
var parser_create_error_default = createError;

// src/utils/try-combinations.js
async function tryCombinationsAsync(combinations) {
  const errors = [];
  for (const fn of combinations) {
    try {
      return await fn();
    } catch (error) {
      errors.push(error);
    }
  }
  throw Object.assign(new Error("All combinations failed"), { errors });
}

// scripts/build/shims/array-find-last.js
var arrayFindLast = (isOptionalObject, array, callback) => {
  if (isOptionalObject && (array === void 0 || array === null)) {
    return;
  }
  if (array.findLast) {
    return array.findLast(callback);
  }
  for (let index = array.length - 1; index >= 0; index--) {
    const element = array[index];
    if (callback(element, index, array)) {
      return element;
    }
  }
};
var array_find_last_default = arrayFindLast;

// scripts/build/shims/at.js
var at = (isOptionalObject, object, index) => {
  if (isOptionalObject && (object === void 0 || object === null)) {
    return;
  }
  if (Array.isArray(object) || typeof object === "string") {
    return object[index < 0 ? object.length + index : index];
  }
  return object.at(index);
};
var at_default = at;

// src/language-js/loc.js
var isIndex = (value) => Number.isInteger(value) && value >= 0;
function locStart(node) {
  const start = node.range?.[0] ?? node.start;
  if (false) {
    throw new TypeError("Can't not locate node.");
  }
  const firstDecorator = (node.declaration?.decorators ?? node.decorators)?.[0];
  if (firstDecorator) {
    return Math.min(locStart(firstDecorator), start);
  }
  return start;
}
function locEnd(node) {
  const end = node.range?.[1] ?? node.end;
  if (false) {
    throw new TypeError("Can't not locate node.");
  }
  return end;
}
function hasSameLocStart(nodeA, nodeB) {
  const nodeAStart = locStart(nodeA);
  return isIndex(nodeAStart) && nodeAStart === locStart(nodeB);
}
function hasSameLocEnd(nodeA, nodeB) {
  const nodeAEnd = locEnd(nodeA);
  return isIndex(nodeAEnd) && nodeAEnd === locEnd(nodeB);
}
function hasSameLoc(nodeA, nodeB) {
  return hasSameLocStart(nodeA, nodeB) && hasSameLocEnd(nodeA, nodeB);
}

// src/language-js/utils/create-type-check-function.js
function createTypeCheckFunction(typesArray) {
  const types = new Set(typesArray);
  return (node) => types.has(node?.type);
}
var create_type_check_function_default = createTypeCheckFunction;

// src/language-js/utils/get-raw.js
function getRaw(node) {
  return node.extra?.raw ?? node.raw;
}
var get_raw_default = getRaw;

// src/language-js/utils/get-text-without-comments.js
function getTextWithoutComments(options2, start, end) {
  let text = options2.originalText.slice(start, end);
  for (const comment of options2[Symbol.for("comments")]) {
    const commentStart = locStart(comment);
    if (commentStart > end) {
      break;
    }
    const commentEnd = locEnd(comment);
    if (commentEnd < start) {
      continue;
    }
    const commentLength = commentEnd - commentStart;
    text = text.slice(0, commentStart - start) + " ".repeat(commentLength) + text.slice(commentEnd - start);
  }
  if (false) {
    assert.ok(text.length === end - start);
  }
  return text;
}
var get_text_without_comments_default = getTextWithoutComments;

// src/language-js/utils/is-block-comment.js
var isBlockComment = create_type_check_function_default([
  "Block",
  "CommentBlock",
  // `meriyah`
  "MultiLine"
]);
var is_block_comment_default = isBlockComment;

// src/language-js/utils/is-line-comment.js
var isLineComment = create_type_check_function_default([
  "Line",
  "CommentLine",
  // `meriyah` has `SingleLine`, `HashbangComment`, `HTMLOpen`, and `HTMLClose`
  "SingleLine",
  "HashbangComment",
  "HTMLOpen",
  "HTMLClose",
  // `espree`, and `oxc`(with `{astType: 'ts'}`)
  "Hashbang",
  // `babel` and `flow` hashbang
  "InterpreterDirective"
]);
var is_line_comment_default = isLineComment;

// src/language-js/utils/is-type-cast-comment.js
var cache = /* @__PURE__ */ new WeakMap();
function isTypeCastComment(comment) {
  if (!cache.has(comment)) {
    cache.set(
      comment,
      is_block_comment_default(comment) && comment.value[0] === "*" && // TypeScript expects the type to be enclosed in curly brackets, however
      // Closure Compiler accepts types in parens and even without any delimiters at all.
      // That's why we just search for "@type" and "@satisfies".
      /@(?:type|satisfies)\b/u.test(comment.value)
    );
  }
  return cache.get(comment);
}
var is_type_cast_comment_default = isTypeCastComment;

// src/language-js/utils/is-indentable-block-comment.js
function isIndentableBlockCommentInternal(comment) {
  if (!is_block_comment_default(comment)) {
    return false;
  }
  const lines = `*${comment.value}*`.split("\n");
  return lines.length > 1 && lines.every((line2) => line2.trimStart()[0] === "*");
}
var cache2 = /* @__PURE__ */ new WeakMap();
function isIndentableBlockComment(comment) {
  if (!cache2.has(comment)) {
    cache2.set(comment, isIndentableBlockCommentInternal(comment));
  }
  return cache2.get(comment);
}
var is_indentable_block_comment_default = isIndentableBlockComment;

// src/language-js/parse/postprocess/merge-nestled-jsdoc-comments.js
function mergeNestledJsdocComments(comments) {
  if (comments.length < 2) {
    return;
  }
  let followingComment;
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    if (followingComment && locEnd(comment) === locStart(followingComment) && is_indentable_block_comment_default(comment) && is_indentable_block_comment_default(followingComment)) {
      comments.splice(i + 1, 1);
      comment.value += "*//*" + followingComment.value;
      comment.range = [locStart(comment), locEnd(followingComment)];
    }
    if (!is_line_comment_default(comment) && !is_block_comment_default(comment)) {
      throw new TypeError(`Unknown comment type: "${comment.type}".`);
    }
    followingComment = comment;
  }
}
var merge_nestled_jsdoc_comments_default = mergeNestledJsdocComments;

// node_modules/to-fast-properties/index.js
var fastProto = null;
function FastObject(object) {
  if (fastProto !== null && typeof fastProto.property) {
    const result = fastProto;
    fastProto = FastObject.prototype = null;
    return result;
  }
  fastProto = FastObject.prototype = object == null ? /* @__PURE__ */ Object.create(null) : object;
  return new FastObject();
}
var inlineCacheCutoff = 10;
for (let index = 0; index <= inlineCacheCutoff; index++) {
  FastObject();
}
function toFastproperties(object) {
  return FastObject(object);
}

// src/utils/create-get-visitor-keys.js
function createGetVisitorKeys(visitorKeys, typeProperty = "type") {
  toFastproperties(visitorKeys);
  function getVisitorKeys2(node) {
    const type = node[typeProperty];
    if (false) {
      throw new Error(
        `Can't get node type, you must pass the wrong typeProperty '${typeProperty}'`
      );
    }
    const keys = visitorKeys[type];
    if (!Array.isArray(keys)) {
      throw Object.assign(new Error(`Missing visitor keys for '${type}'.`), {
        node
      });
    }
    return keys;
  }
  return getVisitorKeys2;
}
var create_get_visitor_keys_default = createGetVisitorKeys;

// src/language-js/traverse/visitor-keys.evaluate.js
var visitor_keys_evaluate_default = {
  "ArrayExpression": [
    "elements"
  ],
  "AssignmentExpression": [
    "left",
    "right"
  ],
  "BinaryExpression": [
    "left",
    "right"
  ],
  "InterpreterDirective": [],
  "Directive": [
    "value"
  ],
  "DirectiveLiteral": [],
  "BlockStatement": [
    "directives",
    "body"
  ],
  "BreakStatement": [
    "label"
  ],
  "CallExpression": [
    "callee",
    "typeParameters",
    "typeArguments",
    "arguments"
  ],
  "CatchClause": [
    "param",
    "body"
  ],
  "ConditionalExpression": [
    "test",
    "consequent",
    "alternate"
  ],
  "ContinueStatement": [
    "label"
  ],
  "DebuggerStatement": [],
  "DoWhileStatement": [
    "body",
    "test"
  ],
  "EmptyStatement": [],
  "ExpressionStatement": [
    "expression"
  ],
  "File": [
    "program"
  ],
  "ForInStatement": [
    "left",
    "right",
    "body"
  ],
  "ForStatement": [
    "init",
    "test",
    "update",
    "body"
  ],
  "FunctionDeclaration": [
    "id",
    "typeParameters",
    "params",
    "predicate",
    "returnType",
    "body"
  ],
  "FunctionExpression": [
    "id",
    "typeParameters",
    "params",
    "returnType",
    "body"
  ],
  "Identifier": [
    "typeAnnotation",
    "decorators"
  ],
  "IfStatement": [
    "test",
    "consequent",
    "alternate"
  ],
  "LabeledStatement": [
    "label",
    "body"
  ],
  "StringLiteral": [],
  "NumericLiteral": [],
  "NullLiteral": [],
  "BooleanLiteral": [],
  "RegExpLiteral": [],
  "LogicalExpression": [
    "left",
    "right"
  ],
  "MemberExpression": [
    "object",
    "property"
  ],
  "NewExpression": [
    "callee",
    "typeParameters",
    "typeArguments",
    "arguments"
  ],
  "Program": [
    "directives",
    "body"
  ],
  "ObjectExpression": [
    "properties"
  ],
  "ObjectMethod": [
    "decorators",
    "key",
    "typeParameters",
    "params",
    "returnType",
    "body"
  ],
  "ObjectProperty": [
    "decorators",
    "key",
    "value"
  ],
  "RestElement": [
    "argument",
    "typeAnnotation",
    "decorators"
  ],
  "ReturnStatement": [
    "argument"
  ],
  "SequenceExpression": [
    "expressions"
  ],
  "ParenthesizedExpression": [
    "expression"
  ],
  "SwitchCase": [
    "test",
    "consequent"
  ],
  "SwitchStatement": [
    "discriminant",
    "cases"
  ],
  "ThisExpression": [],
  "ThrowStatement": [
    "argument"
  ],
  "TryStatement": [
    "block",
    "handler",
    "finalizer"
  ],
  "UnaryExpression": [
    "argument"
  ],
  "UpdateExpression": [
    "argument"
  ],
  "VariableDeclaration": [
    "declarations"
  ],
  "VariableDeclarator": [
    "id",
    "init"
  ],
  "WhileStatement": [
    "test",
    "body"
  ],
  "WithStatement": [
    "object",
    "body"
  ],
  "AssignmentPattern": [
    "left",
    "right",
    "decorators",
    "typeAnnotation"
  ],
  "ArrayPattern": [
    "elements",
    "typeAnnotation",
    "decorators"
  ],
  "ArrowFunctionExpression": [
    "typeParameters",
    "params",
    "predicate",
    "returnType",
    "body"
  ],
  "ClassBody": [
    "body"
  ],
  "ClassExpression": [
    "decorators",
    "id",
    "typeParameters",
    "superClass",
    "superTypeParameters",
    "mixins",
    "implements",
    "body",
    "superTypeArguments"
  ],
  "ClassDeclaration": [
    "decorators",
    "id",
    "typeParameters",
    "superClass",
    "superTypeParameters",
    "mixins",
    "implements",
    "body",
    "superTypeArguments"
  ],
  "ExportAllDeclaration": [
    "source",
    "attributes",
    "exported"
  ],
  "ExportDefaultDeclaration": [
    "declaration"
  ],
  "ExportNamedDeclaration": [
    "declaration",
    "specifiers",
    "source",
    "attributes"
  ],
  "ExportSpecifier": [
    "local",
    "exported"
  ],
  "ForOfStatement": [
    "left",
    "right",
    "body"
  ],
  "ImportDeclaration": [
    "specifiers",
    "source",
    "attributes"
  ],
  "ImportDefaultSpecifier": [
    "local"
  ],
  "ImportNamespaceSpecifier": [
    "local"
  ],
  "ImportSpecifier": [
    "imported",
    "local"
  ],
  "ImportExpression": [
    "source",
    "options"
  ],
  "MetaProperty": [
    "meta",
    "property"
  ],
  "ClassMethod": [
    "decorators",
    "key",
    "typeParameters",
    "params",
    "returnType",
    "body"
  ],
  "ObjectPattern": [
    "decorators",
    "properties",
    "typeAnnotation"
  ],
  "SpreadElement": [
    "argument"
  ],
  "Super": [],
  "TaggedTemplateExpression": [
    "tag",
    "typeParameters",
    "quasi",
    "typeArguments"
  ],
  "TemplateElement": [],
  "TemplateLiteral": [
    "quasis",
    "expressions"
  ],
  "YieldExpression": [
    "argument"
  ],
  "AwaitExpression": [
    "argument"
  ],
  "BigIntLiteral": [],
  "ExportNamespaceSpecifier": [
    "exported"
  ],
  "OptionalMemberExpression": [
    "object",
    "property"
  ],
  "OptionalCallExpression": [
    "callee",
    "typeParameters",
    "typeArguments",
    "arguments"
  ],
  "ClassProperty": [
    "decorators",
    "variance",
    "key",
    "typeAnnotation",
    "value"
  ],
  "ClassAccessorProperty": [
    "decorators",
    "key",
    "typeAnnotation",
    "value"
  ],
  "ClassPrivateProperty": [
    "decorators",
    "variance",
    "key",
    "typeAnnotation",
    "value"
  ],
  "ClassPrivateMethod": [
    "decorators",
    "key",
    "typeParameters",
    "params",
    "returnType",
    "body"
  ],
  "PrivateName": [
    "id"
  ],
  "StaticBlock": [
    "body"
  ],
  "ImportAttribute": [
    "key",
    "value"
  ],
  "AnyTypeAnnotation": [],
  "ArrayTypeAnnotation": [
    "elementType"
  ],
  "BooleanTypeAnnotation": [],
  "BooleanLiteralTypeAnnotation": [],
  "NullLiteralTypeAnnotation": [],
  "ClassImplements": [
    "id",
    "typeParameters"
  ],
  "DeclareClass": [
    "id",
    "typeParameters",
    "extends",
    "mixins",
    "implements",
    "body"
  ],
  "DeclareFunction": [
    "id",
    "predicate"
  ],
  "DeclareInterface": [
    "id",
    "typeParameters",
    "extends",
    "body"
  ],
  "DeclareModule": [
    "id",
    "body"
  ],
  "DeclareModuleExports": [
    "typeAnnotation"
  ],
  "DeclareTypeAlias": [
    "id",
    "typeParameters",
    "right"
  ],
  "DeclareOpaqueType": [
    "id",
    "typeParameters",
    "supertype"
  ],
  "DeclareVariable": [
    "id"
  ],
  "DeclareExportDeclaration": [
    "declaration",
    "specifiers",
    "source",
    "attributes"
  ],
  "DeclareExportAllDeclaration": [
    "source",
    "attributes"
  ],
  "DeclaredPredicate": [
    "value"
  ],
  "ExistsTypeAnnotation": [],
  "FunctionTypeAnnotation": [
    "typeParameters",
    "this",
    "params",
    "rest",
    "returnType"
  ],
  "FunctionTypeParam": [
    "name",
    "typeAnnotation"
  ],
  "GenericTypeAnnotation": [
    "id",
    "typeParameters"
  ],
  "InferredPredicate": [],
  "InterfaceExtends": [
    "id",
    "typeParameters"
  ],
  "InterfaceDeclaration": [
    "id",
    "typeParameters",
    "extends",
    "body"
  ],
  "InterfaceTypeAnnotation": [
    "extends",
    "body"
  ],
  "IntersectionTypeAnnotation": [
    "types"
  ],
  "MixedTypeAnnotation": [],
  "EmptyTypeAnnotation": [],
  "NullableTypeAnnotation": [
    "typeAnnotation"
  ],
  "NumberLiteralTypeAnnotation": [],
  "NumberTypeAnnotation": [],
  "ObjectTypeAnnotation": [
    "properties",
    "indexers",
    "callProperties",
    "internalSlots"
  ],
  "ObjectTypeInternalSlot": [
    "id",
    "value"
  ],
  "ObjectTypeCallProperty": [
    "value"
  ],
  "ObjectTypeIndexer": [
    "variance",
    "id",
    "key",
    "value"
  ],
  "ObjectTypeProperty": [
    "key",
    "value",
    "variance"
  ],
  "ObjectTypeSpreadProperty": [
    "argument"
  ],
  "OpaqueType": [
    "id",
    "typeParameters",
    "supertype",
    "impltype"
  ],
  "QualifiedTypeIdentifier": [
    "qualification",
    "id"
  ],
  "StringLiteralTypeAnnotation": [],
  "StringTypeAnnotation": [],
  "SymbolTypeAnnotation": [],
  "ThisTypeAnnotation": [],
  "TupleTypeAnnotation": [
    "types",
    "elementTypes"
  ],
  "TypeofTypeAnnotation": [
    "argument",
    "typeArguments"
  ],
  "TypeAlias": [
    "id",
    "typeParameters",
    "right"
  ],
  "TypeAnnotation": [
    "typeAnnotation"
  ],
  "TypeCastExpression": [
    "expression",
    "typeAnnotation"
  ],
  "TypeParameter": [
    "bound",
    "default",
    "variance"
  ],
  "TypeParameterDeclaration": [
    "params"
  ],
  "TypeParameterInstantiation": [
    "params"
  ],
  "UnionTypeAnnotation": [
    "types"
  ],
  "Variance": [],
  "VoidTypeAnnotation": [],
  "EnumDeclaration": [
    "id",
    "body"
  ],
  "EnumBooleanBody": [
    "members"
  ],
  "EnumNumberBody": [
    "members"
  ],
  "EnumStringBody": [
    "members"
  ],
  "EnumSymbolBody": [
    "members"
  ],
  "EnumBooleanMember": [
    "id",
    "init"
  ],
  "EnumNumberMember": [
    "id",
    "init"
  ],
  "EnumStringMember": [
    "id",
    "init"
  ],
  "EnumDefaultedMember": [
    "id"
  ],
  "IndexedAccessType": [
    "objectType",
    "indexType"
  ],
  "OptionalIndexedAccessType": [
    "objectType",
    "indexType"
  ],
  "JSXAttribute": [
    "name",
    "value"
  ],
  "JSXClosingElement": [
    "name"
  ],
  "JSXElement": [
    "openingElement",
    "children",
    "closingElement"
  ],
  "JSXEmptyExpression": [],
  "JSXExpressionContainer": [
    "expression"
  ],
  "JSXSpreadChild": [
    "expression"
  ],
  "JSXIdentifier": [],
  "JSXMemberExpression": [
    "object",
    "property"
  ],
  "JSXNamespacedName": [
    "namespace",
    "name"
  ],
  "JSXOpeningElement": [
    "name",
    "typeParameters",
    "typeArguments",
    "attributes"
  ],
  "JSXSpreadAttribute": [
    "argument"
  ],
  "JSXText": [],
  "JSXFragment": [
    "openingFragment",
    "children",
    "closingFragment"
  ],
  "JSXOpeningFragment": [],
  "JSXClosingFragment": [],
  "Noop": [],
  "Placeholder": [],
  "V8IntrinsicIdentifier": [],
  "ArgumentPlaceholder": [],
  "BindExpression": [
    "object",
    "callee"
  ],
  "Decorator": [
    "expression"
  ],
  "DoExpression": [
    "body"
  ],
  "ExportDefaultSpecifier": [
    "exported"
  ],
  "ModuleExpression": [
    "body"
  ],
  "TopicReference": [],
  "PipelineTopicExpression": [
    "expression"
  ],
  "PipelineBareFunction": [
    "callee"
  ],
  "PipelinePrimaryTopicReference": [],
  "TSParameterProperty": [
    "parameter",
    "decorators"
  ],
  "TSDeclareFunction": [
    "id",
    "typeParameters",
    "params",
    "returnType",
    "body"
  ],
  "TSDeclareMethod": [
    "decorators",
    "key",
    "typeParameters",
    "params",
    "returnType"
  ],
  "TSQualifiedName": [
    "left",
    "right"
  ],
  "TSCallSignatureDeclaration": [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType"
  ],
  "TSConstructSignatureDeclaration": [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType"
  ],
  "TSPropertySignature": [
    "key",
    "typeAnnotation"
  ],
  "TSMethodSignature": [
    "key",
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType"
  ],
  "TSIndexSignature": [
    "parameters",
    "typeAnnotation"
  ],
  "TSAnyKeyword": [],
  "TSBooleanKeyword": [],
  "TSBigIntKeyword": [],
  "TSIntrinsicKeyword": [],
  "TSNeverKeyword": [],
  "TSNullKeyword": [],
  "TSNumberKeyword": [],
  "TSObjectKeyword": [],
  "TSStringKeyword": [],
  "TSSymbolKeyword": [],
  "TSUndefinedKeyword": [],
  "TSUnknownKeyword": [],
  "TSVoidKeyword": [],
  "TSThisType": [],
  "TSFunctionType": [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType"
  ],
  "TSConstructorType": [
    "typeParameters",
    "parameters",
    "typeAnnotation",
    "params",
    "returnType"
  ],
  "TSTypeReference": [
    "typeName",
    "typeParameters",
    "typeArguments"
  ],
  "TSTypePredicate": [
    "parameterName",
    "typeAnnotation"
  ],
  "TSTypeQuery": [
    "exprName",
    "typeParameters",
    "typeArguments"
  ],
  "TSTypeLiteral": [
    "members"
  ],
  "TSArrayType": [
    "elementType"
  ],
  "TSTupleType": [
    "elementTypes"
  ],
  "TSOptionalType": [
    "typeAnnotation"
  ],
  "TSRestType": [
    "typeAnnotation"
  ],
  "TSNamedTupleMember": [
    "label",
    "elementType"
  ],
  "TSUnionType": [
    "types"
  ],
  "TSIntersectionType": [
    "types"
  ],
  "TSConditionalType": [
    "checkType",
    "extendsType",
    "trueType",
    "falseType"
  ],
  "TSInferType": [
    "typeParameter"
  ],
  "TSParenthesizedType": [
    "typeAnnotation"
  ],
  "TSTypeOperator": [
    "typeAnnotation"
  ],
  "TSIndexedAccessType": [
    "objectType",
    "indexType"
  ],
  "TSMappedType": [
    "nameType",
    "typeAnnotation",
    "key",
    "constraint"
  ],
  "TSTemplateLiteralType": [
    "quasis",
    "types"
  ],
  "TSLiteralType": [
    "literal"
  ],
  "TSExpressionWithTypeArguments": [
    "expression",
    "typeParameters"
  ],
  "TSInterfaceDeclaration": [
    "id",
    "typeParameters",
    "extends",
    "body"
  ],
  "TSInterfaceBody": [
    "body"
  ],
  "TSTypeAliasDeclaration": [
    "id",
    "typeParameters",
    "typeAnnotation"
  ],
  "TSInstantiationExpression": [
    "expression",
    "typeParameters",
    "typeArguments"
  ],
  "TSAsExpression": [
    "expression",
    "typeAnnotation"
  ],
  "TSSatisfiesExpression": [
    "expression",
    "typeAnnotation"
  ],
  "TSTypeAssertion": [
    "typeAnnotation",
    "expression"
  ],
  "TSEnumBody": [
    "members"
  ],
  "TSEnumDeclaration": [
    "id",
    "body"
  ],
  "TSEnumMember": [
    "id",
    "initializer"
  ],
  "TSModuleDeclaration": [
    "id",
    "body"
  ],
  "TSModuleBlock": [
    "body"
  ],
  "TSImportType": [
    "argument",
    "options",
    "qualifier",
    "typeParameters",
    "typeArguments"
  ],
  "TSImportEqualsDeclaration": [
    "id",
    "moduleReference"
  ],
  "TSExternalModuleReference": [
    "expression"
  ],
  "TSNonNullExpression": [
    "expression"
  ],
  "TSExportAssignment": [
    "expression"
  ],
  "TSNamespaceExportDeclaration": [
    "id"
  ],
  "TSTypeAnnotation": [
    "typeAnnotation"
  ],
  "TSTypeParameterInstantiation": [
    "params"
  ],
  "TSTypeParameterDeclaration": [
    "params"
  ],
  "TSTypeParameter": [
    "constraint",
    "default",
    "name"
  ],
  "ChainExpression": [
    "expression"
  ],
  "ExperimentalRestProperty": [
    "argument"
  ],
  "ExperimentalSpreadProperty": [
    "argument"
  ],
  "Literal": [],
  "MethodDefinition": [
    "decorators",
    "key",
    "value"
  ],
  "PrivateIdentifier": [],
  "Property": [
    "key",
    "value"
  ],
  "PropertyDefinition": [
    "decorators",
    "key",
    "typeAnnotation",
    "value",
    "variance"
  ],
  "AccessorProperty": [
    "decorators",
    "key",
    "typeAnnotation",
    "value"
  ],
  "TSAbstractAccessorProperty": [
    "decorators",
    "key",
    "typeAnnotation"
  ],
  "TSAbstractKeyword": [],
  "TSAbstractMethodDefinition": [
    "key",
    "value"
  ],
  "TSAbstractPropertyDefinition": [
    "decorators",
    "key",
    "typeAnnotation"
  ],
  "TSAsyncKeyword": [],
  "TSClassImplements": [
    "expression",
    "typeArguments",
    "typeParameters"
  ],
  "TSDeclareKeyword": [],
  "TSEmptyBodyFunctionExpression": [
    "id",
    "typeParameters",
    "params",
    "returnType"
  ],
  "TSExportKeyword": [],
  "TSInterfaceHeritage": [
    "expression",
    "typeArguments",
    "typeParameters"
  ],
  "TSPrivateKeyword": [],
  "TSProtectedKeyword": [],
  "TSPublicKeyword": [],
  "TSReadonlyKeyword": [],
  "TSStaticKeyword": [],
  "AsConstExpression": [
    "expression"
  ],
  "AsExpression": [
    "expression",
    "typeAnnotation"
  ],
  "BigIntLiteralTypeAnnotation": [],
  "BigIntTypeAnnotation": [],
  "ComponentDeclaration": [
    "id",
    "params",
    "body",
    "typeParameters",
    "rendersType"
  ],
  "ComponentParameter": [
    "name",
    "local"
  ],
  "ComponentTypeAnnotation": [
    "params",
    "rest",
    "typeParameters",
    "rendersType"
  ],
  "ComponentTypeParameter": [
    "name",
    "typeAnnotation"
  ],
  "ConditionalTypeAnnotation": [
    "checkType",
    "extendsType",
    "trueType",
    "falseType"
  ],
  "DeclareComponent": [
    "id",
    "params",
    "rest",
    "typeParameters",
    "rendersType"
  ],
  "DeclareEnum": [
    "id",
    "body"
  ],
  "DeclareHook": [
    "id"
  ],
  "DeclareNamespace": [
    "id",
    "body"
  ],
  "EnumBigIntBody": [
    "members"
  ],
  "EnumBigIntMember": [
    "id",
    "init"
  ],
  "HookDeclaration": [
    "id",
    "params",
    "body",
    "typeParameters",
    "returnType"
  ],
  "HookTypeAnnotation": [
    "params",
    "returnType",
    "rest",
    "typeParameters"
  ],
  "InferTypeAnnotation": [
    "typeParameter"
  ],
  "KeyofTypeAnnotation": [
    "argument"
  ],
  "ObjectTypeMappedTypeProperty": [
    "keyTparam",
    "propType",
    "sourceType",
    "variance"
  ],
  "QualifiedTypeofIdentifier": [
    "qualification",
    "id"
  ],
  "TupleTypeLabeledElement": [
    "label",
    "elementType",
    "variance"
  ],
  "TupleTypeSpreadElement": [
    "label",
    "typeAnnotation"
  ],
  "TypeOperator": [
    "typeAnnotation"
  ],
  "TypePredicate": [
    "parameterName",
    "typeAnnotation",
    "asserts"
  ],
  "NGChainedExpression": [
    "expressions"
  ],
  "NGEmptyExpression": [],
  "NGPipeExpression": [
    "left",
    "right",
    "arguments"
  ],
  "NGMicrosyntax": [
    "body"
  ],
  "NGMicrosyntaxAs": [
    "key",
    "alias"
  ],
  "NGMicrosyntaxExpression": [
    "expression",
    "alias"
  ],
  "NGMicrosyntaxKey": [],
  "NGMicrosyntaxKeyedExpression": [
    "key",
    "expression"
  ],
  "NGMicrosyntaxLet": [
    "key",
    "value"
  ],
  "NGRoot": [
    "node"
  ],
  "JsExpressionRoot": [
    "node"
  ],
  "JsonRoot": [
    "node"
  ],
  "TSJSDocAllType": [],
  "TSJSDocUnknownType": [],
  "TSJSDocNullableType": [
    "typeAnnotation"
  ],
  "TSJSDocNonNullableType": [
    "typeAnnotation"
  ],
  "NeverTypeAnnotation": [],
  "SatisfiesExpression": [
    "expression",
    "typeAnnotation"
  ],
  "UndefinedTypeAnnotation": [],
  "UnknownTypeAnnotation": []
};

// src/language-js/traverse/get-visitor-keys.js
var getVisitorKeys = create_get_visitor_keys_default(visitor_keys_evaluate_default);
var get_visitor_keys_default = getVisitorKeys;

// src/language-js/parse/postprocess/visit-node.js
function visitNode(node, fn) {
  if (!(node !== null && typeof node === "object")) {
    return node;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      node[i] = visitNode(node[i], fn);
    }
    return node;
  }
  const keys = get_visitor_keys_default(node);
  for (let i = 0; i < keys.length; i++) {
    node[keys[i]] = visitNode(node[keys[i]], fn);
  }
  return fn(node) || node;
}
var visit_node_default = visitNode;

// src/language-js/parse/postprocess/index.js
var isNodeWithRaw = create_type_check_function_default([
  // Babel
  "RegExpLiteral",
  "BigIntLiteral",
  "NumericLiteral",
  "StringLiteral",
  // "NullLiteral",
  // "BooleanLiteral",
  "DirectiveLiteral",
  // ESTree
  "Literal",
  "JSXText",
  "TemplateElement",
  // Flow
  "StringLiteralTypeAnnotation",
  "NumberLiteralTypeAnnotation",
  "BigIntLiteralTypeAnnotation"
]);
function postprocess(ast, options2) {
  const { parser, text } = options2;
  const { comments } = ast;
  const isOxcTs = parser === "oxc" && options2.oxcAstType === "ts";
  merge_nestled_jsdoc_comments_default(comments);
  let typeCastCommentsEnds;
  ast = visit_node_default(ast, (node) => {
    switch (node.type) {
      case "ParenthesizedExpression": {
        const { expression } = node;
        const start = locStart(node);
        if (expression.type === "TypeCastExpression") {
          expression.range = [start, locEnd(node)];
          return expression;
        }
        let keepTypeCast = false;
        if (!isOxcTs) {
          if (!typeCastCommentsEnds) {
            typeCastCommentsEnds = [];
            for (const comment of comments) {
              if (is_type_cast_comment_default(comment)) {
                typeCastCommentsEnds.push(locEnd(comment));
              }
            }
          }
          const previousCommentEnd = array_find_last_default(
            /* isOptionalObject */
            false,
            typeCastCommentsEnds,
            (end) => end <= start
          );
          keepTypeCast = previousCommentEnd && // check that there are only white spaces between the comment and the parenthesis
          text.slice(previousCommentEnd, start).trim().length === 0;
        }
        if (!keepTypeCast) {
          expression.extra = { ...expression.extra, parenthesized: true };
          return expression;
        }
        break;
      }
      case "LogicalExpression":
        if (isUnbalancedLogicalTree(node)) {
          return rebalanceLogicalTree(node);
        }
        break;
      // This happens when use `oxc-parser` to parse `` `${foo satisfies bar}`; ``
      // https://github.com/oxc-project/oxc/issues/11313
      case "TemplateLiteral":
        if (node.expressions.length !== node.quasis.length - 1) {
          throw new Error("Malformed template literal.");
        }
        break;
      case "TemplateElement":
        if (parser === "flow" || parser === "hermes" || parser === "espree" || parser === "typescript" || isOxcTs) {
          const start = locStart(node) + 1;
          const end = locEnd(node) - (node.tail ? 1 : 2);
          node.range = [start, end];
        }
        break;
      // fix unexpected locEnd caused by --no-semi style
      case "VariableDeclaration": {
        const lastDeclaration = at_default(
          /* isOptionalObject */
          false,
          node.declarations,
          -1
        );
        if (lastDeclaration?.init && text[locEnd(lastDeclaration)] !== ";") {
          node.range = [locStart(node), locEnd(lastDeclaration)];
        }
        break;
      }
      // remove redundant TypeScript nodes
      case "TSParenthesizedType":
        return node.typeAnnotation;
      case "TSTypeParameter":
        fixBabelTSTypeParameter(node);
        break;
      // For hack-style pipeline
      case "TopicReference":
        ast.extra = { ...ast.extra, __isUsingHackPipeline: true };
        break;
      // In Flow parser, it doesn't generate union/intersection types for single type
      case "TSUnionType":
      case "TSIntersectionType":
        if (node.types.length === 1) {
          return node.types[0];
        }
        break;
      // Remove this when update `@babel/parser` to v8
      // https://github.com/typescript-eslint/typescript-eslint/pull/7065
      case "TSMappedType":
        if (!node.constraint && !node.key) {
          const { name: key, constraint } = fixBabelTSTypeParameter(
            node.typeParameter
          );
          node.constraint = constraint;
          node.key = key;
          delete node.typeParameter;
        }
        break;
      // Remove this when update `@babel/parser` to v8
      // https://github.com/typescript-eslint/typescript-eslint/pull/8920
      case "TSEnumDeclaration":
        if (!node.body) {
          const idEnd = locEnd(node.id);
          const { members } = node;
          const textWithoutComments = get_text_without_comments_default(
            {
              originalText: text,
              [Symbol.for("comments")]: comments
            },
            idEnd,
            members[0] ? locStart(members[0]) : locEnd(node)
          );
          const start = idEnd + textWithoutComments.indexOf("{");
          node.body = {
            type: "TSEnumBody",
            members,
            range: [start, locEnd(node)]
          };
          delete node.members;
        }
        break;
      // https://github.com/facebook/hermes/issues/1712
      case "ImportExpression":
        if (parser === "hermes" && node.attributes && !node.options) {
          node.options = node.attributes;
        }
        break;
    }
    if (false) {
      assertRaw(node, text);
    }
  });
  const program = ast.type === "File" ? ast.program : ast;
  if (program.interpreter) {
    comments.unshift(program.interpreter);
    delete program.interpreter;
  }
  if (isOxcTs && ast.hashbang) {
    comments.unshift(ast.hashbang);
    delete ast.hashbang;
  }
  if (false) {
    assertComments(comments, text);
  }
  if (ast.type === "Program") {
    ast.range = [0, text.length];
  }
  return ast;
}
function fixBabelTSTypeParameter(node) {
  if (node.type === "TSTypeParameter" && typeof node.name === "string") {
    const start = locStart(node);
    node.name = {
      type: "Identifier",
      name: node.name,
      range: [start, start + node.name.length]
    };
  }
  return node;
}
function isUnbalancedLogicalTree(node) {
  return node.type === "LogicalExpression" && node.right.type === "LogicalExpression" && node.operator === node.right.operator;
}
function rebalanceLogicalTree(node) {
  if (!isUnbalancedLogicalTree(node)) {
    return node;
  }
  return rebalanceLogicalTree({
    type: "LogicalExpression",
    operator: node.operator,
    left: rebalanceLogicalTree({
      type: "LogicalExpression",
      operator: node.operator,
      left: node.left,
      right: node.right.left,
      range: [locStart(node.left), locEnd(node.right.left)]
    }),
    right: node.right.right,
    range: [locStart(node), locEnd(node)]
  });
}
var postprocess_default = postprocess;

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

// node_modules/jest-docblock/build/index.js
var commentEndRe = /\*\/$/;
var commentStartRe = /^\/\*\*?/;
var docblockRe = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/;
var lineCommentRe = /(^|\s+)\/\/([^\n\r]*)/g;
var ltrimNewlineRe = /^(\r?\n)+/;
var multilineRe = /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g;
var propertyRe = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g;
var stringStartRe = /(\r?\n|^) *\* ?/g;
var STRING_ARRAY = [];
function extract(contents) {
  const match = contents.match(docblockRe);
  return match ? match[0].trimStart() : "";
}
function strip(contents) {
  const matchResult = contents.match(docblockRe);
  const match = matchResult?.[0];
  return match == null ? contents : contents.slice(match.length);
}
function parseWithComments(docblock) {
  const line2 = "\n";
  docblock = string_replace_all_default(
    /* isOptionalObject */
    false,
    docblock.replace(commentStartRe, "").replace(commentEndRe, ""),
    stringStartRe,
    "$1"
  );
  let prev = "";
  while (prev !== docblock) {
    prev = docblock;
    docblock = string_replace_all_default(
      /* isOptionalObject */
      false,
      docblock,
      multilineRe,
      `${line2}$1 $2${line2}`
    );
  }
  docblock = docblock.replace(ltrimNewlineRe, "").trimEnd();
  const result = /* @__PURE__ */ Object.create(null);
  const comments = string_replace_all_default(
    /* isOptionalObject */
    false,
    docblock,
    propertyRe,
    ""
  ).replace(ltrimNewlineRe, "").trimEnd();
  let match;
  while (match = propertyRe.exec(docblock)) {
    const nextPragma = string_replace_all_default(
      /* isOptionalObject */
      false,
      match[2],
      lineCommentRe,
      ""
    );
    if (typeof result[match[1]] === "string" || Array.isArray(result[match[1]])) {
      const resultElement = result[match[1]];
      result[match[1]] = [...STRING_ARRAY, ...Array.isArray(resultElement) ? resultElement : [resultElement], nextPragma];
    } else {
      result[match[1]] = nextPragma;
    }
  }
  return {
    comments,
    pragmas: result
  };
}
function print({
  comments = "",
  pragmas = {}
}) {
  const line2 = "\n";
  const head = "/**";
  const start = " *";
  const tail = " */";
  const keys = Object.keys(pragmas);
  const printedObject = keys.flatMap((key) => printKeyValues(key, pragmas[key])).map((keyValue) => `${start} ${keyValue}${line2}`).join("");
  if (!comments) {
    if (keys.length === 0) {
      return "";
    }
    if (keys.length === 1 && !Array.isArray(pragmas[keys[0]])) {
      const value = pragmas[keys[0]];
      return `${head} ${printKeyValues(keys[0], value)[0]}${tail}`;
    }
  }
  const printedComments = comments.split(line2).map((textLine) => `${start} ${textLine}`).join(line2) + line2;
  return head + line2 + (comments ? printedComments : "") + (comments && keys.length > 0 ? start + line2 : "") + printedObject + tail;
}
function printKeyValues(key, valueOrArray) {
  return [...STRING_ARRAY, ...Array.isArray(valueOrArray) ? valueOrArray : [valueOrArray]].map((value) => `@${key} ${value}`.trim());
}

// src/common/end-of-line.js
function convertEndOfLineToChars(value) {
  switch (value) {
    case "cr":
      return "\r";
    case "crlf":
      return "\r\n";
    default:
      return "\n";
  }
}

// src/utils/pragma/pragma.evaluate.js
var FORMAT_IGNORE_PRAGMAS = [
  "noformat",
  "noprettier"
];
var FORMAT_PRAGMAS = [
  "format",
  "prettier"
];
var FORMAT_PRAGMA_TO_INSERT = "format";

// src/language-js/utils/get-shebang.js
function getShebang(text) {
  if (!text.startsWith("#!")) {
    return "";
  }
  const index = text.indexOf("\n");
  if (index === -1) {
    return text;
  }
  return text.slice(0, index);
}
var get_shebang_default = getShebang;

// src/language-js/pragma.js
function parseDocBlock(text) {
  const shebang = get_shebang_default(text);
  if (shebang) {
    text = text.slice(shebang.length + 1);
  }
  const docBlock = extract(text);
  const { pragmas, comments } = parseWithComments(docBlock);
  return { shebang, text, pragmas, comments };
}
function hasPragma(text) {
  const { pragmas } = parseDocBlock(text);
  return FORMAT_PRAGMAS.some((pragma) => Object.prototype.hasOwnProperty.call(pragmas, pragma));
}
function hasIgnorePragma(text) {
  const { pragmas } = parseDocBlock(text);
  return FORMAT_IGNORE_PRAGMAS.some((pragma) => Object.prototype.hasOwnProperty.call(pragmas, pragma));
}
function insertPragma(originalText) {
  const { shebang, text, pragmas, comments } = parseDocBlock(originalText);
  const strippedText = strip(text);
  let docBlock = print({
    pragmas: {
      [FORMAT_PRAGMA_TO_INSERT]: "",
      ...pragmas
    },
    comments: comments.trimStart()
  });
  if (false) {
    docBlock = normalizeEndOfLine(docBlock);
  }
  return (shebang ? `${shebang}
` : "") + docBlock + (strippedText.startsWith("\n") ? "\n" : "\n\n") + strippedText;
}

// src/language-js/parse/utils/create-parser.js
function createParser(options2) {
  options2 = typeof options2 === "function" ? { parse: options2 } : options2;
  return {
    astFormat: "estree",
    hasPragma,
    hasIgnorePragma,
    locStart,
    locEnd,
    ...options2
  };
}
var create_parser_default = createParser;

// src/language-js/parse/utils/jsx-regexp.evaluate.js
var jsx_regexp_evaluate_default = /^[^"'`]*<\/|^[^/]{2}.*\/>/mu;

// src/language-js/parse/utils/source-types.js
var SOURCE_TYPE_MODULE = "module";
var SOURCE_TYPE_SCRIPT = "script";
function getSourceType(filepath) {
  if (typeof filepath !== "string") {
    return;
  }
  filepath = filepath.toLowerCase();
  if (/\.(?:mjs|mts)$/iu.test(filepath)) {
    return SOURCE_TYPE_MODULE;
  }
  if (/\.(?:cjs|cts)$/iu.test(filepath)) {
    return SOURCE_TYPE_SCRIPT;
  }
}

// src/language-js/parse/oxc.js
function createParseError(error, { text }) {
  if (!error?.labels?.[0]) {
    return error;
  }
  const {
    message,
    labels: [{ start: startIndex, end: endIndex }]
  } = error;
  const [start, end] = [startIndex, endIndex].map(
    (index) => indexToPosition(text, index, { oneBased: true })
  );
  return parser_create_error_default(message, {
    loc: {
      start,
      end
    },
    cause: error
  });
}
async function parseWithOptions(filepath, text, options2) {
  const result = await oxcParser.parseAsync(filepath, text, {
    preserveParens: true,
    showSemanticErrors: false,
    ...options2
  });
  const { errors } = result;
  for (const error of errors) {
    if (error.severity === "Error" && (error.message === "A 'return' statement can only be used within a function body." || /^Identifier `.*` has already been declared$/u.test(error.message))) {
      continue;
    }
    throw createParseError(error, { text });
  }
  return result;
}
async function parseJs(text, options2) {
  const filepath = options2?.filepath;
  const sourceType = getSourceType(filepath);
  const { program: ast, comments } = await parseWithOptions(
    typeof filepath === "string" ? filepath : "prettier.jsx",
    text,
    {
      sourceType,
      lang: "jsx"
    }
  );
  ast.comments = comments;
  return postprocess_default(ast, { text, parser: "oxc" });
}
function getLanguageCombinations(text, options2) {
  const filepath = options2?.filepath;
  if (typeof filepath === "string") {
    if (/\.(?:jsx|tsx)$/iu.test(filepath)) {
      return ["tsx"];
    }
    if (filepath.toLowerCase().endsWith(".d.ts")) {
      return ["dts"];
    }
  }
  const shouldEnableJsx = jsx_regexp_evaluate_default.test(text);
  return shouldEnableJsx ? ["tsx", "ts", "dts"] : ["ts", "tsx", "dts"];
}
async function parseTs(text, options2) {
  let filepath = options2?.filepath;
  const sourceType = getSourceType(filepath);
  const languageCombinations = getLanguageCombinations(text, options2);
  if (typeof filepath !== "string") {
    filepath = "prettier.tsx";
  }
  let result;
  try {
    result = await tryCombinationsAsync(
      languageCombinations.map(
        (language) => () => parseWithOptions(filepath, text, {
          sourceType,
          astType: "ts",
          lang: language
        })
      )
    );
  } catch ({
    // @ts-expect-error -- expected
    errors: [error]
  }) {
    throw error;
  }
  const { program: ast, comments } = result;
  ast.comments = comments;
  return postprocess_default(ast, { text, parser: "oxc", oxcAstType: "ts" });
}
var oxc = create_parser_default(parseJs);
var oxcTs = create_parser_default(parseTs);

// src/language-js/printer.js
var printer_exports = {};
__export(printer_exports, {
  canAttachComment: () => canAttachComment,
  embed: () => embed_default,
  experimentalFeatures: () => experimentalFeatures,
  getCommentChildNodes: () => getCommentChildNodes,
  getVisitorKeys: () => get_visitor_keys_default,
  handleComments: () => handle_comments_exports,
  insertPragma: () => insertPragma,
  isBlockComment: () => is_block_comment_default,
  isGap: () => isGap,
  massageAstNode: () => clean_default,
  print: () => print_default,
  printComment: () => printComment,
  willPrintOwnComments: () => willPrintOwnComments
});

// src/utils/is-object.js
function isObject(object) {
  return object !== null && typeof object === "object";
}
var is_object_default = isObject;

// src/utils/ast-utils.js
function* getChildren(node, options2) {
  const { getVisitorKeys: getVisitorKeys2, filter = () => true } = options2;
  const isMatchedNode = (node2) => is_object_default(node2) && filter(node2);
  for (const key of getVisitorKeys2(node)) {
    const value = node[key];
    if (Array.isArray(value)) {
      for (const child of value) {
        if (isMatchedNode(child)) {
          yield child;
        }
      }
    } else if (isMatchedNode(value)) {
      yield value;
    }
  }
}
function* getDescendants(node, options2) {
  const queue = [node];
  for (let index = 0; index < queue.length; index++) {
    const node2 = queue[index];
    for (const child of getChildren(node2, options2)) {
      yield child;
      queue.push(child);
    }
  }
}
function hasDescendant(node, { getVisitorKeys: getVisitorKeys2, predicate }) {
  for (const descendant of getDescendants(node, { getVisitorKeys: getVisitorKeys2 })) {
    if (predicate(descendant)) {
      return true;
    }
  }
  return false;
}

// node_modules/emoji-regex/index.mjs
var emoji_regex_default = () => {
  return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

// node_modules/get-east-asian-width/lookup.js
function isFullWidth(x) {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
}
function isWide(x) {
  return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9776 && x <= 9783 || x >= 9800 && x <= 9811 || x === 9855 || x >= 9866 && x <= 9871 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12773 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101631 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x >= 119552 && x <= 119638 || x >= 119648 && x <= 119670 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129673 || x >= 129679 && x <= 129734 || x >= 129742 && x <= 129756 || x >= 129759 && x <= 129769 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
}

// node_modules/get-east-asian-width/index.js
var _isNarrowWidth = (codePoint) => !(isFullWidth(codePoint) || isWide(codePoint));

// src/utils/get-string-width.js
var notAsciiRegex = /[^\x20-\x7F]/u;
function getStringWidth(text) {
  if (!text) {
    return 0;
  }
  if (!notAsciiRegex.test(text)) {
    return text.length;
  }
  text = text.replace(emoji_regex_default(), "  ");
  let width = 0;
  for (const character of text) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879) {
      continue;
    }
    width += _isNarrowWidth(codePoint) ? 1 : 2;
  }
  return width;
}
var get_string_width_default = getStringWidth;

// src/utils/skip.js
function skip(characters) {
  return (text, startIndex, options2) => {
    const backwards = Boolean(options2?.backwards);
    if (startIndex === false) {
      return false;
    }
    const { length } = text;
    let cursor2 = startIndex;
    while (cursor2 >= 0 && cursor2 < length) {
      const character = text.charAt(cursor2);
      if (characters instanceof RegExp) {
        if (!characters.test(character)) {
          return cursor2;
        }
      } else if (!characters.includes(character)) {
        return cursor2;
      }
      backwards ? cursor2-- : cursor2++;
    }
    if (cursor2 === -1 || cursor2 === length) {
      return cursor2;
    }
    return false;
  };
}
var skipWhitespace = skip(/\s/u);
var skipSpaces = skip(" 	");
var skipToLineEnd = skip(",; 	");
var skipEverythingButNewLine = skip(/[^\n\r]/u);

// src/utils/skip-newline.js
function skipNewline(text, startIndex, options2) {
  const backwards = Boolean(options2?.backwards);
  if (startIndex === false) {
    return false;
  }
  const character = text.charAt(startIndex);
  if (backwards) {
    if (text.charAt(startIndex - 1) === "\r" && character === "\n") {
      return startIndex - 2;
    }
    if (character === "\n" || character === "\r" || character === "\u2028" || character === "\u2029") {
      return startIndex - 1;
    }
  } else {
    if (character === "\r" && text.charAt(startIndex + 1) === "\n") {
      return startIndex + 2;
    }
    if (character === "\n" || character === "\r" || character === "\u2028" || character === "\u2029") {
      return startIndex + 1;
    }
  }
  return startIndex;
}
var skip_newline_default = skipNewline;

// src/utils/has-newline.js
function hasNewline(text, startIndex, options2 = {}) {
  const idx = skipSpaces(
    text,
    options2.backwards ? startIndex - 1 : startIndex,
    options2
  );
  const idx2 = skip_newline_default(text, idx, options2);
  return idx !== idx2;
}
var has_newline_default = hasNewline;

// src/utils/skip-inline-comment.js
function skipInlineComment(text, startIndex) {
  if (startIndex === false) {
    return false;
  }
  if (text.charAt(startIndex) === "/" && text.charAt(startIndex + 1) === "*") {
    for (let i = startIndex + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }
  return startIndex;
}
var skip_inline_comment_default = skipInlineComment;

// src/utils/skip-trailing-comment.js
function skipTrailingComment(text, startIndex) {
  if (startIndex === false) {
    return false;
  }
  if (text.charAt(startIndex) === "/" && text.charAt(startIndex + 1) === "/") {
    return skipEverythingButNewLine(text, startIndex);
  }
  return startIndex;
}
var skip_trailing_comment_default = skipTrailingComment;

// src/utils/is-next-line-empty.js
function isNextLineEmpty(text, startIndex) {
  let oldIdx = null;
  let idx = startIndex;
  while (idx !== oldIdx) {
    oldIdx = idx;
    idx = skipToLineEnd(text, idx);
    idx = skip_inline_comment_default(text, idx);
    idx = skipSpaces(text, idx);
  }
  idx = skip_trailing_comment_default(text, idx);
  idx = skip_newline_default(text, idx);
  return idx !== false && has_newline_default(text, idx);
}
var is_next_line_empty_default = isNextLineEmpty;

// src/utils/is-non-empty-array.js
function isNonEmptyArray(object) {
  return Array.isArray(object) && object.length > 0;
}
var is_non_empty_array_default = isNonEmptyArray;

// src/utils/print-string.js
import assert from "assert";

// src/utils/get-preferred-quote.js
var SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = '"';
function getPreferredQuote(text, preferredQuoteOrPreferSingleQuote) {
  const preferred = preferredQuoteOrPreferSingleQuote === true || preferredQuoteOrPreferSingleQuote === SINGLE_QUOTE ? SINGLE_QUOTE : DOUBLE_QUOTE;
  const alternate = preferred === SINGLE_QUOTE ? DOUBLE_QUOTE : SINGLE_QUOTE;
  let preferredQuoteCount = 0;
  let alternateQuoteCount = 0;
  for (const character of text) {
    if (character === preferred) {
      preferredQuoteCount++;
    } else if (character === alternate) {
      alternateQuoteCount++;
    }
  }
  return preferredQuoteCount > alternateQuoteCount ? alternate : preferred;
}
var get_preferred_quote_default = getPreferredQuote;

// src/utils/make-string.js
function makeString(rawText, enclosingQuote, unescapeUnnecessaryEscapes) {
  const otherQuote = enclosingQuote === '"' ? "'" : '"';
  const regex = /\\(.)|(["'])/gsu;
  const raw = string_replace_all_default(
    /* isOptionalObject */
    false,
    rawText,
    regex,
    (match, escaped, quote) => {
      if (escaped === otherQuote) {
        return escaped;
      }
      if (quote === enclosingQuote) {
        return "\\" + quote;
      }
      if (quote) {
        return quote;
      }
      return unescapeUnnecessaryEscapes && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(escaped) ? escaped : "\\" + escaped;
    }
  );
  return enclosingQuote + raw + enclosingQuote;
}
var make_string_default = makeString;

// src/utils/print-string.js
function printString(raw, options2) {
  assert.ok(/^(?<quote>["']).*\k<quote>$/su.test(raw));
  const rawContent = raw.slice(1, -1);
  const enclosingQuote = options2.parser === "json" || options2.parser === "jsonc" || // This was added before we have the `jsonc` parser
  // If `{quoteProps: "preserve"}` and `{singleQuote: false}` (default value),
  // and `{parser: "json5"}`, double quotes are always used for strings.
  // This effectively allows using the `json5` parser for “JSON with comments and trailing commas”.
  // See https://github.com/prettier/prettier/pull/10323
  // See https://github.com/prettier/prettier/pull/15831#discussion_r1431010636
  options2.parser === "json5" && options2.quoteProps === "preserve" && !options2.singleQuote ? '"' : options2.__isInHtmlAttribute ? "'" : get_preferred_quote_default(rawContent, options2.singleQuote);
  const originalQuote = raw.charAt(0);
  if (originalQuote === enclosingQuote) {
    return raw;
  }
  return make_string_default(
    rawContent,
    enclosingQuote,
    // Until Prettier 3.3.3, this option was set to true for most parsers, with some exceptions like CSS.
    // Since Prettier 3.3.4, it is set to false for all parsers.
    // For more details, please see https://github.com/prettier/prettier/issues/16542#issuecomment-2282249280.
    false
  );
}
var print_string_default = printString;

// src/language-js/utils/is-flow-keyword-type.js
var isFlowKeywordType = create_type_check_function_default([
  "AnyTypeAnnotation",
  "ThisTypeAnnotation",
  "NumberTypeAnnotation",
  "VoidTypeAnnotation",
  "BooleanTypeAnnotation",
  "BigIntTypeAnnotation",
  "SymbolTypeAnnotation",
  "StringTypeAnnotation",
  "NeverTypeAnnotation",
  "UndefinedTypeAnnotation",
  "UnknownTypeAnnotation",
  // FLow only
  "EmptyTypeAnnotation",
  "MixedTypeAnnotation"
]);
var is_flow_keyword_type_default = isFlowKeywordType;

// src/language-js/utils/is-node-matches.js
function isNodeMatchesNameOrPath(node, nameOrPath) {
  const names = nameOrPath.split(".");
  for (let index = names.length - 1; index >= 0; index--) {
    const name = names[index];
    if (index === 0) {
      return node.type === "Identifier" && node.name === name;
    }
    if (node.type !== "MemberExpression" || node.optional || node.computed || node.property.type !== "Identifier" || node.property.name !== name) {
      return false;
    }
    node = node.object;
  }
}
function isNodeMatches(node, nameOrPaths) {
  return nameOrPaths.some(
    (nameOrPath) => isNodeMatchesNameOrPath(node, nameOrPath)
  );
}
var is_node_matches_default = isNodeMatches;

// src/language-js/utils/is-ts-keyword-type.js
function isTsKeywordType({ type }) {
  return type.startsWith("TS") && type.endsWith("Keyword");
}
var is_ts_keyword_type_default = isTsKeywordType;

// src/language-js/utils/index.js
function hasNode(node, predicate) {
  return predicate(node) || hasDescendant(node, { getVisitorKeys: get_visitor_keys_default, predicate });
}
function hasNakedLeftSide(node) {
  return node.type === "AssignmentExpression" || node.type === "BinaryExpression" || node.type === "LogicalExpression" || node.type === "NGPipeExpression" || node.type === "ConditionalExpression" || isCallExpression(node) || isMemberExpression(node) || node.type === "SequenceExpression" || node.type === "TaggedTemplateExpression" || node.type === "BindExpression" || node.type === "UpdateExpression" && !node.prefix || isBinaryCastExpression(node) || node.type === "TSNonNullExpression" || node.type === "ChainExpression";
}
function getLeftSide(node) {
  if (node.expressions) {
    return node.expressions[0];
  }
  return node.left ?? node.test ?? node.callee ?? node.object ?? node.tag ?? node.argument ?? node.expression;
}
function getLeftSidePathName(node) {
  if (node.expressions) {
    return ["expressions", 0];
  }
  if (node.left) {
    return ["left"];
  }
  if (node.test) {
    return ["test"];
  }
  if (node.object) {
    return ["object"];
  }
  if (node.callee) {
    return ["callee"];
  }
  if (node.tag) {
    return ["tag"];
  }
  if (node.argument) {
    return ["argument"];
  }
  if (node.expression) {
    return ["expression"];
  }
  throw new Error("Unexpected node has no left side.");
}
var isExportDeclaration = create_type_check_function_default([
  "ExportDefaultDeclaration",
  "DeclareExportDeclaration",
  "ExportNamedDeclaration",
  "ExportAllDeclaration",
  "DeclareExportAllDeclaration"
]);
var isArrayExpression = create_type_check_function_default(["ArrayExpression"]);
var isObjectExpression = create_type_check_function_default(["ObjectExpression"]);
function isNumericLiteral(node) {
  return node.type === "NumericLiteral" || node.type === "Literal" && typeof node.value === "number";
}
function isBooleanLiteral(node) {
  return node.type === "BooleanLiteral" || node.type === "Literal" && typeof node.value === "boolean";
}
function isSignedNumericLiteral(node) {
  return node.type === "UnaryExpression" && (node.operator === "+" || node.operator === "-") && isNumericLiteral(node.argument);
}
function isStringLiteral(node) {
  return Boolean(
    node && (node.type === "StringLiteral" || node.type === "Literal" && typeof node.value === "string")
  );
}
function isRegExpLiteral(node) {
  return node.type === "RegExpLiteral" || node.type === "Literal" && Boolean(node.regex);
}
var isLiteral = create_type_check_function_default([
  "Literal",
  "BooleanLiteral",
  "BigIntLiteral",
  // Babel, flow use `BigIntLiteral` too
  "DirectiveLiteral",
  "NullLiteral",
  "NumericLiteral",
  "RegExpLiteral",
  "StringLiteral"
]);
var isSingleWordType = create_type_check_function_default([
  "Identifier",
  "ThisExpression",
  "Super",
  "PrivateName",
  "PrivateIdentifier"
]);
var isObjectType = create_type_check_function_default([
  "ObjectTypeAnnotation",
  "TSTypeLiteral",
  "TSMappedType"
]);
var isFunctionOrArrowExpression = create_type_check_function_default([
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
function isFunctionOrArrowExpressionWithBody(node) {
  return node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression" && node.body.type === "BlockStatement";
}
function isAngularTestWrapper(node) {
  return isCallExpression(node) && node.callee.type === "Identifier" && ["async", "inject", "fakeAsync", "waitForAsync"].includes(node.callee.name);
}
var isJsxElement = create_type_check_function_default(["JSXElement", "JSXFragment"]);
function isMethod(node) {
  return node.method && node.kind === "init" || node.kind === "get" || node.kind === "set";
}
function isFlowObjectTypePropertyAFunction(node) {
  return (node.type === "ObjectTypeProperty" || node.type === "ObjectTypeInternalSlot") && !node.static && !node.method && // @ts-expect-error -- exists on `ObjectTypeProperty` but not `ObjectTypeInternalSlot`
  node.kind !== "get" && // @ts-expect-error -- exists on `ObjectTypeProperty` but not `ObjectTypeInternalSlot`
  node.kind !== "set" && node.value.type === "FunctionTypeAnnotation";
}
function isTypeAnnotationAFunction(node) {
  return (node.type === "TypeAnnotation" || node.type === "TSTypeAnnotation") && node.typeAnnotation.type === "FunctionTypeAnnotation" && !node.static && !hasSameLocStart(node, node.typeAnnotation);
}
var isBinaryish = create_type_check_function_default([
  "BinaryExpression",
  "LogicalExpression",
  "NGPipeExpression"
]);
function isMemberish(node) {
  return isMemberExpression(node) || node.type === "BindExpression" && Boolean(node.object);
}
var isSimpleTypeAnnotation = create_type_check_function_default([
  "TSThisType",
  // literals
  "NullLiteralTypeAnnotation",
  "BooleanLiteralTypeAnnotation",
  "StringLiteralTypeAnnotation",
  "BigIntLiteralTypeAnnotation",
  "NumberLiteralTypeAnnotation",
  "TSLiteralType",
  "TSTemplateLiteralType"
]);
function isSimpleType(node) {
  return is_ts_keyword_type_default(node) || is_flow_keyword_type_default(node) || isSimpleTypeAnnotation(node) || (node.type === "GenericTypeAnnotation" || node.type === "TSTypeReference") && // @ts-expect-error -- `GenericTypeAnnotation`
  !node.typeParameters && // @ts-expect-error -- `TSTypeReference`
  !node.typeArguments;
}
function isUnitTestSetupIdentifier(node) {
  return node.type === "Identifier" && (node.name === "beforeEach" || node.name === "beforeAll" || node.name === "afterEach" || node.name === "afterAll");
}
var testCallCalleePatterns = [
  "it",
  "it.only",
  "it.skip",
  "describe",
  "describe.only",
  "describe.skip",
  "test",
  "test.only",
  "test.skip",
  "test.step",
  "test.describe",
  "test.describe.only",
  "test.describe.parallel",
  "test.describe.parallel.only",
  "test.describe.serial",
  "test.describe.serial.only",
  "skip",
  "xit",
  "xdescribe",
  "xtest",
  "fit",
  "fdescribe",
  "ftest"
];
function isTestCallCallee(node) {
  return is_node_matches_default(node, testCallCalleePatterns);
}
function isTestCall(node, parent) {
  if (node?.type !== "CallExpression" || node.optional) {
    return false;
  }
  const args = getCallArguments(node);
  if (args.length === 1) {
    if (isAngularTestWrapper(node) && isTestCall(parent)) {
      return isFunctionOrArrowExpression(args[0]);
    }
    if (isUnitTestSetupIdentifier(node.callee)) {
      return isAngularTestWrapper(args[0]);
    }
  } else if ((args.length === 2 || args.length === 3) && (args[0].type === "TemplateLiteral" || isStringLiteral(args[0])) && isTestCallCallee(node.callee)) {
    if (args[2] && !isNumericLiteral(args[2])) {
      return false;
    }
    return (args.length === 2 ? isFunctionOrArrowExpression(args[1]) : isFunctionOrArrowExpressionWithBody(args[1]) && getFunctionParameters(args[1]).length <= 1) || isAngularTestWrapper(args[1]);
  }
  return false;
}
var skipChainExpression = (fn) => (node) => {
  if (node?.type === "ChainExpression") {
    node = node.expression;
  }
  return fn(node);
};
var isCallExpression = skipChainExpression(
  create_type_check_function_default(["CallExpression", "OptionalCallExpression"])
);
var isMemberExpression = skipChainExpression(
  create_type_check_function_default(["MemberExpression", "OptionalMemberExpression"])
);
function isSimpleExpressionByNodeCount(node, maxInnerNodeCount = 5) {
  const count = getExpressionInnerNodeCount(node, maxInnerNodeCount);
  return count <= maxInnerNodeCount;
}
function getExpressionInnerNodeCount(node, maxCount) {
  let count = 0;
  for (const k in node) {
    const prop = node[k];
    if (prop && typeof prop === "object" && typeof prop.type === "string") {
      count++;
      count += getExpressionInnerNodeCount(prop, maxCount - count);
    }
    if (count > maxCount) {
      return count;
    }
  }
  return count;
}
var LONE_SHORT_ARGUMENT_THRESHOLD_RATE = 0.25;
function isLoneShortArgument(node, options2) {
  const { printWidth } = options2;
  if (hasComment(node)) {
    return false;
  }
  const threshold = printWidth * LONE_SHORT_ARGUMENT_THRESHOLD_RATE;
  if (node.type === "ThisExpression" || node.type === "Identifier" && node.name.length <= threshold || isSignedNumericLiteral(node) && !hasComment(node.argument)) {
    return true;
  }
  const regexpPattern = node.type === "Literal" && "regex" in node && node.regex.pattern || node.type === "RegExpLiteral" && node.pattern;
  if (regexpPattern) {
    return regexpPattern.length <= threshold;
  }
  if (isStringLiteral(node)) {
    return print_string_default(get_raw_default(node), options2).length <= threshold;
  }
  if (node.type === "TemplateLiteral") {
    return node.expressions.length === 0 && node.quasis[0].value.raw.length <= threshold && !node.quasis[0].value.raw.includes("\n");
  }
  if (node.type === "UnaryExpression") {
    return isLoneShortArgument(node.argument, { printWidth });
  }
  if (node.type === "CallExpression" && node.arguments.length === 0 && node.callee.type === "Identifier") {
    return node.callee.name.length <= threshold - 2;
  }
  return isLiteral(node);
}
function hasLeadingOwnLineComment(text, node) {
  if (isJsxElement(node)) {
    return hasNodeIgnoreComment(node);
  }
  return hasComment(
    node,
    CommentCheckFlags.Leading,
    (comment) => has_newline_default(text, locEnd(comment))
  );
}
function templateLiteralHasNewLines(template) {
  return template.quasis.some((quasi) => quasi.value.raw.includes("\n"));
}
function isTemplateOnItsOwnLine(node, text) {
  return (node.type === "TemplateLiteral" && templateLiteralHasNewLines(node) || node.type === "TaggedTemplateExpression" && templateLiteralHasNewLines(node.quasi)) && !has_newline_default(text, locStart(node), { backwards: true });
}
function needsHardlineAfterDanglingComment(node) {
  if (!hasComment(node)) {
    return false;
  }
  const lastDanglingComment = at_default(
    /* isOptionalObject */
    false,
    getComments(node, CommentCheckFlags.Dangling),
    -1
  );
  return lastDanglingComment && !is_block_comment_default(lastDanglingComment);
}
function isLongCurriedCallExpression(path) {
  const { node, parent, key } = path;
  return key === "callee" && isCallExpression(node) && isCallExpression(parent) && parent.arguments.length > 0 && node.arguments.length > parent.arguments.length;
}
var simpleCallArgumentUnaryOperators = /* @__PURE__ */ new Set(["!", "-", "+", "~"]);
function isSimpleCallArgument(node, depth = 2) {
  if (depth <= 0) {
    return false;
  }
  if (node.type === "ChainExpression" || node.type === "TSNonNullExpression") {
    return isSimpleCallArgument(node.expression, depth);
  }
  const isChildSimple = (child) => isSimpleCallArgument(child, depth - 1);
  if (isRegExpLiteral(node)) {
    return get_string_width_default(node.pattern ?? node.regex.pattern) <= 5;
  }
  if (isLiteral(node) || isSingleWordType(node) || node.type === "ArgumentPlaceholder") {
    return true;
  }
  if (node.type === "TemplateLiteral") {
    return node.quasis.every((element) => !element.value.raw.includes("\n")) && node.expressions.every(isChildSimple);
  }
  if (isObjectExpression(node)) {
    return node.properties.every(
      (p) => !p.computed && (p.shorthand || p.value && isChildSimple(p.value))
    );
  }
  if (isArrayExpression(node)) {
    return node.elements.every((x) => x === null || isChildSimple(x));
  }
  if (isCallLikeExpression(node)) {
    if (node.type === "ImportExpression" || isSimpleCallArgument(node.callee, depth)) {
      const args = getCallArguments(node);
      return args.length <= depth && args.every(isChildSimple);
    }
    return false;
  }
  if (isMemberExpression(node)) {
    return isSimpleCallArgument(node.object, depth) && isSimpleCallArgument(node.property, depth);
  }
  if (node.type === "UnaryExpression" && simpleCallArgumentUnaryOperators.has(node.operator) || node.type === "UpdateExpression") {
    return isSimpleCallArgument(node.argument, depth);
  }
  return false;
}
function identity(x) {
  return x;
}
function shouldPrintComma(options2, level = "es5") {
  return options2.trailingComma === "es5" && level === "es5" || options2.trailingComma === "all" && (level === "all" || level === "es5");
}
function startsWithNoLookaheadToken(node, predicate) {
  switch (node.type) {
    case "BinaryExpression":
    case "LogicalExpression":
    case "AssignmentExpression":
    case "NGPipeExpression":
      return startsWithNoLookaheadToken(node.left, predicate);
    case "MemberExpression":
    case "OptionalMemberExpression":
      return startsWithNoLookaheadToken(node.object, predicate);
    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        return false;
      }
      return startsWithNoLookaheadToken(node.tag, predicate);
    case "CallExpression":
    case "OptionalCallExpression":
      if (node.callee.type === "FunctionExpression") {
        return false;
      }
      return startsWithNoLookaheadToken(node.callee, predicate);
    case "ConditionalExpression":
      return startsWithNoLookaheadToken(node.test, predicate);
    case "UpdateExpression":
      return !node.prefix && startsWithNoLookaheadToken(node.argument, predicate);
    case "BindExpression":
      return node.object && startsWithNoLookaheadToken(node.object, predicate);
    case "SequenceExpression":
      return startsWithNoLookaheadToken(node.expressions[0], predicate);
    case "ChainExpression":
    case "TSSatisfiesExpression":
    case "TSAsExpression":
    case "TSNonNullExpression":
    case "AsExpression":
    case "AsConstExpression":
    case "SatisfiesExpression":
      return startsWithNoLookaheadToken(node.expression, predicate);
    default:
      return predicate(node);
  }
}
var equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
var multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
var bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};
function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  }
  if (parentOp === "**") {
    return false;
  }
  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  }
  if (nodeOp === "%" && multiplicativeOperators[parentOp] || parentOp === "%" && multiplicativeOperators[nodeOp]) {
    return false;
  }
  if (nodeOp !== parentOp && multiplicativeOperators[nodeOp] && multiplicativeOperators[parentOp]) {
    return false;
  }
  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }
  return true;
}
var PRECEDENCE = new Map(
  [
    ["|>"],
    ["??"],
    ["||"],
    ["&&"],
    ["|"],
    ["^"],
    ["&"],
    ["==", "===", "!=", "!=="],
    ["<", ">", "<=", ">=", "in", "instanceof"],
    [">>", "<<", ">>>"],
    ["+", "-"],
    ["*", "/", "%"],
    ["**"]
  ].flatMap(
    (operators, index) => operators.map((operator) => [operator, index])
  )
);
function getPrecedence(operator) {
  return PRECEDENCE.get(operator);
}
function hasRestParameter(node) {
  if (node.rest) {
    return true;
  }
  const parameters = getFunctionParameters(node);
  return at_default(
    /* isOptionalObject */
    false,
    parameters,
    -1
  )?.type === "RestElement";
}
var functionParametersCache = /* @__PURE__ */ new WeakMap();
function getFunctionParameters(node) {
  if (functionParametersCache.has(node)) {
    return functionParametersCache.get(node);
  }
  const parameters = [];
  if (node.this) {
    parameters.push(node.this);
  }
  if (Array.isArray(node.parameters)) {
    parameters.push(...node.parameters);
  } else if (Array.isArray(node.params)) {
    parameters.push(...node.params);
  }
  if (node.rest) {
    parameters.push(node.rest);
  }
  functionParametersCache.set(node, parameters);
  return parameters;
}
function iterateFunctionParametersPath(path, iteratee) {
  const { node } = path;
  let index = 0;
  const callback = (childPath) => iteratee(childPath, index++);
  if (node.this) {
    path.call(callback, "this");
  }
  if (Array.isArray(node.parameters)) {
    path.each(callback, "parameters");
  } else if (Array.isArray(node.params)) {
    path.each(callback, "params");
  }
  if (node.rest) {
    path.call(callback, "rest");
  }
}
var callArgumentsCache = /* @__PURE__ */ new WeakMap();
function getCallArguments(node) {
  if (callArgumentsCache.has(node)) {
    return callArgumentsCache.get(node);
  }
  if (node.type === "ChainExpression") {
    return getCallArguments(node.expression);
  }
  let args = node.arguments;
  if (node.type === "ImportExpression" || node.type === "TSImportType") {
    args = [node.type === "ImportExpression" ? node.source : node.argument];
    if (node.options) {
      args.push(node.options);
    }
  }
  callArgumentsCache.set(node, args);
  return args;
}
function iterateCallArgumentsPath(path, iteratee) {
  const { node } = path;
  if (node.type === "ChainExpression") {
    return path.call(
      () => iterateCallArgumentsPath(path, iteratee),
      "expression"
    );
  }
  if (node.type === "ImportExpression" || node.type === "TSImportType") {
    path.call(
      (sourcePath) => iteratee(sourcePath, 0),
      node.type === "ImportExpression" ? "source" : "argument"
    );
    if (node.options) {
      path.call((sourcePath) => iteratee(sourcePath, 1), "options");
    }
  } else {
    path.each(iteratee, "arguments");
  }
}
function getCallArgumentSelector(node, index) {
  const selectors = [];
  if (node.type === "ChainExpression") {
    node = node.expression;
    selectors.push("expression");
  }
  if (node.type === "ImportExpression" || node.type === "TSImportType") {
    if (index === 0 || index === (node.options ? -2 : -1)) {
      return [
        ...selectors,
        node.type === "ImportExpression" ? "source" : "argument"
      ];
    }
    if (node.options && (index === 1 || index === -1)) {
      return [...selectors, "options"];
    }
    throw new RangeError("Invalid argument index");
  }
  if (index < 0) {
    index = node.arguments.length + index;
  }
  if (index < 0 || index >= node.arguments.length) {
    throw new RangeError("Invalid argument index");
  }
  return [...selectors, "arguments", index];
}
function isPrettierIgnoreComment(comment) {
  return comment.value.trim() === "prettier-ignore" && !comment.unignore;
}
function hasNodeIgnoreComment(node) {
  return node?.prettierIgnore || hasComment(node, CommentCheckFlags.PrettierIgnore);
}
var CommentCheckFlags = {
  /** Check comment is a leading comment */
  Leading: 1 << 1,
  /** Check comment is a trailing comment */
  Trailing: 1 << 2,
  /** Check comment is a dangling comment */
  Dangling: 1 << 3,
  /** Check comment is a block comment */
  Block: 1 << 4,
  /** Check comment is a line comment */
  Line: 1 << 5,
  /** Check comment is a `prettier-ignore` comment */
  PrettierIgnore: 1 << 6,
  /** Check comment is the first attached comment */
  First: 1 << 7,
  /** Check comment is the last attached comment */
  Last: 1 << 8
};
var getCommentTestFunction = (flags, fn) => {
  if (typeof flags === "function") {
    fn = flags;
    flags = 0;
  }
  if (flags || fn) {
    return (comment, index, comments) => !(flags & CommentCheckFlags.Leading && !comment.leading || flags & CommentCheckFlags.Trailing && !comment.trailing || flags & CommentCheckFlags.Dangling && (comment.leading || comment.trailing) || flags & CommentCheckFlags.Block && !is_block_comment_default(comment) || flags & CommentCheckFlags.Line && !is_line_comment_default(comment) || flags & CommentCheckFlags.First && index !== 0 || flags & CommentCheckFlags.Last && index !== comments.length - 1 || flags & CommentCheckFlags.PrettierIgnore && !isPrettierIgnoreComment(comment) || fn && !fn(comment));
  }
};
function hasComment(node, flags, fn) {
  if (!is_non_empty_array_default(node?.comments)) {
    return false;
  }
  const test = getCommentTestFunction(flags, fn);
  return test ? node.comments.some(test) : true;
}
function getComments(node, flags, fn) {
  if (!Array.isArray(node?.comments)) {
    return [];
  }
  const test = getCommentTestFunction(flags, fn);
  return test ? node.comments.filter(test) : node.comments;
}
var isNextLineEmpty2 = (node, { originalText }) => is_next_line_empty_default(originalText, locEnd(node));
function isCallLikeExpression(node) {
  return isCallExpression(node) || node.type === "NewExpression" || node.type === "ImportExpression";
}
function isObjectProperty(node) {
  return node && (node.type === "ObjectProperty" || node.type === "Property" && !isMethod(node));
}
var isBinaryCastExpression = create_type_check_function_default([
  // TS
  "TSAsExpression",
  "TSSatisfiesExpression",
  // Flow
  "AsExpression",
  "AsConstExpression",
  "SatisfiesExpression"
]);
var isUnionType = create_type_check_function_default([
  "TSUnionType",
  "UnionTypeAnnotation"
]);
var isIntersectionType = create_type_check_function_default([
  "TSIntersectionType",
  "IntersectionTypeAnnotation"
]);
var isConditionalType = create_type_check_function_default([
  "TSConditionalType",
  "ConditionalTypeAnnotation"
]);

// src/language-js/clean.js
var ignoredProperties = /* @__PURE__ */ new Set([
  "range",
  "raw",
  "comments",
  "leadingComments",
  "trailingComments",
  "innerComments",
  "extra",
  "start",
  "end",
  "loc",
  "flags",
  "errors",
  "tokens"
]);
var removeTemplateElementsValue = (node) => {
  for (const templateElement of node.quasis) {
    delete templateElement.value;
  }
};
function clean(original, cloned) {
  if (original.type === "Program") {
    delete cloned.sourceType;
  }
  if ((original.type === "BigIntLiteral" || original.type === "BigIntLiteralTypeAnnotation") && original.value) {
    cloned.value = original.value.toLowerCase();
  }
  if ((original.type === "BigIntLiteral" || original.type === "Literal") && original.bigint) {
    cloned.bigint = original.bigint.toLowerCase();
  }
  if (original.type === "EmptyStatement") {
    return null;
  }
  if (original.type === "JSXText") {
    return null;
  }
  if (original.type === "JSXExpressionContainer" && (original.expression.type === "Literal" || original.expression.type === "StringLiteral") && original.expression.value === " ") {
    return null;
  }
  if ((original.type === "Property" || original.type === "ObjectProperty" || original.type === "MethodDefinition" || original.type === "ClassProperty" || original.type === "ClassMethod" || original.type === "PropertyDefinition" || original.type === "TSDeclareMethod" || original.type === "TSPropertySignature" || original.type === "ObjectTypeProperty" || original.type === "ImportAttribute") && original.key && !original.computed) {
    const { key } = original;
    if (isStringLiteral(key) || isNumericLiteral(key)) {
      cloned.key = String(key.value);
    } else if (key.type === "Identifier") {
      cloned.key = key.name;
    }
  }
  if (original.type === "JSXElement" && original.openingElement.name.name === "style" && original.openingElement.attributes.some(
    (attr) => attr.type === "JSXAttribute" && attr.name.name === "jsx"
  )) {
    for (const { type, expression: expression2 } of cloned.children) {
      if (type === "JSXExpressionContainer" && expression2.type === "TemplateLiteral") {
        removeTemplateElementsValue(expression2);
      }
    }
  }
  if (original.type === "JSXAttribute" && original.name.name === "css" && original.value.type === "JSXExpressionContainer" && original.value.expression.type === "TemplateLiteral") {
    removeTemplateElementsValue(cloned.value.expression);
  }
  if (original.type === "JSXAttribute" && original.value?.type === "Literal" && /["']|&quot;|&apos;/u.test(original.value.value)) {
    cloned.value.value = string_replace_all_default(
      /* isOptionalObject */
      false,
      original.value.value,
      /["']|&quot;|&apos;/gu,
      '"'
    );
  }
  const expression = original.expression || original.callee;
  if (original.type === "Decorator" && expression.type === "CallExpression" && expression.callee.name === "Component" && expression.arguments.length === 1) {
    const astProps = original.expression.arguments[0].properties;
    for (const [
      index,
      prop
    ] of cloned.expression.arguments[0].properties.entries()) {
      switch (astProps[index].key.name) {
        case "styles":
          if (isArrayExpression(prop.value)) {
            removeTemplateElementsValue(prop.value.elements[0]);
          }
          break;
        case "template":
          if (prop.value.type === "TemplateLiteral") {
            removeTemplateElementsValue(prop.value);
          }
          break;
      }
    }
  }
  if (original.type === "TaggedTemplateExpression" && (original.tag.type === "MemberExpression" || original.tag.type === "Identifier" && (original.tag.name === "gql" || original.tag.name === "graphql" || original.tag.name === "css" || original.tag.name === "md" || original.tag.name === "markdown" || original.tag.name === "html") || original.tag.type === "CallExpression")) {
    removeTemplateElementsValue(cloned.quasi);
  }
  if (original.type === "TemplateLiteral") {
    removeTemplateElementsValue(cloned);
  }
  if (original.type === "ChainExpression" && original.expression.type === "TSNonNullExpression") {
    cloned.type = "TSNonNullExpression";
    cloned.expression.type = "ChainExpression";
  }
}
clean.ignoredProperties = ignoredProperties;
var clean_default = clean;

// src/document/constants.js
var DOC_TYPE_STRING = "string";
var DOC_TYPE_ARRAY = "array";
var DOC_TYPE_CURSOR = "cursor";
var DOC_TYPE_INDENT = "indent";
var DOC_TYPE_ALIGN = "align";
var DOC_TYPE_TRIM = "trim";
var DOC_TYPE_GROUP = "group";
var DOC_TYPE_FILL = "fill";
var DOC_TYPE_IF_BREAK = "if-break";
var DOC_TYPE_INDENT_IF_BREAK = "indent-if-break";
var DOC_TYPE_LINE_SUFFIX = "line-suffix";
var DOC_TYPE_LINE_SUFFIX_BOUNDARY = "line-suffix-boundary";
var DOC_TYPE_LINE = "line";
var DOC_TYPE_LABEL = "label";
var DOC_TYPE_BREAK_PARENT = "break-parent";
var VALID_OBJECT_DOC_TYPES = /* @__PURE__ */ new Set([
  DOC_TYPE_CURSOR,
  DOC_TYPE_INDENT,
  DOC_TYPE_ALIGN,
  DOC_TYPE_TRIM,
  DOC_TYPE_GROUP,
  DOC_TYPE_FILL,
  DOC_TYPE_IF_BREAK,
  DOC_TYPE_INDENT_IF_BREAK,
  DOC_TYPE_LINE_SUFFIX,
  DOC_TYPE_LINE_SUFFIX_BOUNDARY,
  DOC_TYPE_LINE,
  DOC_TYPE_LABEL,
  DOC_TYPE_BREAK_PARENT
]);

// src/document/utils/get-doc-type.js
function getDocType(doc) {
  if (typeof doc === "string") {
    return DOC_TYPE_STRING;
  }
  if (Array.isArray(doc)) {
    return DOC_TYPE_ARRAY;
  }
  if (!doc) {
    return;
  }
  const { type } = doc;
  if (VALID_OBJECT_DOC_TYPES.has(type)) {
    return type;
  }
}
var get_doc_type_default = getDocType;

// src/document/invalid-doc-error.js
var disjunctionListFormat = (list) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(list);
function getDocErrorMessage(doc) {
  const type = doc === null ? "null" : typeof doc;
  if (type !== "string" && type !== "object") {
    return `Unexpected doc '${type}', 
Expected it to be 'string' or 'object'.`;
  }
  if (get_doc_type_default(doc)) {
    throw new Error("doc is valid.");
  }
  const objectType = Object.prototype.toString.call(doc);
  if (objectType !== "[object Object]") {
    return `Unexpected doc '${objectType}'.`;
  }
  const EXPECTED_TYPE_VALUES = disjunctionListFormat(
    [...VALID_OBJECT_DOC_TYPES].map((type2) => `'${type2}'`)
  );
  return `Unexpected doc.type '${doc.type}'.
Expected it to be ${EXPECTED_TYPE_VALUES}.`;
}
var InvalidDocError = class extends Error {
  name = "InvalidDocError";
  constructor(doc) {
    super(getDocErrorMessage(doc));
    this.doc = doc;
  }
};
var invalid_doc_error_default = InvalidDocError;

// src/document/utils/traverse-doc.js
var traverseDocOnExitStackMarker = {};
function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
  const docsStack = [doc];
  while (docsStack.length > 0) {
    const doc2 = docsStack.pop();
    if (doc2 === traverseDocOnExitStackMarker) {
      onExit(docsStack.pop());
      continue;
    }
    if (onExit) {
      docsStack.push(doc2, traverseDocOnExitStackMarker);
    }
    const docType = get_doc_type_default(doc2);
    if (!docType) {
      throw new invalid_doc_error_default(doc2);
    }
    if (onEnter?.(doc2) === false) {
      continue;
    }
    switch (docType) {
      case DOC_TYPE_ARRAY:
      case DOC_TYPE_FILL: {
        const parts = docType === DOC_TYPE_ARRAY ? doc2 : doc2.parts;
        for (let ic = parts.length, i = ic - 1; i >= 0; --i) {
          docsStack.push(parts[i]);
        }
        break;
      }
      case DOC_TYPE_IF_BREAK:
        docsStack.push(doc2.flatContents, doc2.breakContents);
        break;
      case DOC_TYPE_GROUP:
        if (shouldTraverseConditionalGroups && doc2.expandedStates) {
          for (let ic = doc2.expandedStates.length, i = ic - 1; i >= 0; --i) {
            docsStack.push(doc2.expandedStates[i]);
          }
        } else {
          docsStack.push(doc2.contents);
        }
        break;
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
      case DOC_TYPE_LINE_SUFFIX:
        docsStack.push(doc2.contents);
        break;
      case DOC_TYPE_STRING:
      case DOC_TYPE_CURSOR:
      case DOC_TYPE_TRIM:
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
      case DOC_TYPE_LINE:
      case DOC_TYPE_BREAK_PARENT:
        break;
      default:
        throw new invalid_doc_error_default(doc2);
    }
  }
}
var traverse_doc_default = traverseDoc;

// src/document/utils.js
function mapDoc(doc, cb) {
  if (typeof doc === "string") {
    return cb(doc);
  }
  const mapped = /* @__PURE__ */ new Map();
  return rec(doc);
  function rec(doc2) {
    if (mapped.has(doc2)) {
      return mapped.get(doc2);
    }
    const result = process2(doc2);
    mapped.set(doc2, result);
    return result;
  }
  function process2(doc2) {
    switch (get_doc_type_default(doc2)) {
      case DOC_TYPE_ARRAY:
        return cb(doc2.map(rec));
      case DOC_TYPE_FILL:
        return cb({ ...doc2, parts: doc2.parts.map(rec) });
      case DOC_TYPE_IF_BREAK:
        return cb({
          ...doc2,
          breakContents: rec(doc2.breakContents),
          flatContents: rec(doc2.flatContents)
        });
      case DOC_TYPE_GROUP: {
        let { expandedStates, contents } = doc2;
        if (expandedStates) {
          expandedStates = expandedStates.map(rec);
          contents = expandedStates[0];
        } else {
          contents = rec(contents);
        }
        return cb({ ...doc2, contents, expandedStates });
      }
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
      case DOC_TYPE_LINE_SUFFIX:
        return cb({ ...doc2, contents: rec(doc2.contents) });
      case DOC_TYPE_STRING:
      case DOC_TYPE_CURSOR:
      case DOC_TYPE_TRIM:
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
      case DOC_TYPE_LINE:
      case DOC_TYPE_BREAK_PARENT:
        return cb(doc2);
      default:
        throw new invalid_doc_error_default(doc2);
    }
  }
}
function findInDoc(doc, fn, defaultValue) {
  let result = defaultValue;
  let shouldSkipFurtherProcessing = false;
  function findInDocOnEnterFn(doc2) {
    if (shouldSkipFurtherProcessing) {
      return false;
    }
    const maybeResult = fn(doc2);
    if (maybeResult !== void 0) {
      shouldSkipFurtherProcessing = true;
      result = maybeResult;
    }
  }
  traverse_doc_default(doc, findInDocOnEnterFn);
  return result;
}
function willBreakFn(doc) {
  if (doc.type === DOC_TYPE_GROUP && doc.break) {
    return true;
  }
  if (doc.type === DOC_TYPE_LINE && doc.hard) {
    return true;
  }
  if (doc.type === DOC_TYPE_BREAK_PARENT) {
    return true;
  }
}
function willBreak(doc) {
  return findInDoc(doc, willBreakFn, false);
}
function breakParentGroup(groupStack) {
  if (groupStack.length > 0) {
    const parentGroup = at_default(
      /* isOptionalObject */
      false,
      groupStack,
      -1
    );
    if (!parentGroup.expandedStates && !parentGroup.break) {
      parentGroup.break = "propagated";
    }
  }
  return null;
}
function propagateBreaks(doc) {
  const alreadyVisitedSet = /* @__PURE__ */ new Set();
  const groupStack = [];
  function propagateBreaksOnEnterFn(doc2) {
    if (doc2.type === DOC_TYPE_BREAK_PARENT) {
      breakParentGroup(groupStack);
    }
    if (doc2.type === DOC_TYPE_GROUP) {
      groupStack.push(doc2);
      if (alreadyVisitedSet.has(doc2)) {
        return false;
      }
      alreadyVisitedSet.add(doc2);
    }
  }
  function propagateBreaksOnExitFn(doc2) {
    if (doc2.type === DOC_TYPE_GROUP) {
      const group2 = groupStack.pop();
      if (group2.break) {
        breakParentGroup(groupStack);
      }
    }
  }
  traverse_doc_default(
    doc,
    propagateBreaksOnEnterFn,
    propagateBreaksOnExitFn,
    /* shouldTraverseConditionalGroups */
    true
  );
}
function removeLinesFn(doc) {
  if (doc.type === DOC_TYPE_LINE && !doc.hard) {
    return doc.soft ? "" : " ";
  }
  if (doc.type === DOC_TYPE_IF_BREAK) {
    return doc.flatContents;
  }
  return doc;
}
function removeLines(doc) {
  return mapDoc(doc, removeLinesFn);
}
function cleanDocFn(doc) {
  switch (get_doc_type_default(doc)) {
    case DOC_TYPE_FILL:
      if (doc.parts.every((part) => part === "")) {
        return "";
      }
      break;
    case DOC_TYPE_GROUP:
      if (!doc.contents && !doc.id && !doc.break && !doc.expandedStates) {
        return "";
      }
      if (doc.contents.type === DOC_TYPE_GROUP && doc.contents.id === doc.id && doc.contents.break === doc.break && doc.contents.expandedStates === doc.expandedStates) {
        return doc.contents;
      }
      break;
    case DOC_TYPE_ALIGN:
    case DOC_TYPE_INDENT:
    case DOC_TYPE_INDENT_IF_BREAK:
    case DOC_TYPE_LINE_SUFFIX:
      if (!doc.contents) {
        return "";
      }
      break;
    case DOC_TYPE_IF_BREAK:
      if (!doc.flatContents && !doc.breakContents) {
        return "";
      }
      break;
    case DOC_TYPE_ARRAY: {
      const parts = [];
      for (const part of doc) {
        if (!part) {
          continue;
        }
        const [currentPart, ...restParts] = Array.isArray(part) ? part : [part];
        if (typeof currentPart === "string" && typeof at_default(
          /* isOptionalObject */
          false,
          parts,
          -1
        ) === "string") {
          parts[parts.length - 1] += currentPart;
        } else {
          parts.push(currentPart);
        }
        parts.push(...restParts);
      }
      if (parts.length === 0) {
        return "";
      }
      if (parts.length === 1) {
        return parts[0];
      }
      return parts;
    }
    case DOC_TYPE_STRING:
    case DOC_TYPE_CURSOR:
    case DOC_TYPE_TRIM:
    case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
    case DOC_TYPE_LINE:
    case DOC_TYPE_LABEL:
    case DOC_TYPE_BREAK_PARENT:
      break;
    default:
      throw new invalid_doc_error_default(doc);
  }
  return doc;
}
function cleanDoc(doc) {
  return mapDoc(doc, (currentDoc) => cleanDocFn(currentDoc));
}
function replaceEndOfLine(doc, replacement = literalline) {
  return mapDoc(
    doc,
    (currentDoc) => typeof currentDoc === "string" ? join(replacement, currentDoc.split("\n")) : currentDoc
  );
}
function canBreakFn(doc) {
  if (doc.type === DOC_TYPE_LINE) {
    return true;
  }
}
function canBreak(doc) {
  return findInDoc(doc, canBreakFn, false);
}
function inheritLabel(doc, fn) {
  return doc.type === DOC_TYPE_LABEL ? { ...doc, contents: fn(doc.contents) } : fn(doc);
}

// src/document/utils/assert-doc.js
var noop = () => {
};
var assertDoc = true ? noop : function(doc) {
  traverse_doc_default(doc, (doc2) => {
    if (checked.has(doc2)) {
      return false;
    }
    if (typeof doc2 !== "string") {
      checked.add(doc2);
    }
  });
};
var assertDocArray = true ? noop : function(docs, optional = false) {
  if (optional && !docs) {
    return;
  }
  if (!Array.isArray(docs)) {
    throw new TypeError("Unexpected doc array.");
  }
  for (const doc of docs) {
    assertDoc(doc);
  }
};
var assertDocFillParts = true ? noop : (
  /**
   * @param {Doc[]} parts
   */
  function(parts) {
    assertDocArray(parts);
    if (parts.length > 1 && isEmptyDoc(at_default(
      /* isOptionalObject */
      false,
      parts,
      -1
    ))) {
      parts = parts.slice(0, -1);
    }
    for (const [i, doc] of parts.entries()) {
      if (i % 2 === 1 && !isValidSeparator(doc)) {
        const type = get_doc_type_default(doc);
        throw new Error(
          `Unexpected non-line-break doc at ${i}. Doc type is ${type}.`
        );
      }
    }
  }
);

// src/document/builders.js
function indent(contents) {
  assertDoc(contents);
  return { type: DOC_TYPE_INDENT, contents };
}
function align(widthOrString, contents) {
  assertDoc(contents);
  return { type: DOC_TYPE_ALIGN, contents, n: widthOrString };
}
function group(contents, opts = {}) {
  assertDoc(contents);
  assertDocArray(
    opts.expandedStates,
    /* optional */
    true
  );
  return {
    type: DOC_TYPE_GROUP,
    id: opts.id,
    contents,
    break: Boolean(opts.shouldBreak),
    expandedStates: opts.expandedStates
  };
}
function dedentToRoot(contents) {
  return align(Number.NEGATIVE_INFINITY, contents);
}
function dedent(contents) {
  return align(-1, contents);
}
function conditionalGroup(states, opts) {
  return group(states[0], { ...opts, expandedStates: states });
}
function fill(parts) {
  assertDocFillParts(parts);
  return { type: DOC_TYPE_FILL, parts };
}
function ifBreak(breakContents, flatContents = "", opts = {}) {
  assertDoc(breakContents);
  if (flatContents !== "") {
    assertDoc(flatContents);
  }
  return {
    type: DOC_TYPE_IF_BREAK,
    breakContents,
    flatContents,
    groupId: opts.groupId
  };
}
function indentIfBreak(contents, opts) {
  assertDoc(contents);
  return {
    type: DOC_TYPE_INDENT_IF_BREAK,
    contents,
    groupId: opts.groupId,
    negate: opts.negate
  };
}
function lineSuffix(contents) {
  assertDoc(contents);
  return { type: DOC_TYPE_LINE_SUFFIX, contents };
}
var lineSuffixBoundary = { type: DOC_TYPE_LINE_SUFFIX_BOUNDARY };
var breakParent = { type: DOC_TYPE_BREAK_PARENT };
var hardlineWithoutBreakParent = { type: DOC_TYPE_LINE, hard: true };
var literallineWithoutBreakParent = {
  type: DOC_TYPE_LINE,
  hard: true,
  literal: true
};
var line = { type: DOC_TYPE_LINE };
var softline = { type: DOC_TYPE_LINE, soft: true };
var hardline = [hardlineWithoutBreakParent, breakParent];
var literalline = [literallineWithoutBreakParent, breakParent];
var cursor = { type: DOC_TYPE_CURSOR };
function join(separator, docs) {
  assertDoc(separator);
  assertDocArray(docs);
  const parts = [];
  for (let i = 0; i < docs.length; i++) {
    if (i !== 0) {
      parts.push(separator);
    }
    parts.push(docs[i]);
  }
  return parts;
}
function addAlignmentToDoc(doc, size, tabWidth) {
  assertDoc(doc);
  let aligned = doc;
  if (size > 0) {
    for (let i = 0; i < Math.floor(size / tabWidth); ++i) {
      aligned = indent(aligned);
    }
    aligned = align(size % tabWidth, aligned);
    aligned = align(Number.NEGATIVE_INFINITY, aligned);
  }
  return aligned;
}
function label(label2, contents) {
  assertDoc(contents);
  return label2 ? { type: DOC_TYPE_LABEL, label: label2, contents } : contents;
}

// src/language-js/print/comment.js
function printComment(commentPath, options2) {
  const comment = commentPath.node;
  if (is_line_comment_default(comment)) {
    return options2.originalText.slice(locStart(comment), locEnd(comment)).trimEnd();
  }
  if (is_indentable_block_comment_default(comment)) {
    return printIndentableBlockComment(comment);
  }
  if (is_block_comment_default(comment)) {
    return ["/*", replaceEndOfLine(comment.value), "*/"];
  }
  throw new Error("Not a comment: " + JSON.stringify(comment));
}
function printIndentableBlockComment(comment) {
  const lines = comment.value.split("\n");
  return [
    "/*",
    join(
      hardline,
      lines.map(
        (line2, index) => index === 0 ? line2.trimEnd() : " " + (index < lines.length - 1 ? line2.trim() : line2.trimStart())
      )
    ),
    "*/"
  ];
}

// src/language-js/comments/handle-comments.js
var handle_comments_exports = {};
__export(handle_comments_exports, {
  endOfLine: () => handleEndOfLineComment,
  ownLine: () => handleOwnLineComment,
  remaining: () => handleRemainingComment
});

// src/main/comments/utils.js
function describeNodeForDebugging(node) {
  const nodeType = node.type || node.kind || "(unknown type)";
  let nodeName = String(
    node.name || node.id && (typeof node.id === "object" ? node.id.name : node.id) || node.key && (typeof node.key === "object" ? node.key.name : node.key) || node.value && (typeof node.value === "object" ? "" : String(node.value)) || node.operator || ""
  );
  if (nodeName.length > 20) {
    nodeName = nodeName.slice(0, 19) + "\u2026";
  }
  return nodeType + (nodeName ? " " + nodeName : "");
}
function addCommentHelper(node, comment) {
  const comments = node.comments ??= [];
  comments.push(comment);
  comment.printed = false;
  comment.nodeDescription = describeNodeForDebugging(node);
}
function addLeadingComment(node, comment) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}
function addDanglingComment(node, comment, marker) {
  comment.leading = false;
  comment.trailing = false;
  if (marker) {
    comment.marker = marker;
  }
  addCommentHelper(node, comment);
}
function addTrailingComment(node, comment) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

// src/utils/get-next-non-space-non-comment-character-index.js
function getNextNonSpaceNonCommentCharacterIndex(text, startIndex) {
  let oldIdx = null;
  let nextIdx = startIndex;
  while (nextIdx !== oldIdx) {
    oldIdx = nextIdx;
    nextIdx = skipSpaces(text, nextIdx);
    nextIdx = skip_inline_comment_default(text, nextIdx);
    nextIdx = skip_trailing_comment_default(text, nextIdx);
    nextIdx = skip_newline_default(text, nextIdx);
  }
  return nextIdx;
}
var get_next_non_space_non_comment_character_index_default = getNextNonSpaceNonCommentCharacterIndex;

// src/utils/get-next-non-space-non-comment-character.js
function getNextNonSpaceNonCommentCharacter(text, startIndex) {
  const index = get_next_non_space_non_comment_character_index_default(text, startIndex);
  return index === false ? "" : text.charAt(index);
}
var get_next_non_space_non_comment_character_default = getNextNonSpaceNonCommentCharacter;

// src/utils/has-newline-in-range.js
function hasNewlineInRange(text, startIndex, endIndex) {
  for (let i = startIndex; i < endIndex; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }
  return false;
}
var has_newline_in_range_default = hasNewlineInRange;

// src/language-js/comments/handle-comments.js
var isSingleLineComment = (comment, text) => is_line_comment_default(comment) || !has_newline_in_range_default(text, locStart(comment), locEnd(comment));
function handleOwnLineComment(context) {
  return [
    handleIgnoreComments,
    handleConditionalExpressionComments,
    handleLastFunctionArgComments,
    handleLastComponentArgComments,
    handleMemberExpressionComments,
    handleIfStatementComments,
    handleWhileComments,
    handleTryStatementComments,
    handleClassComments,
    handleForComments,
    handleUnionTypeComments,
    handleOnlyComments,
    handleModuleSpecifiersComments,
    handleAssignmentPatternComments,
    handleMethodNameComments,
    handleLabeledStatementComments,
    handleBreakAndContinueStatementComments,
    handleNestedConditionalExpressionComments,
    handleCommentsInDestructuringPattern,
    handleTSMappedTypeComments
  ].some((fn) => fn(context));
}
function handleEndOfLineComment(context) {
  return [
    handleClosureTypeCastComments,
    handleLastFunctionArgComments,
    handleConditionalExpressionComments,
    handleModuleSpecifiersComments,
    handleIfStatementComments,
    handleWhileComments,
    handleTryStatementComments,
    handleClassComments,
    handleLabeledStatementComments,
    handleCallExpressionComments,
    handlePropertyComments,
    handleOnlyComments,
    handleVariableDeclaratorComments,
    handleBreakAndContinueStatementComments,
    handleSwitchDefaultCaseComments,
    handleLastUnionElementInExpression,
    handleLastBinaryOperatorOperand,
    handleTSMappedTypeComments
  ].some((fn) => fn(context));
}
function handleRemainingComment(context) {
  return [
    handleIgnoreComments,
    handleIfStatementComments,
    handleWhileComments,
    handleObjectPropertyAssignment,
    handleCommentInEmptyParens,
    handleMethodNameComments,
    handleOnlyComments,
    handleCommentAfterArrowParams,
    handleFunctionNameComments,
    handleBreakAndContinueStatementComments,
    handleTSFunctionTrailingComments
  ].some((fn) => fn(context));
}
function addBlockStatementFirstComment(node, comment) {
  const firstNonEmptyNode = (node.body || node.properties).find(
    ({ type }) => type !== "EmptyStatement"
  );
  if (firstNonEmptyNode) {
    addLeadingComment(firstNonEmptyNode, comment);
  } else {
    addDanglingComment(node, comment);
  }
}
function addBlockOrNotComment(node, comment) {
  if (node.type === "BlockStatement") {
    addBlockStatementFirstComment(node, comment);
  } else {
    addLeadingComment(node, comment);
  }
}
function handleClosureTypeCastComments({ comment, followingNode }) {
  if (followingNode && is_type_cast_comment_default(comment)) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}
function handleIfStatementComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text
}) {
  if (enclosingNode?.type !== "IfStatement" || !followingNode) {
    return false;
  }
  const nextCharacter = get_next_non_space_non_comment_character_default(
    text,
    locEnd(comment)
  );
  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if (precedingNode === enclosingNode.consequent && followingNode === enclosingNode.alternate) {
    const maybeElseTokenIndex = get_next_non_space_non_comment_character_index_default(
      text,
      locEnd(enclosingNode.consequent)
    );
    if (locStart(comment) < maybeElseTokenIndex || enclosingNode.alternate.type === "BlockStatement") {
      if (precedingNode.type === "BlockStatement") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if (isSingleLineComment(comment, text) && // Comment and `precedingNode` are on same line
      !has_newline_in_range_default(text, locStart(precedingNode), locStart(comment))) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      addDanglingComment(enclosingNode, comment);
      return true;
    }
  }
  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }
  if (followingNode.type === "IfStatement") {
    addBlockOrNotComment(followingNode.consequent, comment);
    return true;
  }
  if (enclosingNode.consequent === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}
function handleWhileComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text
}) {
  if (enclosingNode?.type !== "WhileStatement" || !followingNode) {
    return false;
  }
  const nextCharacter = get_next_non_space_non_comment_character_default(
    text,
    locEnd(comment)
  );
  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }
  if (enclosingNode.body === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}
function handleTryStatementComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode
}) {
  if (enclosingNode?.type !== "TryStatement" && enclosingNode?.type !== "CatchClause" || !followingNode) {
    return false;
  }
  if (enclosingNode.type === "CatchClause" && precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }
  if (followingNode.type === "TryStatement") {
    addBlockOrNotComment(followingNode.finalizer, comment);
    return true;
  }
  if (followingNode.type === "CatchClause") {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }
  return false;
}
function handleMemberExpressionComments({
  comment,
  enclosingNode,
  followingNode
}) {
  if (isMemberExpression(enclosingNode) && followingNode?.type === "Identifier") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleNestedConditionalExpressionComments({
  comment,
  enclosingNode,
  followingNode,
  options: options2
}) {
  if (!options2.experimentalTernaries) {
    return false;
  }
  const enclosingIsCond = enclosingNode?.type === "ConditionalExpression" || isConditionalType(enclosingNode);
  if (!enclosingIsCond) {
    return false;
  }
  const followingIsCond = followingNode?.type === "ConditionalExpression" || isConditionalType(followingNode);
  if (followingIsCond) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleConditionalExpressionComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text,
  options: options2
}) {
  const isSameLineAsPrecedingNode = precedingNode && !has_newline_in_range_default(text, locEnd(precedingNode), locStart(comment));
  if ((!precedingNode || !isSameLineAsPrecedingNode) && (enclosingNode?.type === "ConditionalExpression" || isConditionalType(enclosingNode)) && followingNode) {
    if (options2.experimentalTernaries && enclosingNode.alternate === followingNode && !(is_block_comment_default(comment) && !has_newline_in_range_default(
      options2.originalText,
      locStart(comment),
      locEnd(comment)
    ))) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}
function handleObjectPropertyAssignment({
  comment,
  precedingNode,
  enclosingNode
}) {
  if (isObjectProperty(enclosingNode) && enclosingNode.shorthand && enclosingNode.key === precedingNode && enclosingNode.value.type === "AssignmentPattern") {
    addTrailingComment(enclosingNode.value.left, comment);
    return true;
  }
  return false;
}
var classLikeNodeTypes = /* @__PURE__ */ new Set([
  "ClassDeclaration",
  "ClassExpression",
  "DeclareClass",
  "DeclareInterface",
  "InterfaceDeclaration",
  "TSInterfaceDeclaration"
]);
function handleClassComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode
}) {
  if (classLikeNodeTypes.has(enclosingNode?.type)) {
    if (is_non_empty_array_default(enclosingNode.decorators) && !(followingNode?.type === "Decorator")) {
      addTrailingComment(at_default(
        /* isOptionalObject */
        false,
        enclosingNode.decorators,
        -1
      ), comment);
      return true;
    }
    if (enclosingNode.body && followingNode === enclosingNode.body) {
      addBlockStatementFirstComment(enclosingNode.body, comment);
      return true;
    }
    if (followingNode) {
      if (enclosingNode.superClass && followingNode === enclosingNode.superClass && precedingNode && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.typeParameters)) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      for (const prop of ["implements", "extends", "mixins"]) {
        if (enclosingNode[prop] && followingNode === enclosingNode[prop][0]) {
          if (precedingNode && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.typeParameters || precedingNode === enclosingNode.superClass)) {
            addTrailingComment(precedingNode, comment);
          } else {
            addDanglingComment(enclosingNode, comment, prop);
          }
          return true;
        }
      }
    }
  }
  return false;
}
var propertyLikeNodeTypes = /* @__PURE__ */ new Set([
  "ClassMethod",
  "ClassProperty",
  "PropertyDefinition",
  "TSAbstractPropertyDefinition",
  "TSAbstractMethodDefinition",
  "TSDeclareMethod",
  "MethodDefinition",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractAccessorProperty",
  "TSParameterProperty"
]);
function handleMethodNameComments({
  comment,
  precedingNode,
  enclosingNode,
  text
}) {
  if (enclosingNode && precedingNode && get_next_non_space_non_comment_character_default(text, locEnd(comment)) === "(" && // "MethodDefinition" is handled in getCommentChildNodes
  (enclosingNode.type === "Property" || enclosingNode.type === "TSDeclareMethod" || enclosingNode.type === "TSAbstractMethodDefinition") && precedingNode.type === "Identifier" && enclosingNode.key === precedingNode && // special Property case: { key: /*comment*/(value) };
  // comment should be attached to value instead of key
  get_next_non_space_non_comment_character_default(text, locEnd(precedingNode)) !== ":") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if (precedingNode?.type === "Decorator" && propertyLikeNodeTypes.has(enclosingNode?.type) && (is_line_comment_default(comment) || comment.placement === "ownLine")) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}
var functionLikeNodeTypes = /* @__PURE__ */ new Set([
  "FunctionDeclaration",
  "FunctionExpression",
  "ClassMethod",
  "MethodDefinition",
  "ObjectMethod"
]);
function handleFunctionNameComments({
  comment,
  precedingNode,
  enclosingNode,
  text
}) {
  if (get_next_non_space_non_comment_character_default(text, locEnd(comment)) !== "(") {
    return false;
  }
  if (precedingNode && functionLikeNodeTypes.has(enclosingNode?.type)) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}
function handleCommentAfterArrowParams({ comment, enclosingNode, text }) {
  if (enclosingNode?.type !== "ArrowFunctionExpression") {
    return false;
  }
  const index = get_next_non_space_non_comment_character_index_default(text, locEnd(comment));
  if (index !== false && text.slice(index, index + 2) === "=>") {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleCommentInEmptyParens({ comment, enclosingNode, text }) {
  if (get_next_non_space_non_comment_character_default(text, locEnd(comment)) !== ")") {
    return false;
  }
  if (enclosingNode && (isRealFunctionLikeNode(enclosingNode) && getFunctionParameters(enclosingNode).length === 0 || isCallLikeExpression(enclosingNode) && getCallArguments(enclosingNode).length === 0)) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  if ((enclosingNode?.type === "MethodDefinition" || enclosingNode?.type === "TSAbstractMethodDefinition") && getFunctionParameters(enclosingNode.value).length === 0) {
    addDanglingComment(enclosingNode.value, comment);
    return true;
  }
  return false;
}
function handleLastComponentArgComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text
}) {
  if (precedingNode?.type === "ComponentTypeParameter" && (enclosingNode?.type === "DeclareComponent" || enclosingNode?.type === "ComponentTypeAnnotation") && followingNode?.type !== "ComponentTypeParameter") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if ((precedingNode?.type === "ComponentParameter" || precedingNode?.type === "RestElement") && enclosingNode?.type === "ComponentDeclaration" && get_next_non_space_non_comment_character_default(text, locEnd(comment)) === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}
function handleLastFunctionArgComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text
}) {
  if (precedingNode?.type === "FunctionTypeParam" && enclosingNode?.type === "FunctionTypeAnnotation" && followingNode?.type !== "FunctionTypeParam") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if ((precedingNode?.type === "Identifier" || precedingNode?.type === "AssignmentPattern" || precedingNode?.type === "ObjectPattern" || precedingNode?.type === "ArrayPattern" || precedingNode?.type === "RestElement" || precedingNode?.type === "TSParameterProperty") && isRealFunctionLikeNode(enclosingNode) && get_next_non_space_non_comment_character_default(text, locEnd(comment)) === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  if (!is_block_comment_default(comment) && (enclosingNode?.type === "FunctionDeclaration" || enclosingNode?.type === "FunctionExpression" || enclosingNode?.type === "ObjectMethod") && followingNode?.type === "BlockStatement" && enclosingNode.body === followingNode) {
    const characterAfterCommentIndex = get_next_non_space_non_comment_character_index_default(
      text,
      locEnd(comment)
    );
    if (characterAfterCommentIndex === locStart(followingNode)) {
      addBlockStatementFirstComment(followingNode, comment);
      return true;
    }
  }
  return false;
}
function handleLabeledStatementComments({ comment, enclosingNode }) {
  if (enclosingNode?.type === "LabeledStatement") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleBreakAndContinueStatementComments({ comment, enclosingNode }) {
  if ((enclosingNode?.type === "ContinueStatement" || enclosingNode?.type === "BreakStatement") && !enclosingNode.label) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleCallExpressionComments({
  comment,
  precedingNode,
  enclosingNode
}) {
  if (isCallExpression(enclosingNode) && precedingNode && enclosingNode.callee === precedingNode && enclosingNode.arguments.length > 0) {
    addLeadingComment(enclosingNode.arguments[0], comment);
    return true;
  }
  return false;
}
function handleUnionTypeComments({
  comment,
  precedingNode,
  enclosingNode,
  followingNode
}) {
  if (isUnionType(enclosingNode)) {
    if (isPrettierIgnoreComment(comment)) {
      followingNode.prettierIgnore = true;
      comment.unignore = true;
    }
    if (precedingNode) {
      addTrailingComment(precedingNode, comment);
      return true;
    }
    return false;
  }
  if (isUnionType(followingNode) && isPrettierIgnoreComment(comment)) {
    followingNode.types[0].prettierIgnore = true;
    comment.unignore = true;
  }
  return false;
}
function handlePropertyComments({ comment, enclosingNode }) {
  if (isObjectProperty(enclosingNode)) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleOnlyComments({ comment, enclosingNode, ast, isLastComment }) {
  if (ast?.body?.length === 0) {
    if (isLastComment) {
      addDanglingComment(ast, comment);
    } else {
      addLeadingComment(ast, comment);
    }
    return true;
  }
  if (enclosingNode?.type === "Program" && enclosingNode.body.length === 0 && !is_non_empty_array_default(enclosingNode.directives)) {
    if (isLastComment) {
      addDanglingComment(enclosingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }
    return true;
  }
  return false;
}
function handleForComments({ comment, enclosingNode }) {
  if (enclosingNode?.type === "ForInStatement" || enclosingNode?.type === "ForOfStatement") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleModuleSpecifiersComments({
  comment,
  precedingNode,
  enclosingNode,
  text
}) {
  if (enclosingNode?.type === "ImportSpecifier" || enclosingNode?.type === "ExportSpecifier") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  const isImportDeclaration = precedingNode?.type === "ImportSpecifier" && enclosingNode?.type === "ImportDeclaration";
  const isExportDeclaration2 = precedingNode?.type === "ExportSpecifier" && enclosingNode?.type === "ExportNamedDeclaration";
  if ((isImportDeclaration || isExportDeclaration2) && has_newline_default(text, locEnd(comment))) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}
function handleAssignmentPatternComments({ comment, enclosingNode }) {
  if (enclosingNode?.type === "AssignmentPattern") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
var assignmentLikeNodeTypes = /* @__PURE__ */ new Set([
  "VariableDeclarator",
  "AssignmentExpression",
  "TypeAlias",
  "TSTypeAliasDeclaration"
]);
var complexExprNodeTypes = /* @__PURE__ */ new Set([
  "ObjectExpression",
  "ArrayExpression",
  "TemplateLiteral",
  "TaggedTemplateExpression",
  "ObjectTypeAnnotation",
  "TSTypeLiteral"
]);
function handleVariableDeclaratorComments({
  comment,
  enclosingNode,
  followingNode
}) {
  if (assignmentLikeNodeTypes.has(enclosingNode?.type) && followingNode && (complexExprNodeTypes.has(followingNode.type) || is_block_comment_default(comment))) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}
function handleTSFunctionTrailingComments({
  comment,
  enclosingNode,
  followingNode,
  text
}) {
  if (!followingNode && (enclosingNode?.type === "TSMethodSignature" || enclosingNode?.type === "TSDeclareFunction" || enclosingNode?.type === "TSAbstractMethodDefinition") && get_next_non_space_non_comment_character_default(text, locEnd(comment)) === ";") {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}
function handleIgnoreComments({ comment, enclosingNode, followingNode }) {
  if (isPrettierIgnoreComment(comment) && enclosingNode?.type === "TSMappedType" && followingNode === enclosingNode.key) {
    enclosingNode.prettierIgnore = true;
    comment.unignore = true;
    return true;
  }
}
function handleTSMappedTypeComments({ comment, precedingNode, enclosingNode }) {
  if (enclosingNode?.type !== "TSMappedType") {
    return;
  }
  if (!precedingNode) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
}
function handleSwitchDefaultCaseComments({
  comment,
  enclosingNode,
  followingNode
}) {
  if (!enclosingNode || enclosingNode.type !== "SwitchCase" || enclosingNode.test || !followingNode || followingNode !== enclosingNode.consequent[0]) {
    return false;
  }
  if (followingNode.type === "BlockStatement" && is_line_comment_default(comment)) {
    addBlockStatementFirstComment(followingNode, comment);
  } else {
    addDanglingComment(enclosingNode, comment);
  }
  return true;
}
function handleLastUnionElementInExpression({
  comment,
  precedingNode,
  enclosingNode,
  followingNode
}) {
  if (isUnionType(precedingNode) && ((enclosingNode.type === "TSArrayType" || enclosingNode.type === "ArrayTypeAnnotation") && !followingNode || isIntersectionType(enclosingNode))) {
    addTrailingComment(at_default(
      /* isOptionalObject */
      false,
      precedingNode.types,
      -1
    ), comment);
    return true;
  }
  return false;
}
function handleCommentsInDestructuringPattern({
  comment,
  enclosingNode,
  precedingNode,
  followingNode
}) {
  if ((enclosingNode?.type === "ObjectPattern" || enclosingNode?.type === "ArrayPattern") && followingNode?.type === "TSTypeAnnotation") {
    if (precedingNode) {
      addTrailingComment(precedingNode, comment);
    } else {
      addDanglingComment(enclosingNode, comment);
    }
    return true;
  }
}
function handleLastBinaryOperatorOperand({
  comment,
  precedingNode,
  enclosingNode,
  followingNode,
  text
}) {
  if (!followingNode && enclosingNode?.type === "UnaryExpression" && (precedingNode?.type === "LogicalExpression" || precedingNode?.type === "BinaryExpression")) {
    if (
      // Multiline expression
      has_newline_in_range_default(
        text,
        locStart(enclosingNode.argument),
        locStart(precedingNode.right)
      ) && isSingleLineComment(comment, text) && // Comment and `precedingNode.right` are on same line
      !has_newline_in_range_default(text, locStart(precedingNode.right), locStart(comment))
    ) {
      addTrailingComment(precedingNode.right, comment);
      return true;
    }
  }
  return false;
}
var isRealFunctionLikeNode = create_type_check_function_default([
  "ArrowFunctionExpression",
  "FunctionExpression",
  "FunctionDeclaration",
  "ObjectMethod",
  "ClassMethod",
  "TSDeclareFunction",
  "TSCallSignatureDeclaration",
  "TSConstructSignatureDeclaration",
  "TSMethodSignature",
  "TSConstructorType",
  "TSFunctionType",
  "TSDeclareMethod"
]);

// src/language-js/comments/printer-methods.js
var nodeTypesCanNotAttachComment = /* @__PURE__ */ new Set([
  "EmptyStatement",
  "TemplateElement",
  // There is no similar node in Babel AST
  // ```ts
  // class Foo {
  //   bar();
  //      ^^^ TSEmptyBodyFunctionExpression
  // }
  // ```
  "TSEmptyBodyFunctionExpression",
  // There is no similar node in Babel AST, `a?.b`
  "ChainExpression"
]);
function canAttachComment(node) {
  return !nodeTypesCanNotAttachComment.has(node.type);
}
function getCommentChildNodes(node, options2) {
  if ((options2.parser === "typescript" || options2.parser === "flow" || options2.parser === "hermes" || options2.parser === "acorn" || options2.parser === "oxc" || options2.parser === "oxc-ts" || options2.parser === "espree" || options2.parser === "meriyah" || options2.parser === "__babel_estree") && node.type === "MethodDefinition" && node.value?.type === "FunctionExpression" && getFunctionParameters(node.value).length === 0 && !node.value.returnType && !is_non_empty_array_default(node.value.typeParameters) && node.value.body) {
    return [...node.decorators || [], node.key, node.value.body];
  }
}
function willPrintOwnComments(path) {
  const { node, parent } = path;
  return (isJsxElement(node) || parent && (parent.type === "JSXSpreadAttribute" || parent.type === "JSXSpreadChild" || isUnionType(parent) || (parent.type === "ClassDeclaration" || parent.type === "ClassExpression") && parent.superClass === node)) && (!hasNodeIgnoreComment(node) || isUnionType(parent));
}
function isGap(text, { parser }) {
  if (parser === "flow" || parser === "hermes" || parser === "babel-flow") {
    text = string_replace_all_default(
      /* isOptionalObject */
      false,
      text,
      /[\s(]/gu,
      ""
    );
    return text === "" || text === "/*" || text === "/*::";
  }
}

// src/document/printer.js
var MODE_BREAK = Symbol("MODE_BREAK");
var MODE_FLAT = Symbol("MODE_FLAT");
var CURSOR_PLACEHOLDER = Symbol("cursor");
var DOC_FILL_PRINTED_LENGTH = Symbol("DOC_FILL_PRINTED_LENGTH");
function rootIndent() {
  return { value: "", length: 0, queue: [] };
}
function makeIndent(ind, options2) {
  return generateInd(ind, { type: "indent" }, options2);
}
function makeAlign(indent2, widthOrDoc, options2) {
  if (widthOrDoc === Number.NEGATIVE_INFINITY) {
    return indent2.root || rootIndent();
  }
  if (widthOrDoc < 0) {
    return generateInd(indent2, { type: "dedent" }, options2);
  }
  if (!widthOrDoc) {
    return indent2;
  }
  if (widthOrDoc.type === "root") {
    return { ...indent2, root: indent2 };
  }
  const alignType = typeof widthOrDoc === "string" ? "stringAlign" : "numberAlign";
  return generateInd(indent2, { type: alignType, n: widthOrDoc }, options2);
}
function generateInd(ind, newPart, options2) {
  const queue = newPart.type === "dedent" ? ind.queue.slice(0, -1) : [...ind.queue, newPart];
  let value = "";
  let length = 0;
  let lastTabs = 0;
  let lastSpaces = 0;
  for (const part of queue) {
    switch (part.type) {
      case "indent":
        flush();
        if (options2.useTabs) {
          addTabs(1);
        } else {
          addSpaces(options2.tabWidth);
        }
        break;
      case "stringAlign":
        flush();
        value += part.n;
        length += part.n.length;
        break;
      case "numberAlign":
        lastTabs += 1;
        lastSpaces += part.n;
        break;
      default:
        throw new Error(`Unexpected type '${part.type}'`);
    }
  }
  flushSpaces();
  return { ...ind, value, length, queue };
  function addTabs(count) {
    value += "	".repeat(count);
    length += options2.tabWidth * count;
  }
  function addSpaces(count) {
    value += " ".repeat(count);
    length += count;
  }
  function flush() {
    if (options2.useTabs) {
      flushTabs();
    } else {
      flushSpaces();
    }
  }
  function flushTabs() {
    if (lastTabs > 0) {
      addTabs(lastTabs);
    }
    resetLast();
  }
  function flushSpaces() {
    if (lastSpaces > 0) {
      addSpaces(lastSpaces);
    }
    resetLast();
  }
  function resetLast() {
    lastTabs = 0;
    lastSpaces = 0;
  }
}
function trim(out) {
  let trimCount = 0;
  let cursorCount = 0;
  let outIndex = out.length;
  outer: while (outIndex--) {
    const last = out[outIndex];
    if (last === CURSOR_PLACEHOLDER) {
      cursorCount++;
      continue;
    }
    if (false) {
      throw new Error(`Unexpected value in trim: '${typeof last}'`);
    }
    for (let charIndex = last.length - 1; charIndex >= 0; charIndex--) {
      const char = last[charIndex];
      if (char === " " || char === "	") {
        trimCount++;
      } else {
        out[outIndex] = last.slice(0, charIndex + 1);
        break outer;
      }
    }
  }
  if (trimCount > 0 || cursorCount > 0) {
    out.length = outIndex + 1;
    while (cursorCount-- > 0) {
      out.push(CURSOR_PLACEHOLDER);
    }
  }
  return trimCount;
}
function fits(next, restCommands, width, hasLineSuffix, groupModeMap, mustBeFlat) {
  if (width === Number.POSITIVE_INFINITY) {
    return true;
  }
  let restIdx = restCommands.length;
  const cmds = [next];
  const out = [];
  while (width >= 0) {
    if (cmds.length === 0) {
      if (restIdx === 0) {
        return true;
      }
      cmds.push(restCommands[--restIdx]);
      continue;
    }
    const { mode, doc } = cmds.pop();
    const docType = get_doc_type_default(doc);
    switch (docType) {
      case DOC_TYPE_STRING:
        out.push(doc);
        width -= get_string_width_default(doc);
        break;
      case DOC_TYPE_ARRAY:
      case DOC_TYPE_FILL: {
        const parts = docType === DOC_TYPE_ARRAY ? doc : doc.parts;
        const end = doc[DOC_FILL_PRINTED_LENGTH] ?? 0;
        for (let i = parts.length - 1; i >= end; i--) {
          cmds.push({ mode, doc: parts[i] });
        }
        break;
      }
      case DOC_TYPE_INDENT:
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
        cmds.push({ mode, doc: doc.contents });
        break;
      case DOC_TYPE_TRIM:
        width += trim(out);
        break;
      case DOC_TYPE_GROUP: {
        if (mustBeFlat && doc.break) {
          return false;
        }
        const groupMode = doc.break ? MODE_BREAK : mode;
        const contents = doc.expandedStates && groupMode === MODE_BREAK ? at_default(
          /* isOptionalObject */
          false,
          doc.expandedStates,
          -1
        ) : doc.contents;
        cmds.push({ mode: groupMode, doc: contents });
        break;
      }
      case DOC_TYPE_IF_BREAK: {
        const groupMode = doc.groupId ? groupModeMap[doc.groupId] || MODE_FLAT : mode;
        const contents = groupMode === MODE_BREAK ? doc.breakContents : doc.flatContents;
        if (contents) {
          cmds.push({ mode, doc: contents });
        }
        break;
      }
      case DOC_TYPE_LINE:
        if (mode === MODE_BREAK || doc.hard) {
          return true;
        }
        if (!doc.soft) {
          out.push(" ");
          width--;
        }
        break;
      case DOC_TYPE_LINE_SUFFIX:
        hasLineSuffix = true;
        break;
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
        if (hasLineSuffix) {
          return false;
        }
        break;
    }
  }
  return false;
}
function printDocToString(doc, options2) {
  const groupModeMap = {};
  const width = options2.printWidth;
  const newLine = convertEndOfLineToChars(options2.endOfLine);
  let pos = 0;
  const cmds = [{ ind: rootIndent(), mode: MODE_BREAK, doc }];
  const out = [];
  let shouldRemeasure = false;
  const lineSuffix2 = [];
  let printedCursorCount = 0;
  propagateBreaks(doc);
  while (cmds.length > 0) {
    const { ind, mode, doc: doc2 } = cmds.pop();
    switch (get_doc_type_default(doc2)) {
      case DOC_TYPE_STRING: {
        const formatted = newLine !== "\n" ? string_replace_all_default(
          /* isOptionalObject */
          false,
          doc2,
          "\n",
          newLine
        ) : doc2;
        out.push(formatted);
        if (cmds.length > 0) {
          pos += get_string_width_default(formatted);
        }
        break;
      }
      case DOC_TYPE_ARRAY:
        for (let i = doc2.length - 1; i >= 0; i--) {
          cmds.push({ ind, mode, doc: doc2[i] });
        }
        break;
      case DOC_TYPE_CURSOR:
        if (printedCursorCount >= 2) {
          throw new Error("There are too many 'cursor' in doc.");
        }
        out.push(CURSOR_PLACEHOLDER);
        printedCursorCount++;
        break;
      case DOC_TYPE_INDENT:
        cmds.push({ ind: makeIndent(ind, options2), mode, doc: doc2.contents });
        break;
      case DOC_TYPE_ALIGN:
        cmds.push({
          ind: makeAlign(ind, doc2.n, options2),
          mode,
          doc: doc2.contents
        });
        break;
      case DOC_TYPE_TRIM:
        pos -= trim(out);
        break;
      case DOC_TYPE_GROUP:
        switch (mode) {
          case MODE_FLAT:
            if (!shouldRemeasure) {
              cmds.push({
                ind,
                mode: doc2.break ? MODE_BREAK : MODE_FLAT,
                doc: doc2.contents
              });
              break;
            }
          // fallthrough
          case MODE_BREAK: {
            shouldRemeasure = false;
            const next = { ind, mode: MODE_FLAT, doc: doc2.contents };
            const rem = width - pos;
            const hasLineSuffix = lineSuffix2.length > 0;
            if (!doc2.break && fits(next, cmds, rem, hasLineSuffix, groupModeMap)) {
              cmds.push(next);
            } else {
              if (doc2.expandedStates) {
                const mostExpanded = at_default(
                  /* isOptionalObject */
                  false,
                  doc2.expandedStates,
                  -1
                );
                if (doc2.break) {
                  cmds.push({ ind, mode: MODE_BREAK, doc: mostExpanded });
                  break;
                } else {
                  for (let i = 1; i < doc2.expandedStates.length + 1; i++) {
                    if (i >= doc2.expandedStates.length) {
                      cmds.push({ ind, mode: MODE_BREAK, doc: mostExpanded });
                      break;
                    } else {
                      const state = doc2.expandedStates[i];
                      const cmd = { ind, mode: MODE_FLAT, doc: state };
                      if (fits(cmd, cmds, rem, hasLineSuffix, groupModeMap)) {
                        cmds.push(cmd);
                        break;
                      }
                    }
                  }
                }
              } else {
                cmds.push({ ind, mode: MODE_BREAK, doc: doc2.contents });
              }
            }
            break;
          }
        }
        if (doc2.id) {
          groupModeMap[doc2.id] = at_default(
            /* isOptionalObject */
            false,
            cmds,
            -1
          ).mode;
        }
        break;
      // Fills each line with as much code as possible before moving to a new
      // line with the same indentation.
      //
      // Expects doc.parts to be an array of alternating content and
      // whitespace. The whitespace contains the linebreaks.
      //
      // For example:
      //   ["I", line, "love", line, "monkeys"]
      // or
      //   [{ type: group, ... }, softline, { type: group, ... }]
      //
      // It uses this parts structure to handle three main layout cases:
      // * The first two content items fit on the same line without
      //   breaking
      //   -> output the first content item and the whitespace "flat".
      // * Only the first content item fits on the line without breaking
      //   -> output the first content item "flat" and the whitespace with
      //   "break".
      // * Neither content item fits on the line without breaking
      //   -> output the first content item and the whitespace with "break".
      case DOC_TYPE_FILL: {
        const rem = width - pos;
        const offset = doc2[DOC_FILL_PRINTED_LENGTH] ?? 0;
        const { parts } = doc2;
        const length = parts.length - offset;
        if (length === 0) {
          break;
        }
        const content = parts[offset + 0];
        const whitespace = parts[offset + 1];
        const contentFlatCmd = { ind, mode: MODE_FLAT, doc: content };
        const contentBreakCmd = { ind, mode: MODE_BREAK, doc: content };
        const contentFits = fits(
          contentFlatCmd,
          [],
          rem,
          lineSuffix2.length > 0,
          groupModeMap,
          true
        );
        if (length === 1) {
          if (contentFits) {
            cmds.push(contentFlatCmd);
          } else {
            cmds.push(contentBreakCmd);
          }
          break;
        }
        const whitespaceFlatCmd = { ind, mode: MODE_FLAT, doc: whitespace };
        const whitespaceBreakCmd = { ind, mode: MODE_BREAK, doc: whitespace };
        if (length === 2) {
          if (contentFits) {
            cmds.push(whitespaceFlatCmd, contentFlatCmd);
          } else {
            cmds.push(whitespaceBreakCmd, contentBreakCmd);
          }
          break;
        }
        const secondContent = parts[offset + 2];
        const remainingCmd = {
          ind,
          mode,
          doc: { ...doc2, [DOC_FILL_PRINTED_LENGTH]: offset + 2 }
        };
        const firstAndSecondContentFlatCmd = {
          ind,
          mode: MODE_FLAT,
          doc: [content, whitespace, secondContent]
        };
        const firstAndSecondContentFits = fits(
          firstAndSecondContentFlatCmd,
          [],
          rem,
          lineSuffix2.length > 0,
          groupModeMap,
          true
        );
        if (firstAndSecondContentFits) {
          cmds.push(remainingCmd, whitespaceFlatCmd, contentFlatCmd);
        } else if (contentFits) {
          cmds.push(remainingCmd, whitespaceBreakCmd, contentFlatCmd);
        } else {
          cmds.push(remainingCmd, whitespaceBreakCmd, contentBreakCmd);
        }
        break;
      }
      case DOC_TYPE_IF_BREAK:
      case DOC_TYPE_INDENT_IF_BREAK: {
        const groupMode = doc2.groupId ? groupModeMap[doc2.groupId] : mode;
        if (groupMode === MODE_BREAK) {
          const breakContents = doc2.type === DOC_TYPE_IF_BREAK ? doc2.breakContents : doc2.negate ? doc2.contents : indent(doc2.contents);
          if (breakContents) {
            cmds.push({ ind, mode, doc: breakContents });
          }
        }
        if (groupMode === MODE_FLAT) {
          const flatContents = doc2.type === DOC_TYPE_IF_BREAK ? doc2.flatContents : doc2.negate ? indent(doc2.contents) : doc2.contents;
          if (flatContents) {
            cmds.push({ ind, mode, doc: flatContents });
          }
        }
        break;
      }
      case DOC_TYPE_LINE_SUFFIX:
        lineSuffix2.push({ ind, mode, doc: doc2.contents });
        break;
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
        if (lineSuffix2.length > 0) {
          cmds.push({ ind, mode, doc: hardlineWithoutBreakParent });
        }
        break;
      case DOC_TYPE_LINE:
        switch (mode) {
          case MODE_FLAT:
            if (!doc2.hard) {
              if (!doc2.soft) {
                out.push(" ");
                pos += 1;
              }
              break;
            } else {
              shouldRemeasure = true;
            }
          // fallthrough
          case MODE_BREAK:
            if (lineSuffix2.length > 0) {
              cmds.push({ ind, mode, doc: doc2 }, ...lineSuffix2.reverse());
              lineSuffix2.length = 0;
              break;
            }
            if (doc2.literal) {
              if (ind.root) {
                out.push(newLine, ind.root.value);
                pos = ind.root.length;
              } else {
                out.push(newLine);
                pos = 0;
              }
            } else {
              pos -= trim(out);
              out.push(newLine + ind.value);
              pos = ind.length;
            }
            break;
        }
        break;
      case DOC_TYPE_LABEL:
        cmds.push({ ind, mode, doc: doc2.contents });
        break;
      case DOC_TYPE_BREAK_PARENT:
        break;
      default:
        throw new invalid_doc_error_default(doc2);
    }
    if (cmds.length === 0 && lineSuffix2.length > 0) {
      cmds.push(...lineSuffix2.reverse());
      lineSuffix2.length = 0;
    }
  }
  const cursorPlaceholderIndex = out.indexOf(CURSOR_PLACEHOLDER);
  if (cursorPlaceholderIndex !== -1) {
    const otherCursorPlaceholderIndex = out.indexOf(
      CURSOR_PLACEHOLDER,
      cursorPlaceholderIndex + 1
    );
    if (otherCursorPlaceholderIndex === -1) {
      return {
        formatted: out.filter((char) => char !== CURSOR_PLACEHOLDER).join("")
      };
    }
    const beforeCursor = out.slice(0, cursorPlaceholderIndex).join("");
    const aroundCursor = out.slice(cursorPlaceholderIndex + 1, otherCursorPlaceholderIndex).join("");
    const afterCursor = out.slice(otherCursorPlaceholderIndex + 1).join("");
    return {
      formatted: beforeCursor + aroundCursor + afterCursor,
      cursorNodeStart: beforeCursor.length,
      cursorNodeText: aroundCursor
    };
  }
  return { formatted: out.join("") };
}

// src/utils/get-alignment-size.js
function getAlignmentSize(text, tabWidth, startIndex = 0) {
  let size = 0;
  for (let i = startIndex; i < text.length; ++i) {
    if (text[i] === "	") {
      size = size + tabWidth - size % tabWidth;
    } else {
      size++;
    }
  }
  return size;
}
var get_alignment_size_default = getAlignmentSize;

// src/utils/get-indent-size.js
function getIndentSize(value, tabWidth) {
  const lastNewlineIndex = value.lastIndexOf("\n");
  if (lastNewlineIndex === -1) {
    return 0;
  }
  return get_alignment_size_default(
    // All the leading whitespaces
    value.slice(lastNewlineIndex + 1).match(/^[\t ]*/u)[0],
    tabWidth
  );
}
var get_indent_size_default = getIndentSize;

// src/language-js/print/template-literal.js
function printTemplateLiteral(path, options2, print3) {
  const { node } = path;
  const isTemplateLiteral = node.type === "TemplateLiteral";
  if (isTemplateLiteral && isJestEachTemplateLiteral(path)) {
    const printed = printJestEachTemplateLiteral(path, options2, print3);
    if (printed) {
      return printed;
    }
  }
  let expressionsKey = "expressions";
  if (node.type === "TSTemplateLiteralType") {
    expressionsKey = "types";
  }
  const parts = [];
  const expressionDocs = path.map(print3, expressionsKey);
  parts.push(lineSuffixBoundary, "`");
  let previousQuasiIndentSize = 0;
  path.each(({ index, node: quasi }) => {
    parts.push(print3());
    if (quasi.tail) {
      return;
    }
    const { tabWidth } = options2;
    const text = quasi.value.raw;
    const indentSize = text.includes("\n") ? get_indent_size_default(text, tabWidth) : previousQuasiIndentSize;
    previousQuasiIndentSize = indentSize;
    let expressionDoc = expressionDocs[index];
    const expression = node[expressionsKey][index];
    let interpolationHasNewline = has_newline_in_range_default(
      options2.originalText,
      locEnd(quasi),
      locStart(node.quasis[index + 1])
    );
    if (!interpolationHasNewline) {
      const renderedExpression = printDocToString(expressionDoc, {
        ...options2,
        printWidth: Number.POSITIVE_INFINITY
      }).formatted;
      if (renderedExpression.includes("\n")) {
        interpolationHasNewline = true;
      } else {
        expressionDoc = renderedExpression;
      }
    }
    expressionDoc = [indent([softline, expressionDoc]), softline];
    const aligned = indentSize === 0 && text.endsWith("\n") ? align(Number.NEGATIVE_INFINITY, expressionDoc) : addAlignmentToDoc(expressionDoc, indentSize, tabWidth);
    parts.push(group(["${", aligned, lineSuffixBoundary, "}"]));
  }, "quasis");
  parts.push("`");
  return parts;
}
function printTaggedTemplateLiteral(path, options2, print3) {
  const quasiDoc = print3("quasi");
  const { node } = path;
  let space = "";
  const quasiLeadingComment = getComments(
    node.quasi,
    CommentCheckFlags.Leading
  )[0];
  if (quasiLeadingComment) {
    if (has_newline_in_range_default(
      options2.originalText,
      locEnd(node.typeArguments ?? node.typeParameters ?? node.tag),
      locStart(quasiLeadingComment)
    )) {
      space = softline;
    } else {
      space = " ";
    }
  }
  return label(quasiDoc.label && { tagged: true, ...quasiDoc.label }, [
    print3("tag"),
    print3(node.typeArguments ? "typeArguments" : "typeParameters"),
    space,
    lineSuffixBoundary,
    quasiDoc
  ]);
}
function printJestEachTemplateLiteral(path, options2, print3) {
  const { node } = path;
  const headerNames = node.quasis[0].value.raw.trim().split(/\s*\|\s*/u);
  if (headerNames.length > 1 || headerNames.some((headerName) => headerName.length > 0)) {
    options2.__inJestEach = true;
    const expressions = path.map(print3, "expressions");
    options2.__inJestEach = false;
    const parts = [];
    const stringifiedExpressions = expressions.map(
      (doc) => "${" + printDocToString(doc, {
        ...options2,
        printWidth: Number.POSITIVE_INFINITY,
        endOfLine: "lf"
      }).formatted + "}"
    );
    const tableBody = [{ hasLineBreak: false, cells: [] }];
    for (let i = 1; i < node.quasis.length; i++) {
      const row = at_default(
        /* isOptionalObject */
        false,
        tableBody,
        -1
      );
      const correspondingExpression = stringifiedExpressions[i - 1];
      row.cells.push(correspondingExpression);
      if (correspondingExpression.includes("\n")) {
        row.hasLineBreak = true;
      }
      if (node.quasis[i].value.raw.includes("\n")) {
        tableBody.push({ hasLineBreak: false, cells: [] });
      }
    }
    const maxColumnCount = Math.max(
      headerNames.length,
      ...tableBody.map((row) => row.cells.length)
    );
    const maxColumnWidths = Array.from({ length: maxColumnCount }).fill(0);
    const table = [
      { cells: headerNames },
      ...tableBody.filter((row) => row.cells.length > 0)
    ];
    for (const { cells } of table.filter((row) => !row.hasLineBreak)) {
      for (const [index, cell] of cells.entries()) {
        maxColumnWidths[index] = Math.max(
          maxColumnWidths[index],
          get_string_width_default(cell)
        );
      }
    }
    parts.push(
      lineSuffixBoundary,
      "`",
      indent([
        hardline,
        join(
          hardline,
          table.map(
            (row) => join(
              " | ",
              row.cells.map(
                (cell, index) => row.hasLineBreak ? cell : cell + " ".repeat(maxColumnWidths[index] - get_string_width_default(cell))
              )
            )
          )
        )
      ]),
      hardline,
      "`"
    );
    return parts;
  }
}
function printTemplateExpression(path, print3) {
  const { node } = path;
  let printed = print3();
  if (hasComment(node)) {
    printed = group([indent([softline, printed]), softline]);
  }
  return ["${", printed, lineSuffixBoundary, "}"];
}
function printTemplateExpressions(path, print3) {
  return path.map(
    (path2) => printTemplateExpression(path2, print3),
    "expressions"
  );
}
function escapeTemplateCharacters(doc, raw) {
  return mapDoc(doc, (currentDoc) => {
    if (typeof currentDoc === "string") {
      return raw ? string_replace_all_default(
        /* isOptionalObject */
        false,
        currentDoc,
        /(\\*)`/gu,
        "$1$1\\`"
      ) : uncookTemplateElementValue(currentDoc);
    }
    return currentDoc;
  });
}
function uncookTemplateElementValue(cookedValue) {
  return string_replace_all_default(
    /* isOptionalObject */
    false,
    cookedValue,
    /([\\`]|\$\{)/gu,
    String.raw`\$1`
  );
}
function isJestEachTemplateLiteral({ node, parent }) {
  const jestEachTriggerRegex = /^[fx]?(?:describe|it|test)$/u;
  return parent.type === "TaggedTemplateExpression" && parent.quasi === node && parent.tag.type === "MemberExpression" && parent.tag.property.type === "Identifier" && parent.tag.property.name === "each" && (parent.tag.object.type === "Identifier" && jestEachTriggerRegex.test(parent.tag.object.name) || parent.tag.object.type === "MemberExpression" && parent.tag.object.property.type === "Identifier" && (parent.tag.object.property.name === "only" || parent.tag.object.property.name === "skip") && parent.tag.object.object.type === "Identifier" && jestEachTriggerRegex.test(parent.tag.object.object.name));
}

// src/language-js/embed/utils.js
var angularComponentObjectExpressionPredicates = [
  (node, name) => node.type === "ObjectExpression" && name === "properties",
  (node, name) => node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "Component" && name === "arguments",
  (node, name) => node.type === "Decorator" && name === "expression"
];
function isAngularComponentStyles(path) {
  const isTemplateLiteral = (node) => node.type === "TemplateLiteral";
  const isObjectPropertyNamedStyles = (node, key) => isObjectProperty(node) && !node.computed && node.key.type === "Identifier" && node.key.name === "styles" && key === "value";
  return path.match(
    isTemplateLiteral,
    (node, name) => isArrayExpression(node) && name === "elements",
    isObjectPropertyNamedStyles,
    ...angularComponentObjectExpressionPredicates
  ) || path.match(
    isTemplateLiteral,
    isObjectPropertyNamedStyles,
    ...angularComponentObjectExpressionPredicates
  );
}
function isAngularComponentTemplate(path) {
  return path.match(
    (node) => node.type === "TemplateLiteral",
    (node, name) => isObjectProperty(node) && !node.computed && node.key.type === "Identifier" && node.key.name === "template" && name === "value",
    ...angularComponentObjectExpressionPredicates
  );
}
function hasLeadingBlockCommentWithName(node, languageName) {
  return hasComment(
    node,
    CommentCheckFlags.Block | CommentCheckFlags.Leading,
    ({ value }) => value === ` ${languageName} `
  );
}
function hasLanguageComment({ node, parent }, languageName) {
  return hasLeadingBlockCommentWithName(node, languageName) || isAsConstExpression(parent) && hasLeadingBlockCommentWithName(parent, languageName) || parent.type === "ExpressionStatement" && hasLeadingBlockCommentWithName(parent, languageName);
}
function isAsConstExpression(node) {
  return node.type === "AsConstExpression" || node.type === "TSAsExpression" && node.typeAnnotation.type === "TSTypeReference" && node.typeAnnotation.typeName.type === "Identifier" && node.typeAnnotation.typeName.name === "const";
}

// src/language-js/embed/css.js
async function printEmbedCss(textToDoc, print3, path) {
  const { node } = path;
  const rawQuasis = node.quasis.map((q) => q.value.raw);
  let placeholderID = 0;
  const text = rawQuasis.reduce(
    (prevVal, currVal, idx) => idx === 0 ? currVal : prevVal + "@prettier-placeholder-" + placeholderID++ + "-id" + currVal,
    ""
  );
  const quasisDoc = await textToDoc(text, { parser: "scss" });
  const expressionDocs = printTemplateExpressions(path, print3);
  const newDoc = replacePlaceholders(quasisDoc, expressionDocs);
  if (!newDoc) {
    throw new Error("Couldn't insert all the expressions");
  }
  return ["`", indent([hardline, newDoc]), softline, "`"];
}
function replacePlaceholders(quasisDoc, expressionDocs) {
  if (!is_non_empty_array_default(expressionDocs)) {
    return quasisDoc;
  }
  let replaceCounter = 0;
  const newDoc = mapDoc(cleanDoc(quasisDoc), (doc) => {
    if (typeof doc !== "string" || !doc.includes("@prettier-placeholder")) {
      return doc;
    }
    return doc.split(/@prettier-placeholder-(\d+)-id/u).map((component, idx) => {
      if (idx % 2 === 0) {
        return replaceEndOfLine(component);
      }
      replaceCounter++;
      return expressionDocs[component];
    });
  });
  return expressionDocs.length === replaceCounter ? newDoc : null;
}
function isStyledJsx({ node, parent, grandparent }) {
  return grandparent && node.quasis && parent.type === "JSXExpressionContainer" && grandparent.type === "JSXElement" && grandparent.openingElement.name.name === "style" && grandparent.openingElement.attributes.some(
    (attribute) => attribute.type === "JSXAttribute" && attribute.name.name === "jsx"
  ) || parent?.type === "TaggedTemplateExpression" && parent.tag.type === "Identifier" && parent.tag.name === "css" || parent?.type === "TaggedTemplateExpression" && parent.tag.type === "MemberExpression" && parent.tag.object.name === "css" && (parent.tag.property.name === "global" || parent.tag.property.name === "resolve");
}
function isStyledIdentifier(node) {
  return node.type === "Identifier" && node.name === "styled";
}
function isStyledExtend(node) {
  return /^[A-Z]/u.test(node.object.name) && node.property.name === "extend";
}
function isStyledComponents({ parent }) {
  if (!parent || parent.type !== "TaggedTemplateExpression") {
    return false;
  }
  const tag = parent.tag.type === "ParenthesizedExpression" ? parent.tag.expression : parent.tag;
  switch (tag.type) {
    case "MemberExpression":
      return (
        // styled.foo``
        isStyledIdentifier(tag.object) || // Component.extend``
        isStyledExtend(tag)
      );
    case "CallExpression":
      return (
        // styled(Component)``
        isStyledIdentifier(tag.callee) || tag.callee.type === "MemberExpression" && (tag.callee.object.type === "MemberExpression" && // styled.foo.attrs({})``
        (isStyledIdentifier(tag.callee.object.object) || // Component.extend.attrs({})``
        isStyledExtend(tag.callee.object)) || // styled(Component).attrs({})``
        tag.callee.object.type === "CallExpression" && isStyledIdentifier(tag.callee.object.callee))
      );
    case "Identifier":
      return tag.name === "css";
    default:
      return false;
  }
}
function isCssProp({ parent, grandparent }) {
  return grandparent?.type === "JSXAttribute" && parent.type === "JSXExpressionContainer" && grandparent.name.type === "JSXIdentifier" && grandparent.name.name === "css";
}
function printCss(path) {
  if (isStyledJsx(path) || isStyledComponents(path) || isCssProp(path) || isAngularComponentStyles(path)) {
    return printEmbedCss;
  }
}
var css_default = printCss;

// src/language-js/embed/graphql.js
async function printEmbedGraphQL(textToDoc, print3, path) {
  const { node } = path;
  const numQuasis = node.quasis.length;
  const expressionDocs = printTemplateExpressions(path, print3);
  const parts = [];
  for (let i = 0; i < numQuasis; i++) {
    const templateElement = node.quasis[i];
    const isFirst = i === 0;
    const isLast = i === numQuasis - 1;
    const text = templateElement.value.cooked;
    const lines = text.split("\n");
    const numLines = lines.length;
    const expressionDoc = expressionDocs[i];
    const startsWithBlankLine = numLines > 2 && lines[0].trim() === "" && lines[1].trim() === "";
    const endsWithBlankLine = numLines > 2 && lines[numLines - 1].trim() === "" && lines[numLines - 2].trim() === "";
    const commentsAndWhitespaceOnly = lines.every(
      (line2) => /^\s*(?:#[^\n\r]*)?$/u.test(line2)
    );
    if (!isLast && /#[^\n\r]*$/u.test(lines[numLines - 1])) {
      return null;
    }
    let doc = null;
    if (commentsAndWhitespaceOnly) {
      doc = printGraphqlComments(lines);
    } else {
      doc = await textToDoc(text, { parser: "graphql" });
    }
    if (doc) {
      doc = escapeTemplateCharacters(doc, false);
      if (!isFirst && startsWithBlankLine) {
        parts.push("");
      }
      parts.push(doc);
      if (!isLast && endsWithBlankLine) {
        parts.push("");
      }
    } else if (!isFirst && !isLast && startsWithBlankLine) {
      parts.push("");
    }
    if (expressionDoc) {
      parts.push(expressionDoc);
    }
  }
  return ["`", indent([hardline, join(hardline, parts)]), hardline, "`"];
}
function printGraphqlComments(lines) {
  const parts = [];
  let seenComment = false;
  const array = lines.map((textLine) => textLine.trim());
  for (const [i, textLine] of array.entries()) {
    if (textLine === "") {
      continue;
    }
    if (array[i - 1] === "" && seenComment) {
      parts.push([hardline, textLine]);
    } else {
      parts.push(textLine);
    }
    seenComment = true;
  }
  return parts.length === 0 ? null : join(hardline, parts);
}
function isGraphQL({ node, parent }) {
  return hasLanguageComment({ node, parent }, "GraphQL") || parent && (parent.type === "TaggedTemplateExpression" && (parent.tag.type === "MemberExpression" && parent.tag.object.name === "graphql" && parent.tag.property.name === "experimental" || parent.tag.type === "Identifier" && (parent.tag.name === "gql" || parent.tag.name === "graphql")) || parent.type === "CallExpression" && parent.callee.type === "Identifier" && parent.callee.name === "graphql");
}
function printGraphql(path) {
  if (isGraphQL(path)) {
    return printEmbedGraphQL;
  }
}
var graphql_default = printGraphql;

// src/language-js/embed/html.js
var htmlTemplateLiteralCounter = 0;
async function printEmbedHtmlLike(parser, textToDoc, print3, path, options2) {
  const { node } = path;
  const counter = htmlTemplateLiteralCounter;
  htmlTemplateLiteralCounter = htmlTemplateLiteralCounter + 1 >>> 0;
  const composePlaceholder = (index) => `PRETTIER_HTML_PLACEHOLDER_${index}_${counter}_IN_JS`;
  const text = node.quasis.map(
    (quasi, index, quasis) => index === quasis.length - 1 ? quasi.value.cooked : quasi.value.cooked + composePlaceholder(index)
  ).join("");
  const expressionDocs = printTemplateExpressions(path, print3);
  const placeholderRegex = new RegExp(
    composePlaceholder(String.raw`(\d+)`),
    "gu"
  );
  let topLevelCount = 0;
  const doc = await textToDoc(text, {
    parser,
    __onHtmlRoot(root) {
      topLevelCount = root.children.length;
    }
  });
  const contentDoc = mapDoc(doc, (doc2) => {
    if (typeof doc2 !== "string") {
      return doc2;
    }
    const parts = [];
    const components = doc2.split(placeholderRegex);
    for (let i = 0; i < components.length; i++) {
      let component = components[i];
      if (i % 2 === 0) {
        if (component) {
          component = uncookTemplateElementValue(component);
          if (options2.__embeddedInHtml) {
            component = string_replace_all_default(
              /* isOptionalObject */
              false,
              component,
              /<\/(?=script\b)/giu,
              String.raw`<\/`
            );
          }
          parts.push(component);
        }
        continue;
      }
      const placeholderIndex = Number(component);
      parts.push(expressionDocs[placeholderIndex]);
    }
    return parts;
  });
  const leadingWhitespace = /^\s/u.test(text) ? " " : "";
  const trailingWhitespace = /\s$/u.test(text) ? " " : "";
  const linebreak = options2.htmlWhitespaceSensitivity === "ignore" ? hardline : leadingWhitespace && trailingWhitespace ? line : null;
  if (linebreak) {
    return group(["`", indent([linebreak, group(contentDoc)]), linebreak, "`"]);
  }
  return label(
    { hug: false },
    group([
      "`",
      leadingWhitespace,
      topLevelCount > 1 ? indent(group(contentDoc)) : group(contentDoc),
      trailingWhitespace,
      "`"
    ])
  );
}
function isHtml(path) {
  return hasLanguageComment(path, "HTML") || path.match(
    (node) => node.type === "TemplateLiteral",
    (node, name) => node.type === "TaggedTemplateExpression" && node.tag.type === "Identifier" && node.tag.name === "html" && name === "quasi"
  );
}
var printEmbedHtml = printEmbedHtmlLike.bind(void 0, "html");
var printEmbedAngular = printEmbedHtmlLike.bind(void 0, "angular");
function printHtml(path) {
  if (isHtml(path)) {
    return printEmbedHtml;
  }
  if (isAngularComponentTemplate(path)) {
    return printEmbedAngular;
  }
}
var html_default = printHtml;

// src/language-js/embed/markdown.js
async function printEmbedMarkdown(textToDoc, print3, path) {
  const { node } = path;
  let text = string_replace_all_default(
    /* isOptionalObject */
    false,
    node.quasis[0].value.raw,
    /((?:\\\\)*)\\`/gu,
    (_, backslashes) => "\\".repeat(backslashes.length / 2) + "`"
  );
  const indentation = getIndentation(text);
  const hasIndent = indentation !== "";
  if (hasIndent) {
    text = string_replace_all_default(
      /* isOptionalObject */
      false,
      text,
      new RegExp(`^${indentation}`, "gmu"),
      ""
    );
  }
  const doc = escapeTemplateCharacters(
    await textToDoc(text, { parser: "markdown", __inJsTemplate: true }),
    true
  );
  return [
    "`",
    hasIndent ? indent([softline, doc]) : [literalline, dedentToRoot(doc)],
    softline,
    "`"
  ];
}
function getIndentation(str) {
  const firstMatchedIndent = str.match(/^([^\S\n]*)\S/mu);
  return firstMatchedIndent === null ? "" : firstMatchedIndent[1];
}
function printMarkdown(path) {
  if (isMarkdown(path)) {
    return printEmbedMarkdown;
  }
}
function isMarkdown({ node, parent }) {
  return parent?.type === "TaggedTemplateExpression" && node.quasis.length === 1 && parent.tag.type === "Identifier" && (parent.tag.name === "md" || parent.tag.name === "markdown");
}
var markdown_default = printMarkdown;

// src/language-js/embed/index.js
function embed(path) {
  const { node } = path;
  if (node.type !== "TemplateLiteral" || // Bail out if any of the quasis have an invalid escape sequence
  // (which would make the `cooked` value be `null`)
  hasInvalidCookedValue(node)) {
    return;
  }
  let embedder;
  for (const getEmbedder of [
    css_default,
    graphql_default,
    html_default,
    markdown_default
  ]) {
    embedder = getEmbedder(path);
    if (!embedder) {
      continue;
    }
    if (node.quasis.length === 1 && node.quasis[0].value.raw.trim() === "") {
      return "``";
    }
    return async (...args) => {
      const doc = await embedder(...args);
      return doc && label({ embed: true, ...doc.label }, doc);
    };
  }
}
function hasInvalidCookedValue({ quasis }) {
  return quasis.some(({ value: { cooked } }) => cooked === null);
}
var embed_default = embed;

// src/main/print-ignored.js
function printIgnored(path, options2) {
  const {
    originalText,
    [Symbol.for("comments")]: comments,
    locStart: locStart2,
    locEnd: locEnd2,
    [Symbol.for("printedComments")]: printedComments
  } = options2;
  const { node } = path;
  const start = locStart2(node);
  const end = locEnd2(node);
  for (const comment of comments) {
    if (locStart2(comment) >= start && locEnd2(comment) <= end) {
      printedComments.add(comment);
    }
  }
  return originalText.slice(start, end);
}
var print_ignored_default = printIgnored;

// src/language-js/needs-parens.js
function needsParens(path, options2) {
  if (path.isRoot) {
    return false;
  }
  const { node, key, parent } = path;
  if (options2.__isInHtmlInterpolation && !options2.bracketSpacing && endsWithRightBracket(node) && isFollowedByRightBracket(path)) {
    return true;
  }
  if (isStatement(node)) {
    return false;
  }
  if (node.type === "Identifier") {
    if (node.extra?.parenthesized && /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/u.test(node.name)) {
      return true;
    }
    if (key === "left" && (node.name === "async" && !parent.await || node.name === "let") && parent.type === "ForOfStatement") {
      return true;
    }
    if (node.name === "let") {
      const expression = path.findAncestor(
        (node2) => node2.type === "ForOfStatement"
      )?.left;
      if (expression && startsWithNoLookaheadToken(
        expression,
        (leftmostNode) => leftmostNode === node
      )) {
        return true;
      }
    }
    if (key === "object" && node.name === "let" && parent.type === "MemberExpression" && parent.computed && !parent.optional) {
      const statement = path.findAncestor(
        (node2) => node2.type === "ExpressionStatement" || node2.type === "ForStatement" || node2.type === "ForInStatement"
      );
      const expression = !statement ? void 0 : statement.type === "ExpressionStatement" ? statement.expression : statement.type === "ForStatement" ? statement.init : statement.left;
      if (expression && startsWithNoLookaheadToken(
        expression,
        (leftmostNode) => leftmostNode === node
      )) {
        return true;
      }
    }
    if (key === "expression") {
      switch (node.name) {
        case "await":
        case "interface":
        case "module":
        case "using":
        case "yield":
        case "let":
        case "component":
        case "hook":
        case "type": {
          const ancestorNeitherAsNorSatisfies = path.findAncestor(
            (node2) => !isBinaryCastExpression(node2)
          );
          if (ancestorNeitherAsNorSatisfies !== parent && ancestorNeitherAsNorSatisfies.type === "ExpressionStatement") {
            return true;
          }
        }
      }
    }
    return false;
  }
  if (node.type === "ObjectExpression" || node.type === "FunctionExpression" || node.type === "ClassExpression" || node.type === "DoExpression") {
    const expression = path.findAncestor(
      (node2) => node2.type === "ExpressionStatement"
    )?.expression;
    if (expression && startsWithNoLookaheadToken(
      expression,
      (leftmostNode) => leftmostNode === node
    )) {
      return true;
    }
  }
  if (node.type === "ObjectExpression") {
    const arrowFunctionBody = path.findAncestor(
      (node2) => node2.type === "ArrowFunctionExpression"
    )?.body;
    if (arrowFunctionBody && arrowFunctionBody.type !== "SequenceExpression" && // these have parens added anyway
    arrowFunctionBody.type !== "AssignmentExpression" && startsWithNoLookaheadToken(
      arrowFunctionBody,
      (leftmostNode) => leftmostNode === node
    )) {
      return true;
    }
  }
  switch (parent.type) {
    case "ParenthesizedExpression":
      return false;
    case "ClassDeclaration":
    case "ClassExpression":
      if (key === "superClass" && (node.type === "ArrowFunctionExpression" || node.type === "AssignmentExpression" || node.type === "AwaitExpression" || node.type === "BinaryExpression" || node.type === "ConditionalExpression" || node.type === "LogicalExpression" || node.type === "NewExpression" || node.type === "ObjectExpression" || node.type === "SequenceExpression" || node.type === "TaggedTemplateExpression" || node.type === "UnaryExpression" || node.type === "UpdateExpression" || node.type === "YieldExpression" || node.type === "TSNonNullExpression" || node.type === "ClassExpression" && is_non_empty_array_default(node.decorators))) {
        return true;
      }
      break;
    case "ExportDefaultDeclaration":
      return (
        // `export default function` or `export default class` can't be followed by
        // anything after. So an expression like `export default (function(){}).toString()`
        // needs to be followed by a parentheses
        shouldWrapFunctionForExportDefault(path, options2) || // `export default (foo, bar)` also needs parentheses
        node.type === "SequenceExpression"
      );
    case "Decorator":
      if (key === "expression" && !canDecoratorExpressionUnparenthesized(node)) {
        return true;
      }
      break;
    case "TypeAnnotation":
      if (path.match(
        void 0,
        void 0,
        (node2, key2) => key2 === "returnType" && node2.type === "ArrowFunctionExpression"
      ) && includesFunctionTypeInObjectType(node)) {
        return true;
      }
      break;
    // A user typing `!foo instanceof Bar` probably intended
    // `!(foo instanceof Bar)`, so format to `(!foo) instance Bar` to what is
    // really happening
    case "BinaryExpression":
      if (key === "left" && (parent.operator === "in" || parent.operator === "instanceof") && node.type === "UnaryExpression") {
        return true;
      }
      break;
    case "VariableDeclarator":
      if (key === "init" && path.match(
        void 0,
        void 0,
        (node2, key2) => key2 === "declarations" && node2.type === "VariableDeclaration",
        (node2, key2) => key2 === "left" && node2.type === "ForInStatement"
      )) {
        return true;
      }
      break;
  }
  switch (node.type) {
    case "UpdateExpression":
      if (parent.type === "UnaryExpression") {
        return node.prefix && (node.operator === "++" && parent.operator === "+" || node.operator === "--" && parent.operator === "-");
      }
    // else fallthrough
    case "UnaryExpression":
      switch (parent.type) {
        case "UnaryExpression":
          return node.operator === parent.operator && (node.operator === "+" || node.operator === "-");
        case "BindExpression":
          return true;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return key === "object";
        case "TaggedTemplateExpression":
          return true;
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "BinaryExpression":
          return key === "left" && parent.operator === "**";
        case "TSNonNullExpression":
          return true;
        default:
          return false;
      }
    case "BinaryExpression":
      if (parent.type === "UpdateExpression") {
        return true;
      }
      if (node.operator === "in" && isPathInForStatementInitializer(path)) {
        return true;
      }
      if (node.operator === "|>" && node.extra?.parenthesized) {
        const grandParent = path.grandparent;
        if (grandParent.type === "BinaryExpression" && grandParent.operator === "|>") {
          return true;
        }
      }
    // fallthrough
    case "TSTypeAssertion":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "AsExpression":
    case "AsConstExpression":
    case "SatisfiesExpression":
    case "LogicalExpression":
      switch (parent.type) {
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
          return !isBinaryCastExpression(node) && node.type !== "BinaryExpression";
        case "ConditionalExpression":
          return false;
        //isBinaryCastExpression(node) || isNullishCoalescing(node);
        case "CallExpression":
        case "NewExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "ClassExpression":
        case "ClassDeclaration":
          return key === "superClass";
        case "TSTypeAssertion":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        /*case "JSXSpreadAttribute":
        case "SpreadElement":*/
        case "BindExpression":
        case "AwaitExpression":
        case "TSNonNullExpression":
        case "UpdateExpression":
          return true;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return key === "object";
        case "AssignmentExpression":
        case "AssignmentPattern":
          return key === "left" && (node.type === "TSTypeAssertion" || isBinaryCastExpression(node));
        case "LogicalExpression":
          if (node.type === "LogicalExpression") {
            return getPrecedence(node.operator) < getPrecedence(parent.operator) || [node, parent].some(({ operator }) => operator === "??");
          }
        // else fallthrough
        case "BinaryExpression": {
          const { operator, type } = node;
          if (!operator && type !== "TSTypeAssertion") {
            const precedence2 = getPrecedence(parent.operator);
            const parentPrecedence2 = getPrecedence(path.grandparent.operator);
            return key === "right" && parent.type === "BinaryExpression" || path.grandparent.type === "BinaryExpression" && parentPrecedence2 < precedence2 && path.grandparent.right === parent;
          }
          const precedence = getPrecedence(operator);
          const parentOperator = parent.operator;
          const parentPrecedence = getPrecedence(parentOperator);
          if (parentPrecedence > precedence) {
            return true;
          }
          if (key === "right" && parentPrecedence === precedence) {
            return true;
          }
          return false;
        }
        default:
          return false;
      }
    case "SequenceExpression":
      if (parent.type === "ForStatement") {
        return false;
      }
      return true;
    case "YieldExpression":
      if (parent.type === "AwaitExpression" || parent.type === "TSTypeAssertion") {
        return true;
      }
    // else fallthrough
    case "AwaitExpression":
      switch (parent.type) {
        case "TaggedTemplateExpression":
        /*case "UnaryExpression":
        case "LogicalExpression":
        case "SpreadElement":
        case "TSAsExpression":
        case "TSSatisfiesExpression":*/
        case "TSNonNullExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
        case "BindExpression":
          return true;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return key === "object";
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "ConditionalExpression":
          return (
            /*key === "test"*/
            false
          );
        case "BinaryExpression":
          return false;
        /*}
        
                  return true;*/
        default:
          return false;
      }
    case "TSFunctionType":
      if (path.match(
        (node2) => node2.type === "TSFunctionType",
        (node2, key2) => key2 === "typeAnnotation" && node2.type === "TSTypeAnnotation",
        (node2, key2) => key2 === "returnType" && node2.type === "ArrowFunctionExpression"
      )) {
        return true;
      }
    // fallthrough
    case "TSConditionalType":
    case "TSConstructorType":
    case "ConditionalTypeAnnotation":
      if (key === "extendsType" && isConditionalType(node) && parent.type === node.type) {
        return true;
      }
      if (key === "checkType" && isConditionalType(parent)) {
        return true;
      }
      if (key === "extendsType" && parent.type === "TSConditionalType") {
        let { typeAnnotation } = node.returnType || node.typeAnnotation;
        if (typeAnnotation.type === "TSTypePredicate" && typeAnnotation.typeAnnotation) {
          typeAnnotation = typeAnnotation.typeAnnotation.typeAnnotation;
        }
        if (typeAnnotation.type === "TSInferType" && typeAnnotation.typeParameter.constraint) {
          return true;
        }
      }
    // fallthrough
    case "TSUnionType":
      if ((isUnionType(parent) || isIntersectionType(parent)) && parent.types.length > 1 && (!node.types || node.types.length > 1)) {
        return true;
      }
    // fallthrough
    case "TSIntersectionType":
    // is this correct? unsure
    case "TSInferType":
      if (node.type === "TSInferType") {
        if (parent.type === "TSRestType") {
          return false;
        }
        if (key === "types" && (parent.type === "TSUnionType" || parent.type === "TSIntersectionType") && node.typeParameter.type === "TSTypeParameter" && node.typeParameter.constraint) {
          return true;
        }
      }
    // fallthrough
    case "TSTypeOperator":
      return parent.type === "TSArrayType" || parent.type === "TSOptionalType" || parent.type === "TSRestType" || key === "objectType" && parent.type === "TSIndexedAccessType" || parent.type === "TSTypeOperator" || parent.type === "TSTypeAnnotation" && path.grandparent.type.startsWith("TSJSDoc");
    case "TSTypeQuery":
      return (
        //(key === "objectType" && parent.type === "TSIndexedAccessType") ||
        key === "elementType" && parent.type === "TSArrayType"
      );
    // Same as `TSTypeOperator`, but for Flow syntax
    case "TypeOperator":
      return parent.type === "ArrayTypeAnnotation" || parent.type === "NullableTypeAnnotation" || key === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType") || parent.type === "TypeOperator";
    // Same as `TSTypeQuery`, but for Flow syntax
    case "TypeofTypeAnnotation":
      return key === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType") || key === "elementType" && parent.type === "ArrayTypeAnnotation";
    case "ArrayTypeAnnotation":
      return parent.type === "NullableTypeAnnotation";
    case "IntersectionTypeAnnotation":
    case "UnionTypeAnnotation":
      return parent.type === "TypeOperator" || parent.type === "ArrayTypeAnnotation" || parent.type === "NullableTypeAnnotation" || parent.type === "IntersectionTypeAnnotation" || parent.type === "UnionTypeAnnotation" || key === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType");
    case "InferTypeAnnotation":
    case "NullableTypeAnnotation":
      return parent.type === "ArrayTypeAnnotation" || key === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType");
    case "ComponentTypeAnnotation":
    case "FunctionTypeAnnotation": {
      if (node.type === "ComponentTypeAnnotation" && (node.rendersType === null || node.rendersType === void 0)) {
        return false;
      }
      if (path.match(
        void 0,
        (node2, key2) => key2 === "typeAnnotation" && node2.type === "TypeAnnotation",
        (node2, key2) => key2 === "returnType" && node2.type === "ArrowFunctionExpression"
      )) {
        return true;
      }
      if (path.match(
        void 0,
        (node2, key2) => key2 === "typeAnnotation" && node2.type === "TypePredicate",
        (node2, key2) => key2 === "typeAnnotation" && node2.type === "TypeAnnotation",
        (node2, key2) => key2 === "returnType" && node2.type === "ArrowFunctionExpression"
      )) {
        return true;
      }
      const ancestor = parent.type === "NullableTypeAnnotation" ? path.grandparent : parent;
      return ancestor.type === "UnionTypeAnnotation" || ancestor.type === "IntersectionTypeAnnotation" || ancestor.type === "ArrayTypeAnnotation" || key === "objectType" && (ancestor.type === "IndexedAccessType" || ancestor.type === "OptionalIndexedAccessType") || key === "checkType" && parent.type === "ConditionalTypeAnnotation" || key === "extendsType" && parent.type === "ConditionalTypeAnnotation" && node.returnType?.type === "InferTypeAnnotation" && node.returnType?.typeParameter.bound || // We should check ancestor's parent to know whether the parentheses
      // are really needed, but since ??T doesn't make sense this check
      // will almost never be true.
      ancestor.type === "NullableTypeAnnotation" || // See #5283
      parent.type === "FunctionTypeParam" && parent.name === null && getFunctionParameters(node).some(
        (param) => param.typeAnnotation?.type === "NullableTypeAnnotation"
      );
    }
    // fallthrough
    case "OptionalIndexedAccessType":
      return key === "objectType" && parent.type === "IndexedAccessType";
    case "StringLiteral":
    case "NumericLiteral":
    case "Literal":
      if (typeof node.value === "string" && parent.type === "ExpressionStatement" && typeof parent.directive !== "string") {
        const grandParent = path.grandparent;
        return grandParent.type === "Program" || grandParent.type === "BlockStatement";
      }
      return key === "object" && isMemberExpression(parent) && isNumericLiteral(node);
    case "AssignmentExpression":
      return key === "callee" && parent.type === "CallExpression" || key === "test" && parent.type === "ConditionalExpression" || parent.type === "ExpressionStatement" && node.left.type === "ObjectPattern" || key === "object" && parent.type === "MemberExpression" || [
        "AwaitExpression",
        "BinaryExpression",
        "LogicalExpression",
        "UnaryExpression",
        "TSAsExpression",
        "TSSatisfiesExpression"
      ].includes(parent.type);
      if ((key === "init" || key === "update") && parent.type === "ForStatement") {
        return false;
      }
      if (key === "expression" && node.left.type !== "ObjectPattern" && parent.type === "ExpressionStatement") {
        return false;
      }
      if (key === "key" && parent.type === "TSPropertySignature") {
        return false;
      }
      if (parent.type === "AssignmentExpression") {
        return false;
      }
      if (key === "expressions" && parent.type === "SequenceExpression" && path.match(
        void 0,
        void 0,
        (node2, name) => (name === "init" || name === "update") && node2.type === "ForStatement"
      )) {
        return false;
      }
      if (key === "value" && parent.type === "Property" && path.match(
        void 0,
        void 0,
        (node2, name) => name === "properties" && node2.type === "ObjectPattern"
      )) {
        return false;
      }
      if (parent.type === "NGChainedExpression") {
        return false;
      }
      if (key === "node" && parent.type === "JsExpressionRoot") {
        return false;
      }
      return true;
    case "ConditionalExpression":
      switch (parent.type) {
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        //case "SpreadElement":
        case "BinaryExpression":
        case "LogicalExpression":
        case "NGPipeExpression":
        case "ExportDefaultDeclaration":
        case "AwaitExpression":
        //case "JSXSpreadAttribute":
        case "TSTypeAssertion":
        case "TypeCastExpression":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
        case "TSNonNullExpression":
          return true;
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "ConditionalExpression":
          if (!options2.experimentalTernaries) {
            return key === "test";
          }
          return false;
        case "MemberExpression":
        case "OptionalMemberExpression":
          return key === "object";
        default:
          return false;
      }
    case "FunctionExpression":
      switch (parent.type) {
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "TaggedTemplateExpression":
          return true;
        // This is basically a kind of IIFE.
        default:
          return false;
      }
    case "ArrowFunctionExpression":
      switch (parent.type) {
        case "BinaryExpression":
          return parent.operator !== "|>" || node.extra?.parenthesized;
        case "NewExpression":
        case "CallExpression":
        case "OptionalCallExpression":
          return key === "callee";
        case "MemberExpression":
        case "OptionalMemberExpression":
          return key === "object";
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
        case "TSNonNullExpression":
        case "BindExpression":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "LogicalExpression":
        case "AwaitExpression":
        case "TSTypeAssertion":
          return true;
        case "ConditionalExpression":
          return key === "test";
        default:
          return false;
      }
    case "ClassExpression":
      switch (parent.type) {
        case "NewExpression":
          return key === "callee";
        default:
          return false;
      }
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "CallExpression":
    case "MemberExpression":
      if (shouldAddParenthesesToChainElement(path)) {
        return true;
      }
    // fallthrough
    case "TaggedTemplateExpression":
    case "TSNonNullExpression":
      if (key === "callee" && (parent.type === "BindExpression" || parent.type === "NewExpression")) {
        let object = node;
        while (object) {
          switch (object.type) {
            case "CallExpression":
            case "OptionalCallExpression":
              return true;
            case "MemberExpression":
            case "OptionalMemberExpression":
            case "BindExpression":
              object = object.object;
              break;
            // tagged templates are basically member expressions from a grammar perspective
            // see https://tc39.github.io/ecma262/#prod-MemberExpression
            case "TaggedTemplateExpression":
              object = object.tag;
              break;
            case "TSNonNullExpression":
              object = object.expression;
              break;
            default:
              return false;
          }
        }
      }
      return false;
    case "BindExpression":
      return key === "callee" && (parent.type === "BindExpression" || parent.type === "NewExpression") || key === "object" && isMemberExpression(parent);
    case "NGPipeExpression":
      if (parent.type === "NGRoot" || parent.type === "NGMicrosyntaxExpression" || parent.type === "ObjectProperty" && // Preserve parens for compatibility with AngularJS expressions
      !node.extra?.parenthesized || isArrayExpression(parent) || key === "arguments" && isCallExpression(parent) || key === "right" && parent.type === "NGPipeExpression" || key === "property" && parent.type === "MemberExpression" || parent.type === "AssignmentExpression") {
        return false;
      }
      return true;
    case "JSXFragment":
    case "JSXElement":
      return key === "callee" || key === "left" && parent.type === "BinaryExpression" && parent.operator === "<" || !isArrayExpression(parent) && parent.type !== "ArrowFunctionExpression" && parent.type !== "AssignmentExpression" && parent.type !== "AssignmentPattern" && parent.type !== "BinaryExpression" && parent.type !== "NewExpression" && parent.type !== "ConditionalExpression" && parent.type !== "ExpressionStatement" && parent.type !== "JsExpressionRoot" && parent.type !== "JSXAttribute" && parent.type !== "JSXElement" && parent.type !== "JSXExpressionContainer" && parent.type !== "JSXFragment" && parent.type !== "LogicalExpression" && !isCallExpression(parent) && !isObjectProperty(parent) && parent.type !== "ReturnStatement" && parent.type !== "ThrowStatement" && parent.type !== "TypeCastExpression" && parent.type !== "VariableDeclarator" && parent.type !== "YieldExpression";
    case "TSInstantiationExpression":
      return key === "object" && isMemberExpression(parent);
  }
  return false;
}
var isStatement = create_type_check_function_default([
  "BlockStatement",
  "BreakStatement",
  "ComponentDeclaration",
  "ClassBody",
  "ClassDeclaration",
  "ClassMethod",
  "ClassProperty",
  "PropertyDefinition",
  "ClassPrivateProperty",
  "ContinueStatement",
  "DebuggerStatement",
  "DeclareComponent",
  "DeclareClass",
  "DeclareExportAllDeclaration",
  "DeclareExportDeclaration",
  "DeclareFunction",
  "DeclareHook",
  "DeclareInterface",
  "DeclareModule",
  "DeclareModuleExports",
  "DeclareNamespace",
  "DeclareVariable",
  "DeclareEnum",
  "DoWhileStatement",
  "EnumDeclaration",
  "ExportAllDeclaration",
  "ExportDefaultDeclaration",
  "ExportNamedDeclaration",
  "ExpressionStatement",
  "ForInStatement",
  "ForOfStatement",
  "ForStatement",
  "FunctionDeclaration",
  "HookDeclaration",
  "IfStatement",
  "ImportDeclaration",
  "InterfaceDeclaration",
  "LabeledStatement",
  "MethodDefinition",
  "ReturnStatement",
  "SwitchStatement",
  "ThrowStatement",
  "TryStatement",
  "TSDeclareFunction",
  "TSEnumDeclaration",
  "TSImportEqualsDeclaration",
  "TSInterfaceDeclaration",
  "TSModuleDeclaration",
  "TSNamespaceExportDeclaration",
  "TypeAlias",
  "VariableDeclaration",
  "WhileStatement",
  "WithStatement"
]);
function isPathInForStatementInitializer(path) {
  let i = 0;
  let { node } = path;
  while (node) {
    const parent = path.getParentNode(i++);
    if (parent?.type === "ForStatement" && parent.init === node) {
      return true;
    }
    node = parent;
  }
  return false;
}
function includesFunctionTypeInObjectType(node) {
  return hasNode(
    node,
    (node2) => node2.type === "ObjectTypeAnnotation" && hasNode(node2, (node3) => node3.type === "FunctionTypeAnnotation")
  );
}
function endsWithRightBracket(node) {
  return isObjectExpression(node);
}
function isFollowedByRightBracket(path) {
  const { parent, key } = path;
  switch (parent.type) {
    case "NGPipeExpression":
      if (key === "arguments" && path.isLast) {
        return path.callParent(isFollowedByRightBracket);
      }
      break;
    case "ObjectProperty":
      if (key === "value") {
        return path.callParent(() => path.key === "properties" && path.isLast);
      }
      break;
    case "BinaryExpression":
    case "LogicalExpression":
      if (key === "right") {
        return path.callParent(isFollowedByRightBracket);
      }
      break;
    case "ConditionalExpression":
      if (key === "alternate") {
        return path.callParent(isFollowedByRightBracket);
      }
      break;
    case "UnaryExpression":
      if (parent.prefix) {
        return path.callParent(isFollowedByRightBracket);
      }
      break;
  }
  return false;
}
function shouldWrapFunctionForExportDefault(path, options2) {
  const { node, parent } = path;
  if (node.type === "FunctionExpression" || node.type === "ClassExpression") {
    return parent.type === "ExportDefaultDeclaration" || // in some cases the function is already wrapped
    // (e.g. `export default (function() {})();`)
    // in this case we don't need to add extra parens
    !needsParens(path, options2);
  }
  if (!hasNakedLeftSide(node) || parent.type !== "ExportDefaultDeclaration" && needsParens(path, options2)) {
    return false;
  }
  return path.call(
    () => shouldWrapFunctionForExportDefault(path, options2),
    ...getLeftSidePathName(node)
  );
}
function shouldAddParenthesesToChainElement(path) {
  if (
    // ESTree
    path.match(
      void 0,
      (node, name) => name === "expression" && node.type === "ChainExpression",
      (node, name) => name === "tag" && node.type === "TaggedTemplateExpression"
    ) || // Babel
    path.match(
      (node) => node.type === "OptionalCallExpression" || node.type === "OptionalMemberExpression",
      (node, name) => name === "tag" && node.type === "TaggedTemplateExpression"
    ) || // Babel-ts
    // (a?.b)!``;
    // (a?.b!)``;
    path.match(
      (node) => node.type === "OptionalCallExpression" || node.type === "OptionalMemberExpression",
      (node, name) => name === "expression" && node.type === "TSNonNullExpression",
      (node, name) => name === "tag" && node.type === "TaggedTemplateExpression"
    ) || // case (a?.b)!``; in Typescript
    path.match(
      void 0,
      (node, name) => name === "expression" && node.type === "ChainExpression",
      (node, name) => name === "expression" && node.type === "TSNonNullExpression",
      (node, name) => name === "tag" && node.type === "TaggedTemplateExpression"
    ) || // case (a?.b!)``; in Typescript
    path.match(
      void 0,
      (node, name) => name === "expression" && node.type === "TSNonNullExpression",
      (node, name) => name === "expression" && node.type === "ChainExpression",
      (node, name) => name === "tag" && node.type === "TaggedTemplateExpression"
    )
  ) {
    return true;
  }
  if (path.match(
    (node) => node.type === "OptionalMemberExpression" || node.type === "OptionalCallExpression",
    (node, name) => name === "object" && node.type === "MemberExpression" || name === "callee" && (node.type === "CallExpression" || node.type === "NewExpression")
  ) || path.match(
    (node) => node.type === "OptionalMemberExpression" || node.type === "OptionalCallExpression",
    (node, name) => name === "expression" && node.type === "TSNonNullExpression",
    (node, name) => name === "object" && node.type === "MemberExpression" || name === "callee" && node.type === "CallExpression"
  )) {
    return true;
  }
  if (path.match(
    (node) => node.type === "CallExpression" || node.type === "MemberExpression",
    (node, name) => name === "expression" && node.type === "ChainExpression"
  ) && (path.match(
    void 0,
    void 0,
    (node, name) => name === "callee" && (node.type === "CallExpression" && !node.optional || node.type === "NewExpression") || name === "object" && node.type === "MemberExpression" && !node.optional
  ) || path.match(
    void 0,
    void 0,
    (node, name) => name === "expression" && node.type === "TSNonNullExpression",
    (node, name) => name === "object" && node.type === "MemberExpression" || name === "callee" && node.type === "CallExpression"
  ))) {
    return true;
  }
  if (path.match(
    (node) => node.type === "CallExpression" || node.type === "MemberExpression",
    (node, name) => name === "expression" && node.type === "TSNonNullExpression",
    (node, name) => name === "expression" && node.type === "ChainExpression",
    (node, name) => name === "object" && node.type === "MemberExpression" || name === "callee" && node.type === "CallExpression"
  )) {
    return true;
  }
  return false;
}
function isDecoratorMemberExpression(node) {
  if (node.type === "Identifier") {
    return true;
  }
  if (isMemberExpression(node)) {
    return !node.computed && !node.optional && node.property.type === "Identifier" && isDecoratorMemberExpression(node.object);
  }
  return false;
}
function canDecoratorExpressionUnparenthesized(node) {
  if (node.type === "ChainExpression") {
    node = node.expression;
  }
  return isDecoratorMemberExpression(node) || isCallExpression(node) && !node.optional && isDecoratorMemberExpression(node.callee);
}
var needs_parens_default = needsParens;

// src/utils/is-previous-line-empty.js
function isPreviousLineEmpty(text, startIndex) {
  let idx = startIndex - 1;
  idx = skipSpaces(text, idx, { backwards: true });
  idx = skip_newline_default(text, idx, { backwards: true });
  idx = skipSpaces(text, idx, { backwards: true });
  const idx2 = skip_newline_default(text, idx, { backwards: true });
  return idx !== idx2;
}
var is_previous_line_empty_default = isPreviousLineEmpty;

// src/main/comments/print.js
var returnTrue = () => true;
function printComment2(path, options2) {
  const comment = path.node;
  comment.printed = true;
  return options2.printer.printComment(path, options2);
}
function printLeadingComment(path, options2) {
  const comment = path.node;
  const parts = [printComment2(path, options2)];
  const { printer, originalText, locStart: locStart2, locEnd: locEnd2 } = options2;
  const isBlock = printer.isBlockComment?.(comment);
  if (isBlock) {
    const lineBreak = has_newline_default(originalText, locEnd2(comment)) ? has_newline_default(originalText, locStart2(comment), {
      backwards: true
    }) ? hardline : line : " ";
    parts.push(lineBreak);
  } else {
    parts.push(hardline);
  }
  const index = skip_newline_default(
    originalText,
    skipSpaces(originalText, locEnd2(comment))
  );
  if (index !== false && has_newline_default(originalText, index)) {
    parts.push(hardline);
  }
  return parts;
}
function printTrailingComment(path, options2, previousComment) {
  const comment = path.node;
  const printed = printComment2(path, options2);
  const { printer, originalText, locStart: locStart2 } = options2;
  const isBlock = printer.isBlockComment?.(comment);
  if (previousComment?.hasLineSuffix && !previousComment?.isBlock || has_newline_default(originalText, locStart2(comment), { backwards: true })) {
    const isLineBeforeEmpty = is_previous_line_empty_default(
      originalText,
      locStart2(comment)
    );
    return {
      doc: lineSuffix([hardline, isLineBeforeEmpty ? hardline : "", printed]),
      isBlock,
      hasLineSuffix: true
    };
  }
  if (!isBlock || previousComment?.hasLineSuffix) {
    return {
      doc: [lineSuffix([" ", printed]), breakParent],
      isBlock,
      hasLineSuffix: true
    };
  }
  return { doc: [" ", printed], isBlock, hasLineSuffix: false };
}
function printDanglingComments(path, options2, danglingCommentsPrintOptions = {}) {
  const { node } = path;
  if (!is_non_empty_array_default(node?.comments)) {
    return "";
  }
  const {
    indent: shouldIndent = false,
    marker,
    filter = returnTrue
  } = danglingCommentsPrintOptions;
  const parts = [];
  path.each(({ node: comment }) => {
    if (comment.leading || comment.trailing || comment.marker !== marker || !filter(comment)) {
      return;
    }
    parts.push(printComment2(path, options2));
  }, "comments");
  if (parts.length === 0) {
    return "";
  }
  const doc = join(hardline, parts);
  return shouldIndent ? indent([hardline, doc]) : doc;
}
function printCommentsSeparately(path, options2) {
  const value = path.node;
  if (!value) {
    return {};
  }
  const ignored = options2[Symbol.for("printedComments")];
  const comments = (value.comments || []).filter(
    (comment) => !ignored.has(comment)
  );
  if (comments.length === 0) {
    return { leading: "", trailing: "" };
  }
  const leadingParts = [];
  const trailingParts = [];
  let printedTrailingComment;
  path.each(() => {
    const comment = path.node;
    if (ignored?.has(comment)) {
      return;
    }
    const { leading, trailing } = comment;
    if (leading) {
      leadingParts.push(printLeadingComment(path, options2));
    } else if (trailing) {
      printedTrailingComment = printTrailingComment(
        path,
        options2,
        printedTrailingComment
      );
      trailingParts.push(printedTrailingComment.doc);
    }
  }, "comments");
  return { leading: leadingParts, trailing: trailingParts };
}
function printComments(path, doc, options2) {
  const { leading, trailing } = printCommentsSeparately(path, options2);
  if (!leading && !trailing) {
    return doc;
  }
  return inheritLabel(doc, (doc2) => [leading, doc2, trailing]);
}

// src/utils/unexpected-node-error.js
var UnexpectedNodeError = class extends Error {
  name = "UnexpectedNodeError";
  constructor(node, language, typeProperty = "type") {
    super(
      `Unexpected ${language} node ${typeProperty}: ${JSON.stringify(
        node[typeProperty]
      )}.`
    );
    this.node = node;
  }
};
var unexpected_node_error_default = UnexpectedNodeError;

// node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// src/utils/whitespace-utils.js
var WhitespaceUtils = class {
  #whitespaceCharacters;
  constructor(whitespaceCharacters) {
    this.#whitespaceCharacters = new Set(whitespaceCharacters);
    if (false) {
      throw new TypeError(
        `Invalid characters: ${JSON.stringify(whitespaceCharacters)}`
      );
    }
  }
  getLeadingWhitespaceCount(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    let count = 0;
    for (let index = 0; index < text.length && whitespaceCharacters.has(text.charAt(index)); index++) {
      count++;
    }
    return count;
  }
  getTrailingWhitespaceCount(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    let count = 0;
    for (let index = text.length - 1; index >= 0 && whitespaceCharacters.has(text.charAt(index)); index--) {
      count++;
    }
    return count;
  }
  getLeadingWhitespace(text) {
    const count = this.getLeadingWhitespaceCount(text);
    return text.slice(0, count);
  }
  getTrailingWhitespace(text) {
    const count = this.getTrailingWhitespaceCount(text);
    return text.slice(text.length - count);
  }
  hasLeadingWhitespace(text) {
    return this.#whitespaceCharacters.has(text.charAt(0));
  }
  hasTrailingWhitespace(text) {
    return this.#whitespaceCharacters.has(at_default(
      /* isOptionalObject */
      false,
      text,
      -1
    ));
  }
  trimStart(text) {
    const count = this.getLeadingWhitespaceCount(text);
    return text.slice(count);
  }
  trimEnd(text) {
    const count = this.getTrailingWhitespaceCount(text);
    return text.slice(0, text.length - count);
  }
  trim(text) {
    return this.trimEnd(this.trimStart(text));
  }
  split(text, captureWhitespace = false) {
    const pattern = `[${escapeStringRegexp(
      [...this.#whitespaceCharacters].join("")
    )}]+`;
    const regexp = new RegExp(
      captureWhitespace ? `(${pattern})` : pattern,
      "u"
    );
    return text.split(regexp);
  }
  hasWhitespaceCharacter(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.some.call(
      text,
      (character) => whitespaceCharacters.has(character)
    );
  }
  hasNonWhitespaceCharacter(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.some.call(
      text,
      (character) => !whitespaceCharacters.has(character)
    );
  }
  isWhitespaceOnly(text) {
    const whitespaceCharacters = this.#whitespaceCharacters;
    return Array.prototype.every.call(
      text,
      (character) => whitespaceCharacters.has(character)
    );
  }
};
var whitespace_utils_default = WhitespaceUtils;

// src/language-js/print/jsx.js
var jsxWhitespaceUtils = new whitespace_utils_default(" \n\r	");
var isEmptyStringOrAnyLine = (doc) => doc === "" || doc === line || doc === hardline || doc === softline;
function printJsxElementInternal(path, options2, print3) {
  const { node } = path;
  if (node.type === "JSXElement" && isEmptyJsxElement(node)) {
    return [print3("openingElement"), print3("closingElement")];
  }
  const openingLines = node.type === "JSXElement" ? print3("openingElement") : print3("openingFragment");
  const closingLines = node.type === "JSXElement" ? print3("closingElement") : print3("closingFragment");
  if (node.children.length === 1 && node.children[0].type === "JSXExpressionContainer" && (node.children[0].expression.type === "TemplateLiteral" || node.children[0].expression.type === "TaggedTemplateExpression")) {
    return [openingLines, ...path.map(print3, "children"), closingLines];
  }
  node.children = node.children.map((child) => {
    if (isJsxWhitespaceExpression(child)) {
      return {
        type: "JSXText",
        value: " ",
        raw: " "
      };
    }
    return child;
  });
  const containsTag = node.children.some(isJsxElement);
  const containsMultipleExpressions = node.children.filter((child) => child.type === "JSXExpressionContainer").length > 1;
  const containsMultipleAttributes = node.type === "JSXElement" && node.openingElement.attributes.length > 1;
  let forcedBreak = willBreak(openingLines) || containsTag || containsMultipleAttributes || containsMultipleExpressions;
  const isMdxBlock = path.parent.rootMarker === "mdx";
  const rawJsxWhitespace = options2.singleQuote ? "{' '}" : '{" "}';
  const jsxWhitespace = isMdxBlock ? line : ifBreak([rawJsxWhitespace, softline], " ");
  const isFacebookTranslationTag = node.openingElement?.name?.name === "fbt";
  const children = printJsxChildren(
    path,
    options2,
    print3,
    jsxWhitespace,
    isFacebookTranslationTag
  );
  const containsText = node.children.some(
    (child) => isMeaningfulJsxText(child)
  );
  for (let i = children.length - 2; i >= 0; i--) {
    const isPairOfEmptyStrings = children[i] === "" && children[i + 1] === "";
    const isPairOfHardlines = children[i] === hardline && children[i + 1] === "" && children[i + 2] === hardline;
    const isLineFollowedByJsxWhitespace = (children[i] === softline || children[i] === hardline) && children[i + 1] === "" && children[i + 2] === jsxWhitespace;
    const isJsxWhitespaceFollowedByLine = children[i] === jsxWhitespace && children[i + 1] === "" && (children[i + 2] === softline || children[i + 2] === hardline);
    const isDoubleJsxWhitespace = children[i] === jsxWhitespace && children[i + 1] === "" && children[i + 2] === jsxWhitespace;
    const isPairOfHardOrSoftLines = children[i] === softline && children[i + 1] === "" && children[i + 2] === hardline || children[i] === hardline && children[i + 1] === "" && children[i + 2] === softline;
    if (isPairOfHardlines && containsText || isPairOfEmptyStrings || isLineFollowedByJsxWhitespace || isDoubleJsxWhitespace || isPairOfHardOrSoftLines) {
      children.splice(i, 2);
    } else if (isJsxWhitespaceFollowedByLine) {
      children.splice(i + 1, 2);
    }
  }
  while (children.length > 0 && isEmptyStringOrAnyLine(at_default(
    /* isOptionalObject */
    false,
    children,
    -1
  ))) {
    children.pop();
  }
  while (children.length > 1 && isEmptyStringOrAnyLine(children[0]) && isEmptyStringOrAnyLine(children[1])) {
    children.shift();
    children.shift();
  }
  const multilineChildren = [""];
  for (const [i, child] of children.entries()) {
    if (i % 2 === 0) {
      multilineChildren.push([multilineChildren.pop(), child]);
    } else {
      multilineChildren.push(child, "");
    }
    if (willBreak(child)) {
      forcedBreak = true;
    }
  }
  let content = containsText ? fill(multilineChildren) : group(multilineChildren, { shouldBreak: true });
  if (options2.cursorNode?.type === "JSXText" && node.children.includes(options2.cursorNode)) {
    content = [cursor, content, cursor];
  } else if (options2.nodeBeforeCursor?.type === "JSXText" && node.children.includes(options2.nodeBeforeCursor)) {
    content = [cursor, content];
  } else if (options2.nodeAfterCursor?.type === "JSXText" && node.children.includes(options2.nodeAfterCursor)) {
    content = [content, cursor];
  }
  if (isMdxBlock) {
    return content;
  }
  const multiLineElem = group([
    openingLines,
    indent([hardline, content]),
    hardline,
    closingLines
  ]);
  if (forcedBreak) {
    return multiLineElem;
  }
  return conditionalGroup([
    group([openingLines, ...children, closingLines]),
    multiLineElem
  ]);
}
function printJsxChildren(path, options2, print3, jsxWhitespace, isFacebookTranslationTag) {
  let prevPart = "";
  const parts = [prevPart];
  function push(doc) {
    prevPart = doc;
    parts.push([parts.pop(), doc]);
  }
  function pushLine(doc) {
    if (doc === "") {
      return;
    }
    prevPart = doc;
    parts.push(doc, "");
  }
  path.each(({ node, next }) => {
    if (node.type === "JSXText") {
      const text = get_raw_default(node);
      if (isMeaningfulJsxText(node)) {
        const words = jsxWhitespaceUtils.split(
          text,
          /* captureWhitespace */
          true
        );
        if (words[0] === "") {
          words.shift();
          if (/\n/u.test(words[0])) {
            pushLine(
              separatorWithWhitespace(
                isFacebookTranslationTag,
                words[1],
                node,
                next
              )
            );
          } else {
            pushLine(jsxWhitespace);
          }
          words.shift();
        }
        let endWhitespace;
        if (at_default(
          /* isOptionalObject */
          false,
          words,
          -1
        ) === "") {
          words.pop();
          endWhitespace = words.pop();
        }
        if (words.length === 0) {
          return;
        }
        for (const [i, word] of words.entries()) {
          if (i % 2 === 1) {
            pushLine(line);
          } else {
            push(word);
          }
        }
        if (endWhitespace !== void 0) {
          if (/\n/u.test(endWhitespace)) {
            pushLine(
              separatorWithWhitespace(
                isFacebookTranslationTag,
                prevPart,
                node,
                next
              )
            );
          } else {
            pushLine(jsxWhitespace);
          }
        } else {
          pushLine(
            separatorNoWhitespace(
              isFacebookTranslationTag,
              prevPart,
              node,
              next
            )
          );
        }
      } else if (/\n/u.test(text)) {
        if (text.match(/\n/gu).length > 1) {
          pushLine(hardline);
        }
      } else {
        pushLine(jsxWhitespace);
      }
    } else {
      const printedChild = print3();
      push(printedChild);
      const directlyFollowedByMeaningfulText = next && isMeaningfulJsxText(next);
      if (directlyFollowedByMeaningfulText) {
        const trimmed = jsxWhitespaceUtils.trim(get_raw_default(next));
        const [firstWord] = jsxWhitespaceUtils.split(trimmed);
        pushLine(
          separatorNoWhitespace(
            isFacebookTranslationTag,
            firstWord,
            node,
            next
          )
        );
      } else {
        pushLine(hardline);
      }
    }
  }, "children");
  return parts;
}
function separatorNoWhitespace(isFacebookTranslationTag, child, childNode, nextNode) {
  if (isFacebookTranslationTag) {
    return "";
  }
  if (childNode.type === "JSXElement" && !childNode.closingElement || nextNode?.type === "JSXElement" && !nextNode.closingElement) {
    return child.length === 1 ? softline : hardline;
  }
  return softline;
}
function separatorWithWhitespace(isFacebookTranslationTag, child, childNode, nextNode) {
  if (isFacebookTranslationTag) {
    return hardline;
  }
  if (child.length === 1) {
    return childNode.type === "JSXElement" && !childNode.closingElement || nextNode?.type === "JSXElement" && !nextNode.closingElement ? hardline : softline;
  }
  return hardline;
}
var NO_WRAP_PARENTS = /* @__PURE__ */ new Set([
  "ArrayExpression",
  "JSXAttribute",
  "JSXElement",
  "JSXExpressionContainer",
  "JSXFragment",
  "ExpressionStatement",
  "CallExpression",
  "OptionalCallExpression",
  "ConditionalExpression",
  "JsExpressionRoot"
]);
function maybeWrapJsxElementInParens(path, elem, options2) {
  const { parent } = path;
  if (NO_WRAP_PARENTS.has(parent.type)) {
    return elem;
  }
  const shouldBreak = shouldBreakJsxElement(path);
  const needsParens2 = parent.type !== "ReturnStatement";
  return group(
    [
      needsParens2 ? "" : ifBreak("("),
      indent([softline, elem]),
      softline,
      needsParens2 ? "" : ifBreak(")")
    ],
    { shouldBreak }
  );
}
function shouldBreakJsxElement(path) {
  return path.match(
    void 0,
    (node) => node.type === "ArrowFunctionExpression",
    isCallExpression
  ) && // Babel
  (path.match(
    void 0,
    void 0,
    void 0,
    (node) => node.type === "JSXExpressionContainer"
  ) || // Estree
  path.match(
    void 0,
    void 0,
    void 0,
    (node) => node.type === "ChainExpression",
    (node) => node.type === "JSXExpressionContainer"
  ));
}
function printJsxAttribute(path, options2, print3) {
  const { node } = path;
  const parts = [];
  parts.push(print3("name"));
  if (node.value) {
    let res;
    if (isStringLiteral(node.value)) {
      const raw = get_raw_default(node.value);
      let final = string_replace_all_default(
        /* isOptionalObject */
        false,
        string_replace_all_default(
          /* isOptionalObject */
          false,
          raw.slice(1, -1),
          "&apos;",
          "'"
        ),
        "&quot;",
        '"'
      );
      const quote = get_preferred_quote_default(final, options2.jsxSingleQuote);
      final = quote === '"' ? string_replace_all_default(
        /* isOptionalObject */
        false,
        final,
        '"',
        "&quot;"
      ) : string_replace_all_default(
        /* isOptionalObject */
        false,
        final,
        "'",
        "&apos;"
      );
      res = path.call(
        () => printComments(path, replaceEndOfLine(quote + final + quote), options2),
        "value"
      );
    } else {
      res = print3("value");
    }
    parts.push("=", res);
  }
  return parts;
}
function printJsxExpressionContainer(path, options2, print3) {
  const { node } = path;
  const shouldInline = (node2, parent) => node2.type === "JSXEmptyExpression" || !hasComment(node2) && (isArrayExpression(node2) || isObjectExpression(node2) || node2.type === "ArrowFunctionExpression" || node2.type === "AwaitExpression" && (shouldInline(node2.argument, node2) || node2.argument.type === "JSXElement") || //isCallExpression(node) ||
  node2.type === "ChainExpression" && isCallExpression(node2.expression) || node2.type === "FunctionExpression" || node2.type === "TemplateLiteral" || node2.type === "TaggedTemplateExpression" || node2.type === "DoExpression");
  if (shouldInline(node.expression, path.parent)) {
    return group(["{", print3("expression"), lineSuffixBoundary, "}"]);
  }
  return group([
    "{",
    indent([softline, print3("expression")]),
    isJsxElement(path.parent) && isBinaryish(node.expression) && isJsxElement(node.expression.right) ? [] : softline,
    lineSuffixBoundary,
    "}"
  ]);
}
function printJsxOpeningElement(path, options2, print3) {
  const { node } = path;
  const nameHasComments = hasComment(node.name) || hasComment(node.typeParameters) || hasComment(node.typeArguments);
  if (node.selfClosing && node.attributes.length === 0 && !nameHasComments) {
    return [
      "<",
      print3("name"),
      node.typeArguments ? print3("typeArguments") : print3("typeParameters"),
      " />"
    ];
  }
  if (node.attributes?.length === 1 && isStringLiteral(node.attributes[0].value) && !node.attributes[0].value.value.includes("\n") && // We should break for the following cases:
  // <div
  //   // comment
  //   attr="value"
  // >
  // <div
  //   attr="value"
  //   // comment
  // >
  !nameHasComments && !hasComment(node.attributes[0])) {
    return group([
      "<",
      print3("name"),
      node.typeArguments ? print3("typeArguments") : print3("typeParameters"),
      " ",
      ...path.map(print3, "attributes"),
      node.selfClosing ? " />" : ">"
    ]);
  }
  const shouldBreak = node.attributes?.some(
    (attr) => isStringLiteral(attr.value) && attr.value.value.includes("\n")
  );
  const attributeLine = options2.singleAttributePerLine && node.attributes.length > 1 ? hardline : line;
  return group(
    [
      "<",
      print3("name"),
      node.typeArguments ? print3("typeArguments") : print3("typeParameters"),
      indent(path.map(() => [attributeLine, print3()], "attributes")),
      ...printEndOfOpeningTag(node, options2, nameHasComments)
    ],
    { shouldBreak }
  );
}
function printEndOfOpeningTag(node, options2, nameHasComments) {
  if (node.selfClosing) {
    return [line, "/>"];
  }
  const bracketSameLine = shouldPrintBracketSameLine(
    node,
    options2,
    nameHasComments
  );
  if (bracketSameLine) {
    return [">"];
  }
  return [softline, ">"];
}
function shouldPrintBracketSameLine(node, options2, nameHasComments) {
  const lastAttrHasTrailingComments = node.attributes.length > 0 && hasComment(at_default(
    /* isOptionalObject */
    false,
    node.attributes,
    -1
  ), CommentCheckFlags.Trailing);
  return (
    // Simple tags (no attributes and no comment in tag name) should be
    // kept unbroken regardless of `bracketSameLine`.
    // jsxBracketSameLine is deprecated in favour of bracketSameLine,
    // but is still needed for backwards compatibility.
    node.attributes.length === 0 && !nameHasComments || (options2.bracketSameLine || options2.jsxBracketSameLine) && // We should print the bracket in a new line for the following cases:
    // <div
    //   // comment
    // >
    // <div
    //   attr // comment
    // >
    (!nameHasComments || node.attributes.length > 0) && !lastAttrHasTrailingComments
  );
}
function printJsxClosingElement(path, options2, print3) {
  const { node } = path;
  const parts = [];
  parts.push("</");
  const printed = print3("name");
  if (hasComment(node.name, CommentCheckFlags.Leading | CommentCheckFlags.Line)) {
    parts.push(indent([hardline, printed]), hardline);
  } else if (hasComment(node.name, CommentCheckFlags.Leading | CommentCheckFlags.Block)) {
    parts.push(" ", printed);
  } else {
    parts.push(printed);
  }
  parts.push(">");
  return parts;
}
function printJsxOpeningClosingFragment(path, options2) {
  const { node } = path;
  const nodeHasComment = hasComment(node);
  const hasOwnLineComment = hasComment(node, CommentCheckFlags.Line);
  const isOpeningFragment = node.type === "JSXOpeningFragment";
  return [
    isOpeningFragment ? "<" : "</",
    indent([
      hasOwnLineComment ? hardline : nodeHasComment && !isOpeningFragment ? " " : "",
      printDanglingComments(path, options2)
    ]),
    hasOwnLineComment ? hardline : "",
    ">"
  ];
}
function printJsxElement(path, options2, print3) {
  const elem = printComments(
    path,
    printJsxElementInternal(path, options2, print3),
    options2
  );
  return maybeWrapJsxElementInParens(path, elem, options2);
}
function printJsxEmptyExpression(path, options2) {
  const { node } = path;
  const requiresHardline = hasComment(node, CommentCheckFlags.Line);
  return [
    printDanglingComments(path, options2, { indent: requiresHardline }),
    requiresHardline ? hardline : ""
  ];
}
function printJsxSpreadAttributeOrChild(path, options2, print3) {
  const { node } = path;
  return [
    "{",
    path.call(
      ({ node: node2 }) => {
        const printed = ["...", print3()];
        if (!hasComment(node2) || !willPrintOwnComments(path)) {
          return printed;
        }
        return [
          indent([softline, printComments(path, printed, options2)]),
          softline
        ];
      },
      node.type === "JSXSpreadAttribute" ? "argument" : "expression"
    ),
    "}"
  ];
}
function printJsx(path, options2, print3) {
  const { node } = path;
  if (!node.type.startsWith("JSX")) {
    return;
  }
  switch (node.type) {
    case "JSXAttribute":
      return printJsxAttribute(path, options2, print3);
    case "JSXIdentifier":
      return node.name;
    case "JSXNamespacedName":
      return join(":", [print3("namespace"), print3("name")]);
    case "JSXMemberExpression":
      return join(".", [print3("object"), print3("property")]);
    case "JSXSpreadAttribute":
    case "JSXSpreadChild":
      return printJsxSpreadAttributeOrChild(path, options2, print3);
    case "JSXExpressionContainer":
      return printJsxExpressionContainer(path, options2, print3);
    case "JSXFragment":
    case "JSXElement":
      return printJsxElement(path, options2, print3);
    case "JSXOpeningElement":
      return printJsxOpeningElement(path, options2, print3);
    case "JSXClosingElement":
      return printJsxClosingElement(path, options2, print3);
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
      return printJsxOpeningClosingFragment(
        path,
        options2
        /*, print*/
      );
    case "JSXEmptyExpression":
      return printJsxEmptyExpression(
        path,
        options2
        /*, print*/
      );
    case "JSXText":
      throw new Error("JSXText should be handled by JSXElement");
    default:
      throw new unexpected_node_error_default(node, "JSX");
  }
}
function isEmptyJsxElement(node) {
  if (node.children.length === 0) {
    return true;
  }
  if (node.children.length > 1) {
    return false;
  }
  const child = node.children[0];
  return child.type === "JSXText" && !isMeaningfulJsxText(child);
}
function isMeaningfulJsxText(node) {
  return node.type === "JSXText" && (jsxWhitespaceUtils.hasNonWhitespaceCharacter(get_raw_default(node)) || !/\n/u.test(get_raw_default(node)));
}
function isJsxWhitespaceExpression(node) {
  return node.type === "JSXExpressionContainer" && isStringLiteral(node.expression) && node.expression.value === " " && !hasComment(node.expression);
}
function hasJsxIgnoreComment(path) {
  const { node, parent } = path;
  if (!isJsxElement(node) || !isJsxElement(parent)) {
    return false;
  }
  const { index, siblings } = path;
  let prevSibling;
  for (let i = index; i > 0; i--) {
    const candidate = siblings[i - 1];
    if (candidate.type === "JSXText" && !isMeaningfulJsxText(candidate)) {
      continue;
    }
    prevSibling = candidate;
    break;
  }
  return prevSibling?.type === "JSXExpressionContainer" && prevSibling.expression.type === "JSXEmptyExpression" && hasNodeIgnoreComment(prevSibling.expression);
}

// src/language-js/utils/is-ignored.js
function isIgnored(path) {
  return hasNodeIgnoreComment(path.node) || hasJsxIgnoreComment(path);
}
var is_ignored_default = isIgnored;

// src/language-js/print/binaryish.js
var uid = 0;
function printBinaryishExpression(path, options2, print3) {
  const { node, parent, grandparent, key } = path;
  const isInsideParenthesis = key !== "body" && (parent.type === "IfStatement" || parent.type === "WhileStatement" || parent.type === "SwitchStatement" || parent.type === "DoWhileStatement");
  const isHackPipeline = node.operator === "|>" && path.root.extra?.__isUsingHackPipeline;
  const parts = printBinaryishExpressions(
    path,
    options2,
    print3,
    /* isNested */
    false,
    isInsideParenthesis
  );
  if (isInsideParenthesis) {
    return parts;
  }
  if (isHackPipeline) {
    return group(parts);
  }
  if (isCallExpression(parent) && parent.callee === node || parent.type === "UnaryExpression" || isMemberExpression(parent) && !parent.computed) {
    return group([indent([softline, ...parts]), softline]);
  }
  const shouldNotIndent = parent.type === "ReturnStatement" || parent.type === "ThrowStatement" || parent.type === "JSXExpressionContainer" && grandparent.type === "JSXAttribute" || node.operator !== "|" && parent.type === "JsExpressionRoot" || node.type !== "NGPipeExpression" && (parent.type === "NGRoot" && options2.parser === "__ng_binding" || parent.type === "NGMicrosyntaxExpression" && grandparent.type === "NGMicrosyntax" && grandparent.body.length === 1) || node === parent.body && parent.type === "ArrowFunctionExpression" || node !== parent.body && parent.type === "ForStatement" || parent.type === "ConditionalExpression" && grandparent.type !== "ReturnStatement" && grandparent.type !== "ThrowStatement" && !isCallExpression(grandparent) || parent.type === "TemplateLiteral";
  const shouldIndentIfInlining = parent.type === "AssignmentExpression" || parent.type === "VariableDeclarator" || parent.type === "ClassProperty" || parent.type === "PropertyDefinition" || parent.type === "TSAbstractPropertyDefinition" || parent.type === "ClassPrivateProperty" || isObjectProperty(parent);
  const samePrecedenceSubExpression = isBinaryish(node.left) && shouldFlatten(node.operator, node.left.operator);
  if (shouldNotIndent || shouldInlineLogicalExpression(node) && !samePrecedenceSubExpression || !shouldInlineLogicalExpression(node) && shouldIndentIfInlining) {
    return group(parts);
  }
  if (parts.length === 0) {
    return "";
  }
  const hasJsx = isJsxElement(node.right);
  const firstGroupIndex = parts.findIndex(
    (part) => typeof part !== "string" && !Array.isArray(part) && part.type === DOC_TYPE_GROUP
  );
  const headParts = parts.slice(
    0,
    firstGroupIndex === -1 ? 1 : firstGroupIndex + 1
  );
  const rest = parts.slice(headParts.length, hasJsx ? -1 : void 0);
  const groupId = Symbol("logicalChain-" + ++uid);
  const chain = group(
    [
      // Don't include the initial expression in the indentation
      // level. The first item is guaranteed to be the first
      // left-most expression.
      ...headParts,
      indent(rest)
    ],
    { id: groupId }
  );
  if (!hasJsx) {
    return chain;
  }
  const jsxPart = at_default(
    /* isOptionalObject */
    false,
    parts,
    -1
  );
  return group([chain, indentIfBreak(jsxPart, { groupId })]);
}
function printBinaryishExpressions(path, options2, print3, isNested, isInsideParenthesis) {
  const { node } = path;
  if (!isBinaryish(node)) {
    return [group(print3())];
  }
  let parts = [];
  if (shouldFlatten(node.operator, node.left.operator)) {
    parts = path.call(
      (left) => printBinaryishExpressions(
        left,
        options2,
        print3,
        /* isNested */
        true,
        isInsideParenthesis
      ),
      "left"
    );
  } else {
    parts.push(group(print3("left")));
  }
  const shouldInline = shouldInlineLogicalExpression(node);
  const lineBeforeOperator = (node.operator === "|>" || node.type === "NGPipeExpression" || isVueFilterSequenceExpression(path, options2)) && !hasLeadingOwnLineComment(options2.originalText, node.right);
  const hasTypeCastComment = hasComment(
    node.right,
    CommentCheckFlags.Leading,
    is_type_cast_comment_default
  );
  const commentBeforeOperator = !hasTypeCastComment && hasLeadingOwnLineComment(options2.originalText, node.right);
  const operator = node.type === "NGPipeExpression" ? "|" : node.operator;
  const rightSuffix = node.type === "NGPipeExpression" && node.arguments.length > 0 ? group(
    indent([
      softline,
      ": ",
      join(
        [line, ": "],
        path.map(() => align(2, group(print3())), "arguments")
      )
    ])
  ) : "";
  let right;
  if (shouldInline) {
    right = [
      operator,
      hasLeadingOwnLineComment(options2.originalText, node.right) ? indent([line, print3("right"), rightSuffix]) : [" ", print3("right"), rightSuffix]
    ];
  } else {
    const isHackPipeline = operator === "|>" && path.root.extra?.__isUsingHackPipeline;
    const rightContent = isHackPipeline ? path.call(
      (left) => printBinaryishExpressions(
        left,
        options2,
        print3,
        /* isNested */
        true,
        isInsideParenthesis
      ),
      "right"
    ) : print3("right");
    if (options2.experimentalOperatorPosition === "start") {
      let comment = "";
      if (commentBeforeOperator) {
        switch (get_doc_type_default(rightContent)) {
          case DOC_TYPE_ARRAY:
            comment = rightContent.splice(0, 1)[0];
            break;
          case DOC_TYPE_LABEL:
            comment = rightContent.contents.splice(0, 1)[0];
            break;
        }
      }
      right = [line, comment, operator, " ", rightContent, rightSuffix];
    } else {
      right = [
        lineBeforeOperator ? line : "",
        operator,
        lineBeforeOperator ? " " : line,
        rightContent,
        rightSuffix
      ];
    }
  }
  const { parent } = path;
  const shouldBreak = hasComment(
    node.left,
    CommentCheckFlags.Trailing | CommentCheckFlags.Line
  );
  const shouldGroup = shouldBreak || !(isInsideParenthesis && node.type === "LogicalExpression") && parent.type !== node.type && node.left.type !== node.type && node.right.type !== node.type;
  if (shouldGroup) {
    right = group(right, { shouldBreak });
  }
  if (options2.experimentalOperatorPosition === "start") {
    parts.push(shouldInline || commentBeforeOperator ? " " : "", right);
  } else {
    parts.push(lineBeforeOperator ? "" : " ", right);
  }
  if (isNested && hasComment(node)) {
    const printed = cleanDoc(printComments(path, parts, options2));
    if (printed.type === DOC_TYPE_FILL) {
      return printed.parts;
    }
    return Array.isArray(printed) ? printed : [printed];
  }
  return parts;
}
function shouldInlineLogicalExpression(node) {
  if (node.type !== "LogicalExpression") {
    return false;
  }
  if (isObjectExpression(node.right) && node.right.properties.length > 0) {
    return true;
  }
  if (isArrayExpression(node.right) && node.right.elements.length > 0) {
    return true;
  }
  if (isJsxElement(node.right)) {
    return true;
  }
  return false;
}
var isBitwiseOrExpression = (node) => node.type === "BinaryExpression" && node.operator === "|";
function isVueFilterSequenceExpression(path, options2) {
  return (options2.parser === "__vue_expression" || options2.parser === "__vue_ts_expression") && isBitwiseOrExpression(path.node) && !path.hasAncestor(
    (node) => !isBitwiseOrExpression(node) && node.type !== "JsExpressionRoot"
  );
}

// src/language-js/print/angular.js
function printAngular(path, options2, print3) {
  const { node } = path;
  if (!node.type.startsWith("NG")) {
    return;
  }
  switch (node.type) {
    case "NGRoot":
      return [
        print3("node"),
        hasComment(node.node) ? " //" + getComments(node.node)[0].value.trimEnd() : ""
      ];
    case "NGPipeExpression":
      return printBinaryishExpression(path, options2, print3);
    case "NGChainedExpression":
      return group(
        join(
          [";", line],
          path.map(
            () => hasNgSideEffect(path) ? print3() : ["(", print3(), ")"],
            "expressions"
          )
        )
      );
    case "NGEmptyExpression":
      return "";
    case "NGMicrosyntax":
      return path.map(
        () => [
          path.isFirst ? "" : isNgForOf(path) ? " " : [";", line],
          print3()
        ],
        "body"
      );
    case "NGMicrosyntaxKey":
      return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/iu.test(node.name) ? node.name : JSON.stringify(node.name);
    case "NGMicrosyntaxExpression":
      return [
        print3("expression"),
        node.alias === null ? "" : [" as ", print3("alias")]
      ];
    case "NGMicrosyntaxKeyedExpression": {
      const { index, parent } = path;
      const shouldNotPrintColon = isNgForOf(path) || isNgForOfTrack(path) || (index === 1 && (node.key.name === "then" || node.key.name === "else" || node.key.name === "as") || index === 2 && (node.key.name === "else" && parent.body[index - 1].type === "NGMicrosyntaxKeyedExpression" && parent.body[index - 1].key.name === "then" || node.key.name === "track")) && parent.body[0].type === "NGMicrosyntaxExpression";
      return [
        print3("key"),
        shouldNotPrintColon ? " " : ": ",
        print3("expression")
      ];
    }
    case "NGMicrosyntaxLet":
      return [
        "let ",
        print3("key"),
        node.value === null ? "" : [" = ", print3("value")]
      ];
    case "NGMicrosyntaxAs":
      return [print3("key"), " as ", print3("alias")];
    default:
      throw new unexpected_node_error_default(node, "Angular");
  }
}
function isNgForOf({ node, index }) {
  return node.type === "NGMicrosyntaxKeyedExpression" && node.key.name === "of" && index === 1;
}
function isNgForOfTrack(path) {
  const { node } = path;
  return path.parent.body[1].key.name === "of" && node.type === "NGMicrosyntaxKeyedExpression" && node.key.name === "track" && node.key.type === "NGMicrosyntaxKey";
}
var hasSideEffect = create_type_check_function_default([
  "CallExpression",
  "OptionalCallExpression",
  "AssignmentExpression"
]);
function hasNgSideEffect({ node }) {
  return hasNode(node, hasSideEffect);
}

// src/language-js/print/decorators.js
function printClassMemberDecorators(path, options2, print3) {
  const { node } = path;
  return group([
    join(line, path.map(print3, "decorators")),
    hasNewlineBetweenOrAfterDecorators(node, options2) ? hardline : line
  ]);
}
function printDecoratorsBeforeExport(path, options2, print3) {
  if (!hasDecoratorsBeforeExport(path.node)) {
    return "";
  }
  return [
    join(hardline, path.map(print3, "declaration", "decorators")),
    hardline
  ];
}
function printDecorators(path, options2, print3) {
  const { node, parent } = path;
  const { decorators } = node;
  if (!is_non_empty_array_default(decorators) || // If the parent node is an export declaration and the decorator
  // was written before the export, the export will be responsible
  // for printing the decorators.
  hasDecoratorsBeforeExport(parent) || // Decorators already printed in ignored node
  is_ignored_default(path)) {
    return "";
  }
  const shouldBreak = node.type === "ClassExpression" || node.type === "ClassDeclaration" || hasNewlineBetweenOrAfterDecorators(node, options2);
  return [
    path.key === "declaration" && isExportDeclaration(parent) ? hardline : shouldBreak ? breakParent : "",
    join(line, path.map(print3, "decorators")),
    line
  ];
}
function hasNewlineBetweenOrAfterDecorators(node, options2) {
  return node.decorators.some(
    (decorator) => has_newline_default(options2.originalText, locEnd(decorator))
  );
}
function hasDecoratorsBeforeExport(node) {
  if (node.type !== "ExportDefaultDeclaration" && node.type !== "ExportNamedDeclaration" && node.type !== "DeclareExportDeclaration") {
    return false;
  }
  const decorators = node.declaration?.decorators;
  return is_non_empty_array_default(decorators) && hasSameLocStart(node, decorators[0]);
}

// src/common/errors.js
var ArgExpansionBailout = class extends Error {
  name = "ArgExpansionBailout";
};

// src/language-js/print/call-arguments.js
function printCallArguments(path, options2, print3) {
  const { node } = path;
  const args = getCallArguments(node);
  if (args.length === 0) {
    return ["(", printDanglingComments(path, options2), ")"];
  }
  const lastArgIndex = args.length - 1;
  let anyArgEmptyLine = false;
  const printedArguments = [];
  iterateCallArgumentsPath(path, ({ node: arg }, index) => {
    let argDoc = print3();
    if (index === lastArgIndex) {
    } else if (isNextLineEmpty2(arg, options2)) {
      anyArgEmptyLine = true;
      argDoc = [argDoc, ",", hardline, hardline];
    } else {
      argDoc = [argDoc, ",", line];
    }
    printedArguments.push(argDoc);
  });
  const maybeTrailingComma = (
    // Angular does not allow trailing comma
    !options2.parser.startsWith("__ng_") && // Dynamic imports cannot have trailing commas
    node.type !== "ImportExpression" && node.type !== "TSImportType" && shouldPrintComma(options2, "all") ? "," : ""
  );
  if (node.type === "TSImportType" && args.length === 1 && (args[0].type === "TSLiteralType" && isStringLiteral(args[0].literal) || // TODO: Remove this when update Babel to v8
  isStringLiteral(args[0])) && !hasComment(args[0])) {
    return group(["(", ...printedArguments, ifBreak(maybeTrailingComma), ")"]);
  }
  function allArgsBrokenOut() {
    return group(
      ["(", indent([line, ...printedArguments]), maybeTrailingComma, line, ")"],
      { shouldBreak: true }
    );
  }
  if (shouldExpandFirstArg(args)) {
    const tailArgs = printedArguments.slice(1);
    if (tailArgs.some(willBreak)) {
      return allArgsBrokenOut();
    }
    let firstArg;
    try {
      firstArg = print3(getCallArgumentSelector(node, 0), {
        expandFirstArg: true
      });
    } catch (caught) {
      if (caught instanceof ArgExpansionBailout) {
        return allArgsBrokenOut();
      }
      throw caught;
    }
    if (willBreak(firstArg)) {
      return [
        breakParent,
        conditionalGroup([
          ["(", group(firstArg, { shouldBreak: true }), ", ", ...tailArgs, ")"],
          allArgsBrokenOut()
        ])
      ];
    }
    return conditionalGroup([
      ["(", firstArg, ", ", ...tailArgs, ")"],
      ["(", group(firstArg, { shouldBreak: true }), ", ", ...tailArgs, ")"],
      allArgsBrokenOut()
    ]);
  }
  if (shouldExpandLastArg(args, printedArguments, options2)) {
    const headArgs = printedArguments.slice(0, -1);
    if (headArgs.some(willBreak)) {
      return allArgsBrokenOut();
    }
    let lastArg;
    try {
      lastArg = print3(getCallArgumentSelector(node, -1), {
        expandLastArg: true
      });
    } catch (caught) {
      if (caught instanceof ArgExpansionBailout) {
        return allArgsBrokenOut();
      }
      throw caught;
    }
    if (willBreak(lastArg)) {
      return [
        breakParent,
        conditionalGroup([
          ["(", ...headArgs, group(lastArg, { shouldBreak: true }), ")"],
          allArgsBrokenOut()
        ])
      ];
    }
    return conditionalGroup([
      ["(", ...headArgs, lastArg, ")"],
      ["(", ...headArgs, group(lastArg, { shouldBreak: true }), ")"],
      allArgsBrokenOut()
    ]);
  }
  const contents = [
    "(",
    indent([softline, ...printedArguments]),
    ifBreak(maybeTrailingComma),
    softline,
    ")"
  ];
  if (isLongCurriedCallExpression(path)) {
    return contents;
  }
  return group(contents, {
    shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine
  });
}
function couldExpandArg(arg, arrowChainRecursion = false) {
  return isObjectExpression(arg) && (arg.properties.length > 0 || hasComment(arg)) || isArrayExpression(arg) && (arg.elements.length > 0 || hasComment(arg)) || arg.type === "TSTypeAssertion" && couldExpandArg(arg.expression) || isBinaryCastExpression(arg) && couldExpandArg(arg.expression) || arg.type === "FunctionExpression" || arg.type === "ArrowFunctionExpression" && // we want to avoid breaking inside composite return types but not simple keywords
  // https://github.com/prettier/prettier/issues/4070
  // export class Thing implements OtherThing {
  //   do: (type: Type) => Provider<Prop> = memoize(
  //     (type: ObjectType): Provider<Opts> => {}
  //   );
  // }
  // https://github.com/prettier/prettier/issues/6099
  // app.get("/", (req, res): void => {
  //   res.send("Hello World!");
  // });
  (!arg.returnType || !arg.returnType.typeAnnotation || arg.returnType.typeAnnotation.type !== "TSTypeReference" || // https://github.com/prettier/prettier/issues/7542
  isNonEmptyBlockStatement(arg.body)) && (arg.body.type === "BlockStatement" || arg.body.type === "ArrowFunctionExpression" && couldExpandArg(arg.body, true) || isObjectExpression(arg.body) || isArrayExpression(arg.body) || !arrowChainRecursion && (isCallExpression(arg.body) || arg.body.type === "ConditionalExpression") || isJsxElement(arg.body)) || arg.type === "DoExpression" || arg.type === "ModuleExpression";
}
function shouldExpandLastArg(args, argDocs, options2) {
  const lastArg = at_default(
    /* isOptionalObject */
    false,
    args,
    -1
  );
  if (args.length === 1) {
    const lastArgDoc = at_default(
      /* isOptionalObject */
      false,
      argDocs,
      -1
    );
    if (lastArgDoc.label?.embed && lastArgDoc.label?.hug !== false) {
      return true;
    }
  }
  const penultimateArg = at_default(
    /* isOptionalObject */
    false,
    args,
    -2
  );
  return !hasComment(lastArg, CommentCheckFlags.Leading) && !hasComment(lastArg, CommentCheckFlags.Trailing) && couldExpandArg(lastArg) && // If the last two arguments are of the same type,
  // disable last element expansion.
  !penultimateArg && // useMemo(() => func(), [foo, bar, baz])
  (args.length !== 2 || penultimateArg.type !== "ArrowFunctionExpression" || !isArrayExpression(lastArg)) && !(args.length > 1 && isConciselyPrintedArray(lastArg, options2));
}
function shouldExpandFirstArg(args) {
  return false;
  if (args.length !== 2) {
    return false;
  }
  const [firstArg, secondArg] = args;
  if (firstArg.type === "ModuleExpression" && isTypeModuleObjectExpression(secondArg)) {
    return true;
  }
  return !hasComment(firstArg) && (firstArg.type === "FunctionExpression" || firstArg.type === "ArrowFunctionExpression" && firstArg.body.type === "BlockStatement") && secondArg.type !== "FunctionExpression" && secondArg.type !== "ArrowFunctionExpression" && secondArg.type !== "ConditionalExpression" && isHopefullyShortCallArgument(secondArg) && !couldExpandArg(secondArg);
}
function isHopefullyShortCallArgument(node) {
  if (node.type === "ParenthesizedExpression") {
    return isHopefullyShortCallArgument(node.expression);
  }
  if (isBinaryCastExpression(node) || node.type === "TypeCastExpression") {
    let { typeAnnotation } = node;
    if (typeAnnotation.type === "TypeAnnotation") {
      typeAnnotation = typeAnnotation.typeAnnotation;
    }
    if (typeAnnotation.type === "TSArrayType") {
      typeAnnotation = typeAnnotation.elementType;
      if (typeAnnotation.type === "TSArrayType") {
        typeAnnotation = typeAnnotation.elementType;
      }
    }
    if (typeAnnotation.type === "GenericTypeAnnotation" || typeAnnotation.type === "TSTypeReference") {
      const typeArguments = typeAnnotation.typeArguments ?? typeAnnotation.typeParameters;
      if (typeArguments?.params.length === 1) {
        typeAnnotation = typeArguments.params[0];
      }
    }
    return isSimpleType(typeAnnotation) && isSimpleCallArgument(node.expression, 1);
  }
  if (isCallLikeExpression(node) && getCallArguments(node).length > 1) {
    return false;
  }
  if (isBinaryish(node)) {
    return isSimpleCallArgument(node.left, 1) && isSimpleCallArgument(node.right, 1);
  }
  return isRegExpLiteral(node) || isSimpleCallArgument(node);
}
function isNonEmptyBlockStatement(node) {
  return node.type === "BlockStatement" && (node.body.some((node2) => node2.type !== "EmptyStatement") || hasComment(node, CommentCheckFlags.Dangling));
}
function isTypeModuleObjectExpression(node) {
  if (!(node.type === "ObjectExpression" && node.properties.length === 1)) {
    return false;
  }
  const [property] = node.properties;
  if (!isObjectProperty(property)) {
    return false;
  }
  return !property.computed && (property.key.type === "Identifier" && property.key.name === "type" || isStringLiteral(property.key) && property.key.value === "type") && isStringLiteral(property.value) && property.value.value === "module";
}
var call_arguments_default = printCallArguments;

// src/language-js/print/member.js
var isCallExpressionWithArguments = (node) => {
  if (node.type === "ChainExpression" || node.type === "TSNonNullExpression") {
    node = node.expression;
  }
  return isCallExpression(node) && getCallArguments(node).length > 0;
};
function printMemberExpression(path, options2, print3) {
  const objectDoc = print3("object");
  const lookupDoc = printMemberLookup(path, options2, print3);
  const { node } = path;
  const firstNonMemberParent = path.findAncestor(
    (node2) => !(isMemberExpression(node2) || node2.type === "TSNonNullExpression")
  );
  const firstNonChainElementWrapperParent = path.findAncestor(
    (node2) => !(node2.type === "ChainExpression" || node2.type === "TSNonNullExpression")
  );
  const shouldInline = firstNonMemberParent && (firstNonMemberParent.type === "NewExpression" || firstNonMemberParent.type === "BindExpression" || firstNonMemberParent.type === "AssignmentExpression" && firstNonMemberParent.left.type !== "Identifier") || node.computed || node.object.type === "Identifier" && node.property.type === "Identifier" && !isMemberExpression(firstNonChainElementWrapperParent) || (firstNonChainElementWrapperParent.type === "AssignmentExpression" || firstNonChainElementWrapperParent.type === "VariableDeclarator") && (isCallExpressionWithArguments(node.object) || objectDoc.label?.memberChain);
  return label(objectDoc.label, [
    objectDoc,
    shouldInline ? lookupDoc : group(indent([softline, lookupDoc]))
  ]);
}
function printMemberLookup(path, options2, print3) {
  const property = print3("property");
  const { node } = path;
  const optional = printOptionalToken(path);
  if (!node.computed) {
    return [optional, ".", property];
  }
  if (!node.property || isNumericLiteral(node.property)) {
    return [optional, "[", property, "]"];
  }
  return group([optional, "[", indent([softline, property]), softline, "]"]);
}

// src/language-js/print/member-chain.js
function printMemberChain(path, options2, print3) {
  if (path.node.type === "ChainExpression") {
    return path.call(
      () => printMemberChain(path, options2, print3),
      "expression"
    );
  }
  const isExpressionStatement = (path.parent.type === "ChainExpression" ? path.grandparent : path.parent).type === "ExpressionStatement";
  const printedNodes = [];
  function shouldInsertEmptyLineAfter(node2) {
    const { originalText } = options2;
    const nextCharIndex = get_next_non_space_non_comment_character_index_default(
      originalText,
      locEnd(node2)
    );
    const nextChar = originalText.charAt(nextCharIndex);
    if (nextChar === ")") {
      return nextCharIndex !== false && is_next_line_empty_default(originalText, nextCharIndex + 1);
    }
    return isNextLineEmpty2(node2, options2);
  }
  function rec() {
    const { node: node2 } = path;
    if (node2.type === "ChainExpression") {
      return path.call(rec, "expression");
    }
    if (isCallExpression(node2) && (isMemberish(node2.callee) || isCallExpression(node2.callee))) {
      const hasTrailingEmptyLine = shouldInsertEmptyLineAfter(node2);
      printedNodes.unshift({
        node: node2,
        hasTrailingEmptyLine,
        printed: [
          printComments(
            path,
            [
              printOptionalToken(path),
              printFunctionTypeParameters(path, options2, print3),
              call_arguments_default(path, options2, print3)
            ],
            options2
          ),
          hasTrailingEmptyLine ? hardline : ""
        ]
      });
      path.call(rec, "callee");
    } else if (isMemberish(node2)) {
      printedNodes.unshift({
        node: node2,
        needsParens: needs_parens_default(path, options2),
        printed: printComments(
          path,
          isMemberExpression(node2) ? printMemberLookup(path, options2, print3) : printBindExpressionCallee(path, options2, print3),
          options2
        )
      });
      path.call(rec, "object");
    } else if (node2.type === "TSNonNullExpression") {
      printedNodes.unshift({
        node: node2,
        printed: printComments(path, "!", options2)
      });
      path.call(rec, "expression");
    } else {
      printedNodes.unshift({
        node: node2,
        printed: print3()
      });
    }
  }
  const { node } = path;
  printedNodes.unshift({
    node,
    printed: [
      printOptionalToken(path),
      printFunctionTypeParameters(path, options2, print3),
      call_arguments_default(path, options2, print3)
    ]
  });
  if (node.callee) {
    path.call(rec, "callee");
  }
  const groups = [];
  let currentGroup = [printedNodes[0]];
  let i = 1;
  for (; i < printedNodes.length; ++i) {
    if (printedNodes[i].node.type === "TSNonNullExpression" || isCallExpression(printedNodes[i].node) || isMemberExpression(printedNodes[i].node) && printedNodes[i].node.computed && isNumericLiteral(printedNodes[i].node.property)) {
      currentGroup.push(printedNodes[i]);
    } else {
      break;
    }
  }
  if (!isCallExpression(printedNodes[0].node)) {
    for (; i + 1 < printedNodes.length; ++i) {
      if (isMemberish(printedNodes[i].node) && isMemberish(printedNodes[i + 1].node)) {
        currentGroup.push(printedNodes[i]);
      } else {
        break;
      }
    }
  }
  groups.push(currentGroup);
  currentGroup = [];
  let hasSeenCallExpression = false;
  for (; i < printedNodes.length; ++i) {
    if (hasSeenCallExpression && isMemberish(printedNodes[i].node)) {
      if (printedNodes[i].node.computed && isNumericLiteral(printedNodes[i].node.property)) {
        currentGroup.push(printedNodes[i]);
        continue;
      }
      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }
    if (isCallExpression(printedNodes[i].node) || printedNodes[i].node.type === "ImportExpression") {
      hasSeenCallExpression = true;
    }
    currentGroup.push(printedNodes[i]);
    if (hasComment(printedNodes[i].node, CommentCheckFlags.Trailing)) {
      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }
  }
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  function isFactory(name) {
    return false;
    return /^[A-Z]|^[$_]+$/u.test(name);
  }
  function isShort(name) {
    return name.length <= options2.tabWidth;
  }
  function shouldNotWrap(groups2) {
    const hasComputed = groups2[1][0]?.node.computed;
    if (groups2[0].length === 1) {
      const firstNode = groups2[0][0].node;
      return firstNode.type === "ThisExpression" || firstNode.type === "Identifier" && (groups2.length === 2 || isExpressionStatement && isShort(firstNode.name) || hasComputed);
    }
    const lastNode = at_default(
      /* isOptionalObject */
      false,
      groups2[0],
      -1
    ).node;
    return isMemberExpression(lastNode) && lastNode.property.type === "Identifier" && (isFactory(lastNode.property.name) || hasComputed);
  }
  const shouldMerge = groups.length >= 2 && !hasComment(groups[1][0].node) && shouldNotWrap(groups);
  function printGroup(printedGroup) {
    const printed = printedGroup.map((tuple) => tuple.printed);
    if (printedGroup.length > 0 && at_default(
      /* isOptionalObject */
      false,
      printedGroup,
      -1
    ).needsParens) {
      return ["(", ...printed, ")"];
    }
    return printed;
  }
  function printIndentedGroup(groups2) {
    if (groups2.length === 0) {
      return "";
    }
    return indent([hardline, join(hardline, groups2.map(printGroup))]);
  }
  const printedGroups = groups.map(printGroup);
  const oneLine = printedGroups;
  const cutoff = shouldMerge ? 3 : 1;
  const flatGroups = groups.flat();
  const nodeHasComment = flatGroups.slice(1, -1).some((node2) => hasComment(node2.node, CommentCheckFlags.Leading)) || flatGroups.slice(0, -1).some((node2) => hasComment(node2.node, CommentCheckFlags.Trailing)) || groups[cutoff] && hasComment(groups[cutoff][0].node, CommentCheckFlags.Leading);
  if (groups.length <= cutoff && !nodeHasComment && !groups.some((g) => at_default(
    /* isOptionalObject */
    false,
    g,
    -1
  ).hasTrailingEmptyLine)) {
    if (isLongCurriedCallExpression(path)) {
      return oneLine;
    }
    return group(oneLine);
  }
  const lastNodeBeforeIndent = at_default(
    /* isOptionalObject */
    false,
    groups[shouldMerge ? 1 : 0],
    -1
  ).node;
  const shouldHaveEmptyLineBeforeIndent = !isCallExpression(lastNodeBeforeIndent) && shouldInsertEmptyLineAfter(lastNodeBeforeIndent);
  const expanded = [
    printGroup(groups[0]),
    shouldMerge ? groups.slice(1, 2).map(printGroup) : "",
    shouldHaveEmptyLineBeforeIndent ? hardline : "",
    printIndentedGroup(groups.slice(shouldMerge ? 2 : 1))
  ];
  const callExpressions = printedNodes.map(({ node: node2 }) => node2).filter(isCallExpression);
  function lastGroupWillBreakAndOtherCallsHaveFunctionArguments() {
    const lastGroupNode = at_default(
      /* isOptionalObject */
      false,
      at_default(
        /* isOptionalObject */
        false,
        groups,
        -1
      ),
      -1
    ).node;
    const lastGroupDoc = at_default(
      /* isOptionalObject */
      false,
      printedGroups,
      -1
    );
    return isCallExpression(lastGroupNode) && willBreak(lastGroupDoc) && callExpressions.slice(0, -1).some((node2) => node2.arguments.some(isFunctionOrArrowExpression));
  }
  let result;
  if (nodeHasComment || /*(callExpressions.length > 2 &&
    callExpressions.some(
      (expr) => !expr.arguments.every((arg) => isSimpleCallArgument(arg)),
    )) ||*/
  printedGroups.slice(0, -1).some(willBreak) || lastGroupWillBreakAndOtherCallsHaveFunctionArguments()) {
    result = group(expanded);
  } else {
    result = [
      // We only need to check `oneLine` because if `expanded` is chosen
      // that means that the parent group has already been broken
      // naturally
      willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "",
      conditionalGroup([oneLine, expanded])
    ];
  }
  return label({ memberChain: true }, result);
}
var member_chain_default = printMemberChain;

// src/language-js/print/call-expression.js
function printCallExpression(path, options2, print3) {
  const { node } = path;
  const isNew = node.type === "NewExpression";
  const isDynamicImport = node.type === "ImportExpression";
  const optional = printOptionalToken(path);
  const args = getCallArguments(node);
  const isTemplateLiteralSingleArg = args.length === 1 && isTemplateOnItsOwnLine(args[0], options2.originalText);
  if (isTemplateLiteralSingleArg || // Dangling comments are not handled, all these special cases should have arguments #9668
  // We want to keep CommonJS- and AMD-style require calls, and AMD-style
  // define calls, as a unit.
  // e.g. `define(["some/lib"], (lib) => {`
  isCommonsJsOrAmdModuleDefinition(path) || // Keep test declarations on a single line
  // e.g. `it('long name', () => {`
  isTestCall(node, path.parent)) {
    const printed = [];
    iterateCallArgumentsPath(path, () => {
      printed.push(print3());
    });
    if (!(isTemplateLiteralSingleArg && printed[0].label?.embed)) {
      return [
        isNew ? "new " : "",
        printCallee(path, print3),
        optional,
        printFunctionTypeParameters(path, options2, print3),
        "(",
        join(", ", printed),
        ")"
      ];
    }
  }
  if (!isDynamicImport && !isNew && isMemberish(node.callee) && !path.call(
    (path2) => needs_parens_default(path2, options2),
    "callee",
    ...node.callee.type === "ChainExpression" ? ["expression"] : []
  )) {
    return member_chain_default(path, options2, print3);
  }
  const contents = [
    isNew ? "new " : "",
    printCallee(path, print3),
    optional,
    printFunctionTypeParameters(path, options2, print3),
    isNew && args.length === 0 && path.parent.type !== "MemberExpression" ? "" : call_arguments_default(path, options2, print3)
  ];
  if (isDynamicImport || isCallExpression(node.callee)) {
    return group(contents);
  }
  return contents;
}
function printCallee(path, print3) {
  const { node } = path;
  if (node.type === "ImportExpression") {
    return `import${node.phase ? `.${node.phase}` : ""}`;
  }
  return print3("callee");
}
function isCommonsJsOrAmdModuleDefinition(path) {
  const { node } = path;
  if (node.type !== "CallExpression" || node.optional) {
    return false;
  }
  if (node.callee.type !== "Identifier") {
    return false;
  }
  const args = getCallArguments(node);
  if (node.callee.name === "require") {
    return args.length === 1 && isStringLiteral(args[0]) || args.length > 1;
  }
  if (node.callee.name === "define" && path.parent.type === "ExpressionStatement") {
    return args.length === 1 || args.length === 2 && args[0].type === "ArrayExpression" || args.length === 3 && isStringLiteral(args[0]) && args[1].type === "ArrayExpression";
  }
  return false;
}

// src/language-js/print/assignment.js
function printAssignment(path, options2, print3, leftDoc, operator, rightPropertyName) {
  const layout = chooseLayout(path, options2, print3, leftDoc, rightPropertyName);
  const rightDoc = rightPropertyName ? print3(rightPropertyName, { assignmentLayout: layout }) : "";
  switch (layout) {
    // First break after operator, then the sides are broken independently on their own lines
    case "break-after-operator":
      return group([group(leftDoc), operator, group(indent([line, rightDoc]))]);
    // First break right-hand side, then left-hand side
    case "never-break-after-operator":
      return group([group(leftDoc), operator, " ", rightDoc]);
    // First break right-hand side, then after operator
    case "fluid": {
      const groupId = Symbol("assignment");
      return group([
        group(leftDoc),
        operator,
        group(indent(line), { id: groupId }),
        lineSuffixBoundary,
        indentIfBreak(rightDoc, { groupId })
      ]);
    }
    case "break-lhs":
      return group([leftDoc, operator, " ", group(rightDoc)]);
    // Parts of assignment chains aren't wrapped in groups.
    // Once one of them breaks, the chain breaks too.
    case "chain":
      return [group(leftDoc), operator, line, rightDoc];
    case "chain-tail":
      return [group(leftDoc), operator, indent([line, rightDoc])];
    case "chain-tail-arrow-chain":
      return [group(leftDoc), operator, rightDoc];
    case "only-left":
      return leftDoc;
  }
}
function printAssignmentExpression(path, options2, print3) {
  const { node } = path;
  return printAssignment(
    path,
    options2,
    print3,
    print3("left"),
    [" ", node.operator],
    "right"
  );
}
function printVariableDeclarator(path, options2, print3) {
  return printAssignment(path, options2, print3, print3("id"), " =", "init");
}
function chooseLayout(path, options2, print3, leftDoc, rightPropertyName) {
  const { node } = path;
  const rightNode = node[rightPropertyName];
  if (!rightNode) {
    return "only-left";
  }
  const isTail = !isAssignment(rightNode);
  const shouldUseChainFormatting = path.match(
    isAssignment,
    isAssignmentOrVariableDeclarator,
    (node2) => !isTail || node2.type !== "ExpressionStatement" && node2.type !== "VariableDeclaration"
  );
  if (shouldUseChainFormatting) {
    return !isTail ? "chain" : rightNode.type === "ArrowFunctionExpression" && rightNode.body.type === "ArrowFunctionExpression" ? "chain-tail-arrow-chain" : "chain-tail";
  }
  const isHeadOfLongChain = !isTail && isAssignment(rightNode.right);
  if (isHeadOfLongChain || hasLeadingOwnLineComment(options2.originalText, rightNode)) {
    return "break-after-operator";
  }
  if (node.type === "ImportAttribute" || rightNode.type === "CallExpression" && rightNode.callee.name === "require" || // do not put values on a separate line from the key in json
  options2.parser === "json5" || options2.parser === "jsonc" || options2.parser === "json") {
    return "never-break-after-operator";
  }
  const canBreakLeftDoc = canBreak(leftDoc);
  if (isComplexDestructuring(node) || hasComplexTypeAnnotation(node) || isArrowFunctionVariableDeclarator(node) && canBreakLeftDoc) {
    return "break-lhs";
  }
  const hasShortKey = isObjectPropertyWithShortKey(node, leftDoc, options2);
  if (path.call(
    () => shouldBreakAfterOperator(path, options2, print3, hasShortKey),
    rightPropertyName
  )) {
    return "break-after-operator";
  }
  if (isComplexTypeAliasParams(node)) {
    return "break-lhs";
  }
  if (!canBreakLeftDoc && (hasShortKey || rightNode.type === "TemplateLiteral" || rightNode.type === "TaggedTemplateExpression" || isBooleanLiteral(rightNode) || isNumericLiteral(rightNode) || rightNode.type === "ClassExpression")) {
    return "never-break-after-operator";
  }
  return "fluid";
}
function shouldBreakAfterOperator(path, options2, print3, hasShortKey) {
  const rightNode = path.node;
  if (isBinaryish(rightNode) && !shouldInlineLogicalExpression(rightNode)) {
    return true;
  }
  switch (rightNode.type) {
    case "StringLiteralTypeAnnotation":
    case "SequenceExpression":
      return true;
    case "TSConditionalType":
    case "ConditionalTypeAnnotation":
      if (!options2.experimentalTernaries && !shouldBreakBeforeConditionalType(rightNode)) {
        break;
      }
      return true;
    case "ConditionalExpression": {
      if (!options2.experimentalTernaries) {
        const { test } = rightNode;
        return isBinaryish(test) && !shouldInlineLogicalExpression(test);
      }
      const { consequent, alternate } = rightNode;
      return consequent.type === "ConditionalExpression" || alternate.type === "ConditionalExpression";
    }
    case "ClassExpression":
      return is_non_empty_array_default(rightNode.decorators);
  }
  if (hasShortKey) {
    return false;
  }
  let node = rightNode;
  const propertiesForPath = [];
  while (true) {
    if (node.type === "UnaryExpression" || node.type === "AwaitExpression" || node.type === "YieldExpression" && node.argument !== null) {
      node = node.argument;
      propertiesForPath.push("argument");
    } else if (node.type === "TSNonNullExpression") {
      node = node.expression;
      propertiesForPath.push("expression");
    } else {
      break;
    }
  }
  if (isStringLiteral(node) || path.call(
    () => isPoorlyBreakableMemberOrCallChain(path, options2, print3),
    ...propertiesForPath
  )) {
    return true;
  }
  return false;
}
function isComplexDestructuring(node) {
  if (isAssignmentOrVariableDeclarator(node)) {
    const leftNode = node.left || node.id;
    return leftNode.type === "ObjectPattern" && leftNode.properties.length > 2 && leftNode.properties.some(
      (property) => isObjectProperty(property) && (!property.shorthand || property.value?.type === "AssignmentPattern")
    );
  }
  return false;
}
function isAssignment(node) {
  return node.type === "AssignmentExpression";
}
function isAssignmentOrVariableDeclarator(node) {
  return isAssignment(node) || node.type === "VariableDeclarator";
}
function isComplexTypeAliasParams(node) {
  const typeParams = getTypeParametersFromTypeAlias(node);
  if (is_non_empty_array_default(typeParams)) {
    const constraintPropertyName = node.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
    if (typeParams.length > 1 && typeParams.some((param) => param[constraintPropertyName] || param.default)) {
      return true;
    }
  }
  return false;
}
var isTypeAlias = create_type_check_function_default([
  "TSTypeAliasDeclaration",
  "TypeAlias"
]);
function getTypeParametersFromTypeAlias(node) {
  if (isTypeAlias(node)) {
    return node.typeParameters?.params;
  }
}
function hasComplexTypeAnnotation(node) {
  if (node.type !== "VariableDeclarator") {
    return false;
  }
  const { typeAnnotation } = node.id;
  if (!typeAnnotation || !typeAnnotation.typeAnnotation) {
    return false;
  }
  const typeParams = getTypeParametersFromTypeReference(
    typeAnnotation.typeAnnotation
  );
  return is_non_empty_array_default(typeParams) && typeParams.length > 1 && typeParams.some(
    (param) => is_non_empty_array_default(getTypeParametersFromTypeReference(param)) || param.type === "TSConditionalType"
  );
}
function isArrowFunctionVariableDeclarator(node) {
  return node.type === "VariableDeclarator" && node.init?.type === "ArrowFunctionExpression";
}
var isTypeReference = create_type_check_function_default([
  "TSTypeReference",
  "GenericTypeAnnotation"
]);
function getTypeParametersFromTypeReference(node) {
  if (isTypeReference(node)) {
    return (node.typeArguments ?? node.typeParameters)?.params;
  }
}
function isPoorlyBreakableMemberOrCallChain(path, options2, print3, deep = false) {
  const { node } = path;
  const goDeeper = () => isPoorlyBreakableMemberOrCallChain(path, options2, print3, true);
  if (node.type === "ChainExpression" || node.type === "TSNonNullExpression") {
    return path.call(goDeeper, "expression");
  }
  if (isCallExpression(node)) {
    const doc = printCallExpression(path, options2, print3);
    if (doc.label?.memberChain) {
      return false;
    }
    const args = getCallArguments(node);
    const isPoorlyBreakableCall = args.length === 0 || args.length === 1 && isLoneShortArgument(args[0], options2);
    if (!isPoorlyBreakableCall) {
      return false;
    }
    if (isCallExpressionWithComplexTypeArguments(node, print3)) {
      return false;
    }
    return path.call(goDeeper, "callee");
  }
  if (isMemberExpression(node)) {
    return path.call(goDeeper, "object");
  }
  return deep && (node.type === "Identifier" || node.type === "ThisExpression");
}
function isObjectPropertyWithShortKey(node, keyDoc, options2) {
  if (!isObjectProperty(node)) {
    return false;
  }
  keyDoc = cleanDoc(keyDoc);
  const MIN_OVERLAP_FOR_BREAK = 3;
  return typeof keyDoc === "string" && get_string_width_default(keyDoc) < options2.tabWidth + MIN_OVERLAP_FOR_BREAK;
}
function isCallExpressionWithComplexTypeArguments(node, print3) {
  const typeArgs = getTypeArgumentsFromCallExpression(node);
  if (is_non_empty_array_default(typeArgs)) {
    if (typeArgs.length > 1) {
      return true;
    }
    if (typeArgs.length === 1) {
      const firstArg = typeArgs[0];
      if (isUnionType(firstArg) || isIntersectionType(firstArg) || firstArg.type === "TSTypeLiteral" || firstArg.type === "ObjectTypeAnnotation") {
        return true;
      }
    }
    const typeArgsKeyName = node.typeParameters ? "typeParameters" : "typeArguments";
    if (willBreak(print3(typeArgsKeyName))) {
      return true;
    }
  }
  return false;
}
function getTypeArgumentsFromCallExpression(node) {
  return (node.typeParameters ?? node.typeArguments)?.params;
}
function shouldBreakBeforeConditionalType(node) {
  function isGeneric(subNode) {
    switch (subNode.type) {
      case "FunctionTypeAnnotation":
      case "GenericTypeAnnotation":
      case "TSFunctionType":
        return Boolean(subNode.typeParameters);
      case "TSTypeReference":
        return Boolean(
          // TODO: Use `typeArguments` only when babel align with TS.
          subNode.typeArguments ?? subNode.typeParameters
        );
      default:
        return false;
    }
  }
  return isGeneric(node.checkType) || isGeneric(node.extendsType);
}

// src/language-js/print/function-parameters.js
function printFunctionParameters(path, options2, print3, expandArg, printTypeParams) {
  const functionNode = path.node;
  const parameters = getFunctionParameters(functionNode);
  const typeParams = printTypeParams ? printFunctionTypeParameters(path, options2, print3) : "";
  if (parameters.length === 0) {
    return [
      typeParams,
      "(",
      printDanglingComments(path, options2, {
        filter: (comment) => get_next_non_space_non_comment_character_default(
          options2.originalText,
          locEnd(comment)
        ) === ")"
      }),
      ")"
    ];
  }
  const { parent } = path;
  const isParametersInTestCall = isTestCall(parent);
  const shouldHugParameters = shouldHugTheOnlyFunctionParameter(functionNode);
  const printed = [];
  iterateFunctionParametersPath(path, (parameterPath, index) => {
    const isLastParameter = index === parameters.length - 1;
    if (isLastParameter && functionNode.rest) {
      printed.push("...");
    }
    printed.push(print3());
    if (isLastParameter) {
      return;
    }
    printed.push(",");
    if (isParametersInTestCall || shouldHugParameters) {
      printed.push(" ");
    } else if (isNextLineEmpty2(parameters[index], options2)) {
      printed.push(hardline, hardline);
    } else {
      printed.push(line);
    }
  });
  if (expandArg && !isDecoratedFunction(path)) {
    if (willBreak(typeParams) || willBreak(printed)) {
      throw new ArgExpansionBailout();
    }
    return group([removeLines(typeParams), "(", removeLines(printed), ")"]);
  }
  const hasNotParameterDecorator = parameters.every(
    (node) => !is_non_empty_array_default(node.decorators)
  );
  if (shouldHugParameters && hasNotParameterDecorator) {
    return [typeParams, "(", ...printed, ")"];
  }
  if (isParametersInTestCall) {
    return [typeParams, "(", ...printed, ")"];
  }
  const isFlowShorthandWithOneArg = (isFlowObjectTypePropertyAFunction(parent) || isTypeAnnotationAFunction(parent) || parent.type === "TypeAlias" || parent.type === "UnionTypeAnnotation" || parent.type === "IntersectionTypeAnnotation" || parent.type === "FunctionTypeAnnotation" && parent.returnType === functionNode) && parameters.length === 1 && parameters[0].name === null && // `type q = (this: string) => void;`
  functionNode.this !== parameters[0] && parameters[0].typeAnnotation && functionNode.typeParameters === null && isSimpleType(parameters[0].typeAnnotation) && !functionNode.rest;
  if (isFlowShorthandWithOneArg) {
    if (options2.arrowParens === "always" || functionNode.type === "HookTypeAnnotation") {
      return ["(", ...printed, ")"];
    }
    return printed;
  }
  return [
    typeParams,
    "(",
    indent([softline, ...printed]),
    ifBreak(
      !hasRestParameter(functionNode) && shouldPrintComma(options2, "all") ? "," : ""
    ),
    softline,
    ")"
  ];
}
function shouldHugTheOnlyFunctionParameter(node) {
  if (!node) {
    return false;
  }
  const parameters = getFunctionParameters(node);
  if (parameters.length !== 1) {
    return false;
  }
  const [parameter] = parameters;
  return !hasComment(parameter) && (parameter.type === "ObjectPattern" || parameter.type === "ArrayPattern" || parameter.type === "Identifier" && parameter.typeAnnotation && (parameter.typeAnnotation.type === "TypeAnnotation" || parameter.typeAnnotation.type === "TSTypeAnnotation") && isObjectType(parameter.typeAnnotation.typeAnnotation) || parameter.type === "FunctionTypeParam" && isObjectType(parameter.typeAnnotation) && parameter !== node.rest || parameter.type === "AssignmentPattern" && (parameter.left.type === "ObjectPattern" || parameter.left.type === "ArrayPattern") && (parameter.right.type === "Identifier" || isObjectExpression(parameter.right) && parameter.right.properties.length === 0 || isArrayExpression(parameter.right) && parameter.right.elements.length === 0));
}
function getReturnTypeNode(functionNode) {
  let returnTypeNode;
  if (functionNode.returnType) {
    returnTypeNode = functionNode.returnType;
    if (returnTypeNode.typeAnnotation) {
      returnTypeNode = returnTypeNode.typeAnnotation;
    }
  } else if (functionNode.typeAnnotation) {
    returnTypeNode = functionNode.typeAnnotation;
  }
  return returnTypeNode;
}
function shouldGroupFunctionParameters(functionNode, returnTypeDoc) {
  const returnTypeNode = getReturnTypeNode(functionNode);
  if (!returnTypeNode) {
    return false;
  }
  const typeParameters = functionNode.typeParameters?.params;
  if (typeParameters) {
    if (typeParameters.length > 1) {
      return false;
    }
    if (typeParameters.length === 1) {
      const typeParameter = typeParameters[0];
      if (typeParameter.constraint || typeParameter.default) {
        return false;
      }
    }
  }
  return getFunctionParameters(functionNode).length === 1 && (isObjectType(returnTypeNode) || willBreak(returnTypeDoc));
}
function isDecoratedFunction(path) {
  return path.match(
    (node) => node.type === "ArrowFunctionExpression" && node.body.type === "BlockStatement",
    (node, name) => {
      if (node.type === "CallExpression" && name === "arguments" && node.arguments.length === 1 && node.callee.type === "CallExpression") {
        const decorator = node.callee.callee;
        return decorator.type === "Identifier" || decorator.type === "MemberExpression" && !decorator.computed && decorator.object.type === "Identifier" && decorator.property.type === "Identifier";
      }
      return false;
    },
    (node, name) => node.type === "VariableDeclarator" && name === "init" || node.type === "ExportDefaultDeclaration" && name === "declaration" || node.type === "TSExportAssignment" && name === "expression" || node.type === "AssignmentExpression" && name === "right" && node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "module" && node.left.property.type === "Identifier" && node.left.property.name === "exports",
    (node) => node.type !== "VariableDeclaration" || node.kind === "const" && node.declarations.length === 1
  );
}
function shouldBreakFunctionParameters(functionNode) {
  const parameters = getFunctionParameters(functionNode);
  return parameters.length > 1 && parameters.some((parameter) => parameter.type === "TSParameterProperty");
}

// src/language-js/print/type-annotation.js
var isVoidType = create_type_check_function_default([
  "VoidTypeAnnotation",
  "TSVoidKeyword",
  "NullLiteralTypeAnnotation",
  "TSNullKeyword"
]);
var isObjectLikeType = create_type_check_function_default([
  "ObjectTypeAnnotation",
  "TSTypeLiteral",
  // This is a bit aggressive but captures Array<{x}>
  "GenericTypeAnnotation",
  "TSTypeReference"
]);
function shouldHugUnionType(node) {
  const { types } = node;
  if (types.some((node2) => hasComment(node2))) {
    return false;
  }
  const objectType = types.find((node2) => isObjectLikeType(node2));
  if (!objectType) {
    return false;
  }
  return types.every((node2) => node2 === objectType || isVoidType(node2));
}
function shouldHugType(node) {
  if (isSimpleType(node) || isObjectType(node)) {
    return true;
  }
  if (isUnionType(node)) {
    return shouldHugUnionType(node);
  }
  return false;
}
function printOpaqueType(path, options2, print3) {
  const semi = options2.semi ? ";" : "";
  const { node } = path;
  const parts = [
    printDeclareToken(path),
    "opaque type ",
    print3("id"),
    print3("typeParameters")
  ];
  if (node.supertype) {
    parts.push(": ", print3("supertype"));
  }
  if (node.impltype) {
    parts.push(" = ", print3("impltype"));
  }
  parts.push(semi);
  return parts;
}
function printTypeAlias(path, options2, print3) {
  const semi = options2.semi ? ";" : "";
  const { node } = path;
  const parts = [printDeclareToken(path)];
  parts.push("type ", print3("id"), print3("typeParameters"));
  const rightPropertyName = node.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
  return [
    printAssignment(path, options2, print3, parts, " =", rightPropertyName),
    semi
  ];
}
function printIntersectionType(path, options2, print3) {
  let wasIndented = false;
  const printed = path.map(({ isFirst, previous, node: node2, index }) => {
    const doc = print3();
    if (isFirst) {
      return doc;
    }
    const currentIsObjectType = false;
    const previousIsObjectType = false;
    if (previousIsObjectType && currentIsObjectType) {
      return [" & ", wasIndented ? indent(doc) : doc];
    }
    if (
      // If no object is involved, go to the next line if it breaks
      !previousIsObjectType && !currentIsObjectType || hasLeadingOwnLineComment(options2.originalText, node2)
    ) {
      if (options2.experimentalOperatorPosition === "start") {
        return indent([line, "& ", doc]);
      }
      return (
        /*indent(*/
        [" &", line, doc]
      );
    }
    if (index > 1) {
      wasIndented = true;
    }
    return [" & ", index > 1 ? indent(doc) : doc];
  }, "types");
  const { node, parent } = path;
  const shouldIndent = parent.type !== "TypeParameterInstantiation" && (parent.type !== "TSConditionalType" || !options2.experimentalTernaries) && (parent.type !== "ConditionalTypeAnnotation" || !options2.experimentalTernaries) && parent.type !== "TSTypeParameterInstantiation" && parent.type !== "GenericTypeAnnotation" && parent.type !== "TSTypeReference" && parent.type !== "TSTypeAssertion" && parent.type !== "TupleTypeAnnotation" && parent.type !== "TSTupleType" && !(parent.type === "FunctionTypeParam" && !parent.name && path.grandparent.this !== parent) && !((parent.type === "TypeAlias" || parent.type === "VariableDeclarator" || parent.type === "TSTypeAliasDeclaration") && hasLeadingOwnLineComment(options2.originalText, node));
  const shouldAddStartLine = shouldIndent && !hasLeadingOwnLineComment(options2.originalText, node);
  const code = [ifBreak([shouldAddStartLine ? line : ""]), printed];
  if (needs_parens_default(path, options2)) {
    return group([indent(code), softline]);
  }
  return group(shouldIndent ? indent(code) : code);
}
function printUnionType(path, options2, print3) {
  const { node } = path;
  const { parent } = path;
  const shouldIndent = parent.type !== "TypeParameterInstantiation" && (!isConditionalType(parent) || !options2.experimentalTernaries) && parent.type !== "TSTypeParameterInstantiation" && parent.type !== "GenericTypeAnnotation" && parent.type !== "TSTypeReference" && parent.type !== "TSTypeAssertion" && parent.type !== "TupleTypeAnnotation" && parent.type !== "TSTupleType" && !(parent.type === "FunctionTypeParam" && !parent.name && path.grandparent.this !== parent) && !((parent.type === "TypeAlias" || parent.type === "VariableDeclarator" || parent.type === "TSTypeAliasDeclaration") && hasLeadingOwnLineComment(options2.originalText, node));
  const shouldHug = false;
  const printed = path.map((typePath) => {
    let printedType = print3();
    if (!shouldHug) {
      printedType = align(2, printedType);
    }
    return printComments(typePath, printedType, options2);
  }, "types");
  if (shouldHug) {
    return join(" | ", printed);
  }
  const shouldAddStartLine = shouldIndent && !hasLeadingOwnLineComment(options2.originalText, node);
  const code = [
    ifBreak([shouldAddStartLine ? line : ""]),
    join([" |", line], printed)
  ];
  if (needs_parens_default(path, options2)) {
    return group([indent(code), softline]);
  }
  if (parent.type === "TupleTypeAnnotation" || parent.type === "TSTupleType") {
    const elementTypes = parent[
      // TODO: Remove `types` when babel changes AST of `TupleTypeAnnotation`
      parent.type === "TupleTypeAnnotation" && parent.types ? "types" : "elementTypes"
    ];
    if (elementTypes.length > 1) {
      return group([
        indent([ifBreak(["(", softline]), code]),
        softline,
        ifBreak(")")
      ]);
    }
  }
  return group(shouldIndent ? indent(code) : code);
}
function isFlowArrowFunctionTypeAnnotation(path) {
  const { node, parent } = path;
  return node.type === "FunctionTypeAnnotation" && (isFlowObjectTypePropertyAFunction(parent) || !((parent.type === "ObjectTypeProperty" || parent.type === "ObjectTypeInternalSlot") && !parent.variance && !parent.optional && hasSameLocStart(parent, node) || parent.type === "ObjectTypeCallProperty" || path.getParentNode(2)?.type === "DeclareFunction"));
}
function printFunctionType(path, options2, print3) {
  const { node } = path;
  const parts = [
    // `TSConstructorType` only
    printAbstractToken(path)
  ];
  if (node.type === "TSConstructorType" || node.type === "TSConstructSignatureDeclaration") {
    parts.push("new ");
  }
  let parametersDoc = printFunctionParameters(
    path,
    options2,
    print3,
    /* expandArg */
    false,
    /* printTypeParams */
    true
  );
  const returnTypeDoc = [];
  if (node.type === "FunctionTypeAnnotation") {
    returnTypeDoc.push(
      isFlowArrowFunctionTypeAnnotation(path) ? " => " : ": ",
      print3("returnType")
    );
  } else {
    returnTypeDoc.push(
      printTypeAnnotationProperty(
        path,
        print3,
        node.returnType ? "returnType" : "typeAnnotation"
      )
    );
  }
  if (shouldGroupFunctionParameters(node, returnTypeDoc)) {
    parametersDoc = group(parametersDoc);
  }
  parts.push(parametersDoc, returnTypeDoc);
  return group(parts);
}
function printIndexedAccessType(path, options2, print3) {
  return [
    print3("objectType"),
    printOptionalToken(path),
    "[",
    print3("indexType"),
    "]"
  ];
}
function printInferType(path, options2, print3) {
  return ["infer ", print3("typeParameter")];
}
function printJSDocType(path, print3, token) {
  const { node } = path;
  return [
    node.postfix ? "" : token,
    printTypeAnnotationProperty(path, print3),
    node.postfix ? token : ""
  ];
}
function printRestType(path, options2, print3) {
  const { node } = path;
  return [
    "...",
    ...node.type === "TupleTypeSpreadElement" && node.label ? [print3("label"), ": "] : [],
    print3("typeAnnotation")
  ];
}
function printNamedTupleMember(path, options2, print3) {
  const { node } = path;
  return [
    // `TupleTypeLabeledElement` only
    node.variance ? print3("variance") : "",
    print3("label"),
    node.optional ? "?" : "",
    ": ",
    print3("elementType")
  ];
}
var typeAnnotationNodesCheckedLeadingComments = /* @__PURE__ */ new WeakSet();
function printTypeAnnotationProperty(path, print3, propertyName = "typeAnnotation") {
  const {
    node: { [propertyName]: typeAnnotation }
  } = path;
  if (!typeAnnotation) {
    return "";
  }
  let shouldPrintLeadingSpace = false;
  if (typeAnnotation.type === "TSTypeAnnotation" || typeAnnotation.type === "TypeAnnotation") {
    const firstToken = path.call(getTypeAnnotationFirstToken, propertyName);
    if (firstToken === "=>" || firstToken === ":" && hasComment(typeAnnotation, CommentCheckFlags.Leading)) {
      shouldPrintLeadingSpace = true;
    }
    typeAnnotationNodesCheckedLeadingComments.add(typeAnnotation);
  }
  return shouldPrintLeadingSpace ? [" ", print3(propertyName)] : print3(propertyName);
}
var getTypeAnnotationFirstToken = (path) => {
  if (
    // TypeScript
    path.match(
      (node) => node.type === "TSTypeAnnotation",
      (node, key) => (key === "returnType" || key === "typeAnnotation") && (node.type === "TSFunctionType" || node.type === "TSConstructorType")
    )
  ) {
    return "=>";
  }
  if (
    // TypeScript
    path.match(
      (node) => node.type === "TSTypeAnnotation",
      (node, key) => key === "typeAnnotation" && (node.type === "TSJSDocNullableType" || node.type === "TSJSDocNonNullableType" || node.type === "TSTypePredicate")
    ) || /*
        Flow
    
        ```js
        declare function foo(): void;
                            ^^^^^^^^ `TypeAnnotation`
        ```
        */
    path.match(
      (node) => node.type === "TypeAnnotation",
      (node, key) => key === "typeAnnotation" && node.type === "Identifier",
      (node, key) => key === "id" && node.type === "DeclareFunction"
    ) || /*
    Flow
    ```js
    declare hook foo(): void;
                    ^^^^^^^^ `TypeAnnotation`
    ```
    */
    path.match(
      (node) => node.type === "TypeAnnotation",
      (node, key) => key === "typeAnnotation" && node.type === "Identifier",
      (node, key) => key === "id" && node.type === "DeclareHook"
    ) || /*
        Flow
    
        ```js
        type A = () => infer R extends string;
                                       ^^^^^^ `TypeAnnotation`
        ```
        */
    path.match(
      (node) => node.type === "TypeAnnotation",
      (node, key) => key === "bound" && node.type === "TypeParameter" && node.usesExtendsBound
    )
  ) {
    return "";
  }
  return ":";
};
function printTypeAnnotation(path, options2, print3) {
  if (false) {
    const { node } = path;
    if (!typeAnnotationNodesCheckedLeadingComments.has(node)) {
      throw Object.assign(
        new Error(
          `'${node.type}' should be printed by '${printTypeAnnotationProperty.name}' function.`
        ),
        { parentNode: path.parent, propertyName: path.key }
      );
    }
  }
  const token = getTypeAnnotationFirstToken(path);
  return token ? [token, " ", print3("typeAnnotation")] : print3("typeAnnotation");
}
function printArrayType(print3) {
  return [print3("elementType"), "[]"];
}
function printTypeQuery({ node }, print3) {
  const argumentPropertyName = node.type === "TSTypeQuery" ? "exprName" : "argument";
  const typeArgsPropertyName = (
    // TODO: Use `typeArguments` only when babel align with TS.
    node.type === "TypeofTypeAnnotation" || node.typeArguments ? "typeArguments" : "typeParameters"
  );
  return ["typeof ", print3(argumentPropertyName), print3(typeArgsPropertyName)];
}
function printTypePredicate(path, print3) {
  const { node } = path;
  const prefix = node.type === "TSTypePredicate" && node.asserts ? "asserts " : node.type === "TypePredicate" && node.kind ? `${node.kind} ` : "";
  return [
    prefix,
    print3("parameterName"),
    node.typeAnnotation ? [" is ", printTypeAnnotationProperty(path, print3)] : ""
  ];
}

// src/language-js/print/misc.js
function printOptionalToken(path) {
  const { node } = path;
  if (!node.optional || // It's an optional computed method parsed by typescript-estree.
  // "?" is printed in `printMethod`.
  node.type === "Identifier" && node === path.parent.key) {
    return "";
  }
  if (isCallExpression(node) || isMemberExpression(node) && node.computed || node.type === "OptionalIndexedAccessType") {
    return "?.";
  }
  return "?";
}
function printDefiniteToken(path) {
  return path.node.definite || path.match(
    void 0,
    (node, name) => name === "id" && node.type === "VariableDeclarator" && node.definite
  ) ? "!" : "";
}
var flowDeclareNodeTypes = /* @__PURE__ */ new Set([
  "DeclareClass",
  "DeclareComponent",
  "DeclareFunction",
  "DeclareHook",
  "DeclareVariable",
  "DeclareExportDeclaration",
  "DeclareExportAllDeclaration",
  "DeclareOpaqueType",
  "DeclareTypeAlias",
  "DeclareEnum",
  "DeclareInterface"
]);
function printDeclareToken(path) {
  const { node } = path;
  return (
    // TypeScript
    node.declare || // Flow
    flowDeclareNodeTypes.has(node.type) && path.parent.type !== "DeclareExportDeclaration" ? "declare " : ""
  );
}
var tsAbstractNodeTypes = /* @__PURE__ */ new Set([
  "TSAbstractMethodDefinition",
  "TSAbstractPropertyDefinition",
  "TSAbstractAccessorProperty"
]);
function printAbstractToken({ node }) {
  return node.abstract || tsAbstractNodeTypes.has(node.type) ? "abstract " : "";
}
function printFunctionTypeParameters(path, options2, print3) {
  const fun = path.node;
  if (fun.typeArguments) {
    return print3("typeArguments");
  }
  if (fun.typeParameters) {
    return print3("typeParameters");
  }
  return "";
}
function printBindExpressionCallee(path, options2, print3) {
  return ["::", print3("callee")];
}
function adjustClause(node, clause, forceSpace) {
  if (node.type === "EmptyStatement") {
    return ";";
  }
  if (node.type === "BlockStatement" || forceSpace) {
    return [" ", clause];
  }
  return indent([line, clause]);
}
function printRestSpread(path, print3) {
  return ["...", print3("argument"), printTypeAnnotationProperty(path, print3)];
}
function printTypeScriptAccessibilityToken(node) {
  return node.accessibility ? node.accessibility + " " : "";
}

// src/language-js/print/array.js
function printEmptyArrayElements(path, options2, openBracket, closeBracket) {
  const { node } = path;
  const inexact = node.inexact ? "..." : "";
  if (!hasComment(node, CommentCheckFlags.Dangling)) {
    return [openBracket, inexact, closeBracket];
  }
  return group([
    openBracket,
    inexact,
    printDanglingComments(path, options2, { indent: true }),
    softline,
    closeBracket
  ]);
}
function printArray(path, options2, print3) {
  const { node } = path;
  const parts = [];
  const openBracket = "[";
  const closeBracket = "]";
  const elementsProperty = (
    // TODO: Remove `types` when babel changes AST of `TupleTypeAnnotation`
    node.type === "TupleTypeAnnotation" && node.types ? "types" : node.type === "TSTupleType" || node.type === "TupleTypeAnnotation" ? "elementTypes" : "elements"
  );
  const elements = node[elementsProperty];
  if (elements.length === 0) {
    parts.push(
      printEmptyArrayElements(path, options2, openBracket, closeBracket)
    );
  } else {
    const lastElem = at_default(
      /* isOptionalObject */
      false,
      elements,
      -1
    );
    const canHaveTrailingComma = lastElem?.type !== "RestElement" && !node.inexact;
    const needsForcedTrailingComma = lastElem === null;
    const groupId = Symbol("array");
    const shouldBreak = (
      /*!options.__inJestEach &&
            elements.length > 1 &&
            elements.every((element, i, elements) => {
              const elementType = element?.type;
              if (!isArrayExpression(element) && !isObjectExpression(element)) {
                return false;
              }
      
              const nextElement = elements[i + 1];
              if (nextElement && elementType !== nextElement.type) {
                return false;
              }
      
              const itemsKey = isArrayExpression(element) ? "elements" : "properties";
      
              return element[itemsKey] && element[itemsKey].length > 1;
            })*/
      false
    );
    const shouldUseConciseFormatting = isConciselyPrintedArray(node, options2);
    const trailingComma = !canHaveTrailingComma ? "" : needsForcedTrailingComma ? "," : !shouldPrintComma(options2) ? "" : shouldUseConciseFormatting ? ifBreak(",", "", { groupId }) : ifBreak(",");
    parts.push(
      group(
        [
          openBracket,
          indent([
            softline,
            shouldUseConciseFormatting ? printArrayElementsConcisely(path, options2, print3, trailingComma) : [
              printArrayElements(
                path,
                options2,
                print3,
                elementsProperty,
                node.inexact
              ),
              trailingComma
            ],
            printDanglingComments(path, options2)
          ]),
          softline,
          closeBracket
        ],
        { shouldBreak, id: groupId }
      )
    );
  }
  parts.push(
    printOptionalToken(path),
    printTypeAnnotationProperty(path, print3)
  );
  return parts;
}
function isConciselyPrintedArray(node, options2) {
  return isArrayExpression(node) && node.elements.length > 1 && node.elements.every(
    (element) => element && (isNumericLiteral(element) || isSignedNumericLiteral(element) && !hasComment(element.argument)) && !hasComment(
      element,
      CommentCheckFlags.Trailing | CommentCheckFlags.Line,
      (comment) => !has_newline_default(options2.originalText, locStart(comment), {
        backwards: true
      })
    )
  );
}
function isLineAfterElementEmpty({ node }, { originalText: text }) {
  const skipComment = (idx) => skip_inline_comment_default(text, skip_trailing_comment_default(text, idx));
  const skipToComma = (currentIdx) => text[currentIdx] === "," ? currentIdx : skipToComma(skipComment(currentIdx + 1));
  return is_next_line_empty_default(text, skipToComma(locEnd(node)));
}
function printArrayElements(path, options2, print3, elementsProperty, inexact) {
  const parts = [];
  path.each(({ node, isLast }) => {
    parts.push(node ? group(print3()) : "");
    if (!isLast || inexact) {
      parts.push([
        ",",
        line,
        node && isLineAfterElementEmpty(path, options2) ? softline : ""
      ]);
    }
  }, elementsProperty);
  if (inexact) {
    parts.push("...");
  }
  return parts;
}
function printArrayElementsConcisely(path, options2, print3, trailingComma) {
  const parts = [];
  path.each(({ isLast, next }) => {
    parts.push([print3(), isLast ? trailingComma : ","]);
    if (!isLast) {
      parts.push(
        isLineAfterElementEmpty(path, options2) ? [hardline, hardline] : hasComment(next, CommentCheckFlags.Leading | CommentCheckFlags.Line) ? hardline : line
      );
    }
  }, "elements");
  return fill(parts);
}

// src/language-js/print/function.js
import assert2 from "assert";

// node_modules/is-es5-identifier-name/index.js
var identifierRegexp = /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/;
var isEs5IdentifierName = (id) => identifierRegexp.test(id);
var is_es5_identifier_name_default = isEs5IdentifierName;

// src/utils/print-number.js
function printNumber(rawNumber) {
  if (rawNumber.length === 1) {
    return rawNumber;
  }
  return rawNumber.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/u, "$1$2").replace(/^([+-]?[\d.]+)e[+-]?0+$/u, "$1").replace(/^([+-])?0?\./u, "$1.").replace(/(\.\d+?)0+(?=e|$)/u, "$1").replace(/\.(?=e|$)/u, "");
}
var print_number_default = printNumber;

// src/language-js/print/property.js
var needsQuoteProps = /* @__PURE__ */ new WeakMap();
function isSimpleNumber(numberString) {
  return /^(?:\d+|\d+\.\d+)$/u.test(numberString);
}
function isStringKeySafeToUnquote(node, options2) {
  if (options2.parser === "json" || options2.parser === "jsonc" || !isStringLiteral(node.key) || print_string_default(get_raw_default(node.key), options2).slice(1, -1) !== node.key.value) {
    return false;
  }
  if (is_es5_identifier_name_default(node.key.value) && // With `--strictPropertyInitialization`, TS treats properties with quoted names differently than unquoted ones.
  // See https://github.com/microsoft/TypeScript/pull/20075
  !(options2.parser === "babel-ts" && node.type === "ClassProperty" || (options2.parser === "typescript" || options2.parser === "oxc-ts") && node.type === "PropertyDefinition")) {
    return true;
  }
  if (isSimpleNumber(node.key.value) && String(Number(node.key.value)) === node.key.value && node.type !== "ImportAttribute" && (options2.parser === "babel" || options2.parser === "acorn" || options2.parser === "oxc" || options2.parser === "espree" || options2.parser === "meriyah" || options2.parser === "__babel_estree")) {
    return true;
  }
  return false;
}
function shouldQuotePropertyKey(path, options2) {
  const { key } = path.node;
  return (key.type === "Identifier" || isNumericLiteral(key) && isSimpleNumber(print_number_default(get_raw_default(key))) && // Avoid converting 999999999999999999999 to 1e+21, 0.99999999999999999 to 1 and 1.0 to 1.
  String(key.value) === print_number_default(get_raw_default(key)) && // Quoting number keys is safe in JS and Flow, but not in TypeScript (as
  // mentioned in `isStringKeySafeToUnquote`).
  !(options2.parser === "typescript" || options2.parser === "babel-ts" || options2.parser === "oxc-ts")) && (options2.parser === "json" || options2.parser === "jsonc" || options2.quoteProps === "consistent" && needsQuoteProps.get(path.parent));
}
function printPropertyKey(path, options2, print3) {
  const { node } = path;
  if (node.computed) {
    return ["[", print3("key"), "]"];
  }
  const { parent } = path;
  const { key } = node;
  if (options2.quoteProps === "consistent" && !needsQuoteProps.has(parent)) {
    const objectHasStringProp = path.siblings.some(
      (prop) => !prop.computed && isStringLiteral(prop.key) && !isStringKeySafeToUnquote(prop, options2)
    );
    needsQuoteProps.set(parent, objectHasStringProp);
  }
  if (shouldQuotePropertyKey(path, options2)) {
    const prop = print_string_default(
      JSON.stringify(
        key.type === "Identifier" ? key.name : key.value.toString()
      ),
      options2
    );
    return path.call((keyPath) => printComments(keyPath, prop, options2), "key");
  }
  if (isStringKeySafeToUnquote(node, options2) && (options2.quoteProps === "as-needed" || options2.quoteProps === "consistent" && !needsQuoteProps.get(parent))) {
    return path.call(
      (keyPath) => printComments(
        keyPath,
        /^\d/u.test(key.value) ? print_number_default(key.value) : key.value,
        options2
      ),
      "key"
    );
  }
  return print3("key");
}
function printProperty(path, options2, print3) {
  const { node } = path;
  if (node.shorthand) {
    return print3("value");
  }
  return printAssignment(
    path,
    options2,
    print3,
    printPropertyKey(path, options2, print3),
    ":",
    "value"
  );
}

// src/language-js/print/function.js
var isMethodValue = ({ node, key, parent }) => key === "value" && node.type === "FunctionExpression" && (parent.type === "ObjectMethod" || parent.type === "ClassMethod" || parent.type === "ClassPrivateMethod" || parent.type === "MethodDefinition" || parent.type === "TSAbstractMethodDefinition" || parent.type === "TSDeclareMethod" || parent.type === "Property" && isMethod(parent));
function printFunction(path, options2, print3, args) {
  if (isMethodValue(path)) {
    return printMethodValue(path, options2, print3);
  }
  const { node } = path;
  let expandArg = false;
  if ((node.type === "FunctionDeclaration" || node.type === "FunctionExpression") && args?.expandLastArg) {
    const { parent } = path;
    if (isCallExpression(parent) && (getCallArguments(parent).length > 1 || getFunctionParameters(node).every(
      (param) => param.type === "Identifier" && !param.typeAnnotation
    ))) {
      expandArg = true;
    }
  }
  const parts = [
    printDeclareToken(path),
    node.async ? "async " : "",
    `function${node.generator ? "*" : ""} `,
    node.id ? print3("id") : ""
  ];
  const parametersDoc = printFunctionParameters(
    path,
    options2,
    print3,
    expandArg
  );
  const returnTypeDoc = printReturnType(path, print3);
  const shouldGroupParameters = shouldGroupFunctionParameters(
    node,
    returnTypeDoc
  );
  parts.push(
    printFunctionTypeParameters(path, options2, print3),
    group([
      shouldGroupParameters ? group(parametersDoc) : parametersDoc,
      returnTypeDoc
    ]),
    node.body ? " " : "",
    print3("body")
  );
  if (options2.semi && (node.declare || !node.body)) {
    parts.push(";");
  }
  return parts;
}
function printMethod(path, options2, print3) {
  const { node } = path;
  const { kind } = node;
  const value = node.value || node;
  const parts = [];
  if (!kind || kind === "init" || kind === "method" || kind === "constructor") {
    if (value.async) {
      parts.push("async ");
    }
  } else {
    assert2.ok(kind === "get" || kind === "set");
    parts.push(kind, " ");
  }
  if (value.generator) {
    parts.push("*");
  }
  parts.push(
    printPropertyKey(path, options2, print3),
    node.optional ? "?" : "",
    [
      " ",
      node === value ? printMethodValue(path, options2, print3) : print3("value")
    ]
  );
  return parts;
}
function printMethodValue(path, options2, print3) {
  const { node } = path;
  const parametersDoc = printFunctionParameters(path, options2, print3);
  const returnTypeDoc = printReturnType(path, print3);
  const shouldBreakParameters = shouldBreakFunctionParameters(node);
  const shouldGroupParameters = shouldGroupFunctionParameters(
    node,
    returnTypeDoc
  );
  const parts = [
    printFunctionTypeParameters(path, options2, print3),
    group([
      shouldBreakParameters ? group(parametersDoc, { shouldBreak: true }) : shouldGroupParameters ? group(parametersDoc) : parametersDoc,
      returnTypeDoc
    ])
  ];
  if (node.body) {
    parts.push(" ", print3("body"));
  } else {
    parts.push(options2.semi ? ";" : "");
  }
  return parts;
}
function canPrintParamsWithoutParens(node) {
  const parameters = getFunctionParameters(node);
  return parameters.length === 1 && !node.typeParameters && !hasComment(node, CommentCheckFlags.Dangling) && parameters[0].type === "Identifier" && !parameters[0].typeAnnotation && !hasComment(parameters[0]) && !parameters[0].optional && !node.predicate && !node.returnType;
}
function shouldPrintParamsWithoutParens(path, options2) {
  if (options2.arrowParens === "always") {
    return false;
  }
  if (options2.arrowParens === "avoid") {
    const { node } = path;
    return canPrintParamsWithoutParens(node);
  }
  return false;
}
function printReturnType(path, print3) {
  const { node } = path;
  const returnType = printTypeAnnotationProperty(path, print3, "returnType");
  const parts = [returnType];
  if (node.predicate) {
    parts.push(print3("predicate"));
  }
  return parts;
}
function printReturnOrThrowArgument(path, options2, print3) {
  const { node } = path;
  const semi = options2.semi ? ";" : "";
  const parts = [];
  if (node.argument) {
    let argumentDoc = print3("argument");
    if (returnArgumentHasLeadingComment(options2, node.argument)) {
      argumentDoc = ["(", indent([hardline, argumentDoc]), hardline, ")"];
    } else if (isBinaryish(node.argument) || options2.experimentalTernaries && node.argument.type === "ConditionalExpression" && (node.argument.consequent.type === "ConditionalExpression" || node.argument.alternate.type === "ConditionalExpression")) {
      argumentDoc = group([
        ifBreak("("),
        indent([softline, argumentDoc]),
        softline,
        ifBreak(")")
      ]);
    }
    parts.push(" ", argumentDoc);
  }
  const hasDanglingComments = hasComment(node, CommentCheckFlags.Dangling);
  const shouldPrintSemiBeforeComments = semi && hasDanglingComments && hasComment(node, CommentCheckFlags.Last | CommentCheckFlags.Line);
  if (shouldPrintSemiBeforeComments) {
    parts.push(semi);
  }
  if (hasDanglingComments) {
    parts.push(" ", printDanglingComments(path, options2));
  }
  if (!shouldPrintSemiBeforeComments) {
    parts.push(semi);
  }
  return parts;
}
function printReturnStatement(path, options2, print3) {
  return ["return", printReturnOrThrowArgument(path, options2, print3)];
}
function printThrowStatement(path, options2, print3) {
  return ["throw", printReturnOrThrowArgument(path, options2, print3)];
}
function returnArgumentHasLeadingComment(options2, argument) {
  if (hasLeadingOwnLineComment(options2.originalText, argument) || hasComment(
    argument,
    CommentCheckFlags.Leading,
    (comment) => has_newline_in_range_default(
      options2.originalText,
      locStart(comment),
      locEnd(comment)
    )
  ) && !isJsxElement(argument)) {
    return true;
  }
  if (hasNakedLeftSide(argument)) {
    let leftMost = argument;
    let newLeftMost;
    while (newLeftMost = getLeftSide(leftMost)) {
      leftMost = newLeftMost;
      if (hasLeadingOwnLineComment(options2.originalText, leftMost)) {
        return true;
      }
    }
  }
  return false;
}

// src/language-js/print/arrow-function.js
var shouldAddParensIfNotBreakCache = /* @__PURE__ */ new WeakMap();
function shouldAddParensIfNotBreak(node) {
  return false;
  if (!shouldAddParensIfNotBreakCache.has(node)) {
    shouldAddParensIfNotBreakCache.set(
      node,
      node.type === "ConditionalExpression" && !startsWithNoLookaheadToken(
        node,
        (node2) => node2.type === "ObjectExpression"
      )
    );
  }
  return shouldAddParensIfNotBreakCache.get(node);
}
var shouldAlwaysAddParens = (node) => node.type === "SequenceExpression";
function printArrowFunction(path, options2, print3, args = {}) {
  const signatureDocs = [];
  let bodyDoc;
  const bodyComments = [];
  let shouldBreakChain = false;
  const shouldPrintAsChain = !args.expandLastArg && path.node.body.type === "ArrowFunctionExpression";
  let functionBody;
  (function rec() {
    const { node } = path;
    const signatureDoc = printArrowFunctionSignature(
      path,
      options2,
      print3,
      args
    );
    if (signatureDocs.length === 0) {
      signatureDocs.push(signatureDoc);
    } else {
      const { leading, trailing } = printCommentsSeparately(path, options2);
      signatureDocs.push([leading, signatureDoc]);
      bodyComments.unshift(trailing);
    }
    if (shouldPrintAsChain) {
      shouldBreakChain ||= // Always break the chain if:
      node.returnType && getFunctionParameters(node).length > 0 || node.typeParameters || getFunctionParameters(node).some(
        (param) => param.type !== "Identifier"
      );
    }
    if (!shouldPrintAsChain || node.body.type !== "ArrowFunctionExpression") {
      bodyDoc = print3("body", args);
      functionBody = node.body;
    } else {
      path.call(rec, "body");
    }
  })();
  const shouldPutBodyOnSameLine = !hasLeadingOwnLineComment(options2.originalText, functionBody) && (shouldAlwaysAddParens(functionBody) || mayBreakAfterShortPrefix(functionBody, bodyDoc, options2) || !shouldBreakChain && shouldAddParensIfNotBreak(functionBody));
  const isCallee = path.key === "callee" && isCallLikeExpression(path.parent);
  const chainGroupId = Symbol("arrow-chain");
  const signaturesDoc = printArrowFunctionSignatures(path, args, {
    signatureDocs,
    shouldBreak: shouldBreakChain
  });
  let shouldBreakSignatures = false;
  let shouldIndentSignatures = false;
  let shouldPrintSoftlineInIndent = false;
  if (shouldPrintAsChain && (isCallee || // isAssignmentRhs
  args.assignmentLayout)) {
    shouldIndentSignatures = true;
    shouldPrintSoftlineInIndent = !hasComment(
      path.node,
      CommentCheckFlags.Leading & CommentCheckFlags.Line
    );
    shouldBreakSignatures = args.assignmentLayout === "chain-tail-arrow-chain" || isCallee && !shouldPutBodyOnSameLine;
  }
  bodyDoc = printArrowFunctionBody(path, options2, args, {
    bodyDoc,
    bodyComments,
    functionBody,
    shouldPutBodyOnSameLine
  });
  return group([
    group(
      shouldIndentSignatures ? indent([shouldPrintSoftlineInIndent ? softline : "", signaturesDoc]) : signaturesDoc,
      { shouldBreak: shouldBreakSignatures, id: chainGroupId }
    ),
    " =>",
    shouldPrintAsChain ? indentIfBreak(bodyDoc, { groupId: chainGroupId }) : group(bodyDoc),
    shouldPrintAsChain && isCallee ? ifBreak(softline, "", { groupId: chainGroupId }) : ""
  ]);
}
function printArrowFunctionSignature(path, options2, print3, args) {
  const { node } = path;
  const parts = [];
  if (node.async) {
    parts.push("async ");
  }
  if (shouldPrintParamsWithoutParens(path, options2)) {
    parts.push(print3(["params", 0]));
  } else {
    const expandArg = args.expandLastArg || args.expandFirstArg;
    let returnTypeDoc = printReturnType(path, print3);
    if (expandArg) {
      if (willBreak(returnTypeDoc)) {
        throw new ArgExpansionBailout();
      }
      returnTypeDoc = group(removeLines(returnTypeDoc));
    }
    parts.push(
      group([
        printFunctionParameters(
          path,
          options2,
          print3,
          expandArg,
          /* printTypeParams */
          true
        ),
        returnTypeDoc
      ])
    );
  }
  const dangling = printDanglingComments(path, options2, {
    filter(comment) {
      const nextCharacter = get_next_non_space_non_comment_character_index_default(
        options2.originalText,
        locEnd(comment)
      );
      return nextCharacter !== false && options2.originalText.slice(nextCharacter, nextCharacter + 2) === "=>";
    }
  });
  if (dangling) {
    parts.push(" ", dangling);
  }
  return parts;
}
function mayBreakAfterShortPrefix(functionBody, bodyDoc, options2) {
  return isArrayExpression(functionBody) || isObjectExpression(functionBody) || functionBody.type === "ArrowFunctionExpression" || functionBody.type === "DoExpression" || functionBody.type === "BlockStatement" || isJsxElement(functionBody) || bodyDoc.label?.hug !== false && (bodyDoc.label?.embed || isTemplateOnItsOwnLine(functionBody, options2.originalText));
}
function printArrowFunctionSignatures(path, args, { signatureDocs, shouldBreak }) {
  if (signatureDocs.length === 1) {
    return signatureDocs[0];
  }
  const { parent, key } = path;
  if (key !== "callee" && isCallLikeExpression(parent) || isBinaryish(parent)) {
    return group(
      [
        signatureDocs[0],
        " =>",
        indent([line, join([" =>", line], signatureDocs.slice(1))])
      ],
      { shouldBreak }
    );
  }
  if (key === "callee" && isCallLikeExpression(parent) || // isAssignmentRhs
  args.assignmentLayout) {
    return group(join([" =>", line], signatureDocs), { shouldBreak });
  }
  return group(indent(join([" =>", line], signatureDocs)), { shouldBreak });
}
function printArrowFunctionBody(path, options2, args, { bodyDoc, bodyComments, functionBody, shouldPutBodyOnSameLine }) {
  const { node, parent } = path;
  const trailingComma = args.expandLastArg && shouldPrintComma(options2, "all") ? ifBreak(",") : "";
  const trailingSpace = (args.expandLastArg || parent.type === "JSXExpressionContainer") && !hasComment(node) ? softline : "";
  if (shouldPutBodyOnSameLine && shouldAddParensIfNotBreak(functionBody)) {
    return [
      " ",
      group([
        ifBreak("", "("),
        indent([softline, bodyDoc]),
        ifBreak("", ")"),
        trailingComma,
        trailingSpace
      ]),
      bodyComments
    ];
  }
  return shouldPutBodyOnSameLine ? [" ", bodyDoc, bodyComments] : [indent([line, bodyDoc, bodyComments]), trailingComma, trailingSpace];
}

// src/language-js/print/statement.js
function printStatementSequence(path, options2, print3, property) {
  const { node } = path;
  const parts = [];
  const lastStatement = array_find_last_default(
    /* isOptionalObject */
    false,
    node[property],
    (statement) => statement.type !== "EmptyStatement"
  );
  path.each(({ node: node2 }) => {
    if (node2.type === "EmptyStatement") {
      return;
    }
    parts.push(print3());
    if (node2 !== lastStatement) {
      parts.push(hardline);
      if (isNextLineEmpty2(node2, options2)) {
        parts.push(hardline);
      }
    }
  }, property);
  return parts;
}

// src/language-js/print/block.js
function printBlock(path, options2, print3) {
  const bodyDoc = printBlockBody(path, options2, print3);
  const { node, parent } = path;
  if (node.type === "Program" && parent?.type !== "ModuleExpression") {
    return bodyDoc ? [bodyDoc, hardline] : "";
  }
  const parts = [];
  if (node.type === "StaticBlock") {
    parts.push("static ");
  }
  parts.push("{");
  if (bodyDoc) {
    parts.push(indent([hardline, bodyDoc]), hardline);
  } else {
    const parentParent = path.grandparent;
    if (!(parent.type === "ArrowFunctionExpression" || parent.type === "FunctionExpression" || parent.type === "FunctionDeclaration" || parent.type === "ComponentDeclaration" || parent.type === "HookDeclaration" || parent.type === "ObjectMethod" || parent.type === "ClassMethod" || parent.type === "ClassPrivateMethod" || parent.type === "ForStatement" || parent.type === "WhileStatement" || parent.type === "DoWhileStatement" || parent.type === "DoExpression" || parent.type === "ModuleExpression" || parent.type === "CatchClause" && !parentParent.finalizer || parent.type === "TSModuleDeclaration" || node.type === "StaticBlock")) {
      parts.push(hardline);
    }
  }
  parts.push("}");
  return parts;
}
function printBlockBody(path, options2, print3) {
  const { node } = path;
  const hasDirectives = is_non_empty_array_default(node.directives);
  const hasBody = node.body.some((node2) => node2.type !== "EmptyStatement");
  const hasDanglingComments = hasComment(node, CommentCheckFlags.Dangling);
  if (!hasDirectives && !hasBody && !hasDanglingComments) {
    return "";
  }
  const parts = [];
  if (hasDirectives) {
    parts.push(printStatementSequence(path, options2, print3, "directives"));
    if (hasBody || hasDanglingComments) {
      parts.push(hardline);
      if (isNextLineEmpty2(at_default(
        /* isOptionalObject */
        false,
        node.directives,
        -1
      ), options2)) {
        parts.push(hardline);
      }
    }
  }
  if (hasBody) {
    parts.push(printStatementSequence(path, options2, print3, "body"));
  }
  if (hasDanglingComments) {
    parts.push(printDanglingComments(path, options2));
  }
  return parts;
}

// src/utils/create-group-id-mapper.js
function createGroupIdMapper(description) {
  const groupIds = /* @__PURE__ */ new WeakMap();
  return function(node) {
    if (!groupIds.has(node)) {
      groupIds.set(node, Symbol(description));
    }
    return groupIds.get(node);
  };
}
var create_group_id_mapper_default = createGroupIdMapper;

// src/language-js/print/type-parameters.js
var getTypeParametersGroupId = create_group_id_mapper_default("typeParameters");
function shouldForceTrailingComma(path, options2, paramsKey) {
  const { node } = path;
  return getFunctionParameters(node).length === 1 && node.type.startsWith("TS") && !node[paramsKey][0].constraint && path.parent.type === "ArrowFunctionExpression" && !(options2.filepath && /\.ts$/u.test(options2.filepath));
}
function printTypeParameters(path, options2, print3, paramsKey) {
  const { node } = path;
  if (!node[paramsKey]) {
    return "";
  }
  if (!Array.isArray(node[paramsKey])) {
    return print3(paramsKey);
  }
  const isParameterInTestCall = isTestCall(path.grandparent);
  const isArrowFunctionVariable = path.match(
    (node2) => !(node2[paramsKey].length === 1 && isObjectType(node2[paramsKey][0])),
    void 0,
    (node2, name) => name === "typeAnnotation",
    (node2) => node2.type === "Identifier",
    isArrowFunctionVariableDeclarator
  );
  const shouldInline = node[paramsKey].length === 0 || !isArrowFunctionVariable && (isParameterInTestCall || node[paramsKey].length === 1 && (node[paramsKey][0].type === "NullableTypeAnnotation" || shouldHugType(node[paramsKey][0])));
  if (shouldInline) {
    return [
      "<",
      join(", ", path.map(print3, paramsKey)),
      printDanglingCommentsForInline(path, options2),
      ">"
    ];
  }
  const trailingComma = node.type === "TSTypeParameterInstantiation" ? "" : shouldForceTrailingComma(path, options2, paramsKey) ? "," : shouldPrintComma(options2) ? ifBreak(",") : "";
  return group(
    [
      "<",
      indent([softline, join([",", line], path.map(print3, paramsKey))]),
      trailingComma,
      softline,
      ">"
    ],
    { id: getTypeParametersGroupId(node) }
  );
}
function printDanglingCommentsForInline(path, options2) {
  const { node } = path;
  if (!hasComment(node, CommentCheckFlags.Dangling)) {
    return "";
  }
  const hasOnlyBlockComments = !hasComment(node, CommentCheckFlags.Line);
  const printed = printDanglingComments(path, options2, {
    indent: !hasOnlyBlockComments
  });
  if (hasOnlyBlockComments) {
    return printed;
  }
  return [printed, hardline];
}
function printTypeParameter(path, options2, print3) {
  const { node } = path;
  const parts = [node.const ? "const " : ""];
  const name = node.type === "TSTypeParameter" ? print3("name") : node.name;
  if (node.variance) {
    parts.push(print3("variance"));
  }
  if (node.in) {
    parts.push("in ");
  }
  if (node.out) {
    parts.push("out ");
  }
  parts.push(name);
  if (node.bound) {
    if (node.usesExtendsBound) {
      parts.push(" extends ");
    }
    parts.push(printTypeAnnotationProperty(path, print3, "bound"));
  }
  if (node.constraint) {
    const groupId = Symbol("constraint");
    parts.push(
      " extends",
      group(indent(line), { id: groupId }),
      lineSuffixBoundary,
      indentIfBreak(print3("constraint"), { groupId })
    );
  }
  if (node.default) {
    parts.push(" = ", print3("default"));
  }
  return group(parts);
}

// src/language-js/print/class.js
var isClassProperty = create_type_check_function_default([
  "ClassProperty",
  "PropertyDefinition",
  "ClassPrivateProperty",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractPropertyDefinition",
  "TSAbstractAccessorProperty"
]);
function printClass(path, options2, print3) {
  const { node } = path;
  const parts = [printDeclareToken(path), printAbstractToken(path), "class"];
  const groupMode = hasComment(node.id, CommentCheckFlags.Trailing) || hasComment(node.typeParameters, CommentCheckFlags.Trailing) || hasComment(node.superClass) || is_non_empty_array_default(node.extends) || // DeclareClass
  is_non_empty_array_default(node.mixins) || is_non_empty_array_default(node.implements);
  const partsGroup = [];
  const extendsParts = [];
  if (node.id) {
    partsGroup.push(" ", print3("id"));
  }
  partsGroup.push(print3("typeParameters"));
  if (node.superClass) {
    const printed = [
      printSuperClass(path, options2, print3),
      print3(
        // TODO: Use `superTypeArguments` only when babel align with TS.
        node.superTypeArguments ? "superTypeArguments" : "superTypeParameters"
      )
    ];
    const printedWithComments = path.call(
      (superClass) => ["extends ", printComments(superClass, printed, options2)],
      "superClass"
    );
    if (groupMode) {
      extendsParts.push(line, group(printedWithComments));
    } else {
      extendsParts.push(" ", printedWithComments);
    }
  } else {
    extendsParts.push(printHeritageClauses(path, options2, print3, "extends"));
  }
  extendsParts.push(
    printHeritageClauses(path, options2, print3, "mixins"),
    printHeritageClauses(path, options2, print3, "implements")
  );
  let heritageGroupId;
  if (groupMode) {
    let printedPartsGroup;
    if (shouldIndentOnlyHeritageClauses(node)) {
      printedPartsGroup = [...partsGroup, indent(extendsParts)];
    } else {
      printedPartsGroup = indent([...partsGroup, extendsParts]);
    }
    heritageGroupId = getHeritageGroupId(node);
    parts.push(group(printedPartsGroup, { id: heritageGroupId }));
  } else {
    parts.push(...partsGroup, ...extendsParts);
  }
  const classBody = node.body;
  if (groupMode && is_non_empty_array_default(classBody.body)) {
    parts.push(ifBreak(hardline, " ", { groupId: heritageGroupId }));
  } else {
    parts.push(" ");
  }
  parts.push(print3("body"));
  return parts;
}
var getHeritageGroupId = create_group_id_mapper_default("heritageGroup");
function printHardlineAfterHeritage(node) {
  return ifBreak(hardline, "", { groupId: getHeritageGroupId(node) });
}
function hasMultipleHeritage(node) {
  return ["extends", "mixins", "implements"].reduce(
    (count, key) => count + (Array.isArray(node[key]) ? node[key].length : 0),
    node.superClass ? 1 : 0
  ) > 1;
}
function shouldIndentOnlyHeritageClauses(node) {
  return node.typeParameters && !hasComment(
    node.typeParameters,
    CommentCheckFlags.Trailing | CommentCheckFlags.Line
  ) && !hasMultipleHeritage(node);
}
function printHeritageClauses(path, options2, print3, listName) {
  const { node } = path;
  if (!is_non_empty_array_default(node[listName])) {
    return "";
  }
  const printedLeadingComments = printDanglingComments(path, options2, {
    marker: listName
  });
  return [
    shouldIndentOnlyHeritageClauses(node) ? ifBreak(" ", line, {
      groupId: getTypeParametersGroupId(node.typeParameters)
    }) : line,
    printedLeadingComments,
    printedLeadingComments && hardline,
    listName,
    group(indent([line, join([",", line], path.map(print3, listName))]))
  ];
}
function printSuperClass(path, options2, print3) {
  const printed = print3("superClass");
  const { parent } = path;
  if (parent.type === "AssignmentExpression") {
    return group(
      ifBreak(["(", indent([softline, printed]), softline, ")"], printed)
    );
  }
  return printed;
}
function printClassMethod(path, options2, print3) {
  const { node } = path;
  const parts = [];
  if (is_non_empty_array_default(node.decorators)) {
    parts.push(printClassMemberDecorators(path, options2, print3));
  }
  parts.push(printTypeScriptAccessibilityToken(node));
  if (node.static) {
    parts.push("static ");
  }
  parts.push(printAbstractToken(path));
  if (node.override) {
    parts.push("override ");
  }
  parts.push(printMethod(path, options2, print3));
  return parts;
}
function printClassProperty(path, options2, print3) {
  const { node } = path;
  const parts = [];
  const semi = options2.semi ? ";" : "";
  if (is_non_empty_array_default(node.decorators)) {
    parts.push(printClassMemberDecorators(path, options2, print3));
  }
  parts.push(printDeclareToken(path), printTypeScriptAccessibilityToken(node));
  if (node.static) {
    parts.push("static ");
  }
  parts.push(printAbstractToken(path));
  if (node.override) {
    parts.push("override ");
  }
  if (node.readonly) {
    parts.push("readonly ");
  }
  if (node.variance) {
    parts.push(print3("variance"));
  }
  if (node.type === "ClassAccessorProperty" || node.type === "AccessorProperty" || node.type === "TSAbstractAccessorProperty") {
    parts.push("accessor ");
  }
  parts.push(
    printPropertyKey(path, options2, print3),
    printOptionalToken(path),
    printDefiniteToken(path),
    printTypeAnnotationProperty(path, print3)
  );
  const isAbstractProperty = node.type === "TSAbstractPropertyDefinition" || node.type === "TSAbstractAccessorProperty";
  return [
    printAssignment(
      path,
      options2,
      print3,
      parts,
      " =",
      isAbstractProperty ? void 0 : "value"
    ),
    semi
  ];
}
function printClassBody(path, options2, print3) {
  const { node } = path;
  const parts = [];
  path.each(({ node: node2, next, isLast }) => {
    parts.push(print3());
    if (!options2.semi && isClassProperty(node2) && shouldPrintSemicolonAfterClassProperty(node2, next)) {
      parts.push(";");
    }
    if (!isLast) {
      parts.push(hardline);
      if (isNextLineEmpty2(node2, options2)) {
        parts.push(hardline);
      }
    }
  }, "body");
  if (hasComment(node, CommentCheckFlags.Dangling)) {
    parts.push(printDanglingComments(path, options2));
  }
  return [
    "{",
    parts.length > 0 ? [indent([hardline, parts]), hardline] : "",
    "}"
  ];
}
function shouldPrintSemicolonAfterClassProperty(node, nextNode) {
  const { type, name } = node.key;
  if (!node.computed && type === "Identifier" && (name === "static" || name === "get" || name === "set") && !node.value && !node.typeAnnotation) {
    return true;
  }
  if (!nextNode) {
    return false;
  }
  if (nextNode.static || nextNode.accessibility || // TypeScript
  nextNode.readonly) {
    return false;
  }
  if (!nextNode.computed) {
    const name2 = nextNode.key?.name;
    if (name2 === "in" || name2 === "instanceof") {
      return true;
    }
  }
  if (isClassProperty(nextNode) && nextNode.variance && !nextNode.static && !nextNode.declare) {
    return true;
  }
  switch (nextNode.type) {
    case "ClassProperty":
    case "PropertyDefinition":
    case "TSAbstractPropertyDefinition":
      return nextNode.computed;
    case "MethodDefinition":
    case "TSAbstractMethodDefinition":
    case "ClassMethod":
    case "ClassPrivateMethod": {
      const isAsync = nextNode.value ? nextNode.value.async : nextNode.async;
      if (isAsync || nextNode.kind === "get" || nextNode.kind === "set") {
        return false;
      }
      const isGenerator = nextNode.value ? nextNode.value.generator : nextNode.generator;
      if (nextNode.computed || isGenerator) {
        return true;
      }
      return false;
    }
    case "TSIndexSignature":
      return true;
  }
  return false;
}

// src/language-js/utils/vue-event-binding.js
var isVueEventBindingTsNode = create_type_check_function_default([
  "TSAsExpression",
  // `foo as number`
  "TSTypeAssertion",
  // `(<number>foo)`
  "TSNonNullExpression",
  // `foo!`
  "TSInstantiationExpression",
  // `foo<string>`
  "TSSatisfiesExpression"
  // `foo satisfies T`
]);
function unwrapVueEventBindingTsNode(node) {
  if (isVueEventBindingTsNode(node)) {
    return unwrapVueEventBindingTsNode(node.expression);
  }
  return node;
}
var isVueEventBindingFunctionExpression = create_type_check_function_default([
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
function isVueEventBindingMemberExpression(node) {
  return node.type === "MemberExpression" || node.type === "OptionalMemberExpression" || node.type === "Identifier" && node.name !== "undefined";
}

// src/language-js/print/semicolon.js
function shouldPrintLeadingSemicolon(path, options2) {
  if (options2.semi || isSingleJsxExpressionStatementInMarkdown(path, options2) || isSingleVueEventBindingExpressionStatement(path, options2)) {
    return false;
  }
  const { node, key, parent } = path;
  if (node.type === "ExpressionStatement" && // `Program.directives` don't need leading semicolon
  (key === "body" && (parent.type === "Program" || parent.type === "BlockStatement" || parent.type === "StaticBlock" || parent.type === "TSModuleBlock") || key === "consequent" && parent.type === "SwitchCase") && path.call(() => expressionNeedsASIProtection(path, options2), "expression")) {
    return true;
  }
  return false;
}
function expressionNeedsASIProtection(path, options2) {
  const { node } = path;
  switch (node.type) {
    case "ParenthesizedExpression":
    case "TypeCastExpression":
    case "ArrayExpression":
    case "ArrayPattern":
    case "TemplateLiteral":
    case "TemplateElement":
    case "RegExpLiteral":
      return true;
    case "ArrowFunctionExpression":
      if (!shouldPrintParamsWithoutParens(path, options2)) {
        return true;
      }
      break;
    case "UnaryExpression": {
      const { prefix, operator } = node;
      if (prefix && (operator === "+" || operator === "-")) {
        return true;
      }
      break;
    }
    case "BindExpression":
      if (!node.object) {
        return true;
      }
      break;
    case "Literal":
      if (node.regex) {
        return true;
      }
      break;
    default:
      if (isJsxElement(node)) {
        return true;
      }
  }
  if (needs_parens_default(path, options2)) {
    return true;
  }
  if (!hasNakedLeftSide(node)) {
    return false;
  }
  return path.call(
    () => expressionNeedsASIProtection(path, options2),
    ...getLeftSidePathName(node)
  );
}
function isSingleJsxExpressionStatementInMarkdown({ node, parent }, options2) {
  return (options2.parentParser === "markdown" || options2.parentParser === "mdx") && node.type === "ExpressionStatement" && isJsxElement(node.expression) && parent.type === "Program" && parent.body.length === 1;
}
function isSingleVueEventBindingExpressionStatement({ node, parent }, options2) {
  return (options2.parser === "__vue_event_binding" || options2.parser === "__vue_ts_event_binding") && node.type === "ExpressionStatement" && parent.type === "Program" && parent.body.length === 1;
}

// src/language-js/print/expression-statement.js
function printExpressionStatement(path, options2, print3) {
  const parts = [print3("expression")];
  if (isSingleVueEventBindingExpressionStatement(path, options2)) {
    const expression = unwrapVueEventBindingTsNode(path.node.expression);
    if (isVueEventBindingFunctionExpression(expression) || isVueEventBindingMemberExpression(expression)) {
      parts.push(";");
    }
  } else if (isSingleJsxExpressionStatementInMarkdown(path, options2)) {
  } else if (options2.semi) {
    parts.push(";");
  }
  return parts;
}

// src/language-js/print/html-binding.js
function printHtmlBinding(path, options2, print3) {
  if (options2.__isVueBindings || options2.__isVueForBindingLeft) {
    const parameterDocs = path.map(print3, "program", "body", 0, "params");
    if (parameterDocs.length === 1) {
      return parameterDocs[0];
    }
    const doc = join([",", line], parameterDocs);
    return options2.__isVueForBindingLeft ? ["(", indent([softline, group(doc)]), softline, ")"] : doc;
  }
  if (options2.__isEmbeddedTypescriptGenericParameters) {
    const parameterDocs = path.map(
      print3,
      "program",
      "body",
      0,
      "typeParameters",
      "params"
    );
    return join([",", line], parameterDocs);
  }
}

// src/language-js/print/literal.js
function printLiteral(path, options2) {
  const { node } = path;
  switch (node.type) {
    case "RegExpLiteral":
      return printRegex(node);
    case "BigIntLiteral":
      return printBigInt(node.extra.raw);
    case "NumericLiteral":
      return print_number_default(node.extra.raw);
    case "StringLiteral":
      return replaceEndOfLine(print_string_default(node.extra.raw, options2));
    case "NullLiteral":
      return "null";
    case "BooleanLiteral":
      return String(node.value);
    case "DirectiveLiteral":
      return printDirective(node.extra.raw, options2);
    case "Literal": {
      if (node.regex) {
        return printRegex(node.regex);
      }
      if (node.bigint) {
        return printBigInt(node.raw);
      }
      const { value } = node;
      if (typeof value === "number") {
        return print_number_default(node.raw);
      }
      if (typeof value === "string") {
        return isDirective(path) ? printDirective(node.raw, options2) : replaceEndOfLine(print_string_default(node.raw, options2));
      }
      return String(value);
    }
  }
}
function isDirective(path) {
  if (path.key !== "expression") {
    return;
  }
  const { parent } = path;
  return parent.type === "ExpressionStatement" && typeof parent.directive === "string";
}
function printBigInt(raw) {
  return raw.toLowerCase();
}
function printRegex({ pattern, flags }) {
  flags = [...flags].sort().join("");
  return `/${pattern}/${flags}`;
}
function printDirective(rawText, options2) {
  const rawContent = rawText.slice(1, -1);
  if (rawContent.includes('"') || rawContent.includes("'")) {
    return rawText;
  }
  const enclosingQuote = options2.singleQuote ? "'" : '"';
  return enclosingQuote + rawContent + enclosingQuote;
}

// src/language-js/print/module.js
function printImportDeclaration(path, options2, print3) {
  const { node } = path;
  return [
    "import",
    node.phase ? ` ${node.phase}` : "",
    printImportKind(node),
    printModuleSpecifiers(path, options2, print3),
    printModuleSource(path, options2, print3),
    printImportAttributes(path, options2, print3),
    options2.semi ? ";" : ""
  ];
}
var isDefaultExport = (node) => node.type === "ExportDefaultDeclaration" || node.type === "DeclareExportDeclaration" && node.default;
function printExportDeclaration(path, options2, print3) {
  const { node } = path;
  const parts = [
    printDecoratorsBeforeExport(path, options2, print3),
    printDeclareToken(path),
    "export",
    isDefaultExport(node) ? " default" : ""
  ];
  const { declaration, exported } = node;
  if (hasComment(node, CommentCheckFlags.Dangling)) {
    parts.push(" ", printDanglingComments(path, options2));
    if (needsHardlineAfterDanglingComment(node)) {
      parts.push(hardline);
    }
  }
  if (declaration) {
    parts.push(" ", print3("declaration"));
  } else {
    parts.push(printExportKind(node));
    if (node.type === "ExportAllDeclaration" || node.type === "DeclareExportAllDeclaration") {
      parts.push(" *");
      if (exported) {
        parts.push(" as ", print3("exported"));
      }
    } else {
      parts.push(printModuleSpecifiers(path, options2, print3));
    }
    parts.push(
      printModuleSource(path, options2, print3),
      printImportAttributes(path, options2, print3)
    );
  }
  parts.push(printSemicolonAfterExportDeclaration(node, options2));
  return parts;
}
var shouldOmitSemicolon = create_type_check_function_default([
  "ClassDeclaration",
  "ComponentDeclaration",
  "FunctionDeclaration",
  "TSInterfaceDeclaration",
  "DeclareClass",
  "DeclareComponent",
  "DeclareFunction",
  "DeclareHook",
  "HookDeclaration",
  "TSDeclareFunction",
  "EnumDeclaration"
]);
function printSemicolonAfterExportDeclaration(node, options2) {
  if (options2.semi && (!node.declaration || isDefaultExport(node) && !shouldOmitSemicolon(node.declaration))) {
    return ";";
  }
  return "";
}
function printImportOrExportKind(kind, spaceBeforeKind = true) {
  return kind && kind !== "value" ? `${spaceBeforeKind ? " " : ""}${kind}${spaceBeforeKind ? "" : " "}` : "";
}
function printImportKind(node, spaceBeforeKind) {
  return printImportOrExportKind(node.importKind, spaceBeforeKind);
}
function printExportKind(node) {
  return printImportOrExportKind(node.exportKind);
}
function printModuleSource(path, options2, print3) {
  const { node } = path;
  if (!node.source) {
    return "";
  }
  const parts = [];
  if (shouldPrintSpecifiers(node, options2)) {
    parts.push(" from");
  }
  parts.push(" ", print3("source"));
  return parts;
}
function printModuleSpecifiers(path, options2, print3) {
  const { node } = path;
  if (!shouldPrintSpecifiers(node, options2)) {
    return "";
  }
  const parts = [" "];
  if (is_non_empty_array_default(node.specifiers)) {
    const standaloneSpecifiers = [];
    const groupedSpecifiers = [];
    path.each(() => {
      const specifierType = path.node.type;
      if (specifierType === "ExportNamespaceSpecifier" || specifierType === "ExportDefaultSpecifier" || specifierType === "ImportNamespaceSpecifier" || specifierType === "ImportDefaultSpecifier") {
        standaloneSpecifiers.push(print3());
      } else if (specifierType === "ExportSpecifier" || specifierType === "ImportSpecifier") {
        groupedSpecifiers.push(print3());
      } else {
        throw new unexpected_node_error_default(node, "specifier");
      }
    }, "specifiers");
    parts.push(join(", ", standaloneSpecifiers));
    if (groupedSpecifiers.length > 0) {
      if (standaloneSpecifiers.length > 0) {
        parts.push(", ");
      }
      const canBreak2 = groupedSpecifiers.length > 1 || standaloneSpecifiers.length > 0 || node.specifiers.some((node2) => hasComment(node2));
      if (canBreak2) {
        parts.push(
          group([
            "{",
            indent([
              options2.bracketSpacing ? line : softline,
              join([",", line], groupedSpecifiers)
            ]),
            ifBreak(shouldPrintComma(options2) ? "," : ""),
            options2.bracketSpacing ? line : softline,
            "}"
          ])
        );
      } else {
        parts.push([
          "{",
          options2.bracketSpacing ? " " : "",
          ...groupedSpecifiers,
          options2.bracketSpacing ? " " : "",
          "}"
        ]);
      }
    }
  } else {
    parts.push("{}");
  }
  return parts;
}
function shouldPrintSpecifiers(node, options2) {
  if (node.type !== "ImportDeclaration" || is_non_empty_array_default(node.specifiers) || node.importKind === "type") {
    return true;
  }
  const text = get_text_without_comments_default(
    options2,
    locStart(node),
    locStart(node.source)
  );
  return text.trimEnd().endsWith("from");
}
function getImportAttributesKeyword(node, options2) {
  if (node.extra?.deprecatedAssertSyntax) {
    return "assert";
  }
  const textBetweenSourceAndAttributes = get_text_without_comments_default(
    options2,
    locEnd(node.source),
    node.attributes?.[0] ? locStart(node.attributes[0]) : locEnd(node)
  ).trimStart();
  if (textBetweenSourceAndAttributes.startsWith("assert")) {
    return "assert";
  }
  if (textBetweenSourceAndAttributes.startsWith("with")) {
    return "with";
  }
  return is_non_empty_array_default(node.attributes) ? "with" : void 0;
}
function printImportAttributes(path, options2, print3) {
  const { node } = path;
  if (!node.source) {
    return "";
  }
  const keyword = getImportAttributesKeyword(node, options2);
  if (!keyword) {
    return "";
  }
  const parts = [` ${keyword} {`];
  if (is_non_empty_array_default(node.attributes)) {
    if (options2.bracketSpacing) {
      parts.push(" ");
    }
    parts.push(join(", ", path.map(print3, "attributes")));
    if (options2.bracketSpacing) {
      parts.push(" ");
    }
  }
  parts.push("}");
  return parts;
}
function printModuleSpecifier(path, options2, print3) {
  const { node } = path;
  const { type } = node;
  const isImportSpecifier = type.startsWith("Import");
  const leftSideProperty = isImportSpecifier ? "imported" : "local";
  const rightSideProperty = isImportSpecifier ? "local" : "exported";
  const leftSideNode = node[leftSideProperty];
  const rightSideNode = node[rightSideProperty];
  let left = "";
  let right = "";
  if (type === "ExportNamespaceSpecifier" || type === "ImportNamespaceSpecifier") {
    left = "*";
  } else if (leftSideNode) {
    left = print3(leftSideProperty);
  }
  if (rightSideNode && !isShorthandSpecifier(node)) {
    right = print3(rightSideProperty);
  }
  return [
    printImportOrExportKind(
      type === "ImportSpecifier" ? node.importKind : node.exportKind,
      /* spaceBeforeKind */
      false
    ),
    left,
    left && right ? " as " : "",
    right
  ];
}
function isShorthandSpecifier(specifier) {
  if (specifier.type !== "ImportSpecifier" && specifier.type !== "ExportSpecifier") {
    return false;
  }
  const {
    local,
    [specifier.type === "ImportSpecifier" ? "imported" : "exported"]: importedOrExported
  } = specifier;
  if (local.type !== importedOrExported.type || !hasSameLoc(local, importedOrExported)) {
    return false;
  }
  if (isStringLiteral(local)) {
    return local.value === importedOrExported.value && get_raw_default(local) === get_raw_default(importedOrExported);
  }
  switch (local.type) {
    case "Identifier":
      return local.name === importedOrExported.name;
    default:
      return false;
  }
}

// src/language-js/print/object.js
function printObject(path, options2, print3) {
  const semi = options2.semi ? ";" : "";
  const { node } = path;
  const isTypeAnnotation = node.type === "ObjectTypeAnnotation";
  const isEnumBody = node.type === "TSEnumBody" || node.type === "EnumBooleanBody" || node.type === "EnumNumberBody" || node.type === "EnumBigIntBody" || node.type === "EnumStringBody" || node.type === "EnumSymbolBody";
  const fields = [
    node.type === "TSTypeLiteral" || isEnumBody ? "members" : node.type === "TSInterfaceBody" ? "body" : "properties"
  ];
  if (isTypeAnnotation) {
    fields.push("indexers", "callProperties", "internalSlots");
  }
  const propsAndLoc = fields.flatMap(
    (field) => path.map(
      ({ node: node2 }) => ({
        node: node2,
        printed: print3(),
        loc: locStart(node2)
      }),
      field
    )
  );
  if (fields.length > 1) {
    propsAndLoc.sort((a, b) => a.loc - b.loc);
  }
  const { parent, key } = path;
  const isFlowInterfaceLikeBody = isTypeAnnotation && key === "body" && (parent.type === "InterfaceDeclaration" || parent.type === "DeclareInterface" || parent.type === "DeclareClass");
  const shouldBreak = (
    /*node.type === "TSInterfaceBody" ||
    isEnumBody ||
    isFlowInterfaceLikeBody ||
    (node.type === "ObjectPattern" &&
      parent.type !== "FunctionDeclaration" &&
      parent.type !== "FunctionExpression" &&
      parent.type !== "ArrowFunctionExpression" &&
      parent.type !== "ObjectMethod" &&
      parent.type !== "ClassMethod" &&
      parent.type !== "ClassPrivateMethod" &&
      parent.type !== "AssignmentPattern" &&
      parent.type !== "CatchClause" &&
      node.properties.some(
        (property) =>
          property.value &&
          (property.value.type === "ObjectPattern" ||
            property.value.type === "ArrayPattern"),
      )) ||
    (node.type !== "ObjectPattern" &&
      options.objectWrap === "preserve" &&
      propsAndLoc.length > 0 &&
      hasNewlineInRange(
        options.originalText,
        locStart(node),
        propsAndLoc[0].loc,
      ))*/
    false
  );
  const separator = isFlowInterfaceLikeBody ? ";" : node.type === "TSInterfaceBody" || node.type === "TSTypeLiteral" ? ifBreak("", ",") : ",";
  const leftBrace = node.exact ? "{|" : "{";
  const rightBrace = node.exact ? "|}" : "}";
  let separatorParts = [];
  const props = propsAndLoc.map((prop) => {
    const result = [...separatorParts, group(prop.printed)];
    separatorParts = [separator, line];
    if ((prop.node.type === "TSPropertySignature" || prop.node.type === "TSMethodSignature" || prop.node.type === "TSConstructSignatureDeclaration" || prop.node.type === "TSCallSignatureDeclaration") && hasComment(prop.node, CommentCheckFlags.PrettierIgnore)) {
      separatorParts.shift();
    }
    if (isNextLineEmpty2(prop.node, options2)) {
      separatorParts.push(hardline);
    }
    return result;
  });
  if (node.inexact || node.hasUnknownMembers) {
    let printed;
    if (hasComment(node, CommentCheckFlags.Dangling)) {
      const hasLineComments = hasComment(node, CommentCheckFlags.Line);
      const printedDanglingComments = printDanglingComments(path, options2);
      printed = [
        printedDanglingComments,
        hasLineComments || has_newline_default(options2.originalText, locEnd(at_default(
          /* isOptionalObject */
          false,
          getComments(node),
          -1
        ))) ? hardline : line,
        "..."
      ];
    } else {
      printed = ["..."];
    }
    props.push([...separatorParts, ...printed]);
  }
  const lastElem = at_default(
    /* isOptionalObject */
    false,
    propsAndLoc,
    -1
  )?.node;
  const canHaveTrailingSeparator = !(node.inexact || node.hasUnknownMembers || lastElem && (lastElem.type === "RestElement" || (lastElem.type === "TSPropertySignature" || lastElem.type === "TSCallSignatureDeclaration" || lastElem.type === "TSMethodSignature" || lastElem.type === "TSConstructSignatureDeclaration" || lastElem.type === "TSIndexSignature") && hasComment(lastElem, CommentCheckFlags.PrettierIgnore)) || // https://github.com/microsoft/TypeScript/issues/61916
  path.match(
    void 0,
    (node2, key2) => node2.type === "TSImportType" && key2 === "options"
  ));
  let content;
  if (props.length === 0) {
    if (!hasComment(node, CommentCheckFlags.Dangling)) {
      return [leftBrace, rightBrace, printTypeAnnotationProperty(path, print3)];
    }
    content = group([
      leftBrace,
      printDanglingComments(path, options2, { indent: true }),
      softline,
      rightBrace,
      printOptionalToken(path),
      printTypeAnnotationProperty(path, print3)
    ]);
  } else {
    content = [
      isFlowInterfaceLikeBody && is_non_empty_array_default(node.properties) ? printHardlineAfterHeritage(parent) : "",
      leftBrace,
      indent([options2.bracketSpacing ? line : softline, ...props]),
      ifBreak(
        canHaveTrailingSeparator && (separator !== "," || shouldPrintComma(options2)) ? separator : ""
      ),
      options2.bracketSpacing ? line : softline,
      rightBrace,
      printOptionalToken(path),
      printTypeAnnotationProperty(path, print3)
    ];
  }
  if (path.match(
    (node2) => node2.type === "ObjectPattern" && !is_non_empty_array_default(node2.decorators),
    shouldHugTheOnlyParameter
  ) || isObjectType(node) && (path.match(
    void 0,
    (node2, name) => name === "typeAnnotation",
    (node2, name) => name === "typeAnnotation",
    shouldHugTheOnlyParameter
  ) || path.match(
    void 0,
    (node2, name) => node2.type === "FunctionTypeParam" && name === "typeAnnotation",
    shouldHugTheOnlyParameter
  )) || // Assignment printing logic (printAssignment) is responsible
  // for adding a group if needed
  !shouldBreak && path.match(
    (node2) => node2.type === "ObjectPattern",
    (node2) => node2.type === "AssignmentExpression" || node2.type === "VariableDeclarator"
  )) {
    return content;
  }
  return group(content, { shouldBreak });
}
function shouldHugTheOnlyParameter(node, name) {
  return (name === "params" || name === "parameters" || name === "this" || name === "rest") && shouldHugTheOnlyFunctionParameter(node);
}

// src/language-js/print/ternary-old.js
var align2 = (_, doc) => group(doc);
function printTernaryTest(path, options2, print3) {
  const { node } = path;
  const isConditionalExpression = node.type === "ConditionalExpression";
  const alternateNodePropertyName = isConditionalExpression ? "alternate" : "falseType";
  const { parent } = path;
  const printed = isConditionalExpression ? print3("test") : [print3("checkType"), " ", "extends", " ", print3("extendsType")];
  if (parent.type === node.type && parent[alternateNodePropertyName] === node) {
    return align2(2, printed);
  }
  return printed;
}
var ancestorNameMap = /* @__PURE__ */ new Map([
  ["AssignmentExpression", "right"],
  ["VariableDeclarator", "init"],
  ["ReturnStatement", "argument"],
  ["ThrowStatement", "argument"],
  ["UnaryExpression", "argument"],
  ["YieldExpression", "argument"],
  ["AwaitExpression", "argument"]
]);
function shouldExtraIndentForConditionalExpression(path) {
  const { node } = path;
  if (node.type !== "ConditionalExpression") {
    return false;
  }
  let parent;
  let child = node;
  for (let ancestorCount = 0; !parent; ancestorCount++) {
    const node2 = path.getParentNode(ancestorCount);
    if (node2.type === "ChainExpression" && node2.expression === child || isCallExpression(node2) && node2.callee === child || isMemberExpression(node2) && node2.object === child || node2.type === "TSNonNullExpression" && node2.expression === child) {
      child = node2;
      continue;
    }
    if (node2.type === "NewExpression" && node2.callee === child || isBinaryCastExpression(node2) && node2.expression === child) {
      parent = path.getParentNode(ancestorCount + 1);
      child = node2;
    } else {
      parent = node2;
    }
  }
  if (child === node) {
    return false;
  }
  return parent[ancestorNameMap.get(parent.type)] === child;
}
function printTernaryOld(path, options2, print3) {
  const { node } = path;
  const isConditionalExpression = node.type === "ConditionalExpression";
  const consequentNodePropertyName = isConditionalExpression ? "consequent" : "trueType";
  const alternateNodePropertyName = isConditionalExpression ? "alternate" : "falseType";
  const testNodePropertyNames = isConditionalExpression ? ["test"] : ["checkType", "extendsType"];
  const consequentNode = node[consequentNodePropertyName];
  const alternateNode = node[alternateNodePropertyName];
  const parts = [];
  let jsxMode = false;
  const { parent } = path;
  const isParentTest = parent.type === node.type && testNodePropertyNames.some((prop) => parent[prop] === node);
  let forceNoIndent = (
    /*parent.type === node.type && !isParentTest*/
    false
  );
  let currentParent;
  let previousParent;
  let i = 0;
  do {
    previousParent = currentParent || node;
    currentParent = path.getParentNode(i);
    i++;
  } while (currentParent && currentParent.type === node.type && testNodePropertyNames.every(
    (prop) => currentParent[prop] !== previousParent
  ));
  const firstNonConditionalParent = currentParent || parent;
  const lastConditionalParent = previousParent;
  const printBranch = (nodePropertyName) => (
    /*options.useTabs
      ? indent(print(nodePropertyName))
      :*/
    align2(2, print3(nodePropertyName))
  );
  const part = [
    line,
    "? ",
    //consequentNode.type === node.type ? ifBreak("", "(") : "",
    printBranch(consequentNodePropertyName),
    //consequentNode.type === node.type ? ifBreak("", ")") : "",
    line,
    ": ",
    printBranch(alternateNodePropertyName)
  ];
  parts.push(
    parent.type !== node.type || parent[alternateNodePropertyName] === node || isParentTest ? part : options2.useTabs ? dedent(indent(part)) : align2(Math.max(0, options2.tabWidth - 2), part)
  );
  const shouldBreak = [
    consequentNodePropertyName,
    alternateNodePropertyName,
    ...testNodePropertyNames
  ].some(
    (property) => hasComment(
      node[property],
      (comment) => is_block_comment_default(comment) && has_newline_in_range_default(
        options2.originalText,
        locStart(comment),
        locEnd(comment)
      )
    )
  );
  const maybeGroup = (doc) => parent === firstNonConditionalParent ? group(doc, { shouldBreak }) : shouldBreak ? [doc, breakParent] : doc;
  const breakClosingParen = !jsxMode && (isMemberExpression(parent) || parent.type === "NGPipeExpression" && parent.left === node) && !parent.computed;
  const shouldExtraIndent = shouldExtraIndentForConditionalExpression(path);
  const result = maybeGroup([
    printTernaryTest(path, options2, print3),
    forceNoIndent ? parts : indent(parts),
    isConditionalExpression && breakClosingParen && !shouldExtraIndent ? softline : ""
  ]);
  return isParentTest || shouldExtraIndent ? group([indent([softline, result]), softline]) : result;
}

// src/language-js/print/ternary.js
function shouldBreakClosingParen(node, parent) {
  return (isMemberExpression(parent) || parent.type === "NGPipeExpression" && parent.left === node) && !parent.computed;
}
function hasMultilineBlockComments(testNodes, consequentNode, alternateNode, options2) {
  const comments = [
    ...testNodes.map((node) => getComments(node)),
    getComments(consequentNode),
    getComments(alternateNode)
  ].flat();
  return comments.some(
    (comment) => is_block_comment_default(comment) && has_newline_in_range_default(
      options2.originalText,
      locStart(comment),
      locEnd(comment)
    )
  );
}
var ancestorNameMap2 = /* @__PURE__ */ new Map([
  ["AssignmentExpression", "right"],
  ["VariableDeclarator", "init"],
  ["ReturnStatement", "argument"],
  ["ThrowStatement", "argument"],
  ["UnaryExpression", "argument"],
  ["YieldExpression", "argument"],
  ["AwaitExpression", "argument"]
]);
function shouldExtraIndentForConditionalExpression2(path) {
  const { node } = path;
  if (node.type !== "ConditionalExpression") {
    return false;
  }
  let parent;
  let child = node;
  for (let ancestorCount = 0; !parent; ancestorCount++) {
    const node2 = path.getParentNode(ancestorCount);
    if (node2.type === "ChainExpression" && node2.expression === child || isCallExpression(node2) && node2.callee === child || isMemberExpression(node2) && node2.object === child || node2.type === "TSNonNullExpression" && node2.expression === child) {
      child = node2;
      continue;
    }
    if (node2.type === "NewExpression" && node2.callee === child || isBinaryCastExpression(node2) && node2.expression === child) {
      parent = path.getParentNode(ancestorCount + 1);
      child = node2;
    } else {
      parent = node2;
    }
  }
  if (child === node) {
    return false;
  }
  return parent[ancestorNameMap2.get(parent.type)] === child;
}
var wrapInParens = (doc) => [
  ifBreak("("),
  indent([softline, doc]),
  softline,
  ifBreak(")")
];
function printTernary(path, options2, print3, args) {
  if (!options2.experimentalTernaries) {
    return printTernaryOld(path, options2, print3);
  }
  const { node } = path;
  const isConditionalExpression = node.type === "ConditionalExpression";
  const isTSConditional = isConditionalType(node);
  const consequentNodePropertyName = isConditionalExpression ? "consequent" : "trueType";
  const alternateNodePropertyName = isConditionalExpression ? "alternate" : "falseType";
  const testNodePropertyNames = isConditionalExpression ? ["test"] : ["checkType", "extendsType"];
  const consequentNode = node[consequentNodePropertyName];
  const alternateNode = node[alternateNodePropertyName];
  const testNodes = testNodePropertyNames.map((prop) => node[prop]);
  const { parent } = path;
  const isParentTernary = parent.type === node.type;
  const isInTest = isParentTernary && testNodePropertyNames.some((prop) => parent[prop] === node);
  const isInAlternate = isParentTernary && parent[alternateNodePropertyName] === node;
  const isConsequentTernary = consequentNode.type === node.type;
  const isAlternateTernary = alternateNode.type === node.type;
  const isInChain = isAlternateTernary || isInAlternate;
  const isBigTabs = options2.tabWidth > 2 || options2.useTabs;
  let currentParent;
  let previousParent;
  let i = 0;
  do {
    previousParent = currentParent || node;
    currentParent = path.getParentNode(i);
    i++;
  } while (currentParent && currentParent.type === node.type && testNodePropertyNames.every(
    (prop) => currentParent[prop] !== previousParent
  ));
  const firstNonConditionalParent = currentParent || parent;
  const isOnSameLineAsAssignment = args && args.assignmentLayout && args.assignmentLayout !== "break-after-operator" && (parent.type === "AssignmentExpression" || parent.type === "VariableDeclarator" || parent.type === "ClassProperty" || parent.type === "PropertyDefinition" || parent.type === "ClassPrivateProperty" || parent.type === "ObjectProperty" || parent.type === "Property");
  const isOnSameLineAsReturn = (parent.type === "ReturnStatement" || parent.type === "ThrowStatement") && !(isConsequentTernary || isAlternateTernary);
  const isInJsx = isConditionalExpression && firstNonConditionalParent.type === "JSXExpressionContainer" && path.grandparent.type !== "JSXAttribute";
  const shouldExtraIndent = shouldExtraIndentForConditionalExpression2(path);
  const breakClosingParen = shouldBreakClosingParen(node, parent);
  const breakTSClosingParen = isTSConditional && needs_parens_default(path, options2);
  const fillTab = !isBigTabs ? "" : options2.useTabs ? "	" : " ".repeat(options2.tabWidth - 1);
  const shouldBreak = hasMultilineBlockComments(
    testNodes,
    consequentNode,
    alternateNode,
    options2
  ) || isConsequentTernary || isAlternateTernary;
  const tryToParenthesizeAlternate = !isInChain && !isParentTernary && !isTSConditional && (isInJsx ? (
    // In JSX, we want this with a null-consequent to mirror booleans:
    //
    //   {!foo ? null : (
    //     something.else()
    //   )}
    //
    // But not in the general case, where it's (subjectively) better to have things multiline.
    consequentNode.type === "NullLiteral" || consequentNode.type === "Literal" && consequentNode.value === null
  ) : (
    // Right now, we do this when:
    // 1. The test is simple and,
    // 2. The consequent is short.
    // This heuristic could probably be refined over time, but felt right after moderate amounts of tinkering.
    isLoneShortArgument(consequentNode, options2) && isSimpleExpressionByNodeCount(node.test, 3)
  ));
  const shouldGroupTestAndConsequent = isInChain || isInAlternate || isTSConditional && !isParentTernary || isParentTernary && isConditionalExpression && isSimpleExpressionByNodeCount(node.test, 1) || tryToParenthesizeAlternate;
  const consequentComments = [];
  if (!isConsequentTernary && hasComment(consequentNode, CommentCheckFlags.Dangling)) {
    path.call((childPath) => {
      consequentComments.push(
        printDanglingComments(childPath, options2),
        hardline
      );
    }, "consequent");
  }
  const alternateComments = [];
  if (hasComment(node.test, CommentCheckFlags.Dangling)) {
    path.call((childPath) => {
      alternateComments.push(printDanglingComments(childPath, options2));
    }, "test");
  }
  if (!isAlternateTernary && hasComment(alternateNode, CommentCheckFlags.Dangling)) {
    path.call((childPath) => {
      alternateComments.push(printDanglingComments(childPath, options2));
    }, "alternate");
  }
  if (hasComment(node, CommentCheckFlags.Dangling)) {
    alternateComments.push(printDanglingComments(path, options2));
  }
  const testId = Symbol("test");
  const consequentId = Symbol("consequent");
  const testAndConsequentId = Symbol("test-and-consequent");
  const printedTest = isConditionalExpression ? [
    wrapInParens(print3("test")),
    node.test.type === "ConditionalExpression" ? breakParent : ""
  ] : [
    print3("checkType"),
    " ",
    "extends",
    " ",
    isConditionalType(node.extendsType) || node.extendsType.type === "TSMappedType" ? print3("extendsType") : group(wrapInParens(print3("extendsType")))
  ];
  const printedTestWithQuestionMark = group([printedTest, " ?"], {
    id: testId
  });
  const printedConsequent = print3(consequentNodePropertyName);
  const consequent = indent([
    isConsequentTernary || isInJsx && (isJsxElement(consequentNode) || isParentTernary || isInChain) ? hardline : line,
    consequentComments,
    printedConsequent
  ]);
  const printedTestAndConsequent = shouldGroupTestAndConsequent ? group(
    [
      printedTestWithQuestionMark,
      // Avoid indenting consequent if it isn't a chain, even if the test breaks.
      isInChain ? consequent : (
        // If the test breaks, also break the consequent
        ifBreak(consequent, group(consequent, { id: consequentId }), {
          groupId: testId
        })
      )
    ],
    { id: testAndConsequentId }
  ) : [printedTestWithQuestionMark, consequent];
  const printedAlternate = print3(alternateNodePropertyName);
  const printedAlternateWithParens = tryToParenthesizeAlternate ? ifBreak(printedAlternate, dedent(wrapInParens(printedAlternate)), {
    groupId: testAndConsequentId
  }) : printedAlternate;
  const parts = [
    printedTestAndConsequent,
    alternateComments.length > 0 ? [indent([hardline, alternateComments]), hardline] : isAlternateTernary ? hardline : tryToParenthesizeAlternate ? ifBreak(line, " ", { groupId: testAndConsequentId }) : line,
    ":",
    isAlternateTernary ? " " : !isBigTabs ? " " : shouldGroupTestAndConsequent ? ifBreak(
      fillTab,
      ifBreak(
        isInChain || tryToParenthesizeAlternate ? " " : fillTab,
        " "
      ),
      { groupId: testAndConsequentId }
    ) : ifBreak(fillTab, " "),
    isAlternateTernary ? printedAlternateWithParens : group([
      indent(printedAlternateWithParens),
      isInJsx && !tryToParenthesizeAlternate ? softline : ""
    ]),
    breakClosingParen && !shouldExtraIndent ? softline : "",
    shouldBreak ? breakParent : ""
  ];
  const result = isOnSameLineAsAssignment && !shouldBreak ? (
    // We try to preserve the case of a single-line ternary bumped to the line after assignment:
    //
    //   const foo =
    //     cond ? result : otherwise;
    //
    // However, this sadly means that tests are always shunted to the next line in this case,
    // which I'm ambivalent about but some people like keeping on the same line as the assignment.
    group(indent([softline, group(parts)]))
  ) : isOnSameLineAsAssignment || isOnSameLineAsReturn ? group(indent(parts)) : shouldExtraIndent || isTSConditional && isInTest ? group([
    indent([softline, parts]),
    breakTSClosingParen ? softline : ""
  ]) : parent === firstNonConditionalParent ? group(parts) : parts;
  return result;
}

// src/language-js/print/estree.js
function printEstree(path, options2, print3, args) {
  const { node } = path;
  if (isLiteral(node)) {
    return printLiteral(path, options2);
  }
  const semi = options2.semi ? ";" : "";
  let parts = [];
  switch (node.type) {
    case "JsExpressionRoot":
      return print3("node");
    case "JsonRoot":
      return [printDanglingComments(path, options2), print3("node"), hardline];
    case "File":
      return printHtmlBinding(path, options2, print3) ?? print3("program");
    // Babel extension.
    case "EmptyStatement":
      return "";
    case "ExpressionStatement":
      return printExpressionStatement(path, options2, print3);
    case "ChainExpression":
      return print3("expression");
    // Babel non-standard node. Used for Closure-style type casts. See postprocess.js.
    case "ParenthesizedExpression": {
      const shouldHug = !hasComment(node.expression) && (isObjectExpression(node.expression) || isArrayExpression(node.expression));
      if (shouldHug) {
        return ["(", print3("expression"), ")"];
      }
      return group([
        "(",
        indent([softline, print3("expression")]),
        softline,
        ")"
      ]);
    }
    case "AssignmentExpression":
      return printAssignmentExpression(path, options2, print3);
    case "VariableDeclarator":
      return printVariableDeclarator(path, options2, print3);
    case "BinaryExpression":
    case "LogicalExpression":
      return printBinaryishExpression(path, options2, print3);
    case "AssignmentPattern":
      return [print3("left"), " = ", print3("right")];
    case "OptionalMemberExpression":
    case "MemberExpression":
      return printMemberExpression(path, options2, print3);
    case "MetaProperty":
      return [print3("meta"), ".", print3("property")];
    case "BindExpression":
      if (node.object) {
        parts.push(print3("object"));
      }
      parts.push(
        group(
          indent([softline, printBindExpressionCallee(path, options2, print3)])
        )
      );
      return parts;
    case "Identifier":
      return [
        node.name,
        printOptionalToken(path),
        printDefiniteToken(path),
        printTypeAnnotationProperty(path, print3)
      ];
    case "V8IntrinsicIdentifier":
      return ["%", node.name];
    case "SpreadElement":
    case "SpreadElementPattern":
    case "SpreadPropertyPattern":
    case "RestElement":
      return printRestSpread(path, print3);
    case "FunctionDeclaration":
    case "FunctionExpression":
      return printFunction(path, options2, print3, args);
    case "ArrowFunctionExpression":
      return printArrowFunction(path, options2, print3, args);
    case "YieldExpression":
      parts.push("yield");
      if (node.delegate) {
        parts.push("*");
      }
      if (node.argument) {
        parts.push(" ", print3("argument"));
      }
      return parts;
    case "AwaitExpression":
      parts.push("await");
      if (node.argument) {
        parts.push(" ", print3("argument"));
        const { parent } = path;
        if (isCallExpression(parent) && parent.callee === node || isMemberExpression(parent) && parent.object === node) {
          parts = [indent([softline, ...parts]), softline];
          const parentAwaitOrBlock = path.findAncestor(
            (node2) => node2.type === "AwaitExpression" || node2.type === "BlockStatement"
          );
          if (parentAwaitOrBlock?.type !== "AwaitExpression" || !startsWithNoLookaheadToken(
            parentAwaitOrBlock.argument,
            (leftmostNode) => leftmostNode === node
          )) {
            return group(parts);
          }
        }
      }
      return parts;
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ExportAllDeclaration":
      return printExportDeclaration(path, options2, print3);
    case "ImportDeclaration":
      return printImportDeclaration(path, options2, print3);
    case "ImportSpecifier":
    case "ExportSpecifier":
    case "ImportNamespaceSpecifier":
    case "ExportNamespaceSpecifier":
    case "ImportDefaultSpecifier":
    case "ExportDefaultSpecifier":
      return printModuleSpecifier(path, options2, print3);
    case "ImportAttribute":
      return printProperty(path, options2, print3);
    case "Program":
    case "BlockStatement":
    case "StaticBlock":
      return printBlock(path, options2, print3);
    case "ClassBody":
      return printClassBody(path, options2, print3);
    case "ThrowStatement":
      return printThrowStatement(path, options2, print3);
    case "ReturnStatement":
      return printReturnStatement(path, options2, print3);
    case "NewExpression":
    case "ImportExpression":
    case "OptionalCallExpression":
    case "CallExpression":
      return printCallExpression(path, options2, print3);
    case "ObjectExpression":
    case "ObjectPattern":
      return printObject(path, options2, print3);
    case "Property":
      if (isMethod(node)) {
        return printMethod(path, options2, print3);
      }
      return printProperty(path, options2, print3);
    // Babel
    case "ObjectProperty":
      return printProperty(path, options2, print3);
    // Babel
    case "ObjectMethod":
      return printMethod(path, options2, print3);
    case "Decorator":
      return ["@", print3("expression")];
    case "ArrayExpression":
    case "ArrayPattern":
      return printArray(path, options2, print3);
    case "SequenceExpression": {
      const { parent } = path;
      if (parent.type === "ExpressionStatement" || parent.type === "ForStatement") {
        const parts3 = [];
        path.each(({ isFirst }) => {
          if (isFirst) {
            parts3.push(print3());
          } else {
            parts3.push(",", indent([line, print3()]));
          }
        }, "expressions");
        return group(parts3);
      }
      const parts2 = join([",", line], path.map(print3, "expressions"));
      if ((parent.type === "ReturnStatement" || parent.type === "ThrowStatement") && path.key === "argument" || parent.type === "ArrowFunctionExpression" && path.key === "body") {
        return group(ifBreak([indent([softline, parts2]), softline], parts2));
      }
      return group(parts2);
    }
    case "ThisExpression":
      return "this";
    case "Super":
      return "super";
    case "Directive":
      return [print3("value"), semi];
    // Babel 6
    case "UnaryExpression":
      parts.push(node.operator);
      if (/[a-z]$/u.test(node.operator)) {
        parts.push(" ");
      }
      if (hasComment(node.argument)) {
        parts.push(
          group(["(", indent([softline, print3("argument")]), softline, ")"])
        );
      } else {
        parts.push(print3("argument"));
      }
      return parts;
    case "UpdateExpression":
      return [
        node.prefix ? node.operator : "",
        print3("argument"),
        node.prefix ? "" : node.operator
      ];
    case "ConditionalExpression":
      return printTernary(path, options2, print3, args);
    case "VariableDeclaration": {
      const printed = path.map(print3, "declarations");
      const parentNode = path.parent;
      const isParentForLoop = parentNode.type === "ForStatement" || parentNode.type === "ForInStatement" || parentNode.type === "ForOfStatement";
      const hasValue = node.declarations.some((decl) => decl.init);
      let firstVariable;
      if (printed.length === 1 && !hasComment(node.declarations[0])) {
        firstVariable = printed[0];
      }
      parts = [
        printDeclareToken(path),
        node.kind,
        firstVariable ? [" ", firstVariable] : "",
        indent(
          printed.filter((p) => p !== firstVariable).map((p, i) => [
            i ? "," : "",
            hasValue && !isParentForLoop ? hardline : line,
            p
          ])
        )
      ];
      if (!(isParentForLoop && parentNode.body !== node)) {
        parts.push(semi);
      }
      return group(parts);
    }
    case "WithStatement":
      return group([
        "with (",
        print3("object"),
        ")",
        adjustClause(node.body, print3("body"))
      ]);
    case "IfStatement": {
      const consequent = adjustClause(node.consequent, print3("consequent"));
      const opening = group([
        "if (",
        group([indent([softline, print3("test")]), softline]),
        ")",
        consequent
      ]);
      parts.push(opening);
      if (node.alternate) {
        const commentOnOwnLine = hasComment(
          node.consequent,
          CommentCheckFlags.Trailing | CommentCheckFlags.Line
        ) || needsHardlineAfterDanglingComment(node);
        const elseOnSameLine = (
          /*node.consequent.type === "BlockStatement" && !commentOnOwnLine*/
          false
        );
        parts.push(elseOnSameLine ? " " : hardline);
        if (hasComment(node, CommentCheckFlags.Dangling)) {
          parts.push(
            printDanglingComments(path, options2),
            commentOnOwnLine ? hardline : " "
          );
        }
        parts.push(
          "else",
          group(
            adjustClause(
              node.alternate,
              print3("alternate"),
              node.alternate.type === "IfStatement"
            )
          )
        );
      }
      return parts;
    }
    case "ForStatement": {
      const body = adjustClause(node.body, print3("body"));
      const dangling = printDanglingComments(path, options2);
      const printedComments = dangling ? [dangling, softline] : "";
      if (!node.init && !node.test && !node.update) {
        return [printedComments, group(["for (;;)", body])];
      }
      return [
        printedComments,
        group([
          "for (",
          group([
            indent([
              softline,
              print3("init"),
              ";",
              line,
              print3("test"),
              ";",
              line,
              print3("update")
            ]),
            softline
          ]),
          ")",
          body
        ])
      ];
    }
    case "WhileStatement":
      return group([
        "while (",
        group([indent([softline, print3("test")]), softline]),
        ")",
        adjustClause(node.body, print3("body"))
      ]);
    case "ForInStatement":
      return group([
        "for (",
        print3("left"),
        " in ",
        print3("right"),
        ")",
        adjustClause(node.body, print3("body"))
      ]);
    case "ForOfStatement":
      return group([
        "for",
        node.await ? " await" : "",
        " (",
        print3("left"),
        " of ",
        print3("right"),
        ")",
        adjustClause(node.body, print3("body"))
      ]);
    case "DoWhileStatement": {
      const clause = adjustClause(node.body, print3("body"));
      const doBody = group(["do", clause]);
      parts = [doBody];
      if (node.body.type === "BlockStatement") {
        parts.push(" ");
      } else {
        parts.push(hardline);
      }
      parts.push(
        "while (",
        group([indent([softline, print3("test")]), softline]),
        ")",
        semi
      );
      return parts;
    }
    case "DoExpression":
      return [node.async ? "async " : "", "do ", print3("body")];
    case "BreakStatement":
    case "ContinueStatement":
      parts.push(node.type === "BreakStatement" ? "break" : "continue");
      if (node.label) {
        parts.push(" ", print3("label"));
      }
      parts.push(semi);
      return parts;
    case "LabeledStatement":
      if (node.body.type === "EmptyStatement") {
        return [print3("label"), ":;"];
      }
      return [print3("label"), ": ", print3("body")];
    case "TryStatement":
      return [
        "try ",
        print3("block"),
        node.handler ? [line, print3("handler")] : "",
        node.finalizer ? [" finally ", print3("finalizer")] : ""
      ];
    case "CatchClause":
      if (node.param) {
        const parameterHasComments = hasComment(
          node.param,
          (comment) => !is_block_comment_default(comment) || comment.leading && has_newline_default(options2.originalText, locEnd(comment)) || comment.trailing && has_newline_default(options2.originalText, locStart(comment), {
            backwards: true
          })
        );
        const param = print3("param");
        return [
          "catch ",
          parameterHasComments ? ["(", indent([softline, param]), softline, ") "] : ["(", param, ") "],
          print3("body")
        ];
      }
      return ["catch ", print3("body")];
    // Note: ignoring n.lexical because it has no printing consequences.
    case "SwitchStatement":
      return [
        group([
          "switch (",
          indent([softline, print3("discriminant")]),
          softline,
          ")"
        ]),
        " {",
        node.cases.length > 0 ? indent([
          hardline,
          join(
            hardline,
            path.map(
              ({ node: node2, isLast }) => [
                print3(),
                !isLast && isNextLineEmpty2(node2, options2) ? hardline : ""
              ],
              "cases"
            )
          )
        ]) : "",
        hardline,
        "}"
      ];
    case "SwitchCase": {
      if (node.test) {
        parts.push("case ", print3("test"), ":");
      } else {
        parts.push("default:");
      }
      if (hasComment(node, CommentCheckFlags.Dangling)) {
        parts.push(" ", printDanglingComments(path, options2));
      }
      const consequent = node.consequent.filter(
        (node2) => node2.type !== "EmptyStatement"
      );
      if (consequent.length > 0) {
        const cons = printStatementSequence(path, options2, print3, "consequent");
        parts.push(
          consequent.length === 1 && consequent[0].type === "BlockStatement" ? [" ", cons] : indent([hardline, cons])
        );
      }
      return parts;
    }
    // JSX extensions below.
    case "DebuggerStatement":
      return ["debugger", semi];
    case "ClassDeclaration":
    case "ClassExpression":
      return printClass(path, options2, print3);
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "MethodDefinition":
      return printClassMethod(path, options2, print3);
    case "ClassProperty":
    case "PropertyDefinition":
    case "ClassPrivateProperty":
    case "ClassAccessorProperty":
    case "AccessorProperty":
      return printClassProperty(path, options2, print3);
    case "TemplateElement":
      return replaceEndOfLine(node.value.raw);
    case "TemplateLiteral":
      return printTemplateLiteral(path, options2, print3);
    case "TaggedTemplateExpression":
      return printTaggedTemplateLiteral(path, options2, print3);
    case "PrivateIdentifier":
      return ["#", node.name];
    case "PrivateName":
      return ["#", print3("id")];
    // For hack-style pipeline
    case "TopicReference":
      return "%";
    case "ArgumentPlaceholder":
      return "?";
    case "ModuleExpression":
      return ["module ", print3("body")];
    case "InterpreterDirective":
    // Printed as comment
    default:
      throw new unexpected_node_error_default(node, "ESTree");
  }
}

// src/language-js/print/flow.js
import assert3 from "assert";

// src/language-js/print/cast-expression.js
function printBinaryCastExpression(path, options2, print3) {
  const { parent, node, key } = path;
  const parts = [print3("expression")];
  switch (node.type) {
    case "AsConstExpression":
      parts.push(" as const");
      break;
    case "AsExpression":
    case "TSAsExpression":
      parts.push(" as ", print3("typeAnnotation"));
      break;
    case "SatisfiesExpression":
    case "TSSatisfiesExpression":
      parts.push(" satisfies ", print3("typeAnnotation"));
      break;
  }
  if (key === "callee" && isCallExpression(parent) || key === "object" && isMemberExpression(parent)) {
    return group([indent([softline, ...parts]), softline]);
  }
  return parts;
}

// src/language-js/print/component.js
function printComponent(path, options2, print3) {
  const { node } = path;
  const parts = [printDeclareToken(path), "component"];
  if (node.id) {
    parts.push(" ", print3("id"));
  }
  parts.push(print3("typeParameters"));
  const parametersDoc = printComponentParameters(path, options2, print3);
  if (node.rendersType) {
    parts.push(group([parametersDoc, " ", print3("rendersType")]));
  } else {
    parts.push(group([parametersDoc]));
  }
  if (node.body) {
    parts.push(" ", print3("body"));
  }
  if (options2.semi && node.type === "DeclareComponent") {
    parts.push(";");
  }
  return parts;
}
function printComponentParameters(path, options2, print3) {
  const { node: componentNode } = path;
  let parameters = componentNode.params;
  if (componentNode.rest) {
    parameters = [...parameters, componentNode.rest];
  }
  if (parameters.length === 0) {
    return [
      "(",
      printDanglingComments(path, options2, {
        filter: (comment) => get_next_non_space_non_comment_character_default(
          options2.originalText,
          locEnd(comment)
        ) === ")"
      }),
      ")"
    ];
  }
  const printed = [];
  iterateComponentParametersPath(path, (parameterPath, index) => {
    const isLastParameter = index === parameters.length - 1;
    if (isLastParameter && componentNode.rest) {
      printed.push("...");
    }
    printed.push(print3());
    if (isLastParameter) {
      return;
    }
    printed.push(",");
    if (isNextLineEmpty2(parameters[index], options2)) {
      printed.push(hardline, hardline);
    } else {
      printed.push(line);
    }
  });
  return [
    "(",
    indent([softline, ...printed]),
    ifBreak(
      shouldPrintComma(options2, "all") && !hasRestParameter2(componentNode, parameters) ? "," : ""
    ),
    softline,
    ")"
  ];
}
function hasRestParameter2(componentNode, parameters) {
  return componentNode.rest || at_default(
    /* isOptionalObject */
    false,
    parameters,
    -1
  )?.type === "RestElement";
}
function iterateComponentParametersPath(path, iteratee) {
  const { node } = path;
  let index = 0;
  const callback = (childPath) => iteratee(childPath, index++);
  path.each(callback, "params");
  if (node.rest) {
    path.call(callback, "rest");
  }
}
function printComponentParameter(path, options2, print3) {
  const { node } = path;
  if (node.shorthand) {
    return print3("local");
  }
  return [print3("name"), " as ", print3("local")];
}
function printComponentTypeParameter(path, options2, print3) {
  const { node } = path;
  const printed = [];
  if (node.name) {
    printed.push(print3("name"), node.optional ? "?: " : ": ");
  }
  printed.push(print3("typeAnnotation"));
  return printed;
}

// src/language-js/print/enum.js
function printEnumBody(path, options2, print3) {
  return printObject(path, options2, print3);
}
function printEnumMember(path, print3) {
  const { node } = path;
  let idDoc = print3("id");
  if (node.computed) {
    idDoc = ["[", idDoc, "]"];
  }
  let initializerDoc = "";
  if (node.initializer) {
    initializerDoc = print3("initializer");
  }
  if (node.init) {
    initializerDoc = print3("init");
  }
  if (!initializerDoc) {
    return idDoc;
  }
  return [idDoc, " = ", initializerDoc];
}
function printEnumDeclaration(path, print3) {
  const { node } = path;
  return [
    printDeclareToken(path),
    node.const ? "const " : "",
    "enum ",
    print3("id"),
    " ",
    print3("body")
  ];
}

// src/language-js/print/hook.js
function printHook(path, options2, print3) {
  const { node } = path;
  const parts = ["hook"];
  if (node.id) {
    parts.push(" ", print3("id"));
  }
  const parametersDoc = printFunctionParameters(
    path,
    options2,
    print3,
    false,
    true
  );
  const returnTypeDoc = printReturnType(path, print3);
  const shouldGroupParameters = shouldGroupFunctionParameters(
    node,
    returnTypeDoc
  );
  parts.push(
    group([
      shouldGroupParameters ? group(parametersDoc) : parametersDoc,
      returnTypeDoc
    ]),
    node.body ? " " : "",
    print3("body")
  );
  return parts;
}
function printDeclareHook(path, options2, print3) {
  const { node } = path;
  const parts = [printDeclareToken(path), "hook"];
  if (node.id) {
    parts.push(" ", print3("id"));
  }
  if (options2.semi) {
    parts.push(";");
  }
  return parts;
}
function isDeclareHookTypeAnnotation(path) {
  const { node } = path;
  return node.type === "HookTypeAnnotation" && path.getParentNode(2)?.type === "DeclareHook";
}
function printHookTypeAnnotation(path, options2, print3) {
  const { node } = path;
  const parts = [];
  parts.push(isDeclareHookTypeAnnotation(path) ? "" : "hook ");
  let parametersDoc = printFunctionParameters(
    path,
    options2,
    print3,
    /* expandArg */
    false,
    /* printTypeParams */
    true
  );
  const returnTypeDoc = [];
  returnTypeDoc.push(
    isDeclareHookTypeAnnotation(path) ? ": " : " => ",
    print3("returnType")
  );
  if (shouldGroupFunctionParameters(node, returnTypeDoc)) {
    parametersDoc = group(parametersDoc);
  }
  parts.push(parametersDoc, returnTypeDoc);
  return group(parts);
}

// src/language-js/print/interface.js
function printInterface(path, options2, print3) {
  const { node } = path;
  const parts = [printDeclareToken(path), "interface"];
  const partsGroup = [];
  const extendsParts = [];
  if (node.type !== "InterfaceTypeAnnotation") {
    partsGroup.push(" ", print3("id"), print3("typeParameters"));
  }
  const shouldIndentOnlyHeritageClauses2 = node.typeParameters && !hasComment(
    node.typeParameters,
    CommentCheckFlags.Trailing | CommentCheckFlags.Line
  );
  if (is_non_empty_array_default(node.extends)) {
    extendsParts.push(
      shouldIndentOnlyHeritageClauses2 ? ifBreak(" ", line, {
        groupId: getTypeParametersGroupId(node.typeParameters)
      }) : line,
      "extends ",
      (node.extends.length === 1 ? identity : indent)(
        join([",", line], path.map(print3, "extends"))
      )
    );
  }
  if (hasComment(node.id, CommentCheckFlags.Trailing) || is_non_empty_array_default(node.extends)) {
    if (shouldIndentOnlyHeritageClauses2) {
      parts.push(group([...partsGroup, indent(extendsParts)]));
    } else {
      parts.push(group(indent([...partsGroup, ...extendsParts])));
    }
  } else {
    parts.push(...partsGroup, ...extendsParts);
  }
  parts.push(" ", print3("body"));
  return group(parts);
}

// src/language-js/print/mapped-type.js
function printFlowMappedTypeOptionalModifier(optional) {
  switch (optional) {
    case null:
      return "";
    case "PlusOptional":
      return "+?";
    case "MinusOptional":
      return "-?";
    case "Optional":
      return "?";
  }
}
function printFlowMappedTypeProperty(path, options2, print3) {
  const { node } = path;
  return group([
    node.variance ? print3("variance") : "",
    "[",
    indent([print3("keyTparam"), " in ", print3("sourceType")]),
    "]",
    printFlowMappedTypeOptionalModifier(node.optional),
    ": ",
    print3("propType")
  ]);
}
function printTypeScriptMappedTypeModifier(tokenNode, keyword) {
  if (tokenNode === "+" || tokenNode === "-") {
    return tokenNode + keyword;
  }
  return keyword;
}
function printTypeScriptMappedType(path, options2, print3) {
  const { node } = path;
  let shouldBreak = false;
  if (options2.objectWrap === "preserve") {
    const start = locStart(node);
    const textAfter = get_text_without_comments_default(
      options2,
      start + 1,
      locStart(node.key)
    );
    const nextTokenIndex = start + 1 + textAfter.search(/\S/u);
    if (has_newline_in_range_default(options2.originalText, start, nextTokenIndex)) {
      shouldBreak = true;
    }
  }
  return group(
    [
      "{",
      indent([
        options2.bracketSpacing ? line : softline,
        hasComment(node, CommentCheckFlags.Dangling) ? group([printDanglingComments(path, options2), hardline]) : "",
        group([
          node.readonly ? [
            printTypeScriptMappedTypeModifier(node.readonly, "readonly"),
            " "
          ] : "",
          "[",
          print3("key"),
          " in ",
          print3("constraint"),
          node.nameType ? [" as ", print3("nameType")] : "",
          "]",
          node.optional ? printTypeScriptMappedTypeModifier(node.optional, "?") : "",
          node.typeAnnotation ? ": " : "",
          print3("typeAnnotation")
        ]),
        /*options.semi ? ifBreak(";") :*/
        ""
      ]),
      options2.bracketSpacing ? line : softline,
      "}"
    ],
    { shouldBreak }
  );
}

// src/language-js/print/flow.js
function printFlow(path, options2, print3) {
  const { node } = path;
  if (is_flow_keyword_type_default(node)) {
    return node.type.slice(0, -14).toLowerCase();
  }
  const semi = options2.semi ? ";" : "";
  switch (node.type) {
    case "ComponentDeclaration":
    case "DeclareComponent":
    case "ComponentTypeAnnotation":
      return printComponent(path, options2, print3);
    case "ComponentParameter":
      return printComponentParameter(path, options2, print3);
    case "ComponentTypeParameter":
      return printComponentTypeParameter(path, options2, print3);
    case "HookDeclaration":
      return printHook(path, options2, print3);
    case "DeclareHook":
      return printDeclareHook(path, options2, print3);
    case "HookTypeAnnotation":
      return printHookTypeAnnotation(path, options2, print3);
    case "DeclareClass":
      return printClass(path, options2, print3);
    case "DeclareFunction":
      return [
        printDeclareToken(path),
        "function ",
        print3("id"),
        print3("predicate"),
        semi
      ];
    case "DeclareModule":
      return ["declare module ", print3("id"), " ", print3("body")];
    case "DeclareModuleExports":
      return [
        "declare module.exports",
        printTypeAnnotationProperty(path, print3),
        semi
      ];
    case "DeclareNamespace":
      return ["declare namespace ", print3("id"), " ", print3("body")];
    case "DeclareVariable":
      return [
        printDeclareToken(path),
        // TODO: Only use `node.kind` when babel update AST
        node.kind ?? "var",
        " ",
        print3("id"),
        semi
      ];
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
      return printExportDeclaration(path, options2, print3);
    case "DeclareOpaqueType":
    case "OpaqueType":
      return printOpaqueType(path, options2, print3);
    case "DeclareTypeAlias":
    case "TypeAlias":
      return printTypeAlias(path, options2, print3);
    case "IntersectionTypeAnnotation":
      return printIntersectionType(path, options2, print3);
    case "UnionTypeAnnotation":
      return printUnionType(path, options2, print3);
    case "ConditionalTypeAnnotation":
      return printTernary(path, options2, print3);
    case "InferTypeAnnotation":
      return printInferType(path, options2, print3);
    case "FunctionTypeAnnotation":
      return printFunctionType(path, options2, print3);
    case "TupleTypeAnnotation":
      return printArray(path, options2, print3);
    case "TupleTypeLabeledElement":
      return printNamedTupleMember(path, options2, print3);
    case "TupleTypeSpreadElement":
      return printRestType(path, options2, print3);
    case "GenericTypeAnnotation":
      return [
        print3("id"),
        printTypeParameters(path, options2, print3, "typeParameters")
      ];
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      return printIndexedAccessType(path, options2, print3);
    // Type Annotations for Facebook Flow, typically stripped out or
    // transformed away before printing.
    case "TypeAnnotation":
      return printTypeAnnotation(path, options2, print3);
    case "TypeParameter":
      return printTypeParameter(path, options2, print3);
    case "TypeofTypeAnnotation":
      return printTypeQuery(path, print3);
    case "ExistsTypeAnnotation":
      return "*";
    case "ArrayTypeAnnotation":
      return printArrayType(print3);
    case "DeclareEnum":
    case "EnumDeclaration":
      return printEnumDeclaration(path, print3);
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumBigIntBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
      return [
        node.type === "EnumSymbolBody" || node.explicitType ? `of ${node.type.slice(
          // `Enum`
          4,
          // `Body`
          -4
        ).toLowerCase()} ` : "",
        printEnumBody(path, options2, print3)
      ];
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumBigIntMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
      return printEnumMember(path, print3);
    case "FunctionTypeParam": {
      const name = node.name ? print3("name") : path.parent.this === node ? "this" : "";
      return [
        name,
        printOptionalToken(path),
        // `flow` doesn't wrap the `typeAnnotation` with `TypeAnnotation`, so the colon
        // needs to be added separately.
        name ? ": " : "",
        print3("typeAnnotation")
      ];
    }
    case "DeclareInterface":
    case "InterfaceDeclaration":
    case "InterfaceTypeAnnotation":
      return printInterface(path, options2, print3);
    case "ClassImplements":
    case "InterfaceExtends":
      return [print3("id"), print3("typeParameters")];
    case "NullableTypeAnnotation":
      return ["?", print3("typeAnnotation")];
    case "Variance": {
      const { kind } = node;
      assert3.ok(kind === "plus" || kind === "minus");
      return kind === "plus" ? "+" : "-";
    }
    case "KeyofTypeAnnotation":
      return ["keyof ", print3("argument")];
    case "ObjectTypeCallProperty":
      return [node.static ? "static " : "", print3("value")];
    case "ObjectTypeMappedTypeProperty":
      return printFlowMappedTypeProperty(path, options2, print3);
    case "ObjectTypeIndexer":
      return [
        node.static ? "static " : "",
        node.variance ? print3("variance") : "",
        "[",
        print3("id"),
        node.id ? ": " : "",
        print3("key"),
        "]: ",
        print3("value")
      ];
    case "ObjectTypeProperty": {
      let modifier = "";
      if (node.proto) {
        modifier = "proto ";
      } else if (node.static) {
        modifier = "static ";
      }
      return [
        modifier,
        node.kind !== "init" ? node.kind + " " : "",
        node.variance ? print3("variance") : "",
        printPropertyKey(path, options2, print3),
        printOptionalToken(path),
        isMethod(node) ? "" : ": ",
        print3("value")
      ];
    }
    case "ObjectTypeAnnotation":
      return printObject(path, options2, print3);
    case "ObjectTypeInternalSlot":
      return [
        node.static ? "static " : "",
        "[[",
        print3("id"),
        "]]",
        printOptionalToken(path),
        node.method ? "" : ": ",
        print3("value")
      ];
    // Same as `RestElement`
    case "ObjectTypeSpreadProperty":
      return printRestSpread(path, print3);
    case "QualifiedTypeofIdentifier":
    case "QualifiedTypeIdentifier":
      return [print3("qualification"), ".", print3("id")];
    case "NullLiteralTypeAnnotation":
      return "null";
    case "BooleanLiteralTypeAnnotation":
      return String(node.value);
    case "StringLiteralTypeAnnotation":
      return replaceEndOfLine(print_string_default(get_raw_default(node), options2));
    case "NumberLiteralTypeAnnotation":
      return print_number_default(get_raw_default(node));
    case "BigIntLiteralTypeAnnotation":
      return printBigInt(get_raw_default(node));
    case "TypeCastExpression":
      return [
        "(",
        print3("expression"),
        printTypeAnnotationProperty(path, print3),
        ")"
      ];
    case "TypePredicate":
      return printTypePredicate(path, print3);
    case "TypeOperator":
      return [node.operator, " ", print3("typeAnnotation")];
    case "TypeParameterDeclaration":
    case "TypeParameterInstantiation":
      return printTypeParameters(path, options2, print3, "params");
    // Deprecated https://github.com/facebook/flow/commit/b98ae5528d9a073ddc62fc8ce418bbb1f2f80a82
    case "InferredPredicate":
    case "DeclaredPredicate":
      return [
        // The return type will already add the colon, but otherwise we
        // need to do it ourselves
        path.key === "predicate" && path.parent.type !== "DeclareFunction" && !path.parent.returnType ? ": " : " ",
        "%checks",
        ...node.type === "DeclaredPredicate" ? ["(", print3("value"), ")"] : []
      ];
    case "AsExpression":
    case "AsConstExpression":
    case "SatisfiesExpression":
      return printBinaryCastExpression(path, options2, print3);
  }
}

// src/language-js/print/typescript.js
function printTypescript(path, options2, print3) {
  const { node } = path;
  if (!node.type.startsWith("TS")) {
    return;
  }
  if (is_ts_keyword_type_default(node)) {
    return node.type.slice(2, -7).toLowerCase();
  }
  const semi = options2.semi ? ";" : "";
  const parts = [];
  switch (node.type) {
    case "TSThisType":
      return "this";
    case "TSTypeAssertion": {
      const shouldBreakAfterCast = !(isArrayExpression(node.expression) || isObjectExpression(node.expression));
      const castGroup = group([
        "<",
        indent([softline, print3("typeAnnotation")]),
        softline,
        ">"
      ]);
      const exprContents = [
        ifBreak("("),
        indent([softline, print3("expression")]),
        softline,
        ifBreak(")")
      ];
      if (shouldBreakAfterCast) {
        return conditionalGroup([
          [castGroup, print3("expression")],
          [castGroup, group(exprContents, { shouldBreak: true })],
          [castGroup, print3("expression")]
        ]);
      }
      return group([castGroup, print3("expression")]);
    }
    case "TSDeclareFunction":
      return printFunction(path, options2, print3);
    case "TSExportAssignment":
      return ["export = ", print3("expression"), semi];
    case "TSModuleBlock":
      return printBlock(path, options2, print3);
    case "TSInterfaceBody":
    case "TSTypeLiteral":
      return printObject(path, options2, print3);
    case "TSTypeAliasDeclaration":
      return printTypeAlias(path, options2, print3);
    case "TSQualifiedName":
      return [print3("left"), ".", print3("right")];
    case "TSAbstractMethodDefinition":
    case "TSDeclareMethod":
      return printClassMethod(path, options2, print3);
    case "TSAbstractAccessorProperty":
    case "TSAbstractPropertyDefinition":
      return printClassProperty(path, options2, print3);
    case "TSInterfaceHeritage":
    case "TSClassImplements":
    case "TSExpressionWithTypeArguments":
    // Babel AST
    case "TSInstantiationExpression":
      return [
        print3("expression"),
        print3(
          // TODO: Use `typeArguments` only when babel align with TS.
          node.typeArguments ? "typeArguments" : "typeParameters"
        )
      ];
    case "TSTemplateLiteralType":
      return printTemplateLiteral(path, options2, print3);
    case "TSNamedTupleMember":
      return printNamedTupleMember(path, options2, print3);
    case "TSRestType":
      return printRestType(path, options2, print3);
    case "TSOptionalType":
      return [print3("typeAnnotation"), "?"];
    case "TSInterfaceDeclaration":
      return printInterface(path, options2, print3);
    case "TSTypeParameterDeclaration":
    case "TSTypeParameterInstantiation":
      return printTypeParameters(path, options2, print3, "params");
    case "TSTypeParameter":
      return printTypeParameter(path, options2, print3);
    case "TSAsExpression":
    case "TSSatisfiesExpression":
      return printBinaryCastExpression(path, options2, print3);
    case "TSArrayType":
      return printArrayType(print3);
    case "TSPropertySignature":
      return [
        node.readonly ? "readonly " : "",
        printPropertyKey(path, options2, print3),
        printOptionalToken(path),
        printTypeAnnotationProperty(path, print3)
      ];
    case "TSParameterProperty":
      return [
        printTypeScriptAccessibilityToken(node),
        node.static ? "static " : "",
        node.override ? "override " : "",
        node.readonly ? "readonly " : "",
        print3("parameter")
      ];
    case "TSTypeQuery":
      return printTypeQuery(path, print3);
    case "TSIndexSignature": {
      const trailingComma = node.parameters.length > 1 ? ifBreak(shouldPrintComma(options2) ? "," : "") : "";
      const parametersGroup = group([
        indent([
          softline,
          join([", ", softline], path.map(print3, "parameters"))
        ]),
        trailingComma,
        softline
      ]);
      const isClassMember = path.parent.type === "ClassBody" && path.key === "body";
      return [
        // `static` only allowed in class member
        isClassMember && node.static ? "static " : "",
        node.readonly ? "readonly " : "",
        "[",
        node.parameters ? parametersGroup : "",
        "]",
        printTypeAnnotationProperty(path, print3),
        isClassMember ? semi : ""
      ];
    }
    case "TSTypePredicate":
      return printTypePredicate(path, print3);
    case "TSNonNullExpression":
      return [print3("expression"), "!"];
    case "TSImportType":
      return [
        "import",
        call_arguments_default(path, options2, print3),
        !node.qualifier ? "" : [".", print3("qualifier")],
        printTypeParameters(
          path,
          options2,
          print3,
          node.typeArguments ? "typeArguments" : "typeParameters"
        )
      ];
    case "TSLiteralType":
      return print3("literal");
    case "TSIndexedAccessType":
      return printIndexedAccessType(path, options2, print3);
    case "TSTypeOperator":
      return [node.operator, " ", print3("typeAnnotation")];
    case "TSMappedType":
      return printTypeScriptMappedType(path, options2, print3);
    case "TSMethodSignature": {
      const kind = node.kind && node.kind !== "method" ? `${node.kind} ` : "";
      parts.push(
        printTypeScriptAccessibilityToken(node),
        kind,
        node.computed ? "[" : "",
        print3("key"),
        node.computed ? "]" : "",
        printOptionalToken(path)
      );
      const parametersDoc = printFunctionParameters(
        path,
        options2,
        print3,
        /* expandArg */
        false,
        /* printTypeParams */
        true
      );
      const returnTypePropertyName = node.returnType ? "returnType" : "typeAnnotation";
      const returnTypeNode = node[returnTypePropertyName];
      const returnTypeDoc = returnTypeNode ? printTypeAnnotationProperty(path, print3, returnTypePropertyName) : "";
      const shouldGroupParameters = shouldGroupFunctionParameters(
        node,
        returnTypeDoc
      );
      parts.push(shouldGroupParameters ? group(parametersDoc) : parametersDoc);
      if (returnTypeNode) {
        parts.push(group(returnTypeDoc));
      }
      return group(parts);
    }
    case "TSNamespaceExportDeclaration":
      return ["export as namespace ", print3("id"), options2.semi ? ";" : ""];
    case "TSEnumDeclaration":
      return printEnumDeclaration(path, print3);
    case "TSEnumBody":
      return printEnumBody(path, options2, print3);
    case "TSEnumMember":
      return printEnumMember(path, print3);
    case "TSImportEqualsDeclaration":
      return [
        node.isExport ? "export " : "",
        "import ",
        printImportKind(
          node,
          /* spaceBeforeKind */
          false
        ),
        print3("id"),
        " = ",
        print3("moduleReference"),
        options2.semi ? ";" : ""
      ];
    case "TSExternalModuleReference":
      return ["require(", print3("expression"), ")"];
    case "TSModuleDeclaration": {
      const { parent } = path;
      const parentIsDeclaration = parent.type === "TSModuleDeclaration";
      const bodyIsDeclaration = node.body?.type === "TSModuleDeclaration";
      if (parentIsDeclaration) {
        parts.push(".");
      } else {
        parts.push(printDeclareToken(path));
        if (node.kind !== "global") {
          parts.push(node.kind, " ");
        }
      }
      parts.push(print3("id"));
      if (bodyIsDeclaration) {
        parts.push(print3("body"));
      } else if (node.body) {
        parts.push(" ", group(print3("body")));
      } else {
        parts.push(semi);
      }
      return parts;
    }
    case "TSConditionalType":
      return printTernary(path, options2, print3);
    case "TSInferType":
      return printInferType(path, options2, print3);
    case "TSIntersectionType":
      return printIntersectionType(path, options2, print3);
    case "TSUnionType":
      return printUnionType(path, options2, print3);
    case "TSFunctionType":
    case "TSCallSignatureDeclaration":
    case "TSConstructorType":
    case "TSConstructSignatureDeclaration":
      return printFunctionType(path, options2, print3);
    case "TSTupleType":
      return printArray(path, options2, print3);
    case "TSTypeReference":
      return [
        print3("typeName"),
        printTypeParameters(
          path,
          options2,
          print3,
          // TODO: Use `typeArguments` only when babel align with TS.
          node.typeArguments ? "typeArguments" : "typeParameters"
        )
      ];
    case "TSTypeAnnotation":
      return printTypeAnnotation(path, options2, print3);
    case "TSEmptyBodyFunctionExpression":
      return printMethodValue(path, options2, print3);
    // These are not valid TypeScript. Printing them just for the sake of error recovery.
    case "TSJSDocAllType":
      return "*";
    case "TSJSDocUnknownType":
      return "?";
    case "TSJSDocNullableType":
      return printJSDocType(
        path,
        print3,
        /* token */
        "?"
      );
    case "TSJSDocNonNullableType":
      return printJSDocType(
        path,
        print3,
        /* token */
        "!"
      );
    case "TSParenthesizedType":
    // Removed in `../parse/postprocess.js`
    default:
      throw new unexpected_node_error_default(node, "TypeScript");
  }
}

// src/language-js/print/index.js
function printWithoutParentheses(path, options2, print3, args) {
  if (is_ignored_default(path)) {
    return print_ignored_default(path, options2);
  }
  for (const printer of [
    printAngular,
    printJsx,
    printFlow,
    printTypescript,
    printEstree
  ]) {
    const doc = printer(path, options2, print3, args);
    if (doc !== void 0) {
      return doc;
    }
  }
}
var shouldPrintDirectly = create_type_check_function_default([
  "ClassMethod",
  "ClassPrivateMethod",
  "ClassProperty",
  "ClassAccessorProperty",
  "AccessorProperty",
  "TSAbstractAccessorProperty",
  "PropertyDefinition",
  "TSAbstractPropertyDefinition",
  "ClassPrivateProperty",
  "MethodDefinition",
  "TSAbstractMethodDefinition",
  "TSDeclareMethod"
]);
function print2(path, options2, print3, args) {
  if (path.isRoot) {
    options2.__onHtmlBindingRoot?.(path.node, options2);
  }
  const doc = printWithoutParentheses(path, options2, print3, args);
  if (!doc) {
    return "";
  }
  const { node } = path;
  if (shouldPrintDirectly(node)) {
    return doc;
  }
  const hasDecorators = is_non_empty_array_default(node.decorators);
  const decoratorsDoc = printDecorators(path, options2, print3);
  const isClassExpression = node.type === "ClassExpression";
  if (hasDecorators && !isClassExpression) {
    return inheritLabel(doc, (doc2) => group([decoratorsDoc, doc2]));
  }
  const needsParens2 = needs_parens_default(path, options2);
  const needsSemi = shouldPrintLeadingSemicolon(path, options2);
  if (!decoratorsDoc && !needsParens2 && !needsSemi) {
    return doc;
  }
  return inheritLabel(doc, (doc2) => [
    needsSemi ? ";" : "",
    needsParens2 ? "(" : "",
    needsParens2 && isClassExpression && hasDecorators ? [indent([line, decoratorsDoc, doc2]), line] : [decoratorsDoc, doc2],
    needsParens2 ? ")" : ""
  ]);
}
var print_default = print2;

// src/language-js/printer.js
var experimentalFeatures = {
  // TODO: Make this default behavior
  avoidAstMutation: true
};

// src/common/common-options.evaluate.js
var common_options_evaluate_default = {
  "bracketSpacing": {
    "category": "Common",
    "type": "boolean",
    "default": true,
    "description": "Print spaces between brackets.",
    "oppositeDescription": "Do not print spaces between brackets."
  },
  "objectWrap": {
    "category": "Common",
    "type": "choice",
    "default": "preserve",
    "description": "How to wrap object literals.",
    "choices": [
      {
        "value": "preserve",
        "description": "Keep as multi-line, if there is a newline between the opening brace and first property."
      },
      {
        "value": "collapse",
        "description": "Fit to a single line when possible."
      }
    ]
  },
  "singleQuote": {
    "category": "Common",
    "type": "boolean",
    "default": true,
    "description": "Use single quotes instead of double quotes."
  },
  "proseWrap": {
    "category": "Common",
    "type": "choice",
    "default": "preserve",
    "description": "How to wrap prose.",
    "choices": [
      {
        "value": "always",
        "description": "Wrap prose if it exceeds the print width."
      },
      {
        "value": "never",
        "description": "Do not wrap prose."
      },
      {
        "value": "preserve",
        "description": "Wrap prose as-is."
      }
    ]
  },
  "bracketSameLine": {
    "category": "Common",
    "type": "boolean",
    "default": false,
    "description": "Put > of opening tags on the last line instead of on a new line."
  },
  "singleAttributePerLine": {
    "category": "Common",
    "type": "boolean",
    "default": false,
    "description": "Enforce single attribute per line in HTML, Vue and JSX."
  }
};

// src/language-js/options.js
var CATEGORY_JAVASCRIPT = "JavaScript";
var options = {
  arrowParens: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "avoid",
    description: "Include parentheses around a sole arrow function parameter.",
    choices: [
      {
        value: "always",
        description: "Always include parens. Example: `(x) => x`"
      },
      {
        value: "avoid",
        description: "Omit parens when possible. Example: `x => x`"
      }
    ]
  },
  bracketSameLine: common_options_evaluate_default.bracketSameLine,
  objectWrap: common_options_evaluate_default.objectWrap,
  bracketSpacing: common_options_evaluate_default.bracketSpacing,
  jsxBracketSameLine: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    description: "Put > on the last line instead of at a new line.",
    deprecated: "2.4.0"
  },
  semi: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: true,
    description: "Print semicolons.",
    oppositeDescription: "Do not print semicolons, except at the beginning of lines which may need them."
  },
  experimentalOperatorPosition: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "end",
    description: "Where to print operators when binary expressions wrap lines.",
    choices: [
      {
        value: "start",
        description: "Print operators at the start of new lines."
      },
      {
        value: "end",
        description: "Print operators at the end of previous lines."
      }
    ]
  },
  experimentalTernaries: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description: "Use curious ternaries, with the question mark after the condition.",
    oppositeDescription: "Default behavior of ternaries; keep question marks on the same line as the consequent."
  },
  singleQuote: common_options_evaluate_default.singleQuote,
  jsxSingleQuote: {
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: true,
    description: "Use single quotes in JSX."
  },
  quoteProps: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "as-needed",
    description: "Change when properties in objects are quoted.",
    choices: [
      {
        value: "as-needed",
        description: "Only add quotes around object properties where required."
      },
      {
        value: "consistent",
        description: "If at least one property in an object requires quotes, quote all properties."
      },
      {
        value: "preserve",
        description: "Respect the input use of quotes in object properties."
      }
    ]
  },
  trailingComma: {
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "none",
    description: "Print trailing commas wherever possible when multi-line.",
    choices: [
      {
        value: "all",
        description: "Trailing commas wherever possible (including function arguments)."
      },
      {
        value: "es5",
        description: "Trailing commas where valid in ES5 (objects, arrays, etc.)"
      },
      { value: "none", description: "No trailing commas." }
    ]
  },
  singleAttributePerLine: common_options_evaluate_default.singleAttributePerLine
};
var options_default = options;

// packages/plugin-oxc/languages.evaluate.js
var languages_evaluate_default = [
  {
    "name": "JavaScript",
    "type": "programming",
    "extensions": [
      ".js",
      "._js",
      ".bones",
      ".cjs",
      ".es",
      ".es6",
      ".gs",
      ".jake",
      ".javascript",
      ".jsb",
      ".jscad",
      ".jsfl",
      ".jslib",
      ".jsm",
      ".jspre",
      ".jss",
      ".mjs",
      ".njs",
      ".pac",
      ".sjs",
      ".ssjs",
      ".xsjs",
      ".xsjslib",
      ".start.frag",
      ".end.frag",
      ".wxs"
    ],
    "tmScope": "source.js",
    "aceMode": "javascript",
    "aliases": [
      "js",
      "node"
    ],
    "codemirrorMode": "javascript",
    "codemirrorMimeType": "text/javascript",
    "interpreters": [
      "chakra",
      "d8",
      "gjs",
      "js",
      "node",
      "nodejs",
      "qjs",
      "rhino",
      "v8",
      "v8-shell",
      "zx"
    ],
    "filenames": [
      "Jakefile",
      "start.frag",
      "end.frag"
    ],
    "parsers": [
      "oxc",
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "javascript",
      "mongo"
    ],
    "linguistLanguageId": 183
  },
  {
    "name": "JSX",
    "type": "programming",
    "extensions": [
      ".jsx"
    ],
    "tmScope": "source.js.jsx",
    "aceMode": "javascript",
    "aliases": void 0,
    "codemirrorMode": "jsx",
    "codemirrorMimeType": "text/jsx",
    "interpreters": void 0,
    "filenames": void 0,
    "parsers": [
      "oxc",
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "javascriptreact"
    ],
    "group": "JavaScript",
    "linguistLanguageId": 183
  },
  {
    "name": "TypeScript",
    "type": "programming",
    "extensions": [
      ".ts",
      ".cts",
      ".mts"
    ],
    "tmScope": "source.ts",
    "aceMode": "typescript",
    "aliases": [
      "ts"
    ],
    "codemirrorMode": "javascript",
    "codemirrorMimeType": "application/typescript",
    "interpreters": [
      "bun",
      "deno",
      "ts-node",
      "tsx"
    ],
    "parsers": [
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "typescript"
    ],
    "linguistLanguageId": 378
  },
  {
    "name": "TSX",
    "type": "programming",
    "extensions": [
      ".tsx"
    ],
    "tmScope": "source.tsx",
    "aceMode": "javascript",
    "codemirrorMode": "jsx",
    "codemirrorMimeType": "text/jsx",
    "group": "TypeScript",
    "parsers": [
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "typescriptreact"
    ],
    "linguistLanguageId": 94901924
  }
];

// packages/plugin-oxc/index.js
var AST_FORMAT = "estree-oxc";
var parsers = Object.fromEntries(
  Object.entries(oxc_exports).map(([name, parser]) => [
    name,
    { ...parser, astFormat: AST_FORMAT }
  ])
);
var printers = {
  [AST_FORMAT]: printer_exports
};

// with-default-export:packages/plugin-oxc/index.js
var plugin_oxc_default = index_exports;
export {
  plugin_oxc_default as default,
  languages_evaluate_default as languages,
  options_default as options,
  parsers,
  printers
};
