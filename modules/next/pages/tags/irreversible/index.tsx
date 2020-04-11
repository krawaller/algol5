// Generated by the makeTagPage command

import React, { Fragment } from "react";

import Head from "next/head";
import { ArticlePage } from "../../../../ui/src/components/ArticlePage";
import { pageActions } from "../../../helpers";
import { tag } from "../../../../content/dist/tags/irreversible/tag";

export const Article = () => {
  const title = `Irreversible`;
  const crumbs = [
    { content: "Tags", url: "/tags" },
    { content: "Irreversible" }
  ];
  return (
    <Fragment>
      <Head>
        <meta property="og:site_name" content="Chessicals" />
        <meta
          property="og:image"
          content="/images/tags/irreversible/wip-big.png"
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Games with irreversible moves"
        />
        <title>{title}</title>
      </Head>
      <ArticlePage
        crumbs={crumbs}
        title={title}
        actions={pageActions}
        html={tag}
      />
    </Fragment>
  );
};

export default Article;