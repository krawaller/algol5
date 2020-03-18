import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { GameId, list } from "../../../../games/dist/list";
import allStatefulAPIs from "../../../../battle/dist/allStatefulAPIs";

import { BattleHelp, BattleHelpActions } from ".";

storiesOf("BattleHelp", module).add("A common BattleHelp component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const { rules } = require(`../../../../content/dist/games/${gameId}/rules`);
  const actions: BattleHelpActions = {
    navTo: url => console.log("Nav to", url),
  };
  const api = allStatefulAPIs[gameId];
  const { instruction } = api.newBattle().initialUI;
  return (
    <div style={{ padding: 10 }}>
      <BattleHelp
        actions={actions}
        content={{ rules }}
        instruction={instruction}
      />
    </div>
  );
});
