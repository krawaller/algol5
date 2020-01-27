import React from "react";
import { storiesOf } from "@storybook/react";
import { ImportBattle } from ".";
import { ImportBattleActions } from "./ImportBattle";

storiesOf("ImportBattle", module).add("basic usage", () => {
  const actions: ImportBattleActions = {
    importSession: str => console.log("Importing", str),
    reportError: err => console.log("Error", err),
  };
  return (
    <div style={{ margin: 10 }}>
      <ImportBattle actions={actions} />
    </div>
  );
});
