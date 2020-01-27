import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { SessionList } from ".";
import { GameId, list } from "../../../../games/dist/list";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { SessionListActions } from "./SessionList";
import meta from "../../../../games/dist/meta";

storiesOf("SessionList", module).add("SessionList component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const finished = boolean("Finished", false);
  const actions: SessionListActions = {
    loadLocalSession: save => console.log("Save", save),
  };
  return (
    <Fragment>
      <div>
        Listing {finished ? "finished" : "ongoing"} battles of {gameId} from
        localStorage:
      </div>
      <hr />
      <SessionList
        graphics={dataURIs[gameId]}
        actions={actions}
        meta={meta[gameId]}
      />
    </Fragment>
  );
});
