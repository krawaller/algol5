import React, { FunctionComponent } from "react";
import gameListings from "../../../../payloads/dist/listings/games";
import { PayloadArticleList } from "../PayloadArticleList";
import { PageActions } from "../../helpers";

type GameLightListProps = {
  actions: PageActions;
};

export const GameLightList: FunctionComponent<GameLightListProps> = props => {
  const { actions } = props;
  return <PayloadArticleList actions={actions} list={gameListings} />;
};
