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
import boards from "../../games/definitions/canthesardines/boards";
import setups from "../../games/definitions/canthesardines/setups";
import variants from "../../games/definitions/canthesardines/variants";
const emptyObj = {};
const iconMapping = { sardines: "queen" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  sardines: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  sardines: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {} };
const game = {
  gameId: "canthesardines",
  commands: { move: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !TERRAIN1.can.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
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
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !TERRAIN2.can.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
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
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
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
        },
        canAlwaysEnd: true
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
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
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
        },
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.keys(TERRAIN1.canedge)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        ).length === 0
      ) {
        LINKS.endGame = ["draw", "win", "lose"][
          whoWins(
            Object.keys(
              Object.entries(
                Object.keys(TERRAIN1.can)
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
            ).length,
            Object.keys(
              Object.entries(
                Object.keys(TERRAIN1.can)
                  .concat(Object.keys(UNITLAYERS.oppunits))
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
          )
        ];
        LINKS.endedBy = "closedcan";
        LINKS.endMarks = Object.keys(
          [
            emptyObj,
            Object.entries(
              Object.keys(TERRAIN1.can)
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
              }, {}),
            Object.entries(
              Object.keys(TERRAIN1.can)
                .concat(Object.keys(UNITLAYERS.oppunits))
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
          ][
            whoWins(
              Object.keys(
                Object.entries(
                  Object.keys(TERRAIN1.can)
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
              ).length,
              Object.keys(
                Object.entries(
                  Object.keys(TERRAIN1.can)
                    .concat(Object.keys(UNITLAYERS.oppunits))
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
            )
          ]
        );
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.keys(TERRAIN2.canedge)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        ).length === 0
      ) {
        LINKS.endGame = ["draw", "lose", "win"][
          whoWins(
            Object.keys(
              Object.entries(
                Object.keys(TERRAIN2.can)
                  .concat(Object.keys(UNITLAYERS.oppunits))
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
            ).length,
            Object.keys(
              Object.entries(
                Object.keys(TERRAIN2.can)
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
          )
        ];
        LINKS.endedBy = "closedcan";
        LINKS.endMarks = Object.keys(
          [
            emptyObj,
            Object.entries(
              Object.keys(TERRAIN2.can)
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
              }, {}),
            Object.entries(
              Object.keys(TERRAIN2.can)
                .concat(Object.keys(UNITLAYERS.oppunits))
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
          ][
            whoWins(
              Object.keys(
                Object.entries(
                  Object.keys(TERRAIN2.can)
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
              ).length,
              Object.keys(
                Object.entries(
                  Object.keys(TERRAIN2.can)
                    .concat(Object.keys(UNITLAYERS.oppunits))
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
            )
          ]
        );
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
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
          { text: "Select a non-canned" },
          { unittype: ["queen", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
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
          TERRAIN1.can[MARKS.selectmovetarget]
            ? { text: "into the can at" }
            : { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Select a non-canned" },
          { unittype: ["queen", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
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
          TERRAIN2.can[MARKS.selectmovetarget]
            ? { text: "into the can at" }
            : { text: "to" },
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
