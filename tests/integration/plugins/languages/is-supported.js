import path from "node:path";
import createPlugin from "../../../config/utils/create-plugin.cjs";

const PARSER_NAME = "parser-name-inferred-from-language-is-supported";
const PRINT_MARK = `formatted by '${PARSER_NAME}' parser`

const languages = [
  {
    name: "language-name-does-not-matter",
    parsers: [PARSER_NAME],
    isSupported(file) {
      if (!path.isAbsolute(file)) {
        throw new Error("Unexpected non absolute path");
      }

      return /(?<separator>[\\/])\.husky\k<separator>[^\\/]+$/u.test(file);
    },
  },
];

export default {
  ...createPlugin({
    name: PARSER_NAME,
    print: (content) => `${content.replace(PRINT_MARK,"").trim()}\n${PRINT_MARK}`,
    finalNewLine: false,
  }),
  languages,
};
