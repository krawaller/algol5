import {
  offsetPos,
  whoWins,
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
import boards from "../../games/definitions/stooges/boards";
import setups from "../../games/definitions/stooges/setups";
import variants from "../../games/definitions/stooges/variants";
const emptyObj = {};
const iconMapping = { singles: "pawn", doubles: "rook" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  singles: [
    ["units", "singles"],
    ["units", "myunits", "singles", "mysingles"],
    ["units", "oppunits", "singles", "oppsingles"]
  ],
  doubles: [
    ["units"],
    ["units", "myunits", "mydoubles"],
    ["units", "oppunits", "oppdoubles"]
  ]
};
const groupLayers2 = {
  singles: [
    ["units", "singles"],
    ["units", "oppunits", "singles", "oppsingles"],
    ["units", "myunits", "singles", "mysingles"]
  ],
  doubles: [
    ["units"],
    ["units", "oppunits", "oppdoubles"],
    ["units", "myunits", "mydoubles"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {}, winline: {} };
const game = {
  gameId: "stooges",
  commands: { move: {}, swap: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board, 1);
    TERRAIN2 = terrainLayers(board, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      singles: {},
      mysingles: {},
      oppsingles: {},
      mydoubles: {},
      oppdoubles: {}
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
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        singles: oldUnitLayers.singles,
        mysingles: oldUnitLayers.oppsingles,
        oppsingles: oldUnitLayers.mysingles,
        mydoubles: oldUnitLayers.oppdoubles,
        oppdoubles: oldUnitLayers.mydoubles
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      if (!BATTLEVARS["doubleswap"]) {
        for (const pos of Object.keys(
          Object.keys(UNITLAYERS.singles)
            .filter(k => k !== BATTLEVARS["lastswap"])
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectsingle_basic_1";
        }
      }
      for (const pos of Object.keys(UNITLAYERS.mydoubles)) {
        LINKS.marks[pos] = "selectdouble_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        singles: oldUnitLayers.singles,
        mysingles: oldUnitLayers.oppsingles,
        oppsingles: oldUnitLayers.mysingles,
        mydoubles: oldUnitLayers.oppdoubles,
        oppdoubles: oldUnitLayers.mydoubles
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      if (!BATTLEVARS["doubleswap"]) {
        for (const pos of Object.keys(
          Object.keys(UNITLAYERS.singles)
            .filter(k => k !== BATTLEVARS["lastswap"])
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectsingle_basic_2";
        }
      }
      for (const pos of Object.keys(UNITLAYERS.mydoubles)) {
        LINKS.marks[pos] = "selectdouble_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        BATTLEVARS
      };
    },
    selectsingle_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.swap = "swap_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsingle: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    selectdouble_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdouble: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectdouble];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.mysingles[POS]) {
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
          selectdouble: step.MARKS.selectdouble,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    selectsingle_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.swap = "swap_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectsingle: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    selectdouble_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdouble: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectdouble];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.mysingles[POS]) {
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
          selectdouble: step.MARKS.selectdouble,
          selectmovetarget: newMarkPos
        },
        BATTLEVARS: step.BATTLEVARS,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdouble
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdouble] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      BATTLEVARS.doubleswap = 0;
      BATTLEVARS.lastswap = 0;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        singles: {},
        mysingles: {},
        oppsingles: {},
        mydoubles: {},
        oppdoubles: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.mydoubles;
        for (let STARTPOS in UNITLAYERS.mydoubles) {
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
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        BATTLEVARS
      };
    },
    swap_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectsingle] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: UNITLAYERS.myunits[MARKS.selectsingle] ? 2 : 1
          };
        }
      }
      if (!!BATTLEVARS["lastswap"]) {
        BATTLEVARS.doubleswap = 1;
      }
      BATTLEVARS.lastswap = MARKS.selectsingle;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        singles: {},
        mysingles: {},
        oppsingles: {},
        mydoubles: {},
        oppdoubles: {}
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
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdouble
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdouble] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      BATTLEVARS.doubleswap = 0;
      BATTLEVARS.lastswap = 0;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        singles: {},
        mysingles: {},
        oppsingles: {},
        mydoubles: {},
        oppdoubles: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.mydoubles;
        for (let STARTPOS in UNITLAYERS.mydoubles) {
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
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "winline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        BATTLEVARS
      };
    },
    swap_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectsingle] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: UNITLAYERS.myunits[MARKS.selectsingle] ? 1 : 2
          };
        }
      }
      if (!!BATTLEVARS["lastswap"]) {
        BATTLEVARS.doubleswap = 1;
      }
      BATTLEVARS.lastswap = MARKS.selectsingle;
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        singles: {},
        mysingles: {},
        oppsingles: {},
        mydoubles: {},
        oppdoubles: {}
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
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 1] },
          { text: "to move" },
          !!BATTLEVARS["doubleswap"]
            ? collapseContent({
                line: [{ text: ". You cannot swap this turn." }]
              })
            : collapseContent({
                line: [
                  { text: "or" },
                  { unittype: ["pawn", 12] },
                  { text: "to swap" },
                  !!BATTLEVARS["lastswap"]
                    ? collapseContent({
                        line: [
                          { text: "(except" },
                          {
                            unit: [
                              iconMapping[
                                (UNITLAYERS.units[BATTLEVARS["lastswap"]] || {})
                                  .group
                              ],
                              (UNITLAYERS.units[BATTLEVARS["lastswap"]] || {})
                                .owner,
                              BATTLEVARS["lastswap"]
                            ]
                          },
                          { text: "which swapped last turn)" }
                        ]
                      })
                    : undefined
                ]
              })
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    swap_basic_1: () => defaultInstruction(1),
    selectsingle_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "swap" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectsingle] || {}).group],
              (UNITLAYERS.units[MARKS.selectsingle] || {}).owner,
              MARKS.selectsingle
            ]
          },
          { text: "into" },
          { unittype: ["pawn", UNITLAYERS.myunits[MARKS.selectsingle] ? 2 : 1] }
        ]
      });
    },
    selectdouble_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 1] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectdouble] || {}).group],
              (UNITLAYERS.units[MARKS.selectdouble] || {}).owner,
              MARKS.selectdouble
            ]
          },
          { text: "to move to" }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectdouble] || {}).group],
              (UNITLAYERS.units[MARKS.selectdouble] || {}).owner,
              MARKS.selectdouble
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 2] },
          { text: "to move" },
          !!BATTLEVARS["doubleswap"]
            ? collapseContent({
                line: [{ text: ". You cannot swap this turn." }]
              })
            : collapseContent({
                line: [
                  { text: "or" },
                  { unittype: ["pawn", 12] },
                  { text: "to swap" },
                  !!BATTLEVARS["lastswap"]
                    ? collapseContent({
                        line: [
                          { text: "(except" },
                          {
                            unit: [
                              iconMapping[
                                (UNITLAYERS.units[BATTLEVARS["lastswap"]] || {})
                                  .group
                              ],
                              (UNITLAYERS.units[BATTLEVARS["lastswap"]] || {})
                                .owner,
                              BATTLEVARS["lastswap"]
                            ]
                          },
                          { text: "which swapped last turn)" }
                        ]
                      })
                    : undefined
                ]
              })
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    swap_basic_2: () => defaultInstruction(2),
    selectsingle_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "swap" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectsingle] || {}).group],
              (UNITLAYERS.units[MARKS.selectsingle] || {}).owner,
              MARKS.selectsingle
            ]
          },
          { text: "into" },
          { unittype: ["pawn", UNITLAYERS.myunits[MARKS.selectsingle] ? 1 : 2] }
        ]
      });
    },
    selectdouble_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 2] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectdouble] || {}).group],
              (UNITLAYERS.units[MARKS.selectdouble] || {}).owner,
              MARKS.selectdouble
            ]
          },
          { text: "to move to" }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectdouble] || {}).group],
              (UNITLAYERS.units[MARKS.selectdouble] || {}).owner,
              MARKS.selectdouble
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
