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
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  linebeginnings: {},
  loseline: {},
  winline: {}
};
const game = {
  gameId: "squava",
  commands: { drop: {}, pie: {} },
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
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectspace_basic_1";
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
        oppunits: oldUnitLayers.myunits,
        markers: oldUnitLayers.markers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectspace_basic_2";
      }
      if (TURN === 1) {
        LINKS.commands.pie = "pie_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectspace_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectspace: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectspace_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectspace: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        linebeginnings: {},
        loseline: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectspace,
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
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.linebeginnings[
                walkedsquares[WALKLENGTH - 1]
              ] = emptyObj;
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.linebeginnings) {
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
              {
                if (WALKLENGTH === 3) {
                  ARTIFACTS.loseline[POS] = emptyObj;
                }
              }
              {
                if (WALKLENGTH === 4) {
                  ARTIFACTS.winline[POS] = emptyObj;
                }
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "loseline";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
      } else if (true) {
        LINKS.starvation = {
          endGame: "draw",
          endedBy: "fullboard"
        };
        LINKS.endTurn = "startTurn_basic_2";
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
        NEXTSPAWNID
      };
    },
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        linebeginnings: {},
        loseline: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectspace,
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
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.linebeginnings[
                walkedsquares[WALKLENGTH - 1]
              ] = emptyObj;
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.linebeginnings) {
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
              {
                if (WALKLENGTH === 3) {
                  ARTIFACTS.loseline[POS] = emptyObj;
                }
              }
              {
                if (WALKLENGTH === 4) {
                  ARTIFACTS.winline[POS] = emptyObj;
                }
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "loseline";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
      } else if (true) {
        LINKS.starvation = {
          endGame: "draw",
          endedBy: "fullboard"
        };
        LINKS.endTurn = "startTurn_basic_1";
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
        NEXTSPAWNID
      };
    },
    pie_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      for (let LOOPPOS in UNITLAYERS.oppunits) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 2
            };
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, markers: {} };
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
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [{ text: "Select where to drop a" }, { unittype: ["pawn", 1] }]
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    selectspace_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to place" },
          { unit: ["pawn", 1, MARKS.selectspace] }
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return collapseContent({
        line: [
          { text: "Select where to drop a" },
          { unittype: ["pawn", 2] },
          TURN === 1
            ? collapseContent({
                line: [
                  { text: "or invoke" },
                  { command: "pie" },
                  { text: "to steal" },
                  collapseContent({
                    line: Object.keys(UNITLAYERS.oppunits)
                      .filter(p => UNITLAYERS.units[p])
                      .map(p => ({
                        unit: [
                          iconMapping[UNITLAYERS.units[p].group],
                          UNITLAYERS.units[p].owner,
                          p
                        ]
                      }))
                      .reduce((mem, i, n, list) => {
                        mem.push(i);
                        if (n === list.length - 2) {
                          mem.push({ text: " and " });
                        } else if (n < list.length - 2) {
                          mem.push({ text: ", " });
                        }
                        return mem;
                      }, [])
                  })
                ]
              })
            : undefined
        ]
      });
    },
    drop_basic_2: () => defaultInstruction(2),
    pie_basic_2: () => defaultInstruction(2),
    selectspace_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to place" },
          { unit: ["pawn", 2, MARKS.selectspace] }
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
            "1": ["b2", "b4", "b5", "c4", "e2"],
            "2": ["a1", "c3", "d3", "d4"]
          }
        },
        marks: ["b3"],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {}
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
