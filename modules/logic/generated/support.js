import {
  offsetPos,
  whoWins,
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
import boards from "../../games/definitions/support/boards";
import setups from "../../games/definitions/support/setups";
import variants from "../../games/definitions/support/variants";
const emptyObj = {};
const iconMapping = { bases: "rook", soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  bases: [
    ["units", "bases"],
    ["units", "myunits", "bases"],
    ["units", "oppunits", "bases"]
  ],
  soldiers: [
    ["units", "soldiers"],
    ["units", "myunits", "soldiers", "mysoldiers"],
    ["units", "oppunits", "soldiers", "oppsoldiers"]
  ]
};
const groupLayers2 = {
  bases: [
    ["units", "bases"],
    ["units", "oppunits", "bases"],
    ["units", "myunits", "bases"]
  ],
  soldiers: [
    ["units", "soldiers"],
    ["units", "oppunits", "soldiers", "oppsoldiers"],
    ["units", "myunits", "soldiers", "mysoldiers"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "support",
  commands: { move: {}, insert: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board, 1);
    TERRAIN2 = terrainLayers(board, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
  },
  newBattle: (setup, ruleset) => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      bases: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      BATTLEVARS: { score1: 0, score2: 0, size1: 0, size2: 0 },
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        pushees: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        bases: oldUnitLayers.bases,
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let MARKS = {};
      let LINKS = {
        marks: {},
        commands: {}
      };
      if (false) {
        {
          let POS = MARKS.selectdestination;
          while (
            (POS =
              connections[POS][
                relativeDirs[
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ][5]
              ])
          ) {
            ARTIFACTS.pushees[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys({
        ...UNITLAYERS.mysoldiers,
        ...Object.keys(TERRAIN1.edge)
          .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      })) {
        LINKS.marks[pos] = "selectorigin_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS,
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        pushees: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        bases: oldUnitLayers.bases,
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let MARKS = {};
      let LINKS = {
        marks: {},
        commands: {}
      };
      if (false) {
        {
          let POS = MARKS.selectdestination;
          while (
            (POS =
              connections[POS][
                relativeDirs[
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ][5]
              ])
          ) {
            ARTIFACTS.pushees[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys({
        ...UNITLAYERS.mysoldiers,
        ...Object.keys(TERRAIN2.edge)
          .filter(k => !UNITLAYERS.oppunits.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {})
      })) {
        LINKS.marks[pos] = "selectorigin_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS,
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectorigin_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        pushees: step.ARTIFACTS.pushees,
        connected: {},
        movetargets: {},
        pushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectorigin: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.mysoldiers[MARKS.selectorigin]) {
        if (TERRAIN1.mysupported[MARKS.selectorigin]) {
          const visited = {};
          const toCheck = [[MARKS.selectorigin, 0]];
          const steps = UNITLAYERS.myunits;
          while (toCheck.length) {
            const [from, sofar] = toCheck.shift();
            visited[from] = true;
            const floatdist = sofar + 1;
            for (const DIR of roseDirs) {
              const POS = connections[from][DIR];
              if (POS && !visited[POS] && steps[POS]) {
                toCheck.push([POS, floatdist]);
                ARTIFACTS.connected[POS] = emptyObj;
              }
            }
          }
          for (let STARTPOS in ARTIFACTS.connected) {
            let startconnections = connections[STARTPOS];
            for (let DIR of roseDirs) {
              let POS = startconnections[DIR];
              if (POS) {
                if (!UNITLAYERS.myunits[POS] && !UNITLAYERS.bases[POS]) {
                  ARTIFACTS.movetargets[POS] = emptyObj;
                }
              }
            }
          }
        }
        if (TERRAIN1.edge[MARKS.selectorigin]) {
          {
            let BLOCKS = Object.keys(BOARD.board)
              .filter(k => !UNITLAYERS.mysoldiers.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            for (let DIR of roseDirs) {
              let POS = "faux";
              connections.faux[DIR] = MARKS.selectorigin;
              while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
              if (BLOCKS[POS]) {
                if (!TERRAIN1.edge[POS] && !UNITLAYERS.bases[POS]) {
                  ARTIFACTS.pushtargets[POS] = { dir: DIR };
                }
              }
            }
          }
        }
      }
      if (
        !UNITLAYERS.mysoldiers[MARKS.selectorigin] &&
        5 !== BATTLEVARS["size2"]
      ) {
        LINKS.commands.insert = "insert_basic_1";
      } else {
        for (const pos of Object.keys({
          ...ARTIFACTS.movetargets,
          ...ARTIFACTS.pushtargets
        })) {
          LINKS.marks[pos] = "selectdestination_basic_1";
        }
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdestination_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        pushees: { ...step.ARTIFACTS.pushees },
        connected: step.ARTIFACTS.connected,
        movetargets: step.ARTIFACTS.movetargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectorigin: step.MARKS.selectorigin,
        selectdestination: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (ARTIFACTS.pushtargets[MARKS.selectdestination]) {
        {
          let POS = MARKS.selectdestination;
          while (
            (POS =
              connections[POS][
                relativeDirs[
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ][5]
              ])
          ) {
            ARTIFACTS.pushees[POS] = emptyObj;
          }
        }
      }
      if (
        5 !== BATTLEVARS["size2"] ||
        (TERRAIN1.center[MARKS.selectdestination] &&
          UNITLAYERS.oppunits[MARKS.selectdestination])
      ) {
        if (ARTIFACTS.movetargets[MARKS.selectdestination]) {
          LINKS.commands.move = "move_basic_1";
        }
        if (ARTIFACTS.pushtargets[MARKS.selectdestination]) {
          LINKS.commands.insert = "insert_basic_1";
        }
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectorigin_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        pushees: step.ARTIFACTS.pushees,
        connected: {},
        movetargets: {},
        pushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectorigin: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.mysoldiers[MARKS.selectorigin]) {
        if (TERRAIN2.mysupported[MARKS.selectorigin]) {
          const visited = {};
          const toCheck = [[MARKS.selectorigin, 0]];
          const steps = UNITLAYERS.myunits;
          while (toCheck.length) {
            const [from, sofar] = toCheck.shift();
            visited[from] = true;
            const floatdist = sofar + 1;
            for (const DIR of roseDirs) {
              const POS = connections[from][DIR];
              if (POS && !visited[POS] && steps[POS]) {
                toCheck.push([POS, floatdist]);
                ARTIFACTS.connected[POS] = emptyObj;
              }
            }
          }
          for (let STARTPOS in ARTIFACTS.connected) {
            let startconnections = connections[STARTPOS];
            for (let DIR of roseDirs) {
              let POS = startconnections[DIR];
              if (POS) {
                if (!UNITLAYERS.myunits[POS] && !UNITLAYERS.bases[POS]) {
                  ARTIFACTS.movetargets[POS] = emptyObj;
                }
              }
            }
          }
        }
        if (TERRAIN2.edge[MARKS.selectorigin]) {
          {
            let BLOCKS = Object.keys(BOARD.board)
              .filter(k => !UNITLAYERS.mysoldiers.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            for (let DIR of roseDirs) {
              let POS = "faux";
              connections.faux[DIR] = MARKS.selectorigin;
              while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {}
              if (BLOCKS[POS]) {
                if (!TERRAIN2.edge[POS] && !UNITLAYERS.bases[POS]) {
                  ARTIFACTS.pushtargets[POS] = { dir: DIR };
                }
              }
            }
          }
        }
      }
      if (
        !UNITLAYERS.mysoldiers[MARKS.selectorigin] &&
        5 !== BATTLEVARS["size1"]
      ) {
        LINKS.commands.insert = "insert_basic_2";
      } else {
        for (const pos of Object.keys({
          ...ARTIFACTS.movetargets,
          ...ARTIFACTS.pushtargets
        })) {
          LINKS.marks[pos] = "selectdestination_basic_2";
        }
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdestination_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        pushees: { ...step.ARTIFACTS.pushees },
        connected: step.ARTIFACTS.connected,
        movetargets: step.ARTIFACTS.movetargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectorigin: step.MARKS.selectorigin,
        selectdestination: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (ARTIFACTS.pushtargets[MARKS.selectdestination]) {
        {
          let POS = MARKS.selectdestination;
          while (
            (POS =
              connections[POS][
                relativeDirs[
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ][5]
              ])
          ) {
            ARTIFACTS.pushees[POS] = emptyObj;
          }
        }
      }
      if (
        5 !== BATTLEVARS["size1"] ||
        (TERRAIN2.center[MARKS.selectdestination] &&
          UNITLAYERS.oppunits[MARKS.selectdestination])
      ) {
        if (ARTIFACTS.movetargets[MARKS.selectdestination]) {
          LINKS.commands.move = "move_basic_2";
        }
        if (ARTIFACTS.pushtargets[MARKS.selectdestination]) {
          LINKS.commands.insert = "insert_basic_2";
        }
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectdestination]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectdestination] || {}).id];
        BATTLEVARS.score1 = (BATTLEVARS.score1 || 0) + 1;
        if (TERRAIN1.center[MARKS.selectdestination]) {
          BATTLEVARS.size2 = (BATTLEVARS.size2 || 0) + -1;
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectorigin] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdestination
          };
        }
      }
      if (TERRAIN1.center[MARKS.selectdestination]) {
        BATTLEVARS.size1 = (BATTLEVARS.size1 || 0) + 1;
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        bases: {},
        soldiers: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (BATTLEVARS["score1"] === 18) {
        LINKS.endGame = "win";
        LINKS.endedBy = "killed18";
        LINKS.endMarks = Object.keys({ [MARKS.selectdestination]: 1 });
      } else if (BATTLEVARS["size1"] === 5) {
        LINKS.starvation = {
          endGame: "win",
          endedBy: "tookcenter",
          endMarks: Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.center)
                .concat(Object.keys(UNITLAYERS.mysoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          )
        };
        LINKS.endTurn = "startTurn_basic_2";
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    insert_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        pushees: step.ARTIFACTS.pushees,
        connected: step.ARTIFACTS.connected,
        movetargets: step.ARTIFACTS.movetargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectorigin] = offsetPos(
        MARKS.selectorigin,
        BOARD.board[MARKS.selectorigin].x === 1
          ? 7
          : BOARD.board[MARKS.selectorigin].x === 9
          ? 3
          : BOARD.board[MARKS.selectorigin].y === 1
          ? 5
          : 1,
        1,
        0
      );
      if (UNITLAYERS.units[MARKS.selectdestination]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectdestination] || {}).id];
        BATTLEVARS.score1 = (BATTLEVARS.score1 || 0) + 1;
        if (TERRAIN1.center[MARKS.selectdestination]) {
          BATTLEVARS.size2 = (BATTLEVARS.size2 || 0) + -1;
        }
      }
      for (let LOOPPOS in ARTIFACTS.pushees) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos:
                connections[pos][
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ]
            };
          }
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectorigin,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
      if (TERRAIN1.center[MARKS.selectdestination]) {
        BATTLEVARS.size1 = (BATTLEVARS.size1 || 0) + 1;
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        bases: {},
        soldiers: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (BATTLEVARS["score1"] === 18) {
        LINKS.endGame = "win";
        LINKS.endedBy = "killed18";
        LINKS.endMarks = Object.keys({ [MARKS.selectdestination]: 1 });
      } else if (BATTLEVARS["size1"] === 5) {
        LINKS.starvation = {
          endGame: "win",
          endedBy: "tookcenter",
          endMarks: Object.keys(
            Object.entries(
              Object.keys(TERRAIN1.center)
                .concat(Object.keys(UNITLAYERS.mysoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          )
        };
        LINKS.endTurn = "startTurn_basic_2";
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
        BATTLEVARS,
        NEXTSPAWNID,
        canAlwaysEnd: true,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (UNITLAYERS.units[MARKS.selectdestination]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectdestination] || {}).id];
        BATTLEVARS.score2 = (BATTLEVARS.score2 || 0) + 1;
        if (TERRAIN2.center[MARKS.selectdestination]) {
          BATTLEVARS.size1 = (BATTLEVARS.size1 || 0) + -1;
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectorigin] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectdestination
          };
        }
      }
      if (TERRAIN2.center[MARKS.selectdestination]) {
        BATTLEVARS.size2 = (BATTLEVARS.size2 || 0) + 1;
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        bases: {},
        soldiers: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (BATTLEVARS["score2"] === 18) {
        LINKS.endGame = "win";
        LINKS.endedBy = "killed18";
        LINKS.endMarks = Object.keys({ [MARKS.selectdestination]: 1 });
      } else if (BATTLEVARS["size2"] === 5) {
        LINKS.starvation = {
          endGame: "win",
          endedBy: "tookcenter",
          endMarks: Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.center)
                .concat(Object.keys(UNITLAYERS.mysoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          )
        };
        LINKS.endTurn = "startTurn_basic_1";
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    insert_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        pushees: step.ARTIFACTS.pushees,
        connected: step.ARTIFACTS.connected,
        movetargets: step.ARTIFACTS.movetargets,
        pushtargets: step.ARTIFACTS.pushtargets
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectorigin] = offsetPos(
        MARKS.selectorigin,
        BOARD.board[MARKS.selectorigin].x === 1
          ? 7
          : BOARD.board[MARKS.selectorigin].x === 9
          ? 3
          : BOARD.board[MARKS.selectorigin].y === 1
          ? 5
          : 1,
        1,
        0
      );
      if (UNITLAYERS.units[MARKS.selectdestination]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectdestination] || {}).id];
        BATTLEVARS.score2 = (BATTLEVARS.score2 || 0) + 1;
        if (TERRAIN2.center[MARKS.selectdestination]) {
          BATTLEVARS.size1 = (BATTLEVARS.size1 || 0) + -1;
        }
      }
      for (let LOOPPOS in ARTIFACTS.pushees) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos:
                connections[pos][
                  (ARTIFACTS.pushtargets[MARKS.selectdestination] || {}).dir
                ]
            };
          }
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectorigin,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
      if (TERRAIN2.center[MARKS.selectdestination]) {
        BATTLEVARS.size2 = (BATTLEVARS.size2 || 0) + 1;
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        bases: {},
        soldiers: {},
        mysoldiers: {},
        oppsoldiers: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (BATTLEVARS["score2"] === 18) {
        LINKS.endGame = "win";
        LINKS.endedBy = "killed18";
        LINKS.endMarks = Object.keys({ [MARKS.selectdestination]: 1 });
      } else if (BATTLEVARS["size2"] === 5) {
        LINKS.starvation = {
          endGame: "win",
          endedBy: "tookcenter",
          endMarks: Object.keys(
            Object.entries(
              Object.keys(TERRAIN2.center)
                .concat(Object.keys(UNITLAYERS.mysoldiers))
                .reduce((mem, k) => {
                  mem[k] = (mem[k] || 0) + 1;
                  return mem;
                }, {})
            )
              .filter(([key, n]) => n === 2)
              .reduce((mem, [key]) => {
                mem[key] = emptyObj;
                return mem;
              }, {})
          )
        };
        LINKS.endTurn = "startTurn_basic_1";
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
        BATTLEVARS,
        NEXTSPAWNID,
        canAlwaysEnd: true,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      return collapseContent({
        line: [
          5 === BATTLEVARS["size2"]
            ? collapseContent({
                line: [
                  { text: "You must kill one of the" },
                  { unittype: ["pawn", 2] },
                  { text: "in the center!" }
                ]
              })
            : BATTLEVARS["score1"] === BATTLEVARS["score2"]
            ? collapseContent({
                line: [
                  { text: "You and" },
                  { player: 2 },
                  { text: "both have" },
                  { text: BATTLEVARS["score1"] },
                  { text: "kills." }
                ]
              })
            : collapseContent({
                line: [
                  { text: "You have" },
                  { text: BATTLEVARS["score1"] },
                  { text: "kills and" },
                  { player: 2 },
                  { text: "has" },
                  { text: BATTLEVARS["score2"] },
                  { text: "." }
                ]
              }),
          { text: "Select where to insert or a" },
          { unittype: ["pawn", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    insert_basic_1: () => defaultInstruction(1),
    selectorigin_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return !UNITLAYERS.units[MARKS.selectorigin]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "insert" },
              { text: "to spawn" },
              { unit: ["pawn", 1, MARKS.selectorigin] }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              collapseContent({
                line: [
                  Object.keys(ARTIFACTS.movetargets).length !== 0
                    ? collapseContent({
                        line: [
                          { text: "where to move" },
                          {
                            unit: [
                              iconMapping[
                                (UNITLAYERS.units[MARKS.selectorigin] || {})
                                  .group
                              ],
                              (UNITLAYERS.units[MARKS.selectorigin] || {})
                                .owner,
                              MARKS.selectorigin
                            ]
                          }
                        ]
                      })
                    : undefined,
                  Object.keys(ARTIFACTS.pushtargets).length !== 0
                    ? collapseContent({
                        line: [
                          { text: "where to push from" },
                          { pos: MARKS.selectorigin }
                        ]
                      })
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
              })
            ]
          });
    },
    selectdestination_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          collapseContent({
            line: [
              ARTIFACTS.movetargets[MARKS.selectdestination]
                ? collapseContent({
                    line: [
                      { command: "move" },
                      { text: "to make" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectorigin] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectorigin] || {}).owner,
                          MARKS.selectorigin
                        ]
                      },
                      UNITLAYERS.units[MARKS.selectdestination]
                        ? collapseContent({
                            line: [
                              { text: "go kill" },
                              {
                                unit: [
                                  iconMapping[
                                    (
                                      UNITLAYERS.units[
                                        MARKS.selectdestination
                                      ] || {}
                                    ).group
                                  ],
                                  (
                                    UNITLAYERS.units[MARKS.selectdestination] ||
                                    {}
                                  ).owner,
                                  MARKS.selectdestination
                                ]
                              }
                            ]
                          })
                        : collapseContent({
                            line: [
                              { text: "go to" },
                              { pos: MARKS.selectdestination }
                            ]
                          })
                    ]
                  })
                : undefined,
              ARTIFACTS.pushtargets[MARKS.selectdestination]
                ? collapseContent({
                    line: [
                      { command: "insert" },
                      { text: "to spawn" },
                      { unit: ["pawn", 1, MARKS.selectorigin] },
                      { text: "and push" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.pushees)
                          .filter(p => UNITLAYERS.units[p])
                          .map(p => ({
                            unit: [
                              iconMapping[UNITLAYERS.units[p].group],
                              UNITLAYERS.units[p].owner,
                              p
                            ]
                          }))
                          .reduce((mem, i, n, list) => {
                            mem.push(i);
                            if (n === list.length - 2) {
                              mem.push({ text: " and " });
                            } else if (n < list.length - 2) {
                              mem.push({ text: ", " });
                            }
                            return mem;
                          }, [])
                      }),
                      UNITLAYERS.units[MARKS.selectdestination]
                        ? collapseContent({
                            line: [
                              { text: "to kill" },
                              {
                                unit: [
                                  iconMapping[
                                    (
                                      UNITLAYERS.units[
                                        MARKS.selectdestination
                                      ] || {}
                                    ).group
                                  ],
                                  (
                                    UNITLAYERS.units[MARKS.selectdestination] ||
                                    {}
                                  ).owner,
                                  MARKS.selectdestination
                                ]
                              }
                            ]
                          })
                        : collapseContent({
                            line: [
                              { text: "towards" },
                              { pos: MARKS.selectdestination }
                            ]
                          })
                    ]
                  })
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
          })
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      return collapseContent({
        line: [
          5 === BATTLEVARS["size1"]
            ? collapseContent({
                line: [
                  { text: "You must kill one of the" },
                  { unittype: ["pawn", 1] },
                  { text: "in the center!" }
                ]
              })
            : BATTLEVARS["score1"] === BATTLEVARS["score2"]
            ? collapseContent({
                line: [
                  { text: "You and" },
                  { player: 1 },
                  { text: "both have" },
                  { text: BATTLEVARS["score1"] },
                  { text: "kills." }
                ]
              })
            : collapseContent({
                line: [
                  { text: "You have" },
                  { text: BATTLEVARS["score2"] },
                  { text: "kills and" },
                  { player: 1 },
                  { text: "has" },
                  { text: BATTLEVARS["score1"] },
                  { text: "." }
                ]
              }),
          { text: "Select where to insert or a" },
          { unittype: ["pawn", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    insert_basic_2: () => defaultInstruction(2),
    selectorigin_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return !UNITLAYERS.units[MARKS.selectorigin]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "insert" },
              { text: "to spawn" },
              { unit: ["pawn", 2, MARKS.selectorigin] }
            ]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              collapseContent({
                line: [
                  Object.keys(ARTIFACTS.movetargets).length !== 0
                    ? collapseContent({
                        line: [
                          { text: "where to move" },
                          {
                            unit: [
                              iconMapping[
                                (UNITLAYERS.units[MARKS.selectorigin] || {})
                                  .group
                              ],
                              (UNITLAYERS.units[MARKS.selectorigin] || {})
                                .owner,
                              MARKS.selectorigin
                            ]
                          }
                        ]
                      })
                    : undefined,
                  Object.keys(ARTIFACTS.pushtargets).length !== 0
                    ? collapseContent({
                        line: [
                          { text: "where to push from" },
                          { pos: MARKS.selectorigin }
                        ]
                      })
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
              })
            ]
          });
    },
    selectdestination_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          collapseContent({
            line: [
              ARTIFACTS.movetargets[MARKS.selectdestination]
                ? collapseContent({
                    line: [
                      { command: "move" },
                      { text: "to make" },
                      {
                        unit: [
                          iconMapping[
                            (UNITLAYERS.units[MARKS.selectorigin] || {}).group
                          ],
                          (UNITLAYERS.units[MARKS.selectorigin] || {}).owner,
                          MARKS.selectorigin
                        ]
                      },
                      UNITLAYERS.units[MARKS.selectdestination]
                        ? collapseContent({
                            line: [
                              { text: "go kill" },
                              {
                                unit: [
                                  iconMapping[
                                    (
                                      UNITLAYERS.units[
                                        MARKS.selectdestination
                                      ] || {}
                                    ).group
                                  ],
                                  (
                                    UNITLAYERS.units[MARKS.selectdestination] ||
                                    {}
                                  ).owner,
                                  MARKS.selectdestination
                                ]
                              }
                            ]
                          })
                        : collapseContent({
                            line: [
                              { text: "go to" },
                              { pos: MARKS.selectdestination }
                            ]
                          })
                    ]
                  })
                : undefined,
              ARTIFACTS.pushtargets[MARKS.selectdestination]
                ? collapseContent({
                    line: [
                      { command: "insert" },
                      { text: "to spawn" },
                      { unit: ["pawn", 2, MARKS.selectorigin] },
                      { text: "and push" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.pushees)
                          .filter(p => UNITLAYERS.units[p])
                          .map(p => ({
                            unit: [
                              iconMapping[UNITLAYERS.units[p].group],
                              UNITLAYERS.units[p].owner,
                              p
                            ]
                          }))
                          .reduce((mem, i, n, list) => {
                            mem.push(i);
                            if (n === list.length - 2) {
                              mem.push({ text: " and " });
                            } else if (n < list.length - 2) {
                              mem.push({ text: ", " });
                            }
                            return mem;
                          }, [])
                      }),
                      UNITLAYERS.units[MARKS.selectdestination]
                        ? collapseContent({
                            line: [
                              { text: "to kill" },
                              {
                                unit: [
                                  iconMapping[
                                    (
                                      UNITLAYERS.units[
                                        MARKS.selectdestination
                                      ] || {}
                                    ).group
                                  ],
                                  (
                                    UNITLAYERS.units[MARKS.selectdestination] ||
                                    {}
                                  ).owner,
                                  MARKS.selectdestination
                                ]
                              }
                            ]
                          })
                        : collapseContent({
                            line: [
                              { text: "towards" },
                              { pos: MARKS.selectdestination }
                            ]
                          })
                    ]
                  })
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
          })
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
