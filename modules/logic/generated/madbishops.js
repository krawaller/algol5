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
  ringTwoDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { bishops: "bishop" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  bishops: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  bishops: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const emptyArtifactLayers_basic = {
  movetargets: {},
  killtargets: {},
  threatened: {}
};
const game = {
  gameId: "madbishops",
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
        oppunits: oldUnitLayers.myunits
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
        movetargets: {},
        killtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of diagDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.killtargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.killtargets).length === 0
          ? ARTIFACTS.movetargets
          : ARTIFACTS.killtargets
      )) {
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
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        killtargets: step.ARTIFACTS.killtargets,
        threatened: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of diagDirs) {
          let POS = MARKS.selectmovetarget;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.threatened[POS] = emptyObj;
            }
          }
        }
      }
      if (
        ARTIFACTS.killtargets[MARKS.selectmovetarget] ||
        Object.keys(ARTIFACTS.threatened).length !== 0
      ) {
        LINKS.commands.move = "move_basic_1";
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
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        killtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of diagDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.killtargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.killtargets).length === 0
          ? ARTIFACTS.movetargets
          : ARTIFACTS.killtargets
      )) {
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
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        killtargets: step.ARTIFACTS.killtargets,
        threatened: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of diagDirs) {
          let POS = MARKS.selectmovetarget;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.threatened[POS] = emptyObj;
            }
          }
        }
      }
      if (
        ARTIFACTS.killtargets[MARKS.selectmovetarget] ||
        Object.keys(ARTIFACTS.threatened).length !== 0
      ) {
        LINKS.commands.move = "move_basic_2";
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        canAlwaysEnd: true
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        canAlwaysEnd: true
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["bishop", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(ARTIFACTS.killtargets).length !== 0
        ? collapseContent({
            line: [
              { text: "Since" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "can reach" },
              { unittype: ["bishop", 2] },
              { text: "you must" },
              { select: "select" },
              { text: "one to kill!" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "should move to threaten a" },
              { unittype: ["bishop", 2] }
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
          { text: "to" },
          UNITLAYERS.oppunits[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to kill" },
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
                line: [
                  { text: "move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to" },
                  { pos: MARKS.selectmovetarget }
                ]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["bishop", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(ARTIFACTS.killtargets).length !== 0
        ? collapseContent({
            line: [
              { text: "Since" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "can reach" },
              { unittype: ["bishop", 1] },
              { text: "you must" },
              { select: "select" },
              { text: "one to kill!" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "should move to threaten a" },
              { unittype: ["bishop", 1] }
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
          { text: "to" },
          UNITLAYERS.oppunits[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to kill" },
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
                line: [
                  { text: "move" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "to" },
                  { pos: MARKS.selectmovetarget }
                ]
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
      height: 10,
      width: 10,
      terrain: {}
    }
  },
  setups: {
    basic: {
      bishops: {
        "1": [
          "a1",
          "a5",
          "a9",
          "b2",
          "b6",
          "c3",
          "c7",
          "c9",
          "d4",
          "d10",
          "e1",
          "e5",
          "e7",
          "f2",
          "f8",
          "g3",
          "g5",
          "g9",
          "h6",
          "h10",
          "i1",
          "i3",
          "i7",
          "j4",
          "j8"
        ],
        "2": [
          "a3",
          "a7",
          "b4",
          "b8",
          "b10",
          "c1",
          "c5",
          "d2",
          "d6",
          "d8",
          "e3",
          "e9",
          "f4",
          "f6",
          "f10",
          "g1",
          "g7",
          "h2",
          "h4",
          "h8",
          "i5",
          "i9",
          "j2",
          "j6",
          "j10"
        ]
      }
    }
  }
};
export default game;
