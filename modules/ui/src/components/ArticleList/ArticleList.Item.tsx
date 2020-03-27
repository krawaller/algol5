import React, { FunctionComponent, useCallback } from "react";
import css from "./ArticleList.cssProxy";

export interface ArticleListItemActions {
  goToArticle: (id: string) => void;
}

type ArticleListItemProps = {
  actions: ArticleListItemActions;
  item: {
    id: string;
    title: string;
    thumbdata: string;
    blurb: string;
  };
};

export const ArticleListItem: FunctionComponent<ArticleListItemProps> = props => {
  const { actions, item } = props;
  const { id, title, thumbdata, blurb } = item;
  const handleClick = useCallback(() => actions.goToArticle(id), [
    id,
    actions.goToArticle,
  ]);
  return (
    <div className={css.articleListItem} key={id} onClick={handleClick}>
      <div>
        <img src={thumbdata} />
      </div>
      <div className={css.articleListInfoBox}>
        <h4 className={css.articleListInfoTitle}>{title}</h4>
        {blurb}
      </div>
    </div>
  );
};
