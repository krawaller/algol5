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
const iconMapping = { pawns: "pawn", bishops: "bishop" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  pawns: [
    ["units", "pawns"],
    ["units", "myunits", "pawns", "mypawns"],
    ["units", "oppunits", "pawns", "opppawns"]
  ],
  bishops: [
    ["units", "bishops"],
    ["units", "myunits", "bishops", "mybishops"],
    ["units", "oppunits", "bishops", "oppbishops"]
  ]
};
const groupLayers2 = {
  pawns: [
    ["units", "pawns"],
    ["units", "oppunits", "pawns", "opppawns"],
    ["units", "myunits", "pawns", "mypawns"]
  ],
  bishops: [
    ["units", "bishops"],
    ["units", "oppunits", "bishops", "oppbishops"],
    ["units", "myunits", "bishops", "mybishops"]
  ]
};
const emptyArtifactLayers_basic = { movetargets: {} };
const game = {
  gameId: "yonmoque",
  commands: { drop: {}, move: {} },
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
      pawns: {},
      mypawns: {},
      opppawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      BATTLEVARS: {},
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
        pawns: oldUnitLayers.pawns,
        mypawns: oldUnitLayers.opppawns,
        opppawns: oldUnitLayers.mypawns,
        bishops: oldUnitLayers.bishops,
        mybishops: oldUnitLayers.oppbishops,
        oppbishops: oldUnitLayers.mybishops
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      if (7 > (BATTLEVARS["plr1drop"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdroptarget_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        pawns: oldUnitLayers.pawns,
        mypawns: oldUnitLayers.opppawns,
        opppawns: oldUnitLayers.mypawns,
        bishops: oldUnitLayers.bishops,
        mybishops: oldUnitLayers.oppbishops,
        oppbishops: oldUnitLayers.mybishops
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      if (7 > (BATTLEVARS["plr2drop"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdroptarget_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in UNITLAYERS.myunits) {
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mybishops) {
          for (let DIR of diagDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
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
        MARKS: { selectunit: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
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
        },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in UNITLAYERS.myunits) {
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in UNITLAYERS.mybishops) {
          for (let DIR of diagDirs) {
            let POS = STARTPOS;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
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
        MARKS: { selectunit: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
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
        },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      BATTLEVARS.plr1drop = (BATTLEVARS.plr1drop || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: TERRAIN1.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
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
        UNITLAYERS,
        BATTLEVARS,
        NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.mybishops[MARKS.selectunit] &&
        !TERRAIN1.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      if (
        UNITLAYERS.mypawns[MARKS.selectunit] &&
        TERRAIN1.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
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
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
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
        UNITLAYERS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      BATTLEVARS.plr2drop = (BATTLEVARS.plr2drop || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: TERRAIN2.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
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
        UNITLAYERS,
        BATTLEVARS,
        NEXTSPAWNID
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.mybishops[MARKS.selectunit] &&
        !TERRAIN2.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      if (
        UNITLAYERS.mypawns[MARKS.selectunit] &&
        TERRAIN2.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
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
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
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
        UNITLAYERS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({ line: [{ text: "a unit to move" }] })
                : undefined,
              7 > (BATTLEVARS["plr1drop"] || 0)
                ? collapseContent({
                    line: [{ text: "an empty square to drop a unit into" }]
                  })
                : undefined
            ]
              .filter(i => !!i)
              .reduce((mem, i, n, list) => {
                mem.push(i);
                if (n === list.length - 2) {
                  mem.push({ text: " or " });
                } else if (n < list.length - 2) {
                  mem.push({ text: ", " });
                }
                return mem;
              }, [])
          })
        ]
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    move_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn a" },
          {
            unittype: [
              iconMapping[
                TERRAIN1.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns"
              ],
              1
            ]
          }
        ]
      });
    },
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Now select where to move" },
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
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget },
          UNITLAYERS.mybishops[MARKS.selectunit] &&
          !TERRAIN1.mybase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and demote it to a" },
                  { unittype: ["pawn", 1] }
                ]
              })
            : undefined,
          UNITLAYERS.mypawns[MARKS.selectunit] &&
          TERRAIN1.mybase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and promote it to a" },
                  { unittype: ["bishop", 1] }
                ]
              })
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({ line: [{ text: "a unit to move" }] })
                : undefined,
              7 > (BATTLEVARS["plr2drop"] || 0)
                ? collapseContent({
                    line: [{ text: "an empty square to drop a unit into" }]
                  })
                : undefined
            ]
              .filter(i => !!i)
              .reduce((mem, i, n, list) => {
                mem.push(i);
                if (n === list.length - 2) {
                  mem.push({ text: " or " });
                } else if (n < list.length - 2) {
                  mem.push({ text: ", " });
                }
                return mem;
              }, [])
          })
        ]
      });
    },
    drop_basic_2: () => defaultInstruction(2),
    move_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn a" },
          {
            unittype: [
              iconMapping[
                TERRAIN2.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns"
              ],
              2
            ]
          }
        ]
      });
    },
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Now select where to move" },
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
          { command: "move" },
          { text: "to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget },
          UNITLAYERS.mybishops[MARKS.selectunit] &&
          !TERRAIN2.mybase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and demote it to a" },
                  { unittype: ["pawn", 2] }
                ]
              })
            : undefined,
          UNITLAYERS.mypawns[MARKS.selectunit] &&
          TERRAIN2.mybase[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "and promote it to a" },
                  { unittype: ["bishop", 2] }
                ]
              })
            : undefined
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
      terrain: {
        base: {
          "1": ["a3", "b2", "b4", "c1", "c5", "d2", "d4", "e3"],
          "2": [
            "a2",
            "a4",
            "b1",
            "b3",
            "b5",
            "c2",
            "c4",
            "d1",
            "d3",
            "d5",
            "e2",
            "e4"
          ]
        }
      }
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
