import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { SessionViewSelector, SessionViewSelectorActions } from ".";

const views = ["history", "playing", "battlelobby"] as const;

storiesOf("SessionViewSelector", module).add(
  "A common SessionViewSelector component",
  () => {
    const actions: SessionViewSelectorActions = {
      toHistory: () => console.log("to history"),
      toBattleControls: () => console.log("to battle controls"),
      toBattleLobby: () => console.log("to lobby"),
    };
    const view = select("View", views, views[0]);
    return (
      <div style={{ padding: 10 }}>
        <SessionViewSelector actions={actions} mode={view} />
      </div>
    );
  }
);
