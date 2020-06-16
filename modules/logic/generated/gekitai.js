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
  markers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  markers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const emptyArtifactLayers_basic = {
  winline: {},
  loseline: {},
  death: {},
  push: {}
};
const game = {
  gameId: "gekitai",
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdroptarget_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdroptarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        death: {},
        push: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectdroptarget;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : LENGTH === MAX
              ? "reachedmax"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            {
              if (STOPREASON === "outofbounds") {
                ARTIFACTS.death[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
            {
              if (STOPREASON === "nomoresteps") {
                ARTIFACTS.push[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
          }
        }
      }
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        death: {},
        push: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectdroptarget;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : LENGTH === MAX
              ? "reachedmax"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            {
              if (STOPREASON === "outofbounds") {
                ARTIFACTS.death[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
            {
              if (STOPREASON === "nomoresteps") {
                ARTIFACTS.push[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
          }
        }
      }
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        death: step.ARTIFACTS.death,
        push: step.ARTIFACTS.push,
        winline: {},
        loseline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.death;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).pushdir,
            1,
            0
          );
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "markers",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.death) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        const LOOPSET = ARTIFACTS.push;
        for (let LOOPPOS in LOOPSET) {
          {
            let pos = LOOPPOS;
            let unitid = (UNITLAYERS.units[pos] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: connections[pos][(LOOPSET[LOOPPOS] || {}).pushdir]
              };
            }
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps = UNITLAYERS.myunits[STARTPOS]
            ? UNITLAYERS.myunits
            : UNITLAYERS.oppunits;
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
              if (WALKLENGTH > 2) {
                ARTIFACTS[
                  UNITLAYERS.myunits[STARTPOS] ? "winline" : "loseline"
                ][POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(UNITLAYERS.myunits).length === 8) {
        LINKS.endGame = "win";
        LINKS.endedBy = "allout";
      } else if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "suicide";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
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
        death: step.ARTIFACTS.death,
        push: step.ARTIFACTS.push,
        winline: {},
        loseline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.death;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).pushdir,
            1,
            0
          );
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "markers",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.death) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        const LOOPSET = ARTIFACTS.push;
        for (let LOOPPOS in LOOPSET) {
          {
            let pos = LOOPPOS;
            let unitid = (UNITLAYERS.units[pos] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: connections[pos][(LOOPSET[LOOPPOS] || {}).pushdir]
              };
            }
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.units) {
          let allowedsteps = UNITLAYERS.myunits[STARTPOS]
            ? UNITLAYERS.myunits
            : UNITLAYERS.oppunits;
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
              if (WALKLENGTH > 2) {
                ARTIFACTS[
                  UNITLAYERS.myunits[STARTPOS] ? "winline" : "loseline"
                ][POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(UNITLAYERS.myunits).length === 8) {
        LINKS.endGame = "win";
        LINKS.endedBy = "allout";
      } else if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "suicide";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
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
        line: [{ text: "Select where to drop a unit" }]
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to drop a" },
          { unittype: ["pawn", 1] },
          { text: "at" },
          { pos: MARKS.selectdroptarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [{ text: "Select where to drop a unit" }]
      });
    },
    drop_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to drop a" },
          { unittype: ["pawn", 2] },
          { text: "at" },
          { pos: MARKS.selectdroptarget }
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
      code: "u",
      arr: {
        marks: [],
        potentialMarks: [
          "b1",
          "c1",
          "d1",
          "e1",
          "f1",
          "b2",
          "c2",
          "e2",
          "f2",
          "a3",
          "b3",
          "d3",
          "e3",
          "f3",
          "a4",
          "b4",
          "c4",
          "d4",
          "f4",
          "a5",
          "b5",
          "d5",
          "e5",
          "a6",
          "b6",
          "c6",
          "d6",
          "e6",
          "f6"
        ],
        setup: {
          markers: {
            "1": ["a1", "d2", "c3"],
            "2": ["a2", "e4", "c5", "f5"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 6,
      width: 6,
      terrain: {}
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
