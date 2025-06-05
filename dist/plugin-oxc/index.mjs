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
  parsers: () => oxc_exports
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
import { parseAsync as oxcParse, rawTransferSupported } from "oxc-parser";

// src/common/parser-create-error.js
function createError(message, options) {
  const error = new SyntaxError(
    message + " (" + options.loc.start.line + ":" + options.loc.start.column + ")"
  );
  return Object.assign(error, options);
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

// src/language-js/utils/create-type-check-function.js
function createTypeCheckFunction(typesArray) {
  const types = new Set(typesArray);
  return (node) => types.has(node?.type);
}
var create_type_check_function_default = createTypeCheckFunction;

// src/language-js/utils/get-text-without-comments.js
function getTextWithoutComments(options, start, end) {
  let text = options.originalText.slice(start, end);
  for (const comment of options[Symbol.for("comments")]) {
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

// src/language-js/utils/is-indentable-block-comment.js
function isIndentableBlockCommentInternal(comment) {
  if (!is_block_comment_default(comment)) {
    return false;
  }
  const lines = `*${comment.value}*`.split("\n");
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === "*");
}
var cache = /* @__PURE__ */ new WeakMap();
function isIndentableBlockComment(comment) {
  if (!cache.has(comment)) {
    cache.set(comment, isIndentableBlockCommentInternal(comment));
  }
  return cache.get(comment);
}
var is_indentable_block_comment_default = isIndentableBlockComment;

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
var cache2 = /* @__PURE__ */ new WeakMap();
function isTypeCastComment(comment) {
  if (!cache2.has(comment)) {
    cache2.set(
      comment,
      is_block_comment_default(comment) && comment.value[0] === "*" && // TypeScript expects the type to be enclosed in curly brackets, however
      // Closure Compiler accepts types in parens and even without any delimiters at all.
      // That's why we just search for "@type" and "@satisfies".
      /@(?:type|satisfies)\b/u.test(comment.value)
    );
  }
  return cache2.get(comment);
}
var is_type_cast_comment_default = isTypeCastComment;

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
    "arguments",
    "typeParameters",
    "typeArguments"
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
    "arguments",
    "typeParameters",
    "typeArguments"
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
    "key",
    "value",
    "decorators"
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
    "properties",
    "typeAnnotation",
    "decorators"
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
    "arguments",
    "typeParameters",
    "typeArguments"
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
function postprocess(ast, options) {
  const { parser, text, supportTypeCastComments } = options;
  const { comments } = ast;
  const program = ast.type === "File" ? ast.program : ast;
  if (program.interpreter) {
    comments.unshift(program.interpreter);
    delete program.interpreter;
  }
  if (parser === "oxc" && options.oxcAstType === "ts" && ast.hashbang) {
    comments.unshift(ast.hashbang);
    delete ast.hashbang;
  }
  if (comments.length > 1) {
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
      if (false) {
        assertComment(comment, text);
      }
      followingComment = comment;
    }
  }
  const typeCastCommentsEnds = [];
  if (supportTypeCastComments) {
    for (const comment of comments) {
      if (is_type_cast_comment_default(comment)) {
        typeCastCommentsEnds.push(locEnd(comment));
      }
    }
  }
  ast = visit_node_default(ast, (node) => {
    switch (node.type) {
      case "ParenthesizedExpression": {
        const { expression } = node;
        const start = locStart(node);
        if (expression.type === "TypeCastExpression") {
          expression.range = [start, locEnd(node)];
          return expression;
        }
        const previousCommentEnd = array_find_last_default(
          /* isOptionalObject */
          false,
          typeCastCommentsEnds,
          (end) => end <= start
        );
        const keepTypeCast = previousCommentEnd && // check that there are only white spaces between the comment and the parenthesis
        text.slice(previousCommentEnd, start).trim().length === 0;
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
        if (parser === "flow" || parser === "hermes" || parser === "espree" || parser === "typescript" || parser === "oxc" && options.oxcAstType === "ts") {
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
function parseWithComments(docblock) {
  const line = "\n";
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
      `${line}$1 $2${line}`
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

// src/utils/pragma/pragma.evaluate.js
var FORMAT_IGNORE_PRAGMAS = [
  "noformat",
  "noprettier"
];
var FORMAT_PRAGMAS = [
  "format",
  "prettier"
];

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

// src/language-js/parse/utils/create-parser.js
function createParser(options) {
  options = typeof options === "function" ? { parse: options } : options;
  return {
    astFormat: "estree",
    hasPragma,
    hasIgnorePragma,
    locStart,
    locEnd,
    ...options
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
async function parseWithOptions(filepath, text, options) {
  const result = await oxcParse(filepath, text, {
    preserveParens: true,
    experimentalRawTransfer: rawTransferSupported(),
    showSemanticErrors: false,
    ...options
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
async function parseJs(text, options) {
  const filepath = options?.filepath;
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
  return postprocess_default(ast, {
    text,
    parser: "oxc",
    supportTypeCastComments: true
  });
}
async function parseTs(text, options) {
  let filepath = options?.filepath;
  const sourceType = getSourceType(filepath);
  const parseOptions = { sourceType, astType: "ts" };
  const isKnownJsx = typeof filepath === "string" && /\.(?:jsx|tsx)$/iu.test(filepath);
  let parseOptionsCombinations = [];
  if (isKnownJsx) {
    parseOptionsCombinations = [{ ...parseOptions, lang: "tsx" }];
  } else {
    const shouldEnableJsx = jsx_regexp_evaluate_default.test(text);
    parseOptionsCombinations = [shouldEnableJsx, !shouldEnableJsx].map(
      (shouldEnableJsx2) => ({
        ...parseOptions,
        lang: shouldEnableJsx2 ? "tsx" : "ts"
      })
    );
  }
  if (typeof filepath !== "string") {
    filepath = "prettier.tsx";
  }
  let result;
  try {
    result = await tryCombinationsAsync(
      parseOptionsCombinations.map(
        (parseOptions2) => () => parseWithOptions(filepath, text, parseOptions2)
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

// packages/plugin-oxc/languages.evaluate.js
var languages_evaluate_default = [
  {
    "linguistLanguageId": 183,
    "name": "JavaScript",
    "type": "programming",
    "tmScope": "source.js",
    "aceMode": "javascript",
    "codemirrorMode": "javascript",
    "codemirrorMimeType": "text/javascript",
    "color": "#f1e05a",
    "aliases": [
      "js",
      "node"
    ],
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
    "filenames": [
      "Jakefile",
      "start.frag",
      "end.frag"
    ],
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
    "parsers": [
      "oxc",
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "javascript",
      "mongo"
    ]
  },
  {
    "linguistLanguageId": 183,
    "name": "JSX",
    "type": "programming",
    "tmScope": "source.js.jsx",
    "aceMode": "javascript",
    "codemirrorMode": "jsx",
    "codemirrorMimeType": "text/jsx",
    "color": void 0,
    "aliases": void 0,
    "extensions": [
      ".jsx"
    ],
    "filenames": void 0,
    "interpreters": void 0,
    "parsers": [
      "oxc",
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "javascriptreact"
    ],
    "group": "JavaScript"
  },
  {
    "linguistLanguageId": 378,
    "name": "TypeScript",
    "type": "programming",
    "color": "#3178c6",
    "aliases": [
      "ts"
    ],
    "interpreters": [
      "bun",
      "deno",
      "ts-node",
      "tsx"
    ],
    "extensions": [
      ".ts",
      ".cts",
      ".mts"
    ],
    "tmScope": "source.ts",
    "aceMode": "typescript",
    "codemirrorMode": "javascript",
    "codemirrorMimeType": "application/typescript",
    "parsers": [
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "typescript"
    ]
  },
  {
    "linguistLanguageId": 94901924,
    "name": "TSX",
    "type": "programming",
    "color": "#3178c6",
    "group": "TypeScript",
    "extensions": [
      ".tsx"
    ],
    "tmScope": "source.tsx",
    "aceMode": "javascript",
    "codemirrorMode": "jsx",
    "codemirrorMimeType": "text/jsx",
    "parsers": [
      "oxc-ts"
    ],
    "vscodeLanguageIds": [
      "typescriptreact"
    ]
  }
];

// with-default-export:packages/plugin-oxc/index.js
var plugin_oxc_default = index_exports;
export {
  plugin_oxc_default as default,
  languages_evaluate_default as languages,
  oxc_exports as parsers
};
