import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 5, width: 5 });

const emptyArtifactLayers = {
  strandedmusketeers: {},
  musketeerline: {},
  movetargets: {}
};

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
  endedBy?: "musketeersinline" | "strandedmusketeers" | "starvation";
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
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      neutralpawns: oldUnitLayers.neutralpawns,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings
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
      strandedmusketeers: { ...step.ARTIFACTS.strandedmusketeers },
      musketeerline: { ...step.ARTIFACTS.musketeerline },
      movetargets: step.ARTIFACTS.movetargets
    };
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
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
      for (let STARTPOS in UNITLAYERS.kings) {
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          let walkpositionstocount = UNITLAYERS.kings;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (2 === TOTALCOUNT) {
            ARTIFACTS.musketeerline[POS] = {};
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.musketeerline).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "musketeersinline";
      LINKS.endMarks = Object.keys(UNITLAYERS.kings);
    } else if (Object.keys(ARTIFACTS.strandedmusketeers).length === 3) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "strandedmusketeers";
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
      strandedmusketeers: step.ARTIFACTS.strandedmusketeers,
      musketeerline: step.ARTIFACTS.musketeerline,
      movetargets: { ...step.ARTIFACTS.movetargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
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
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      neutralpawns: oldUnitLayers.neutralpawns,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings
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
      unit1: { pos: "a1", x: 1, y: 1, id: "unit1", group: "kings", owner: 1 },
      unit2: { pos: "c3", x: 3, y: 3, id: "unit2", group: "kings", owner: 1 },
      unit3: { pos: "e5", x: 5, y: 5, id: "unit3", group: "kings", owner: 1 },
      unit4: { pos: "a2", x: 1, y: 2, id: "unit4", group: "pawns", owner: 2 },
      unit5: { pos: "a3", x: 1, y: 3, id: "unit5", group: "pawns", owner: 2 },
      unit6: { pos: "a4", x: 1, y: 4, id: "unit6", group: "pawns", owner: 2 },
      unit7: { pos: "a5", x: 1, y: 5, id: "unit7", group: "pawns", owner: 2 },
      unit8: { pos: "b1", x: 2, y: 1, id: "unit8", group: "pawns", owner: 2 },
      unit9: { pos: "b2", x: 2, y: 2, id: "unit9", group: "pawns", owner: 2 },
      unit10: { pos: "b3", x: 2, y: 3, id: "unit10", group: "pawns", owner: 2 },
      unit11: { pos: "b4", x: 2, y: 4, id: "unit11", group: "pawns", owner: 2 },
      unit12: { pos: "b5", x: 2, y: 5, id: "unit12", group: "pawns", owner: 2 },
      unit13: { pos: "c1", x: 3, y: 1, id: "unit13", group: "pawns", owner: 2 },
      unit14: { pos: "c2", x: 3, y: 2, id: "unit14", group: "pawns", owner: 2 },
      unit15: { pos: "c4", x: 3, y: 4, id: "unit15", group: "pawns", owner: 2 },
      unit16: { pos: "c5", x: 3, y: 5, id: "unit16", group: "pawns", owner: 2 },
      unit17: { pos: "d1", x: 4, y: 1, id: "unit17", group: "pawns", owner: 2 },
      unit18: { pos: "d2", x: 4, y: 2, id: "unit18", group: "pawns", owner: 2 },
      unit19: { pos: "d3", x: 4, y: 3, id: "unit19", group: "pawns", owner: 2 },
      unit20: { pos: "d4", x: 4, y: 4, id: "unit20", group: "pawns", owner: 2 },
      unit21: { pos: "d5", x: 4, y: 5, id: "unit21", group: "pawns", owner: 2 },
      unit22: { pos: "e1", x: 5, y: 1, id: "unit22", group: "pawns", owner: 2 },
      unit23: { pos: "e2", x: 5, y: 2, id: "unit23", group: "pawns", owner: 2 },
      unit24: { pos: "e3", x: 5, y: 3, id: "unit24", group: "pawns", owner: 2 },
      unit25: { pos: "e4", x: 5, y: 4, id: "unit25", group: "pawns", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
    let ARTIFACTS = {
      strandedmusketeers: { ...step.ARTIFACTS.strandedmusketeers },
      musketeerline: { ...step.ARTIFACTS.musketeerline },
      movetargets: step.ARTIFACTS.movetargets
    };
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
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {}
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
      for (let STARTPOS in UNITLAYERS.kings) {
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          let walkpositionstocount = UNITLAYERS.kings;
          let CURRENTCOUNT = 0;
          while ((POS = connections[POS][DIR])) {
            CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
          }
          let TOTALCOUNT = CURRENTCOUNT;
          POS = STARTPOS;
          if (2 === TOTALCOUNT) {
            ARTIFACTS.musketeerline[POS] = {};
          }
        }
      }
    }

    for (let STARTPOS in UNITLAYERS.kings) {
      let foundneighbours = [];

      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.pawns[POS]) {
          foundneighbours.push(POS);
        }
      }

      let NEIGHBOURCOUNT = foundneighbours.length;

      if (!NEIGHBOURCOUNT) {
        ARTIFACTS.strandedmusketeers[STARTPOS] = {};
      }
    }

    if (Object.keys(ARTIFACTS.musketeerline).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "musketeersinline";
      LINKS.endMarks = Object.keys(UNITLAYERS.kings);
    } else if (Object.keys(ARTIFACTS.strandedmusketeers).length === 3) {
      let winner = 1;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "strandedmusketeers";
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
      strandedmusketeers: step.ARTIFACTS.strandedmusketeers,
      musketeerline: step.ARTIFACTS.musketeerline,
      movetargets: { ...step.ARTIFACTS.movetargets }
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
