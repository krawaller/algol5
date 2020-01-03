import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GameLanding } from ".";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("GameLanding", module).add("init game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  return (
    <GameLanding
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      callback={arg => console.log(arg)}
    />
  );
});
