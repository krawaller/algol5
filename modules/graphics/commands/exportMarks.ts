import fs, { writeFileSync } from "fs-extra";
import prettier from "prettier";
import path from "path";
import svgToMiniDataURI from "mini-svg-data-uri";

import { allMarks } from "../picdata/marks";
import { svgPicSide } from "../picdata";

const out = path.join(__dirname, "../dist");

fs.emptyDirSync(path.join(out, "markSVGs"));
fs.emptyDirSync(path.join(out, "markURIs"));

const uris: Record<string, string> = {};

for (const [markId, def] of Object.entries(allMarks)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgPicSide} ${svgPicSide}">${def}</svg>`;
  writeFileSync(path.join(out, "markSVGs", `${markId}.svg`), svg);
  const dataURI = svgToMiniDataURI(svg);
  uris[markId] = dataURI;
  const exp = `export const ${markId}DataURI = "${dataURI}";\n`;
  writeFileSync(path.join(out, "markURIs", `${markId}.ts`), exp);
}

const markIds = Object.keys(allMarks);
const collection = `${markIds
  .map(markId => `export * from './markURIs/${markId}'`)
  .join("\n")}
${markIds
  .map(markId => `import { ${markId}DataURI } from './markURIs/${markId}'`)
  .join("\n")}
export const allMarkDataURIs = {
${markIds.map(markId => `${markId}: ${markId}DataURI`).join(", ")}
};`;
fs.writeFileSync(
  path.join(out, "allMarkDataURIs.ts"),
  prettier.format(collection, { filepath: "foo.ts" })
);
