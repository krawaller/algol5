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
const emptyObj = {};
const BOARD = boardLayers({ height: 5, width: 5 });

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
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    soldiers: [
      ["units", "neutralunits"],
      ["units", "myunits"],
      ["units", "oppunits"]
    ],
    markers: [
      ["units", "neutralunits", "markers"],
      ["units", "myunits", "markers"],
      ["units", "oppunits", "markers"]
    ]
  };
  game.action.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      markers: oldUnitLayers.markers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.markers).length === 0
        ? BOARD.board
        : UNITLAYERS.markers
    )) {
      LINKS.actions[pos] = "selectdrop1";
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
  game.instruction.start1 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return Object.keys(UNITLAYERS.neutralunits).length === 0
      ? { text: "Select any square to place the first unit of the game" }
      : { text: "Select which neutral unit to take over" };
  };
  game.action.uphill1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.uphill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.uphill1 = () => defaultInstruction(1);
  game.action.downhill1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.downhill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.downhill1 = () => defaultInstruction(1);
  game.action.horisontal1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.horisontal1 = () => defaultInstruction(1);
  game.action.vertical1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 1
      };
    }
    for (let LOOPPOS in ARTIFACTS.vertical) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions.uphill = "uphill1";
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      LINKS.actions.downhill = "downhill1";
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      LINKS.actions.vertical = "vertical1";
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      LINKS.actions.horisontal = "horisontal1";
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
        { text: "to give your opponent placing options in that direction" }
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [
      ["units", "neutralunits"],
      ["units", "oppunits"],
      ["units", "myunits"]
    ],
    markers: [
      ["units", "neutralunits", "markers"],
      ["units", "oppunits", "markers"],
      ["units", "myunits", "markers"]
    ]
  };
  game.action.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      markers: oldUnitLayers.markers
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(
      Object.keys(UNITLAYERS.markers).length === 0
        ? BOARD.board
        : UNITLAYERS.markers
    )) {
      LINKS.actions[pos] = "selectdrop2";
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
  game.instruction.start2 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return Object.keys(UNITLAYERS.neutralunits).length === 0
      ? { text: "Select any square to place the first unit of the game" }
      : { text: "Select which neutral unit to take over" };
  };
  game.newBattle = () => {
    let UNITDATA = {};

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }

    return game.action.start1({
      NEXTSPAWNID: 1,

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.uphill2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.uphill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.uphill2 = () => defaultInstruction(2);
  game.action.downhill2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.downhill) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.downhill2 = () => defaultInstruction(2);
  game.action.horisontal2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.horisontal) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.instruction.horisontal2 = () => defaultInstruction(2);
  game.action.vertical2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    for (let LOOPPOS in UNITLAYERS.markers) {
      delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdrop,
        id: newunitid,
        group: "soldiers",
        owner: 2
      };
    }
    for (let LOOPPOS in ARTIFACTS.vertical) {
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: LOOPPOS,
          id: newunitid,
          group: "markers",
          owner: 0
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      markers: {}
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
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
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
    let LINKS: AlgolStepLinks = { actions: {} };
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
      LINKS.actions.uphill = "uphill2";
    }
    if (Object.keys(ARTIFACTS.downhill).length !== 0) {
      LINKS.actions.downhill = "downhill2";
    }
    if (Object.keys(ARTIFACTS.vertical).length !== 0) {
      LINKS.actions.vertical = "vertical2";
    }
    if (Object.keys(ARTIFACTS.horisontal).length !== 0) {
      LINKS.actions.horisontal = "horisontal2";
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
        { text: "to give your opponent placing options in that direction" }
      ]
    });
  };
}
export default game as AlgolGame;
