import React, { FunctionComponent } from "react";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolArticle } from "../../../../types";
import { PayloadArticle } from "../PayloadArticle/PayloadArticle";
import { AppActions } from "../../contexts";

type PayloadArticlePageProps = {
  actions: AppActions;
  article: AlgolArticle;
};

export const PayloadArticlePage: FunctionComponent<PayloadArticlePageProps> = props => {
  const { actions, article } = props;
  const body = (
    <ScrollBox>
      <PayloadArticle actions={actions} article={article} />
    </ScrollBox>
  );
  return <Page title={article.title} top={null} body={body} />;
};
