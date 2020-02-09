import React, { FunctionComponent } from "react";
import css from "./ArticleList.cssProxy";

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
    <div className={css.articleListContainer}>
      {list.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <img src={item.thumbdata} />
          {item.blurb}
        </div>
      ))}
    </div>
  );
};
