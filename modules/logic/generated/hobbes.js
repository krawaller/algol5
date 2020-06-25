import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  coords2pos,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs,
  jumpTwoDirs,
  ringTwoDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { stones: "pawn", kings: "king" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  stones: [
    ["units", "stones"],
    ["units", "myunits", "stones"],
    ["units", "oppunits", "stones"]
  ],
  kings: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  stones: [
    ["units", "stones"],
    ["units", "oppunits", "stones"],
    ["units", "myunits", "stones"]
  ],
  kings: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "hobbes",
  commands: { move: {}, push: {}, pull: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board.height, board.width, board.terrain, 1);
    TERRAIN2 = terrainLayers(board.height, board.width, board.terrain, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        movetargets: {},
        vulnerable: {},
        nearbystonesaftermove: {},
        nearbystonesnomove: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        stones: oldUnitLayers.stones
      };
      let MARKS = {};
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURNVARS = {};
      let TURN = step.TURN + 1;
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.myunits)[0]];
      const blocks = UNITLAYERS.units;
      let seenBlocks = {};
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && !blocks[POS]) {
            toCheck.push(POS);
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (blocks[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.vulnerable[POS] = emptyObj;
            }
          }
        }
      }
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.vulnerable).length === 0
          ? ARTIFACTS.movetargets
          : ARTIFACTS.vulnerable
      )) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      if (Object.keys(ARTIFACTS.vulnerable).length === 0) {
        for (const pos of Object.keys(
          !!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : TURN === 1
            ? Object.keys(ARTIFACTS.nearbystonesnomove)
                .filter(k => k !== Object.keys(TERRAIN1.pie)[0])
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {})
            : ARTIFACTS.nearbystonesnomove
        )) {
          LINKS.marks[pos] = "selectstone_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS,
        TURN,
        TURNVARS
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        movetargets: {},
        vulnerable: {},
        nearbystonesaftermove: {},
        nearbystonesnomove: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        stones: oldUnitLayers.stones
      };
      let MARKS = {};
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURNVARS = {};
      const visited = {};
      const toCheck = [Object.keys(UNITLAYERS.myunits)[0]];
      const blocks = UNITLAYERS.units;
      let seenBlocks = {};
      while (toCheck.length) {
        const from = toCheck.shift();
        visited[from] = true;
        for (const DIR of orthoDirs) {
          const POS = connections[from][DIR];
          if (POS && !visited[POS] && !blocks[POS]) {
            toCheck.push(POS);
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (blocks[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.vulnerable[POS] = emptyObj;
            }
          }
        }
      }
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.vulnerable).length === 0
          ? ARTIFACTS.movetargets
          : ARTIFACTS.vulnerable
      )) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      if (Object.keys(ARTIFACTS.vulnerable).length === 0) {
        for (const pos of Object.keys(
          !!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : ARTIFACTS.nearbystonesnomove
        )) {
          LINKS.marks[pos] = "selectstone_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS,
        TURN: step.TURN,
        TURNVARS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        nearbystonesaftermove: { ...step.ARTIFACTS.nearbystonesaftermove },
        nearbystonesnomove: { ...step.ARTIFACTS.nearbystonesnomove },
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmovetarget: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS
      };
    },
    selectstone_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: {},
        pushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectstone: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR =
          relativeDirs[
            (
              (!!TURNVARS["moved"]
                ? ARTIFACTS.nearbystonesaftermove
                : ARTIFACTS.nearbystonesnomove)[MARKS.selectstone] || {}
            ).dir
          ][5];
        let POS = Object.keys(UNITLAYERS.myunits)[0];
        let STEP = 0;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          STEP++;
          ARTIFACTS.pulltargets[POS] = { dir: DIR, distance: STEP };
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR = (
          (!!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : ARTIFACTS.nearbystonesnomove)[MARKS.selectstone] || {}
        ).dir;
        let POS = MARKS.selectstone;
        let STEP = 0;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          STEP++;
          ARTIFACTS.pushtargets[POS] = { dir: DIR, distance: STEP };
        }
      }
      for (const pos of Object.keys(ARTIFACTS.pushtargets)) {
        LINKS.marks[pos] = "selectpushtarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.pulltargets)) {
        LINKS.marks[pos] = "selectpulltarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS
      };
    },
    selectpushtarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.push = "push_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectstone: step.MARKS.selectstone,
          selectpushtarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectpulltarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.pull = "pull_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectstone: step.MARKS.selectstone,
          selectpulltarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        nearbystonesaftermove: { ...step.ARTIFACTS.nearbystonesaftermove },
        nearbystonesnomove: { ...step.ARTIFACTS.nearbystonesnomove },
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectmovetarget: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS
      };
    },
    selectstone_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: {},
        pushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectstone: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR =
          relativeDirs[
            (
              (!!TURNVARS["moved"]
                ? ARTIFACTS.nearbystonesaftermove
                : ARTIFACTS.nearbystonesnomove)[MARKS.selectstone] || {}
            ).dir
          ][5];
        let POS = Object.keys(UNITLAYERS.myunits)[0];
        let STEP = 0;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          STEP++;
          ARTIFACTS.pulltargets[POS] = { dir: DIR, distance: STEP };
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        let DIR = (
          (!!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : ARTIFACTS.nearbystonesnomove)[MARKS.selectstone] || {}
        ).dir;
        let POS = MARKS.selectstone;
        let STEP = 0;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          STEP++;
          ARTIFACTS.pushtargets[POS] = { dir: DIR, distance: STEP };
        }
      }
      for (const pos of Object.keys(ARTIFACTS.pushtargets)) {
        LINKS.marks[pos] = "selectpushtarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.pulltargets)) {
        LINKS.marks[pos] = "selectpulltarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS
      };
    },
    selectpushtarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.push = "push_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectstone: step.MARKS.selectstone,
          selectpushtarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectpulltarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.pull = "pull_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectstone: step.MARKS.selectstone,
          selectpulltarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        nearbystonesaftermove: { ...step.ARTIFACTS.nearbystonesaftermove },
        nearbystonesnomove: { ...step.ARTIFACTS.nearbystonesnomove },
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (
          UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      TURNVARS.moved = 1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      if (Object.keys(ARTIFACTS.vulnerable).length !== 0) {
        if (Object.keys(UNITLAYERS.oppunits).length === 0) {
          LINKS.endGame = "win";
          LINKS.endedBy = "regicide";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          !!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : TURN === 1
            ? Object.keys(ARTIFACTS.nearbystonesnomove)
                .filter(k => k !== Object.keys(TERRAIN1.pie)[0])
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {})
            : ARTIFACTS.nearbystonesnomove
        )) {
          LINKS.marks[pos] = "selectstone_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    push_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: step.ARTIFACTS.pulltargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectstone] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectpushtarget
          };
        }
      }
      {
        let pos = Object.keys(UNITLAYERS.myunits)[0];
        let unitid = (UNITLAYERS.units[pos] || {}).id;
        if (unitid) {
          let dir = (ARTIFACTS.pushtargets[MARKS.selectpushtarget] || {}).dir;
          let dist = (ARTIFACTS.pushtargets[MARKS.selectpushtarget] || {})
            .distance;
          while (dist--) {
            pos = connections[pos][dir];
          }
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS: step.TURNVARS
      };
    },
    pull_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: step.ARTIFACTS.pulltargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectpulltarget
          };
        }
      }
      {
        let pos = MARKS.selectstone;
        let unitid = (UNITLAYERS.units[pos] || {}).id;
        if (unitid) {
          let dir = (ARTIFACTS.pulltargets[MARKS.selectpulltarget] || {}).dir;
          let dist = (ARTIFACTS.pulltargets[MARKS.selectpulltarget] || {})
            .distance;
          while (dist--) {
            pos = connections[pos][dir];
          }
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS: step.TURNVARS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        nearbystonesaftermove: { ...step.ARTIFACTS.nearbystonesaftermove },
        nearbystonesnomove: { ...step.ARTIFACTS.nearbystonesnomove },
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (
          UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      TURNVARS.moved = 1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let startconnections =
          connections[
            MARKS.selectmovetarget || Object.keys(UNITLAYERS.myunits)[0]
          ];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.stones[POS]) {
            ARTIFACTS[
              !!TURNVARS["moved"]
                ? "nearbystonesaftermove"
                : "nearbystonesnomove"
            ][POS] = { dir: DIR };
          }
        }
      }
      if (Object.keys(ARTIFACTS.vulnerable).length !== 0) {
        if (Object.keys(UNITLAYERS.oppunits).length === 0) {
          LINKS.endGame = "win";
          LINKS.endedBy = "regicide";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          !!TURNVARS["moved"]
            ? ARTIFACTS.nearbystonesaftermove
            : ARTIFACTS.nearbystonesnomove
        )) {
          LINKS.marks[pos] = "selectstone_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    push_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: step.ARTIFACTS.pulltargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectstone] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectpushtarget
          };
        }
      }
      {
        let pos = Object.keys(UNITLAYERS.myunits)[0];
        let unitid = (UNITLAYERS.units[pos] || {}).id;
        if (unitid) {
          let dir = (ARTIFACTS.pushtargets[MARKS.selectpushtarget] || {}).dir;
          let dist = (ARTIFACTS.pushtargets[MARKS.selectpushtarget] || {})
            .distance;
          while (dist--) {
            pos = connections[pos][dir];
          }
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS: step.TURNVARS
      };
    },
    pull_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        vulnerable: step.ARTIFACTS.vulnerable,
        nearbystonesaftermove: step.ARTIFACTS.nearbystonesaftermove,
        nearbystonesnomove: step.ARTIFACTS.nearbystonesnomove,
        pulltargets: step.ARTIFACTS.pulltargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectpulltarget
          };
        }
      }
      {
        let pos = MARKS.selectstone;
        let unitid = (UNITLAYERS.units[pos] || {}).id;
        if (unitid) {
          let dir = (ARTIFACTS.pulltargets[MARKS.selectpulltarget] || {}).dir;
          let dist = (ARTIFACTS.pulltargets[MARKS.selectpulltarget] || {})
            .distance;
          while (dist--) {
            pos = connections[pos][dir];
          }
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS: step.TURNVARS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let TURN = step.TURN;
      return Object.keys(ARTIFACTS.vulnerable).length !== 0
        ? collapseContent({
            line: [
              { text: "Since you can reach" },
              { unittype: ["king", 2] },
              { text: "you must" },
              { select: "select" },
              { text: "it and move there!" }
            ]
          })
        : Object.keys(ARTIFACTS.nearbystonesnomove).length === 0
        ? collapseContent({
            line: [
              { text: "Since there's no nearby" },
              { unittype: ["pawn", 0] },
              { text: "you must" },
              { select: "select" },
              { text: "where to move" }
            ]
          })
        : Object.keys(ARTIFACTS.movetargets).length === 0
        ? collapseContent({
            line: [
              { text: "Since you can't move you must" },
              { select: "select" },
              { text: "a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" },
              TURN === 1
                ? collapseContent({
                    line: [
                      { text: "(but you can't push" },
                      { pos: Object.keys(TERRAIN1.pie)[0] },
                      { text: "on the 1st turn)" }
                    ]
                  })
                : undefined
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              { unittype: ["king", 1] },
              { text: "or a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" }
            ]
          });
    },
    move_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(UNITLAYERS.oppunits).length === 0
        ? collapseContent({
            line: [
              { text: "Since you killed the opponent" },
              { unittype: ["king", 2] },
              { text: "you may immediately" },
              { endTurn: "end turn" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now" },
              { select: "select" },
              { text: "a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" }
            ]
          });
    },
    push_basic_1: () => defaultInstruction(1),
    pull_basic_1: () => defaultInstruction(1),
    selectmovetarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "to" },
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectstone_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to push or pull" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          }
        ]
      });
    },
    selectpushtarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "push" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "shove" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          },
          { text: "to" },
          { pos: MARKS.selectpushtarget }
        ]
      });
    },
    selectpulltarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "pull" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "move to" },
          { pos: MARKS.selectpulltarget },
          { text: "and drag" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          },
          { text: "with it" }
        ]
      });
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return Object.keys(ARTIFACTS.vulnerable).length !== 0
        ? collapseContent({
            line: [
              { text: "Since you can reach" },
              { unittype: ["king", 1] },
              { text: "you must" },
              { select: "select" },
              { text: "it and move there!" }
            ]
          })
        : Object.keys(ARTIFACTS.nearbystonesnomove).length === 0
        ? collapseContent({
            line: [
              { text: "Since there's no nearby" },
              { unittype: ["pawn", 0] },
              { text: "you must" },
              { select: "select" },
              { text: "where to move" }
            ]
          })
        : Object.keys(ARTIFACTS.movetargets).length === 0
        ? collapseContent({
            line: [
              { text: "Since you can't move you must" },
              { select: "select" },
              { text: "a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              { unittype: ["king", 2] },
              { text: "or a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" }
            ]
          });
    },
    move_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(UNITLAYERS.oppunits).length === 0
        ? collapseContent({
            line: [
              { text: "Since you killed the opponent" },
              { unittype: ["king", 1] },
              { text: "you may immediately" },
              { endTurn: "end turn" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Now" },
              { select: "select" },
              { text: "a nearby" },
              { unittype: ["pawn", 0] },
              { text: "to push or pull" }
            ]
          });
    },
    push_basic_2: () => defaultInstruction(2),
    pull_basic_2: () => defaultInstruction(2),
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "to" },
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectstone_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to push or pull" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          }
        ]
      });
    },
    selectpushtarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "push" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "shove" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          },
          { text: "to" },
          { pos: MARKS.selectpushtarget }
        ]
      });
    },
    selectpulltarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "pull" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myunits)[0]
            ]
          },
          { text: "move to" },
          { pos: MARKS.selectpulltarget },
          { text: "and drag" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectstone] || {}).group],
              (UNITLAYERS.units[MARKS.selectstone] || {}).owner,
              MARKS.selectstone
            ]
          },
          { text: "with it" }
        ]
      });
    }
  },
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "regular",
      code: "r",
      arr: {
        setup: {
          kings: {
            "1": ["d2"],
            "2": ["b4"]
          },
          stones: {
            "0": ["a4", "b1", "b2", "b5", "c2", "c3", "d3", "d4", "d5", "e1"]
          }
        },
        marks: [],
        potentialMarks: ["c1", "c2", "d1", "d3", "e2", "e4", "e5"]
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {
        pie: ["c2"]
      }
    }
  },
  setups: {
    basic: {
      stones: {
        "0": [
          {
            holerect: ["b1", "d2", "c1"]
          },
          {
            holerect: ["b4", "d5", "c5"]
          }
        ]
      },
      kings: {
        "1": ["c1"],
        "2": ["c5"]
      }
    }
  }
};
export default game;
