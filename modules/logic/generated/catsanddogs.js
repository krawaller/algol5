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
const iconMapping = {};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {};
const groupLayers2 = {};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {};
const game = {
  gameId: "catsanddogs",
  commands: {},
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
    let UNITLAYERS = { units: {} };
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
      let LINKS = {
        marks: {},
        commands: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS: {
          units: oldUnitLayers.units
        },
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1
      };
    },
    startTurn_basic_2: step => {
      let LINKS = {
        marks: {},
        commands: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS: {
          units: oldUnitLayers.units
        },
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({ line: [{ text: "Go!" }] });
    },
    startTurn_basic_2: step => {
      return collapseContent({ line: [{ text: "Go!" }] });
    }
  },
  variants,
  boards,
  setups
};
export default game;
