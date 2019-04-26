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
const BOARD = boardLayers({ height: 5, width: 5 });
const emptyArtifactLayers = { movetargets: {} };
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "kickrun",
  action: {},
  instruction: {}
};
{
  const groupLayers = {
    runners: [
      ["units", "runners"],
      ["units", "myunits", "runners", "myrunners"],
      ["units", "oppunits", "runners", "opprunners"]
    ],
    sidekickers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  const TERRAIN = terrainLayers(
    5,
    5,
    { corners: { "1": ["a1"], "2": ["e5"] } },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      runners: oldUnitLayers.runners,
      myrunners: oldUnitLayers.opprunners,
      opprunners: oldUnitLayers.myrunners
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
    return { text: "Select which unit to move" };
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
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
      runners: {},
      myrunners: {},
      opprunners: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myrunners)
            .concat(Object.keys(TERRAIN.oppcorners))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myrunners)
            .concat(Object.keys(TERRAIN.oppcorners))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
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
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of UNITLAYERS.myrunners[MARKS.selectunit]
        ? [1, 2, 3]
        : [8, 1, 3, 4]) {
        let MAX = UNITLAYERS.myrunners[MARKS.selectunit] ? 4 : 1;
        let POS = MARKS.selectunit;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (DIR !== 8 && DIR !== 4) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
        if (BLOCKS[POS]) {
          if (UNITLAYERS.oppunits[POS] && (DIR === 8 || DIR === 4)) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Select where to move your" },
        { pos: MARKS.selectunit },
        UNITLAYERS.runners[MARKS.selectunit]
          ? { unittype: ["bishop", 1] }
          : { unittype: ["pawn", 1] }
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
        { text: "to" },
        UNITLAYERS.runners[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "slide your bishop from" },
                { pos: MARKS.selectunit },
                { text: "to" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : collapseContent({
              line: [
                { text: "move your pawn from" },
                { pos: MARKS.selectunit },
                { text: "to" },
                { pos: MARKS.selectmovetarget },
                UNITLAYERS.units[MARKS.selectmovetarget]
                  ? { text: "and capture the enemy there" }
                  : undefined
              ]
            })
      ]
    });
  };
}
{
  const groupLayers = {
    runners: [
      ["units", "runners"],
      ["units", "oppunits", "runners", "opprunners"],
      ["units", "myunits", "runners", "myrunners"]
    ],
    sidekickers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  const TERRAIN = terrainLayers(
    5,
    5,
    { corners: { "1": ["a1"], "2": ["e5"] } },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      runners: oldUnitLayers.runners,
      myrunners: oldUnitLayers.opprunners,
      opprunners: oldUnitLayers.myrunners
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
    return { text: "Select which unit to move" };
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      runners: { "1": ["a2", "b1"], "2": ["d5", "e4"] },
      sidekickers: { "1": ["a1", "c1", "a3"], "2": ["c5", "e5", "e3"] }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      runners: {},
      myrunners: {},
      opprunners: {}
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
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
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
      runners: {},
      myrunners: {},
      opprunners: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myrunners)
            .concat(Object.keys(TERRAIN.oppcorners))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myrunners)
            .concat(Object.keys(TERRAIN.oppcorners))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
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
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of UNITLAYERS.myrunners[MARKS.selectunit]
        ? [5, 6, 7]
        : [4, 5, 7, 8]) {
        let MAX = UNITLAYERS.myrunners[MARKS.selectunit] ? 4 : 1;
        let POS = MARKS.selectunit;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (DIR !== 8 && DIR !== 4) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
        if (BLOCKS[POS]) {
          if (UNITLAYERS.oppunits[POS] && (DIR === 8 || DIR === 4)) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Select where to move your" },
        { pos: MARKS.selectunit },
        UNITLAYERS.runners[MARKS.selectunit]
          ? { unittype: ["bishop", 2] }
          : { unittype: ["pawn", 2] }
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
        { text: "to" },
        UNITLAYERS.runners[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "slide your bishop from" },
                { pos: MARKS.selectunit },
                { text: "to" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : collapseContent({
              line: [
                { text: "move your pawn from" },
                { pos: MARKS.selectunit },
                { text: "to" },
                { pos: MARKS.selectmovetarget },
                UNITLAYERS.units[MARKS.selectmovetarget]
                  ? { text: "and capture the enemy there" }
                  : undefined
              ]
            })
      ]
    });
  };
}
export default game as AlgolGame;
