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
const iconMapping = { soldiers: "pawn", kings: "king" };
const emptyArtifactLayers = {
  mytrappedkings: {},
  enemytrappedkings: {},
  movetargets: {}
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units"],
    ["units", "myunits", "mysoldiers"],
    ["units", "oppunits", "oppsoldiers"]
  ],
  kings: [
    ["units", "kings"],
    ["units", "myunits", "kings", "mykings"],
    ["units", "oppunits", "kings", "oppkings"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units"],
    ["units", "oppunits", "oppsoldiers"],
    ["units", "myunits", "mysoldiers"]
  ],
  kings: [
    ["units", "kings"],
    ["units", "oppunits", "kings", "oppkings"],
    ["units", "myunits", "kings", "mykings"]
  ]
};
const game = {
  gameId: "kingsvalley",
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
      mysoldiers: {},
      oppsoldiers: {},
      kings: {},
      mykings: {},
      oppkings: {}
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
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      for (const pos of Object.keys(
        TURN === 1 ? UNITLAYERS.mysoldiers : UNITLAYERS.myunits
      )) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        kings: oldUnitLayers.kings,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      for (const pos of Object.keys(
        TURN === 1 ? UNITLAYERS.mysoldiers : UNITLAYERS.myunits
      )) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selectunit;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            POS = walkedsquares[WALKLENGTH - 1];
            if (!(TERRAIN1.goal[POS] && UNITLAYERS.mysoldiers[STARTPOS])) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
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
          selectmovetarget: newMarkPos
        }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selectunit;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            POS = walkedsquares[WALKLENGTH - 1];
            if (!(TERRAIN2.goal[POS] && UNITLAYERS.mysoldiers[STARTPOS])) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
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
          selectmovetarget: newMarkPos
        }
      };
    },
    slide_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        mytrappedkings: {},
        enemytrappedkings: {}
      };
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
        mysoldiers: {},
        oppsoldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
          }
        }
        if (TOTALCOUNT === 0) {
          ARTIFACTS[
            UNITLAYERS.mykings[STARTPOS]
              ? "mytrappedkings"
              : "enemytrappedkings"
          ][STARTPOS] = emptyObj;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.goal))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "kinghome";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN1.goal))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    slide_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        mytrappedkings: {},
        enemytrappedkings: {}
      };
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
        mysoldiers: {},
        oppsoldiers: {},
        kings: {},
        mykings: {},
        oppkings: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      for (let STARTPOS in UNITLAYERS.kings) {
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
          }
        }
        if (TOTALCOUNT === 0) {
          ARTIFACTS[
            UNITLAYERS.mykings[STARTPOS]
              ? "mytrappedkings"
              : "enemytrappedkings"
          ][STARTPOS] = emptyObj;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.goal))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "kinghome";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.mykings)
              .concat(Object.keys(TERRAIN2.goal))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let TURN = step.TURN;
      return TURN === 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["pawn", 1] },
              { text: "to slide (you can't slide" },
              { unittype: ["king", 1] },
              { text: "in the first turn)" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["pawn", 1] },
              { text: "or" },
              { unittype: ["king", 1] },
              { text: "to slide" }
            ]
          });
    },
    slide_basic_1: () => defaultInstruction(1),
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
    selectmovetarget_basic_1: step => {
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
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let TURN = step.TURN;
      return TURN === 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["pawn", 2] },
              { text: "to slide (you can't slide" },
              { unittype: ["king", 2] },
              { text: "in the first turn)" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["pawn", 2] },
              { text: "or" },
              { unittype: ["king", 2] },
              { text: "to slide" }
            ]
          });
    },
    slide_basic_2: () => defaultInstruction(2),
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
    selectmovetarget_basic_2: step => {
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
          { pos: MARKS.selectmovetarget }
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
      code: "r"
    },
    {
      ruleset: "basic",
      board: "basic",
      setup: "retrieve",
      desc: "retrieve",
      code: "e"
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {
        goal: ["c3"]
      }
    }
  },
  setups: {
    basic: {
      kings: {
        "1": ["c1"],
        "2": ["c5"]
      },
      soldiers: {
        "1": ["a1", "b1", "d1", "e1"],
        "2": ["a5", "b5", "d5", "e5"]
      }
    },
    retrieve: {
      kings: {
        "1": ["c5"],
        "2": ["c1"]
      },
      soldiers: {
        "1": ["a1", "b1", "d1", "e1"],
        "2": ["a5", "b5", "d5", "e5"]
      }
    }
  }
};
export default game;
