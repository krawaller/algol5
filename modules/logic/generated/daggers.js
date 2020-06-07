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
const iconMapping = { daggers: "bishop", crowns: "king" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  daggers: [
    ["units", "daggers"],
    ["units", "myunits", "daggers", "mydaggers"],
    ["units", "oppunits", "daggers", "oppdaggers"]
  ],
  crowns: [
    ["units"],
    ["units", "myunits", "mycrowns"],
    ["units", "oppunits", "oppcrowns"]
  ]
};
const groupLayers2 = {
  daggers: [
    ["units", "daggers"],
    ["units", "oppunits", "daggers", "oppdaggers"],
    ["units", "myunits", "daggers", "mydaggers"]
  ],
  crowns: [
    ["units"],
    ["units", "oppunits", "oppcrowns"],
    ["units", "myunits", "mycrowns"]
  ]
};
const emptyArtifactLayers_basic = { movetarget: {} };
const game = {
  gameId: "daggers",
  commands: { move: {} },
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
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      mycrowns: {},
      oppcrowns: {}
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
        daggers: oldUnitLayers.daggers,
        mydaggers: oldUnitLayers.oppdaggers,
        oppdaggers: oldUnitLayers.mydaggers,
        mycrowns: oldUnitLayers.oppcrowns,
        oppcrowns: oldUnitLayers.mycrowns
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
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
        daggers: oldUnitLayers.daggers,
        mydaggers: oldUnitLayers.oppdaggers,
        oppdaggers: oldUnitLayers.mydaggers,
        mycrowns: oldUnitLayers.oppcrowns,
        oppcrowns: oldUnitLayers.mycrowns
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
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
        movetarget: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS) {
              if (!UNITLAYERS.myunits[POS]) {
                ARTIFACTS.movetarget[POS] = emptyObj;
              }
            }
          }
        }
      } else {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of [8, 1, 2, 4, 5, 6]) {
            let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
            let POS = MARKS.selectunit;
            let LENGTH = 0;
            while (
              LENGTH < MAX &&
              (POS = connections[POS][DIR]) &&
              !BLOCKS[POS]
            ) {
              LENGTH++;
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (
                !UNITLAYERS.myunits[POS] &&
                !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
              ) {
                ARTIFACTS.movetarget[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetarget)) {
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
        movetarget: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS) {
              if (!UNITLAYERS.myunits[POS]) {
                ARTIFACTS.movetarget[POS] = emptyObj;
              }
            }
          }
        }
      } else {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of [8, 1, 2, 4, 5, 6]) {
            let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
            let POS = MARKS.selectunit;
            let LENGTH = 0;
            while (
              LENGTH < MAX &&
              (POS = connections[POS][DIR]) &&
              !BLOCKS[POS]
            ) {
              LENGTH++;
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (
                !UNITLAYERS.myunits[POS] &&
                !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
              ) {
                ARTIFACTS.movetarget[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetarget)) {
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        daggers: {},
        mydaggers: {},
        oppdaggers: {},
        mycrowns: {},
        oppcrowns: {}
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
            Object.keys(UNITLAYERS.mycrowns)
              .concat(Object.keys(TERRAIN1.oppbase))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mycrowns)
              .concat(Object.keys(TERRAIN1.oppbase))
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
        );
      } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        daggers: {},
        mydaggers: {},
        oppdaggers: {},
        mycrowns: {},
        oppcrowns: {}
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
            Object.keys(UNITLAYERS.mycrowns)
              .concat(Object.keys(TERRAIN2.oppbase))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mycrowns)
              .concat(Object.keys(TERRAIN2.oppbase))
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
        );
      } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
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
          { select: "Select" },
          { text: "a" },
          { unittype: ["bishop", 1] },
          { text: "or" },
          { unittype: ["king", 1] },
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
          { select: "Select" },
          UNITLAYERS.mycrowns[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "an empty neighbour to move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to" }
                ]
              })
            : collapseContent({
                line: [
                  { text: "where to slide" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  }
                ]
              })
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          UNITLAYERS.mycrowns[MARKS.selectunit]
            ? { text: "go" }
            : collapseContent({
                line: [
                  { text: "slide" },
                  BOARD.board[MARKS.selectmovetarget].y >
                  BOARD.board[MARKS.selectunit].y
                    ? { text: "uphill" }
                    : BOARD.board[MARKS.selectunit].y >
                      BOARD.board[MARKS.selectmovetarget].y
                    ? { text: "downhill" }
                    : undefined
                ]
              }),
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and kill" },
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
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a" },
          { unittype: ["bishop", 2] },
          { text: "or" },
          { unittype: ["king", 2] },
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
          { select: "Select" },
          UNITLAYERS.mycrowns[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "an empty neighbour to move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to" }
                ]
              })
            : collapseContent({
                line: [
                  { text: "where to slide" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  }
                ]
              })
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
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          UNITLAYERS.mycrowns[MARKS.selectunit]
            ? { text: "go" }
            : collapseContent({
                line: [
                  { text: "slide" },
                  BOARD.board[MARKS.selectmovetarget].y >
                  BOARD.board[MARKS.selectunit].y
                    ? { text: "uphill" }
                    : BOARD.board[MARKS.selectunit].y >
                      BOARD.board[MARKS.selectmovetarget].y
                    ? { text: "downhill" }
                    : undefined
                ]
              }),
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and kill" },
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
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
              })
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
      code: "a",
      arr: {
        marks: ["c6"],
        potentialMarks: ["a4", "c4", "e4", "b5", "c5", "d5", "b7", "c7"],
        setup: {
          crowns: {
            "1": ["b6", "d8"],
            "2": ["f1", "c2"]
          },
          daggers: {
            "1": ["c6", "e6", "d7", "f7"],
            "2": ["d2", "f2", "g2", "b3", "c3", "f3", "b4", "e4"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 8,
      width: 8,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a8", "h8"]
            }
          ],
          "2": [
            {
              rect: ["a1", "h1"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      crowns: {
        "1": ["d8", "e8"],
        "2": ["c1", "f1"]
      },
      daggers: {
        "1": [
          {
            rect: ["c7", "f7"]
          }
        ],
        "2": [
          "c3",
          "f3",
          {
            rect: ["b2", "g2"]
          }
        ]
      }
    }
  }
};
export default game;
