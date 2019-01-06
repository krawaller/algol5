import * as fs from "fs-extra";
import * as path from "path";

const defs = path.join(__dirname, "definitions");
const out = path.join(__dirname, "dist");

fs.removeSync(out);
fs.ensureDirSync(out);
fs.ensureDirSync(path.join(out, "games"));

const gameIds = fs.readdirSync(defs).filter(gid => gid !== ".DS_Store");

fs.writeFileSync(
  path.join(out, "list.ts"),
  `const list = [${gameIds.map(gid => `"${gid}"`).join(", ")}];
export default list;
`
);

const gpath = path.join(out, "games");
fs.ensureDirSync(gpath);
gameIds.forEach(gid => {
  fs.writeFileSync(
    path.join(gpath, gid + ".ts"),
    `// File generated by 'npm run export'
import ${gid} from '../../definitions/${gid}/index';

export default ${gid};
export * from '../../definitions/${gid}/index';
`
  );
});

fs.writeFileSync(
  path.join(out, "lib.ts"),
  `${gameIds
    .map(gid => `import ${gid} from '../definitions/${gid}/index';`)
    .join("\n")}

const lib = {
${gameIds.map(gid => `  ${gid},\n`).join("")}};

export default lib;
`
);

fs.writeFileSync(
  path.join(out, "meta.ts"),
  `${gameIds
    .map(gid => `import ${gid}Meta from '../definitions/${gid}/meta';`)
    .join("\n")}

const meta = {
${gameIds.map(gid => `  ${gid}: ${gid}Meta,\n`).join("")}};

export default meta;
`
);
