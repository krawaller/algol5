import React from "react";
import { storiesOf } from "@storybook/react";
import { ImportBattle } from ".";

storiesOf("ImportBattle", module).add("basic usage", () => {
  return (
    <div style={{ margin: 10 }}>
      <ImportBattle
        actions={{ import: str => console.log("Importing", str) }}
      />
    </div>
  );
});
