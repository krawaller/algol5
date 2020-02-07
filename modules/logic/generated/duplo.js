import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
const emptyObj = {};
const BOARD = boardLayers({ height: 8, width: 8 });
const iconMapping = { soldiers: "pawn" };
const emptyArtifactLayers = {
  spawndirs: {},
  growstarts: {},
  targets: {},
  potentialopptargets: {},
  spawns: {}
};
const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(8, 8, {});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
const knightDirs = [
  "d1f2r1",
  "d1f2r-1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r1",
  "d5f2r-1",
  "d7f2r1",
  "d7f2r-1"
];
let game = {
  gameId: "duplo",
  action: {},
  instruction: {},
  commands: { deploy: {}, expand: {} },
  iconMap: { soldiers: "pawn" }
};
{
  const groupLayers = {
    soldiers: [
      ["units", "soldiers"],
      ["units", "myunits", "soldiers", "mysoldiers"],
      ["units", "oppunits", "soldiers", "oppsoldiers"]
    ]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    let TURN = step.TURN + 1;
    if (TURN > 1) {
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit1";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectdeploy1";
      }
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    let TURN = step.TURN;
    return TURN > 1
      ? collapseContent({
          line: [{ select: "Select" }, { text: "unit to expand from" }]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to deploy the first of your two initial units" }
          ]
        });
  };
  game.action.deploy1 = step => {
    let LINKS = { marks: {}, commands: {} };
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 1
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 0
            : 2
        ];
        LINKS.endedBy = "boardfull";
      } else {
        LINKS.endTurn = "startTurn2";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectdeploy1";
      }
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID
    };
  };
  game.instruction.deploy1 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? collapseContent({
          line: [
            { text: "Now" },
            { select: "select" },
            { text: "where to deploy your second and last initial unit" }
          ]
        })
      : defaultInstruction(1);
  };
  game.action.expand1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      targets: step.ARTIFACTS.targets,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      spawns: step.ARTIFACTS.spawns
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.spawns) {
      anim.enterFrom[LOOPPOS] = MARKS.selectunit;
    }
    if (UNITLAYERS.units[MARKS.selecttarget]) {
      anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 1]);
    }
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.units).length === 64) {
      LINKS.endGame = ["draw", "win", "lose"][
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 1
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 0
          : 2
      ];
      LINKS.endedBy = "boardfull";
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.expand1 = () => defaultInstruction(1);
  game.action.selectdeploy1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.deploy = "deploy1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdeploy: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID,
      massiveTree: true
    };
  };
  game.instruction.selectdeploy1 = step => {
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
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: {},
      growstarts: {},
      targets: {},
      potentialopptargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
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
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {});
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
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.marks[pos] = "selecttarget1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit1 = step => {
    return { text: "Now select which square to expand to" };
  };
  game.action.selecttarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      targets: step.ARTIFACTS.targets,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      spawns: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selecttarget: newMarkPos
    };
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
        ARTIFACTS.spawns[POS] = emptyObj;
      }
      POS = STARTPOS;
      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS.spawns[POS] = emptyObj;
      }
    }
    LINKS.commands.expand = "expand1";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selecttarget1 = step => {
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
  const groupLayers = {
    soldiers: [
      ["units", "soldiers"],
      ["units", "oppunits", "soldiers", "oppsoldiers"],
      ["units", "myunits", "soldiers", "mysoldiers"]
    ]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    let TURN = step.TURN;
    if (TURN > 1) {
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit2";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectdeploy2";
      }
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let TURN = step.TURN;
    return TURN > 1
      ? collapseContent({
          line: [{ select: "Select" }, { text: "unit to expand from" }]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "where to deploy the first of your two initial units" }
          ]
        });
  };
  game.newBattle = () => {
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA: {},
      UNITLAYERS: {
        units: {},
        myunits: {},
        oppunits: {},
        soldiers: {},
        mysoldiers: {},
        oppsoldiers: {}
      }
    });
  };
  game.action.deploy2 = step => {
    let LINKS = { marks: {}, commands: {} };
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 2
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 0
            : 1
        ];
        LINKS.endedBy = "boardfull";
      } else {
        LINKS.endTurn = "startTurn1";
      }
    } else {
      for (const pos of Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
      )) {
        LINKS.marks[pos] = "selectdeploy2";
      }
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID
    };
  };
  game.instruction.deploy2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? collapseContent({
          line: [
            { text: "Now" },
            { select: "select" },
            { text: "where to deploy your second and last initial unit" }
          ]
        })
      : defaultInstruction(2);
  };
  game.action.expand2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      targets: step.ARTIFACTS.targets,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      spawns: step.ARTIFACTS.spawns
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.spawns) {
      anim.enterFrom[LOOPPOS] = MARKS.selectunit;
    }
    if (UNITLAYERS.units[MARKS.selecttarget]) {
      anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 2]);
    }
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.units).length === 64) {
      LINKS.endGame = ["draw", "lose", "win"][
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 2
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 0
          : 1
      ];
      LINKS.endedBy = "boardfull";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID,
      anim
    };
  };
  game.instruction.expand2 = () => defaultInstruction(2);
  game.action.selectdeploy2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.deploy = "deploy2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdeploy: newMarkPos },
      NEXTSPAWNID: step.NEXTSPAWNID,
      massiveTree: true
    };
  };
  game.instruction.selectdeploy2 = step => {
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
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: {},
      growstarts: {},
      targets: {},
      potentialopptargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
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
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {});
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
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.marks[pos] = "selecttarget2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit2 = step => {
    return { text: "Now select which square to expand to" };
  };
  game.action.selecttarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      spawndirs: step.ARTIFACTS.spawndirs,
      growstarts: step.ARTIFACTS.growstarts,
      targets: step.ARTIFACTS.targets,
      potentialopptargets: step.ARTIFACTS.potentialopptargets,
      spawns: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selecttarget: newMarkPos
    };
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
        ARTIFACTS.spawns[POS] = emptyObj;
      }
      POS = STARTPOS;
      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS.spawns[POS] = emptyObj;
      }
    }
    LINKS.commands.expand = "expand2";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selecttarget2 = step => {
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
