import fs, { writeFileSync } from "fs-extra";
import prettier from "prettier";
import path from "path";
import svgToMiniDataURI from "mini-svg-data-uri";
import { icons } from "../picdata";
import { getIconShape } from "./helpers/getIconShape";

const out = path.join(__dirname, "../dist");

fs.emptyDirSync(path.join(out, "iconSVGs"));
fs.emptyDirSync(path.join(out, "exportedIconSVGs"));

const iconSVGs: Record<string, string> = {};

for (const icon of icons) {
  for (const owner of [0, 1, 2] as (0 | 1 | 2)[]) {
    const def = getIconShape(icon, owner);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">${def}</svg>`;
    writeFileSync(path.join(out, "iconSVGs", `${icon}${owner}.svg`), svg);
    const exp = `export const ${icon}${owner}SVG = '${svg}';\n`;
    writeFileSync(
      path.join(out, "exportedIconSVGs", `${icon}${owner}SVG.ts`),
      exp
    );
    iconSVGs[icon + owner] = svg;
  }
}

const ownedIcons = icons
  .map(icon => icon + "0")
  .concat(icons.map(icon => icon + "1"))
  .concat(icons.map(icon => icon + "2"));

const collection = `${ownedIcons
  .map(icon => `export * from './exportedIconSVGs/${icon}SVG'`)
  .join("\n")}
${ownedIcons
  .map(icon => `import { ${icon}SVG } from './exportedIconSVGs/${icon}SVG'`)
  .join("\n")}
export const allIcons = {
${ownedIcons.map(icon => `${icon}SVG`).join(", ")}
};`;
fs.writeFileSync(
  path.join(out, "allIconSVGs.ts"),
  prettier.format(collection, { filepath: "foo.ts" })
);

const dataURIs = `export const iconDataURIs = {
  ${ownedIcons
    .map(icon => `${icon}: "${svgToMiniDataURI(iconSVGs[icon])}"`)
    .join(", ")}
};
`;
fs.writeFileSync(
  path.join(out, "iconDataURIs.ts"),
  prettier.format(dataURIs, { filepath: "foo.ts" })
);
