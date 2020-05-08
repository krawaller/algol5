import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs,
  jumpTwoDirs,
  ringTwoDirs,
  makeGrids
} from "../../common";
const emptyObj = {};
const iconMapping = { pawns: "pawn", nobles: "king", kings: "king" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions, GRIDS;
const groupLayers1 = {
  pawns: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  nobles: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ],
  kings: [
    ["units", "neutralunits", "kings"],
    ["units", "myunits", "kings"],
    ["units", "oppunits", "kings"]
  ]
};
const groupLayers2 = {
  pawns: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  nobles: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ],
  kings: [
    ["units", "neutralunits", "kings"],
    ["units", "oppunits", "kings"],
    ["units", "myunits", "kings"]
  ]
};
const game = {
  gameId: "scatter",
  commands: { move: {}, north: {}, east: {}, south: {}, west: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board.height, board.width, board.terrain, 1);
    TERRAIN2 = terrainLayers(board.height, board.width, board.terrain, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
    GRIDS = makeGrids(board.grids);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      BATTLEVARS: {},
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        easttargets: {},
        northtargets: {},
        southtargets: {},
        westtargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        kings: oldUnitLayers.kings
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of ["d3f2r0", "d3f3r0", "d3f2r1", "d3f3r1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.easttargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, "d1f2r0", "d1f2r1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.northtargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of ["d5f2r0", "d5f3r0", "d5f2r-1", "d5f3r-1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.southtargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of [6, 7, "d7f2r-1", "d7f2r0"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.westtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      if (
        Object.keys(ARTIFACTS.northtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "north"
      ) {
        LINKS.commands.north = "north_basic_1";
      }
      if (
        Object.keys(ARTIFACTS.southtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "south"
      ) {
        LINKS.commands.south = "south_basic_1";
      }
      if (
        Object.keys(ARTIFACTS.easttargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "east"
      ) {
        LINKS.commands.east = "east_basic_1";
      }
      if (
        Object.keys(ARTIFACTS.westtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "west"
      ) {
        LINKS.commands.west = "west_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        easttargets: {},
        northtargets: {},
        southtargets: {},
        westtargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        kings: oldUnitLayers.kings
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of ["d3f2r0", "d3f3r0", "d3f2r1", "d3f3r1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.easttargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, "d1f2r0", "d1f2r1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.northtargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of ["d5f2r0", "d5f3r0", "d5f2r-1", "d5f3r-1"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.southtargets[POS] = emptyObj;
          }
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of [6, 7, "d7f2r-1", "d7f2r0"]) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.westtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      if (
        Object.keys(ARTIFACTS.northtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "north"
      ) {
        LINKS.commands.north = "north_basic_2";
      }
      if (
        Object.keys(ARTIFACTS.southtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "south"
      ) {
        LINKS.commands.south = "south_basic_2";
      }
      if (
        Object.keys(ARTIFACTS.easttargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "east"
      ) {
        LINKS.commands.east = "east_basic_2";
      }
      if (
        Object.keys(ARTIFACTS.westtargets).length !== 0 &&
        BATTLEVARS["noshift"] !== "west"
      ) {
        LINKS.commands.west = "west_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        BATTLEVARS
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets,
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
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets,
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
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
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
      BATTLEVARS.noshift = 0;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        [510, 509, 507, 503, 495, 479, 447, 383, 255].indexOf(
          Object.keys(UNITLAYERS.myunits).reduce(
            (mem, pos) => mem + GRIDS["binary"][pos],
            0
          )
        ) !== -1
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "scatter";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    north_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d1f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.northtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d5f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "south";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    east_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d3f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.easttargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d7f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "west";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    south_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d5f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.southtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d1f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "north";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    west_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d7f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.westtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d3f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "east";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
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
      BATTLEVARS.noshift = 0;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        [510, 509, 507, 503, 495, 479, 447, 383, 255].indexOf(
          Object.keys(UNITLAYERS.myunits).reduce(
            (mem, pos) => mem + GRIDS["binary"][pos],
            0
          )
        ) !== -1
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "scatter";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    north_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d1f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.northtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d5f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "south";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    east_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d3f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.easttargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d7f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "west";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    south_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d5f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.southtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d1f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "north";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    west_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        easttargets: step.ARTIFACTS.easttargets,
        northtargets: step.ARTIFACTS.northtargets,
        southtargets: step.ARTIFACTS.southtargets,
        westtargets: step.ARTIFACTS.westtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.neutralunits) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d7f2r0"]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.westtargets) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos]["d3f2r0"]
            };
          }
        }
      }
      BATTLEVARS.noshift = "east";
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        kings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        canAlwaysEnd: true
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 1] },
          { text: "to move, or shift all" },
          { unittype: ["king", 0] },
          collapseContent({
            line: [
              !!LINKS.commands["north"] ? { command: "north" } : undefined,
              !!LINKS.commands["south"] ? { command: "south" } : undefined,
              !!LINKS.commands["east"] ? { command: "east" } : undefined,
              !!LINKS.commands["west"] ? { command: "west" } : undefined
            ]
              .filter(i => !!i)
              .reduce((mem, i, n, list) => {
                mem.push(i);
                if (n === list.length - 2) {
                  mem.push({ text: " or " });
                } else if (n < list.length - 2) {
                  mem.push({ text: ", " });
                }
                return mem;
              }, [])
          }),
          !!BATTLEVARS["noshift"]
            ? collapseContent({
                line: [
                  { text: "(we cannot shift back" },
                  { text: BATTLEVARS["noshift"] },
                  { text: "this turn)" }
                ]
              })
            : undefined,
          { text: "." }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    north_basic_1: () => defaultInstruction(1),
    east_basic_1: () => defaultInstruction(1),
    south_basic_1: () => defaultInstruction(1),
    west_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          }
        ]
      });
    },
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let LINKS = step.LINKS;
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 2] },
          { text: "to move, or shift all" },
          { unittype: ["king", 0] },
          collapseContent({
            line: [
              !!LINKS.commands["north"] ? { command: "north" } : undefined,
              !!LINKS.commands["south"] ? { command: "south" } : undefined,
              !!LINKS.commands["east"] ? { command: "east" } : undefined,
              !!LINKS.commands["west"] ? { command: "west" } : undefined
            ]
              .filter(i => !!i)
              .reduce((mem, i, n, list) => {
                mem.push(i);
                if (n === list.length - 2) {
                  mem.push({ text: " or " });
                } else if (n < list.length - 2) {
                  mem.push({ text: ", " });
                }
                return mem;
              }, [])
          }),
          !!BATTLEVARS["noshift"]
            ? collapseContent({
                line: [
                  { text: "(we cannot shift back" },
                  { text: BATTLEVARS["noshift"] },
                  { text: "this turn)" }
                ]
              })
            : undefined,
          { text: "." }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    north_basic_2: () => defaultInstruction(2),
    east_basic_2: () => defaultInstruction(2),
    south_basic_2: () => defaultInstruction(2),
    west_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          }
        ]
      });
    },
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
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
            "0": ["e1", "e2", "f1", "f2"]
          },
          pawns: {
            "1": ["b1", "c2", "d1", "e4", "b6", "c5", "d5", "d6"],
            "2": ["a3", "a4", "b2", "b4", "c3", "c4", "d4", "e3"]
          }
        },
        marks: ["b4"],
        potentialMarks: ["b3", "b5"]
      }
    }
  ],
  boards: {
    basic: {
      height: 6,
      width: 6,
      terrain: {
        odd: [
          {
            holerect: ["a5", "f6", "c5", "c6", "d5", "d6"]
          },
          {
            holerect: ["a1", "f2", "c1", "c2", "d1", "d2"]
          },
          {
            rect: ["c3", "d4"]
          }
        ]
      },
      offsets: [
        ["ortho", 2, 0],
        ["ortho", 2, -1],
        ["ortho", 2, 1],
        ["ortho", 3, 0],
        ["ortho", 3, 1],
        ["ortho", 3, -1]
      ],
      grids: {
        binary: [
          [1, 1, 2, 2, 4, 4],
          [1, 1, 2, 2, 4, 4],
          [8, 8, 16, 16, 32, 32],
          [8, 8, 16, 16, 32, 32],
          [64, 64, 128, 128, 256, 256],
          [64, 64, 128, 128, 256, 256]
        ]
      }
    }
  },
  setups: {
    basic: {
      nobles: {
        "0": ["c3", "d3", "d4"]
      },
      kings: {
        "0": ["c4"]
      },
      pawns: {
        "1": [
          {
            rect: ["c1", "d2"]
          },
          {
            rect: ["c5", "d6"]
          }
        ],
        "2": [
          {
            rect: ["a3", "b4"]
          },
          {
            rect: ["e3", "f4"]
          }
        ]
      }
    }
  }
};
export default game;
