import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { SessionList } from ".";
import { GameId, list } from "../../../../games/dist/list";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import meta from "../../../../games/dist/meta";
import { SessionListInner, SessionInfo } from "./SessionList.Inner";
import { SessionLoadFail } from "../../../../local/src";
import {
  AlgolSession,
  AlgolVariantAnon,
  localParticipants,
} from "../../../../types";

const variants: AlgolVariantAnon[] = [
  {
    desc: "regular",
    board: "board",
    setup: "setup",
    ruleset: "ruleset",
    code: "c",
  },
];

storiesOf("SessionList", module)
  .add("Real component, reading localStorage", () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const finished = boolean("Finished", false);
    return (
      <Fragment>
        <div>
          Listing {finished ? "finished" : "ongoing"} battles of {gameId} from
          localStorage:
        </div>
        <hr />
        <SessionList
          graphics={dataURIs[gameId]}
          meta={meta[gameId]}
          variants={variants}
          corruptSessions={{}}
        />
      </Fragment>
    );
  })
  .add("Hacked data, with one failing line", () => {
    const fakeSession: AlgolSession = {
      created: Date.now(),
      gameId: "allqueenschess",
      id: "foo",
      sprites: [
        { pos: "a1", unit: { icon: "pawn", owner: 1 } },
        { pos: "c3", unit: { icon: "knight", owner: 2 } },
      ],
      path: [],
      player: 1,
      turn: 7,
      type: "normal",
      variantCode: "c",
      participants: localParticipants,
    };
    const fakeLoadFail: SessionLoadFail = {
      error: new Error(),
      id: "gnurp",
      str: "foo",
    };
    const sessionInfo: SessionInfo = {
      status: "loaded",
      sessions: [fakeSession, fakeLoadFail],
    };
    return (
      <SessionListInner
        meta={meta.atrium}
        graphics={dataURIs.atrium}
        sessionInfo={sessionInfo}
        variants={variants}
        corruptSessions={{}}
        purgeErrorLines={() => {}}
        updateList={() => {}}
      />
    );
  })
  .add("Hacked data, total load fail", () => {
    const sessionInfo: SessionInfo = {
      status: "error",
      sessions: [],
      error: new Error(),
    };
    return (
      <SessionListInner
        meta={meta.atrium}
        graphics={dataURIs.atrium}
        sessionInfo={sessionInfo}
        variants={variants}
        corruptSessions={{}}
        purgeErrorLines={() => {}}
        updateList={() => {}}
      />
    );
  });
