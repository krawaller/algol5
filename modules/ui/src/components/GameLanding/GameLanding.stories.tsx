import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { GameLanding, GameLandingActions } from ".";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("GameLanding", module).add("init game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const hasPrevious = boolean("Previous battle", false);
  const actions: GameLandingActions = {
    newLocalBattle: () => console.log("new battle"),
    loadLocalSession: save => console.log("loading save", save),
    navTo: path => console.log("navigating to", path),
    toBattleLobby: () => console.log("to battle lobby"),
    importSession: (str: string) => {
      console.log("Import", str);
    },
    continuePreviousSession: () => console.log("previous"),
    reportError: err => console.log("error", err),
  };
  return (
    <GameLanding
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      actions={actions}
      hasPrevious={hasPrevious}
    />
  );
});
