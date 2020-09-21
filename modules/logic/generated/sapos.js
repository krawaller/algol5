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
import boards from "../../games/definitions/sapos/boards";
import setups from "../../games/definitions/sapos/setups";
import variants from "../../games/definitions/sapos/variants";
const emptyObj = {};
const iconMapping = { toads: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  toads: [
    ["units", "toads"],
    ["units", "myunits", "toads"],
    ["units", "oppunits", "toads"]
  ]
};
const groupLayers2 = {
  toads: [
    ["units", "toads"],
    ["units", "oppunits", "toads"],
    ["units", "myunits", "toads"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const game = {
  gameId: "sapos",
  commands: { hop: {}, jump: {}, spawn: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
      NEXTSPAWNID: 1,
      BATTLEVARS: { plr1: 12, plr2: 12, peace: 1 },
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  },
  action: {
    startTurn_basic_1: step => {
      let ARTIFACTS = {
        knot: {},
        forbidden: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        toads: oldUnitLayers.toads
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (let STARTPOS in UNITLAYERS.myunits) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, 3]) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.myunits[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (3 === NEIGHBOURCOUNT) {
            ARTIFACTS.knot[POS] = emptyObj;
          }
        }
        {
          ARTIFACTS.forbidden[STARTPOS] = emptyObj;
        }
        {
          if (3 === NEIGHBOURCOUNT) {
            ARTIFACTS.knot[STARTPOS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.knot).length === 0
          ? UNITLAYERS.myunits
          : ARTIFACTS.knot
      )) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {},
        BATTLEVARS: step.BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = {
        knot: {},
        forbidden: {}
      };
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        toads: oldUnitLayers.toads
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (let STARTPOS in UNITLAYERS.myunits) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, 3]) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.myunits[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (3 === NEIGHBOURCOUNT) {
            ARTIFACTS.knot[POS] = emptyObj;
          }
        }
        {
          ARTIFACTS.forbidden[STARTPOS] = emptyObj;
        }
        {
          if (3 === NEIGHBOURCOUNT) {
            ARTIFACTS.knot[STARTPOS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.knot).length === 0
          ? UNITLAYERS.myunits
          : ARTIFACTS.knot
      )) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        TURNVARS: {},
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: {},
        jumptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.myunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1 && !ARTIFACTS.forbidden[POS]) {
              ARTIFACTS.hoptargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.hoptargets)) {
        LINKS.marks[pos] = "selecthoptarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
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
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selecthoptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.hop = "hop_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selecthoptarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: step.ARTIFACTS.hoptargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        jumpvictims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      ARTIFACTS.jumpvictims = {};
      {
        let POS =
          connections[MARKS.selectjumptarget][
            relativeDirs[5][
              (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
            ]
          ];
        if (POS) {
          ARTIFACTS.jumpvictims[POS] = emptyObj;
        }
      }
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectspawntarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.spawn = "spawn_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectspawntarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: {},
        jumptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.myunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1 && !ARTIFACTS.forbidden[POS]) {
              ARTIFACTS.hoptargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.hoptargets)) {
        LINKS.marks[pos] = "selecthoptarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
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
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selecthoptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.hop = "hop_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selecthoptarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: step.ARTIFACTS.hoptargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        jumpvictims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectjumptarget: newMarkPos
      };
      ARTIFACTS.jumpvictims = {};
      {
        let POS =
          connections[MARKS.selectjumptarget][
            relativeDirs[5][
              (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
            ]
          ];
        if (POS) {
          ARTIFACTS.jumpvictims[POS] = emptyObj;
        }
      }
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectspawntarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.spawn = "spawn_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectspawntarget: newMarkPos },
        TURNVARS: step.TURNVARS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    hop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        forbidden: { ...step.ARTIFACTS.forbidden },
        hoptargets: { ...step.ARTIFACTS.hoptargets },
        jumptargets: { ...step.ARTIFACTS.jumptargets },
        knot: step.ARTIFACTS.knot,
        spawns: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.hoptargets = {};
      {
        let unitid = (
          UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selecthoptarget
          };
        }
      }
      TURNVARS.skippedto = MARKS.selecthoptarget;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1 && !ARTIFACTS.forbidden[POS]) {
              ARTIFACTS.hoptargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let STARTPOS = TURNVARS["skippedto"];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.spawns[POS] = emptyObj;
          }
        }
        ARTIFACTS.forbidden[STARTPOS] = emptyObj;
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      if (!!BATTLEVARS["plr1"]) {
        for (const pos of Object.keys(ARTIFACTS.spawns)) {
          LINKS.marks[pos] = "selectspawntarget_basic_1";
        }
      }
      for (const pos of Object.keys(ARTIFACTS.hoptargets)) {
        LINKS.marks[pos] = "selecthoptarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
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
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: { ...step.ARTIFACTS.jumptargets },
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: step.ARTIFACTS.hoptargets,
        jumpvictims: step.ARTIFACTS.jumpvictims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.jumptargets = {};
      {
        let unitid = (
          UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.jumpvictims)[0]] || {}).id
      ];
      BATTLEVARS.plr1 = (BATTLEVARS.plr1 || 0) + 1;
      BATTLEVARS.plr2 = (BATTLEVARS.plr2 || 0) + -1;
      BATTLEVARS.peace = 0;
      TURNVARS.skippedto = MARKS.selectjumptarget;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_1";
      }
      {
        LINKS.endTurn = "startTurn_basic_2";
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
    spawn_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectspawntarget] = TURNVARS["skippedto"];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectspawntarget,
          id: newunitid,
          group: "toads",
          owner: 1
        };
      }
      BATTLEVARS.plr1 = (BATTLEVARS.plr1 || 0) + -1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        LINKS.endTurn = "startTurn_basic_2";
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
        NEXTSPAWNID,
        anim
      };
    },
    hop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        forbidden: { ...step.ARTIFACTS.forbidden },
        hoptargets: { ...step.ARTIFACTS.hoptargets },
        jumptargets: { ...step.ARTIFACTS.jumptargets },
        knot: step.ARTIFACTS.knot,
        spawns: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.hoptargets = {};
      {
        let unitid = (
          UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selecthoptarget
          };
        }
      }
      TURNVARS.skippedto = MARKS.selecthoptarget;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1 && !ARTIFACTS.forbidden[POS]) {
              ARTIFACTS.hoptargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let STARTPOS = TURNVARS["skippedto"];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.spawns[POS] = emptyObj;
          }
        }
        ARTIFACTS.forbidden[STARTPOS] = emptyObj;
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      if (!!BATTLEVARS["plr2"]) {
        for (const pos of Object.keys(ARTIFACTS.spawns)) {
          LINKS.marks[pos] = "selectspawntarget_basic_2";
        }
      }
      for (const pos of Object.keys(ARTIFACTS.hoptargets)) {
        LINKS.marks[pos] = "selecthoptarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
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
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        jumptargets: { ...step.ARTIFACTS.jumptargets },
        knot: step.ARTIFACTS.knot,
        forbidden: step.ARTIFACTS.forbidden,
        hoptargets: step.ARTIFACTS.hoptargets,
        jumpvictims: step.ARTIFACTS.jumpvictims
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      ARTIFACTS.jumptargets = {};
      {
        let unitid = (
          UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      delete UNITDATA[
        (UNITLAYERS.units[Object.keys(ARTIFACTS.jumpvictims)[0]] || {}).id
      ];
      BATTLEVARS.plr2 = (BATTLEVARS.plr2 || 0) + 1;
      BATTLEVARS.plr1 = (BATTLEVARS.plr1 || 0) + -1;
      BATTLEVARS.peace = 0;
      TURNVARS.skippedto = MARKS.selectjumptarget;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = TURNVARS["skippedto"] || MARKS.selectunit;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              if (WALKLENGTH === 1) {
                ARTIFACTS.jumptargets[POS] = { dir: DIR };
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
      }
      if (!!BATTLEVARS["peace"] && BATTLEVARS["plr2"] === 1) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "cheese";
        LINKS.endMarks = Object.keys(UNITLAYERS.oppunits);
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
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    spawn_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectspawntarget] = TURNVARS["skippedto"];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectspawntarget,
          id: newunitid,
          group: "toads",
          owner: 2
        };
      }
      BATTLEVARS.plr2 = (BATTLEVARS.plr2 || 0) + -1;
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, toads: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (!!BATTLEVARS["peace"] && BATTLEVARS["plr2"] === 1) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "cheese";
        LINKS.endMarks = Object.keys(UNITLAYERS.oppunits);
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
        TURNVARS,
        BATTLEVARS,
        NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let ARTIFACTS = step.ARTIFACTS;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              { text: "Your reserve is" },
              { text: BATTLEVARS["plr1"] },
              { text: "and" },
              { player: 2 },
              { text: "has" },
              { text: BATTLEVARS["plr2"] },
              { text: "." }
            ]
          }),
          Object.keys(ARTIFACTS.knot).length === 0
            ? collapseContent({
                line: [
                  { text: "Select any" },
                  { unittype: ["pawn", 1] },
                  { text: "to hop or jump with" }
                ]
              })
            : collapseContent({
                line: [
                  { text: "Select a" },
                  { unittype: ["pawn", 1] },
                  { text: "to hop or jump out of the knot" }
                ]
              })
        ]
      });
    },
    hop_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.hoptargets).length !== 0
                ? { text: "a subsequent hop" }
                : undefined,
              Object.keys(ARTIFACTS.jumptargets).length !== 0
                ? { text: "a jump" }
                : undefined,
              Object.keys(ARTIFACTS.spawns).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to spawn a new" },
                      { unittype: ["pawn", 1] }
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
    jump_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return Object.keys(ARTIFACTS.jumptargets).length === 0
        ? collapseContent({
            line: [
              { text: "Press" },
              { endTurn: "end turn" },
              { text: "to submit your moves and hand over to" },
              { player: 2 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select a subsequent jump or press" },
              { endTurn: "end turn" },
              { text: "to hand over to" },
              { player: 2 }
            ]
          });
    },
    spawn_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 1] },
          { text: "or" },
          { unittype: ["pawn", 2] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to hop or jump over" }
        ]
      });
    },
    selecthoptarget_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "hop" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                  {}
                ).group
              ],
              (
                UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                {}
              ).owner,
              TURNVARS["skippedto"] || MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selecthoptarget }
        ]
      });
    },
    selectjumptarget_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                  {}
                ).group
              ],
              (
                UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                {}
              ).owner,
              TURNVARS["skippedto"] || MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget },
          { text: "and steal" },
          collapseContent({
            line: Object.keys(ARTIFACTS.jumpvictims)
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
          { text: "to your reserve" }
        ]
      });
    },
    selectspawntarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "spawn" },
          { text: "to place" },
          { unit: ["pawn", 1, MARKS.selectspawntarget] },
          { text: "from your reserve" }
        ]
      });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let ARTIFACTS = step.ARTIFACTS;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              { text: "Your reserve is" },
              { text: BATTLEVARS["plr2"] },
              { text: "and" },
              { player: 1 },
              { text: "has" },
              { text: BATTLEVARS["plr1"] },
              { text: "." }
            ]
          }),
          Object.keys(ARTIFACTS.knot).length === 0
            ? collapseContent({
                line: [
                  { text: "Select any" },
                  { unittype: ["pawn", 2] },
                  { text: "to hop or jump with" }
                ]
              })
            : collapseContent({
                line: [
                  { text: "Select a" },
                  { unittype: ["pawn", 2] },
                  { text: "to hop or jump out of the knot" }
                ]
              })
        ]
      });
    },
    hop_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.hoptargets).length !== 0
                ? { text: "a subsequent hop" }
                : undefined,
              Object.keys(ARTIFACTS.jumptargets).length !== 0
                ? { text: "a jump" }
                : undefined,
              Object.keys(ARTIFACTS.spawns).length !== 0
                ? collapseContent({
                    line: [
                      { text: "where to spawn a new" },
                      { unittype: ["pawn", 2] }
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
    jump_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return Object.keys(ARTIFACTS.jumptargets).length === 0
        ? collapseContent({
            line: [
              { text: "Press" },
              { endTurn: "end turn" },
              { text: "to submit your moves and hand over to" },
              { player: 1 }
            ]
          })
        : collapseContent({
            line: [
              { text: "Select a subsequent jump or press" },
              { endTurn: "end turn" },
              { text: "to hand over to" },
              { player: 1 }
            ]
          });
    },
    spawn_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select a" },
          { unittype: ["pawn", 2] },
          { text: "or" },
          { unittype: ["pawn", 1] },
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to hop or jump over" }
        ]
      });
    },
    selecthoptarget_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "hop" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                  {}
                ).group
              ],
              (
                UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                {}
              ).owner,
              TURNVARS["skippedto"] || MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selecthoptarget }
        ]
      });
    },
    selectjumptarget_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to make" },
          {
            unit: [
              iconMapping[
                (
                  UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                  {}
                ).group
              ],
              (
                UNITLAYERS.units[TURNVARS["skippedto"] || MARKS.selectunit] ||
                {}
              ).owner,
              TURNVARS["skippedto"] || MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget },
          { text: "and steal" },
          collapseContent({
            line: Object.keys(ARTIFACTS.jumpvictims)
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
          { text: "to your reserve" }
        ]
      });
    },
    selectspawntarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "spawn" },
          { text: "to place" },
          { unit: ["pawn", 2, MARKS.selectspawntarget] },
          { text: "from your reserve" }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
