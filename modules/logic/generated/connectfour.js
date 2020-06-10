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
const iconMapping = { markers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  markers: [
    ["units", "markers"],
    ["units", "myunits", "markers"],
    ["units", "oppunits", "markers"]
  ]
};
const groupLayers2 = {
  markers: [
    ["units", "markers"],
    ["units", "oppunits", "markers"],
    ["units", "myunits", "markers"]
  ]
};
const game = {
  gameId: "connectfour",
  commands: { drop: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, markers: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        droptargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        markers: oldUnitLayers.markers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in Object.keys(TERRAIN1.edge)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[5] = STARTPOS;
          while ((POS = connections[POS][5]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.droptargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.droptargets)) {
        LINKS.marks[pos] = "selectdroptarget_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        droptargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        markers: oldUnitLayers.markers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in Object.keys(TERRAIN2.edge)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[5] = STARTPOS;
          while ((POS = connections[POS][5]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.droptargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.droptargets)) {
        LINKS.marks[pos] = "selectdroptarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        droptargets: step.ARTIFACTS.droptargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectdroptarget] = coords2pos({
        x: BOARD.board[MARKS.selectdroptarget].x,
        y: 1 + dimensions.height
      });
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "markers",
          owner: 1
        };
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, markers: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in UNITLAYERS.myunits) {
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
              if (WALKLENGTH > 3) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "connectfour";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (
        Object.keys(UNITLAYERS.units).length === Object.keys(BOARD.board).length
      ) {
        LINKS.endGame = "draw";
        LINKS.endedBy = "full";
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
        NEXTSPAWNID,
        anim
      };
    },
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        droptargets: step.ARTIFACTS.droptargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectdroptarget] = coords2pos({
        x: BOARD.board[MARKS.selectdroptarget].x,
        y: 1 + dimensions.height
      });
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "markers",
          owner: 2
        };
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, markers: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in UNITLAYERS.myunits) {
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
              if (WALKLENGTH > 3) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "connectfour";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (
        Object.keys(UNITLAYERS.units).length === Object.keys(BOARD.board).length
      ) {
        LINKS.endGame = "draw";
        LINKS.endedBy = "full";
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
        NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a column to drop a" },
          { unittype: ["pawn", 1] },
          { text: "into" }
        ]
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          { unit: ["pawn", 1, MARKS.selectdroptarget] }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a column to drop a" },
          { unittype: ["pawn", 2] },
          { text: "into" }
        ]
      });
    },
    drop_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          { unit: ["pawn", 2, MARKS.selectdroptarget] }
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
          markers: {
            "1": ["c1", "d1", "d2", "d3", "e3"],
            "2": ["b1", "c2", "e1", "e2"]
          }
        },
        marks: [],
        potentialMarks: ["a1", "b2", "c3", "d4", "e4", "f1", "g1"]
      }
    }
  ],
  boards: {
    basic: {
      height: 6,
      width: 7,
      terrain: {
        edge: [
          {
            rect: ["a6", "g6"]
          }
        ]
      }
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
