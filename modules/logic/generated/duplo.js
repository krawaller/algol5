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
  soldiers: [
    ["units", "soldiers"],
    ["units", "myunits", "soldiers", "mysoldiers"],
    ["units", "oppunits", "soldiers", "oppsoldiers"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units", "soldiers"],
    ["units", "oppunits", "soldiers", "oppsoldiers"],
    ["units", "myunits", "soldiers", "mysoldiers"]
  ]
};
const emptyArtifactLayers_basic = {
  spawndirs: {},
  growstarts: {},
  targets: {},
  potentialopptargets: {},
  spawns: {}
};
const game = {
  gameId: "duplo",
  commands: { deploy: {}, expand: {} },
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
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN + 1;
      if (TURN > 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploy_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        soldiers: oldUnitLayers.soldiers,
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
      if (TURN > 1) {
        for (const pos of Object.keys(UNITLAYERS.myunits)) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploy_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdeploy_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdeploy: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        massiveTree: true
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        spawndirs: {},
        growstarts: {},
        targets: {},
        potentialopptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.spawndirs[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.spawndirs) {
          let DIR = relativeDirs[(ARTIFACTS.spawndirs[STARTPOS] || {}).dir][5];
          let walkedsquares = [];
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          POS = STARTPOS;
          ARTIFACTS.growstarts[POS] = {
            dir: relativeDirs[DIR][5],
            strength: WALKLENGTH
          };
        }
      }
      {
        let allowedsteps = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        let BLOCKS = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.growstarts) {
          let DIR = (ARTIFACTS.growstarts[STARTPOS] || {}).dir;
          let STOPREASON = "";
          let MAX = (ARTIFACTS.growstarts[STARTPOS] || {}).strength;
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let LENGTH = 0;
          let STEP = 0;
          while (
            !(STOPREASON =
              LENGTH === MAX
                ? "reachedmax"
                : !(POS = connections[POS][DIR])
                ? "outofbounds"
                : BLOCKS[POS]
                ? "hitblock"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
          ) {
            LENGTH++;
            STEP++;
            if (STEP === MAX) {
              ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS.potentialopptargets[POS] = { dir: DIR, strength: MAX };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.potentialopptargets) {
          let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).dir;
          let STOPREASON = "";
          let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).strength;
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let LENGTH = 0;
          while (
            !(STOPREASON =
              LENGTH === MAX
                ? "reachedmax"
                : !(POS = connections[POS][DIR])
                ? "outofbounds"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
          ) {
            LENGTH++;
          }
          POS = STARTPOS;
          if (!(STOPREASON === "reachedmax")) {
            ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.targets)) {
        LINKS.marks[pos] = "selecttarget_basic_1";
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
    selecttarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        spawndirs: step.ARTIFACTS.spawndirs,
        growstarts: step.ARTIFACTS.growstarts,
        targets: step.ARTIFACTS.targets,
        potentialopptargets: step.ARTIFACTS.potentialopptargets,
        spawns: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selecttarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selecttarget;
        let POS = STARTPOS;
        while (
          (POS =
            connections[POS][
              (ARTIFACTS.targets[MARKS.selecttarget] || {}).dir
            ]) &&
          !BLOCKS[POS]
        ) {
          ARTIFACTS.spawns[POS] = emptyObj;
        }
        POS = STARTPOS;
        if (!UNITLAYERS.units[STARTPOS]) {
          ARTIFACTS.spawns[POS] = emptyObj;
        }
      }
      LINKS.commands.expand = "expand_basic_1";
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
    selectdeploy_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.deploy = "deploy_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdeploy: newMarkPos },
        NEXTSPAWNID: step.NEXTSPAWNID,
        massiveTree: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        spawndirs: {},
        growstarts: {},
        targets: {},
        potentialopptargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS.spawndirs[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in ARTIFACTS.spawndirs) {
          let DIR = relativeDirs[(ARTIFACTS.spawndirs[STARTPOS] || {}).dir][5];
          let walkedsquares = [];
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          POS = STARTPOS;
          ARTIFACTS.growstarts[POS] = {
            dir: relativeDirs[DIR][5],
            strength: WALKLENGTH
          };
        }
      }
      {
        let allowedsteps = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        let BLOCKS = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.growstarts) {
          let DIR = (ARTIFACTS.growstarts[STARTPOS] || {}).dir;
          let STOPREASON = "";
          let MAX = (ARTIFACTS.growstarts[STARTPOS] || {}).strength;
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let LENGTH = 0;
          let STEP = 0;
          while (
            !(STOPREASON =
              LENGTH === MAX
                ? "reachedmax"
                : !(POS = connections[POS][DIR])
                ? "outofbounds"
                : BLOCKS[POS]
                ? "hitblock"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
          ) {
            LENGTH++;
            STEP++;
            if (STEP === MAX) {
              ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
            }
          }
          if (BLOCKS[POS]) {
            ARTIFACTS.potentialopptargets[POS] = { dir: DIR, strength: MAX };
          }
        }
      }
      {
        let allowedsteps = UNITLAYERS.oppunits;
        for (let STARTPOS in ARTIFACTS.potentialopptargets) {
          let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).dir;
          let STOPREASON = "";
          let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {}).strength;
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          let LENGTH = 0;
          while (
            !(STOPREASON =
              LENGTH === MAX
                ? "reachedmax"
                : !(POS = connections[POS][DIR])
                ? "outofbounds"
                : !allowedsteps[POS]
                ? "nomoresteps"
                : null)
          ) {
            LENGTH++;
          }
          POS = STARTPOS;
          if (!(STOPREASON === "reachedmax")) {
            ARTIFACTS.targets[POS] = { dir: relativeDirs[DIR][5] };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.targets)) {
        LINKS.marks[pos] = "selecttarget_basic_2";
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
    selecttarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        spawndirs: step.ARTIFACTS.spawndirs,
        growstarts: step.ARTIFACTS.growstarts,
        targets: step.ARTIFACTS.targets,
        potentialopptargets: step.ARTIFACTS.potentialopptargets,
        spawns: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selecttarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selecttarget;
        let POS = STARTPOS;
        while (
          (POS =
            connections[POS][
              (ARTIFACTS.targets[MARKS.selecttarget] || {}).dir
            ]) &&
          !BLOCKS[POS]
        ) {
          ARTIFACTS.spawns[POS] = emptyObj;
        }
        POS = STARTPOS;
        if (!UNITLAYERS.units[STARTPOS]) {
          ARTIFACTS.spawns[POS] = emptyObj;
        }
      }
      LINKS.commands.expand = "expand_basic_2";
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
    deploy_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdeploy,
          id: newunitid,
          group: "soldiers",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
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
      if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
        LINKS.endTurn = "startTurn_basic_2";
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploy_basic_1";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID
      };
    },
    expand_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        spawndirs: step.ARTIFACTS.spawndirs,
        growstarts: step.ARTIFACTS.growstarts,
        targets: step.ARTIFACTS.targets,
        potentialopptargets: step.ARTIFACTS.potentialopptargets,
        spawns: step.ARTIFACTS.spawns
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.spawns) {
        anim.enterFrom[LOOPPOS] = MARKS.selectunit;
      }
      if (UNITLAYERS.units[MARKS.selecttarget]) {
        anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 1]);
      }
      for (let LOOPPOS in ARTIFACTS.spawns) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "soldiers",
            owner: 1,
            from: MARKS.selectunit
          };
        }
      }
      if (UNITLAYERS.units[MARKS.selecttarget]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selecttarget,
            id: newunitid,
            group: "soldiers",
            owner: 0,
            from: MARKS.selectunit
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
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
      if (Object.keys(UNITLAYERS.units).length === 64) {
        LINKS.endGame = ["draw", "win", "lose"][
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 1
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 0
            : 2
        ];
        LINKS.endedBy = "boardfull";
      } else if (true) {
        LINKS.starvation = {
          endGame: ["draw", "win", "lose"][
            Object.keys(UNITLAYERS.myunits).length >
            Object.keys(UNITLAYERS.oppunits).length
              ? 1
              : Object.keys(UNITLAYERS.oppunits).length ===
                Object.keys(UNITLAYERS.myunits).length
              ? 0
              : 2
          ],
          endedBy: "nomoremoves"
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
        NEXTSPAWNID,
        anim
      };
    },
    deploy_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdeploy,
          id: newunitid,
          group: "soldiers",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
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
      if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
        LINKS.endTurn = "startTurn_basic_1";
      } else {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdeploy_basic_2";
        }
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID
      };
    },
    expand_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        spawndirs: step.ARTIFACTS.spawndirs,
        growstarts: step.ARTIFACTS.growstarts,
        targets: step.ARTIFACTS.targets,
        potentialopptargets: step.ARTIFACTS.potentialopptargets,
        spawns: step.ARTIFACTS.spawns
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.spawns) {
        anim.enterFrom[LOOPPOS] = MARKS.selectunit;
      }
      if (UNITLAYERS.units[MARKS.selecttarget]) {
        anim.ghosts.push([MARKS.selectunit, MARKS.selecttarget, "pawn", 2]);
      }
      for (let LOOPPOS in ARTIFACTS.spawns) {
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: LOOPPOS,
            id: newunitid,
            group: "soldiers",
            owner: 2,
            from: MARKS.selectunit
          };
        }
      }
      if (UNITLAYERS.units[MARKS.selecttarget]) {
        delete UNITDATA[(UNITLAYERS.units[MARKS.selecttarget] || {}).id];
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selecttarget,
            id: newunitid,
            group: "soldiers",
            owner: 0,
            from: MARKS.selectunit
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
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
      if (Object.keys(UNITLAYERS.units).length === 64) {
        LINKS.endGame = ["draw", "lose", "win"][
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 2
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 0
            : 1
        ];
        LINKS.endedBy = "boardfull";
      } else if (true) {
        LINKS.starvation = {
          endGame: ["draw", "lose", "win"][
            Object.keys(UNITLAYERS.myunits).length >
            Object.keys(UNITLAYERS.oppunits).length
              ? 2
              : Object.keys(UNITLAYERS.oppunits).length ===
                Object.keys(UNITLAYERS.myunits).length
              ? 0
              : 1
          ],
          endedBy: "nomoremoves"
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
        NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [{ select: "Select" }, { text: "unit to expand from" }]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to deploy the first of your two initial units" }
            ]
          });
    },
    deploy_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(UNITLAYERS.myunits).length === 1
        ? collapseContent({
            line: [
              { text: "Now" },
              { select: "select" },
              { text: "where to deploy your second and last initial unit" }
            ]
          })
        : defaultInstruction(1);
    },
    expand_basic_1: () => defaultInstruction(1),
    selectdeploy_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to place your" },
          Object.keys(UNITLAYERS.myunits).length === 1
            ? { text: "second" }
            : { text: "first" },
          { text: "unit at" },
          { pos: MARKS.selectdeploy }
        ]
      });
    },
    selectunit_basic_1: step => {
      return { text: "Now select which square to expand to" };
    },
    selecttarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "expand" },
          { text: "to expand from" },
          { pos: MARKS.selectunit },
          { text: "to" },
          { pos: MARKS.selecttarget },
          UNITLAYERS.units[MARKS.selecttarget]
            ? { text: "and neutralise the enemy there" }
            : undefined
        ]
      });
    },
    startTurn_basic_2: step => {
      let TURN = step.TURN;
      return TURN > 1
        ? collapseContent({
            line: [{ select: "Select" }, { text: "unit to expand from" }]
          })
        : collapseContent({
            line: [
              { select: "Select" },
              { text: "where to deploy the first of your two initial units" }
            ]
          });
    },
    deploy_basic_2: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return Object.keys(UNITLAYERS.myunits).length === 1
        ? collapseContent({
            line: [
              { text: "Now" },
              { select: "select" },
              { text: "where to deploy your second and last initial unit" }
            ]
          })
        : defaultInstruction(2);
    },
    expand_basic_2: () => defaultInstruction(2),
    selectdeploy_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "deploy" },
          { text: "to place your" },
          Object.keys(UNITLAYERS.myunits).length === 1
            ? { text: "second" }
            : { text: "first" },
          { text: "unit at" },
          { pos: MARKS.selectdeploy }
        ]
      });
    },
    selectunit_basic_2: step => {
      return { text: "Now select which square to expand to" };
    },
    selecttarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "expand" },
          { text: "to expand from" },
          { pos: MARKS.selectunit },
          { text: "to" },
          { pos: MARKS.selecttarget },
          UNITLAYERS.units[MARKS.selecttarget]
            ? { text: "and neutralise the enemy there" }
            : undefined
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
      code: "u",
      arr: {
        marks: ["c4"],
        potentialMarks: ["b3", "d3", "b5", "c6"],
        setup: {
          soldiers: {
            "0": ["e4", "d5", "e5"],
            "1": ["a1", "b2", "c3", "a4", "b4", "c4", "d4"],
            "2": ["g4", "f5", "d6", "e6", "d7", "e7", "d8"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 8,
      width: 8,
      terrain: {}
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
