import React, { FunctionComponent, useEffect } from "react";
import css from "./ArticleList.cssProxy";
import { ArticleListItem } from "./ArticleList.Item";

export interface ArticleListActions {
  prefetch: (str: string) => void;
  goToArticle: (id: string) => void;
}

type ArticleListProps = {
  actions: ArticleListActions;
  list: {
    id: string;
    title: string;
    thumbdata: string;
    preloads: string[];
    blurb: string;
  }[];
};

export const ArticleList: FunctionComponent<ArticleListProps> = props => {
  const { actions, list } = props;
  useEffect(() => {
    for (const item of list) {
      for (const preload of item.preloads) {
        actions.prefetch(preload);
      }
    }
  }, []);
  return (
    <div className={css.articleList}>
      {list
        .slice()
        .reverse()
        .map(item => (
          <ArticleListItem key={item.id} item={item} actions={actions} />
        ))}
    </div>
  );
};
