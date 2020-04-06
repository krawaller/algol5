import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GamePage } from ".";
import { GameId, list } from "../../../../games/dist/list";

import allGamePayloads from "../../../dist/payloads";

storiesOf("GamePage", module).add(
  "Used for individual game pages in the app",
  () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const payload = allGamePayloads[gameId];
    return (
      <GamePage
        key={gameId}
        gamePayload={payload}
        actions={{
          navTo: str => console.log("nav to", str),
          prefetch: str => console.log("prefetch", str),
        }}
      />
    );
  }
);
