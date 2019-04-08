import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 4, width: 4 });

const emptyArtifactLayers = { movetargets: {}, winline: {} };

const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "madeline" | "madex" | "tookcenter" | "starvation";
  commands: {
    promote?: "promote1" | "promote2";
    move?: "move1" | "move2";
  };
  marks: {
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
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
      a4: { pos: "a4", x: 1, y: 4, owner: 2 },
      b4: { pos: "b4", x: 2, y: 4, owner: 2 },
      c4: { pos: "c4", x: 3, y: 4, owner: 2 },
      d4: { pos: "d4", x: 4, y: 4, owner: 2 }
    },
    mybase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 }
    },
    oppbase: {
      a4: { pos: "a4", x: 1, y: 4, owner: 2 },
      b4: { pos: "b4", x: 2, y: 4, owner: 2 },
      c4: { pos: "c4", x: 3, y: 4, owner: 2 },
      d4: { pos: "d4", x: 4, y: 4, owner: 2 }
    },
    corners: {
      a1: { pos: "a1", x: 1, y: 1 },
      a4: { pos: "a4", x: 1, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    middle: {
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 }
    },
    nocorners: {
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
      d3: { pos: "d3", x: 4, y: 3 }
    },
    nomiddle: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    }
  };
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers,
      wild: oldUnitLayers.wild,
      mywild: oldUnitLayers.oppwild,
      oppwild: oldUnitLayers.mywild,
      neutralwild: oldUnitLayers.neutralwild
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
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.start1instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select which" },
            { unittype: "pawn" },
            { text: "or" },
            { unittype: "king" },
            { text: "to" },
            { command: "move" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Select which" },
            { unittype: "pawn" },
            { text: "to" },
            { command: "promote" }
          ]
        });
  };
  game.promote1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: step.ARTIFACTS.winline
    };
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
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      wild: {},
      mywild: {},
      oppwild: {},
      neutralwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endturn = "start2";
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
  game.promote1instruction = () => defaultInstruction(1);
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: { ...step.ARTIFACTS.winline }
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
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      wild: {},
      mywild: {},
      oppwild: {},
      neutralwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };

      for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let walkpositionstocount = TERRAIN.mybase;
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
              ARTIFACTS.winline[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endturn = "start2";
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
  game.move1instruction = () => defaultInstruction(1);
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    if (3 > TURN) {
      LINKS.commands.promote = "promote1";
    } else {
      LINKS.marks.selectmovetarget = {
        func: "selectmovetarget1",
        pos: Object.keys(ARTIFACTS.movetargets)
      };
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN,
      MARKS
    };
  };
  game.selectunit1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select where to" },
            { command: "move" },
            { text: "the" },
            {
              unit: [
                { soldiers: "pawn", wild: "king" }[
                  (UNITLAYERS.units[MARKS.selectunit] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                MARKS.selectunit
              ]
            },
            UNITLAYERS.wild[MARKS.selectunit]
              ? { text: "(remeber that it matches for your opponent too!)" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "promote" },
            { text: "to turn this" },
            { unittype: "pawn" },
            { text: "to a" },
            { unittype: "king" },
            { text: ", making it match for your opponent too" }
          ]
        });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
  game.selectmovetarget1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
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
}
{
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    base: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      a4: { pos: "a4", x: 1, y: 4, owner: 2 },
      b4: { pos: "b4", x: 2, y: 4, owner: 2 },
      c4: { pos: "c4", x: 3, y: 4, owner: 2 },
      d4: { pos: "d4", x: 4, y: 4, owner: 2 }
    },
    oppbase: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 }
    },
    mybase: {
      a4: { pos: "a4", x: 1, y: 4, owner: 2 },
      b4: { pos: "b4", x: 2, y: 4, owner: 2 },
      c4: { pos: "c4", x: 3, y: 4, owner: 2 },
      d4: { pos: "d4", x: 4, y: 4, owner: 2 }
    },
    corners: {
      a1: { pos: "a1", x: 1, y: 1 },
      a4: { pos: "a4", x: 1, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d4: { pos: "d4", x: 4, y: 4 }
    },
    middle: {
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 }
    },
    nobase: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 }
    },
    nocorners: {
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
      d3: { pos: "d3", x: 4, y: 3 }
    },
    nomiddle: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      b1: { pos: "b1", x: 2, y: 1 },
      b4: { pos: "b4", x: 2, y: 4 },
      c1: { pos: "c1", x: 3, y: 1 },
      c4: { pos: "c4", x: 3, y: 4 },
      d1: { pos: "d1", x: 4, y: 1 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 }
    }
  };
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers,
      wild: oldUnitLayers.wild,
      mywild: oldUnitLayers.oppwild,
      oppwild: oldUnitLayers.mywild,
      neutralwild: oldUnitLayers.neutralwild
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
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.start2instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select which" },
            { unittype: "pawn" },
            { text: "or" },
            { unittype: "king" },
            { text: "to" },
            { command: "move" }
          ]
        })
      : collapseContent({
          line: [
            { text: "Select which" },
            { unittype: "pawn" },
            { text: "to" },
            { command: "promote" }
          ]
        });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "a1",
        x: 1,
        y: 1,
        id: "unit1",
        group: "soldiers",
        owner: 1
      },
      unit2: {
        pos: "b1",
        x: 2,
        y: 1,
        id: "unit2",
        group: "soldiers",
        owner: 1
      },
      unit3: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit3",
        group: "soldiers",
        owner: 1
      },
      unit4: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit4",
        group: "soldiers",
        owner: 1
      },
      unit5: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit5",
        group: "soldiers",
        owner: 2
      },
      unit6: {
        pos: "b4",
        x: 2,
        y: 4,
        id: "unit6",
        group: "soldiers",
        owner: 2
      },
      unit7: {
        pos: "c4",
        x: 3,
        y: 4,
        id: "unit7",
        group: "soldiers",
        owner: 2
      },
      unit8: { pos: "d4", x: 4, y: 4, id: "unit8", group: "soldiers", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      wild: {},
      mywild: {},
      oppwild: {},
      neutralwild: {}
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
  game.promote2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: step.ARTIFACTS.winline
    };
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
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      wild: {},
      mywild: {},
      oppwild: {},
      neutralwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endturn = "start1";
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
  game.promote2instruction = () => defaultInstruction(2);
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      winline: { ...step.ARTIFACTS.winline }
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
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
      wild: {},
      mywild: {},
      oppwild: {},
      neutralwild: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      let allowedsteps = { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild };

      for (let STARTPOS in { ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild }) {
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let walkpositionstocount = TERRAIN.mybase;
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
              ARTIFACTS.winline[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.corners)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madex";
      LINKS.endMarks = Object.keys(TERRAIN.corners);
    } else if (
      Object.keys(
        Object.entries(
          Object.keys(TERRAIN.middle)
            .concat(
              Object.keys({ ...UNITLAYERS.myunits, ...UNITLAYERS.oppwild })
            )
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length > 3
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "tookcenter";
      LINKS.endMarks = Object.keys(TERRAIN.middle);
    } else {
      LINKS.endturn = "start1";
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
  game.move2instruction = () => defaultInstruction(2);
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    if (3 > TURN) {
      LINKS.commands.promote = "promote2";
    } else {
      LINKS.marks.selectmovetarget = {
        func: "selectmovetarget2",
        pos: Object.keys(ARTIFACTS.movetargets)
      };
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN,
      MARKS
    };
  };
  game.selectunit2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;
    let TURN = step.TURN;

    return TURN > 2
      ? collapseContent({
          line: [
            { text: "Select where to" },
            { command: "move" },
            { text: "the" },
            {
              unit: [
                { soldiers: "pawn", wild: "king" }[
                  (UNITLAYERS.units[MARKS.selectunit] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                MARKS.selectunit
              ]
            },
            UNITLAYERS.wild[MARKS.selectunit]
              ? { text: "(remeber that it matches for your opponent too!)" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "promote" },
            { text: "to turn this" },
            { unittype: "pawn" },
            { text: "to a" },
            { unittype: "king" },
            { text: ", making it match for your opponent too" }
          ]
        });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
  game.selectmovetarget2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
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
}
export default game;
