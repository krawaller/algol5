import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";

const aboutArticlesFolder = path.join(__dirname, "../../dist/articles/about");

export const makeAboutArticle = (aboutId: string) => {
  const aboutYaml = require(`../../../content/dist/about/${aboutId}/listing`)
    .listing;
  const aboutHtml = require(`../../../content/dist/about/${aboutId}/about`)
    .about;
  fs.ensureDirSync(aboutArticlesFolder);
  const code = `
// Created by the makeAboutArticle command
import { AlgolArticle } from '../../../../types'

const article: AlgolArticle = {
  id: "${aboutId}",
  blurb: "${aboutYaml.blurb}",
  slug: "${aboutYaml.slug}",
  title: "${aboutYaml.title}",
  mainImage: "${aboutYaml.mainImage}",
  updated: "${aboutYaml.updated}",
  html: \`${aboutHtml}\`
};

export default article;
`;
  writeFileSync(
    path.join(aboutArticlesFolder, `${aboutId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article created for about", aboutId);
};
