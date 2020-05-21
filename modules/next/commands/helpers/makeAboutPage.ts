import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import { AlgolArticle } from "../../../types";

const aboutFolder = path.join(__dirname, "../../pages/about");

export const makeAboutPage = (article: AlgolArticle) => {
  const content = `
  // Generated by the makeAboutPage command
  
  import React from "react";
  
  import { PayloadArticlePage } from "../../../../ui/src/components/PayloadArticlePage";
  import { AlgolPage } from "../../../../ui/src/helpers/algolPage";
  import article from "../../../../payloads/dist/articles/about/${article.id}";
  
  export const AboutArticle: AlgolPage = props => {
    const crumbs = [{ content: "About", url: "/about" }, { content: article.title }];
    return (
      <PayloadArticlePage
        crumbs={crumbs}
        article={article}
        actions={props.actions}
      />
    );
  };

  AboutArticle.mainImage = article.mainImage
  AboutArticle.title = article.title
  AboutArticle.metaDesc = article.blurb
  
  export default AboutArticle;
  `;
  const out = path.join(aboutFolder, article.slug);
  fs.emptyDirSync(out);
  fs.writeFileSync(
    path.join(out, "index.tsx"),
    prettier.format(content, { filepath: "foo.ts" })
  );
  console.log("Made about page for", article.id);
};
