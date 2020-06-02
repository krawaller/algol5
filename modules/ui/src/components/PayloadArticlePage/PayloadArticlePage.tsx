import React, { FunctionComponent } from "react";
import css from "./PayloadArticlePage.cssProxy";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolArticle, AppActions } from "../../../../types";
import { PayloadArticle } from "../PayloadArticle/PayloadArticle";

type PayloadArticlePageProps = {
  actions: AppActions;
  article: AlgolArticle;
};

export const PayloadArticlePage: FunctionComponent<PayloadArticlePageProps> = props => {
  const { actions, article } = props;
  const body = (
    <ScrollBox>
      <h3 className={css.payloadArticlePageTitle}>{article.title}</h3>
      <PayloadArticle actions={actions} article={article} />
    </ScrollBox>
  );
  return <Page top={null} body={body} />;
};
