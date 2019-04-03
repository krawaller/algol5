import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 5, width: 5 });

const emptyArtifactLayers = { swap2step: {}, swap1steps: {}, movetargets: {} };

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "infiltration" | "starvation";
  commands: {
    move?: "move1" | "move2";
    swap?: "swap1" | "swap2";
  };
  marks: {
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
      pos: string[];
    };
    selectdeportdestination?: {
      func: "selectdeportdestination1" | "selectdeportdestination2";
      pos: string[];
    };
    selectswapunit?: {
      func: "selectswapunit1" | "selectswapunit2";
      pos: string[];
    };
    selectswap1target?: {
      func: "selectswap1target1" | "selectswap1target2";
      pos: string[];
    };
  };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  const TERRAIN = {
    base: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    mybase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 }
    },
    oppbase: {
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      pinets: oldUnitLayers.pinets,
      mypinets: oldUnitLayers.opppinets,
      opppinets: oldUnitLayers.mypinets,
      neutralpinets: oldUnitLayers.neutralpinets,
      piokers: oldUnitLayers.piokers,
      mypiokers: oldUnitLayers.opppiokers,
      opppiokers: oldUnitLayers.mypiokers,
      neutralpiokers: oldUnitLayers.neutralpiokers,
      piases: oldUnitLayers.piases,
      mypiases: oldUnitLayers.opppiases,
      opppiases: oldUnitLayers.mypiases,
      neutralpiases: oldUnitLayers.neutralpiases
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectunit = {
      func: "selectunit1",
      pos: Object.keys(UNITLAYERS.myunits)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
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
      neutralunits: {},
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.swap1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: step.ARTIFACTS.movetargets
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
      neutralunits: {},
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("swap"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
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
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    LINKS.marks.selectswapunit = {
      func: "selectswapunit1",
      pos: Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    if (
      UNITLAYERS.units[MARKS.selectmovetarget] &&
      !TERRAIN.oppbase[MARKS.selectmovetarget]
    ) {
      LINKS.marks.selectdeportdestination = {
        func: "selectdeportdestination1",
        pos: Object.keys(
          Object.keys(TERRAIN.oppbase)
            .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    } else {
      LINKS.commands.move = "move1";
    }

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectdeportdestination1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeportdestination",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeportdestination: newMarkPos }
    };
  };
  game.selectswapunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: { ...step.ARTIFACTS.swap1steps },
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectswapunit: newMarkPos };
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
    LINKS.marks.selectswap1target = {
      func: "selectswap1target1",
      pos: Object.keys(ARTIFACTS.swap1steps)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectswapunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectswap1target1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: { ...step.ARTIFACTS.swap2step },
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectswap1target: newMarkPos };
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
        ARTIFACTS.swap2step[POS] = {};
      }
    }
    if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
      LINKS.commands.swap = "swap1";
    }

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectswap1target",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    base: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    oppbase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 }
    },
    mybase: {
      a5: { pos: "a5", x: 1, y: 5, owner: 2 },
      b5: { pos: "b5", x: 2, y: 5, owner: 2 },
      c5: { pos: "c5", x: 3, y: 5, owner: 2 },
      d5: { pos: "d5", x: 4, y: 5, owner: 2 },
      e5: { pos: "e5", x: 5, y: 5, owner: 2 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 }
    }
  };
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      pinets: oldUnitLayers.pinets,
      mypinets: oldUnitLayers.opppinets,
      opppinets: oldUnitLayers.mypinets,
      neutralpinets: oldUnitLayers.neutralpinets,
      piokers: oldUnitLayers.piokers,
      mypiokers: oldUnitLayers.opppiokers,
      opppiokers: oldUnitLayers.mypiokers,
      neutralpiokers: oldUnitLayers.neutralpiokers,
      piases: oldUnitLayers.piases,
      mypiases: oldUnitLayers.opppiases,
      opppiases: oldUnitLayers.mypiases,
      neutralpiases: oldUnitLayers.neutralpiases
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectunit = {
      func: "selectunit2",
      pos: Object.keys(UNITLAYERS.myunits)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a1", x: 1, y: 1, id: "unit1", group: "pinets", owner: 1 },
      unit2: { pos: "e1", x: 5, y: 1, id: "unit2", group: "pinets", owner: 1 },
      unit3: { pos: "a5", x: 1, y: 5, id: "unit3", group: "pinets", owner: 2 },
      unit4: { pos: "e5", x: 5, y: 5, id: "unit4", group: "pinets", owner: 2 },
      unit5: { pos: "b1", x: 2, y: 1, id: "unit5", group: "piokers", owner: 1 },
      unit6: { pos: "d1", x: 4, y: 1, id: "unit6", group: "piokers", owner: 1 },
      unit7: { pos: "b5", x: 2, y: 5, id: "unit7", group: "piokers", owner: 2 },
      unit8: { pos: "d5", x: 4, y: 5, id: "unit8", group: "piokers", owner: 2 },
      unit9: { pos: "c1", x: 3, y: 1, id: "unit9", group: "piases", owner: 1 },
      unit10: { pos: "c5", x: 3, y: 5, id: "unit10", group: "piases", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    return game.start1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
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
      neutralunits: {},
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.swap2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: step.ARTIFACTS.movetargets
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
      neutralunits: {},
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.myunits)
            .concat(Object.keys(TERRAIN.oppbase))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("swap"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
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
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    LINKS.marks.selectswapunit = {
      func: "selectswapunit2",
      pos: Object.keys(
        Object.keys(UNITLAYERS.myunits)
          .filter(k => !{ [MARKS.selectunit]: 1 }.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    if (
      UNITLAYERS.units[MARKS.selectmovetarget] &&
      !TERRAIN.oppbase[MARKS.selectmovetarget]
    ) {
      LINKS.marks.selectdeportdestination = {
        func: "selectdeportdestination2",
        pos: Object.keys(
          Object.keys(TERRAIN.oppbase)
            .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    } else {
      LINKS.commands.move = "move2";
    }

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectdeportdestination2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeportdestination",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeportdestination: newMarkPos }
    };
  };
  game.selectswapunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: step.ARTIFACTS.swap2step,
      swap1steps: { ...step.ARTIFACTS.swap1steps },
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectswapunit: newMarkPos };
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
    LINKS.marks.selectswap1target = {
      func: "selectswap1target2",
      pos: Object.keys(ARTIFACTS.swap1steps)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectswapunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.selectswap1target2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      swap2step: { ...step.ARTIFACTS.swap2step },
      swap1steps: step.ARTIFACTS.swap1steps,
      movetargets: step.ARTIFACTS.movetargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectswap1target: newMarkPos };
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
        ARTIFACTS.swap2step[POS] = {};
      }
    }
    if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
      LINKS.commands.swap = "swap2";
    }

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectswap1target",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
}
export default game;
