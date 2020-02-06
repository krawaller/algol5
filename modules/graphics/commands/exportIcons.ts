import fs, { writeFileSync } from "fs-extra";
import prettier from "prettier";
import path from "path";
import svgToMiniDataURI from "mini-svg-data-uri";
import { allIcons } from "../sprites";

const out = path.join(__dirname, "../dist");

fs.emptyDirSync(path.join(out, "iconSVGs"));
fs.emptyDirSync(path.join(out, "exportedIconSVGs"));

const iconNames = Object.keys(allIcons);
const iconSVGs: Record<string, string> = {};

for (const icon of iconNames) {
  const def = allIcons[icon];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">${def}</svg>`;
  writeFileSync(path.join(out, "iconSVGs", `${icon}.svg`), svg);
  const exp = `export const ${icon}SVG = '${svg}';\n`;
  writeFileSync(path.join(out, "exportedIconSVGs", `${icon}SVG.ts`), exp);
  iconSVGs[icon] = svg;
}

const collection = `${iconNames
  .map(icon => `export * from './exportedIconSVGs/${icon}SVG'`)
  .join("\n")}
${iconNames
  .map(icon => `import { ${icon}SVG } from './exportedIconSVGs/${icon}SVG'`)
  .join("\n")}
export const allIcons = {
${iconNames.map(icon => `${icon}SVG`).join(", ")}
};`;
fs.writeFileSync(
  path.join(out, "allIconSVGs.ts"),
  prettier.format(collection, { filepath: "foo.ts" })
);

const dataURIs = `export const iconDataURIs = {
  ${iconNames
    .map(icon => `${icon}: "${svgToMiniDataURI(iconSVGs[icon])}"`)
    .join(", ")}
};
`;
fs.writeFileSync(
  path.join(out, "iconDataURIs.ts"),
  prettier.format(dataURIs, { filepath: "foo.ts" })
);
