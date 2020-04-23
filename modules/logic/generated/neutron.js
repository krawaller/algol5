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
  knightDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units", "neutralunits", "neutralsoldiers"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units", "neutralunits", "neutralsoldiers"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ]
};
const game = {
  gameId: "neutron",
  commands: { slide: {} },
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
      neutralsoldiers: {}
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
      let ARTIFACTS = {
        neutraltargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = Object.keys(UNITLAYERS.neutralunits)[0];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.neutraltargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      if (TURN === 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      } else {
        for (const pos of Object.keys(ARTIFACTS.neutraltargets)) {
          LINKS.marks[pos] = "selectneutraltarget_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        neutraltargets: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = Object.keys(UNITLAYERS.neutralunits)[0];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.neutraltargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.neutraltargets)) {
        LINKS.marks[pos] = "selectneutraltarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        neutraltargets: step.ARTIFACTS.neutraltargets,
        mytargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_basic_1";
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
    selectmytarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selectmytarget: newMarkPos }
      };
    },
    selectneutraltarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectneutraltarget: newMarkPos }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        neutraltargets: step.ARTIFACTS.neutraltargets,
        mytargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS.mytargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.mytargets)) {
        LINKS.marks[pos] = "selectmytarget_basic_2";
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
    selectmytarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selectmytarget: newMarkPos }
      };
    },
    selectneutraltarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectneutraltarget: newMarkPos }
      };
    },
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit || Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectneutraltarget || MARKS.selectmytarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN1.mybase))
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
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
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
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
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
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
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
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
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
    slide_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (
          UNITLAYERS.units[
            MARKS.selectunit || Object.keys(UNITLAYERS.neutralunits)[0]
          ] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectneutraltarget || MARKS.selectmytarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        neutralunits: {},
        neutralsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!MARKS.selectunit) {
        if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
                .concat(Object.keys(TERRAIN2.mybase))
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
          LINKS.endedBy = "goal";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.mybase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
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
        } else if (
          Object.keys(
            Object.entries(
              Object.keys(UNITLAYERS.neutralsoldiers)
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
          LINKS.endGame = "lose";
          LINKS.endedBy = "suicide";
          LINKS.endMarks = Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.oppbase)
                .concat(Object.keys(UNITLAYERS.neutralsoldiers))
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
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
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
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return 1 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 1] },
              { text: "to slide (first turn of the game you don't the" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[
                        Object.keys(UNITLAYERS.neutralunits)[0]
                      ] || {}
                    ).group
                  ],
                  (
                    UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                    {}
                  ).owner,
                  Object.keys(UNITLAYERS.neutralunits)[0]
                ]
              }
            ]
          });
    },
    slide_basic_1: step => {
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
              { text: "Now select which" },
              { unittype: ["pawn", 1] },
              { text: "to move" }
            ]
          });
    },
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectneutraltarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                  {}
                ).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.neutralunits)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectneutraltarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return 2 === 1 && TURN === 1
        ? collapseContent({
            line: [
              { text: "Select a" },
              { unittype: ["pawn", 2] },
              { text: "to slide (first turn of the game you don't the" },
              { unittype: ["pawn", 0] },
              { text: ")" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[
                        Object.keys(UNITLAYERS.neutralunits)[0]
                      ] || {}
                    ).group
                  ],
                  (
                    UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                    {}
                  ).owner,
                  Object.keys(UNITLAYERS.neutralunits)[0]
                ]
              }
            ]
          });
    },
    slide_basic_2: step => {
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
              { text: "Now select which" },
              { unittype: ["pawn", 2] },
              { text: "to move" }
            ]
          });
    },
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to slide" },
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
    selectmytarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmytarget }
        ]
      });
    },
    selectneutraltarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] ||
                  {}
                ).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.neutralunits)[0]] || {})
                .owner,
              Object.keys(UNITLAYERS.neutralunits)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectneutraltarget }
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
        setup: {},
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "e1"]
            }
          ],
          "2": [
            {
              rect: ["a5", "e5"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "0": ["c3"],
        "1": [
          {
            rect: ["a1", "e1"]
          }
        ],
        "2": [
          {
            rect: ["a5", "e5"]
          }
        ]
      }
    }
  }
};
export default game;
