import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";

const aboutArticlesFolder = path.join(__dirname, "../../dist/articles/about");

export const makeAboutArticle = (aboutId: string) => {
  const aboutYaml = require(`../../../content/dist/about/${aboutId}/listing`)
    .listing;
  fs.ensureDirSync(aboutArticlesFolder);
  const code = `
// Created by the makeAboutArticle command
import { AlgolArticle } from '../../../../types'
import { about } from '../../../../content/dist/about/${aboutId}/about'

const article: AlgolArticle = {
  id: "${aboutId}",
  blurb: "${aboutYaml.blurb}",
  slug: "${aboutYaml.slug}",
  title: "${aboutYaml.title}",
  mainImage: "${aboutYaml.mainImage}",
  updated: "${aboutYaml.updated}",
  html: about,
  relations: []
};

export default article;
`;
  writeFileSync(
    path.join(aboutArticlesFolder, `${aboutId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article created for about", aboutId);
};
