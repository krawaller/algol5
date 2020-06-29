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
const iconMapping = { pawns: "pawn", bishops: "bishop" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  pawns: [
    ["units", "pawns"],
    ["units", "myunits", "pawns", "mypawns"],
    ["units", "oppunits", "pawns", "opppawns"]
  ],
  bishops: [
    ["units", "bishops"],
    ["units", "myunits", "bishops", "mybishops"],
    ["units", "oppunits", "bishops", "oppbishops"]
  ]
};
const groupLayers2 = {
  pawns: [
    ["units", "pawns"],
    ["units", "oppunits", "pawns", "opppawns"],
    ["units", "myunits", "pawns", "mypawns"]
  ],
  bishops: [
    ["units", "bishops"],
    ["units", "oppunits", "bishops", "oppbishops"],
    ["units", "myunits", "bishops", "mybishops"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  winlineheads: {},
  winline: {},
  loseline: {},
  movetargets: {},
  conversions: {},
  demote: {},
  promote: {}
};
const game = {
  gameId: "yonmoque",
  commands: { drop: {}, move: {} },
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
      pawns: {},
      mypawns: {},
      opppawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {}
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
        pawns: oldUnitLayers.pawns,
        mypawns: oldUnitLayers.opppawns,
        opppawns: oldUnitLayers.mypawns,
        bishops: oldUnitLayers.bishops,
        mybishops: oldUnitLayers.oppbishops,
        oppbishops: oldUnitLayers.mybishops
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      if (6 > (BATTLEVARS["plr1drop"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
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
        pawns: oldUnitLayers.pawns,
        mypawns: oldUnitLayers.opppawns,
        opppawns: oldUnitLayers.mypawns,
        bishops: oldUnitLayers.bishops,
        mybishops: oldUnitLayers.oppbishops,
        oppbishops: oldUnitLayers.mybishops
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let BATTLEVARS = step.BATTLEVARS;
      for (const pos of Object.keys(UNITLAYERS.myunits)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      if (6 > (BATTLEVARS["plr2drop"] || 0)) {
        for (const pos of Object.keys(
          Object.keys(BOARD.board)
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
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
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
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      if (UNITLAYERS.bishops[MARKS.selectunit]) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of diagDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
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
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        conversions: {},
        demote: {},
        promote: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectmovetarget;
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
          for (
            let walkstepper = 0;
            walkstepper < walkedsquares.length;
            walkstepper++
          ) {
            POS = walkedsquares[walkstepper];
            {
              if (STOPREASON === "hitblock") {
                ARTIFACTS.conversions[POS] = emptyObj;
              }
            }
            {
              if (
                STOPREASON === "hitblock" &&
                UNITLAYERS.bishops[POS] &&
                !TERRAIN1.mybase[POS]
              ) {
                ARTIFACTS.demote[POS] = emptyObj;
              }
            }
            {
              if (
                STOPREASON === "hitblock" &&
                UNITLAYERS.pawns[POS] &&
                TERRAIN1.mybase[POS]
              ) {
                ARTIFACTS.promote[POS] = emptyObj;
              }
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
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: { selectdroptarget: newMarkPos },
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
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
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
        }
      }
      if (UNITLAYERS.bishops[MARKS.selectunit]) {
        {
          let BLOCKS = UNITLAYERS.units;
          for (let DIR of diagDirs) {
            let POS = MARKS.selectunit;
            while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
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
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        conversions: {},
        demote: {},
        promote: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.oppunits;
        let BLOCKS = UNITLAYERS.myunits;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectmovetarget;
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
          for (
            let walkstepper = 0;
            walkstepper < walkedsquares.length;
            walkstepper++
          ) {
            POS = walkedsquares[walkstepper];
            {
              if (STOPREASON === "hitblock") {
                ARTIFACTS.conversions[POS] = emptyObj;
              }
            }
            {
              if (
                STOPREASON === "hitblock" &&
                UNITLAYERS.bishops[POS] &&
                !TERRAIN2.mybase[POS]
              ) {
                ARTIFACTS.demote[POS] = emptyObj;
              }
            }
            {
              if (
                STOPREASON === "hitblock" &&
                UNITLAYERS.pawns[POS] &&
                TERRAIN2.mybase[POS]
              ) {
                ARTIFACTS.promote[POS] = emptyObj;
              }
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
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        loseline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      BATTLEVARS.plr1drop = (BATTLEVARS.plr1drop || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: TERRAIN1.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns",
          owner: 1
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in TERRAIN1.edge) {
          for (let DIR of [1, 2, 3, 4]) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 5) {
                ARTIFACTS.loseline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "fiveinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
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
        NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        conversions: step.ARTIFACTS.conversions,
        demote: step.ARTIFACTS.demote,
        promote: step.ARTIFACTS.promote,
        loseline: {},
        winlineheads: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.mybishops[MARKS.selectunit] &&
        !TERRAIN1.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      if (
        UNITLAYERS.mypawns[MARKS.selectunit] &&
        TERRAIN1.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.conversions) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 1
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.promote) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.demote) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in TERRAIN1.edge) {
          for (let DIR of [1, 2, 3, 4]) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 5) {
                ARTIFACTS.loseline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length === 0) {
        {
          let allowedsteps = UNITLAYERS.myunits;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = MARKS.selectmovetarget;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.winlineheads[walkedsquares[WALKLENGTH - 1]] = {
                dir: DIR
              };
            }
          }
        }
        {
          let allowedsteps = UNITLAYERS.myunits;
          for (let STARTPOS in ARTIFACTS.winlineheads) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[
              relativeDirs[5][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]
            ] = STARTPOS;
            while (
              (POS =
                connections[POS][
                  relativeDirs[5][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]
                ]) &&
              allowedsteps[POS]
            ) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 4) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "fiveinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
      } else if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "fourinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        BATTLEVARS: step.BATTLEVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        loseline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      BATTLEVARS.plr2drop = (BATTLEVARS.plr2drop || 0) + 1;
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: TERRAIN2.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns",
          owner: 2
        };
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in TERRAIN2.edge) {
          for (let DIR of [1, 2, 3, 4]) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 5) {
                ARTIFACTS.loseline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "fiveinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
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
        NEXTSPAWNID
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        conversions: step.ARTIFACTS.conversions,
        demote: step.ARTIFACTS.demote,
        promote: step.ARTIFACTS.promote,
        loseline: {},
        winlineheads: {},
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.mybishops[MARKS.selectunit] &&
        !TERRAIN2.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      if (
        UNITLAYERS.mypawns[MARKS.selectunit] &&
        TERRAIN2.mybase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectmovetarget
          };
        }
      }
      for (let LOOPPOS in ARTIFACTS.conversions) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              owner: 2
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.promote) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "bishops"
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.demote) {
        {
          let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "pawns"
            };
          }
        }
      }
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        pawns: {},
        mypawns: {},
        opppawns: {},
        bishops: {},
        mybishops: {},
        oppbishops: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in TERRAIN2.edge) {
          for (let DIR of [1, 2, 3, 4]) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 5) {
                ARTIFACTS.loseline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length === 0) {
        {
          let allowedsteps = UNITLAYERS.myunits;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = MARKS.selectmovetarget;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              ARTIFACTS.winlineheads[walkedsquares[WALKLENGTH - 1]] = {
                dir: DIR
              };
            }
          }
        }
        {
          let allowedsteps = UNITLAYERS.myunits;
          for (let STARTPOS in ARTIFACTS.winlineheads) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[
              relativeDirs[5][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]
            ] = STARTPOS;
            while (
              (POS =
                connections[POS][
                  relativeDirs[5][(ARTIFACTS.winlineheads[STARTPOS] || {}).dir]
                ]) &&
              allowedsteps[POS]
            ) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 4) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.loseline).length !== 0) {
        LINKS.endGame = "lose";
        LINKS.endedBy = "fiveinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.loseline);
      } else if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "fourinarow";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
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
        BATTLEVARS: step.BATTLEVARS,
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
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({ line: [{ text: "a unit to move" }] })
                : undefined,
              6 > (BATTLEVARS["plr1drop"] || 0)
                ? collapseContent({
                    line: [
                      { text: "an empty square to drop" },
                      5 === BATTLEVARS["plr1drop"]
                        ? { text: "your last remaining off-board unit" }
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: 6 - (BATTLEVARS["plr1drop"] || 0) },
                              { text: "off-board units" }
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
    drop_basic_1: () => defaultInstruction(1),
    move_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          {
            unit: [
              iconMapping[
                TERRAIN1.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns"
              ],
              1,
              MARKS.selectdroptarget
            ]
          }
        ]
      });
    },
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Now select where to move" },
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
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to" },
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "move" },
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
              }),
              UNITLAYERS.mybishops[MARKS.selectunit] &&
              !TERRAIN1.mybase[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "demote it to a" },
                      { unittype: ["pawn", 1] }
                    ]
                  })
                : undefined,
              UNITLAYERS.mypawns[MARKS.selectunit] &&
              TERRAIN1.mybase[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "and promote it to a" },
                      { unittype: ["bishop", 1] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.conversions).length !== 0
                ? collapseContent({
                    line: [
                      { text: "take over" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.conversions)
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
    startTurn_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { select: "Select" },
          collapseContent({
            line: [
              Object.keys(UNITLAYERS.myunits).length !== 0
                ? collapseContent({ line: [{ text: "a unit to move" }] })
                : undefined,
              6 > (BATTLEVARS["plr2drop"] || 0)
                ? collapseContent({
                    line: [
                      { text: "an empty square to drop" },
                      5 === BATTLEVARS["plr2drop"]
                        ? { text: "your last remaining off-board unit" }
                        : collapseContent({
                            line: [
                              { text: "one of your" },
                              { text: 6 - (BATTLEVARS["plr2drop"] || 0) },
                              { text: "off-board units" }
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
    drop_basic_2: () => defaultInstruction(2),
    move_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to spawn" },
          {
            unit: [
              iconMapping[
                TERRAIN2.mybase[MARKS.selectdroptarget] ? "bishops" : "pawns"
              ],
              2,
              MARKS.selectdroptarget
            ]
          }
        ]
      });
    },
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Now select where to move" },
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
    selectmovetarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to" },
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "move" },
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
              }),
              UNITLAYERS.mybishops[MARKS.selectunit] &&
              !TERRAIN2.mybase[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "demote it to a" },
                      { unittype: ["pawn", 2] }
                    ]
                  })
                : undefined,
              UNITLAYERS.mypawns[MARKS.selectunit] &&
              TERRAIN2.mybase[MARKS.selectmovetarget]
                ? collapseContent({
                    line: [
                      { text: "and promote it to a" },
                      { unittype: ["bishop", 2] }
                    ]
                  })
                : undefined,
              Object.keys(ARTIFACTS.conversions).length !== 0
                ? collapseContent({
                    line: [
                      { text: "take over" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.conversions)
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
          pawns: {
            "1": ["b3", "c3", "c4"],
            "2": ["a3"]
          },
          bishops: {
            "1": ["d2", "e3"],
            "2": ["b1", "d5"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {
        base: {
          "1": ["a3", "b2", "b4", "c1", "c5", "d2", "d4", "e3"],
          "2": [
            "a2",
            "a4",
            "b1",
            "b3",
            "b5",
            "c2",
            "c4",
            "d1",
            "d3",
            "d5",
            "e2",
            "e4"
          ]
        },
        edge: [
          {
            rect: ["a1", "a5"]
          },
          {
            rect: ["b1", "e1"]
          }
        ]
      }
    }
  },
  setups: {
    basic: {}
  }
};
export default game;
