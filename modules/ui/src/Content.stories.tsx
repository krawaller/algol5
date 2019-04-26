import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Content } from "./Content";
import allAPIs from "../../battle/dist/allAPIs";

import { GameId, list } from "../../games/dist/list";

storiesOf("Content", module).add("Battle start instructions", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const api = allAPIs[gameId];
  const ui = api.newBattle().initialUI;
  return (
    <div>
      <p>First instruction when playing {gameId}:</p>
      <Content content={ui.instruction} callback={() => {}} />
    </div>
  );
});
