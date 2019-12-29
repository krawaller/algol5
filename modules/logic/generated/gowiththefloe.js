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
const emptyObj = {};
const BOARD = boardLayers({ height: 8, width: 8 });
const iconMapping = { seals: "king", bears: "queen", holes: "pawn" };
const emptyArtifactLayers = {
  eattargets: {},
  movetargets: {},
  canmove: {},
  cracks: {}
};
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(8, 8, {
  water: [
    "a1",
    "a2",
    "a7",
    "a8",
    "b1",
    "b8",
    "g1",
    "g8",
    "h1",
    "h2",
    "h7",
    "h8"
  ]
});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
const knightDirs = [
  "d1f2r1",
  "d1f2r-1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r1",
  "d5f2r-1",
  "d7f2r1",
  "d7f2r-1"
];
let game = { gameId: "gowiththefloe", action: {}, instruction: {} };
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
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      seals: oldUnitLayers.seals,
      bears: oldUnitLayers.bears,
      holes: oldUnitLayers.holes
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit1";
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
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["king", 1] },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      cracks: step.ARTIFACTS.cracks,
      canmove: {}
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
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = emptyObj;
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
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endTurn = "startTurn2";
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
      movetargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
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
      LINKS.marks[pos] = "selectmovetarget1";
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      cracks: {}
    };
    let LINKS = { marks: {}, commands: {} };
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
          ARTIFACTS.cracks[POS] = emptyObj;
        }
      }
      if (BLOCKS[POS]) {
        ARTIFACTS.cracks[POS] = emptyObj;
      }
    }
    LINKS.commands.move = "move1";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to move the" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
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
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      seals: oldUnitLayers.seals,
      bears: oldUnitLayers.bears,
      holes: oldUnitLayers.holes
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { unittype: ["queen", 2] },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      seals: { "1": ["b2", "b7"] },
      bears: { "2": ["g2", "g7"] }
    });
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
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      eattargets: step.ARTIFACTS.eattargets,
      cracks: step.ARTIFACTS.cracks,
      canmove: {}
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
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = emptyObj;
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
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endTurn = "startTurn1";
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
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      eattargets: step.ARTIFACTS.eattargets,
      canmove: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    anim.exitTo[MARKS.selectunit] = MARKS.selecteattarget;
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
            .reduce((m, k) => ({ ...m, [k]: emptyObj }), {});
          let CURRENTCOUNT = 0;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            LENGTH++;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (TOTALCOUNT > 0) {
            ARTIFACTS.canmove[POS] = emptyObj;
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
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      );
    } else if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "sealseaten";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      anim
    };
  };
  game.instruction.eat2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      eattargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
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
          ARTIFACTS.eattargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.marks[pos] = "selectmovetarget2";
    }
    for (const pos of Object.keys(ARTIFACTS.eattargets)) {
      LINKS.marks[pos] = "selecteattarget2";
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
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        collapseContent({
          line: [
            { text: "or a neighbouring" },
            { unittype: ["king", 1] },
            { text: "to eat" }
          ]
        })
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      eattargets: step.ARTIFACTS.eattargets,
      cracks: {}
    };
    let LINKS = { marks: {}, commands: {} };
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
          ARTIFACTS.cracks[POS] = emptyObj;
        }
      }
      if (BLOCKS[POS]) {
        ARTIFACTS.cracks[POS] = emptyObj;
      }
    }
    LINKS.commands.move = "move2";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to move the" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selecteattarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.eat = "eat2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selecteattarget: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selecteattarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "eat" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "consume" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selecteattarget] || {}).group],
            (UNITLAYERS.units[MARKS.selecteattarget] || {}).owner,
            MARKS.selecteattarget
          ]
        },
        { text: ", removing both units from the battle" }
      ]
    });
  };
}
export default game;
