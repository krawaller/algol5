const {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} = require("/Users/davidwaller/gitreps/algol5/modules/common");

const BOARD = boardLayers({ height: 5, width: 5 });

const emptyArtifactLayers = { movetargets: {}, winline: {} };

const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "madewinline" | "starvation";
  commands: {
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
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens
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
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {}
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
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.mykings[STARTPOS]
          ? UNITLAYERS.mykings
          : UNITLAYERS.myqueens;

        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 3) {
              ARTIFACTS.winline[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madewinline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
      UNITLAYERS
    };
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(ARTIFACTS.movetargets)
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

    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens
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
      unit1: { pos: "a2", x: 1, y: 2, id: "unit1", group: "kings", owner: 1 },
      unit2: { pos: "c5", x: 3, y: 5, id: "unit2", group: "kings", owner: 1 },
      unit3: { pos: "e2", x: 5, y: 2, id: "unit3", group: "kings", owner: 1 },
      unit4: { pos: "b1", x: 2, y: 1, id: "unit4", group: "kings", owner: 2 },
      unit5: { pos: "b5", x: 2, y: 5, id: "unit5", group: "kings", owner: 2 },
      unit6: { pos: "e3", x: 5, y: 3, id: "unit6", group: "kings", owner: 2 },
      unit7: { pos: "a3", x: 1, y: 3, id: "unit7", group: "queens", owner: 1 },
      unit8: { pos: "d5", x: 4, y: 5, id: "unit8", group: "queens", owner: 1 },
      unit9: { pos: "d1", x: 4, y: 1, id: "unit9", group: "queens", owner: 1 },
      unit10: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit10",
        group: "queens",
        owner: 2
      },
      unit11: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit11",
        group: "queens",
        owner: 2
      },
      unit12: { pos: "e4", x: 5, y: 4, id: "unit12", group: "queens", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {}
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
      turn: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
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
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {}
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
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.mykings[STARTPOS]
          ? UNITLAYERS.mykings
          : UNITLAYERS.myqueens;

        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH === 3) {
              ARTIFACTS.winline[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madewinline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
      UNITLAYERS
    };
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && !UNITLAYERS.units[POS]) {
          ARTIFACTS.movetargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(ARTIFACTS.movetargets)
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

    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos }
    };
  };
}
export default game;
