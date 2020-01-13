import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GameLanding, GameLandingActions } from ".";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("GameLanding", module).add("init game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const actions: GameLandingActions = {
    new: () => console.log("new game"),
    load: save => console.log("loading save", save),
    navTo: path => console.log("navigating to", path),
    toBattleLobby: () => console.log("to battle lobby"),
    import: (str: string) => console.log("Import", str),
  };
  return (
    <GameLanding
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      actions={actions}
      session={null}
    />
  );
});
