import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
const BOARD = boardLayers({ height: 5, width: 5 });
const emptyArtifactLayers = { swap2step: {}, swap1steps: {}, movetargets: {} };
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "transet",
  action: {},
  instruction: {}
};
{
  const groupLayers = {
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
  const TERRAIN = terrainLayers(
    5,
    5,
    { base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] } },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pinets: oldUnitLayers.pinets,
      piokers: oldUnitLayers.piokers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
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
      line: [{ text: "Select a unit to" }, { command: "move" }]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.units[MARKS.selectmovetarget]) {
      if (TERRAIN.oppbase[MARKS.selectmovetarget]) {
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions[pos] = "selectmovetarget1";
    }
    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.myunits)
        .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.actions[pos] = "selectswapunit1";
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
    let LINKS: AlgolStepLinks = step.LINKS;
    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a square to" },
                    { command: "move" },
                    { text: "the" },
                    { pos: MARKS.selectunit },
                    {
                      unit: [
                        { pinets: "pawn", piokers: "bishop", piases: "king" }[
                          (UNITLAYERS.units[MARKS.selectunit] || {}).group
                        ],
                        (UNITLAYERS.units[MARKS.selectunit] || {}).owner as
                          | 0
                          | 1
                          | 2,
                        MARKS.selectunit
                      ]
                    },
                    { text: "to" }
                  ]
                })
              : undefined,
            !!Object.keys(LINKS.actions).find(
              a => LINKS.actions[a] === "selectswapunit" + 1
            )
              ? collapseContent({
                  line: [
                    { text: "another unit to swap the" },
                    { pos: MARKS.selectunit },
                    {
                      unit: [
                        { pinets: "pawn", piokers: "bishop", piases: "king" }[
                          (UNITLAYERS.units[MARKS.selectunit] || {}).group
                        ],
                        (UNITLAYERS.units[MARKS.selectunit] || {}).owner as
                          | 0
                          | 1
                          | 2,
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
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (
      UNITLAYERS.units[MARKS.selectmovetarget] &&
      !TERRAIN.oppbase[MARKS.selectmovetarget]
    ) {
      for (const pos of Object.keys(
        Object.keys(TERRAIN.oppbase)
          .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.actions[pos] = "selectdeportdestination1";
      }
    } else {
      LINKS.actions.move = "move1";
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
      !TERRAIN.oppbase[MARKS.selectmovetarget]
      ? collapseContent({
          line: [
            { text: "Select where the enemy" },
            {
              unit: [
                { pinets: "pawn", piokers: "bishop", piases: "king" }[
                  (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner as
                  | 0
                  | 1
                  | 2,
                MARKS.selectmovetarget
              ]
            },
            { text: "at" },
            { pos: MARKS.selectmovetarget },
            { text: "should end up" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "move" },
            { text: "to go from" },
            { pos: MARKS.selectunit },
            { text: "to" },
            { pos: MARKS.selectmovetarget }
          ]
        });
  };
  game.action.selectdeportdestination1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
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
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget },
        { text: "and deport the enemy to" },
        { pos: MARKS.selectdeportdestination }
      ]
    });
  };
  game.action.selectswapunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      swap1steps: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions[pos] = "selectswap1target1";
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
    return collapseContent({
      line: [
        { text: "Select a neighbouring square for" },
        { pos: MARKS.selectunit },
        { text: "to step to. The" },
        { pos: MARKS.selectswapunit },
        { text: "unit will step in the opposite direction" }
      ]
    });
  };
  game.action.selectswap1target1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      swap1steps: step.ARTIFACTS.swap1steps,
      swap2step: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions.swap = "swap1";
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
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "swap" },
        { text: "to step" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectswap1target },
        { text: "and step" },
        { pos: MARKS.selectswapunit },
        { text: "in the other direction to" },
        { pos: Object.keys(ARTIFACTS.swap2step)[0] }
      ]
    });
  };
}
{
  const groupLayers = {
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
  const TERRAIN = terrainLayers(
    5,
    5,
    { base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] } },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      pinets: oldUnitLayers.pinets,
      piokers: oldUnitLayers.piokers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
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
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [{ text: "Select a unit to" }, { command: "move" }]
    });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      pinets: { "1": ["a1", "e1"], "2": ["a5", "e5"] },
      piokers: { "1": ["b1", "d1"], "2": ["b5", "d5"] },
      piases: { "1": ["c1"], "2": ["c5"] }
    });
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
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.units[MARKS.selectmovetarget]) {
      if (TERRAIN.oppbase[MARKS.selectmovetarget]) {
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions[pos] = "selectmovetarget2";
    }
    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.myunits)
        .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.actions[pos] = "selectswapunit2";
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
    let LINKS: AlgolStepLinks = step.LINKS;
    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.movetargets).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a square to" },
                    { command: "move" },
                    { text: "the" },
                    { pos: MARKS.selectunit },
                    {
                      unit: [
                        { pinets: "pawn", piokers: "bishop", piases: "king" }[
                          (UNITLAYERS.units[MARKS.selectunit] || {}).group
                        ],
                        (UNITLAYERS.units[MARKS.selectunit] || {}).owner as
                          | 0
                          | 1
                          | 2,
                        MARKS.selectunit
                      ]
                    },
                    { text: "to" }
                  ]
                })
              : undefined,
            !!Object.keys(LINKS.actions).find(
              a => LINKS.actions[a] === "selectswapunit" + 2
            )
              ? collapseContent({
                  line: [
                    { text: "another unit to swap the" },
                    { pos: MARKS.selectunit },
                    {
                      unit: [
                        { pinets: "pawn", piokers: "bishop", piases: "king" }[
                          (UNITLAYERS.units[MARKS.selectunit] || {}).group
                        ],
                        (UNITLAYERS.units[MARKS.selectunit] || {}).owner as
                          | 0
                          | 1
                          | 2,
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
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    if (
      UNITLAYERS.units[MARKS.selectmovetarget] &&
      !TERRAIN.oppbase[MARKS.selectmovetarget]
    ) {
      for (const pos of Object.keys(
        Object.keys(TERRAIN.oppbase)
          .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.actions[pos] = "selectdeportdestination2";
      }
    } else {
      LINKS.actions.move = "move2";
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
      !TERRAIN.oppbase[MARKS.selectmovetarget]
      ? collapseContent({
          line: [
            { text: "Select where the enemy" },
            {
              unit: [
                { pinets: "pawn", piokers: "bishop", piases: "king" }[
                  (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner as
                  | 0
                  | 1
                  | 2,
                MARKS.selectmovetarget
              ]
            },
            { text: "at" },
            { pos: MARKS.selectmovetarget },
            { text: "should end up" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "move" },
            { text: "to go from" },
            { pos: MARKS.selectunit },
            { text: "to" },
            { pos: MARKS.selectmovetarget }
          ]
        });
  };
  game.action.selectdeportdestination2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
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
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget },
        { text: "and deport the enemy to" },
        { pos: MARKS.selectdeportdestination }
      ]
    });
  };
  game.action.selectswapunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      swap1steps: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions[pos] = "selectswap1target2";
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
    return collapseContent({
      line: [
        { text: "Select a neighbouring square for" },
        { pos: MARKS.selectunit },
        { text: "to step to. The" },
        { pos: MARKS.selectswapunit },
        { text: "unit will step in the opposite direction" }
      ]
    });
  };
  game.action.selectswap1target2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      swap1steps: step.ARTIFACTS.swap1steps,
      swap2step: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions.swap = "swap2";
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
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "swap" },
        { text: "to step" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectswap1target },
        { text: "and step" },
        { pos: MARKS.selectswapunit },
        { text: "in the other direction to" },
        { pos: Object.keys(ARTIFACTS.swap2step)[0] }
      ]
    });
  };
}
export default game as AlgolGame;
