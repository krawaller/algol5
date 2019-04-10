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

const emptyArtifactLayers = {
  targetedgepoints: {},
  squishsouth: {},
  squishwest: {},
  squishnorth: {},
  squisheast: {},
  pushsouth: {},
  pushwest: {},
  pushnorth: {},
  pusheast: {},
  spawnsouth: {},
  spawnwest: {},
  spawnnorth: {},
  spawneast: {},
  fourinarow: {}
};

const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {
  southedge: {
    a1: { pos: "a1", x: 1, y: 1 },
    b1: { pos: "b1", x: 2, y: 1 },
    c1: { pos: "c1", x: 3, y: 1 },
    d1: { pos: "d1", x: 4, y: 1 }
  },
  northedge: {
    a4: { pos: "a4", x: 1, y: 4 },
    b4: { pos: "b4", x: 2, y: 4 },
    c4: { pos: "c4", x: 3, y: 4 },
    d4: { pos: "d4", x: 4, y: 4 }
  },
  westedge: {
    a1: { pos: "a1", x: 1, y: 1 },
    a2: { pos: "a2", x: 1, y: 2 },
    a3: { pos: "a3", x: 1, y: 3 },
    a4: { pos: "a4", x: 1, y: 4 }
  },
  eastedge: {
    d1: { pos: "d1", x: 4, y: 1 },
    d2: { pos: "d2", x: 4, y: 2 },
    d3: { pos: "d3", x: 4, y: 3 },
    d4: { pos: "d4", x: 4, y: 4 }
  },
  edge: {
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
  },
  nosouthedge: {
    a2: { pos: "a2", x: 1, y: 2 },
    a3: { pos: "a3", x: 1, y: 3 },
    a4: { pos: "a4", x: 1, y: 4 },
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    b4: { pos: "b4", x: 2, y: 4 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 },
    c4: { pos: "c4", x: 3, y: 4 },
    d2: { pos: "d2", x: 4, y: 2 },
    d3: { pos: "d3", x: 4, y: 3 },
    d4: { pos: "d4", x: 4, y: 4 }
  },
  nonorthedge: {
    a1: { pos: "a1", x: 1, y: 1 },
    a2: { pos: "a2", x: 1, y: 2 },
    a3: { pos: "a3", x: 1, y: 3 },
    b1: { pos: "b1", x: 2, y: 1 },
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    c1: { pos: "c1", x: 3, y: 1 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 },
    d1: { pos: "d1", x: 4, y: 1 },
    d2: { pos: "d2", x: 4, y: 2 },
    d3: { pos: "d3", x: 4, y: 3 }
  },
  nowestedge: {
    b1: { pos: "b1", x: 2, y: 1 },
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    b4: { pos: "b4", x: 2, y: 4 },
    c1: { pos: "c1", x: 3, y: 1 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 },
    c4: { pos: "c4", x: 3, y: 4 },
    d1: { pos: "d1", x: 4, y: 1 },
    d2: { pos: "d2", x: 4, y: 2 },
    d3: { pos: "d3", x: 4, y: 3 },
    d4: { pos: "d4", x: 4, y: 4 }
  },
  noeastedge: {
    a1: { pos: "a1", x: 1, y: 1 },
    a2: { pos: "a2", x: 1, y: 2 },
    a3: { pos: "a3", x: 1, y: 3 },
    a4: { pos: "a4", x: 1, y: 4 },
    b1: { pos: "b1", x: 2, y: 1 },
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    b4: { pos: "b4", x: 2, y: 4 },
    c1: { pos: "c1", x: 3, y: 1 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 },
    c4: { pos: "c4", x: 3, y: 4 }
  },
  noedge: {
    b2: { pos: "b2", x: 2, y: 2 },
    b3: { pos: "b3", x: 2, y: 3 },
    c2: { pos: "c2", x: 3, y: 2 },
    c3: { pos: "c3", x: 3, y: 3 }
  }
};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const ownerNames = ["neutral", "my", "opp"];
  game.action.start1 = step => {
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(TERRAIN.edge)) {
      LINKS.actions[pos] = "selectpushpoint1";
    }

    const oldUnitLayers = step.UNITLAYERS;
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS: {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      },
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.start1 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select where to shove in" },
        Object.keys(UNITLAYERS.myunits).length === 7
          ? { text: "your last off-board unit" }
          : Object.keys(UNITLAYERS.myunits).length === 8
          ? { text: "a neutral unit" }
          : collapseContent({
              line: [
                { text: "one of your" },
                { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                { text: "remaining off-board units" }
              ]
            })
      ]
    });
  };
  game.action.north1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushnorth) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 1, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnnorth)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 1 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.north1 = () => defaultInstruction(1);
  game.action.south1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushsouth) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 5, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnsouth)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 1 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.south1 = () => defaultInstruction(1);
  game.action.east1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pusheast) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 3, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawneast)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 1 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.east1 = () => defaultInstruction(1);
  game.action.west1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushwest) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 7, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnwest)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 1 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.west1 = () => defaultInstruction(1);
  game.action.selectpushpoint1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targetedgepoints: { ...step.ARTIFACTS.targetedgepoints },
      squishsouth: { ...step.ARTIFACTS.squishsouth },
      squishwest: { ...step.ARTIFACTS.squishwest },
      squishnorth: { ...step.ARTIFACTS.squishnorth },
      squisheast: { ...step.ARTIFACTS.squisheast },
      pushsouth: { ...step.ARTIFACTS.pushsouth },
      pushwest: { ...step.ARTIFACTS.pushwest },
      pushnorth: { ...step.ARTIFACTS.pushnorth },
      pusheast: { ...step.ARTIFACTS.pusheast },
      spawnsouth: { ...step.ARTIFACTS.spawnsouth },
      spawnwest: { ...step.ARTIFACTS.spawnwest },
      spawnnorth: { ...step.ARTIFACTS.spawnnorth },
      spawneast: { ...step.ARTIFACTS.spawneast },
      fourinarow: step.ARTIFACTS.fourinarow
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectpushpoint: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of orthoDirs) {
        let walkedsquares = [];
        let POS = MARKS.selectpushpoint;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if (
            WALKLENGTH === 3 &&
            !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]
          ) {
            ARTIFACTS.targetedgepoints[walkedsquares[WALKLENGTH - 1]] = {
              dir: relativeDirs[DIR][5]
            };
          }
        }
      }
    }
    {
      for (let STARTPOS in ARTIFACTS.targetedgepoints) {
        let DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {}).dir;
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let STEP = 0;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
          STEP++;
          if (STEP !== 1) {
            ARTIFACTS[
              DIR === 1
                ? "pushsouth"
                : DIR === 3
                ? "pushwest"
                : DIR === 5
                ? "pushnorth"
                : "pusheast"
            ][POS] = {};
          }
        }
        let WALKLENGTH = walkedsquares.length;
        POS = STARTPOS;
        ARTIFACTS[
          DIR === 1
            ? "squishsouth"
            : DIR === 3
            ? "squishwest"
            : DIR === 5
            ? "squishnorth"
            : "squisheast"
        ][POS] = {};
        if (WALKLENGTH) {
          ARTIFACTS[
            DIR === 1
              ? "spawnsouth"
              : DIR === 3
              ? "spawnwest"
              : DIR === 5
              ? "spawnnorth"
              : "spawneast"
          ][walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
      LINKS.actions.south = "south1";
    }
    if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
      LINKS.actions.north = "north1";
    }
    if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
      LINKS.actions.west = "west1";
    }
    if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
      LINKS.actions.east = "east1";
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
  game.instruction.selectpushpoint1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.spawnsouth).length !== 0
              ? { command: "south" }
              : undefined,
            Object.keys(ARTIFACTS.spawnnorth).length !== 0
              ? { command: "north" }
              : undefined,
            Object.keys(ARTIFACTS.spawnwest).length !== 0
              ? { command: "west" }
              : undefined,
            Object.keys(ARTIFACTS.spawneast).length !== 0
              ? { command: "east" }
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
        {
          text: "to shove in that direction and make room for the new unit at"
        },
        { pos: MARKS.selectpushpoint }
      ]
    });
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  game.action.start2 = step => {
    let LINKS: AlgolStepLinks = {
      actions: {}
    };

    for (const pos of Object.keys(TERRAIN.edge)) {
      LINKS.actions[pos] = "selectpushpoint2";
    }

    const oldUnitLayers = step.UNITLAYERS;
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS: {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        neutralunits: oldUnitLayers.neutralunits,
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        neutralsoldiers: oldUnitLayers.neutralsoldiers
      },
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.start2 = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select where to shove in" },
        Object.keys(UNITLAYERS.myunits).length === 7
          ? { text: "your last off-board unit" }
          : Object.keys(UNITLAYERS.myunits).length === 8
          ? { text: "a neutral unit" }
          : collapseContent({
              line: [
                { text: "one of your" },
                { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                { text: "remaining off-board units" }
              ]
            })
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
        owner: 0
      },
      unit2: {
        pos: "a2",
        x: 1,
        y: 2,
        id: "unit2",
        group: "soldiers",
        owner: 0
      },
      unit3: {
        pos: "a3",
        x: 1,
        y: 3,
        id: "unit3",
        group: "soldiers",
        owner: 0
      },
      unit4: {
        pos: "a4",
        x: 1,
        y: 4,
        id: "unit4",
        group: "soldiers",
        owner: 0
      },
      unit5: {
        pos: "b1",
        x: 2,
        y: 1,
        id: "unit5",
        group: "soldiers",
        owner: 0
      },
      unit6: {
        pos: "b2",
        x: 2,
        y: 2,
        id: "unit6",
        group: "soldiers",
        owner: 0
      },
      unit7: {
        pos: "b3",
        x: 2,
        y: 3,
        id: "unit7",
        group: "soldiers",
        owner: 0
      },
      unit8: {
        pos: "b4",
        x: 2,
        y: 4,
        id: "unit8",
        group: "soldiers",
        owner: 0
      },
      unit9: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit9",
        group: "soldiers",
        owner: 0
      },
      unit10: {
        pos: "c2",
        x: 3,
        y: 2,
        id: "unit10",
        group: "soldiers",
        owner: 0
      },
      unit11: {
        pos: "c3",
        x: 3,
        y: 3,
        id: "unit11",
        group: "soldiers",
        owner: 0
      },
      unit12: {
        pos: "c4",
        x: 3,
        y: 4,
        id: "unit12",
        group: "soldiers",
        owner: 0
      },
      unit13: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit13",
        group: "soldiers",
        owner: 0
      },
      unit14: {
        pos: "d2",
        x: 4,
        y: 2,
        id: "unit14",
        group: "soldiers",
        owner: 0
      },
      unit15: {
        pos: "d3",
        x: 4,
        y: 3,
        id: "unit15",
        group: "soldiers",
        owner: 0
      },
      unit16: {
        pos: "d4",
        x: 4,
        y: 4,
        id: "unit16",
        group: "soldiers",
        owner: 0
      }
    };

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

    return game.action.start1({
      NEXTSPAWNID: 1,

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.north2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushnorth) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 1, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnnorth)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 2 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.north2 = () => defaultInstruction(2);
  game.action.south2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushsouth) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 5, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnsouth)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 2 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.south2 = () => defaultInstruction(2);
  game.action.east2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pusheast) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 3, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawneast)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 2 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.east2 = () => defaultInstruction(2);
  game.action.west2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let ARTIFACTS = {
      targetedgepoints: step.ARTIFACTS.targetedgepoints,
      squishsouth: step.ARTIFACTS.squishsouth,
      squishwest: step.ARTIFACTS.squishwest,
      squishnorth: step.ARTIFACTS.squishnorth,
      squisheast: step.ARTIFACTS.squisheast,
      pushsouth: step.ARTIFACTS.pushsouth,
      pushwest: step.ARTIFACTS.pushwest,
      pushnorth: step.ARTIFACTS.pushnorth,
      pusheast: step.ARTIFACTS.pusheast,
      spawnsouth: step.ARTIFACTS.spawnsouth,
      spawnwest: step.ARTIFACTS.spawnwest,
      spawnnorth: step.ARTIFACTS.spawnnorth,
      spawneast: step.ARTIFACTS.spawneast,
      fourinarow: { ...step.ARTIFACTS.fourinarow }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]] || {}).id
    ];
    for (let LOOPPOS in ARTIFACTS.pushwest) {
      {
        let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: <string>offsetPos(LOOPPOS, 7, 1, 0, { height: 4, width: 4 })
          };
        }
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: Object.keys(ARTIFACTS.spawnwest)[0],
        id: newunitid,
        group: "soldiers",
        owner: 8 > Object.keys(UNITLAYERS.myunits).length ? 2 : 0
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.fourinarow).length !== 0) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
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
  game.instruction.west2 = () => defaultInstruction(2);
  game.action.selectpushpoint2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targetedgepoints: { ...step.ARTIFACTS.targetedgepoints },
      squishsouth: { ...step.ARTIFACTS.squishsouth },
      squishwest: { ...step.ARTIFACTS.squishwest },
      squishnorth: { ...step.ARTIFACTS.squishnorth },
      squisheast: { ...step.ARTIFACTS.squisheast },
      pushsouth: { ...step.ARTIFACTS.pushsouth },
      pushwest: { ...step.ARTIFACTS.pushwest },
      pushnorth: { ...step.ARTIFACTS.pushnorth },
      pusheast: { ...step.ARTIFACTS.pusheast },
      spawnsouth: { ...step.ARTIFACTS.spawnsouth },
      spawnwest: { ...step.ARTIFACTS.spawnwest },
      spawnnorth: { ...step.ARTIFACTS.spawnnorth },
      spawneast: { ...step.ARTIFACTS.spawneast },
      fourinarow: step.ARTIFACTS.fourinarow
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectpushpoint: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      for (let DIR of orthoDirs) {
        let walkedsquares = [];
        let POS = MARKS.selectpushpoint;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
        }
        let WALKLENGTH = walkedsquares.length;
        if (WALKLENGTH) {
          if (
            WALKLENGTH === 3 &&
            !UNITLAYERS.oppunits[walkedsquares[WALKLENGTH - 1]]
          ) {
            ARTIFACTS.targetedgepoints[walkedsquares[WALKLENGTH - 1]] = {
              dir: relativeDirs[DIR][5]
            };
          }
        }
      }
    }
    {
      for (let STARTPOS in ARTIFACTS.targetedgepoints) {
        let DIR = (ARTIFACTS.targetedgepoints[STARTPOS] || {}).dir;
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let STEP = 0;
        while ((POS = connections[POS][DIR])) {
          walkedsquares.push(POS);
          STEP++;
          if (STEP !== 1) {
            ARTIFACTS[
              DIR === 1
                ? "pushsouth"
                : DIR === 3
                ? "pushwest"
                : DIR === 5
                ? "pushnorth"
                : "pusheast"
            ][POS] = {};
          }
        }
        let WALKLENGTH = walkedsquares.length;
        POS = STARTPOS;
        ARTIFACTS[
          DIR === 1
            ? "squishsouth"
            : DIR === 3
            ? "squishwest"
            : DIR === 5
            ? "squishnorth"
            : "squisheast"
        ][POS] = {};
        if (WALKLENGTH) {
          ARTIFACTS[
            DIR === 1
              ? "spawnsouth"
              : DIR === 3
              ? "spawnwest"
              : DIR === 5
              ? "spawnnorth"
              : "spawneast"
          ][walkedsquares[WALKLENGTH - 1]] = {};
        }
      }
    }
    if (Object.keys(ARTIFACTS.spawnsouth).length !== 0) {
      LINKS.actions.south = "south2";
    }
    if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
      LINKS.actions.north = "north2";
    }
    if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
      LINKS.actions.west = "west2";
    }
    if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
      LINKS.actions.east = "east2";
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
  game.instruction.selectpushpoint2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        collapseContent({
          line: [
            Object.keys(ARTIFACTS.spawnsouth).length !== 0
              ? { command: "south" }
              : undefined,
            Object.keys(ARTIFACTS.spawnnorth).length !== 0
              ? { command: "north" }
              : undefined,
            Object.keys(ARTIFACTS.spawnwest).length !== 0
              ? { command: "west" }
              : undefined,
            Object.keys(ARTIFACTS.spawneast).length !== 0
              ? { command: "east" }
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
        {
          text: "to shove in that direction and make room for the new unit at"
        },
        { pos: MARKS.selectpushpoint }
      ]
    });
  };
}
export default game as AlgolGame;
