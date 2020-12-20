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
import boards from "../../games/definitions/catsanddogs/boards";
import setups from "../../games/definitions/catsanddogs/setups";
import variants from "../../games/definitions/catsanddogs/variants";
const emptyObj = {};
const iconMapping = { animals: "queen" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  animals: [
    ["units", "animals"],
    ["units", "animals", "myanimals"],
    ["units", "animals", "oppanimals"]
  ]
};
const groupLayers2 = {
  animals: [
    ["units", "animals"],
    ["units", "animals", "oppanimals"],
    ["units", "animals", "myanimals"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "catsanddogs",
  commands: { deploy: {} },
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
    let UNITLAYERS = { units: {}, animals: {}, myanimals: {}, oppanimals: {} };
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
        forbidden: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        animals: oldUnitLayers.animals,
        myanimals: oldUnitLayers.oppanimals,
        oppanimals: oldUnitLayers.myanimals
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (let STARTPOS in UNITLAYERS.oppanimals) {
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.forbidden[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(
            k =>
              !UNITLAYERS.units.hasOwnProperty(k) &&
              !ARTIFACTS.forbidden.hasOwnProperty(k)
          )
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdeploytarget_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        forbidden: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        animals: oldUnitLayers.animals,
        myanimals: oldUnitLayers.oppanimals,
        oppanimals: oldUnitLayers.myanimals
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (let STARTPOS in UNITLAYERS.oppanimals) {
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.forbidden[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(
            k =>
              !UNITLAYERS.units.hasOwnProperty(k) &&
              !ARTIFACTS.forbidden.hasOwnProperty(k)
          )
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      )) {
        LINKS.marks[pos] = "selectdeploytarget_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
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
        NEXTSPAWNID: step.NEXTSPAWNID
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
        NEXTSPAWNID: step.NEXTSPAWNID
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
          group: "animals",
          owner: 1
        };
      }
      UNITLAYERS = { units: {}, animals: {}, myanimals: {}, oppanimals: {} };
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
          group: "animals",
          owner: 2
        };
      }
      UNITLAYERS = { units: {}, animals: {}, myanimals: {}, oppanimals: {} };
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
        NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [{ text: "Go you noob, haha just kidding, but go!" }]
      });
    },
    deploy_basic_1: () => defaultInstruction(1),
    selectdeploytarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["queen", 1, MARKS.selectdeploytarget] }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [{ text: "Go you noob, haha just kidding, but go!" }]
      });
    },
    deploy_basic_2: () => defaultInstruction(2),
    selectdeploytarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to spawn" },
          { unit: ["queen", 2, MARKS.selectdeploytarget] }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
