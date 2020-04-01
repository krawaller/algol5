import React from "react";
import { storiesOf } from "@storybook/react";

import { GameListPage } from ".";
import { PageActions } from "../../helpers";

storiesOf("GameListPage", module).add("A common GameListPage component", () => {
  const actions: PageActions = {
    navTo: str => console.log("nav to", str),
    prefetch: str => console.log("prefetch", str),
  };
  return (
    <div style={{ padding: 10 }}>
      <GameListPage actions={actions} />
    </div>
  );
});
