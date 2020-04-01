import React, { FunctionComponent } from "react";
import meta from "../../../../games/dist/meta";
import { list } from "../../../../games/dist/list";
import actionShots from "../../../../graphics/dist/allRegularActionShots";
import {
  ArticleList,
  ArticleListProps,
  ArticleListActions,
} from "../ArticleList";

const data: ArticleListProps["list"] = list.map(id => ({
  id,
  blurb: meta[id].tagline,
  preloads: [],
  slug: id,
  title: meta[id].name,
  thumbdata: actionShots[id],
}));

type GameLightListProps = {
  actions: ArticleListActions;
};

export const GameLightList: FunctionComponent<GameLightListProps> = props => {
  const { actions } = props;
  return <ArticleList actions={actions} list={data} prefix="/games/" />;
};
