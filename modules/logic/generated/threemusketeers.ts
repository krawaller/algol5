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

const emptyArtifactLayers = {
  strandedmusketeers: {},
  musketeerline: {},
  movetargets: {}
};

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    pawns: [
      ["units", "pawns"],
      ["units", "myunits", "pawns"],
      ["units", "oppunits", "pawns"]
    ],
    kings: [
      ["units", "kings"],
      ["units", "myunits", "kings"],
      ["units", "oppunits", "kings"]
    ]
  };
  game.action.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pawns: oldUnitLayers.pawns,
      kings: oldUnitLayers.kings
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
        { text: "Select which" },
        { unittype: "king" },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      musketeerline: {}
    };
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

    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, pawns: {}, kings: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.kings) {
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          let walkpositionstocount = UNITLAYERS.kings;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (2 === TOTALCOUNT) {
            ARTIFACTS.musketeerline[POS] = emptyObj;
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.musketeerline).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "musketeersinline";
      LINKS.endMarks = Object.keys(UNITLAYERS.kings);
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
      movetargets: {}
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
        if (POS && UNITLAYERS.oppunits[POS]) {
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

    return collapseContent({
      line: [
        { text: "Select a" },
        { unittype: "pawn" },
        { text: "adjacent to the" },
        { pos: MARKS.selectunit },
        { unittype: "king" },
        { text: "to attack" }
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

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make your" },
        { pos: MARKS.selectunit },
        { unittype: "king" },
        { text: "attack the" },
        { pos: MARKS.selectmovetarget },
        { unittype: "pawn" }
      ]
    });
  };
}
{
  const groupLayers = {
    pawns: [
      ["units", "pawns"],
      ["units", "oppunits", "pawns"],
      ["units", "myunits", "pawns"]
    ],
    kings: [
      ["units", "kings"],
      ["units", "oppunits", "kings"],
      ["units", "myunits", "kings"]
    ]
  };
  game.action.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pawns: oldUnitLayers.pawns,
      kings: oldUnitLayers.kings
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
        { text: "Select which" },
        { unittype: "pawn" },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a1", x: 1, y: 1, id: "unit1", group: "kings", owner: 1 },
      unit2: { pos: "c3", x: 3, y: 3, id: "unit2", group: "kings", owner: 1 },
      unit3: { pos: "e5", x: 5, y: 5, id: "unit3", group: "kings", owner: 1 },
      unit4: { pos: "a2", x: 1, y: 2, id: "unit4", group: "pawns", owner: 2 },
      unit5: { pos: "a3", x: 1, y: 3, id: "unit5", group: "pawns", owner: 2 },
      unit6: { pos: "a4", x: 1, y: 4, id: "unit6", group: "pawns", owner: 2 },
      unit7: { pos: "a5", x: 1, y: 5, id: "unit7", group: "pawns", owner: 2 },
      unit8: { pos: "b1", x: 2, y: 1, id: "unit8", group: "pawns", owner: 2 },
      unit9: { pos: "b2", x: 2, y: 2, id: "unit9", group: "pawns", owner: 2 },
      unit10: { pos: "b3", x: 2, y: 3, id: "unit10", group: "pawns", owner: 2 },
      unit11: { pos: "b4", x: 2, y: 4, id: "unit11", group: "pawns", owner: 2 },
      unit12: { pos: "b5", x: 2, y: 5, id: "unit12", group: "pawns", owner: 2 },
      unit13: { pos: "c1", x: 3, y: 1, id: "unit13", group: "pawns", owner: 2 },
      unit14: { pos: "c2", x: 3, y: 2, id: "unit14", group: "pawns", owner: 2 },
      unit15: { pos: "c4", x: 3, y: 4, id: "unit15", group: "pawns", owner: 2 },
      unit16: { pos: "c5", x: 3, y: 5, id: "unit16", group: "pawns", owner: 2 },
      unit17: { pos: "d1", x: 4, y: 1, id: "unit17", group: "pawns", owner: 2 },
      unit18: { pos: "d2", x: 4, y: 2, id: "unit18", group: "pawns", owner: 2 },
      unit19: { pos: "d3", x: 4, y: 3, id: "unit19", group: "pawns", owner: 2 },
      unit20: { pos: "d4", x: 4, y: 4, id: "unit20", group: "pawns", owner: 2 },
      unit21: { pos: "d5", x: 4, y: 5, id: "unit21", group: "pawns", owner: 2 },
      unit22: { pos: "e1", x: 5, y: 1, id: "unit22", group: "pawns", owner: 2 },
      unit23: { pos: "e2", x: 5, y: 2, id: "unit23", group: "pawns", owner: 2 },
      unit24: { pos: "e3", x: 5, y: 3, id: "unit24", group: "pawns", owner: 2 },
      unit25: { pos: "e4", x: 5, y: 4, id: "unit25", group: "pawns", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      pawns: {},
      kings: {}
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
      musketeerline: {},
      strandedmusketeers: {}
    };
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

    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, pawns: {}, kings: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.kings) {
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          let walkpositionstocount = UNITLAYERS.kings;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (2 === TOTALCOUNT) {
            ARTIFACTS.musketeerline[POS] = emptyObj;
          }
        }
      }
    }

    for (let STARTPOS in UNITLAYERS.kings) {
      let foundneighbours = [];

      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.pawns[POS]) {
          foundneighbours.push(POS);
        }
      }

      let NEIGHBOURCOUNT = foundneighbours.length;

      if (!NEIGHBOURCOUNT) {
        ARTIFACTS.strandedmusketeers[STARTPOS] = emptyObj;
      }
    }

    if (Object.keys(ARTIFACTS.strandedmusketeers).length === 3) {
      let winner = 1;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "strandedmusketeers";
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
      movetargets: {}
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

    return collapseContent({
      line: [
        { text: "Select an empty space adjacent to the" },
        { pos: MARKS.selectunit },
        { unittype: "pawn" },
        { text: "to move to" }
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

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game as AlgolGame;
