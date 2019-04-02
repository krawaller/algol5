import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 7, width: 8 });

const emptyArtifactLayers = {
  movetargets: {},
  madetowers: {},
  madewalls: {},
  killtargets: {}
};

const connections = boardConnections({ height: 7, width: 8 });
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
    kill?: "kill1" | "kill2";
  };
  marks: {
    selecttower?: { func: "selecttower1" | "selecttower2"; pos: string[] };
    selectmove?: { func: "selectmove1" | "selectmove2"; pos: string[] };
    selectkill?: { func: "selectkill1" | "selectkill2"; pos: string[] };
  };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 },
      a7: { pos: "a7", x: 1, y: 7, owner: 2 },
      b7: { pos: "b7", x: 2, y: 7, owner: 2 },
      c7: { pos: "c7", x: 3, y: 7, owner: 2 },
      d7: { pos: "d7", x: 4, y: 7, owner: 2 },
      e7: { pos: "e7", x: 5, y: 7, owner: 2 },
      f7: { pos: "f7", x: 6, y: 7, owner: 2 },
      g7: { pos: "g7", x: 7, y: 7, owner: 2 },
      h7: { pos: "h7", x: 8, y: 7, owner: 2 }
    },
    myhomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 }
    },
    opphomerow: {
      a7: { pos: "a7", x: 1, y: 7, owner: 2 },
      b7: { pos: "b7", x: 2, y: 7, owner: 2 },
      c7: { pos: "c7", x: 3, y: 7, owner: 2 },
      d7: { pos: "d7", x: 4, y: 7, owner: 2 },
      e7: { pos: "e7", x: 5, y: 7, owner: 2 },
      f7: { pos: "f7", x: 6, y: 7, owner: 2 },
      g7: { pos: "g7", x: 7, y: 7, owner: 2 },
      h7: { pos: "h7", x: 8, y: 7, owner: 2 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 }
    }
  };
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      towers: oldUnitLayers.towers,
      mytowers: oldUnitLayers.opptowers,
      opptowers: oldUnitLayers.mytowers,
      neutraltowers: oldUnitLayers.neutraltowers,
      walls: oldUnitLayers.walls,
      mywalls: oldUnitLayers.oppwalls,
      oppwalls: oldUnitLayers.mywalls,
      neutralwalls: oldUnitLayers.neutralwalls
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selecttower = {
      func: "selecttower1",
      pos: Object.keys(UNITLAYERS.mytowers)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls,
      killtargets: step.ARTIFACTS.killtargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "walls",
          owner: 1,
          from: MARKS.selecttower
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {}
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.kill1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectkill] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {}
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
      path: step.path.concat("kill"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selecttower1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls,
      killtargets: { ...step.ARTIFACTS.killtargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selecttower: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let MAX = 2;
        let POS = MARKS.selecttower;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        let STEP = 0;
        for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;
          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selecttower];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppwalls[POS]) {
          ARTIFACTS.killtargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmove = {
      func: "selectmove1",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    LINKS.marks.selectkill = {
      func: "selectkill1",
      pos: Object.keys(ARTIFACTS.killtargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selecttower",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmove1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      madetowers: { ...step.ARTIFACTS.madetowers },
      madewalls: { ...step.ARTIFACTS.madewalls },
      killtargets: step.ARTIFACTS.killtargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmove: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectmove;

      let POS =
        connections[STARTPOS][
          relativeDirs[5][
            (ARTIFACTS.movetargets[MARKS.selectmove] || {})["dir"]
          ]
        ];
      if (POS) {
        ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
          POS
        ] = {};
      }

      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
      ][STARTPOS] = {};
    }
    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmove",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkill1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.kill = "kill1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectkill",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectkill: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 },
      a7: { pos: "a7", x: 1, y: 7, owner: 2 },
      b7: { pos: "b7", x: 2, y: 7, owner: 2 },
      c7: { pos: "c7", x: 3, y: 7, owner: 2 },
      d7: { pos: "d7", x: 4, y: 7, owner: 2 },
      e7: { pos: "e7", x: 5, y: 7, owner: 2 },
      f7: { pos: "f7", x: 6, y: 7, owner: 2 },
      g7: { pos: "g7", x: 7, y: 7, owner: 2 },
      h7: { pos: "h7", x: 8, y: 7, owner: 2 }
    },
    opphomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 }
    },
    myhomerow: {
      a7: { pos: "a7", x: 1, y: 7, owner: 2 },
      b7: { pos: "b7", x: 2, y: 7, owner: 2 },
      c7: { pos: "c7", x: 3, y: 7, owner: 2 },
      d7: { pos: "d7", x: 4, y: 7, owner: 2 },
      e7: { pos: "e7", x: 5, y: 7, owner: 2 },
      f7: { pos: "f7", x: 6, y: 7, owner: 2 },
      g7: { pos: "g7", x: 7, y: 7, owner: 2 },
      h7: { pos: "h7", x: 8, y: 7, owner: 2 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 }
    }
  };
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      towers: oldUnitLayers.towers,
      mytowers: oldUnitLayers.opptowers,
      opptowers: oldUnitLayers.mytowers,
      neutraltowers: oldUnitLayers.neutraltowers,
      walls: oldUnitLayers.walls,
      mywalls: oldUnitLayers.oppwalls,
      oppwalls: oldUnitLayers.mywalls,
      neutralwalls: oldUnitLayers.neutralwalls
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selecttower = {
      func: "selecttower2",
      pos: Object.keys(UNITLAYERS.mytowers)
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a1", x: 1, y: 1, id: "unit1", group: "towers", owner: 1 },
      unit2: { pos: "b1", x: 2, y: 1, id: "unit2", group: "towers", owner: 1 },
      unit3: { pos: "c1", x: 3, y: 1, id: "unit3", group: "towers", owner: 1 },
      unit4: { pos: "d1", x: 4, y: 1, id: "unit4", group: "towers", owner: 1 },
      unit5: { pos: "e1", x: 5, y: 1, id: "unit5", group: "towers", owner: 1 },
      unit6: { pos: "f1", x: 6, y: 1, id: "unit6", group: "towers", owner: 1 },
      unit7: { pos: "g1", x: 7, y: 1, id: "unit7", group: "towers", owner: 1 },
      unit8: { pos: "h1", x: 8, y: 1, id: "unit8", group: "towers", owner: 1 },
      unit9: { pos: "a7", x: 1, y: 7, id: "unit9", group: "towers", owner: 2 },
      unit10: {
        pos: "b7",
        x: 2,
        y: 7,
        id: "unit10",
        group: "towers",
        owner: 2
      },
      unit11: {
        pos: "c7",
        x: 3,
        y: 7,
        id: "unit11",
        group: "towers",
        owner: 2
      },
      unit12: {
        pos: "d7",
        x: 4,
        y: 7,
        id: "unit12",
        group: "towers",
        owner: 2
      },
      unit13: {
        pos: "e7",
        x: 5,
        y: 7,
        id: "unit13",
        group: "towers",
        owner: 2
      },
      unit14: {
        pos: "f7",
        x: 6,
        y: 7,
        id: "unit14",
        group: "towers",
        owner: 2
      },
      unit15: {
        pos: "g7",
        x: 7,
        y: 7,
        id: "unit15",
        group: "towers",
        owner: 2
      },
      unit16: { pos: "h7", x: 8, y: 7, id: "unit16", group: "towers", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {}
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
      NEXTSPAWNID: 1,

      turn: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls,
      killtargets: step.ARTIFACTS.killtargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
    for (let LOOPPOS in ARTIFACTS.madetowers) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.madewalls) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "walls",
          owner: 2,
          from: MARKS.selecttower
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {}
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.kill2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: "walls"
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectkill] || {}).id];
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {}
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
            .concat(Object.keys(TERRAIN.opphomerow))
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
      path: step.path.concat("kill"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selecttower2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      madetowers: step.ARTIFACTS.madetowers,
      madewalls: step.ARTIFACTS.madewalls,
      killtargets: { ...step.ARTIFACTS.killtargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selecttower: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };

      for (let DIR of roseDirs) {
        let walkedsquares = [];
        let MAX = 2;
        let POS = MARKS.selecttower;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);
          LENGTH++;
        }
        let WALKLENGTH = walkedsquares.length;
        let STEP = 0;
        for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;
          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selecttower];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppwalls[POS]) {
          ARTIFACTS.killtargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmove = {
      func: "selectmove2",
      pos: Object.keys(ARTIFACTS.movetargets)
    };

    LINKS.marks.selectkill = {
      func: "selectkill2",
      pos: Object.keys(ARTIFACTS.killtargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selecttower",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmove2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      madetowers: { ...step.ARTIFACTS.madetowers },
      madewalls: { ...step.ARTIFACTS.madewalls },
      killtargets: step.ARTIFACTS.killtargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectmove: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let STARTPOS = MARKS.selectmove;

      let POS =
        connections[STARTPOS][
          relativeDirs[5][
            (ARTIFACTS.movetargets[MARKS.selectmove] || {})["dir"]
          ]
        ];
      if (POS) {
        ARTIFACTS[UNITLAYERS.myunits[POS] ? "madetowers" : "madewalls"][
          POS
        ] = {};
      }

      ARTIFACTS[
        UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
      ][STARTPOS] = {};
    }
    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmove",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkill2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.kill = "kill2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectkill",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectkill: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
}
export default game;
