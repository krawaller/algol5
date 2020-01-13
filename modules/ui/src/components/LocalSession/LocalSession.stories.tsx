import React from "react";
import { storiesOf } from "@storybook/react";
import { GameId, list } from "../../../../games/dist/list";
import { select, boolean } from "@storybook/addon-knobs";
import { getSessionList } from "../../../../local/src";
import { LocalSession, LocalSessionActions } from ".";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("LocalSession", module).add("LocalSession creator for game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const finished = boolean("Finished", false);
  const sessions = getSessionList(gameId, finished);
  const actions: LocalSessionActions = {
    load: save => console.log("Save", save),
    new: () => console.log("New!"),
    import: (str: string) => console.log("Import", str),
  };
  return (
    <LocalSession
      actions={actions}
      sessions={sessions}
      graphics={dataURIs[gameId]}
    />
  );
});
