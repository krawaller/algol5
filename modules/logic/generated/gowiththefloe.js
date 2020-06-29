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
const iconMapping = { seals: "king", bears: "queen", holes: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  seals: [
    ["units", "seals"],
    ["units", "myunits", "seals"],
    ["units", "oppunits", "seals"]
  ],
  bears: [
    ["units", "bears"],
    ["units", "myunits", "bears"],
    ["units", "oppunits", "bears"]
  ],
  holes: [
    ["units", "holes"],
    ["units", "myunits", "holes"],
    ["units", "oppunits", "holes"]
  ]
};
const groupLayers2 = {
  seals: [
    ["units", "seals"],
    ["units", "oppunits", "seals"],
    ["units", "myunits", "seals"]
  ],
  bears: [
    ["units", "bears"],
    ["units", "oppunits", "bears"],
    ["units", "myunits", "bears"]
  ],
  holes: [
    ["units", "holes"],
    ["units", "oppunits", "holes"],
    ["units", "myunits", "holes"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  eattargets: {},
  movetargets: {},
  jumptargets: {},
  canmove: {},
  cracks: {}
};
const game = {
  gameId: "gowiththefloe",
  commands: { move: {}, jump: {}, eat: {} },
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
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      seals: {},
      bears: {},
      holes: {}
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
        oppunits: oldUnitLayers.myunits,
        seals: oldUnitLayers.seals,
        bears: oldUnitLayers.bears,
        holes: oldUnitLayers.holes
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        seals: oldUnitLayers.seals,
        bears: oldUnitLayers.bears,
        holes: oldUnitLayers.holes
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        jumptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = {
          ...UNITLAYERS.seals,
          ...UNITLAYERS.bears,
          ...TERRAIN1.water,
          ...UNITLAYERS.holes
        };
        for (let DIR of roseDirs) {
          let MAX = 2;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.holes;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(
            k =>
              !UNITLAYERS.units.hasOwnProperty(k) &&
              !TERRAIN1.water.hasOwnProperty(k) &&
              !UNITLAYERS.holes.hasOwnProperty(k)
          )
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : LENGTH === MAX
              ? "reachedmax"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1) {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
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
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        cracks: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      {
        let BLOCKS = { [MARKS.selectunit]: 1 };
        let POS = MARKS.selectmovetarget;
        while (
          (POS =
            connections[POS][
              relativeDirs[
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ][5]
            ]) &&
          !BLOCKS[POS]
        ) {
          ARTIFACTS.cracks[POS] = emptyObj;
        }
        if (BLOCKS[POS]) {
          ARTIFACTS.cracks[POS] = emptyObj;
        }
      }
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectjumptarget: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        jumptargets: {},
        eattargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = {
          ...UNITLAYERS.seals,
          ...UNITLAYERS.bears,
          ...TERRAIN2.water,
          ...UNITLAYERS.holes
        };
        for (let DIR of roseDirs) {
          let MAX = 2;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            LENGTH++;
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.holes;
        let BLOCKS = Object.keys(BOARD.board)
          .filter(
            k =>
              !UNITLAYERS.units.hasOwnProperty(k) &&
              !TERRAIN2.water.hasOwnProperty(k) &&
              !UNITLAYERS.holes.hasOwnProperty(k)
          )
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = 1;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : LENGTH === MAX
              ? "reachedmax"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (WALKLENGTH === 1) {
              ARTIFACTS.jumptargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.seals[POS]) {
            ARTIFACTS.eattargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.jumptargets)) {
        LINKS.marks[pos] = "selectjumptarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.eattargets)) {
        LINKS.marks[pos] = "selecteattarget_basic_2";
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
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        eattargets: step.ARTIFACTS.eattargets,
        cracks: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      {
        let BLOCKS = { [MARKS.selectunit]: 1 };
        let POS = MARKS.selectmovetarget;
        while (
          (POS =
            connections[POS][
              relativeDirs[
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ][5]
            ]) &&
          !BLOCKS[POS]
        ) {
          ARTIFACTS.cracks[POS] = emptyObj;
        }
        if (BLOCKS[POS]) {
          ARTIFACTS.cracks[POS] = emptyObj;
        }
      }
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectjumptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.jump = "jump_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectjumptarget: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selecteattarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.eat = "eat_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selecteattarget: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        cracks: step.ARTIFACTS.cracks,
        canmove: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.cracks) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "holes",
            owner: 0
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        seals: {},
        bears: {},
        holes: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.seals) {
          for (let DIR of roseDirs) {
            let MAX = 2;
            let POS = STARTPOS;
            let walkpositionstocount = Object.keys(TERRAIN1.nowater)
              .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            let CURRENTCOUNT = 0;
            let LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR])) {
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
              LENGTH++;
            }
            let TOTALCOUNT = CURRENTCOUNT;
            POS = STARTPOS;
            if (TOTALCOUNT > 0) {
              ARTIFACTS.canmove[POS] = emptyObj;
            }
          }
        }
      }
      if (Object.keys(UNITLAYERS.seals).length === 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "sealseaten";
      } else if (
        Object.keys(ARTIFACTS.canmove).length !==
        Object.keys(UNITLAYERS.seals).length
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "safeseal";
        LINKS.endMarks = Object.keys(
          Object.keys(UNITLAYERS.seals)
            .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        );
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
        NEXTSPAWNID
      };
    },
    jump_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        canmove: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectunit,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        seals: {},
        bears: {},
        holes: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.seals) {
          for (let DIR of roseDirs) {
            let MAX = 2;
            let POS = STARTPOS;
            let walkpositionstocount = Object.keys(TERRAIN1.nowater)
              .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            let CURRENTCOUNT = 0;
            let LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR])) {
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
              LENGTH++;
            }
            let TOTALCOUNT = CURRENTCOUNT;
            POS = STARTPOS;
            if (TOTALCOUNT > 0) {
              ARTIFACTS.canmove[POS] = emptyObj;
            }
          }
        }
      }
      if (Object.keys(UNITLAYERS.seals).length === 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "sealseaten";
      } else if (
        Object.keys(ARTIFACTS.canmove).length !==
        Object.keys(UNITLAYERS.seals).length
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "safeseal";
        LINKS.endMarks = Object.keys(
          Object.keys(UNITLAYERS.seals)
            .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        );
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
        NEXTSPAWNID
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        eattargets: step.ARTIFACTS.eattargets,
        cracks: step.ARTIFACTS.cracks,
        canmove: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.cracks) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "holes",
            owner: 0
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        seals: {},
        bears: {},
        holes: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.seals) {
          for (let DIR of roseDirs) {
            let MAX = 2;
            let POS = STARTPOS;
            let walkpositionstocount = Object.keys(TERRAIN2.nowater)
              .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            let CURRENTCOUNT = 0;
            let LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR])) {
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
              LENGTH++;
            }
            let TOTALCOUNT = CURRENTCOUNT;
            POS = STARTPOS;
            if (TOTALCOUNT > 0) {
              ARTIFACTS.canmove[POS] = emptyObj;
            }
          }
        }
      }
      if (Object.keys(UNITLAYERS.seals).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "sealseaten";
      } else if (
        Object.keys(ARTIFACTS.canmove).length !==
        Object.keys(UNITLAYERS.seals).length
      ) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "safeseal";
        LINKS.endMarks = Object.keys(
          Object.keys(UNITLAYERS.seals)
            .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        );
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
        NEXTSPAWNID
      };
    },
    jump_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        eattargets: step.ARTIFACTS.eattargets,
        canmove: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectjumptarget
          };
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectunit,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        seals: {},
        bears: {},
        holes: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.seals) {
          for (let DIR of roseDirs) {
            let MAX = 2;
            let POS = STARTPOS;
            let walkpositionstocount = Object.keys(TERRAIN2.nowater)
              .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            let CURRENTCOUNT = 0;
            let LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR])) {
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
              LENGTH++;
            }
            let TOTALCOUNT = CURRENTCOUNT;
            POS = STARTPOS;
            if (TOTALCOUNT > 0) {
              ARTIFACTS.canmove[POS] = emptyObj;
            }
          }
        }
      }
      if (Object.keys(UNITLAYERS.seals).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "sealseaten";
      } else if (
        Object.keys(ARTIFACTS.canmove).length !==
        Object.keys(UNITLAYERS.seals).length
      ) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "safeseal";
        LINKS.endMarks = Object.keys(
          Object.keys(UNITLAYERS.seals)
            .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        );
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
        NEXTSPAWNID
      };
    },
    eat_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        jumptargets: step.ARTIFACTS.jumptargets,
        eattargets: step.ARTIFACTS.eattargets,
        canmove: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.exitTo[MARKS.selectunit] = MARKS.selecteattarget;
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectunit] || {}).id];
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecteattarget] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        seals: {},
        bears: {},
        holes: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.seals) {
          for (let DIR of roseDirs) {
            let MAX = 2;
            let POS = STARTPOS;
            let walkpositionstocount = Object.keys(TERRAIN2.nowater)
              .filter(k => !UNITLAYERS.holes.hasOwnProperty(k))
              .reduce((m, k) => {
                m[k] = emptyObj;
                return m;
              }, {});
            let CURRENTCOUNT = 0;
            let LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR])) {
              CURRENTCOUNT += walkpositionstocount[POS] ? 1 : 0;
              LENGTH++;
            }
            let TOTALCOUNT = CURRENTCOUNT;
            POS = STARTPOS;
            if (TOTALCOUNT > 0) {
              ARTIFACTS.canmove[POS] = emptyObj;
            }
          }
        }
      }
      if (Object.keys(UNITLAYERS.seals).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "sealseaten";
      } else if (
        Object.keys(ARTIFACTS.canmove).length !==
        Object.keys(UNITLAYERS.seals).length
      ) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "safeseal";
        LINKS.endMarks = Object.keys(
          Object.keys(UNITLAYERS.seals)
            .filter(k => !ARTIFACTS.canmove.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        );
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["king", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    jump_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          }
        ]
      });
    },
    selectmovetarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move the" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectjumptarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["queen", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    jump_basic_2: () => defaultInstruction(2),
    eat_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          collapseContent({
            line: [
              { text: "or a neighbouring" },
              { unittype: ["king", 1] },
              { text: "to eat" }
            ]
          })
        ]
      });
    },
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move the" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    selectjumptarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "jump" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "jump to" },
          { pos: MARKS.selectjumptarget }
        ]
      });
    },
    selecteattarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "eat" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "consume" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selecteattarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selecteattarget] || {}).owner,
              MARKS.selecteattarget
            ]
          },
          { text: ", removing both units from the battle" }
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
      code: "s",
      arr: {
        marks: ["c7"],
        potentialMarks: ["a5", "c5", "e5", "c6", "d6", "c8", "d8"],
        setup: {
          holes: {
            "0": [
              "b2",
              "g2",
              "c3",
              "f3",
              "b4",
              "c4",
              "d4",
              "b6",
              "b7",
              "d7",
              "e7",
              "f7",
              "g7"
            ]
          },
          seals: {
            "1": ["d2", "b5"]
          },
          bears: {
            "2": ["e4", "c7"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 8,
      width: 8,
      terrain: {
        water: [
          "a1",
          "a2",
          "a7",
          "a8",
          "b1",
          "b8",
          "g1",
          "g8",
          "h1",
          "h2",
          "h7",
          "h8"
        ]
      }
    }
  },
  setups: {
    basic: {
      seals: {
        "1": ["b2", "b7"]
      },
      bears: {
        "2": ["g2", "g7"]
      }
    }
  }
};
export default game;
