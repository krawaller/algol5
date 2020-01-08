import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { SessionList } from ".";
import { GameId, list } from "../../../../games/dist/list";
import { getSessionList } from "../../../../local/src";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { SessionListActions } from "./SessionList";

storiesOf("SessionList", module).add("SessionList component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const finished = boolean("Finished", false);
  const sessions = getSessionList(gameId, finished);
  const actions: SessionListActions = {
    load: save => console.log("Save", save),
  };
  return (
    <Fragment>
      <div>
        Listing {finished ? "finished" : "ongoing"} battles of {gameId} from
        localStorage:
      </div>
      <hr />
      <SessionList
        sessions={sessions}
        graphics={dataURIs[gameId]}
        actions={actions}
      />
    </Fragment>
  );
});
