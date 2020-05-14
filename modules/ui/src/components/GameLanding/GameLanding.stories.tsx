import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { GameLanding, GameLandingActions } from ".";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { AlgolVariantAnon } from "../../../../types";

storiesOf("GameLanding", module).add("init game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const hasPrevious = boolean("Previous battle", false);
  const actions: GameLandingActions = {
    newLocalBattle: (code: string) => console.log("new battle", code),
    loadLocalSession: id => console.log("Loading session id", id),
    navTo: path => console.log("navigating to", path),
    prefetch: path => console.log("prefetch", path),
    toBattleLobby: () => console.log("to battle lobby"),
    importSession: (str: string) => {
      console.log("Import", str);
    },
    reportError: err => console.log("error", err),
  };
  const variants: AlgolVariantAnon[] = [
    {
      board: "regular",
      code: "x",
      desc: "regular",
      ruleset: "regular",
      setup: "regular",
    },
  ];
  return (
    <GameLanding
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      actions={actions}
      previousSessionId={hasPrevious ? "somePreviousId" : undefined}
      variants={variants}
    />
  );
});
