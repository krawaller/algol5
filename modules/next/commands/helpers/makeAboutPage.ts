import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import { AlgolArticle } from "../../../types";

const aboutFolder = path.join(__dirname, "../../pages/about");

export const makeAboutPage = (article: AlgolArticle) => {
  const content = `
  // Generated by the makeAboutPage command
  
  import React, { Fragment } from "react";
  
  import Head from "next/head";
  import { PayloadArticlePage } from "../../../../ui/src/components/PayloadArticlePage";
  import { AlgolPage } from "../../../../ui/src/helpers/algolPage";
  import article from "../../../../payloads/dist/articles/about/${article.id}";
  
  export const Article: AlgolPage = props => {
    const crumbs = [{ content: "About", url: "/about" }, { content: article.title }];
    return (
      <Fragment>
        <Head>
          <meta property="og:image" content={article.mainImage} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.blurb}/>
          <title>{article.title}</title>
        </Head>
        <PayloadArticlePage
          crumbs={crumbs}
          article={article}
          actions={props.actions}
        />
      </Fragment>
    );
  };
  
  export default Article;
  `;
  const out = path.join(aboutFolder, article.slug);
  fs.emptyDirSync(out);
  fs.writeFileSync(
    path.join(out, "index.tsx"),
    prettier.format(content, { filepath: "foo.ts" })
  );
  console.log("Made about page for", article.id);
};
