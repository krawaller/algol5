import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Demo } from "./Demo";
import { GameId, list } from "../../games/dist/list";

import dataURIs from "../../graphics/dist/svgDataURIs";
import demos from "../../battle/dist/allDemos";

storiesOf("Demo", module).add("test game demos", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  return <Demo key={gameId} board={dataURIs[gameId]} demo={demos[gameId]} />;
});
