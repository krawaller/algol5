import React from "react";
import { storiesOf } from "@storybook/react";
import { GameId, list } from "../../../../games/dist/list";
import { select, boolean } from "@storybook/addon-knobs";
import { NewLocalSession, NewLocalSessionActions } from ".";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { AlgolVariantAnon } from "../../../../types";

storiesOf("NewLocalSession", module).add(
  "NewLocalSession creator for game",
  () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const hasPrevious = boolean("Previous battle", false);
    const actions: NewLocalSessionActions = {
      loadLocalSession: id => console.log("Loading session id", id),
      newLocalBattle: () => console.log("New!"),
      importSession: str => console.log("Import", str),
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
      <NewLocalSession
        actions={actions}
        meta={meta[gameId]}
        graphics={dataURIs[gameId]}
        previousSessionId={hasPrevious ? "somePreviousId" : undefined}
        variants={variants}
      />
    );
  }
);
