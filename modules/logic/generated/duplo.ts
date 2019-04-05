import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 8, width: 8 });

const emptyArtifactLayers = {
  spawndirs: {},
  growstarts: {},
  targets: {},
  potentialopptargets: {},
  spawns: {}
};

const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "boardfull" | "starvation";
  commands: {
    deploy?: "deploy1" | "deploy2";
    expand?: "expand1" | "expand2";
  };
  marks: {
    selectdeploy?: { func: "selectdeploy1" | "selectdeploy2"; pos: string[] };
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selecttarget?: { func: "selecttarget1" | "selecttarget2"; pos: string[] };
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
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };
    let TURN = step.TURN + 1;
    if (TURN > 2) {
      LINKS.marks.selectunit = {
        func: "selectunit1",
        pos: Object.keys(UNITLAYERS.myunits)
      };
    } else {
      LINKS.marks.selectdeploy = {
        func: "selectdeploy1",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start1instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? { text: "Select unit to expand from" }
      : { text: "Select where to deploy the first of your two initial units" };
  };
  game.deploy1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploy,
        id: newunitid,
        group: "soldiers",
        owner: 1
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        let winner =
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 1
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 2
            : 0;
        LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
        LINKS.endedBy = "boardfull";
      } else {
        LINKS.endturn = "start2";
      }
    } else {
      LINKS.marks.selectdeploy = {
        func: "selectdeploy1",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.deploy1instruction = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return Object.keys(UNITLAYERS.myunits).length === 1
      ? { text: "Now select where to deploy your second and last initial unit" }
      : undefined;
  };
  game.expand1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      targets: step.ARTIFACTS.targets,
      spawns: step.ARTIFACTS.spawns
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.spawns) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 1,
          from: MARKS.selectunit
        };
      }
    }
    if (UNITLAYERS.units[MARKS.selecttarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "soldiers",
          owner: 0,
          from: MARKS.selectunit
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
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (Object.keys(UNITLAYERS.units).length === 64) {
      let winner =
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 1
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 2
          : 0;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "boardfull";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("expand"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.selectdeploy1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeploy",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeploy: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploy1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place your" },
        Object.keys(UNITLAYERS.myunits).length === 1
          ? { text: "second" }
          : { text: "first" },
        { text: "unit at" },
        { pos: MARKS.selectdeploy }
      ]
    });
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: { ...step.ARTIFACTS.spawndirs },
      growstarts: { ...step.ARTIFACTS.growstarts },
      potentialopptargets: { ...step.ARTIFACTS.potentialopptargets },
      targets: { ...step.ARTIFACTS.targets },
      spawns: step.ARTIFACTS.spawns
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS) {
          if (!UNITLAYERS.myunits[POS]) {
            ARTIFACTS.spawndirs[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;

      for (let STARTPOS in ARTIFACTS.spawndirs) {
        let DIR = relativeDirs[(ARTIFACTS.spawndirs[STARTPOS] || {}).dir][5];
        let walkedsquares = [];
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        POS = STARTPOS;
        ARTIFACTS.growstarts[POS] = {
          dir: relativeDirs[DIR][5],
          strength: WALKLENGTH
        };
      }
    }
    {
      let allowedsteps = Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: {} }), {});
      let BLOCKS = UNITLAYERS.oppunits;

      for (let STARTPOS in ARTIFACTS.growstarts) {
        let DIR = (ARTIFACTS.growstarts[STARTPOS] || {}).dir;
        let MAX = (ARTIFACTS.growstarts[STARTPOS] || {}).strength;
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let LENGTH = 0;
        let STEP = 0;
        while (
          LENGTH < MAX &&
          (POS = connections[POS][DIR]) &&
          !BLOCKS[POS] &&
          allowedsteps[POS]
        ) {
          LENGTH++;
          STEP++;
          if (STEP === MAX) {
            ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
          }
        }
        if (BLOCKS[POS]) {
          ARTIFACTS.potentialopptargets[POS] = { dir: DIR, strength: MAX };
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.oppunits;

      for (let STARTPOS in ARTIFACTS.potentialopptargets) {
        let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).dir;
        let STOPREASON = "";
        let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).strength;
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let LENGTH = 0;
        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;
        }
        POS = STARTPOS;
        if (STOPREASON !== "reachedmax") {
          ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
        }
      }
    }

    LINKS.marks.selecttarget = {
      func: "selecttarget1",
      pos: Object.keys(ARTIFACTS.targets)
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

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit1instruction = step => {
    return { text: "Now select which square to expand to" };
  };
  game.selecttarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      targets: step.ARTIFACTS.targets,
      spawns: { ...step.ARTIFACTS.spawns }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selecttarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      let STARTPOS = MARKS.selecttarget;

      let POS = STARTPOS;
      while (
        (POS =
          connections[POS][
            (ARTIFACTS.targets[MARKS.selecttarget] || {}).dir
          ]) &&
        !BLOCKS[POS]
      ) {
        ARTIFACTS.spawns[POS] = {};
      }
      POS = STARTPOS;
      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS.spawns[POS] = {};
      }
    }
    LINKS.commands.expand = "expand1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selecttarget",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selecttarget1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "expand" },
        { text: "to expand from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selecttarget },
        UNITLAYERS.units[MARKS.selecttarget]
          ? { text: "and neutralise the enemy there" }
          : undefined
      ]
    });
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
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };
    let TURN = step.TURN + 1;
    if (TURN > 2) {
      LINKS.marks.selectunit = {
        func: "selectunit2",
        pos: Object.keys(UNITLAYERS.myunits)
      };
    } else {
      LINKS.marks.selectdeploy = {
        func: "selectdeploy2",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start2instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? { text: "Select unit to expand from" }
      : { text: "Select where to deploy the first of your two initial units" };
  };
  game.newBattle = () => {
    let UNITDATA = {};

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
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
  game.deploy2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploy,
        id: newunitid,
        group: "soldiers",
        owner: 2
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        let winner =
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 2
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 1
            : 0;
        LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
        LINKS.endedBy = "boardfull";
      } else {
        LINKS.endturn = "start1";
      }
    } else {
      LINKS.marks.selectdeploy = {
        func: "selectdeploy2",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.deploy2instruction = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return Object.keys(UNITLAYERS.myunits).length === 1
      ? { text: "Now select where to deploy your second and last initial unit" }
      : undefined;
  };
  game.expand2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      targets: step.ARTIFACTS.targets,
      spawns: step.ARTIFACTS.spawns
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.spawns) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 2,
          from: MARKS.selectunit
        };
      }
    }
    if (UNITLAYERS.units[MARKS.selecttarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selecttarget,
          id: newunitid,
          group: "soldiers",
          owner: 0,
          from: MARKS.selectunit
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
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (Object.keys(UNITLAYERS.units).length === 64) {
      let winner =
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 2
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 1
          : 0;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "boardfull";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("expand"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.selectdeploy2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeploy",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeploy: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploy2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place your" },
        Object.keys(UNITLAYERS.myunits).length === 1
          ? { text: "second" }
          : { text: "first" },
        { text: "unit at" },
        { pos: MARKS.selectdeploy }
      ]
    });
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: { ...step.ARTIFACTS.spawndirs },
      growstarts: { ...step.ARTIFACTS.growstarts },
      potentialopptargets: { ...step.ARTIFACTS.potentialopptargets },
      targets: { ...step.ARTIFACTS.targets },
      spawns: step.ARTIFACTS.spawns
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS) {
          if (!UNITLAYERS.myunits[POS]) {
            ARTIFACTS.spawndirs[POS] = { dir: DIR };
          }
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;

      for (let STARTPOS in ARTIFACTS.spawndirs) {
        let DIR = relativeDirs[(ARTIFACTS.spawndirs[STARTPOS] || {}).dir][5];
        let walkedsquares = [];
        let POS = STARTPOS;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        POS = STARTPOS;
        ARTIFACTS.growstarts[POS] = {
          dir: relativeDirs[DIR][5],
          strength: WALKLENGTH
        };
      }
    }
    {
      let allowedsteps = Object.keys(BOARD.board)
        .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
        .reduce((m, k) => ({ ...m, [k]: {} }), {});
      let BLOCKS = UNITLAYERS.oppunits;

      for (let STARTPOS in ARTIFACTS.growstarts) {
        let DIR = (ARTIFACTS.growstarts[STARTPOS] || {}).dir;
        let MAX = (ARTIFACTS.growstarts[STARTPOS] || {}).strength;
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let LENGTH = 0;
        let STEP = 0;
        while (
          LENGTH < MAX &&
          (POS = connections[POS][DIR]) &&
          !BLOCKS[POS] &&
          allowedsteps[POS]
        ) {
          LENGTH++;
          STEP++;
          if (STEP === MAX) {
            ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
          }
        }
        if (BLOCKS[POS]) {
          ARTIFACTS.potentialopptargets[POS] = { dir: DIR, strength: MAX };
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.oppunits;

      for (let STARTPOS in ARTIFACTS.potentialopptargets) {
        let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).dir;
        let STOPREASON = "";
        let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).strength;
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let LENGTH = 0;
        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;
        }
        POS = STARTPOS;
        if (STOPREASON !== "reachedmax") {
          ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
        }
      }
    }

    LINKS.marks.selecttarget = {
      func: "selecttarget2",
      pos: Object.keys(ARTIFACTS.targets)
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

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit2instruction = step => {
    return { text: "Now select which square to expand to" };
  };
  game.selecttarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      targets: step.ARTIFACTS.targets,
      spawns: { ...step.ARTIFACTS.spawns }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selecttarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      let STARTPOS = MARKS.selecttarget;

      let POS = STARTPOS;
      while (
        (POS =
          connections[POS][
            (ARTIFACTS.targets[MARKS.selecttarget] || {}).dir
          ]) &&
        !BLOCKS[POS]
      ) {
        ARTIFACTS.spawns[POS] = {};
      }
      POS = STARTPOS;
      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS.spawns[POS] = {};
      }
    }
    LINKS.commands.expand = "expand2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selecttarget",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selecttarget2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "expand" },
        { text: "to expand from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selecttarget },
        UNITLAYERS.units[MARKS.selecttarget]
          ? { text: "and neutralise the enemy there" }
          : undefined
      ]
    });
  };
}
export default game;
