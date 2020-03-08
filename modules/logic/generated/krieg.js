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
const iconMapping = { notfrozens: "knight", frozens: "rook" };
const emptyArtifactLayers = { movetargets: {} };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  notfrozens: [
    ["units"],
    ["units", "myunits", "mynotfrozens"],
    ["units", "oppunits", "oppnotfrozens"]
  ],
  frozens: [
    ["units"],
    ["units", "myunits", "myfrozens"],
    ["units", "oppunits", "oppfrozens"]
  ]
};
const groupLayers2 = {
  notfrozens: [
    ["units"],
    ["units", "oppunits", "oppnotfrozens"],
    ["units", "myunits", "mynotfrozens"]
  ],
  frozens: [
    ["units"],
    ["units", "oppunits", "oppfrozens"],
    ["units", "myunits", "myfrozens"]
  ]
};
const game = {
  gameId: "krieg",
  commands: { move: {} },
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
      mynotfrozens: {},
      oppnotfrozens: {},
      myfrozens: {},
      oppfrozens: {}
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
        mynotfrozens: oldUnitLayers.oppnotfrozens,
        oppnotfrozens: oldUnitLayers.mynotfrozens,
        myfrozens: oldUnitLayers.oppfrozens,
        oppfrozens: oldUnitLayers.myfrozens
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
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
        mynotfrozens: oldUnitLayers.oppnotfrozens,
        oppnotfrozens: oldUnitLayers.mynotfrozens,
        myfrozens: oldUnitLayers.oppfrozens,
        oppfrozens: oldUnitLayers.myfrozens
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
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
      {
        let STARTPOS = MARKS.selectunit;
        let startconnections = connections[STARTPOS];
        for (let DIR of TERRAIN1.southeast[STARTPOS]
          ? [1, 3, 4, 5, 7]
          : TERRAIN1.northwest[STARTPOS]
          ? [1, 3, 5, 7, 8]
          : orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_1";
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
    selectmove_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
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
        let STARTPOS = MARKS.selectunit;
        let startconnections = connections[STARTPOS];
        for (let DIR of TERRAIN2.southeast[STARTPOS]
          ? [1, 3, 4, 5, 7]
          : TERRAIN2.northwest[STARTPOS]
          ? [1, 3, 5, 7, 8]
          : orthoDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_2";
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
    selectmove_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      for (let LOOPPOS in UNITLAYERS.myfrozens) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "notfrozens"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "frozens"
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmove
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mynotfrozens: {},
        oppnotfrozens: {},
        myfrozens: {},
        oppfrozens: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppcorners)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "cornerinfiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppcorners)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppbases)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length === 2
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "occupation";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppbases)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      for (let LOOPPOS in UNITLAYERS.myfrozens) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "notfrozens"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "frozens"
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmove
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        mynotfrozens: {},
        oppnotfrozens: {},
        myfrozens: {},
        oppfrozens: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppcorners)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "cornerinfiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppcorners)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        );
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppbases)
              .concat(Object.keys(UNITLAYERS.myunits))
              .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
          )
            .filter(([key, n]) => n === 2)
            .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
        ).length === 2
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "occupation";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppbases)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["knight", 1] },
              { text: "to move (except" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] ||
                      {}
                    ).group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.myfrozens)[0]
                ]
              },
              { text: "who moved last turn)" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["knight", 1] },
              { text: "to move" }
            ]
          });
    },
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "an empty square to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" }
        ]
      });
    },
    selectmove_basic_1: step => {
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
          { text: "go" },
          TERRAIN1.oppbases[MARKS.selectmove] &&
          !TERRAIN1.oppbases[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "into the opponent base at" },
                  { pos: MARKS.selectmove }
                ]
              })
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectmove }]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["knight", 2] },
              { text: "to move (except" },
              {
                unit: [
                  iconMapping[
                    (
                      UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] ||
                      {}
                    ).group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.myfrozens)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.myfrozens)[0]
                ]
              },
              { text: "who moved last turn)" }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { unittype: ["knight", 2] },
              { text: "to move" }
            ]
          });
    },
    move_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "an empty square to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" }
        ]
      });
    },
    selectmove_basic_2: step => {
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
          { text: "go" },
          TERRAIN2.oppbases[MARKS.selectmove] &&
          !TERRAIN2.oppbases[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "into the opponent base at" },
                  { pos: MARKS.selectmove }
                ]
              })
            : collapseContent({
                line: [{ text: "to" }, { pos: MARKS.selectmove }]
              })
        ]
      });
    }
  }
};
export default game;
