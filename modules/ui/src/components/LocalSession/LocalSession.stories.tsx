import React from "react";
import { storiesOf } from "@storybook/react";
import { GameId, list } from "../../../../games/dist/list";
import { select, boolean } from "@storybook/addon-knobs";
import { LocalSession, LocalSessionActions } from ".";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("LocalSession", module).add("LocalSession creator for game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const hasPrevious = boolean("Previous battle", false);
  const actions: LocalSessionActions = {
    load: save => console.log("Save", save),
    new: () => console.log("New!"),
    import: str => console.log("Import", str),
    continuePrevious: () => console.log("Previous!"),
    reportError: err => console.log("Error", err),
  };
  return (
    <LocalSession
      actions={actions}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      hasPrevious={hasPrevious}
    />
  );
});
