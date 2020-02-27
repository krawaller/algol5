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
const iconMapping = { pinets: "pawn", piokers: "bishop", piases: "king" };
const emptyArtifactLayers = { swap2step: {}, swap1steps: {}, movetargets: {} };
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
let TERRAIN1;
let TERRAIN2;
const groupLayers1 = {
  pinets: [
    ["units", "pinets"],
    ["units", "myunits", "pinets"],
    ["units", "oppunits", "pinets"]
  ],
  piokers: [
    ["units", "piokers"],
    ["units", "myunits", "piokers"],
    ["units", "oppunits", "piokers"]
  ],
  piases: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  pinets: [
    ["units", "pinets"],
    ["units", "oppunits", "pinets"],
    ["units", "myunits", "pinets"]
  ],
  piokers: [
    ["units", "piokers"],
    ["units", "oppunits", "piokers"],
    ["units", "myunits", "piokers"]
  ],
  piases: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
let game = {
  gameId: "transet",
  action: {},
  instruction: {},
  commands: { move: {}, swap: {} },
  iconMap: iconMapping
};
game.action.startTurn1 = step => {
  const oldUnitLayers = step.UNITLAYERS;
  let UNITLAYERS = {
    units: oldUnitLayers.units,
    myunits: oldUnitLayers.oppunits,
    oppunits: oldUnitLayers.myunits,
    pinets: oldUnitLayers.pinets,
    piokers: oldUnitLayers.piokers
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
      { unittype: ["pawn", 1] },
      { text: "," },
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
  if (UNITLAYERS.units[MARKS.selectmovetarget]) {
    if (TERRAIN1.oppbase[MARKS.selectmovetarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdeportdestination
          };
        }
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
    pinets: {},
    piokers: {}
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN1.oppbase))
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN1.oppbase))
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
game.action.swap1 = step => {
  let LINKS = { marks: {}, commands: {} };
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: step.ARTIFACTS.swap1steps,
    swap2step: step.ARTIFACTS.swap2step
  };
  let UNITLAYERS = step.UNITLAYERS;
  let UNITDATA = { ...step.UNITDATA };
  let MARKS = step.MARKS;
  {
    let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = {
        ...UNITDATA[unitid],
        pos: MARKS.selectswap1target
      };
    }
  }
  {
    let unitid = (UNITLAYERS.units[MARKS.selectswapunit] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = {
        ...UNITDATA[unitid],
        pos: Object.keys(ARTIFACTS.swap2step)[0]
      };
    }
  }
  UNITLAYERS = {
    units: {},
    myunits: {},
    oppunits: {},
    pinets: {},
    piokers: {}
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN1.oppbase))
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN1.oppbase))
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
    ARTIFACTS,
    TURN: step.TURN,
    UNITDATA,
    UNITLAYERS
  };
};
game.instruction.swap1 = () => defaultInstruction(1);
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
    let startconnections = connections[MARKS.selectunit];
    for (let DIR of UNITLAYERS.pinets[MARKS.selectunit]
      ? [1]
      : UNITLAYERS.piokers[MARKS.selectunit]
      ? [8, 2]
      : [8, 1, 2]) {
      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.myunits[POS]) {
        ARTIFACTS.movetargets[POS] = emptyObj;
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.movetargets)) {
    LINKS.marks[pos] = "selectmovetarget1";
  }
  for (const pos of Object.keys(
    Object.keys(UNITLAYERS.myunits)
      .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
  )) {
    LINKS.marks[pos] = "selectswapunit1";
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
  let ARTIFACTS = step.ARTIFACTS;
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  let LINKS = step.LINKS;
  return collapseContent({
    line: [
      { select: "Select" },
      collapseContent({
        line: [
          Object.keys(ARTIFACTS.movetargets).length !== 0
            ? collapseContent({
                line: [
                  { text: "where to move" },
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
            : undefined,
          !!Object.keys(LINKS.marks).find(
            a => LINKS.marks[a] === "selectswapunit" + 1
          )
            ? collapseContent({
                line: [
                  { text: "another unit to swap" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "with" }
                ]
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
};
game.action.selectmovetarget1 = (step, newMarkPos) => {
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectmovetarget: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  if (
    UNITLAYERS.units[MARKS.selectmovetarget] &&
    !TERRAIN1.oppbase[MARKS.selectmovetarget]
  ) {
    for (const pos of Object.keys(
      Object.keys(TERRAIN1.oppbase)
        .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdeportdestination1";
    }
  } else {
    LINKS.commands.move = "move1";
  }
  return {
    LINKS,
    ARTIFACTS: step.ARTIFACTS,
    UNITLAYERS,
    UNITDATA: step.UNITDATA,
    TURN: step.TURN,
    MARKS
  };
};
game.instruction.selectmovetarget1 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return UNITLAYERS.units[MARKS.selectmovetarget] &&
    !TERRAIN1.oppbase[MARKS.selectmovetarget]
    ? collapseContent({
        line: [
          { select: "Select" },
          { text: "where" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
              MARKS.selectmovetarget
            ]
          },
          { text: "should end up" }
        ]
      })
    : collapseContent({
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
};
game.action.selectdeportdestination1 = (step, newMarkPos) => {
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
      selectmovetarget: step.MARKS.selectmovetarget,
      selectdeportdestination: newMarkPos
    }
  };
};
game.instruction.selectdeportdestination1 = step => {
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
      { pos: MARKS.selectmovetarget },
      { text: "and deport" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).group],
          (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
          MARKS.selectmovetarget
        ]
      },
      { text: "to" },
      { pos: MARKS.selectdeportdestination }
    ]
  });
};
game.action.selectswapunit1 = (step, newMarkPos) => {
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectswapunit: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let startconnections = connections[MARKS.selectunit];
    for (let DIR of orthoDirs) {
      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS.swap1steps[POS] = { dir: DIR };
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.swap1steps)) {
    LINKS.marks[pos] = "selectswap1target1";
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
game.instruction.selectswapunit1 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { select: "Select" },
      { text: "a neighbouring square for" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      },
      { text: "to step to." },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
          MARKS.selectswapunit
        ]
      },
      { text: "will step in the opposite direction" }
    ]
  });
};
game.action.selectswap1target1 = (step, newMarkPos) => {
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: step.ARTIFACTS.swap1steps,
    swap2step: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectswapunit: step.MARKS.selectswapunit,
    selectswap1target: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let POS =
      connections[MARKS.selectswapunit][
        relativeDirs[5][
          (ARTIFACTS.swap1steps[MARKS.selectswap1target] || {}).dir
        ]
      ];
    if (
      POS &&
      !{ ...UNITLAYERS.units, ...{ [MARKS.selectswap1target]: 1 } }[POS]
    ) {
      ARTIFACTS.swap2step[POS] = emptyObj;
    }
  }
  if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
    LINKS.commands.swap = "swap1";
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
game.instruction.selectswap1target1 = step => {
  let ARTIFACTS = step.ARTIFACTS;
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { text: "Press" },
      { command: "swap" },
      { text: "to step" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      },
      { text: "to" },
      { pos: MARKS.selectswap1target },
      { text: "and" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
          MARKS.selectswapunit
        ]
      },
      { text: "to" },
      { pos: Object.keys(ARTIFACTS.swap2step)[0] }
    ]
  });
};
game.action.startTurn2 = step => {
  const oldUnitLayers = step.UNITLAYERS;
  let UNITLAYERS = {
    units: oldUnitLayers.units,
    myunits: oldUnitLayers.oppunits,
    oppunits: oldUnitLayers.myunits,
    pinets: oldUnitLayers.pinets,
    piokers: oldUnitLayers.piokers
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
      { unittype: ["pawn", 2] },
      { text: "," },
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
    pinets: {},
    piokers: {}
  };
  for (let unitid in UNITDATA) {
    const currentunit = UNITDATA[unitid];
    const { group, pos, owner } = currentunit;
    for (const layer of groupLayers2[group][owner]) {
      UNITLAYERS[layer][pos] = currentunit;
    }
  }
  let terrain = {
    base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
  };
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
  if (UNITLAYERS.units[MARKS.selectmovetarget]) {
    if (TERRAIN2.oppbase[MARKS.selectmovetarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdeportdestination
          };
        }
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
    pinets: {},
    piokers: {}
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN2.oppbase))
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN2.oppbase))
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
game.action.swap2 = step => {
  let LINKS = { marks: {}, commands: {} };
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: step.ARTIFACTS.swap1steps,
    swap2step: step.ARTIFACTS.swap2step
  };
  let UNITLAYERS = step.UNITLAYERS;
  let UNITDATA = { ...step.UNITDATA };
  let MARKS = step.MARKS;
  {
    let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = {
        ...UNITDATA[unitid],
        pos: MARKS.selectswap1target
      };
    }
  }
  {
    let unitid = (UNITLAYERS.units[MARKS.selectswapunit] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = {
        ...UNITDATA[unitid],
        pos: Object.keys(ARTIFACTS.swap2step)[0]
      };
    }
  }
  UNITLAYERS = {
    units: {},
    myunits: {},
    oppunits: {},
    pinets: {},
    piokers: {}
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN2.oppbase))
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
        Object.keys(UNITLAYERS.myunits)
          .concat(Object.keys(TERRAIN2.oppbase))
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
    ARTIFACTS,
    TURN: step.TURN,
    UNITDATA,
    UNITLAYERS
  };
};
game.instruction.swap2 = () => defaultInstruction(2);
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
    let startconnections = connections[MARKS.selectunit];
    for (let DIR of UNITLAYERS.pinets[MARKS.selectunit]
      ? [5]
      : UNITLAYERS.piokers[MARKS.selectunit]
      ? [4, 6]
      : [4, 5, 6]) {
      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.myunits[POS]) {
        ARTIFACTS.movetargets[POS] = emptyObj;
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.movetargets)) {
    LINKS.marks[pos] = "selectmovetarget2";
  }
  for (const pos of Object.keys(
    Object.keys(UNITLAYERS.myunits)
      .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
  )) {
    LINKS.marks[pos] = "selectswapunit2";
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
  let ARTIFACTS = step.ARTIFACTS;
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  let LINKS = step.LINKS;
  return collapseContent({
    line: [
      { select: "Select" },
      collapseContent({
        line: [
          Object.keys(ARTIFACTS.movetargets).length !== 0
            ? collapseContent({
                line: [
                  { text: "where to move" },
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
            : undefined,
          !!Object.keys(LINKS.marks).find(
            a => LINKS.marks[a] === "selectswapunit" + 2
          )
            ? collapseContent({
                line: [
                  { text: "another unit to swap" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "with" }
                ]
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
};
game.action.selectmovetarget2 = (step, newMarkPos) => {
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectmovetarget: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  if (
    UNITLAYERS.units[MARKS.selectmovetarget] &&
    !TERRAIN2.oppbase[MARKS.selectmovetarget]
  ) {
    for (const pos of Object.keys(
      Object.keys(TERRAIN2.oppbase)
        .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdeportdestination2";
    }
  } else {
    LINKS.commands.move = "move2";
  }
  return {
    LINKS,
    ARTIFACTS: step.ARTIFACTS,
    UNITLAYERS,
    UNITDATA: step.UNITDATA,
    TURN: step.TURN,
    MARKS
  };
};
game.instruction.selectmovetarget2 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return UNITLAYERS.units[MARKS.selectmovetarget] &&
    !TERRAIN2.oppbase[MARKS.selectmovetarget]
    ? collapseContent({
        line: [
          { select: "Select" },
          { text: "where" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
              MARKS.selectmovetarget
            ]
          },
          { text: "should end up" }
        ]
      })
    : collapseContent({
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
};
game.action.selectdeportdestination2 = (step, newMarkPos) => {
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
      selectmovetarget: step.MARKS.selectmovetarget,
      selectdeportdestination: newMarkPos
    }
  };
};
game.instruction.selectdeportdestination2 = step => {
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
      { pos: MARKS.selectmovetarget },
      { text: "and deport" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).group],
          (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
          MARKS.selectmovetarget
        ]
      },
      { text: "to" },
      { pos: MARKS.selectdeportdestination }
    ]
  });
};
game.action.selectswapunit2 = (step, newMarkPos) => {
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectswapunit: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let startconnections = connections[MARKS.selectunit];
    for (let DIR of orthoDirs) {
      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS.swap1steps[POS] = { dir: DIR };
      }
    }
  }
  for (const pos of Object.keys(ARTIFACTS.swap1steps)) {
    LINKS.marks[pos] = "selectswap1target2";
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
game.instruction.selectswapunit2 = step => {
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { select: "Select" },
      { text: "a neighbouring square for" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      },
      { text: "to step to." },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
          MARKS.selectswapunit
        ]
      },
      { text: "will step in the opposite direction" }
    ]
  });
};
game.action.selectswap1target2 = (step, newMarkPos) => {
  let ARTIFACTS = {
    movetargets: step.ARTIFACTS.movetargets,
    swap1steps: step.ARTIFACTS.swap1steps,
    swap2step: {}
  };
  let LINKS = { marks: {}, commands: {} };
  let MARKS = {
    selectunit: step.MARKS.selectunit,
    selectswapunit: step.MARKS.selectswapunit,
    selectswap1target: newMarkPos
  };
  let UNITLAYERS = step.UNITLAYERS;
  {
    let POS =
      connections[MARKS.selectswapunit][
        relativeDirs[5][
          (ARTIFACTS.swap1steps[MARKS.selectswap1target] || {}).dir
        ]
      ];
    if (
      POS &&
      !{ ...UNITLAYERS.units, ...{ [MARKS.selectswap1target]: 1 } }[POS]
    ) {
      ARTIFACTS.swap2step[POS] = emptyObj;
    }
  }
  if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
    LINKS.commands.swap = "swap2";
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
game.instruction.selectswap1target2 = step => {
  let ARTIFACTS = step.ARTIFACTS;
  let MARKS = step.MARKS;
  let UNITLAYERS = step.UNITLAYERS;
  return collapseContent({
    line: [
      { text: "Press" },
      { command: "swap" },
      { text: "to step" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
          MARKS.selectunit
        ]
      },
      { text: "to" },
      { pos: MARKS.selectswap1target },
      { text: "and" },
      {
        unit: [
          iconMapping[(UNITLAYERS.units[MARKS.selectswapunit] || {}).group],
          (UNITLAYERS.units[MARKS.selectswapunit] || {}).owner,
          MARKS.selectswapunit
        ]
      },
      { text: "to" },
      { pos: Object.keys(ARTIFACTS.swap2step)[0] }
    ]
  });
};
export default game;
