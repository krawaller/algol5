import React, { FunctionComponent } from "react";
import { PageActions } from "../../helpers";
import css from "./PayloadArticlePage.cssProxy";
import { Page } from "../Page";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";
import { AlgolArticle } from "../../../../types";
import { PayloadArticle } from "../PayloadArticle/PayloadArticle";

type PayloadArticlePageProps = {
  actions: PageActions;
  article: AlgolArticle;
  crumbs: Crumb[];
};

export const PayloadArticlePage: FunctionComponent<PayloadArticlePageProps> = props => {
  const { actions, article, crumbs } = props;
  const body = (
    <ScrollBox>
      <h3 className={css.payloadArticlePageTitle}>{article.title}</h3>
      <PayloadArticle actions={actions} article={article} />
    </ScrollBox>
  );
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={body}
    />
  );
};
