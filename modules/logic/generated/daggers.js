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
const dimensions = { height: 8, width: 8 };
const BOARD = boardLayers(dimensions);
const iconMapping = { daggers: "bishop", crowns: "king" };
const emptyArtifactLayers = { movetarget: {} };
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
let game = {
  gameId: "daggers",
  action: {},
  instruction: {},
  commands: { move: {} },
  iconMap: { daggers: "bishop", crowns: "king" }
};
{
  const groupLayers = {
    daggers: [
      ["units", "daggers"],
      ["units", "myunits", "daggers", "mydaggers"],
      ["units", "oppunits", "daggers", "oppdaggers"]
    ],
    crowns: [
      ["units"],
      ["units", "myunits", "mycrowns"],
      ["units", "oppunits", "oppcrowns"]
    ]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { base: { "1": [{ rect: ["a8", "h8"] }], "2": [{ rect: ["a1", "h1"] }] } },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      daggers: oldUnitLayers.daggers,
      mydaggers: oldUnitLayers.oppdaggers,
      oppdaggers: oldUnitLayers.mydaggers,
      mycrowns: oldUnitLayers.oppcrowns,
      oppcrowns: oldUnitLayers.mycrowns
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "a" },
        { unittype: ["bishop", 1] },
        { text: "or" },
        { unittype: ["king", 1] },
        { text: "to move" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
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
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      mycrowns: {},
      oppcrowns: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      LINKS.endGame = "win";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
      LINKS.endGame = "win";
      LINKS.endedBy = "regicide";
      LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetarget: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
          }
        }
      }
    } else {
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of [8, 1, 2, 4, 5, 6]) {
          let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetarget[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !UNITLAYERS.myunits[POS] &&
              !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
            ) {
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetarget)) {
      LINKS.marks[pos] = "selectmovetarget1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        UNITLAYERS.mycrowns[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "an empty neighbour to move" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" }
              ]
            })
          : collapseContent({
              line: [
                { text: "where to slide" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                }
              ]
            })
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move1";
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
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget1 = step => {
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
        UNITLAYERS.mycrowns[MARKS.selectunit]
          ? { text: "go" }
          : collapseContent({
              line: [
                { text: "slide" },
                BOARD.board[MARKS.selectmovetarget].y >
                BOARD.board[MARKS.selectunit].y
                  ? { text: "uphill" }
                  : BOARD.board[MARKS.selectunit].y >
                    BOARD.board[MARKS.selectmovetarget].y
                  ? { text: "downhill" }
                  : undefined
              ]
            }),
        UNITLAYERS.units[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "and kill" },
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
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            })
      ]
    });
  };
}
{
  const groupLayers = {
    daggers: [
      ["units", "daggers"],
      ["units", "oppunits", "daggers", "oppdaggers"],
      ["units", "myunits", "daggers", "mydaggers"]
    ],
    crowns: [
      ["units"],
      ["units", "oppunits", "oppcrowns"],
      ["units", "myunits", "mycrowns"]
    ]
  };
  const TERRAIN = terrainLayers(
    8,
    8,
    { base: { "1": [{ rect: ["a8", "h8"] }], "2": [{ rect: ["a1", "h1"] }] } },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      daggers: oldUnitLayers.daggers,
      mydaggers: oldUnitLayers.oppdaggers,
      oppdaggers: oldUnitLayers.mydaggers,
      mycrowns: oldUnitLayers.oppcrowns,
      oppcrowns: oldUnitLayers.mycrowns
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "a" },
        { unittype: ["bishop", 2] },
        { text: "or" },
        { unittype: ["king", 2] },
        { text: "to move" }
      ]
    });
  };
  game.newBattle = setup => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      mycrowns: {},
      oppcrowns: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
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
      daggers: {},
      mydaggers: {},
      oppdaggers: {},
      mycrowns: {},
      oppcrowns: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      LINKS.endGame = "win";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mycrowns)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else if (Object.keys(UNITLAYERS.oppcrowns).length === 1) {
      LINKS.endGame = "win";
      LINKS.endedBy = "regicide";
      LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetarget: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (UNITLAYERS.mycrowns[MARKS.selectunit]) {
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
          }
        }
      }
    } else {
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of [8, 1, 2, 4, 5, 6]) {
          let MAX = [8, 1, 2].indexOf(DIR) !== -1 ? 1 : 8;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetarget[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !UNITLAYERS.myunits[POS] &&
              !([1, 5].indexOf(DIR) !== -1 && UNITLAYERS.oppdaggers[POS])
            ) {
              ARTIFACTS.movetarget[POS] = emptyObj;
            }
          }
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetarget)) {
      LINKS.marks[pos] = "selectmovetarget2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        UNITLAYERS.mycrowns[MARKS.selectunit]
          ? collapseContent({
              line: [
                { text: "an empty neighbour to move" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" }
              ]
            })
          : collapseContent({
              line: [
                { text: "where to slide" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                }
              ]
            })
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move2";
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
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget2 = step => {
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
        UNITLAYERS.mycrowns[MARKS.selectunit]
          ? { text: "go" }
          : collapseContent({
              line: [
                { text: "slide" },
                BOARD.board[MARKS.selectmovetarget].y >
                BOARD.board[MARKS.selectunit].y
                  ? { text: "uphill" }
                  : BOARD.board[MARKS.selectunit].y >
                    BOARD.board[MARKS.selectmovetarget].y
                  ? { text: "downhill" }
                  : undefined
              ]
            }),
        UNITLAYERS.units[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "and kill" },
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
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            })
      ]
    });
  };
}
export default game;
