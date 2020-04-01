import React, { FunctionComponent, useEffect, useMemo } from "react";
import css from "./ArticleList.cssProxy";
import { ArticleListItem } from "./ArticleList.Item";

export interface ArticleListActions {
  prefetch: (str: string) => void;
  navTo: (id: string) => void;
}

export type ArticleListProps = {
  actions: ArticleListActions;
  prefix: string;
  reverse?: boolean;
  list: {
    id: string;
    title: string;
    thumbdata: string;
    preloads: string[];
    blurb: string;
    slug: string;
    sort: string;
  }[];
};

export const ArticleList: FunctionComponent<ArticleListProps> = props => {
  let { actions, list, prefix, reverse } = props;
  if (prefix[0] !== "/") prefix = "/" + prefix;
  if (prefix.slice(-1) !== "/") prefix = prefix + "/";
  const listToRender = useMemo(() => {
    const ret = list.slice().sort((i1, i2) => (i1.sort < i2.sort ? -1 : 1));
    if (reverse) ret.reverse();
    return ret;
  }, [list]);
  return (
    <div className={css.articleList}>
      {listToRender.map(item => (
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
