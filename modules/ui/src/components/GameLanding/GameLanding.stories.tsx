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
  const content = {
    about: {
      updated: "2020-02-03",
      html: "text about " + gameId + " would be here",
    },
    rules: {
      updated: "2020-02-03",
      html: "rules for " + gameId + " would be here",
    },
  };
  return (
    <GameLanding
      content={content}
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      actions={actions}
      hasPrevious={hasPrevious}
    />
  );
});
