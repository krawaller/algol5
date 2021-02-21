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
const emptyArtifactLayers_basic = { forbidden: {} };
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
      let TURN = step.TURN + 1;
      for (const pos of Object.keys(
        TURN === 1
          ? Object.keys(BOARD.board)
              .filter(
                k =>
                  !UNITLAYERS.units.hasOwnProperty(k) &&
                  !TERRAIN1.center.hasOwnProperty(k)
              )
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          : Object.keys(BOARD.board)
              .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
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
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
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
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdeploytarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        forbidden: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdeploytarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectdeploytarget;
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppanimals[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.forbidden[STARTPOS] = emptyObj;
        }
      }
      if (!ARTIFACTS.forbidden[MARKS.selectdeploytarget]) {
        LINKS.commands.deploy = "deploy_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdeploytarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        forbidden: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdeploytarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectdeploytarget;
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppanimals[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.forbidden[STARTPOS] = emptyObj;
        }
      }
      if (!ARTIFACTS.forbidden[MARKS.selectdeploytarget]) {
        LINKS.commands.deploy = "deploy_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
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
        NEXTSPAWNID,
        canAlwaysEnd: true
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
        NEXTSPAWNID,
        canAlwaysEnd: true
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let TURN = step.TURN;
      return collapseContent({
        line: [
          { text: "Select where to deploy" },
          { unittype: ["queen", 1] },
          TURN === 1
            ? collapseContent({
                line: [
                  { text: "(but you can't deploy to" },
                  { pos: Object.keys(TERRAIN1.center)[0] },
                  { text: "on the 1st turn)" }
                ]
              })
            : undefined
        ]
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
        line: [{ text: "Select where to deploy" }, { unittype: ["queen", 2] }]
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
