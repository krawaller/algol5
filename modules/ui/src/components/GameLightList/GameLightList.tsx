import React, { FunctionComponent } from "react";
import meta from "../../../../games/dist/meta";
import { list } from "../../../../games/dist/list";
import actionShots from "../../../../graphics/dist/allRegularActionShots";
import {
  ArticleList,
  ArticleListProps,
  ArticleListActions,
} from "../ArticleList";
import { gameSlug } from "../../../../common";

const data: ArticleListProps["list"] = list.map(id => ({
  id,
  blurb: meta[id].tagline,
  preloads: [],
  slug: gameSlug(meta[id]),
  title: meta[id].name,
  thumbdata: actionShots[id],
  sort: id,
}));

type GameLightListProps = {
  actions: ArticleListActions;
};

export const GameLightList: FunctionComponent<GameLightListProps> = props => {
  const { actions } = props;
  return <ArticleList actions={actions} list={data} prefix="/games/" />;
};
