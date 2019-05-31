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
const BOARD = boardLayers({ height: 5, width: 5 });
const iconMapping = { pawns: "pawn", kings: "king" };
const emptyArtifactLayers = {
  strandedmusketeers: {},
  musketeerline: {},
  movetargets: {}
};
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(5, 5, {});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game = { gameId: "threemusketeers", action: {}, instruction: {} };
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
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pawns: oldUnitLayers.pawns,
      kings: oldUnitLayers.kings
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
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "which" },
        { unittype: ["king", 1] },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
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
    let LINKS = { marks: {}, commands: {} };
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
      LINKS.marks[pos] = "selectmovetarget1";
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
        { select: "Select" },
        { unittype: ["pawn", 2] },
        { text: "adjacent to" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to attack" }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move1";
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
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "attack" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).group],
            (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
            MARKS.selectmovetarget
          ]
        }
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
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pawns: oldUnitLayers.pawns,
      kings: oldUnitLayers.kings
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
      TURN: step.TURN
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "which" },
        { unittype: ["pawn", 2] },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      kings: { "1": ["a1", "c3", "e5"] },
      pawns: { "2": [{ holerect: ["a1", "e5", "a1", "c3", "e5"] }] }
    });
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
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS = { marks: {}, commands: {} };
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
    let LINKS = { marks: {}, commands: {} };
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
      LINKS.marks[pos] = "selectmovetarget2";
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
        { select: "Select" },
        { text: "an empty space adjacent to" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to move to" }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move2";
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
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "go to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game;
