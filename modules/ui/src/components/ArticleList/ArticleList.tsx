import React, { FunctionComponent } from "react";
import css from "./ArticleList.cssProxy";
import { ArticleListItem } from "./ArticleList.Item";

export interface ArticleListActions {
  foo: () => void;
}

type ArticleListProps = {
  actions: ArticleListActions;
  list: {
    id: string;
    title: string;
    thumbdata: string;
    blurb: string;
  }[];
};

export const ArticleList: FunctionComponent<ArticleListProps> = props => {
  const { actions, list } = props;
  return (
    <div className={css.articleList}>
      {list.reverse().map(item => (
        <ArticleListItem key={item.id} item={item} actions={actions} />
      ))}
    </div>
  );
};
