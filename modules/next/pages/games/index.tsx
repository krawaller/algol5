import React from "react";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import games from "../../../payloads/dist/listings/games";

// TODO - more metadata!

const crumbs = [{ content: "Games" }];

const GameIndexPage: AlgolPage = props => {
  return (
    <PayloadArticleListPage
      crumbs={crumbs}
      actions={props.actions}
      title={`All ${games.length} games`}
      list={games}
    />
  );
};

GameIndexPage.title = `All ${games.length} games`;

export default GameIndexPage;
