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
const iconMapping = {};
const emptyArtifactLayers = {};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {};
const groupLayers2 = {};
const game = {
  gameId: "paperneutron",
  commands: {},
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
        ARTIFACTS: emptyArtifactLayers,
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
        ARTIFACTS: emptyArtifactLayers,
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
      terrain: {}
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
