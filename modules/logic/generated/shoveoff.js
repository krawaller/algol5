import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  coords2pos,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs,
  jumpTwoDirs,
  ringTwoDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const emptyArtifactLayers_basic = {
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
const game = {
  gameId: "shoveoff",
  commands: { north: {}, south: {}, east: {}, west: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board.height, board.width, board.terrain, 1);
    TERRAIN2 = terrainLayers(board.height, board.width, board.terrain, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(TERRAIN1.edge)) {
        LINKS.marks[pos] = "selectpushpoint_basic_1";
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
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(TERRAIN2.edge)) {
        LINKS.marks[pos] = "selectpushpoint_basic_2";
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
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectpushpoint_basic_1: (step, newMarkPos) => {
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
      let LINKS = { marks: {}, commands: {} };
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
          ][POS] = { dir: relativeDirs[DIR][5] };
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
        LINKS.commands.south = "south_basic_1";
      }
      if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
        LINKS.commands.north = "north_basic_1";
      }
      if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
        LINKS.commands.west = "west_basic_1";
      }
      if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
        LINKS.commands.east = "east_basic_1";
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
    },
    selectpushpoint_basic_2: (step, newMarkPos) => {
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
      let LINKS = { marks: {}, commands: {} };
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
          ][POS] = { dir: relativeDirs[DIR][5] };
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
        LINKS.commands.south = "south_basic_2";
      }
      if (Object.keys(ARTIFACTS.spawnnorth).length !== 0) {
        LINKS.commands.north = "north_basic_2";
      }
      if (Object.keys(ARTIFACTS.spawnwest).length !== 0) {
        LINKS.commands.west = "west_basic_2";
      }
      if (Object.keys(ARTIFACTS.spawneast).length !== 0) {
        LINKS.commands.east = "east_basic_2";
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
    },
    north_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishnorth;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushnorth) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][1]
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
        for (const layer of groupLayers1[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
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
    },
    south_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishsouth;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushsouth) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][5]
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
        for (const layer of groupLayers1[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
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
    },
    east_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squisheast;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pusheast) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][3]
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
        for (const layer of groupLayers1[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
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
    },
    west_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishwest;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushwest) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][7]
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
        for (const layer of groupLayers1[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
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
    },
    north_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishnorth;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishnorth)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushnorth) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][1]
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
        for (const layer of groupLayers2[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
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
    },
    south_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishsouth;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishsouth)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushsouth) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][5]
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
        for (const layer of groupLayers2[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
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
    },
    east_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squisheast;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squisheast)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pusheast) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][3]
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
        for (const layer of groupLayers2[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
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
    },
    west_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
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
      {
        const LOOPSET = ARTIFACTS.squishwest;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.squishwest)[0]] || {}).id
      ];
      for (let LOOPPOS in ARTIFACTS.pushwest) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: connections[pos][7]
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
        for (const layer of groupLayers2[group][owner]) {
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
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.fourinarow);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
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
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to shove in" },
          Object.keys(UNITLAYERS.myunits).length === 7
            ? collapseContent({
                line: [
                  { text: "your last off-board" },
                  { unittype: ["pawn", 1] }
                ]
              })
            : Object.keys(UNITLAYERS.myunits).length === 8
            ? collapseContent({
                line: [{ text: "a" }, { unittype: ["pawn", 0] }]
              })
            : collapseContent({
                line: [
                  { text: "one of your" },
                  { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                  collapseContent({
                    line: [
                      { text: "remaining off-board" },
                      { unittype: ["pawn", 1] }
                    ]
                  })
                ]
              })
        ]
      });
    },
    north_basic_1: () => defaultInstruction(1),
    south_basic_1: () => defaultInstruction(1),
    east_basic_1: () => defaultInstruction(1),
    west_basic_1: () => defaultInstruction(1),
    selectpushpoint_basic_1: step => {
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
    },
    startTurn_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to shove in" },
          Object.keys(UNITLAYERS.myunits).length === 7
            ? collapseContent({
                line: [
                  { text: "your last off-board" },
                  { unittype: ["pawn", 2] }
                ]
              })
            : Object.keys(UNITLAYERS.myunits).length === 8
            ? collapseContent({
                line: [{ text: "a" }, { unittype: ["pawn", 0] }]
              })
            : collapseContent({
                line: [
                  { text: "one of your" },
                  { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                  collapseContent({
                    line: [
                      { text: "remaining off-board" },
                      { unittype: ["pawn", 2] }
                    ]
                  })
                ]
              })
        ]
      });
    },
    north_basic_2: () => defaultInstruction(2),
    south_basic_2: () => defaultInstruction(2),
    east_basic_2: () => defaultInstruction(2),
    west_basic_2: () => defaultInstruction(2),
    selectpushpoint_basic_2: step => {
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
    }
  },
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "regular",
      code: "a",
      arr: {
        marks: [],
        potentialMarks: ["a1", "c1", "d1", "d2", "a3", "a4", "b4", "c4", "d4"],
        setup: {
          soldiers: {
            "0": ["c1", "a2", "b2", "d3", "a4", "c4"],
            "1": ["a1", "d2", "a3", "c3", "b4"],
            "2": ["b1", "d1", "c2", "b3", "d4"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 4,
      width: 4,
      terrain: {
        southedge: [
          {
            rect: ["a1", "d1"]
          }
        ],
        northedge: [
          {
            rect: ["a4", "d4"]
          }
        ],
        westedge: [
          {
            rect: ["a1", "a4"]
          }
        ],
        eastedge: [
          {
            rect: ["d1", "d4"]
          }
        ],
        edge: [
          {
            holerect: ["a1", "d4", "b2", "b3", "c2", "c3"]
          }
        ]
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "0": [
          {
            rect: ["a1", "d4"]
          }
        ]
      }
    }
  }
};
export default game;
