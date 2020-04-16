import React, { Fragment, FunctionComponent } from "react";
import css from "./PayloadArticle.cssProxy";
import { AlgolArticle } from "../../../../types";
import { Markdown } from "../Markdown";
import { PayloadArticleList } from "../PayloadArticleList";

export interface PayloadArticleActions {
  prefetch: (str: string) => void;
  navTo: (id: string) => void;
}

type PayloadArticleProps = {
  actions: PayloadArticleActions;
  article: AlgolArticle;
};

export const PayloadArticle: FunctionComponent<PayloadArticleProps> = props => {
  const { actions, article } = props;
  return (
    <>
      <Markdown html={article.html} actions={actions} />
      {Object.entries(article.relations)
        .filter(([, list]) => list.length)
        .map(([header, list]) => (
          <Fragment key={header}>
            <div className={css.payloadArticleRelationHeader}>{header}</div>
            <PayloadArticleList actions={actions} list={list} />
          </Fragment>
        ))}
    </>
  );
};
