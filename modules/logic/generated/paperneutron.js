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
const emptyArtifactLayers = { slidetargets: {} };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units", "neutralunits"],
    ["units", "myunits"],
    ["units", "oppunits"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units", "neutralunits"],
    ["units", "oppunits"],
    ["units", "myunits"]
  ]
};
const game = {
  gameId: "paperneutron",
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
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
        neutralunits: oldUnitLayers.neutralunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURNVARS = {};
      let TURN = step.TURN + 1;
      for (const pos of Object.keys(
        TURN === 1 || !!TURNVARS["secondneutron"]
          ? UNITLAYERS.myunits
          : Object.keys(UNITLAYERS.neutralunits)
              .filter(k => k !== TURNVARS["firstneutron"])
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN,
        TURNVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURNVARS = {};
      for (const pos of Object.keys(
        !!TURNVARS["secondneutron"]
          ? UNITLAYERS.myunits
          : Object.keys(UNITLAYERS.neutralunits)
              .filter(k => k !== TURNVARS["firstneutron"])
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
      )) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN,
        TURNVARS
      };
    },
    selectslidetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectslidetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: {}
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
            ARTIFACTS.slidetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.slidetargets)) {
        LINKS.marks[pos] = "selectslidetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    selectslidetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.slide = "slide_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectslidetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        slidetargets: {}
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
            ARTIFACTS.slidetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.slidetargets)) {
        LINKS.marks[pos] = "selectslidetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS
      };
    },
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let TURN = step.TURN;
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectslidetarget
          };
        }
      }
      if (UNITLAYERS.neutralunits[MARKS.selectunit]) {
        if (!!TURNVARS["firstneutron"]) {
          TURNVARS.secondneutron = MARKS.selectslidetarget;
        } else {
          TURNVARS.firstneutron = MARKS.selectslidetarget;
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (UNITLAYERS.myunits[MARKS.selectslidetarget]) {
        {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          TURN === 1 || !!TURNVARS["secondneutron"]
            ? UNITLAYERS.myunits
            : Object.keys(UNITLAYERS.neutralunits)
                .filter(k => k !== TURNVARS["firstneutron"])
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {})
        )) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    },
    slide_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectslidetarget
          };
        }
      }
      if (UNITLAYERS.neutralunits[MARKS.selectunit]) {
        if (!!TURNVARS["firstneutron"]) {
          TURNVARS.secondneutron = MARKS.selectslidetarget;
        } else {
          TURNVARS.firstneutron = MARKS.selectslidetarget;
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, neutralunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (UNITLAYERS.myunits[MARKS.selectslidetarget]) {
        {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          !!TURNVARS["secondneutron"]
            ? UNITLAYERS.myunits
            : Object.keys(UNITLAYERS.neutralunits)
                .filter(k => k !== TURNVARS["firstneutron"])
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {})
        )) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({ line: [{ text: "Go!" }] });
    },
    slide_basic_1: step => {
      return collapseContent({ line: [{ text: "Well done!" }] });
    },
    selectslidetarget_basic_1: step => {
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to go there OMG!" }
        ]
      });
    },
    selectunit_basic_1: step => {
      return collapseContent({ line: [{ text: "Where to?" }] });
    },
    startTurn_basic_2: step => {
      return collapseContent({ line: [{ text: "Go!" }] });
    },
    slide_basic_2: step => {
      return collapseContent({ line: [{ text: "Well done!" }] });
    },
    selectslidetarget_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "slide" },
          { text: "to go there OMG!" }
        ]
      });
    },
    selectunit_basic_2: step => {
      return collapseContent({ line: [{ text: "Where to?" }] });
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
      height: 4,
      width: 4,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "d1"]
            }
          ],
          "2": [
            {
              rect: ["a4", "d4"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "0": ["b3", "c2"],
        "1": [
          {
            rect: ["a1", "d1"]
          }
        ],
        "2": [
          {
            rect: ["a4", "d4"]
          }
        ]
      }
    }
  }
};
export default game;
