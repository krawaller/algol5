import React, { FunctionComponent } from "react";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolArticle } from "../../../../types";
import { PayloadArticle } from "../PayloadArticle/PayloadArticle";

type PayloadArticlePageProps = {
  article: AlgolArticle;
};

export const PayloadArticlePage: FunctionComponent<PayloadArticlePageProps> = props => {
  const { article } = props;
  const body = (
    <ScrollBox>
      <PayloadArticle article={article} />
    </ScrollBox>
  );
  return <Page title={article.title} top={null} body={body} />;
};
