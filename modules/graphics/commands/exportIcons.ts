import fs, { writeFileSync } from "fs-extra";
import path from "path";
import svgToMiniDataURI from "mini-svg-data-uri";
import { icons } from "../picdata";
import { getIconShape } from "./helpers/getIconShape";

const out = path.join(__dirname, "../dist");

fs.emptyDirSync(path.join(out, "iconSVGs"));

for (const icon of icons) {
  for (const owner of [0, 1, 2] as (0 | 1 | 2)[]) {
    const def = getIconShape(icon, owner);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">${def}</svg>`;
    writeFileSync(path.join(out, "iconSVGs", `${icon}${owner}.svg`), svg);
  }
}

const collection = `${icons.map(icon => `export * from './${icon}'`).join("\n")}
${icons.map(icon => `import { ${icon} } from './${icon}'`).join("\n")}
export const allIcons = {
${icons.map(icon => `${icon}`).join(", \n")}
};`;

fs.writeFileSync(path.join(out, "allIconDefs.ts"), collection);
