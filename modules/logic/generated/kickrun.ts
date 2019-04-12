import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";
import {
  AlgolStepLinks,
  AlgolGame
} from "/Users/davidwaller/gitreps/algol5/modules/types";
const emptyObj = {};
const BOARD = boardLayers({ height: 5, width: 5 });

const emptyArtifactLayers = { movetargets: {} };

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    runners: [
      ["units", "runners"],
      ["units", "myunits", "runners", "myrunners"],
      ["units", "oppunits", "runners", "opprunners"]
    ],
    sidekickers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  const TERRAIN = {
    corners: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    mycorners: { a1: { pos: "a1", x: 1, y: 1, owner: 1 } },
    oppcorners: { e5: { pos: "e5", x: 5, y: 5, owner: 2 } },
    nocorners: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      e1: { pos: "e1", x: 5, y: 1 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
  game.action.start1 = step => {
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
  game.instruction.start1 = step => {
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
      LINKS.endturn = "start2";
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
      movetargets: { ...step.ARTIFACTS.movetargets }
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
          ? { unittype: "bishop" }
          : { unittype: "pawn" }
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
  const TERRAIN = {
    corners: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    oppcorners: { a1: { pos: "a1", x: 1, y: 1, owner: 1 } },
    mycorners: { e5: { pos: "e5", x: 5, y: 5, owner: 2 } },
    nocorners: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      e1: { pos: "e1", x: 5, y: 1 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
  game.action.start2 = step => {
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
  game.instruction.start2 = step => {
    return { text: "Select which unit to move" };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a2", x: 1, y: 2, id: "unit1", group: "runners", owner: 1 },
      unit2: { pos: "b1", x: 2, y: 1, id: "unit2", group: "runners", owner: 1 },
      unit3: { pos: "d5", x: 4, y: 5, id: "unit3", group: "runners", owner: 2 },
      unit4: { pos: "e4", x: 5, y: 4, id: "unit4", group: "runners", owner: 2 },
      unit5: {
        pos: "a1",
        x: 1,
        y: 1,
        id: "unit5",
        group: "sidekickers",
        owner: 1
      },
      unit6: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit6",
        group: "sidekickers",
        owner: 1
      },
      unit7: {
        pos: "a3",
        x: 1,
        y: 3,
        id: "unit7",
        group: "sidekickers",
        owner: 1
      },
      unit8: {
        pos: "c5",
        x: 3,
        y: 5,
        id: "unit8",
        group: "sidekickers",
        owner: 2
      },
      unit9: {
        pos: "e5",
        x: 5,
        y: 5,
        id: "unit9",
        group: "sidekickers",
        owner: 2
      },
      unit10: {
        pos: "e3",
        x: 5,
        y: 3,
        id: "unit10",
        group: "sidekickers",
        owner: 2
      }
    };

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

    return game.action.start1({
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
      LINKS.endturn = "start1";
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
      movetargets: { ...step.ARTIFACTS.movetargets }
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
          ? { unittype: "bishop" }
          : { unittype: "pawn" }
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
