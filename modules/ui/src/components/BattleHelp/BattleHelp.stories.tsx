import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { GameId, list } from "../../../../games/dist/list";
import allStatefulAPIs from "../../../../battle/dist/allStatefulAPIs";

import { BattleHelp, BattleHelpActions } from ".";

const actions: BattleHelpActions = {
  endTurn: () => console.log("endTurn"),
  command: (cmnd: string) => console.log("cmnd", cmnd),
};

storiesOf("BattleHelp", module).add("A common BattleHelp component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const api = allStatefulAPIs[gameId];
  const { instruction } = api.newBattle().initialUI;
  return (
    <div style={{ padding: 10 }}>
      <BattleHelp actions={actions} instruction={instruction} />
    </div>
  );
});
