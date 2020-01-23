import React from "react";
import { storiesOf } from "@storybook/react";
import { ImportBattle } from ".";
import { ImportBattleActions } from "./ImportBattle";

storiesOf("ImportBattle", module).add("basic usage", () => {
  const actions: ImportBattleActions = {
    import: str => console.log("Importing", str),
    error: err => console.log("Error", err),
  };
  return (
    <div style={{ margin: 10 }}>
      <ImportBattle actions={actions} />
    </div>
  );
});
