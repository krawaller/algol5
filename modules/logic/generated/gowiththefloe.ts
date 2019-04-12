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
const BOARD = boardLayers({ height: 8, width: 8 });

const emptyArtifactLayers = {
  eattargets: {},
  movetargets: {},
  canmove: {},
  cracks: {}
};

const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {
  water: {
    a1: { pos: "a1", x: 1, y: 1 },
    a2: { pos: "a2", x: 1, y: 2 },
    a7: { pos: "a7", x: 1, y: 7 },
    a8: { pos: "a8", x: 1, y: 8 },
    b1: { pos: "b1", x: 2, y: 1 },
    b8: { pos: "b8", x: 2, y: 8 },
    g1: { pos: "g1", x: 7, y: 1 },
    g8: { pos: "g8", x: 7, y: 8 },
    h1: { pos: "h1", x: 8, y: 1 },
    h2: { pos: "h2", x: 8, y: 2 },
    h7: { pos: "h7", x: 8, y: 7 },
    h8: { pos: "h8", x: 8, y: 8 }
  },
  nowater: {
    a3: { pos: "a3", x: 1, y: 3 },
    a4: { pos: "a4", x: 1, y: 4 },
    a5: { pos: "a5", x: 1, y: 5 },
    a6: { pos: "a6", x: 1, y: 6 },
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    b4: { pos: "b4", x: 2, y: 4 },
    b5: { pos: "b5", x: 2, y: 5 },
    b6: { pos: "b6", x: 2, y: 6 },
    b7: { pos: "b7", x: 2, y: 7 },
    c1: { pos: "c1", x: 3, y: 1 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 },
    c4: { pos: "c4", x: 3, y: 4 },
    c5: { pos: "c5", x: 3, y: 5 },
    c6: { pos: "c6", x: 3, y: 6 },
    c7: { pos: "c7", x: 3, y: 7 },
    c8: { pos: "c8", x: 3, y: 8 },
    d1: { pos: "d1", x: 4, y: 1 },
    d2: { pos: "d2", x: 4, y: 2 },
    d3: { pos: "d3", x: 4, y: 3 },
    d4: { pos: "d4", x: 4, y: 4 },
    d5: { pos: "d5", x: 4, y: 5 },
    d6: { pos: "d6", x: 4, y: 6 },
    d7: { pos: "d7", x: 4, y: 7 },
    d8: { pos: "d8", x: 4, y: 8 },
    e1: { pos: "e1", x: 5, y: 1 },
    e2: { pos: "e2", x: 5, y: 2 },
    e3: { pos: "e3", x: 5, y: 3 },
    e4: { pos: "e4", x: 5, y: 4 },
    e5: { pos: "e5", x: 5, y: 5 },
    e6: { pos: "e6", x: 5, y: 6 },
    e7: { pos: "e7", x: 5, y: 7 },
    e8: { pos: "e8", x: 5, y: 8 },
    f1: { pos: "f1", x: 6, y: 1 },
    f2: { pos: "f2", x: 6, y: 2 },
    f3: { pos: "f3", x: 6, y: 3 },
    f4: { pos: "f4", x: 6, y: 4 },
    f5: { pos: "f5", x: 6, y: 5 },
    f6: { pos: "f6", x: 6, y: 6 },
    f7: { pos: "f7", x: 6, y: 7 },
    f8: { pos: "f8", x: 6, y: 8 },
    g2: { pos: "g2", x: 7, y: 2 },
    g3: { pos: "g3", x: 7, y: 3 },
    g4: { pos: "g4", x: 7, y: 4 },
    g5: { pos: "g5", x: 7, y: 5 },
    g6: { pos: "g6", x: 7, y: 6 },
    g7: { pos: "g7", x: 7, y: 7 },
    h3: { pos: "h3", x: 8, y: 3 },
    h4: { pos: "h4", x: 8, y: 4 },
    h5: { pos: "h5", x: 8, y: 5 },
    h6: { pos: "h6", x: 8, y: 6 }
  }
};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    seals: [
      ["units", "seals"],
      ["units", "myunits", "seals"],
      ["units", "oppunits", "seals"]
    ],
    bears: [
      ["units", "bears"],
      ["units", "myunits", "bears"],
      ["units", "oppunits", "bears"]
    ],
    holes: [
      ["units", "holes"],
      ["units", "myunits", "holes"],
      ["units", "oppunits", "holes"]
    ]
  };
  game.action.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      seals: oldUnitLayers.seals,
      bears: oldUnitLayers.bears,
      holes: oldUnitLayers.holes
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.start1 = step => {
    return { text: "Select a unit to move" };
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: step.ARTIFACTS.movetargets,
      canmove: { ...step.ARTIFACTS.canmove },
      cracks: step.ARTIFACTS.cracks
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
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
    for (let LOOPPOS in ARTIFACTS.cracks) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      seals: {},
      bears: {},
      holes: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.seals) {
        for (let DIR of roseDirs) {
          let MAX = 2;
          let POS = STARTPOS;
          let walkpositionstocount = Object.keys(TERRAIN.nowater)
            .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = {};
          }
        }
      }
    }

    if (
      Object.keys(ARTIFACTS.canmove).length !==
      Object.keys(UNITLAYERS.seals).length
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "safeseal";
      LINKS.endMarks = Object.keys(
        Object.keys(UNITLAYERS.seals)
          .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: { ...step.ARTIFACTS.movetargets },
      canmove: step.ARTIFACTS.canmove,
      cracks: step.ARTIFACTS.cracks
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = {
        ...UNITLAYERS.seals,
        ...UNITLAYERS.bears,
        ...TERRAIN.water
      };

      for (let DIR of roseDirs) {
        let MAX = 2;
        let POS = MARKS.selectunit;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
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
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit1 = step => {
    return { text: "Select where to move" };
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: step.ARTIFACTS.movetargets,
      canmove: step.ARTIFACTS.canmove,
      cracks: { ...step.ARTIFACTS.cracks }
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { [MARKS.selectunit]: 1 };

      let POS = MARKS.selectmovetarget;
      while (
        (POS =
          connections[POS][
            relativeDirs[
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ][5]
          ]) &&
        !BLOCKS[POS]
      ) {
        if (!UNITLAYERS.holes[POS]) {
          ARTIFACTS.cracks[POS] = {};
        }
      }
      if (BLOCKS[POS]) {
        ARTIFACTS.cracks[POS] = {};
      }
    }
    LINKS.actions.move = "move1";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmovetarget1 = step => {
    return collapseContent({
      line: [{ text: "Press" }, { command: "move" }, { text: "to go here" }]
    });
  };
}
{
  const groupLayers = {
    seals: [
      ["units", "seals"],
      ["units", "oppunits", "seals"],
      ["units", "myunits", "seals"]
    ],
    bears: [
      ["units", "bears"],
      ["units", "oppunits", "bears"],
      ["units", "myunits", "bears"]
    ],
    holes: [
      ["units", "holes"],
      ["units", "oppunits", "holes"],
      ["units", "myunits", "holes"]
    ]
  };
  game.action.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      seals: oldUnitLayers.seals,
      bears: oldUnitLayers.bears,
      holes: oldUnitLayers.holes
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.start2 = step => {
    return { text: "Select a unit to move" };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "b2", x: 2, y: 2, id: "unit1", group: "seals", owner: 1 },
      unit2: { pos: "b7", x: 2, y: 7, id: "unit2", group: "seals", owner: 1 },
      unit3: { pos: "g2", x: 7, y: 2, id: "unit3", group: "bears", owner: 2 },
      unit4: { pos: "g7", x: 7, y: 7, id: "unit4", group: "bears", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      seals: {},
      bears: {},
      holes: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }

    return game.action.start1({
      NEXTSPAWNID: 1,

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: step.ARTIFACTS.movetargets,
      canmove: { ...step.ARTIFACTS.canmove },
      cracks: step.ARTIFACTS.cracks
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
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
    for (let LOOPPOS in ARTIFACTS.cracks) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      seals: {},
      bears: {},
      holes: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.seals) {
        for (let DIR of roseDirs) {
          let MAX = 2;
          let POS = STARTPOS;
          let walkpositionstocount = Object.keys(TERRAIN.nowater)
            .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = {};
          }
        }
      }
    }

    if (
      Object.keys(ARTIFACTS.canmove).length !==
      Object.keys(UNITLAYERS.seals).length
    ) {
      let winner = 1;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "safeseal";
      LINKS.endMarks = Object.keys(
        Object.keys(UNITLAYERS.seals)
          .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.eat2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: step.ARTIFACTS.movetargets,
      canmove: { ...step.ARTIFACTS.canmove },
      cracks: step.ARTIFACTS.cracks
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectunit] || {}).id];
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecteattarget] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      seals: {},
      bears: {},
      holes: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.seals) {
        for (let DIR of roseDirs) {
          let MAX = 2;
          let POS = STARTPOS;
          let walkpositionstocount = Object.keys(TERRAIN.nowater)
            .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = {};
          }
        }
      }
    }

    if (
      Object.keys(ARTIFACTS.canmove).length !==
      Object.keys(UNITLAYERS.seals).length
    ) {
      let winner = 1;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "safeseal";
      LINKS.endMarks = Object.keys(
        Object.keys(UNITLAYERS.seals)
          .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.eat2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      eattargets: { ...step.ARTIFACTS.eattargets },
      movetargets: { ...step.ARTIFACTS.movetargets },
      canmove: step.ARTIFACTS.canmove,
      cracks: step.ARTIFACTS.cracks
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = {
        ...UNITLAYERS.seals,
        ...UNITLAYERS.bears,
        ...TERRAIN.water
      };

      for (let DIR of roseDirs) {
        let MAX = 2;
        let POS = MARKS.selectunit;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.seals[POS]) {
          ARTIFACTS.eattargets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }

    for (const pos of Object.keys(ARTIFACTS.eattargets)) {
      LINKS.actions[pos] = "selecteattarget2";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit2 = step => {
    return { text: "Select where to move" };
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      eattargets: step.ARTIFACTS.eattargets,
      movetargets: step.ARTIFACTS.movetargets,
      canmove: step.ARTIFACTS.canmove,
      cracks: { ...step.ARTIFACTS.cracks }
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { [MARKS.selectunit]: 1 };

      let POS = MARKS.selectmovetarget;
      while (
        (POS =
          connections[POS][
            relativeDirs[
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ][5]
          ]) &&
        !BLOCKS[POS]
      ) {
        if (!UNITLAYERS.holes[POS]) {
          ARTIFACTS.cracks[POS] = {};
        }
      }
      if (BLOCKS[POS]) {
        ARTIFACTS.cracks[POS] = {};
      }
    }
    LINKS.actions.move = "move2";

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmovetarget2 = step => {
    return collapseContent({
      line: [{ text: "Press" }, { command: "move" }, { text: "to go here" }]
    });
  };
  game.action.selecteattarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };

    LINKS.actions.eat = "eat2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selecteattarget: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selecteattarget2 = step => {
    return collapseContent({
      line: [{ text: "Press" }, { command: "eat" }, { text: "to, well, eat" }]
    });
  };
}
export default game as AlgolGame;
