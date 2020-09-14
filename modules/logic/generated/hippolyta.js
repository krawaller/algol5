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
import boards from "../../games/definitions/hippolyta/boards";
import setups from "../../games/definitions/hippolyta/setups";
import variants from "../../games/definitions/hippolyta/variants";
const emptyObj = {};
const iconMapping = { amazons: "queen", projectile: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  amazons: [["units"], ["units", "myunits"], ["units", "oppunits"]],
  projectile: [
    ["units", "projectile"],
    ["units", "myunits", "projectile"],
    ["units", "oppunits", "projectile"]
  ]
};
const groupLayers2 = {
  amazons: [["units"], ["units", "oppunits"], ["units", "myunits"]],
  projectile: [
    ["units", "projectile"],
    ["units", "oppunits", "projectile"],
    ["units", "myunits", "projectile"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { targets: {} };
const game = {
  gameId: "hippolyta",
  commands: { fire: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, projectile: {} };
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
        projectile: oldUnitLayers.projectile
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
        projectile: oldUnitLayers.projectile
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
        targets: {}
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
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.targets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.targets)) {
        LINKS.marks[pos] = "selecttarget_basic_1";
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
    selecttarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.fire = "fire_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selecttarget: newMarkPos },
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        targets: {}
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
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS.targets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.targets)) {
        LINKS.marks[pos] = "selecttarget_basic_2";
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
    selecttarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.fire = "fire_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selecttarget: newMarkPos },
        canAlwaysEnd: true
      };
    },
    fire_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 0]);
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, projectile: {} };
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
        anim
      };
    },
    fire_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 0]);
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, projectile: {} };
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
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [{ text: "Select a" }, { unittype: ["queen", 1] }]
      });
    },
    fire_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["queen", 2] },
          { text: "to fire at" }
        ]
      });
    },
    selecttarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "shoot" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttarget] || {}).group],
              (UNITLAYERS.units[MARKS.selecttarget] || {}).owner,
              MARKS.selecttarget
            ]
          }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [{ text: "Select a" }, { unittype: ["queen", 2] }]
      });
    },
    fire_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["queen", 1] },
          { text: "to fire at" }
        ]
      });
    },
    selecttarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "shoot" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttarget] || {}).group],
              (UNITLAYERS.units[MARKS.selecttarget] || {}).owner,
              MARKS.selecttarget
            ]
          }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
