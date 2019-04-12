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

const emptyArtifactLayers = { movetargets: {}, winline: {} };

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    kings: [
      ["units"],
      ["units", "myunits", "mykings"],
      ["units", "oppunits", "oppkings"]
    ],
    queens: [
      ["units"],
      ["units", "myunits", "myqueens"],
      ["units", "oppunits", "oppqueens"]
    ]
  };
  game.action.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens
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
    return collapseContent({
      line: [
        { text: "Select a" },
        { unittype: "king" },
        { text: "or" },
        { unittype: "queen" },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: { ...step.ARTIFACTS.winline }
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
      mykings: {},
      oppkings: {},
      myqueens: {},
      oppqueens: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.mykings[STARTPOS]
          ? UNITLAYERS.mykings
          : UNITLAYERS.myqueens;

        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 3) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madewinline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start2";
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
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
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
        { text: "Select an orthogonal empty neighbour to move the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { kings: "king", queens: "queen" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" }
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
        { text: "to walk the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { kings: "king", queens: "queen" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
{
  const groupLayers = {
    kings: [
      ["units"],
      ["units", "oppunits", "oppkings"],
      ["units", "myunits", "mykings"]
    ],
    queens: [
      ["units"],
      ["units", "oppunits", "oppqueens"],
      ["units", "myunits", "myqueens"]
    ]
  };
  game.action.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens
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
    return collapseContent({
      line: [
        { text: "Select a" },
        { unittype: "king" },
        { text: "or" },
        { unittype: "queen" },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a2", x: 1, y: 2, id: "unit1", group: "kings", owner: 1 },
      unit2: { pos: "c5", x: 3, y: 5, id: "unit2", group: "kings", owner: 1 },
      unit3: { pos: "e2", x: 5, y: 2, id: "unit3", group: "kings", owner: 1 },
      unit4: { pos: "b1", x: 2, y: 1, id: "unit4", group: "kings", owner: 2 },
      unit5: { pos: "b5", x: 2, y: 5, id: "unit5", group: "kings", owner: 2 },
      unit6: { pos: "e3", x: 5, y: 3, id: "unit6", group: "kings", owner: 2 },
      unit7: { pos: "a3", x: 1, y: 3, id: "unit7", group: "queens", owner: 1 },
      unit8: { pos: "d5", x: 4, y: 5, id: "unit8", group: "queens", owner: 1 },
      unit9: { pos: "d1", x: 4, y: 1, id: "unit9", group: "queens", owner: 1 },
      unit10: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit10",
        group: "queens",
        owner: 2
      },
      unit11: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit11",
        group: "queens",
        owner: 2
      },
      unit12: { pos: "e4", x: 5, y: 4, id: "unit12", group: "queens", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mykings: {},
      oppkings: {},
      myqueens: {},
      oppqueens: {}
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
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: { ...step.ARTIFACTS.winline }
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
      mykings: {},
      oppkings: {},
      myqueens: {},
      oppqueens: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.mykings[STARTPOS]
          ? UNITLAYERS.mykings
          : UNITLAYERS.myqueens;

        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 3) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madewinline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start1";
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
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = emptyObj;
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
        { text: "Select an orthogonal empty neighbour to move the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { kings: "king", queens: "queen" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" }
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
        { text: "to walk the" },
        { pos: MARKS.selectunit },
        {
          unit: [
            { kings: "king", queens: "queen" }[
              (UNITLAYERS.units[MARKS.selectunit] || {}).group
            ],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner as 0 | 1 | 2,
            MARKS.selectunit
          ]
        },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game as AlgolGame;
