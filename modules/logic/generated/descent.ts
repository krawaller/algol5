import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 4, width: 4 });

const emptyArtifactLayers = { movetargets: {}, digtargets: {}, winline: {} };

const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "madeline" | "starvation";
  commands: {
    move?: "move1" | "move2";
    dig?: "dig1" | "dig2";
  };
  marks: {
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
      pos: string[];
    };
    selectdigtarget?: {
      func: "selectdigtarget1" | "selectdigtarget2";
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
      knights: oldUnitLayers.knights,
      myknights: oldUnitLayers.oppknights,
      oppknights: oldUnitLayers.myknights,
      neutralknights: oldUnitLayers.neutralknights,
      rooks: oldUnitLayers.rooks,
      myrooks: oldUnitLayers.opprooks,
      opprooks: oldUnitLayers.myrooks,
      neutralrooks: oldUnitLayers.neutralrooks
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: { ...step.ARTIFACTS.digtargets },
      winline: step.ARTIFACTS.winline
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    TURNVARS["movedto"] = MARKS.selectmovetarget;
    TURNVARS["heightfrom"] = (UNITLAYERS.units[MARKS.selectunit] || {})[
      "group"
    ];
    TURNVARS["heightto"] = (UNITLAYERS.units[MARKS.selectmovetarget] || {})[
      "group"
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: TURNVARS["heightto"]
        };
      }
    }
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
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectunit,
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
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
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {}
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
      let startconnections = connections[TURNVARS["movedto"]];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS.digtargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectdigtarget = {
      func: "selectdigtarget1",
      pos: Object.keys(ARTIFACTS.digtargets)
    };

    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.dig1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: step.ARTIFACTS.digtargets,
      winline: { ...step.ARTIFACTS.winline }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.pawns[MARKS.selectdigtarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectdigtarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.knights[MARKS.selectdigtarget]
              ? "pawns"
              : "knights"
          };
        }
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
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {}
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
        let allowedsteps = UNITLAYERS.myrooks[STARTPOS]
          ? UNITLAYERS.myrooks
          : UNITLAYERS.myknights[STARTPOS]
          ? UNITLAYERS.myknights
          : UNITLAYERS.mypawns;

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
            if (WALKLENGTH > 2) {
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
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("dig"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      digtargets: step.ARTIFACTS.digtargets,
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (UNITLAYERS.rooks[MARKS.selectunit]
            ? !UNITLAYERS.pawns[POS]
            : UNITLAYERS.pawns[MARKS.selectunit]
            ? !UNITLAYERS.rooks[POS]
            : true)
        ) {
          if (UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS.movetargets[POS] = {};
          }
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
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
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
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdigtarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.dig = "dig1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdigtarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdigtarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
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
      knights: oldUnitLayers.knights,
      myknights: oldUnitLayers.oppknights,
      oppknights: oldUnitLayers.myknights,
      neutralknights: oldUnitLayers.neutralknights,
      rooks: oldUnitLayers.rooks,
      myrooks: oldUnitLayers.opprooks,
      opprooks: oldUnitLayers.myrooks,
      neutralrooks: oldUnitLayers.neutralrooks
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
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: { pos: "a2", x: 1, y: 2, id: "unit1", group: "rooks", owner: 0 },
      unit2: { pos: "a3", x: 1, y: 3, id: "unit2", group: "rooks", owner: 0 },
      unit3: { pos: "b2", x: 2, y: 2, id: "unit3", group: "rooks", owner: 0 },
      unit4: { pos: "b3", x: 2, y: 3, id: "unit4", group: "rooks", owner: 0 },
      unit5: { pos: "c2", x: 3, y: 2, id: "unit5", group: "rooks", owner: 0 },
      unit6: { pos: "c3", x: 3, y: 3, id: "unit6", group: "rooks", owner: 0 },
      unit7: { pos: "d2", x: 4, y: 2, id: "unit7", group: "rooks", owner: 0 },
      unit8: { pos: "d3", x: 4, y: 3, id: "unit8", group: "rooks", owner: 0 },
      unit9: { pos: "b4", x: 2, y: 4, id: "unit9", group: "rooks", owner: 0 },
      unit10: { pos: "c1", x: 3, y: 1, id: "unit10", group: "rooks", owner: 0 },
      unit11: { pos: "a1", x: 1, y: 1, id: "unit11", group: "rooks", owner: 1 },
      unit12: { pos: "c4", x: 3, y: 4, id: "unit12", group: "rooks", owner: 1 },
      unit13: { pos: "d1", x: 4, y: 1, id: "unit13", group: "rooks", owner: 1 },
      unit14: { pos: "a4", x: 1, y: 4, id: "unit14", group: "rooks", owner: 2 },
      unit15: { pos: "b1", x: 2, y: 1, id: "unit15", group: "rooks", owner: 2 },
      unit16: { pos: "d4", x: 4, y: 4, id: "unit16", group: "rooks", owner: 2 }
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
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {}
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

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: { ...step.ARTIFACTS.digtargets },
      winline: step.ARTIFACTS.winline
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    TURNVARS["movedto"] = MARKS.selectmovetarget;
    TURNVARS["heightfrom"] = (UNITLAYERS.units[MARKS.selectunit] || {})[
      "group"
    ];
    TURNVARS["heightto"] = (UNITLAYERS.units[MARKS.selectmovetarget] || {})[
      "group"
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: TURNVARS["heightto"]
        };
      }
    }
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
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectunit,
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
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
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {}
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
      let startconnections = connections[TURNVARS["movedto"]];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS.digtargets[POS] = {};
        }
      }
    }
    LINKS.marks.selectdigtarget = {
      func: "selectdigtarget2",
      pos: Object.keys(ARTIFACTS.digtargets)
    };

    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.dig2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: step.ARTIFACTS.digtargets,
      winline: { ...step.ARTIFACTS.winline }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.pawns[MARKS.selectdigtarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectdigtarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.knights[MARKS.selectdigtarget]
              ? "pawns"
              : "knights"
          };
        }
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
      knights: {},
      myknights: {},
      oppknights: {},
      neutralknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {},
      neutralrooks: {}
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
        let allowedsteps = UNITLAYERS.myrooks[STARTPOS]
          ? UNITLAYERS.myrooks
          : UNITLAYERS.myknights[STARTPOS]
          ? UNITLAYERS.myknights
          : UNITLAYERS.mypawns;

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
            if (WALKLENGTH > 2) {
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
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("dig"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      digtargets: step.ARTIFACTS.digtargets,
      winline: step.ARTIFACTS.winline
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (UNITLAYERS.rooks[MARKS.selectunit]
            ? !UNITLAYERS.pawns[POS]
            : UNITLAYERS.pawns[MARKS.selectunit]
            ? !UNITLAYERS.rooks[POS]
            : true)
        ) {
          if (UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS.movetargets[POS] = {};
          }
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
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
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
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdigtarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.dig = "dig2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdigtarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdigtarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
}
export default game;
