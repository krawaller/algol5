import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GamePage } from ".";
import { GameId, list } from "../../../../games/dist/list";
import games from "../../../../logic/dist";
import meta from "../../../../games/dist/meta";
import demos from "../../../../battle/dist/allDemos";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { makeStaticGameAPI } from "../../../../battle/src";

storiesOf("GamePage", module).add(
  "Used for individual game pages in the app",
  () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const api = makeStaticGameAPI(games[gameId]);
    const graphics = dataURIs[gameId];
    return (
      <GamePage
        key={gameId}
        api={api}
        graphics={graphics}
        meta={meta[gameId]}
        demo={demos[gameId]}
        actions={{
          navTo: str => console.log("nav to", str),
          prefetch: str => console.log("prefetch", str),
        }}
      />
    );
  }
);
