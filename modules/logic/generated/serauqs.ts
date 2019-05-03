import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
const BOARD = boardLayers({ height: 4, width: 4 });
const iconMapping = { soldiers: "pawn", wild: "king" };
const emptyArtifactLayers = { movetargets: {}, winline: {} };
const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "serauqs",
  action: {},
  instruction: {}
};
{
  const groupLayers = {
    soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]],
    wild: [
      ["units", "wild"],
      ["units", "myunits", "wild", "mywild"],
      ["units", "oppunits", "wild", "oppwild"]
    ]
  };
  const TERRAIN = terrainLayers(
    4,
    4,
    {
      base: { "1": [{ rect: ["a1", "d1"] }], "2": [{ rect: ["a4", "d4"] }] },
      corners: ["a1", "a4", "d1", "d4"],
      middle: [{ rect: ["b2", "c3"] }]
    },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      wild: oldUnitLayers.wild,
      mywild: oldUnitLayers.oppwild,
      oppwild: oldUnitLayers.mywild
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "which" },
            { unittype: ["pawn", 1] },
            { text: "or" },
            { unittype: ["king", 1] },
            { text: "to move" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "which" },
            { unittype: ["pawn", 1] },
            { text: "to promote to" },
            { unittype: ["king", 1] }
          ]
        });
  };
  game.action.promote1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "wild"
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      wild: {},
      mywild: {},
      oppwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.promote1 = () => defaultInstruction(1);
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      wild: {},
      mywild: {},
      oppwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };
      for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let walkpositionstocount = TERRAIN.mybase;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let WALKLENGTH = walkedsquares.length;
          let TOTALCOUNT = CURRENTCOUNT;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 4 && TOTALCOUNT !== 4) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    if (3 > TURN) {
      LINKS.actions.promote = "promote1";
    } else {
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.actions[pos] = "selectmovetarget1";
      }
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "where to" },
            { command: "move" },
            {
              unit: [
                iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
                MARKS.selectunit
              ]
            },
            UNITLAYERS.wild[MARKS.selectunit]
              ? { text: "(remember that it matches for your opponent too!)" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "promote" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
                MARKS.selectunit
              ]
            },
            { text: "into" },
            { unittype: ["king", 1] },
            { text: ", making it match for your opponent too" }
          ]
        });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "go to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]],
    wild: [
      ["units", "wild"],
      ["units", "oppunits", "wild", "oppwild"],
      ["units", "myunits", "wild", "mywild"]
    ]
  };
  const TERRAIN = terrainLayers(
    4,
    4,
    {
      base: { "1": [{ rect: ["a1", "d1"] }], "2": [{ rect: ["a4", "d4"] }] },
      corners: ["a1", "a4", "d1", "d4"],
      middle: [{ rect: ["b2", "c3"] }]
    },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      wild: oldUnitLayers.wild,
      mywild: oldUnitLayers.oppwild,
      oppwild: oldUnitLayers.mywild
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn2 = step => {
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "which" },
            { unittype: ["pawn", 2] },
            { text: "or" },
            { unittype: ["king", 2] },
            { text: "to move" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "which" },
            { unittype: ["pawn", 2] },
            { text: "to promote to" },
            { unittype: ["king", 2] }
          ]
        });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      soldiers: { "1": [{ rect: ["a1", "d1"] }], "2": [{ rect: ["a4", "d4"] }] }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      wild: {},
      mywild: {},
      oppwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.promote2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "wild"
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      wild: {},
      mywild: {},
      oppwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.promote2 = () => defaultInstruction(2);
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      wild: {},
      mywild: {},
      oppwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };
      for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let walkpositionstocount = TERRAIN.mybase;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let WALKLENGTH = walkedsquares.length;
          let TOTALCOUNT = CURRENTCOUNT;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 4 && TOTALCOUNT !== 4) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    if (3 > TURN) {
      LINKS.actions.promote = "promote2";
    } else {
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.actions[pos] = "selectmovetarget2";
      }
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    return TURN > 2
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "where to" },
            { command: "move" },
            {
              unit: [
                iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
                MARKS.selectunit
              ]
            },
            UNITLAYERS.wild[MARKS.selectunit]
              ? { text: "(remember that it matches for your opponent too!)" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "promote" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
                MARKS.selectunit
              ]
            },
            { text: "into" },
            { unittype: ["king", 2] },
            { text: ", making it match for your opponent too" }
          ]
        });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "go to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game as AlgolGame;
