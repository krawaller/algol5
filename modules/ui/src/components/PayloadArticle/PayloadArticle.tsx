import React, { Fragment, FunctionComponent } from "react";
import css from "./PayloadArticle.cssProxy";
import { AlgolArticle } from "../../../../types";
import { Markdown } from "../Markdown";
import { PayloadArticleList } from "../PayloadArticleList";

type PayloadArticleProps = {
  article: AlgolArticle;
};

export const PayloadArticle: FunctionComponent<PayloadArticleProps> = props => {
  const { article } = props;
  return (
    <>
      <Markdown html={article.html} />
      {article.relations
        .filter(rel => rel.listings.length)
        .map(rel => (
          <Fragment key={`rel-${rel.title}`}>
            {rel.title && (
              <div className={css.payloadArticleRelationHeader}>
                {rel.title}
              </div>
            )}
            <PayloadArticleList list={rel} />
          </Fragment>
        ))}
    </>
  );
};
