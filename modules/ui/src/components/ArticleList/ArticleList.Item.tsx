import React, { FunctionComponent, useCallback } from "react";
import css from "./ArticleList.cssProxy";
import { Link } from "../Link";

export interface ArticleListItemActions {
  navTo: (url: string) => void;
  prefetch: (url: string) => void;
}

type ArticleListItemProps = {
  actions: ArticleListItemActions;
  url: string;
  item: {
    id: string;
    title: string;
    thumbdata: string;
    blurb: string;
  };
};

export const ArticleListItem: FunctionComponent<ArticleListItemProps> = props => {
  const { actions, item, url } = props;
  const { id, title, thumbdata, blurb } = item;
  const handleClick = useCallback(() => actions.navTo(url), [
    id,
    actions.navTo,
  ]);
  return (
    <Link url={url} actions={actions} styleMode="none">
      <div className={css.articleListItem} key={id} onClick={handleClick}>
        <div>
          <img src={thumbdata} />
        </div>
        <div className={css.articleListInfoBox}>
          <h4 className={css.articleListInfoTitle}>{title}</h4>
          {blurb}
        </div>
      </div>
    </Link>
  );
};
