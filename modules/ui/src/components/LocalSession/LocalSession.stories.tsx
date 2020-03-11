import React from "react";
import { storiesOf } from "@storybook/react";
import { GameId, list } from "../../../../games/dist/list";
import { select, boolean } from "@storybook/addon-knobs";
import { LocalSession, LocalSessionActions } from ".";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { AlgolVariantAnon } from "../../../../types";

storiesOf("LocalSession", module).add("LocalSession creator for game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const hasPrevious = boolean("Previous battle", false);
  const actions: LocalSessionActions = {
    loadLocalSession: save => console.log("Save", save),
    newLocalBattle: () => console.log("New!"),
    importSession: str => console.log("Import", str),
    continuePreviousSession: () => console.log("Previous!"),
    reportError: err => console.log("Error", err),
  };
  const variants: AlgolVariantAnon[] = [
    {
      board: "regular",
      code: "x",
      desc: "regular",
      ruleset: "regular",
      setup: "regular",
    },
  ];
  return (
    <LocalSession
      actions={actions}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      hasPrevious={hasPrevious}
      variants={variants}
    />
  );
});
