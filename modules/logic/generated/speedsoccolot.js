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
const iconMapping = { ball: "pawn", players: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  ball: [
    ["units", "ball"],
    ["units", "ball"],
    ["units", "ball"]
  ],
  players: [
    ["units", "players"],
    ["units", "players", "myplayers"],
    ["units", "players", "oppplayers"]
  ]
};
const groupLayers2 = {
  ball: [
    ["units", "ball"],
    ["units", "ball"],
    ["units", "ball"]
  ],
  players: [
    ["units", "players"],
    ["units", "players", "oppplayers"],
    ["units", "players", "myplayers"]
  ]
};
const emptyArtifactLayers_basic = {
  closeball: {},
  runtargets: {},
  dribbletarget: {},
  kicktargets: {}
};
const game = {
  gameId: "speedsoccolot",
  commands: { run: {}, dribble: {}, kick: {} },
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
      ball: {},
      players: {},
      myplayers: {},
      oppplayers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
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
        ball: oldUnitLayers.ball,
        players: oldUnitLayers.players,
        myplayers: oldUnitLayers.oppplayers,
        oppplayers: oldUnitLayers.myplayers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myplayers)) {
        LINKS.marks[pos] = "selectunit_basic_1";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        ball: oldUnitLayers.ball,
        players: oldUnitLayers.players,
        myplayers: oldUnitLayers.oppplayers,
        oppplayers: oldUnitLayers.myplayers
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(UNITLAYERS.myplayers)) {
        LINKS.marks[pos] = "selectunit_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        closeball: {},
        runtargets: {},
        kicktargets: {}
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
          if (POS && !UNITLAYERS.players[POS]) {
            {
              if (UNITLAYERS.ball[POS]) {
                ARTIFACTS.closeball[POS] = { dir: DIR };
              }
            }
            {
              ARTIFACTS.runtargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in ARTIFACTS.closeball) {
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][(ARTIFACTS.closeball[STARTPOS] || {}).dir]) &&
            !BLOCKS[POS]
          ) {
            ARTIFACTS.kicktargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.runtargets)) {
        LINKS.marks[pos] = "selectruntarget_basic_1";
      }
      for (const pos of Object.keys(ARTIFACTS.kicktargets)) {
        LINKS.marks[pos] = "selectkicktarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectruntarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        closeball: step.ARTIFACTS.closeball,
        runtargets: step.ARTIFACTS.runtargets,
        kicktargets: step.ARTIFACTS.kicktargets,
        dribbletarget: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectruntarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in ARTIFACTS.closeball) {
        let POS =
          connections[STARTPOS][
            (ARTIFACTS.runtargets[MARKS.selectruntarget] || {}).dir
          ];
        if (POS && (MARKS.selectunit === POS || !UNITLAYERS.units[POS])) {
          ARTIFACTS.dribbletarget[POS] = emptyObj;
        }
      }
      if (!UNITLAYERS.ball[MARKS.selectruntarget]) {
        LINKS.commands.run = "run_basic_1";
      }
      if (Object.keys(ARTIFACTS.dribbletarget).length !== 0) {
        LINKS.commands.dribble = "dribble_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectkicktarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.kick = "kick_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectkicktarget: newMarkPos
        }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        closeball: {},
        runtargets: {},
        kicktargets: {}
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
          if (POS && !UNITLAYERS.players[POS]) {
            {
              if (UNITLAYERS.ball[POS]) {
                ARTIFACTS.closeball[POS] = { dir: DIR };
              }
            }
            {
              ARTIFACTS.runtargets[POS] = { dir: DIR };
            }
          }
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let STARTPOS in ARTIFACTS.closeball) {
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][(ARTIFACTS.closeball[STARTPOS] || {}).dir]) &&
            !BLOCKS[POS]
          ) {
            ARTIFACTS.kicktargets[POS] = emptyObj;
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.runtargets)) {
        LINKS.marks[pos] = "selectruntarget_basic_2";
      }
      for (const pos of Object.keys(ARTIFACTS.kicktargets)) {
        LINKS.marks[pos] = "selectkicktarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectruntarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        closeball: step.ARTIFACTS.closeball,
        runtargets: step.ARTIFACTS.runtargets,
        kicktargets: step.ARTIFACTS.kicktargets,
        dribbletarget: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectruntarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in ARTIFACTS.closeball) {
        let POS =
          connections[STARTPOS][
            (ARTIFACTS.runtargets[MARKS.selectruntarget] || {}).dir
          ];
        if (POS && (MARKS.selectunit === POS || !UNITLAYERS.units[POS])) {
          ARTIFACTS.dribbletarget[POS] = emptyObj;
        }
      }
      if (!UNITLAYERS.ball[MARKS.selectruntarget]) {
        LINKS.commands.run = "run_basic_2";
      }
      if (Object.keys(ARTIFACTS.dribbletarget).length !== 0) {
        LINKS.commands.dribble = "dribble_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS
      };
    },
    selectkicktarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.kick = "kick_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectkicktarget: newMarkPos
        }
      };
    },
    run_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectruntarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN1.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    dribble_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        closeball: step.ARTIFACTS.closeball,
        runtargets: step.ARTIFACTS.runtargets,
        kicktargets: step.ARTIFACTS.kicktargets,
        dribbletarget: step.ARTIFACTS.dribbletarget
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectruntarget
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
          .id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: Object.keys(ARTIFACTS.dribbletarget)[0]
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN1.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    kick_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
          .id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectkicktarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN1.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    run_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectruntarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN2.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    dribble_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        closeball: step.ARTIFACTS.closeball,
        runtargets: step.ARTIFACTS.runtargets,
        kicktargets: step.ARTIFACTS.kicktargets,
        dribbletarget: step.ARTIFACTS.dribbletarget
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectruntarget
          };
        }
      }
      {
        let unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
          .id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: Object.keys(ARTIFACTS.dribbletarget)[0]
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN2.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    },
    kick_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        let unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
          .id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            pos: MARKS.selectkicktarget
          };
        }
      }
      UNITLAYERS = {
        units: {},
        ball: {},
        players: {},
        myplayers: {},
        oppplayers: {}
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
            Object.keys(TERRAIN2.oppbase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endedBy = "goal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else if (
        Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.mybase)
              .concat(Object.keys(UNITLAYERS.ball))
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
        LINKS.endGame = "lose";
        LINKS.endedBy = "owngoal";
        LINKS.endMarks = Object.keys(UNITLAYERS.ball);
      } else {
        LINKS.endTurn = "startTurn_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { text: "Select which" },
          { unittype: ["pawn", 1] },
          { text: "to act with" }
        ]
      });
    },
    run_basic_1: () => defaultInstruction(1),
    dribble_basic_1: () => defaultInstruction(1),
    kick_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Select where" },
          { pos: MARKS.selectunit },
          { text: "should" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.runtargets).length !== 0
                ? { text: "move" }
                : undefined,
              Object.keys(ARTIFACTS.kicktargets).length !== 0
                ? { text: "kick" }
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
    selectruntarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return !!!LINKS.commands["run"]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dribble" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              { pos: MARKS.selectruntarget },
              { text: "and" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
                      .group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.ball)[0]
                ]
              },
              { text: "to" },
              { pos: Object.keys(ARTIFACTS.dribbletarget)[0] }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "run" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              { pos: MARKS.selectruntarget },
              !!LINKS.commands["dribble"]
                ? collapseContent({
                    line: [
                      { text: "or" },
                      { command: "dribble" },
                      { text: "to also move" },
                      {
                        unit: [
                          iconMapping[
                            (
                              UNITLAYERS.units[
                                Object.keys(UNITLAYERS.ball)[0]
                              ] || {}
                            ).group
                          ],
                          (
                            UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] ||
                            {}
                          ).owner,
                          Object.keys(UNITLAYERS.ball)[0]
                        ]
                      },
                      { text: "to" },
                      { pos: Object.keys(ARTIFACTS.dribbletarget)[0] }
                    ]
                  })
                : undefined
            ]
          });
    },
    selectkicktarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "kick" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {}).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {}).owner,
              Object.keys(UNITLAYERS.ball)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectkicktarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { text: "Select which" },
          { unittype: ["pawn", 2] },
          { text: "to act with" }
        ]
      });
    },
    run_basic_2: () => defaultInstruction(2),
    dribble_basic_2: () => defaultInstruction(2),
    kick_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      return collapseContent({
        line: [
          { text: "Select where" },
          { pos: MARKS.selectunit },
          { text: "should" },
          collapseContent({
            line: [
              Object.keys(ARTIFACTS.runtargets).length !== 0
                ? { text: "move" }
                : undefined,
              Object.keys(ARTIFACTS.kicktargets).length !== 0
                ? { text: "kick" }
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
    selectruntarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      let LINKS = step.LINKS;
      return !!!LINKS.commands["run"]
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "dribble" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              { pos: MARKS.selectruntarget },
              { text: "and" },
              {
                unit: [
                  iconMapping[
                    (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
                      .group
                  ],
                  (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {})
                    .owner,
                  Object.keys(UNITLAYERS.ball)[0]
                ]
              },
              { text: "to" },
              { pos: Object.keys(ARTIFACTS.dribbletarget)[0] }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "run" },
              { text: "to move" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "to" },
              { pos: MARKS.selectruntarget },
              !!LINKS.commands["dribble"]
                ? collapseContent({
                    line: [
                      { text: "or" },
                      { command: "dribble" },
                      { text: "to also move" },
                      {
                        unit: [
                          iconMapping[
                            (
                              UNITLAYERS.units[
                                Object.keys(UNITLAYERS.ball)[0]
                              ] || {}
                            ).group
                          ],
                          (
                            UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] ||
                            {}
                          ).owner,
                          Object.keys(UNITLAYERS.ball)[0]
                        ]
                      },
                      { text: "to" },
                      { pos: Object.keys(ARTIFACTS.dribbletarget)[0] }
                    ]
                  })
                : undefined
            ]
          });
    },
    selectkicktarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "kick" },
          { text: "to move" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {}).group
              ],
              (UNITLAYERS.units[Object.keys(UNITLAYERS.ball)[0]] || {}).owner,
              Object.keys(UNITLAYERS.ball)[0]
            ]
          },
          { text: "to" },
          { pos: MARKS.selectkicktarget }
        ]
      });
    }
  },
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "speed",
      code: "r",
      arr: {
        setup: {
          ball: {
            "0": ["e3"]
          },
          players: {
            "1": ["b2", "c2", "d1", "f2", "f3"],
            "2": ["c3", "c6", "d6", "e6", "f5"]
          }
        },
        marks: [],
        potentialMarks: []
      }
    },
    {
      ruleset: "basic",
      board: "original",
      setup: "original",
      desc: "original",
      code: "o",
      arr: {
        setup: {},
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    original: {
      height: 8,
      width: 8,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "h1"]
            }
          ],
          "2": [
            {
              rect: ["a8", "h8"]
            }
          ]
        }
      }
    },
    basic: {
      height: 7,
      width: 7,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "g1"]
            }
          ],
          "2": [
            {
              rect: ["a7", "g7"]
            }
          ]
        }
      }
    }
  },
  setups: {
    original: {
      ball: {
        "0": ["d4"]
      },
      players: {
        "1": [
          {
            rect: ["b1", "g1"]
          }
        ],
        "2": [
          {
            rect: ["b8", "g8"]
          }
        ]
      }
    },
    basic: {
      ball: {
        "0": ["d4"]
      },
      players: {
        "1": [
          {
            rect: ["b2", "f2"]
          }
        ],
        "2": [
          {
            rect: ["b6", "f6"]
          }
        ]
      }
    }
  }
};
export default game;
