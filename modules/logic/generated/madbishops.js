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
import boards from "../../games/definitions/madbishops/boards";
import setups from "../../games/definitions/madbishops/setups";
import variants from "../../games/definitions/madbishops/variants";
const emptyObj = {};
const iconMapping = { bishops: "bishop" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  bishops: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  bishops: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
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
  variants,
  boards,
  setups
};
export default game;
