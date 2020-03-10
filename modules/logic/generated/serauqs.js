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
const iconMapping = { soldiers: "pawn", wild: "king" };
const emptyArtifactLayers = { movetargets: {}, winline: {} };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]],
  wild: [
    ["units", "wild"],
    ["units", "myunits", "wild", "mywild"],
    ["units", "oppunits", "wild", "oppwild"]
  ]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]],
  wild: [
    ["units", "wild"],
    ["units", "oppunits", "wild", "oppwild"],
    ["units", "myunits", "wild", "mywild"]
  ]
};
const game = {
  gameId: "serauqs",
  commands: { promote: {}, move: {} },
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
      wild: {},
      mywild: {},
      oppwild: {}
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
        wild: oldUnitLayers.wild,
        mywild: oldUnitLayers.oppwild,
        oppwild: oldUnitLayers.mywild
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
        wild: oldUnitLayers.wild,
        mywild: oldUnitLayers.oppwild,
        oppwild: oldUnitLayers.mywild
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
        ARTIFACTS: emptyArtifactLayers,
        MARKS: {},
        TURN: step.TURN
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
      let TURN = step.TURN;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      if (TURN > 1) {
        for (const pos of Object.keys(ARTIFACTS.movetargets)) {
          LINKS.marks[pos] = "selectmovetarget_basic_1";
        }
      } else {
        LINKS.commands.promote = "promote_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN,
        MARKS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
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
      let TURN = step.TURN;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      if (TURN > 1) {
        for (const pos of Object.keys(ARTIFACTS.movetargets)) {
          LINKS.marks[pos] = "selectmovetarget_basic_2";
        }
      } else {
        LINKS.commands.promote = "promote_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN,
        MARKS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
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
    promote_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "wild"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        wild: {},
        mywild: {},
        oppwild: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_2";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        winline: {}
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
        wild: {},
        mywild: {},
        oppwild: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };
        for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            let walkpositionstocount = TERRAIN1.mybase;
            let CURRENTCOUNT = 0;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            }
            let WALKLENGTH = walkedsquares.length;
            let TOTALCOUNT = CURRENTCOUNT;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 4 && TOTALCOUNT !== 4) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.corners)
              .concat(
                Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
              )
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length > 3
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madex";
        LINKS.endMarks = Object.keys(TERRAIN1.corners);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.middle)
              .concat(
                Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
              )
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length > 3
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "tookcenter";
        LINKS.endMarks = Object.keys(TERRAIN1.middle);
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
    promote_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "wild"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        wild: {},
        mywild: {},
        oppwild: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        winline: {}
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
        wild: {},
        mywild: {},
        oppwild: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };
        for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            let walkpositionstocount = TERRAIN2.mybase;
            let CURRENTCOUNT = 0;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
            }
            let WALKLENGTH = walkedsquares.length;
            let TOTALCOUNT = CURRENTCOUNT;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 4 && TOTALCOUNT !== 4) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.corners)
              .concat(
                Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
              )
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length > 3
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madex";
        LINKS.endMarks = Object.keys(TERRAIN2.corners);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.middle)
              .concat(
                Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
              )
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length > 3
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "tookcenter";
        LINKS.endMarks = Object.keys(TERRAIN2.middle);
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
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "which" },
              { unittype: ["pawn", 1] },
              { text: "or" },
              { unittype: ["king", 1] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "which" },
              { unittype: ["pawn", 1] },
              { text: "to promote to" },
              { unittype: ["king", 1] }
            ]
          });
    },
    promote_basic_1: () => defaultInstruction(1),
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              UNITLAYERS.wild[MARKS.selectunit]
                ? { text: "(remember that it matches for your opponent too!)" }
                : undefined
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "promote" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "into" },
              { unittype: ["king", 1] },
              { text: ", making it match for your opponent too" }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "which" },
              { unittype: ["pawn", 2] },
              { text: "or" },
              { unittype: ["king", 2] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "which" },
              { unittype: ["pawn", 2] },
              { text: "to promote to" },
              { unittype: ["king", 2] }
            ]
          });
    },
    promote_basic_2: () => defaultInstruction(2),
    move_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { text: "where to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              UNITLAYERS.wild[MARKS.selectunit]
                ? { text: "(remember that it matches for your opponent too!)" }
                : undefined
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "promote" },
              { text: "to turn" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "into" },
              { unittype: ["king", 2] },
              { text: ", making it match for your opponent too" }
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "go to" },
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
      code: "c"
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
        },
        corners: ["a1", "a4", "d1", "d4"],
        middle: [
          {
            rect: ["b2", "c3"]
          }
        ]
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
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
