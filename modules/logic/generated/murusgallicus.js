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
const iconMapping = { towers: "rook", walls: "pawn", catapults: "queen" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  towers: [
    ["units", "towers"],
    ["units", "myunits", "towers", "mytowers"],
    ["units", "oppunits", "towers", "opptowers"]
  ],
  walls: [
    ["units", "walls"],
    ["units", "myunits", "walls", "mywalls"],
    ["units", "oppunits", "walls", "oppwalls"]
  ],
  catapults: [
    ["units", "catapults"],
    ["units", "myunits", "catapults", "mycatapults"],
    ["units", "oppunits", "catapults", "oppcatapults"]
  ]
};
const groupLayers2 = {
  towers: [
    ["units", "towers"],
    ["units", "oppunits", "towers", "opptowers"],
    ["units", "myunits", "towers", "mytowers"]
  ],
  walls: [
    ["units", "walls"],
    ["units", "oppunits", "walls", "oppwalls"],
    ["units", "myunits", "walls", "mywalls"]
  ],
  catapults: [
    ["units", "catapults"],
    ["units", "oppunits", "catapults", "oppcatapults"],
    ["units", "myunits", "catapults", "mycatapults"]
  ]
};
const emptyArtifactLayers_basic = {
  firetargets: {},
  movetargets: {},
  madetowers: {},
  madewalls: {},
  madecatapults: {},
  crushtargets: {}
};
const emptyArtifactLayers_advanced = {
  firetargets: {},
  movetargets: {},
  madecatapults: {},
  madetowers: {},
  madewalls: {},
  crushtargets: {}
};
const game = {
  gameId: "murusgallicus",
  commands: { move: {}, crush: {}, sacrifice: {}, fire: {} },
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
      towers: {},
      mytowers: {},
      opptowers: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {}
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
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls,
        catapults: oldUnitLayers.catapults,
        mycatapults: oldUnitLayers.oppcatapults,
        oppcatapults: oldUnitLayers.mycatapults
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_basic_1";
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
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls,
        catapults: oldUnitLayers.catapults,
        mycatapults: oldUnitLayers.oppcatapults,
        oppcatapults: oldUnitLayers.mycatapults
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_basic_2";
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
    startTurn_advanced_1: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls,
        catapults: oldUnitLayers.catapults,
        mycatapults: oldUnitLayers.oppcatapults,
        oppcatapults: oldUnitLayers.mycatapults
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_advanced_1";
      }
      for (const pos of Object.keys(UNITLAYERS.mycatapults)) {
        LINKS.marks[pos] = "selectcatapult_advanced_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_advanced,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_advanced_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        towers: oldUnitLayers.towers,
        mytowers: oldUnitLayers.opptowers,
        opptowers: oldUnitLayers.mytowers,
        walls: oldUnitLayers.walls,
        mywalls: oldUnitLayers.oppwalls,
        oppwalls: oldUnitLayers.mywalls,
        catapults: oldUnitLayers.catapults,
        mycatapults: oldUnitLayers.oppcatapults,
        oppcatapults: oldUnitLayers.mycatapults
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.mytowers)) {
        LINKS.marks[pos] = "selecttower_advanced_2";
      }
      for (const pos of Object.keys(UNITLAYERS.mycatapults)) {
        LINKS.marks[pos] = "selectcatapult_advanced_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_advanced,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selecttower_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
          ) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_basic_1";
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
    selectmove_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: {},
        madewalls: {},
        madecatapults: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[
            UNITLAYERS.myunits[POS]
              ? UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ][POS] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcrush_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.crush = "crush_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selecttower_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mytowers };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
          ) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_basic_2";
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
    selectmove_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: {},
        madewalls: {},
        madecatapults: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[
            UNITLAYERS.myunits[POS]
              ? UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ][POS] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove] ? "madetowers" : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcrush_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.crush = "crush_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selecttower: step.MARKS.selecttower, selectcrush: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selecttower_advanced_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mycatapults };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
          ) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_advanced_1";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_advanced_1";
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
    selectmove_advanced_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madecatapults: {},
        madetowers: {},
        madewalls: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[
            UNITLAYERS.myunits[POS]
              ? UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ][POS] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove]
            ? UNITLAYERS.mytowers[MARKS.selectmove]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_advanced_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcrush_advanced_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectcrush: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      LINKS.commands.crush = "crush_advanced_1";
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        LINKS.commands.sacrifice = "sacrifice_advanced_1";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcatapult_advanced_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        firetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectcatapult: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        for (let DIR of [7, 8, 1, 2, 3]) {
          let MAX = 3;
          let POS = MARKS.selectcatapult;
          let LENGTH = 0;
          let STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            LENGTH++;
            STEP++;
            if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
              ARTIFACTS.firetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firetargets)) {
        LINKS.marks[pos] = "selectfire_advanced_1";
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
    selectfire_advanced_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.fire = "fire_advanced_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectcatapult: step.MARKS.selectcatapult,
          selectfire: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selecttower_advanced_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        crushtargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = { ...UNITLAYERS.oppunits, ...UNITLAYERS.mycatapults };
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = MARKS.selecttower;
          let LENGTH = 0;
          while (
            LENGTH < MAX &&
            (POS = connections[POS][DIR]) &&
            !BLOCKS[POS]
          ) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          let WALKLENGTH = walkedsquares.length;
          let STEP = 0;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (WALKLENGTH === 2 && STEP === 2) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let startconnections = connections[MARKS.selecttower];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (
            POS &&
            { ...UNITLAYERS.oppcatapults, ...UNITLAYERS.oppwalls }[POS]
          ) {
            ARTIFACTS.crushtargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmove_advanced_2";
      }
      for (const pos of Object.keys(ARTIFACTS.crushtargets)) {
        LINKS.marks[pos] = "selectcrush_advanced_2";
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
    selectmove_advanced_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madecatapults: {},
        madetowers: {},
        madewalls: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectmove: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmove;
        let POS =
          connections[STARTPOS][
            relativeDirs[5][(ARTIFACTS.movetargets[MARKS.selectmove] || {}).dir]
          ];
        if (POS) {
          ARTIFACTS[
            UNITLAYERS.myunits[POS]
              ? UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ][POS] = emptyObj;
        }
        ARTIFACTS[
          UNITLAYERS.myunits[MARKS.selectmove]
            ? UNITLAYERS.mytowers[MARKS.selectmove]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ][STARTPOS] = emptyObj;
      }
      LINKS.commands.move = "move_advanced_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcrush_advanced_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selecttower: step.MARKS.selecttower,
        selectcrush: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      LINKS.commands.crush = "crush_advanced_2";
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        LINKS.commands.sacrifice = "sacrifice_advanced_2";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectcatapult_advanced_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        firetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectcatapult: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        for (let DIR of [3, 4, 5, 6, 7]) {
          let MAX = 3;
          let POS = MARKS.selectcatapult;
          let LENGTH = 0;
          let STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR])) {
            LENGTH++;
            STEP++;
            if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
              ARTIFACTS.firetargets[POS] = emptyObj;
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firetargets)) {
        LINKS.marks[pos] = "selectfire_advanced_2";
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
    selectfire_advanced_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.fire = "fire_advanced_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectcatapult: step.MARKS.selectcatapult,
          selectfire: newMarkPos
        },
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls,
        madecatapults: step.ARTIFACTS.madecatapults
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      anim.exitTo[MARKS.selecttower] = MARKS.selectmove;
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
      }
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "catapults"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 1
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        NEXTSPAWNID,
        anim
      };
    },
    crush_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 1]);
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      } else {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        );
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls,
        madecatapults: step.ARTIFACTS.madecatapults
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      anim.exitTo[MARKS.selecttower] = MARKS.selectmove;
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
      }
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "catapults"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 2
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        NEXTSPAWNID,
        anim
      };
    },
    crush_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 2]);
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      } else {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        );
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
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    move_advanced_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madecatapults: step.ARTIFACTS.madecatapults,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      anim.exitTo[MARKS.selecttower] = MARKS.selectmove;
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
      }
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 1]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "catapults"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 1
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_2";
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
    crush_advanced_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 1]);
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      } else {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    sacrifice_advanced_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    fire_advanced_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!UNITLAYERS.oppunits[MARKS.selectfire]) {
        anim.enterFrom[MARKS.selectfire] = MARKS.selectcatapult;
      } else {
        anim.ghosts.push([MARKS.selectcatapult, MARKS.selectfire, "pawn", 1]);
      }
      if (UNITLAYERS.oppwalls[MARKS.selectfire]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectfire] || {}).id];
      } else {
        if (UNITLAYERS.oppunits[MARKS.selectfire]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectfire] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: UNITLAYERS.oppcatapults[MARKS.selectfire]
                  ? "towers"
                  : "walls"
              };
            }
          }
        } else {
          {
            let newunitid = "spawn" + NEXTSPAWNID++;
            UNITDATA[newunitid] = {
              pos: MARKS.selectfire,
              id: newunitid,
              group: "walls",
              owner: 1
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcatapult] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID,
        anim
      };
    },
    move_advanced_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        crushtargets: step.ARTIFACTS.crushtargets,
        madecatapults: step.ARTIFACTS.madecatapults,
        madetowers: step.ARTIFACTS.madetowers,
        madewalls: step.ARTIFACTS.madewalls
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        anim.enterFrom[LOOPPOS] = MARKS.selecttower;
      }
      anim.exitTo[MARKS.selecttower] = MARKS.selectmove;
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
      }
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        anim.ghosts.push([MARKS.selecttower, LOOPPOS, "pawn", 2]);
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      for (let LOOPPOS in ARTIFACTS.madecatapults) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "catapults"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madetowers) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.madewalls) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "walls",
            owner: 2
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_1";
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
    crush_advanced_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selecttower, MARKS.selectcrush, "pawn", 2]);
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selecttower] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      if (UNITLAYERS.oppcatapults[MARKS.selectcrush]) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "towers"
            };
          }
        }
      } else {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectcrush] || {}).id];
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    sacrifice_advanced_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.exitTo[MARKS.selecttower] = MARKS.selectcrush;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcrush] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "walls"
          };
        }
      }
      delete UNITDATA[(UNITLAYERS.units[MARKS.selecttower] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        anim
      };
    },
    fire_advanced_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!UNITLAYERS.oppunits[MARKS.selectfire]) {
        anim.enterFrom[MARKS.selectfire] = MARKS.selectcatapult;
      } else {
        anim.ghosts.push([MARKS.selectcatapult, MARKS.selectfire, "pawn", 2]);
      }
      if (UNITLAYERS.oppwalls[MARKS.selectfire]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectfire] || {}).id];
      } else {
        if (UNITLAYERS.oppunits[MARKS.selectfire]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectfire] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: UNITLAYERS.oppcatapults[MARKS.selectfire]
                  ? "towers"
                  : "walls"
              };
            }
          }
        } else {
          {
            let newunitid = "spawn" + NEXTSPAWNID++;
            UNITDATA[newunitid] = {
              pos: MARKS.selectfire,
              id: newunitid,
              group: "walls",
              owner: 2
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectcatapult] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "towers"
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        towers: {},
        mytowers: {},
        opptowers: {},
        walls: {},
        mywalls: {},
        oppwalls: {},
        catapults: {},
        mycatapults: {},
        oppcatapults: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        ).length !== 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.opphomerow))
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
        );
      } else {
        LINKS.endTurn = "startTurn_advanced_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
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
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 1] },
          { text: "or" },
          { unittype: ["queen", 1] },
          { text: "to act with" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    crush_basic_1: () => defaultInstruction(1),
    selecttower_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 2] },
                      { text: "or" },
                      { unittype: ["queen", 2] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 1, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { text: "into" },
                      { unittype: ["rook", 1] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.madecatapults).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madecatapults)
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
                      { text: "into" },
                      { unittype: ["queen", 1] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "to a" },
          { unittype: ["pawn", 1] },
          { text: "and" },
          UNITLAYERS.walls[MARKS.selectcrush]
            ? collapseContent({
                line: [
                  { text: "destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["rook", 2] },
                  { text: ", or" },
                  { command: "sacrifice" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selecttower] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
                      MARKS.selecttower
                    ]
                  },
                  { text: "entirely to reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["pawn", 2] },
                  { text: "!" }
                ]
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 2] },
          { text: "or" },
          { unittype: ["queen", 2] },
          { text: "to act with" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    crush_basic_2: () => defaultInstruction(2),
    selecttower_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 1] },
                      { text: "or" },
                      { unittype: ["queen", 1] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 2, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { text: "into" },
                      { unittype: ["rook", 2] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.madecatapults).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madecatapults)
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
                      { text: "into" },
                      { unittype: ["queen", 2] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "to a" },
          { unittype: ["pawn", 2] },
          { text: "and" },
          UNITLAYERS.walls[MARKS.selectcrush]
            ? collapseContent({
                line: [
                  { text: "destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["rook", 1] },
                  { text: ", or" },
                  { command: "sacrifice" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selecttower] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
                      MARKS.selecttower
                    ]
                  },
                  { text: "entirely to reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["pawn", 1] },
                  { text: "!" }
                ]
              })
        ]
      });
    },
    startTurn_advanced_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 1] },
          { text: "or" },
          { unittype: ["queen", 1] },
          { text: "to act with" }
        ]
      });
    },
    move_advanced_1: () => defaultInstruction(1),
    crush_advanced_1: () => defaultInstruction(1),
    sacrifice_advanced_1: () => defaultInstruction(1),
    fire_advanced_1: () => defaultInstruction(1),
    selecttower_advanced_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 2] },
                      { text: "or" },
                      { unittype: ["queen", 2] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_advanced_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 1, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { text: "into" },
                      { unittype: ["rook", 1] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.madecatapults).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madecatapults)
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
                      { text: "into" },
                      { unittype: ["queen", 1] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_advanced_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "to a" },
          { unittype: ["pawn", 1] },
          { text: "and" },
          UNITLAYERS.walls[MARKS.selectcrush]
            ? collapseContent({
                line: [
                  { text: "destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["rook", 2] },
                  { text: ", or" },
                  { command: "sacrifice" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selecttower] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
                      MARKS.selecttower
                    ]
                  },
                  { text: "entirely to reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["pawn", 2] },
                  { text: "!" }
                ]
              })
        ]
      });
    },
    selectcatapult_advanced_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to fire the top section of" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
              (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner,
              MARKS.selectcatapult
            ]
          }
        ]
      });
    },
    selectfire_advanced_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
              (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner,
              MARKS.selectcatapult
            ]
          },
          { text: "into a" },
          { unittype: ["rook", 1] },
          UNITLAYERS.walls[MARKS.selectfire]
            ? collapseContent({
                line: [
                  { text: "and destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectfire] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectfire] || {}).owner,
                      MARKS.selectfire
                    ]
                  }
                ]
              })
            : UNITLAYERS.units[MARKS.selectfire]
            ? collapseContent({
                line: [
                  { text: "and reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectfire] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectfire] || {}).owner,
                      MARKS.selectfire
                    ]
                  },
                  { text: "to a" },
                  UNITLAYERS.catapults[MARKS.selectfire]
                    ? { unittype: ["rook", 2] }
                    : { unittype: ["pawn", 2] }
                ]
              })
            : collapseContent({
                line: [
                  { text: "and spawn" },
                  { unit: ["pawn", 1, MARKS.selectfire] }
                ]
              })
        ]
      });
    },
    startTurn_advanced_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["rook", 2] },
          { text: "or" },
          { unittype: ["queen", 2] },
          { text: "to act with" }
        ]
      });
    },
    move_advanced_2: () => defaultInstruction(2),
    crush_advanced_2: () => defaultInstruction(2),
    sacrifice_advanced_2: () => defaultInstruction(2),
    fire_advanced_2: () => defaultInstruction(2),
    selecttower_advanced_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.movetargets).length !== 0
                ? { text: "a move target" }
                : undefined,
              Object.keys(ARTIFACTS.crushtargets).length !== 0
                ? collapseContent({
                    line: [
                      { text: "a" },
                      { unittype: ["pawn", 1] },
                      { text: "or" },
                      { unittype: ["queen", 1] },
                      { text: "to crush" }
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
          }),
          { text: "for" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          }
        ]
      });
    },
    selectmove_advanced_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to overturn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "," },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.madewalls).length !== 0
                ? collapseContent({
                    line: [
                      { text: "creating" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madewalls)
                          .map(p => ({ unit: [iconMapping["walls"], 2, p] }))
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
                : undefined,
              Object.keys(ARTIFACTS.madetowers).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madetowers)
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
                      { text: "into" },
                      { unittype: ["rook", 2] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.madecatapults).length !== 0
                ? collapseContent({
                    line: [
                      { text: "turning" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.madecatapults)
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
                      { text: "into" },
                      { unittype: ["queen", 2] }
                    ]
                  })
                : undefined
            ]
              .filter(i => !!i)
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
      });
    },
    selectcrush_advanced_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "crush" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selecttower] || {}).group],
              (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
              MARKS.selecttower
            ]
          },
          { text: "to a" },
          { unittype: ["pawn", 2] },
          { text: "and" },
          UNITLAYERS.walls[MARKS.selectcrush]
            ? collapseContent({
                line: [
                  { text: "destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  }
                ]
              })
            : collapseContent({
                line: [
                  { text: "reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["rook", 1] },
                  { text: ", or" },
                  { command: "sacrifice" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selecttower] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selecttower] || {}).owner,
                      MARKS.selecttower
                    ]
                  },
                  { text: "entirely to reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectcrush] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectcrush] || {}).owner,
                      MARKS.selectcrush
                    ]
                  },
                  { text: "to a" },
                  { unittype: ["pawn", 1] },
                  { text: "!" }
                ]
              })
        ]
      });
    },
    selectcatapult_advanced_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "where to fire the top section of" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
              (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner,
              MARKS.selectcatapult
            ]
          }
        ]
      });
    },
    selectfire_advanced_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to turn" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectcatapult] || {}).group],
              (UNITLAYERS.units[MARKS.selectcatapult] || {}).owner,
              MARKS.selectcatapult
            ]
          },
          { text: "into a" },
          { unittype: ["rook", 2] },
          UNITLAYERS.walls[MARKS.selectfire]
            ? collapseContent({
                line: [
                  { text: "and destroy" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectfire] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectfire] || {}).owner,
                      MARKS.selectfire
                    ]
                  }
                ]
              })
            : UNITLAYERS.units[MARKS.selectfire]
            ? collapseContent({
                line: [
                  { text: "and reduce" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectfire] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectfire] || {}).owner,
                      MARKS.selectfire
                    ]
                  },
                  { text: "to a" },
                  UNITLAYERS.catapults[MARKS.selectfire]
                    ? { unittype: ["rook", 1] }
                    : { unittype: ["pawn", 1] }
                ]
              })
            : collapseContent({
                line: [
                  { text: "and spawn" },
                  { unit: ["pawn", 2, MARKS.selectfire] }
                ]
              })
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
      code: "x",
      arr: {
        marks: ["c3"],
        potentialMarks: ["e3", "a5", "e5"],
        setup: {
          towers: {
            "1": ["e1", "g1", "h1", "b2", "c2", "b3", "c3"],
            "2": ["f5", "b6", "g6", "c7", "d7", "e7"]
          },
          walls: {
            "1": ["e2", "d3"],
            "2": ["b5", "c5", "g5", "f6"]
          }
        }
      }
    },
    {
      ruleset: "advanced",
      board: "basic",
      setup: "basic",
      desc: "advanced",
      code: "k",
      arr: {
        marks: ["c3"],
        potentialMarks: ["a3", "a5", "c5", "e5", "c6", "f6"],
        setup: {
          towers: {
            "1": ["g1", "d3", "c4"],
            "2": ["d5", "e5", "b6", "f6", "g6"]
          },
          walls: {
            "1": ["g2", "e3", "f3", "b4"],
            "2": ["d4", "b5", "c5"]
          },
          catapults: {
            "1": ["b3", "c3"],
            "2": ["f5"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 7,
      width: 8,
      terrain: {
        homerow: {
          "1": [
            {
              rect: ["a1", "h1"]
            }
          ],
          "2": [
            {
              rect: ["a7", "h7"]
            }
          ]
        }
      }
    }
  },
  setups: {
    basic: {
      towers: {
        "1": [
          {
            rect: ["a1", "h1"]
          }
        ],
        "2": [
          {
            rect: ["a7", "h7"]
          }
        ]
      }
    }
  }
};
export default game;
