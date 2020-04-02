import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import { AlgolArticleData } from "../../types";

const newsDir = path.join(__dirname, "../material/news");
const processedNewsDir = path.join(__dirname, "../dist/news");
const allNews = fs.readdirSync(newsDir).filter(f => f != ".DS_Store");
const l = (d: string) => "n_" + d.replace(/-/g, "_");

// Build game2news db
const gameLinksFinder = /data-algollink="\/games\/[^"]+"/g;
const idExtracter = /"\/games\/([^"]+)"/;

const news2games: Record<string, string[]> = {};
const games2news: Record<string, string[]> = {};
for (const n of allNews) {
  const source = path.join(processedNewsDir, n, "news.html");
  const content = fs.readFileSync(source).toString();
  for (const hit of content.match(gameLinksFinder) || []) {
    const [, id] = hit.match(idExtracter) || [];
    if (id) {
      if (!news2games[n]) news2games[n] = [];
      if (!news2games[n].includes(id)) news2games[n].push(id);
      if (!games2news[id]) games2news[id] = [];
      if (!games2news[id].includes(n)) games2news[id].push(n);
    }
  }
}

(async () => {
  const file = await import(newsListPath);
  const list: AlgolArticleData[] = file.newsList;
  const newsWithGames: Record<string, { slug: string; title: string }> = {};
  for (const item of list) {
    for (const game of news2games[item.id] || []) {
      newsWithGames[item.id] = {
        slug: item.slug,
        title: item.title,
      };
    }
  }
  const mapperContent = `
    export const games2news = ${JSON.stringify(games2news)};
    export const newsWithGames = ${JSON.stringify(newsWithGames)};
  `;
  fs.writeFileSync(
    path.join(__dirname, "../dist/games2news.ts"),
    prettier.format(mapperContent, { filepath: "foo.ts" })
  );
})();

// Item imports (newsList.ts)

const itemImports = allNews.map(
  d => `import { listing as ${l(d)} } from './news/${d}/listing'`
);

const itemList = `// Generated by 'npm run listNews'

${itemImports.join("\n")}

export const newsList = [ ${allNews.map(l).join(", ")} ]`;

const newsListPath = path.join(__dirname, "../dist/newsList.ts");
fs.writeFileSync(
  newsListPath,
  prettier.format(itemList, { filepath: "foo.ts" })
);

// Full import (allNews.ts)

const fullImports = allNews.map(
  d => `import { news as ${l(d)} } from './news/${d}/news'`
);

const fullList = `// Generated by 'npm run listNews'

${fullImports.join("\n")}

export const allNews = {
  ${allNews.map(nid => `'${nid}': ${l(nid)}`).join(",\n")}
}
`;

fs.writeFileSync(
  path.join(__dirname, "../dist/allNews.ts"),
  prettier.format(fullList, { filepath: "foo.ts" })
);

(async () => {
  // game2news mapper
  const file = await import(newsListPath);
  const list: AlgolArticleData[] = file.newsList;
  const game2news: Record<string, string[]> = {};
  const newsWithGames: Record<string, { slug: string; title: string }> = {};
  for (const item of list) {
    for (const game of item.games) {
      newsWithGames[item.id] = {
        slug: item.slug,
        title: item.title,
      };
      game2news[game] = (game2news[game] || []).concat(item.id);
    }
  }
  const mapperContent = `
    export const games2news = ${JSON.stringify(game2news)};
    export const newsWithGames = ${JSON.stringify(newsWithGames)};
  `;
  fs.writeFileSync(
    path.join(__dirname, "../dist/games2news.ts"),
    prettier.format(mapperContent, { filepath: "foo.ts" })
  );
})();
