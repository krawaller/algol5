import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
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
const iconMapping = {
  leader: "pawn",
  knightortho: "rook",
  knightdiag: "bishop",
  leaderortho: "king",
  leaderdiag: "queen"
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  leader: [
    ["units", "leader"],
    ["units", "myunits", "leader", "myleader"],
    ["units", "oppunits", "leader", "oppleader"]
  ],
  knightortho: [
    ["units", "knightortho"],
    ["units", "myunits", "knightortho", "myknightortho"],
    ["units", "oppunits", "knightortho", "oppknightortho"]
  ],
  knightdiag: [
    ["units", "knightdiag"],
    ["units", "myunits", "knightdiag", "myknightdiag"],
    ["units", "oppunits", "knightdiag", "oppknightdiag"]
  ],
  leaderortho: [
    ["units", "leaderortho"],
    ["units", "myunits", "leaderortho", "myleaderortho"],
    ["units", "oppunits", "leaderortho", "oppleaderortho"]
  ],
  leaderdiag: [
    ["units", "leaderdiag"],
    ["units", "myunits", "leaderdiag", "myleaderdiag"],
    ["units", "oppunits", "leaderdiag", "oppleaderdiag"]
  ]
};
const groupLayers2 = {
  leader: [
    ["units", "leader"],
    ["units", "oppunits", "leader", "oppleader"],
    ["units", "myunits", "leader", "myleader"]
  ],
  knightortho: [
    ["units", "knightortho"],
    ["units", "oppunits", "knightortho", "oppknightortho"],
    ["units", "myunits", "knightortho", "myknightortho"]
  ],
  knightdiag: [
    ["units", "knightdiag"],
    ["units", "oppunits", "knightdiag", "oppknightdiag"],
    ["units", "myunits", "knightdiag", "myknightdiag"]
  ],
  leaderortho: [
    ["units", "leaderortho"],
    ["units", "oppunits", "leaderortho", "oppleaderortho"],
    ["units", "myunits", "leaderortho", "myleaderortho"]
  ],
  leaderdiag: [
    ["units", "leaderdiag"],
    ["units", "oppunits", "leaderdiag", "oppleaderdiag"],
    ["units", "myunits", "leaderdiag", "myleaderdiag"]
  ]
};
const emptyArtifactLayers_basic = { movetargets: {} };
const game = {
  gameId: "kachitknight",
  commands: { step: {}, orthogonal: {}, diagonal: {} },
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
      leader: {},
      myleader: {},
      oppleader: {},
      knightortho: {},
      myknightortho: {},
      oppknightortho: {},
      knightdiag: {},
      myknightdiag: {},
      oppknightdiag: {},
      leaderortho: {},
      myleaderortho: {},
      oppleaderortho: {},
      leaderdiag: {},
      myleaderdiag: {},
      oppleaderdiag: {}
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
      BATTLEVARS: {},
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
        leader: oldUnitLayers.leader,
        myleader: oldUnitLayers.oppleader,
        oppleader: oldUnitLayers.myleader,
        knightortho: oldUnitLayers.knightortho,
        myknightortho: oldUnitLayers.oppknightortho,
        oppknightortho: oldUnitLayers.myknightortho,
        knightdiag: oldUnitLayers.knightdiag,
        myknightdiag: oldUnitLayers.oppknightdiag,
        oppknightdiag: oldUnitLayers.myknightdiag,
        leaderortho: oldUnitLayers.leaderortho,
        myleaderortho: oldUnitLayers.oppleaderortho,
        oppleaderortho: oldUnitLayers.myleaderortho,
        leaderdiag: oldUnitLayers.leaderdiag,
        myleaderdiag: oldUnitLayers.oppleaderdiag,
        oppleaderdiag: oldUnitLayers.myleaderdiag
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      if (3 > (BATTLEVARS["plr1knights"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(TERRAIN1.mybase)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdroptarget_basic_1";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        leader: oldUnitLayers.leader,
        myleader: oldUnitLayers.oppleader,
        oppleader: oldUnitLayers.myleader,
        knightortho: oldUnitLayers.knightortho,
        myknightortho: oldUnitLayers.oppknightortho,
        oppknightortho: oldUnitLayers.myknightortho,
        knightdiag: oldUnitLayers.knightdiag,
        myknightdiag: oldUnitLayers.oppknightdiag,
        oppknightdiag: oldUnitLayers.myknightdiag,
        leaderortho: oldUnitLayers.leaderortho,
        myleaderortho: oldUnitLayers.oppleaderortho,
        oppleaderortho: oldUnitLayers.myleaderortho,
        leaderdiag: oldUnitLayers.leaderdiag,
        myleaderdiag: oldUnitLayers.oppleaderdiag,
        oppleaderdiag: oldUnitLayers.myleaderdiag
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      if (3 > (BATTLEVARS["plr2knights"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(TERRAIN2.mybase)
            .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
            .reduce((m, k) => {
              m[k] = emptyObj;
              return m;
            }, {})
        )) {
          LINKS.marks[pos] = "selectdroptarget_basic_2";
        }
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN,
        NEXTSPAWNID: step.NEXTSPAWNID,
        BATTLEVARS
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.myleader[MARKS.selectunit] ||
        UNITLAYERS.myleaderortho[MARKS.selectunit] ||
        UNITLAYERS.myleaderdiag[MARKS.selectunit]
      ) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS) {
              if (!UNITLAYERS.myunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        UNITLAYERS.myleaderortho[MARKS.selectunit] ||
        UNITLAYERS.myknightortho[MARKS.selectunit]
      ) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of orthoDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (UNITLAYERS.oppunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        UNITLAYERS.myleaderdiag[MARKS.selectunit] ||
        UNITLAYERS.myknightdiag[MARKS.selectunit]
      ) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of diagDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (UNITLAYERS.oppunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.orthogonal = "orthogonal_basic_1";
      LINKS.commands.diagonal = "diagonal_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.leader[MARKS.selectunit] &&
        !TERRAIN1.promotion[MARKS.selectmovetarget]
      ) {
        LINKS.commands.step = "step_basic_1";
      } else {
        LINKS.commands.orthogonal = "orthogonal_basic_1";
        LINKS.commands.diagonal = "diagonal_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.myleader[MARKS.selectunit] ||
        UNITLAYERS.myleaderortho[MARKS.selectunit] ||
        UNITLAYERS.myleaderdiag[MARKS.selectunit]
      ) {
        {
          let startconnections = connections[MARKS.selectunit];
          for (let DIR of roseDirs) {
            let POS = startconnections[DIR];
            if (POS) {
              if (!UNITLAYERS.myunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        UNITLAYERS.myleaderortho[MARKS.selectunit] ||
        UNITLAYERS.myknightortho[MARKS.selectunit]
      ) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of orthoDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (UNITLAYERS.oppunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (
        UNITLAYERS.myleaderdiag[MARKS.selectunit] ||
        UNITLAYERS.myknightdiag[MARKS.selectunit]
      ) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of diagDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
            if (BLOCKS[POS]) {
              if (UNITLAYERS.oppunits[POS]) {
                ARTIFACTS.movetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.orthogonal = "orthogonal_basic_2";
      LINKS.commands.diagonal = "diagonal_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        UNITLAYERS.leader[MARKS.selectunit] &&
        !TERRAIN2.promotion[MARKS.selectmovetarget]
      ) {
        LINKS.commands.step = "step_basic_2";
      } else {
        LINKS.commands.orthogonal = "orthogonal_basic_2";
        LINKS.commands.diagonal = "diagonal_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    step_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN1.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN1.oppthrone);
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
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    orthogonal_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!!MARKS.selectdroptarget) {
        BATTLEVARS.plr1knights = (BATTLEVARS.plr1knights || 0) + 1;
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectdroptarget,
            id: newunitid,
            group: "knightortho",
            owner: 1
          };
        }
      }
      if (!!MARKS.selectunit) {
        if (
          UNITLAYERS.leader[MARKS.selectunit] ||
          UNITLAYERS.leaderdiag[MARKS.selectunit]
        ) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "leaderortho"
              };
            }
          }
        }
        if (UNITLAYERS.knightdiag[MARKS.selectunit]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "knightortho"
              };
            }
          }
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS.selectmovetarget
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN1.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN1.oppthrone);
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
        NEXTSPAWNID
      };
    },
    diagonal_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!!MARKS.selectdroptarget) {
        BATTLEVARS.plr1knights = (BATTLEVARS.plr1knights || 0) + 1;
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectdroptarget,
            id: newunitid,
            group: "knightdiag",
            owner: 1
          };
        }
      }
      if (!!MARKS.selectunit) {
        if (
          UNITLAYERS.leader[MARKS.selectunit] ||
          UNITLAYERS.leaderortho[MARKS.selectunit]
        ) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "leaderdiag"
              };
            }
          }
        }
        if (UNITLAYERS.knightortho[MARKS.selectunit]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "knightdiag"
              };
            }
          }
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS.selectmovetarget
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN1.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN1.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN1.oppthrone);
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
        NEXTSPAWNID
      };
    },
    step_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN2.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN2.oppthrone);
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
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    orthogonal_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!!MARKS.selectdroptarget) {
        BATTLEVARS.plr2knights = (BATTLEVARS.plr2knights || 0) + 1;
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectdroptarget,
            id: newunitid,
            group: "knightortho",
            owner: 2
          };
        }
      }
      if (!!MARKS.selectunit) {
        if (
          UNITLAYERS.leader[MARKS.selectunit] ||
          UNITLAYERS.leaderdiag[MARKS.selectunit]
        ) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "leaderortho"
              };
            }
          }
        }
        if (UNITLAYERS.knightdiag[MARKS.selectunit]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "knightortho"
              };
            }
          }
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS.selectmovetarget
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN2.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN2.oppthrone);
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
        NEXTSPAWNID
      };
    },
    diagonal_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      if (!!MARKS.selectdroptarget) {
        BATTLEVARS.plr2knights = (BATTLEVARS.plr2knights || 0) + 1;
        {
          let newunitid = "spawn" + NEXTSPAWNID++;
          UNITDATA[newunitid] = {
            pos: MARKS.selectdroptarget,
            id: newunitid,
            group: "knightdiag",
            owner: 2
          };
        }
      }
      if (!!MARKS.selectunit) {
        if (
          UNITLAYERS.leader[MARKS.selectunit] ||
          UNITLAYERS.leaderortho[MARKS.selectunit]
        ) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "leaderdiag"
              };
            }
          }
        }
        if (UNITLAYERS.knightortho[MARKS.selectunit]) {
          {
            let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                group: "knightdiag"
              };
            }
          }
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS.selectmovetarget
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        leader: {},
        myleader: {},
        oppleader: {},
        knightortho: {},
        myknightortho: {},
        oppknightortho: {},
        knightdiag: {},
        myknightdiag: {},
        oppknightdiag: {},
        leaderortho: {},
        myleaderortho: {},
        oppleaderortho: {},
        leaderdiag: {},
        myleaderdiag: {},
        oppleaderdiag: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (
        Object.keys(UNITLAYERS.oppleader).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderdiag).length === 0 &&
        Object.keys(UNITLAYERS.oppleaderortho).length === 0
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
      } else if (
        UNITLAYERS.myleader[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderortho[Object.keys(TERRAIN2.oppthrone)[0]] ||
        UNITLAYERS.myleaderdiag[Object.keys(TERRAIN2.oppthrone)[0]]
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "infiltration";
        LINKS.endMarks = Object.keys(TERRAIN2.oppthrone);
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
        NEXTSPAWNID
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "unit to act with" },
          3 > (BATTLEVARS["plr1knights"] || 0)
            ? collapseContent({
                line: [
                  { text: "or empty square in your castle to drop" },
                  BATTLEVARS["plr1knights"] === 2
                    ? collapseContent({ line: [{ text: "your last knight" }] })
                    : collapseContent({
                        line: [
                          { text: "one of your" },
                          { text: 3 - (BATTLEVARS["plr1knights"] || 0) },
                          { text: "remaining knights" }
                        ]
                      })
                ]
              })
            : undefined
        ]
      });
    },
    step_basic_1: () => defaultInstruction(1),
    orthogonal_basic_1: () => defaultInstruction(1),
    diagonal_basic_1: () => defaultInstruction(1),
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
    selectdroptarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "orthogonal" },
          { text: "to drop" },
          { unit: ["rook", 1, MARKS.selectdroptarget] },
          { text: "or" },
          { command: "diagonal" },
          { text: "to drop" },
          { unit: ["bishop", 1, MARKS.selectdroptarget] }
        ]
      });
    },
    selectmovetarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.leader[MARKS.selectunit]
        ? TERRAIN1.promotion[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "Press" },
                { command: "orthogonal" },
                { text: "to promote" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" },
                { unit: ["king", 1, MARKS.selectmovetarget] },
                { text: "or" },
                { command: "diagonal" },
                { text: "for" },
                { unit: ["queen", 1, MARKS.selectmovetarget] }
              ]
            })
          : collapseContent({
              line: [
                { text: "Press" },
                { command: "step" },
                { text: "to move" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" },
                { pos: MARKS.selectmovetarget }
              ]
            })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "orthogonal" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              UNITLAYERS.leaderortho[MARKS.selectunit] ||
              UNITLAYERS.leaderdiag[MARKS.selectunit]
                ? { unit: ["king", 1, MARKS.selectmovetarget] }
                : { unit: ["rook", 1, MARKS.selectmovetarget] },
              { text: "or" },
              { command: "diagonal" },
              { text: "for" },
              UNITLAYERS.leaderortho[MARKS.selectunit] ||
              UNITLAYERS.leaderdiag[MARKS.selectunit]
                ? { unit: ["queen", 1, MARKS.selectmovetarget] }
                : { unit: ["bishop", 1, MARKS.selectmovetarget] }
            ]
          });
    },
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "unit to act with" },
          3 > (BATTLEVARS["plr2knights"] || 0)
            ? collapseContent({
                line: [
                  { text: "or empty square in your castle to drop" },
                  BATTLEVARS["plr2knights"] === 2
                    ? collapseContent({ line: [{ text: "your last knight" }] })
                    : collapseContent({
                        line: [
                          { text: "one of your" },
                          { text: 3 - (BATTLEVARS["plr2knights"] || 0) },
                          { text: "remaining knights" }
                        ]
                      })
                ]
              })
            : undefined
        ]
      });
    },
    step_basic_2: () => defaultInstruction(2),
    orthogonal_basic_2: () => defaultInstruction(2),
    diagonal_basic_2: () => defaultInstruction(2),
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
          }
        ]
      });
    },
    selectdroptarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "orthogonal" },
          { text: "to drop" },
          { unit: ["rook", 2, MARKS.selectdroptarget] },
          { text: "or" },
          { command: "diagonal" },
          { text: "to drop" },
          { unit: ["bishop", 2, MARKS.selectdroptarget] }
        ]
      });
    },
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return UNITLAYERS.leader[MARKS.selectunit]
        ? TERRAIN2.promotion[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "Press" },
                { command: "orthogonal" },
                { text: "to promote" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" },
                { unit: ["king", 2, MARKS.selectmovetarget] },
                { text: "or" },
                { command: "diagonal" },
                { text: "for" },
                { unit: ["queen", 2, MARKS.selectmovetarget] }
              ]
            })
          : collapseContent({
              line: [
                { text: "Press" },
                { command: "step" },
                { text: "to move" },
                {
                  unit: [
                    iconMapping[
                      (UNITLAYERS.units[MARKS.selectunit] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                    MARKS.selectunit
                  ]
                },
                { text: "to" },
                { pos: MARKS.selectmovetarget }
              ]
            })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "orthogonal" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              UNITLAYERS.leaderortho[MARKS.selectunit] ||
              UNITLAYERS.leaderdiag[MARKS.selectunit]
                ? { unit: ["king", 2, MARKS.selectmovetarget] }
                : { unit: ["rook", 2, MARKS.selectmovetarget] },
              { text: "or" },
              { command: "diagonal" },
              { text: "for" },
              UNITLAYERS.leaderortho[MARKS.selectunit] ||
              UNITLAYERS.leaderdiag[MARKS.selectunit]
                ? { unit: ["queen", 2, MARKS.selectmovetarget] }
                : { unit: ["bishop", 2, MARKS.selectmovetarget] }
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
      code: "r",
      arr: {
        setup: {
          leader: {
            "2": ["a4"]
          },
          leaderortho: {
            "1": ["c3"]
          },
          knightortho: {
            "1": ["d3"],
            "2": ["a2", "b4"]
          },
          knightdiag: {
            "1": ["c2"],
            "2": ["b3"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 4,
      width: 4,
      terrain: {
        base: {
          "1": ["b1", "c1", "c2", "d2", "d3"],
          "2": ["a2", "a3", "b3", "b4", "c4"]
        },
        throne: {
          "1": ["d1"],
          "2": ["a4"]
        },
        promotion: ["a1", "b2", "c3", "d4"]
      }
    }
  },
  setups: {
    basic: {
      leader: {
        "1": ["d1"],
        "2": ["a4"]
      }
    }
  }
};
export default game;
