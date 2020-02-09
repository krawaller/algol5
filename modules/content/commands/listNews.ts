import fs from "fs-extra";
import path from "path";
import prettier from "prettier";

const newsDir = path.join(__dirname, "../material/news");
const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");
const l = (d: string) => "n_" + d.replace(/-/g, "_");

// Item imports

const itemImports = allNews.map(
  d => `import { listing as ${l(d)} } from './news/${d}/listing'`
);

const itemList = `// Generated by 'npm run listNews'

${itemImports.join("\n")}

export const newsList = [ ${allNews.map(l).join(", ")} ]`;

fs.writeFileSync(
  path.join(__dirname, "../dist/newsList.ts"),
  prettier.format(itemList, { filepath: "foo.ts" })
);

// Full import

const fullImports = allNews.map(
  d => `import { news as ${l(d)} } from './news/${d}/news'`
);

const fullList = `// Generated by 'npm run listNews'

${fullImports.join("\n")}

export const newsList = [ ${allNews.map(l).join(", ")} ]`;

fs.writeFileSync(
  path.join(__dirname, "../dist/fullNews.ts"),
  prettier.format(fullList, { filepath: "foo.ts" })
);
