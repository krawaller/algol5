import React, { Fragment, FunctionComponent } from "react";
import css from "./PayloadArticle.cssProxy";
import { AlgolArticle, AppActions } from "../../../../types";
import { Markdown } from "../Markdown";
import { PayloadArticleList } from "../PayloadArticleList";

type PayloadArticleProps = {
  actions: AppActions;
  article: AlgolArticle;
};

export const PayloadArticle: FunctionComponent<PayloadArticleProps> = props => {
  const { actions, article } = props;
  return (
    <>
      <Markdown html={article.html} actions={actions} />
      {article.relations
        .filter(rel => rel.listings.length)
        .map(rel => (
          <Fragment key={`rel-${rel.title}`}>
            {rel.title && (
              <div className={css.payloadArticleRelationHeader}>
                {rel.title}
              </div>
            )}
            <PayloadArticleList actions={actions} list={rel} />
          </Fragment>
        ))}
    </>
  );
};
