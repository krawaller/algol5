import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { GameId, list } from "../../../../games/dist/list";
import allStatefulAPIs from "../../../../battle/dist/allStatefulAPIs";

import { BattleMove, BattleMoveActions } from ".";

const actions: BattleMoveActions = {
  navTo: url => console.log("Nav to", url),
  prefetch: url => console.log("Prefetch", url),
  undoBattleCommand: () => console.log("undo"),
  endTurn: () => console.log("endTurn"),
  command: (cmnd: string) => console.log("cmnd", cmnd),
};

storiesOf("BattleMove", module).add("A common BattleMove component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const { rules } = require(`../../../../content/dist/games/${gameId}/rules`);
  const api = allStatefulAPIs[gameId];
  const ui = api.newBattle().initialUI;
  return (
    <div style={{ padding: 10, height: 400, position: "relative" }}>
      <BattleMove actions={actions} rules={rules} ui={ui} />
    </div>
  );
});
