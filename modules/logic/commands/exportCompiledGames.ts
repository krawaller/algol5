import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../dist");
const games = path.join(__dirname, "../generated");

(async () => {
  await fs.remove(out);
  await fs.mkdir(out);
  const names = (await fs.readdir(games))
    .filter(g => g !== ".DS_Store")
    .map(fileName => fileName.replace(/\.ts/, ""));

  await fs.writeFile(
    path.join(out, "index.ts"),
    `${names
      .map(name => `import ${name} from '../generated/${name}';`)
      .join("\n")}
const games = {
  ${names.join(", ")}
};

export default games;
`
  );

  await fs.ensureDir(path.join(out, "indiv"));
  await Promise.all(
    names.map(async name =>
      fs.writeFile(
        path.join(out, "indiv", name + ".ts"),
        `import ${name} from '../../generated/${name}';
import { AlgolGame } from '../../../types';
export default ${name} as AlgolGame;
`
      )
    )
  );

  console.log("Exported all games!");
})();
