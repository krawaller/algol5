import prettier from "prettier";
import { AlgolArticle, AlgolMeta, AlgolGameBlobAnon } from "../../../types";
import allMeta from "../../../games/dist/meta";

export const makeGameRulesPage = (article: AlgolArticle) => {
  const meta: AlgolMeta<AlgolGameBlobAnon> = allMeta[article.id];
  const content = `
// Generated by the makeGameRulesPage command

import React, { Fragment } from "react";

import Head from "next/head";
import { PayloadArticlePage } from "../../../../../ui/src/components/PayloadArticlePage";
import { pageActions } from "../../../../helpers";
import article from "../../../../../payloads/dist/articles/gamesRules/${meta.id}";

export const Game = () => {
  const crumbs = [
    { content: "Games", url: "/games" },
    { content: "${meta.name}", url: "/games/${meta.id}" },
    { content: "Rules" }
  ];
  return (
    <Fragment>
      <Head>
        <meta property="og:site_name" content="Chessicals"/>
        <meta property="og:image" content={article.mainImage} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.blurb} />
        <title>{article.title}</title>
      </Head>
      <PayloadArticlePage
        crumbs={crumbs}
        article={article}
        actions={pageActions}
      />
    </Fragment>
  );
};

export default Game;
`;
  return prettier.format(content, { filepath: "foo.ts" });
};
