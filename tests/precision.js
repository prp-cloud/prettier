import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { format } from "../index.js";

// eslint-disable-next-line no-console
for (const filepath of ["union-array.ts"]) {
  // eslint-disable-next-line no-console
  console.log(
    `<${await format(
      `${readFileSync(
        `${dirname(fileURLToPath(import.meta.url))}/${filepath}`,
      )}`,
      { filepath },
    )}>`,
  );
}
process.exit();
