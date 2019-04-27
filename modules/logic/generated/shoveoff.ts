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
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
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
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(4, 4, {
  southedge: [{ rect: ["a1", "d1"] }],
  northedge: [{ rect: ["a4", "d4"] }],
  westedge: [{ rect: ["a1", "a4"] }],
  eastedge: [{ rect: ["d1", "d4"] }],
  edge: [{ holerect: ["a1", "d4", "b2", "b3", "c2", "c3"] }]
});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "shoveoff",
  action: {},
  instruction: {}
};
{
  const groupLayers = {
    soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  game.action.startTurn1 = step => {
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
        oppunits: oldUnitLayers.myunits
      },
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to shove in" },
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn2";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn2";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn2";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn2";
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
      spawneast: {}
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
            ][POS] = emptyObj;
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
        ][POS] = emptyObj;
        if (WALKLENGTH) {
          ARTIFACTS[
            DIR === 1
              ? "spawnsouth"
              : DIR === 3
              ? "spawnwest"
              : DIR === 5
              ? "spawnnorth"
              : "spawneast"
          ][walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
  const groupLayers = {
    soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  game.action.startTurn2 = step => {
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
        oppunits: oldUnitLayers.myunits
      },
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "where to shove in" },
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
    let UNITDATA = deduceInitialUnitData({
      soldiers: { "0": [{ rect: ["a1", "d4"] }] }
    });
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn1";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn1";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn1";
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
      fourinarow: {}
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            if (WALKLENGTH === 4) {
              ARTIFACTS.fourinarow[POS] = emptyObj;
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
      LINKS.endTurn = "startTurn1";
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
      spawneast: {}
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
            ][POS] = emptyObj;
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
        ][POS] = emptyObj;
        if (WALKLENGTH) {
          ARTIFACTS[
            DIR === 1
              ? "spawnsouth"
              : DIR === 3
              ? "spawnwest"
              : DIR === 5
              ? "spawnnorth"
              : "spawneast"
          ][walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
