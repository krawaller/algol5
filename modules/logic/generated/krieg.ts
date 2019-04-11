import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";
import {
  AlgolStepLinks,
  AlgolGame
} from "/Users/davidwaller/gitreps/algol5/modules/types";
const BOARD = boardLayers({ height: 4, width: 4 });

const emptyArtifactLayers = { movetargets: {} };

const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    notfrozens: [
      ["units", "notfrozens"],
      ["units", "myunits", "notfrozens", "mynotfrozens"],
      ["units", "oppunits", "notfrozens", "oppnotfrozens"]
    ],
    frozens: [
      ["units", "frozens"],
      ["units", "myunits", "frozens", "myfrozens"],
      ["units", "oppunits", "frozens", "oppfrozens"]
    ]
  };
  const ownerNames = ["neutral", "my", "opp"];
  const TERRAIN = {
    southeast: { a4: { pos: "a4", x: 1, y: 4 }, c2: { pos: "c2", x: 3, y: 2 } },
    northwest: { b3: { pos: "b3", x: 2, y: 3 }, d1: { pos: "d1", x: 4, y: 1 } },
    corners: {
      a4: { pos: "a4", x: 1, y: 4, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 }
    },
    mycorners: { a4: { pos: "a4", x: 1, y: 4, owner: 1 } },
    oppcorners: { d1: { pos: "d1", x: 4, y: 1, owner: 2 } },
    bases: {
      b4: { pos: "b4", x: 2, y: 4, owner: 1 },
      a3: { pos: "a3", x: 1, y: 3, owner: 1 },
      b3: { pos: "b3", x: 2, y: 3, owner: 1 },
      c2: { pos: "c2", x: 3, y: 2, owner: 2 },
      d2: { pos: "d2", x: 4, y: 2, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 }
    },
    mybases: {
      b4: { pos: "b4", x: 2, y: 4, owner: 1 },
      a3: { pos: "a3", x: 1, y: 3, owner: 1 },
      b3: { pos: "b3", x: 2, y: 3, owner: 1 }
    },
    oppbases: {
      c2: { pos: "c2", x: 3, y: 2, owner: 2 },
      d2: { pos: "d2", x: 4, y: 2, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 }
    },
    nosoutheast: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nonorthwest: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nocorners: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nobases: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    }
  };
  game.action.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      notfrozens: oldUnitLayers.notfrozens,
      mynotfrozens: oldUnitLayers.oppnotfrozens,
      oppnotfrozens: oldUnitLayers.mynotfrozens,
      frozens: oldUnitLayers.frozens,
      myfrozens: oldUnitLayers.oppfrozens,
      oppfrozens: oldUnitLayers.myfrozens
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
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
  game.instruction.start1 = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select a unit to move that you didn't move last turn" }
          ]
        })
      : collapseContent({ line: [{ text: "Select a unit to move" }] });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
      notfrozens: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      frozens: {},
      myfrozens: {},
      oppfrozens: {}
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
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "cornerinfiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length === 2
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "occupation";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
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
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectunit;

      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.southeast[STARTPOS]
        ? [1, 3, 4, 5, 7]
        : TERRAIN.northwest[STARTPOS]
        ? [1, 3, 5, 7, 8]
        : orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove1";
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
    return { text: "Select an empty square to move to" };
  };
  game.action.selectmove1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };

    LINKS.actions.move = "move1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
    };
  };
  game.instruction.selectmove1 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        TERRAIN.oppbases[MARKS.selectmove] &&
        !TERRAIN.oppbases[MARKS.selectunit]
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
  };
}
{
  const groupLayers = {
    notfrozens: [
      ["units", "notfrozens"],
      ["units", "oppunits", "notfrozens", "oppnotfrozens"],
      ["units", "myunits", "notfrozens", "mynotfrozens"]
    ],
    frozens: [
      ["units", "frozens"],
      ["units", "oppunits", "frozens", "oppfrozens"],
      ["units", "myunits", "frozens", "myfrozens"]
    ]
  };
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    southeast: { a4: { pos: "a4", x: 1, y: 4 }, c2: { pos: "c2", x: 3, y: 2 } },
    northwest: { b3: { pos: "b3", x: 2, y: 3 }, d1: { pos: "d1", x: 4, y: 1 } },
    corners: {
      a4: { pos: "a4", x: 1, y: 4, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 2 }
    },
    oppcorners: { a4: { pos: "a4", x: 1, y: 4, owner: 1 } },
    mycorners: { d1: { pos: "d1", x: 4, y: 1, owner: 2 } },
    bases: {
      b4: { pos: "b4", x: 2, y: 4, owner: 1 },
      a3: { pos: "a3", x: 1, y: 3, owner: 1 },
      b3: { pos: "b3", x: 2, y: 3, owner: 1 },
      c2: { pos: "c2", x: 3, y: 2, owner: 2 },
      d2: { pos: "d2", x: 4, y: 2, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 }
    },
    oppbases: {
      b4: { pos: "b4", x: 2, y: 4, owner: 1 },
      a3: { pos: "a3", x: 1, y: 3, owner: 1 },
      b3: { pos: "b3", x: 2, y: 3, owner: 1 }
    },
    mybases: {
      c2: { pos: "c2", x: 3, y: 2, owner: 2 },
      d2: { pos: "d2", x: 4, y: 2, owner: 2 },
      c1: { pos: "c1", x: 3, y: 1, owner: 2 }
    },
    nosoutheast: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nonorthwest: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nocorners: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    nobases: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b2: { pos: "b2", x: 2, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    }
  };
  game.action.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      notfrozens: oldUnitLayers.notfrozens,
      mynotfrozens: oldUnitLayers.oppnotfrozens,
      oppnotfrozens: oldUnitLayers.mynotfrozens,
      frozens: oldUnitLayers.frozens,
      myfrozens: oldUnitLayers.oppfrozens,
      oppfrozens: oldUnitLayers.myfrozens
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mynotfrozens)) {
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
  game.instruction.start2 = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select a unit to move that you didn't move last turn" }
          ]
        })
      : collapseContent({ line: [{ text: "Select a unit to move" }] });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit1",
        group: "notfrozens",
        owner: 1
      },
      unit2: {
        pos: "b4",
        x: 2,
        y: 4,
        id: "unit2",
        group: "notfrozens",
        owner: 1
      },
      unit3: {
        pos: "a3",
        x: 1,
        y: 3,
        id: "unit3",
        group: "notfrozens",
        owner: 1
      },
      unit4: {
        pos: "b3",
        x: 2,
        y: 3,
        id: "unit4",
        group: "notfrozens",
        owner: 1
      },
      unit5: {
        pos: "c2",
        x: 3,
        y: 2,
        id: "unit5",
        group: "notfrozens",
        owner: 2
      },
      unit6: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit6",
        group: "notfrozens",
        owner: 2
      },
      unit7: {
        pos: "d2",
        x: 4,
        y: 2,
        id: "unit7",
        group: "notfrozens",
        owner: 2
      },
      unit8: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit8",
        group: "notfrozens",
        owner: 2
      }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      notfrozens: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      frozens: {},
      myfrozens: {},
      oppfrozens: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }

    return game.action.start1({
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
      notfrozens: {},
      mynotfrozens: {},
      oppnotfrozens: {},
      frozens: {},
      myfrozens: {},
      oppfrozens: {}
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
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "cornerinfiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppcorners)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length === 2
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "occupation";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(TERRAIN.oppbases)
            .concat(Object.keys(UNITLAYERS.myunits))
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
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectunit;

      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.southeast[STARTPOS]
        ? [1, 3, 4, 5, 7]
        : TERRAIN.northwest[STARTPOS]
        ? [1, 3, 5, 7, 8]
        : orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmove2";
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
    return { text: "Select an empty square to move to" };
  };
  game.action.selectmove2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };

    LINKS.actions.move = "move2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmove: newMarkPos }
    };
  };
  game.instruction.selectmove2 = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        TERRAIN.oppbases[MARKS.selectmove] &&
        !TERRAIN.oppbases[MARKS.selectunit]
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
  };
}
export default game as AlgolGame;
