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
import boards from "../../games/definitions/monkeyqueen/boards";
import setups from "../../games/definitions/monkeyqueen/setups";
import variants from "../../games/definitions/monkeyqueen/variants";
const emptyObj = {};
const iconMapping = { queens: "queen", babies: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  queens: [
    ["units"],
    ["units", "myunits", "myqueens"],
    ["units", "oppunits", "oppqueens"]
  ],
  babies: [
    ["units", "babies"],
    ["units", "myunits", "babies", "mybabies"],
    ["units", "oppunits", "babies", "oppbabies"]
  ]
};
const groupLayers2 = {
  queens: [
    ["units"],
    ["units", "oppunits", "oppqueens"],
    ["units", "myunits", "myqueens"]
  ],
  babies: [
    ["units", "babies"],
    ["units", "oppunits", "babies", "oppbabies"],
    ["units", "myunits", "babies", "mybabies"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {} };
const game = {
  gameId: "monkeyqueen",
  commands: { move: {}, pie: {} },
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
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      myqueens: {},
      oppqueens: {},
      babies: {},
      mybabies: {},
      oppbabies: {}
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
      BATTLEVARS: { plr1life: 20, plr2life: 20 },
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
        myqueens: oldUnitLayers.oppqueens,
        oppqueens: oldUnitLayers.myqueens,
        babies: oldUnitLayers.babies,
        mybabies: oldUnitLayers.oppbabies,
        oppbabies: oldUnitLayers.mybabies
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
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        myqueens: oldUnitLayers.oppqueens,
        oppqueens: oldUnitLayers.myqueens,
        babies: oldUnitLayers.babies,
        mybabies: oldUnitLayers.oppbabies,
        oppbabies: oldUnitLayers.mybabies
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      if (TURN === 1) {
        LINKS.commands.pie = "pie_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS: step.BATTLEVARS
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selectunit;
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (
              (UNITLAYERS.myqueens[STARTPOS] && BATTLEVARS["plr1life"] > 2) ||
              (UNITLAYERS.mybabies[STARTPOS] &&
                Math.abs(
                  BOARD.board[MARKS.selectunit].x -
                    BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].x
                ) +
                  Math.abs(
                    BOARD.board[MARKS.selectunit].y -
                      BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].y
                  ) >
                  Math.abs(
                    BOARD.board[POS].x -
                      BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].x
                  ) +
                    Math.abs(
                      BOARD.board[POS].y -
                        BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].y
                    ))
            ) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
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
        MARKS,
        BATTLEVARS,
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selectunit;
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (
              (UNITLAYERS.myqueens[STARTPOS] && BATTLEVARS["plr2life"] > 2) ||
              (UNITLAYERS.mybabies[STARTPOS] &&
                Math.abs(
                  BOARD.board[MARKS.selectunit].x -
                    BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].x
                ) +
                  Math.abs(
                    BOARD.board[MARKS.selectunit].y -
                      BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].y
                  ) >
                  Math.abs(
                    BOARD.board[POS].x -
                      BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].x
                  ) +
                    Math.abs(
                      BOARD.board[POS].y -
                        BOARD.board[Object.keys(UNITLAYERS.oppqueens)[0]].y
                    ))
            ) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
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
        MARKS,
        BATTLEVARS,
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.myqueens[MARKS.selectunit] &&
        !UNITLAYERS.units[MARKS.selectmovetarget]
      ) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectunit,
            id: newunitid,
            group: "babies",
            owner: 1
          };
        }
        BATTLEVARS.plr1life = (BATTLEVARS.plr1life || 0) + -1;
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
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
        myqueens: {},
        oppqueens: {},
        babies: {},
        mybabies: {},
        oppbabies: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppqueens).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else {
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
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.myqueens[MARKS.selectunit] &&
        !UNITLAYERS.units[MARKS.selectmovetarget]
      ) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectunit,
            id: newunitid,
            group: "babies",
            owner: 2
          };
        }
        BATTLEVARS.plr2life = (BATTLEVARS.plr2life || 0) + -1;
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
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
        myqueens: {},
        oppqueens: {},
        babies: {},
        mybabies: {},
        oppbabies: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppqueens).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else {
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
    pie_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      for (let LOOPPOS in UNITLAYERS.myunits) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 1
            };
          }
        }
      }
      for (let LOOPPOS in UNITLAYERS.oppunits) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 2
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        myqueens: {},
        oppqueens: {},
        babies: {},
        mybabies: {},
        oppbabies: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppqueens).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else {
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
          BATTLEVARS["plr1life"] === BATTLEVARS["plr2life"]
            ? collapseContent({
                line: [
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.myqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(UNITLAYERS.myqueens)[0]] ||
                        {}
                      ).owner,
                      Object.keys(UNITLAYERS.myqueens)[0]
                    ]
                  },
                  { text: "and" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.oppqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[
                          Object.keys(UNITLAYERS.oppqueens)[0]
                        ] || {}
                      ).owner,
                      Object.keys(UNITLAYERS.oppqueens)[0]
                    ]
                  },
                  { text: "both have strength" },
                  { text: BATTLEVARS["plr1life"] }
                ]
              })
            : collapseContent({
                line: [
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.myqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(UNITLAYERS.myqueens)[0]] ||
                        {}
                      ).owner,
                      Object.keys(UNITLAYERS.myqueens)[0]
                    ]
                  },
                  { text: "has strength" },
                  { text: BATTLEVARS["plr1life"] },
                  { text: " and " },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.oppqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[
                          Object.keys(UNITLAYERS.oppqueens)[0]
                        ] || {}
                      ).owner,
                      Object.keys(UNITLAYERS.oppqueens)[0]
                    ]
                  },
                  { text: "has" },
                  { text: BATTLEVARS["plr2life"] }
                ]
              }),
          { text: ". Select unit to act with" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          UNITLAYERS.babies[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "(must kill enemy or move closer to" },
                  collapseContent({
                    line: Object.keys(UNITLAYERS.oppqueens)
                      .filter(p => UNITLAYERS.units[p])
                      .map(p => ({
                        unit: [
                          iconMapping[UNITLAYERS.units[p].group],
                          UNITLAYERS.units[p].owner,
                          p
                        ]
                      }))
                      .reduce((mem, i, n, list) => {
                        mem.push(i);
                        if (n === list.length - 2) {
                          mem.push({ text: " and " });
                        } else if (n < list.length - 2) {
                          mem.push({ text: ", " });
                        }
                        return mem;
                      }, [])
                  }),
                  { text: ")" }
                ]
              })
            : undefined
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
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "go kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "go to" },
                  { pos: MARKS.selectmovetarget },
                  UNITLAYERS.myqueens[MARKS.selectunit]
                    ? collapseContent({
                        line: [
                          { text: "and spawn" },
                          { unit: ["pawn", 1, MARKS.selectunit] }
                        ]
                      })
                    : undefined
                ]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return collapseContent({
        line: [
          BATTLEVARS["plr1life"] === BATTLEVARS["plr2life"]
            ? collapseContent({
                line: [
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.myqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(UNITLAYERS.myqueens)[0]] ||
                        {}
                      ).owner,
                      Object.keys(UNITLAYERS.myqueens)[0]
                    ]
                  },
                  { text: "and" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.oppqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[
                          Object.keys(UNITLAYERS.oppqueens)[0]
                        ] || {}
                      ).owner,
                      Object.keys(UNITLAYERS.oppqueens)[0]
                    ]
                  },
                  { text: "both have strength" },
                  { text: BATTLEVARS["plr1life"] }
                ]
              })
            : collapseContent({
                line: [
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.myqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(UNITLAYERS.myqueens)[0]] ||
                        {}
                      ).owner,
                      Object.keys(UNITLAYERS.myqueens)[0]
                    ]
                  },
                  { text: "has strength" },
                  { text: BATTLEVARS["plr2life"] },
                  { text: " and " },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(UNITLAYERS.oppqueens)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[
                          Object.keys(UNITLAYERS.oppqueens)[0]
                        ] || {}
                      ).owner,
                      Object.keys(UNITLAYERS.oppqueens)[0]
                    ]
                  },
                  { text: "has" },
                  { text: BATTLEVARS["plr1life"] }
                ]
              }),
          { text: ". Select unit to act with" },
          TURN === 1
            ? collapseContent({
                line: [
                  { text: ", or press" },
                  { command: "pie" },
                  { text: "to swap with opponent" }
                ]
              })
            : undefined
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    pie_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          UNITLAYERS.babies[MARKS.selectunit]
            ? collapseContent({
                line: [
                  { text: "(must kill enemy or move closer to" },
                  collapseContent({
                    line: Object.keys(UNITLAYERS.oppqueens)
                      .filter(p => UNITLAYERS.units[p])
                      .map(p => ({
                        unit: [
                          iconMapping[UNITLAYERS.units[p].group],
                          UNITLAYERS.units[p].owner,
                          p
                        ]
                      }))
                      .reduce((mem, i, n, list) => {
                        mem.push(i);
                        if (n === list.length - 2) {
                          mem.push({ text: " and " });
                        } else if (n < list.length - 2) {
                          mem.push({ text: ", " });
                        }
                        return mem;
                      }, [])
                  }),
                  { text: ")" }
                ]
              })
            : undefined
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
          UNITLAYERS.units[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "go kill" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "go to" },
                  { pos: MARKS.selectmovetarget },
                  UNITLAYERS.myqueens[MARKS.selectunit]
                    ? collapseContent({
                        line: [
                          { text: "and spawn" },
                          { unit: ["pawn", 2, MARKS.selectunit] }
                        ]
                      })
                    : undefined
                ]
              })
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
