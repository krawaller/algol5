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
const iconMapping = { checkers: "pawn" };
const emptyArtifactLayers = {
  movetargets: {},
  initialenemy: {},
  initialfriend: {},
  newenemy: {},
  newfriend: {}
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  checkers: [
    ["units"],
    ["units", "myunits", "mycheckers"],
    ["units", "oppunits", "oppcheckers"]
  ]
};
const groupLayers2 = {
  checkers: [
    ["units"],
    ["units", "oppunits", "oppcheckers"],
    ["units", "myunits", "mycheckers"]
  ]
};
const game = {
  gameId: "jostle",
  commands: { jostle: {} },
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
      mycheckers: {},
      oppcheckers: {}
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
        mycheckers: oldUnitLayers.oppcheckers,
        oppcheckers: oldUnitLayers.mycheckers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
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
        mycheckers: oldUnitLayers.oppcheckers,
        oppcheckers: oldUnitLayers.mycheckers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        initialenemy: {},
        initialfriend: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS[
              !UNITLAYERS.units[POS]
                ? "movetargets"
                : UNITLAYERS.oppunits[POS]
                ? "initialenemy"
                : "initialfriend"
            ][POS] = emptyObj;
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
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        initialenemy: step.ARTIFACTS.initialenemy,
        initialfriend: step.ARTIFACTS.initialfriend,
        newenemy: {},
        newfriend: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectmovetarget];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
              POS
            ] = emptyObj;
          }
        }
      }
      if (
        Object.keys(ARTIFACTS.newfriend).length -
          (1 + Object.keys(ARTIFACTS.newenemy).length) >
        Object.keys(ARTIFACTS.initialfriend).length -
          Object.keys(ARTIFACTS.initialenemy).length
      ) {
        LINKS.commands.jostle = "jostle_basic_1";
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
        initialenemy: {},
        initialfriend: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS[
              !UNITLAYERS.units[POS]
                ? "movetargets"
                : UNITLAYERS.oppunits[POS]
                ? "initialenemy"
                : "initialfriend"
            ][POS] = emptyObj;
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
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        initialenemy: step.ARTIFACTS.initialenemy,
        initialfriend: step.ARTIFACTS.initialfriend,
        newenemy: {},
        newfriend: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectmovetarget];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
              POS
            ] = emptyObj;
          }
        }
      }
      if (
        Object.keys(ARTIFACTS.newfriend).length -
          (1 + Object.keys(ARTIFACTS.newenemy).length) >
        Object.keys(ARTIFACTS.initialfriend).length -
          Object.keys(ARTIFACTS.initialenemy).length
      ) {
        LINKS.commands.jostle = "jostle_basic_2";
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
    jostle_basic_1: step => {
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycheckers: {},
        oppcheckers: {}
      };
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
        UNITLAYERS
      };
    },
    jostle_basic_2: step => {
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mycheckers: {},
        oppcheckers: {}
      };
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
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "which" },
          { unittype: ["pawn", 1] },
          { text: "to jostle" }
        ]
      });
    },
    jostle_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "neighbours" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.initialfriend).length },
              Object.keys(ARTIFACTS.initialfriend).length === 1
                ? { text: "friend" }
                : { text: "friends" }
            ]
          }),
          { text: "and" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.initialenemy).length },
              Object.keys(ARTIFACTS.initialenemy).length === 1
                ? { text: "enemy" }
                : { text: "enemies" }
            ]
          }),
          { text: "making the square worth" },
          {
            text:
              Object.keys(ARTIFACTS.initialfriend).length -
              Object.keys(ARTIFACTS.initialenemy).length
          },
          { text: "." },
          { select: "Select" },
          { text: "a higher value square to jostle to" }
        ]
      });
    },
    selectmovetarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "From" },
          { pos: MARKS.selectmovetarget },
          { text: "you would neighbour" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.newfriend).length - 1 },
              Object.keys(ARTIFACTS.newfriend).length - 1 === 1
                ? { text: "friend" }
                : { text: "friends" }
            ]
          }),
          { text: "and" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.newenemy).length },
              Object.keys(ARTIFACTS.newenemy).length === 1
                ? { text: "enemy" }
                : { text: "enemies" }
            ]
          }),
          { text: "making the square worth" },
          {
            text:
              Object.keys(ARTIFACTS.newfriend).length -
              1 -
              Object.keys(ARTIFACTS.newenemy).length
          },
          { text: ". Press" },
          { command: "jostle" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "which" },
          { unittype: ["pawn", 2] },
          { text: "to jostle" }
        ]
      });
    },
    jostle_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "neighbours" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.initialfriend).length },
              Object.keys(ARTIFACTS.initialfriend).length === 1
                ? { text: "friend" }
                : { text: "friends" }
            ]
          }),
          { text: "and" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.initialenemy).length },
              Object.keys(ARTIFACTS.initialenemy).length === 1
                ? { text: "enemy" }
                : { text: "enemies" }
            ]
          }),
          { text: "making the square worth" },
          {
            text:
              Object.keys(ARTIFACTS.initialfriend).length -
              Object.keys(ARTIFACTS.initialenemy).length
          },
          { text: "." },
          { select: "Select" },
          { text: "a higher value square to jostle to" }
        ]
      });
    },
    selectmovetarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "From" },
          { pos: MARKS.selectmovetarget },
          { text: "you would neighbour" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.newfriend).length - 1 },
              Object.keys(ARTIFACTS.newfriend).length - 1 === 1
                ? { text: "friend" }
                : { text: "friends" }
            ]
          }),
          { text: "and" },
          collapseContent({
            line: [
              { text: Object.keys(ARTIFACTS.newenemy).length },
              Object.keys(ARTIFACTS.newenemy).length === 1
                ? { text: "enemy" }
                : { text: "enemies" }
            ]
          }),
          { text: "making the square worth" },
          {
            text:
              Object.keys(ARTIFACTS.newfriend).length -
              1 -
              Object.keys(ARTIFACTS.newenemy).length
          },
          { text: ". Press" },
          { command: "jostle" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    }
  }
};
export default game;
