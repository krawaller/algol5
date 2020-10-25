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
import boards from "../../games/definitions/towertwo/boards";
import setups from "../../games/definitions/towertwo/setups";
import variants from "../../games/definitions/towertwo/variants";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {}, victims: {} };
const game = {
  gameId: "towertwo",
  commands: { heal: {}, deploy: {}, move: {} },
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
      BATTLEVARS: { plr1wounded: 0, plr2wounded: 0 },
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(
        8 > BATTLEVARS["plr1wounded"] + Object.keys(UNITLAYERS.myunits).length
          ? {
              ...Object.keys(TERRAIN1.mybase)
                .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {}),
              ...UNITLAYERS.myunits
            }
          : UNITLAYERS.myunits
      )) {
        LINKS.marks[pos] = "selectsource_basic_1";
      }
      if (!!BATTLEVARS["plr1wounded"]) {
        LINKS.commands.heal = "heal_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {},
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(
        8 > BATTLEVARS["plr2wounded"] + Object.keys(UNITLAYERS.myunits).length
          ? {
              ...Object.keys(TERRAIN2.mybase)
                .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                .reduce((m, k) => {
                  m[k] = emptyObj;
                  return m;
                }, {}),
              ...UNITLAYERS.myunits
            }
          : UNITLAYERS.myunits
      )) {
        LINKS.marks[pos] = "selectsource_basic_2";
      }
      if (!!BATTLEVARS["plr2wounded"]) {
        LINKS.commands.heal = "heal_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {},
        BATTLEVARS
      };
    },
    selectsource_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectsource: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.myunits[MARKS.selectsource]) {
        const visited = {};
        const toCheck = [[MARKS.selectsource, 0]];
        const blocks = UNITLAYERS.units;
        while (toCheck.length) {
          const [from, sofar] = toCheck.shift();
          visited[from] = true;
          const floatdist = sofar + 1;
          for (const DIR of orthoDirs) {
            const POS = connections[from][DIR];
            if (
              POS &&
              !visited[POS] &&
              !blocks[POS] &&
              floatdist <= 3 - (TURNVARS["spent"] || 0)
            ) {
              toCheck.push([POS, floatdist]);
              ARTIFACTS.movetargets[POS] = { dist: floatdist };
            }
          }
        }
      }
      if (!UNITLAYERS.units[MARKS.selectsource]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let STOPREASON = "";
            let MAX = 1;
            let POS = MARKS.selectmovetarget || MARKS.selectsource;
            let LENGTH = 0;
            while (
              !(STOPREASON = !(POS = connections[POS][DIR])
                ? "outofbounds"
                : BLOCKS[POS]
                ? "hitblock"
                : LENGTH === MAX
                ? "reachedmax"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
            ) {
              walkedsquares.push(POS);
              LENGTH++;
            }
            for (
              let walkstepper = 0;
              walkstepper < walkedsquares.length;
              walkstepper++
            ) {
              POS = walkedsquares[walkstepper];
              if (STOPREASON === "hitblock") {
                ARTIFACTS.victims[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (UNITLAYERS.myunits[MARKS.selectsource]) {
        for (const pos of Object.keys(ARTIFACTS.movetargets)) {
          LINKS.marks[pos] = "selectmovetarget_basic_1";
        }
      }
      if (!UNITLAYERS.units[MARKS.selectsource]) {
        LINKS.commands.deploy = "deploy_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        victims: { ...step.ARTIFACTS.victims },
        movetargets: step.ARTIFACTS.movetargets
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectsource: step.MARKS.selectsource,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectmovetarget || MARKS.selectsource;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : LENGTH === MAX
              ? "reachedmax"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          for (
            let walkstepper = 0;
            walkstepper < walkedsquares.length;
            walkstepper++
          ) {
            POS = walkedsquares[walkstepper];
            if (STOPREASON === "hitblock") {
              ARTIFACTS.victims[POS] = emptyObj;
            }
          }
        }
      }
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectsource_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectsource: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.myunits[MARKS.selectsource]) {
        const visited = {};
        const toCheck = [[MARKS.selectsource, 0]];
        const blocks = UNITLAYERS.units;
        while (toCheck.length) {
          const [from, sofar] = toCheck.shift();
          visited[from] = true;
          const floatdist = sofar + 1;
          for (const DIR of orthoDirs) {
            const POS = connections[from][DIR];
            if (
              POS &&
              !visited[POS] &&
              !blocks[POS] &&
              floatdist <= 3 - (TURNVARS["spent"] || 0)
            ) {
              toCheck.push([POS, floatdist]);
              ARTIFACTS.movetargets[POS] = { dist: floatdist };
            }
          }
        }
      }
      if (!UNITLAYERS.units[MARKS.selectsource]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let STOPREASON = "";
            let MAX = 1;
            let POS = MARKS.selectmovetarget || MARKS.selectsource;
            let LENGTH = 0;
            while (
              !(STOPREASON = !(POS = connections[POS][DIR])
                ? "outofbounds"
                : BLOCKS[POS]
                ? "hitblock"
                : LENGTH === MAX
                ? "reachedmax"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
            ) {
              walkedsquares.push(POS);
              LENGTH++;
            }
            for (
              let walkstepper = 0;
              walkstepper < walkedsquares.length;
              walkstepper++
            ) {
              POS = walkedsquares[walkstepper];
              if (STOPREASON === "hitblock") {
                ARTIFACTS.victims[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (UNITLAYERS.myunits[MARKS.selectsource]) {
        for (const pos of Object.keys(ARTIFACTS.movetargets)) {
          LINKS.marks[pos] = "selectmovetarget_basic_2";
        }
      }
      if (!UNITLAYERS.units[MARKS.selectsource]) {
        LINKS.commands.deploy = "deploy_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        victims: { ...step.ARTIFACTS.victims },
        movetargets: step.ARTIFACTS.movetargets
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectsource: step.MARKS.selectsource,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectmovetarget || MARKS.selectsource;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : LENGTH === MAX
              ? "reachedmax"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          for (
            let walkstepper = 0;
            walkstepper < walkedsquares.length;
            walkstepper++
          ) {
            POS = walkedsquares[walkstepper];
            if (STOPREASON === "hitblock") {
              ARTIFACTS.victims[POS] = emptyObj;
            }
          }
        }
      }
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    heal_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      BATTLEVARS.plr1wounded = (BATTLEVARS.plr1wounded || 0) + -1;
      TURNVARS.spent = (TURNVARS.spent || 0) + 1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN1.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN1.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr1wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN1.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    deploy_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.spent = (TURNVARS.spent || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectsource,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      BATTLEVARS.plr2wounded =
        (BATTLEVARS.plr2wounded || 0) + Object.keys(ARTIFACTS.victims).length;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN1.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN1.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr1wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN1.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      TURNVARS.spent =
        (TURNVARS.spent || 0) +
        (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dist;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectsource] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      BATTLEVARS.plr2wounded =
        (BATTLEVARS.plr2wounded || 0) + Object.keys(ARTIFACTS.victims).length;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN1.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN1.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr1wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN1.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    heal_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      BATTLEVARS.plr2wounded = (BATTLEVARS.plr2wounded || 0) + -1;
      TURNVARS.spent = (TURNVARS.spent || 0) + 1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN2.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN2.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr2wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN2.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    deploy_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      TURNVARS.spent = (TURNVARS.spent || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectsource,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      BATTLEVARS.plr1wounded =
        (BATTLEVARS.plr1wounded || 0) + Object.keys(ARTIFACTS.victims).length;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN2.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN2.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr2wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN2.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        victims: step.ARTIFACTS.victims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      TURNVARS.spent =
        (TURNVARS.spent || 0) +
        (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dist;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectsource] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      BATTLEVARS.plr1wounded =
        (BATTLEVARS.plr1wounded || 0) + Object.keys(ARTIFACTS.victims).length;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (TURNVARS["spent"] > 2) {
        if (
          Object.keys(
            Object.keys(TERRAIN2.oppbase)
              .filter(k => !UNITLAYERS.myunits.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {})
          ).length === 0
        ) {
          LINKS.endGame = "win";
          LINKS.endedBy = "occupybases";
          LINKS.endMarks = Object.keys(TERRAIN2.oppbase);
        } else {
          LINKS.endTurn = "startTurn_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          8 > BATTLEVARS["plr2wounded"] + Object.keys(UNITLAYERS.myunits).length
            ? {
                ...Object.keys(TERRAIN2.mybase)
                  .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
                  .reduce((m, k) => {
                    m[k] = emptyObj;
                    return m;
                  }, {}),
                ...UNITLAYERS.myunits
              }
            : UNITLAYERS.myunits
        )) {
          LINKS.marks[pos] = "selectsource_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "3 actions remaining." },
          !!BATTLEVARS["plr1wounded"]
            ? collapseContent({
                line: [
                  { text: "Press" },
                  { command: "heal" },
                  { text: "to heal" },
                  1 === BATTLEVARS["plr1wounded"]
                    ? collapseContent({
                        line: [{ text: "your wounded soldier" }]
                      })
                    : collapseContent({
                        line: [
                          { text: "one of your" },
                          { text: BATTLEVARS["plr1wounded"] },
                          { text: "wounded soldiers" }
                        ]
                      }),
                  { text: ", or select" }
                ]
              })
            : collapseContent({ line: [{ select: "Select" }] }),
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({
                    line: [{ unittype: ["pawn", 1] }, { text: "to move" }]
                  })
                : undefined,
              8 >
              BATTLEVARS["plr1wounded"] + Object.keys(UNITLAYERS.myunits).length
                ? collapseContent({ line: [{ text: "base to deploy from" }] })
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
    heal_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr1wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr1wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr1wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 1] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr1wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    deploy_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr1wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr1wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr1wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 1] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr1wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    move_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr1wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr1wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr1wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 1] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr1wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    selectsource_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.units[MARKS.selectsource]
        ? collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectsource] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectsource] || {}).owner,
                  MARKS.selectsource
                ]
              }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "deploy" },
              { text: "to spawn one of your" },
              {
                text:
                  8 -
                  Object.keys(UNITLAYERS.myunits).length -
                  BATTLEVARS["plr1wounded"]
              },
              { text: "available" },
              { unittype: ["pawn", 1] },
              { text: "at" },
              { pos: MARKS.selectsource },
              Object.keys(ARTIFACTS.victims).length !== 0
                ? collapseContent({
                    line: [
                      { text: "and wound" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.victims)
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
                      })
                    ]
                  })
                : undefined
            ]
          });
    },
    selectmovetarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to spend" },
          { text: (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dist },
          { text: "action points for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectsource] || {}).group],
              (UNITLAYERS.units[MARKS.selectsource] || {}).owner,
              MARKS.selectsource
            ]
          },
          { text: "to go to" },
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and wound" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.victims)
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
                  })
                ]
              })
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "3 actions remaining." },
          !!BATTLEVARS["plr2wounded"]
            ? collapseContent({
                line: [
                  { text: "Press" },
                  { command: "heal" },
                  { text: "to heal" },
                  1 === BATTLEVARS["plr2wounded"]
                    ? collapseContent({
                        line: [{ text: "your wounded soldier" }]
                      })
                    : collapseContent({
                        line: [
                          { text: "one of your" },
                          { text: BATTLEVARS["plr2wounded"] },
                          { text: "wounded soldiers" }
                        ]
                      }),
                  { text: ", or select" }
                ]
              })
            : collapseContent({ line: [{ select: "Select" }] }),
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({
                    line: [{ unittype: ["pawn", 2] }, { text: "to move" }]
                  })
                : undefined,
              8 >
              BATTLEVARS["plr2wounded"] + Object.keys(UNITLAYERS.myunits).length
                ? collapseContent({ line: [{ text: "base to deploy from" }] })
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
    heal_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr2wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr2wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr2wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 2] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr2wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    deploy_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr2wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr2wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr2wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 2] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr2wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    move_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return TURNVARS["spent"] === 3
        ? collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: 3 - TURNVARS["spent"] },
              TURNVARS["spent"] === 2
                ? { text: "action" }
                : { text: "actions" },
              { text: "remaining!" },
              !!BATTLEVARS["plr2wounded"]
                ? collapseContent({
                    line: [
                      { text: "Press" },
                      { command: "heal" },
                      { text: "to heal" },
                      1 === BATTLEVARS["plr2wounded"]
                        ? collapseContent({
                            line: [{ text: "your wounded soldier" }]
                          })
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: BATTLEVARS["plr2wounded"] },
                              { text: "wounded soldiers" }
                            ]
                          }),
                      { text: ", or select" }
                    ]
                  })
                : collapseContent({ line: [{ select: "Select" }] }),
              collapseContent({
                line: [
                  Object.keys(UNITLAYERS.myunits).length !== 0
                    ? collapseContent({
                        line: [{ unittype: ["pawn", 2] }, { text: "to move" }]
                      })
                    : undefined,
                  8 >
                  BATTLEVARS["plr2wounded"] +
                    Object.keys(UNITLAYERS.myunits).length
                    ? collapseContent({
                        line: [{ text: "base to deploy from" }]
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
    selectsource_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.units[MARKS.selectsource]
        ? collapseContent({
            line: [
              { text: "Select where to move" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[MARKS.selectsource] || {}).group
                  ],
                  (UNITLAYERS.units[MARKS.selectsource] || {}).owner,
                  MARKS.selectsource
                ]
              }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "deploy" },
              { text: "to spawn one of your" },
              {
                text:
                  8 -
                  Object.keys(UNITLAYERS.myunits).length -
                  BATTLEVARS["plr2wounded"]
              },
              { text: "available" },
              { unittype: ["pawn", 2] },
              { text: "at" },
              { pos: MARKS.selectsource },
              Object.keys(ARTIFACTS.victims).length !== 0
                ? collapseContent({
                    line: [
                      { text: "and wound" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.victims)
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
                      })
                    ]
                  })
                : undefined
            ]
          });
    },
    selectmovetarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to spend" },
          { text: (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dist },
          { text: "action points for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectsource] || {}).group],
              (UNITLAYERS.units[MARKS.selectsource] || {}).owner,
              MARKS.selectsource
            ]
          },
          { text: "to go to" },
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and wound" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.victims)
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
                  })
                ]
              })
            : undefined
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
