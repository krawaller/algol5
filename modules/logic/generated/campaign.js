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
const iconMapping = { knights: "knight", marks: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  knights: [
    ["units", "knights"],
    ["units", "myunits", "knights", "myknights"],
    ["units", "oppunits", "knights", "oppknights"]
  ],
  marks: [
    ["units", "marks"],
    ["units", "myunits", "marks"],
    ["units", "oppunits", "marks"]
  ]
};
const groupLayers2 = {
  knights: [
    ["units", "knights"],
    ["units", "oppunits", "knights", "oppknights"],
    ["units", "myunits", "knights", "myknights"]
  ],
  marks: [
    ["units", "marks"],
    ["units", "oppunits", "marks"],
    ["units", "myunits", "marks"]
  ]
};
const game = {
  gameId: "campaign",
  commands: { deploy: {}, jump: {} },
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
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      knights: {},
      myknights: {},
      oppknights: {},
      marks: {}
    };
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
        jumptargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        knights: oldUnitLayers.knights,
        myknights: oldUnitLayers.oppknights,
        oppknights: oldUnitLayers.myknights,
        marks: oldUnitLayers.marks
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      for (let STARTPOS in UNITLAYERS.myknights) {
        let startconnections = connections[STARTPOS];
        for (let DIR of knightDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.jumptargets[POS] = emptyObj;
          }
        }
      }
      if (TURN === 1) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !UNITLAYERS.units.hasOwnProperty(k) &&
                !TERRAIN1.center.hasOwnProperty(k)
            )
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploytarget_basic_1";
        }
      } else {
        for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
          LINKS.marks[pos] = "selectjumptarget_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {}
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        jumptargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        knights: oldUnitLayers.knights,
        myknights: oldUnitLayers.oppknights,
        oppknights: oldUnitLayers.myknights,
        marks: oldUnitLayers.marks
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      for (let STARTPOS in UNITLAYERS.myknights) {
        let startconnections = connections[STARTPOS];
        for (let DIR of knightDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.jumptargets[POS] = emptyObj;
          }
        }
      }
      if (TURN === 1) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploytarget_basic_2";
        }
      } else {
        for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
          LINKS.marks[pos] = "selectjumptarget_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {}
      };
    },
    selectdeploytarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdeploytarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectjumptarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectdeploytarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdeploytarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectjumptarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    deploy_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdeploytarget,
          id: newunitid,
          group: "knights",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        knights: {},
        myknights: {},
        oppknights: {},
        marks: {}
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
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID
      };
    },
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        winlineheads: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.jumpedfrom = Object.keys(UNITLAYERS.myknights)[0];
      {
        let unitid = (UNITLAYERS.units[TURNVARS["jumpedfrom"]] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: TURNVARS["jumpedfrom"],
          id: newunitid,
          group: "marks",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        knights: {},
        myknights: {},
        oppknights: {},
        marks: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = TURNVARS["jumpedfrom"];
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.winlineheads[walkedsquares[WALKLENGTH - 1]] = {
              dir: relativeDirs[5][DIR]
            };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.winlineheads) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[
            (ARTIFACTS.winlineheads[STARTPOS] || {}).dir
          ] = STARTPOS;
          while (
            (POS =
              connections[POS][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]) &&
            allowedsteps[POS]
          ) {
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
        TURNVARS,
        NEXTSPAWNID
      };
    },
    deploy_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdeploytarget,
          id: newunitid,
          group: "knights",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        knights: {},
        myknights: {},
        oppknights: {},
        marks: {}
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
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID
      };
    },
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: step.ARTIFACTS.jumptargets,
        winlineheads: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.jumpedfrom = Object.keys(UNITLAYERS.myknights)[0];
      {
        let unitid = (UNITLAYERS.units[TURNVARS["jumpedfrom"]] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: TURNVARS["jumpedfrom"],
          id: newunitid,
          group: "marks",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        knights: {},
        myknights: {},
        oppknights: {},
        marks: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = TURNVARS["jumpedfrom"];
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.winlineheads[walkedsquares[WALKLENGTH - 1]] = {
              dir: relativeDirs[5][DIR]
            };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.winlineheads) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[
            (ARTIFACTS.winlineheads[STARTPOS] || {}).dir
          ] = STARTPOS;
          while (
            (POS =
              connections[POS][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]) &&
            allowedsteps[POS]
          ) {
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
        TURNVARS,
        NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN === 1
        ? collapseContent({
            line: [
              { text: "Select where to deploy your" },
              { unittype: ["knight", 1] },
              collapseContent({
                line: [
                  {
                    text: "(as 1st player you cannot use the 4 central squares)"
                  }
                ]
              })
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] ||
                      {}
                    ).group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.myknights)[0]
                ]
              }
            ]
          });
    },
    deploy_basic_1: () => defaultInstruction(1),
    jump_basic_1: () => defaultInstruction(1),
    selectdeploytarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["knight", 1, MARKS.selectdeploytarget] }
        ]
      });
    },
    selectjumptarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myknights)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectjumptarget },
          { text: "and spawn" },
          { unit: ["pawn", 1, Object.keys(UNITLAYERS.myknights)[0]] }
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN === 1
        ? collapseContent({
            line: [
              { text: "Select where to deploy your" },
              { unittype: ["knight", 2] }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] ||
                      {}
                    ).group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.myknights)[0]
                ]
              }
            ]
          });
    },
    deploy_basic_2: () => defaultInstruction(2),
    jump_basic_2: () => defaultInstruction(2),
    selectdeploytarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["knight", 2, MARKS.selectdeploytarget] }
        ]
      });
    },
    selectjumptarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                  .group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.myknights)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.myknights)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectjumptarget },
          { text: "and spawn" },
          { unit: ["pawn", 2, Object.keys(UNITLAYERS.myknights)[0]] }
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
          knights: {
            "1": ["d5"],
            "2": ["e4"]
          },
          marks: {
            "1": ["d4", "e6", "f4", "f5"],
            "2": ["c5", "d3", "d6", "e4"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 10,
      width: 10,
      terrain: {
        center: ["e5", "e6", "f5", "f6"]
      },
      offset: "knight"
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
