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
const dimensions = { height: 5, width: 5 };
const BOARD = boardLayers(dimensions);
const iconMapping = { runners: "bishop", sidekickers: "pawn" };
const emptyArtifactLayers = { movetargets: {} };
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
const groupLayers1 = {
  runners: [
    ["units", "runners"],
    ["units", "myunits", "runners", "myrunners"],
    ["units", "oppunits", "runners", "opprunners"]
  ],
  sidekickers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  runners: [
    ["units", "runners"],
    ["units", "oppunits", "runners", "opprunners"],
    ["units", "myunits", "runners", "myrunners"]
  ],
  sidekickers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
let game = {
  gameId: "kickrun",
  action: {},
  instruction: {},
  commands: { move: {} },
  iconMap: iconMapping
};
game.action.startTurn1 = step => {
  const oldUnitLayers = step.UNITLAYERS;
  let UNITLAYERS = {
    units: oldUnitLayers.units,
    myunits: oldUnitLayers.oppunits,
    oppunits: oldUnitLayers.myunits,
    runners: oldUnitLayers.runners,
    myrunners: oldUnitLayers.opprunners,
    opprunners: oldUnitLayers.myrunners
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
      { unittype: ["bishop", 1] },
      { text: "or" },
      { unittype: ["pawn", 1] },
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
    runners: {},
    myrunners: {},
    opprunners: {}
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
        Object.keys(UNITLAYERS.myrunners)
          .concat(Object.keys(TERRAIN1.oppcorners))
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
        Object.keys(UNITLAYERS.myrunners)
          .concat(Object.keys(TERRAIN1.oppcorners))
          .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
    );
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
    movetargets: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let BLOCKS = UNITLAYERS.units;
    for (let DIR of UNITLAYERS.myrunners[MARKS.selectunit]
      ? [1, 2, 3]
      : [8, 1, 3, 4]) {
      let MAX = UNITLAYERS.myrunners[MARKS.selectunit] ? 4 : 1;
      let POS = MARKS.selectunit;
      let LENGTH = 0;
      while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
        LENGTH++;
        if (DIR !== 8 && DIR !== 4) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
      if (BLOCKS[POS]) {
        if (UNITLAYERS.oppunits[POS] && (DIR === 8 || DIR === 4)) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.movetargets)) {
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
      { text: "where to move" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      }
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
    MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
  };
};
game.instruction.selectmovetarget1 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { text: "Press" },
      { command: "move" },
      { text: "to" },
      UNITLAYERS.runners[MARKS.selectunit]
        ? collapseContent({
            line: [
              { text: "slide" },
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
          })
        : collapseContent({
            line: [
              { text: "move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              UNITLAYERS.units[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "capture" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectmovetarget] || {})
                              .group
                          ],
                          (UNITLAYERS.units[MARKS.selectmovetarget] || {})
                            .owner,
                          MARKS.selectmovetarget
                        ]
                      }
                    ]
                  })
                : { pos: MARKS.selectmovetarget }
            ]
          })
    ]
  });
};
game.action.startTurn2 = step => {
  const oldUnitLayers = step.UNITLAYERS;
  let UNITLAYERS = {
    units: oldUnitLayers.units,
    myunits: oldUnitLayers.oppunits,
    oppunits: oldUnitLayers.myunits,
    runners: oldUnitLayers.runners,
    myrunners: oldUnitLayers.opprunners,
    opprunners: oldUnitLayers.myrunners
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
      { unittype: ["bishop", 2] },
      { text: "or" },
      { unittype: ["pawn", 2] },
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
    runners: {},
    myrunners: {},
    opprunners: {}
  };
  for (let unitid in UNITDATA) {
    const currentunit = UNITDATA[unitid];
    const { group, pos, owner } = currentunit;
    for (const layer of groupLayers2[group][owner]) {
      UNITLAYERS[layer][pos] = currentunit;
    }
  }
  let terrain = { corners: { "1": ["a1"], "2": ["e5"] } };
  TERRAIN1 = terrainLayers(5, 5, terrain, 1);
  TERRAIN2 = terrainLayers(5, 5, terrain, 2);
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
    runners: {},
    myrunners: {},
    opprunners: {}
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
        Object.keys(UNITLAYERS.myrunners)
          .concat(Object.keys(TERRAIN2.oppcorners))
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
        Object.keys(UNITLAYERS.myrunners)
          .concat(Object.keys(TERRAIN2.oppcorners))
          .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
    );
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
    movetargets: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let BLOCKS = UNITLAYERS.units;
    for (let DIR of UNITLAYERS.myrunners[MARKS.selectunit]
      ? [5, 6, 7]
      : [4, 5, 7, 8]) {
      let MAX = UNITLAYERS.myrunners[MARKS.selectunit] ? 4 : 1;
      let POS = MARKS.selectunit;
      let LENGTH = 0;
      while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
        LENGTH++;
        if (DIR !== 8 && DIR !== 4) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
      if (BLOCKS[POS]) {
        if (UNITLAYERS.oppunits[POS] && (DIR === 8 || DIR === 4)) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.movetargets)) {
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
      { text: "where to move" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      }
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
    MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
  };
};
game.instruction.selectmovetarget2 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { text: "Press" },
      { command: "move" },
      { text: "to" },
      UNITLAYERS.runners[MARKS.selectunit]
        ? collapseContent({
            line: [
              { text: "slide" },
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
          })
        : collapseContent({
            line: [
              { text: "move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              UNITLAYERS.units[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "capture" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectmovetarget] || {})
                              .group
                          ],
                          (UNITLAYERS.units[MARKS.selectmovetarget] || {})
                            .owner,
                          MARKS.selectmovetarget
                        ]
                      }
                    ]
                  })
                : { pos: MARKS.selectmovetarget }
            ]
          })
    ]
  });
};
export default game;
