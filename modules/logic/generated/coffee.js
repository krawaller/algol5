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
const emptyObj = {};
const BOARD = boardLayers({ height: 5, width: 5 });
const iconMapping = { soldiers: "pawn" };
const emptyArtifactLayers = {
  FOOBAR: {},
  vertical: {},
  uphill: {},
  horisontal: {},
  downhill: {},
  winline: {}
};
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(5, 5, {});
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
let game = { gameId: "coffee", action: {}, instruction: {} };
{
  const groupLayers = {
    soldiers: [
      ["units", "neutralunits", "soldiers"],
      ["units", "myunits", "soldiers"],
      ["units", "oppunits", "soldiers"]
    ]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.neutralunits).length === 0
        ? BOARD.board
        : UNITLAYERS.neutralunits
    )) {
      LINKS.marks[pos] = "selectdrop1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.neutralunits).length === 0
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "any square to place the first" },
            { unittype: ["pawn", 1] },
            { text: "of the game" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["pawn", 0] },
            { text: "to turn into" },
            { unittype: ["pawn", 1] }
          ]
        });
  };
  game.action.uphill1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.uphill) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 1
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.uphill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.uphill1 = () => defaultInstruction(1);
  game.action.downhill1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.downhill) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 1
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.downhill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.downhill1 = () => defaultInstruction(1);
  game.action.horisontal1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 1
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.horisontal1 = () => defaultInstruction(1);
  game.action.vertical1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.vertical) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 1
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.vertical) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.vertical1 = () => defaultInstruction(1);
  game.action.selectdrop1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      FOOBAR: {},
      vertical: {},
      uphill: {},
      horisontal: {},
      downhill: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectdrop: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of roseDirs) {
        let POS = MARKS.selectdrop;
        while ((POS = connections[POS][DIR])) {
          if (!UNITLAYERS.units[POS]) {
            ARTIFACTS[
              [
                "FOOBAR",
                "vertical",
                "uphill",
                "horisontal",
                "downhill",
                "vertical",
                "uphill",
                "horisontal",
                "downhill"
              ][DIR]
            ][POS] = emptyObj;
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.uphill).length !== 0) {
      LINKS.commands.uphill = "uphill1";
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      LINKS.commands.downhill = "downhill1";
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      LINKS.commands.vertical = "vertical1";
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      LINKS.commands.horisontal = "horisontal1";
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
  game.instruction.selectdrop1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseContent({
      line: [
        { text: "Press" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.uphill).length !== 0
              ? { command: "uphill" }
              : undefined,
            Object.keys(ARTIFACTS.downhill).length !== 0
              ? { command: "downhill" }
              : undefined,
            Object.keys(ARTIFACTS.vertical).length !== 0
              ? { command: "vertical" }
              : undefined,
            Object.keys(ARTIFACTS.horisontal).length !== 0
              ? { command: "horisontal" }
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
        }),
        { text: "to give" },
        { player: 2 },
        { text: "placing options in that direction" }
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [
      ["units", "neutralunits", "soldiers"],
      ["units", "oppunits", "soldiers"],
      ["units", "myunits", "soldiers"]
    ]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      soldiers: oldUnitLayers.soldiers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.neutralunits).length === 0
        ? BOARD.board
        : UNITLAYERS.neutralunits
    )) {
      LINKS.marks[pos] = "selectdrop2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.neutralunits).length === 0
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "any square to place the first" },
            { unittype: ["pawn", 2] },
            { text: "of the game" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { unittype: ["pawn", 0] },
            { text: "to turn into" },
            { unittype: ["pawn", 2] }
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
        neutralunits: {},
        soldiers: {}
      }
    });
  };
  game.action.uphill2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.uphill) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 2
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.uphill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.uphill2 = () => defaultInstruction(2);
  game.action.downhill2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.downhill) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 2
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.downhill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.downhill2 = () => defaultInstruction(2);
  game.action.horisontal2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 2
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.horisontal2 = () => defaultInstruction(2);
  game.action.vertical2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
    let ARTIFACTS = {
      FOOBAR: step.ARTIFACTS.FOOBAR,
      vertical: step.ARTIFACTS.vertical,
      uphill: step.ARTIFACTS.uphill,
      horisontal: step.ARTIFACTS.horisontal,
      downhill: step.ARTIFACTS.downhill,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    for (let LOOPPOS in ARTIFACTS.vertical) {
      anim.enterFrom[LOOPPOS] = MARKS.selectdrop;
    }
    for (let LOOPPOS in Object.keys(UNITLAYERS.neutralunits)
      .filter(k => k !== MARKS.selectdrop)
      .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    if (!UNITLAYERS.units[MARKS.selectdrop]) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdrop,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdrop] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 2
          };
        }
      }
    }
    for (let LOOPPOS in ARTIFACTS.vertical) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "soldiers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      soldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;
      for (let STARTPOS in UNITLAYERS.myunits) {
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
            if (4 === WALKLENGTH) {
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
  game.instruction.vertical2 = () => defaultInstruction(2);
  game.action.selectdrop2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      FOOBAR: {},
      vertical: {},
      uphill: {},
      horisontal: {},
      downhill: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectdrop: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of roseDirs) {
        let POS = MARKS.selectdrop;
        while ((POS = connections[POS][DIR])) {
          if (!UNITLAYERS.units[POS]) {
            ARTIFACTS[
              [
                "FOOBAR",
                "vertical",
                "uphill",
                "horisontal",
                "downhill",
                "vertical",
                "uphill",
                "horisontal",
                "downhill"
              ][DIR]
            ][POS] = emptyObj;
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.uphill).length !== 0) {
      LINKS.commands.uphill = "uphill2";
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      LINKS.commands.downhill = "downhill2";
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      LINKS.commands.vertical = "vertical2";
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      LINKS.commands.horisontal = "horisontal2";
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
  game.instruction.selectdrop2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    return collapseContent({
      line: [
        { text: "Press" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.uphill).length !== 0
              ? { command: "uphill" }
              : undefined,
            Object.keys(ARTIFACTS.downhill).length !== 0
              ? { command: "downhill" }
              : undefined,
            Object.keys(ARTIFACTS.vertical).length !== 0
              ? { command: "vertical" }
              : undefined,
            Object.keys(ARTIFACTS.horisontal).length !== 0
              ? { command: "horisontal" }
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
        }),
        { text: "to give" },
        { player: 1 },
        { text: "placing options in that direction" }
      ]
    });
  };
}
export default game;
