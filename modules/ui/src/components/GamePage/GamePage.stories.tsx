import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GamePage } from ".";
import { GameId, list } from "../../../../games/dist/list";
import games from "../../../../logic/dist";
import meta from "../../../../games/dist/meta";
import defs from "../../../../games/dist/lib";
import demos from "../../../../battle/dist/allDemos";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { makeStaticGameAPI } from "../../../../battle/src";

storiesOf("GamePage", module).add(
  "Used for individual game pages in the app",
  () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const api = makeStaticGameAPI(games[gameId], defs[gameId].setups);
    const graphics = dataURIs[gameId];
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
      <GamePage
        key={gameId}
        api={api}
        graphics={graphics}
        meta={meta[gameId]}
        demo={demos[gameId]}
        content={content}
        actions={{
          navTo: str => console.log("nav to", str),
          prefetch: str => console.log("prefetch", str),
        }}
      />
    );
  }
);
