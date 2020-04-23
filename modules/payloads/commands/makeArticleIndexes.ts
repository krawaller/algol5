import prettier from "prettier";
import fs from "fs-extra";
import path from "path";

const articlesPath = path.join(__dirname, "../dist/articles");
const articles = fs.readdirSync(articlesPath).filter(d => d != ".DS_Store");
for (const article of articles) {
  const dir = path.join(articlesPath, article);
  const all = fs
    .readdirSync(dir)
    .filter(f => f != ".DS_Store" && f != "index.ts")
    .map(t => t.replace(/\.ts$/, ""));
  const code = `// Generated by makeArticleIndexes command
  ${all.map(id => `import ${id} from './${id}'`).join("\n")}
  export const ${article}Articles = [${all.join(", ")}]
  export default ${article}Articles;
  `;
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article index generated for", article);
}