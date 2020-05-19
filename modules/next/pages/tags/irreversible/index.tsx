// Generated by the makeTagPage command

import React, { Fragment } from "react";

import Head from "next/head";
import { PayloadArticlePage } from "../../../../ui/src/components/PayloadArticlePage";
import { AlgolPage } from "../../../helpers/pageProps";

import article from "../../../../payloads/dist/articles/tags/irreversible";

export const Article: AlgolPage = props => {
  const crumbs = [
    { content: "Tags", url: "/tags" },
    { content: article.title }
  ];
  return (
    <Fragment>
      <Head>
        <meta property="og:site_name" content="Chessicals" />
        <meta property="og:image" content={article.mainImage} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.blurb} />
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
