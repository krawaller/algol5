import React, { FunctionComponent, useEffect } from "react";
import css from "./ArticleList.cssProxy";
import { ArticleListItem } from "./ArticleList.Item";

export interface ArticleListActions {
  prefetch: (str: string) => void;
  navTo: (id: string) => void;
}

export type ArticleListProps = {
  actions: ArticleListActions;
  prefix: string;
  list: {
    id: string;
    title: string;
    thumbdata: string;
    preloads: string[];
    blurb: string;
    slug: string;
  }[];
};

export const ArticleList: FunctionComponent<ArticleListProps> = props => {
  let { actions, list, prefix } = props;
  if (prefix[0] !== "/") prefix = "/" + prefix;
  if (prefix.slice(-1) !== "/") prefix = prefix + "/";
  return (
    <div className={css.articleList}>
      {list
        .slice()
        .reverse()
        .map(item => (
          <ArticleListItem
            key={item.id}
            item={item}
            actions={actions}
            url={`${prefix}${item.slug}`}
          />
        ))}
    </div>
  );
};
