import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { SessionList } from ".";
import { GameId, list } from "../../../../games/dist/list";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { SessionListActions } from "./SessionList";
import meta from "../../../../games/dist/meta";
import {
  SessionListInner,
  SessionListInnerActions,
  SessionInfo,
} from "./SessionList.Inner";
import { SessionLoadFail } from "../../../../local/src";
import { AlgolLocalBattle, AlgolVariantAnon } from "../../../../types";

const innerActions: SessionListInnerActions = {
  loadLocalSession: id => console.log("Loading session id", id),
  reportError: (error, level) => console.log("Reported error", error, level),
  updateList: () => console.log("Updating list"),
  purgeErrorLines: () => console.log("Purging"),
};

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
    const actions: SessionListActions = {
      loadLocalSession: id => console.log("Loading session id", id),
      reportError: (error, level) =>
        console.log("Reported error", error, level),
    };
    return (
      <Fragment>
        <div>
          Listing {finished ? "finished" : "ongoing"} battles of {gameId} from
          localStorage:
        </div>
        <hr />
        <SessionList
          graphics={dataURIs[gameId]}
          actions={actions}
          meta={meta[gameId]}
          variants={variants}
        />
      </Fragment>
    );
  })
  .add("Hacked data, with one failing line", () => {
    const fakeSession: AlgolLocalBattle = {
      created: Date.now(),
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
        actions={innerActions}
        meta={meta.atrium}
        graphics={dataURIs.atrium}
        sessionInfo={sessionInfo}
        variants={variants}
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
        actions={innerActions}
        meta={meta.atrium}
        graphics={dataURIs.atrium}
        sessionInfo={sessionInfo}
        variants={variants}
      />
    );
  });
