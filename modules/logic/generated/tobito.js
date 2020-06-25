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
const iconMapping = { runners: "pawn", finishers: "rook" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  runners: [
    ["units", "neutralunits", "runners", "neutralrunners"],
    ["units", "myunits", "runners", "myrunners"],
    ["units", "oppunits", "runners", "opprunners"]
  ],
  finishers: [
    ["units", "neutralunits"],
    ["units", "myunits", "myfinishers"],
    ["units", "oppunits", "oppfinishers"]
  ]
};
const groupLayers2 = {
  runners: [
    ["units", "neutralunits", "runners", "neutralrunners"],
    ["units", "oppunits", "runners", "opprunners"],
    ["units", "myunits", "runners", "myrunners"]
  ],
  finishers: [
    ["units", "neutralunits"],
    ["units", "oppunits", "oppfinishers"],
    ["units", "myunits", "myfinishers"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {}, relocatees: {} };
const game = {
  gameId: "tobito",
  commands: { move: {}, relocate: {} },
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
      neutralunits: {},
      runners: {},
      myrunners: {},
      opprunners: {},
      neutralrunners: {},
      myfinishers: {},
      oppfinishers: {}
    };
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
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        runners: oldUnitLayers.runners,
        myrunners: oldUnitLayers.opprunners,
        opprunners: oldUnitLayers.myrunners,
        neutralrunners: oldUnitLayers.neutralrunners,
        myfinishers: oldUnitLayers.oppfinishers,
        oppfinishers: oldUnitLayers.myfinishers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myrunners)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        runners: oldUnitLayers.runners,
        myrunners: oldUnitLayers.opprunners,
        opprunners: oldUnitLayers.myrunners,
        neutralrunners: oldUnitLayers.neutralrunners,
        myfinishers: oldUnitLayers.oppfinishers,
        oppfinishers: oldUnitLayers.myfinishers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myrunners)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
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
          ...UNITLAYERS.oppfinishers,
          ...Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        };
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
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
        MARKS
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
        }
      };
    },
    selectrelocatee_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: step.ARTIFACTS.relocatees
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectrelocatee: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (const pos of Object.keys(
        UNITLAYERS.neutralrunners[MARKS.selectrelocatee]
          ? Object.keys(BOARD.board)
              .filter(
                k =>
                  !UNITLAYERS.units.hasOwnProperty(k) &&
                  !ARTIFACTS.relocatees.hasOwnProperty(k) &&
                  !TERRAIN1.base.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !UNITLAYERS.units.hasOwnProperty(k) &&
                  !ARTIFACTS.relocatees.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectrelocationtarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectrelocationtarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.relocate = "relocate_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectrelocatee: step.MARKS.selectrelocatee,
          selectrelocationtarget: newMarkPos
        }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
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
          ...UNITLAYERS.oppfinishers,
          ...Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        };
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
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
        MARKS
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
        }
      };
    },
    selectrelocatee_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: step.ARTIFACTS.relocatees
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectrelocatee: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (const pos of Object.keys(
        UNITLAYERS.neutralrunners[MARKS.selectrelocatee]
          ? Object.keys(BOARD.board)
              .filter(
                k =>
                  !UNITLAYERS.units.hasOwnProperty(k) &&
                  !ARTIFACTS.relocatees.hasOwnProperty(k) &&
                  !TERRAIN2.base.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !UNITLAYERS.units.hasOwnProperty(k) &&
                  !ARTIFACTS.relocatees.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectrelocationtarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectrelocationtarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.relocate = "relocate_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectrelocatee: step.MARKS.selectrelocatee,
          selectrelocationtarget: newMarkPos
        }
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN1.oppbase[MARKS.selectmovetarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "finishers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        runners: {},
        myrunners: {},
        opprunners: {},
        neutralrunners: {},
        myfinishers: {},
        oppfinishers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.units;
        let POS = MARKS.selectmovetarget;
        while (
          (POS =
            connections[POS][
              relativeDirs[
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ][5]
            ]) &&
          allowedsteps[POS]
        ) {
          if (!UNITLAYERS.myrunners[POS] && UNITLAYERS.runners[POS]) {
            ARTIFACTS.relocatees[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.relocatees).length === 0) {
        if (
          Object.keys(TERRAIN1.mybase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.mybase)
                .concat(Object.keys(UNITLAYERS.units))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "fullbase";
          LINKS.endMarks = Object.keys(TERRAIN1.mybase);
        } else if (
          Object.keys(TERRAIN1.oppbase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.oppbase)
                .concat(Object.keys(UNITLAYERS.myunits))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "invasion";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        )) {
          LINKS.marks[pos] = "selectrelocatee_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    relocate_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: step.ARTIFACTS.relocatees
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN1.mybase[MARKS.selectrelocationtarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectrelocatee] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "finishers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectrelocatee] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectrelocationtarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        runners: {},
        myrunners: {},
        opprunners: {},
        neutralrunners: {},
        myfinishers: {},
        oppfinishers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        ).length === 0
      ) {
        if (
          Object.keys(TERRAIN1.mybase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.mybase)
                .concat(Object.keys(UNITLAYERS.units))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "fullbase";
          LINKS.endMarks = Object.keys(TERRAIN1.mybase);
        } else if (
          Object.keys(TERRAIN1.oppbase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.oppbase)
                .concat(Object.keys(UNITLAYERS.myunits))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "invasion";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        )) {
          LINKS.marks[pos] = "selectrelocatee_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN2.oppbase[MARKS.selectmovetarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "finishers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        runners: {},
        myrunners: {},
        opprunners: {},
        neutralrunners: {},
        myfinishers: {},
        oppfinishers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.units;
        let POS = MARKS.selectmovetarget;
        while (
          (POS =
            connections[POS][
              relativeDirs[
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ][5]
            ]) &&
          allowedsteps[POS]
        ) {
          if (!UNITLAYERS.myrunners[POS] && UNITLAYERS.runners[POS]) {
            ARTIFACTS.relocatees[POS] = emptyObj;
          }
        }
      }
      if (Object.keys(ARTIFACTS.relocatees).length === 0) {
        if (
          Object.keys(TERRAIN2.mybase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.mybase)
                .concat(Object.keys(UNITLAYERS.units))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "fullbase";
          LINKS.endMarks = Object.keys(TERRAIN2.mybase);
        } else if (
          Object.keys(TERRAIN2.oppbase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.oppbase)
                .concat(Object.keys(UNITLAYERS.myunits))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "invasion";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        )) {
          LINKS.marks[pos] = "selectrelocatee_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    relocate_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        relocatees: step.ARTIFACTS.relocatees
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (TERRAIN2.mybase[MARKS.selectrelocationtarget]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectrelocatee] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "finishers"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectrelocatee] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectrelocationtarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        runners: {},
        myrunners: {},
        opprunners: {},
        neutralrunners: {},
        myfinishers: {},
        oppfinishers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        ).length === 0
      ) {
        if (
          Object.keys(TERRAIN2.mybase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.mybase)
                .concat(Object.keys(UNITLAYERS.units))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "lose";
          LINKS.endedBy = "fullbase";
          LINKS.endMarks = Object.keys(TERRAIN2.mybase);
        } else if (
          Object.keys(TERRAIN2.oppbase).length ===
          Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.oppbase)
                .concat(Object.keys(UNITLAYERS.myunits))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          ).length
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "invasion";
          LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          Object.entries(
            Object.keys(ARTIFACTS.relocatees)
              .concat(
                Object.keys(
                  Object.keys(UNITLAYERS.runners)
                    .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
                    .reduce((m, k) => {
                      m[k] = emptyObj;
                      return m;
                    }, {})
                )
              )
              .reduce((mem, k) => {
                mem[k] = (mem[k] || 0) + 1;
                return mem;
              }, {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => {
              mem[key] = emptyObj;
              return mem;
            }, {})
        )) {
          LINKS.marks[pos] = "selectrelocatee_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select a jumped" },
              {
                unittype: [
                  "pawn",
                  Object.keys(UNITLAYERS.neutralunits).length === 0 ? 2 : "02"
                ]
              },
              { text: "to relocate" }
            ]
          });
    },
    relocate_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select another jumped" },
              {
                unittype: [
                  "pawn",
                  Object.keys(UNITLAYERS.neutralunits).length === 0 ? 2 : "02"
                ]
              },
              { text: "to relocate" }
            ]
          });
    },
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
          { pos: MARKS.selectmovetarget },
          TERRAIN1.oppbase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: ", reaching the goal and turning it into" },
                  { unittype: ["rook", 1] }
                ]
              })
            : undefined
        ]
      });
    },
    selectrelocatee_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select an empty square to relocate" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectrelocatee] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectrelocatee] || {}).owner,
              MARKS.selectrelocatee
            ]
          },
          { text: "to" },
          UNITLAYERS.neutralrunners[MARKS.selectrelocatee]
            ? collapseContent({
                line: [
                  { text: "(except you can't place the neutral" },
                  { unittype: ["pawn", 0] },
                  { text: "in either home row)" }
                ]
              })
            : undefined
        ]
      });
    },
    selectrelocationtarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "relocate" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectrelocatee] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectrelocatee] || {}).owner,
              MARKS.selectrelocatee
            ]
          },
          { text: "to" },
          { pos: MARKS.selectrelocationtarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select a jumped" },
              {
                unittype: [
                  "pawn",
                  Object.keys(UNITLAYERS.neutralunits).length === 0 ? 1 : "01"
                ]
              },
              { text: "to relocate" }
            ]
          });
    },
    relocate_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return LINKS.endTurn || LINKS.endGame
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select another jumped" },
              {
                unittype: [
                  "pawn",
                  Object.keys(UNITLAYERS.neutralunits).length === 0 ? 1 : "01"
                ]
              },
              { text: "to relocate" }
            ]
          });
    },
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
          { pos: MARKS.selectmovetarget },
          TERRAIN2.oppbase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: ", reaching the goal and turning it into" },
                  { unittype: ["rook", 2] }
                ]
              })
            : undefined
        ]
      });
    },
    selectrelocatee_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select an empty square to relocate" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectrelocatee] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectrelocatee] || {}).owner,
              MARKS.selectrelocatee
            ]
          },
          { text: "to" },
          UNITLAYERS.neutralrunners[MARKS.selectrelocatee]
            ? collapseContent({
                line: [
                  { text: "(except you can't place the neutral" },
                  { unittype: ["pawn", 0] },
                  { text: "in either home row)" }
                ]
              })
            : undefined
        ]
      });
    },
    selectrelocationtarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "relocate" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectrelocatee] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectrelocatee] || {}).owner,
              MARKS.selectrelocatee
            ]
          },
          { text: "to" },
          { pos: MARKS.selectrelocationtarget }
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
          runners: {
            "1": ["a1", "c3", "d1"],
            "2": ["d3", "e2"]
          },
          finishers: {
            "2": ["a3"]
          }
        },
        marks: ["c3"],
        potentialMarks: ["b2", "b3", "c2", "d2", "e3"]
      }
    },
    {
      ruleset: "basic",
      board: "basic",
      setup: "neutral",
      desc: "with neutral unit",
      code: "N"
    }
  ],
  boards: {
    basic: {
      height: 3,
      width: 5,
      terrain: {
        base: {
          "1": ["a1", "a2", "a3"],
          "2": ["e1", "e2", "e3"]
        }
      }
    }
  },
  setups: {
    basic: {
      runners: {
        "1": ["a1", "a2", "a3"],
        "2": ["e1", "e2", "e3"]
      }
    },
    neutral: {
      runners: {
        "0": ["c2"],
        "1": ["a1", "a2", "a3"],
        "2": ["e1", "e2", "e3"]
      }
    }
  }
};
export default game;
