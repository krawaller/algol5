import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { SessionList } from ".";
import { GameId, list } from "../../../../games/dist/list";
import { getSessionList } from "../../../../local/src";

import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("SessionList", module).add("SessionList component", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const finished = boolean("Finished", false);
  const sessions = getSessionList(gameId, finished);
  return (
    <Fragment>
      <div>
        Listing {finished ? "finished" : "ongoing"} battles of {gameId} from
        localStorage:
      </div>
      <hr />
      {sessions.length ? (
        <SessionList
          sessions={sessions}
          graphics={dataURIs[gameId]}
          callback={save => console.log("Battle", save)}
        />
      ) : (
        <p>
          No battles found. To populate, start some in the <code>Tester</code>{" "}
          story!{" "}
        </p>
      )}
    </Fragment>
  );
});
