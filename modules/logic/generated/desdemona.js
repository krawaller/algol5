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
const iconMapping = { amazons: "queen", stones: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  amazons: [
    ["units", "amazons"],
    ["units", "myunits", "amazons", "myamazons"],
    ["units", "oppunits", "amazons", "oppamazons"]
  ],
  stones: [
    ["units", "stones"],
    ["units", "myunits", "stones", "mystones"],
    ["units", "oppunits", "stones", "oppstones"]
  ]
};
const groupLayers2 = {
  amazons: [
    ["units", "amazons"],
    ["units", "oppunits", "amazons", "oppamazons"],
    ["units", "myunits", "amazons", "myamazons"]
  ],
  stones: [
    ["units", "stones"],
    ["units", "oppunits", "stones", "oppstones"],
    ["units", "myunits", "stones", "mystones"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  movetargets: {},
  firetargets: {},
  capturespot: {},
  victims: {},
  mymovers: {},
  oppmovers: {}
};
const game = {
  gameId: "desdemona",
  commands: { move: {}, fire: {} },
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
      amazons: {},
      myamazons: {},
      oppamazons: {},
      stones: {},
      mystones: {},
      oppstones: {}
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
      let ARTIFACTS = emptyArtifactLayers_basic;
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        amazons: oldUnitLayers.amazons,
        myamazons: oldUnitLayers.oppamazons,
        oppamazons: oldUnitLayers.myamazons,
        stones: oldUnitLayers.stones,
        mystones: oldUnitLayers.oppstones,
        oppstones: oldUnitLayers.mystones
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.mymovers).length !== 0
          ? ARTIFACTS.mymovers
          : UNITLAYERS.myamazons
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
        TURNVARS: {}
      };
    },
    startTurn_basic_2: step => {
      let ARTIFACTS = emptyArtifactLayers_basic;
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        amazons: oldUnitLayers.amazons,
        myamazons: oldUnitLayers.oppamazons,
        oppamazons: oldUnitLayers.myamazons,
        stones: oldUnitLayers.stones,
        mystones: oldUnitLayers.oppstones,
        oppstones: oldUnitLayers.mystones
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      for (const pos of Object.keys(
        Object.keys(ARTIFACTS.mymovers).length !== 0
          ? ARTIFACTS.mymovers
          : UNITLAYERS.myamazons
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
        TURNVARS: {}
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
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
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
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectfiretarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: step.ARTIFACTS.firetargets,
        capturespot: step.ARTIFACTS.capturespot,
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectfiretarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (ARTIFACTS.capturespot[MARKS.selectfiretarget]) {
        {
          let allowedsteps = UNITLAYERS.oppstones;
          let STARTPOS = MARKS.selectfiretarget;
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][
                relativeDirs[(ARTIFACTS.capturespot[STARTPOS] || {}).dir][5]
              ]) &&
            allowedsteps[POS]
          ) {
            ARTIFACTS.victims[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.fire = "fire_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
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
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
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
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.move = "move_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectmovetarget: newMarkPos
        },
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID,
        canAlwaysEnd: true
      };
    },
    selectfiretarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: step.ARTIFACTS.firetargets,
        capturespot: step.ARTIFACTS.capturespot,
        victims: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectfiretarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (ARTIFACTS.capturespot[MARKS.selectfiretarget]) {
        {
          let allowedsteps = UNITLAYERS.oppstones;
          let STARTPOS = MARKS.selectfiretarget;
          let POS = STARTPOS;
          while (
            (POS =
              connections[POS][
                relativeDirs[(ARTIFACTS.capturespot[STARTPOS] || {}).dir][5]
              ]) &&
            allowedsteps[POS]
          ) {
            ARTIFACTS.victims[POS] = emptyObj;
          }
        }
      }
      LINKS.commands.fire = "fire_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        TURNVARS: step.TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: {},
        capturespot: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      TURNVARS.movedto = MARKS.selectmovetarget;
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
        amazons: {},
        myamazons: {},
        oppamazons: {},
        stones: {},
        mystones: {},
        oppstones: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = TURNVARS["movedto"];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            {
              ARTIFACTS.firetargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.oppstones.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = TURNVARS["movedto"];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              ARTIFACTS.capturespot[POS] = { dir: DIR };
            }
            {
              if (!UNITLAYERS.units[POS] && WALKLENGTH > 0) {
                ARTIFACTS.firetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firetargets)) {
        LINKS.marks[pos] = "selectfiretarget_basic_1";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    fire_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: step.ARTIFACTS.firetargets,
        capturespot: step.ARTIFACTS.capturespot,
        victims: step.ARTIFACTS.victims,
        mymovers: {},
        oppmovers: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectfiretarget] = TURNVARS["movedto"];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectfiretarget,
          id: newunitid,
          group: "stones",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        amazons: {},
        myamazons: {},
        oppamazons: {},
        stones: {},
        mystones: {},
        oppstones: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      for (let STARTPOS in UNITLAYERS.amazons) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS[UNITLAYERS.myunits[STARTPOS] ? "mymovers" : "oppmovers"][
            STARTPOS
          ] = emptyObj;
        }
      }
      if (
        Object.keys(ARTIFACTS.mymovers).length !== 0 &&
        Object.keys(ARTIFACTS.oppmovers).length === 0
      ) {
        for (const pos of Object.keys(
          Object.keys(ARTIFACTS.mymovers).length !== 0
            ? ARTIFACTS.mymovers
            : UNITLAYERS.myamazons
        )) {
          LINKS.marks[pos] = "selectunit_basic_1";
        }
      } else {
        if (true) {
          LINKS.starvation = {
            endGame: ["draw", "win", "lose"][
              Object.keys(UNITLAYERS.mystones).length >
              Object.keys(UNITLAYERS.oppstones).length
                ? 1
                : Object.keys(UNITLAYERS.oppstones).length >
                  Object.keys(UNITLAYERS.mystones).length
                ? 2
                : 0
            ],
            endedBy: "dominance",
            endMarks: Object.keys(
              Object.keys(UNITLAYERS.mystones).length >
                Object.keys(UNITLAYERS.oppstones).length
                ? UNITLAYERS.mystones
                : Object.keys(UNITLAYERS.oppstones).length >
                  Object.keys(UNITLAYERS.mystones).length
                ? UNITLAYERS.oppstones
                : emptyObj
            )
          };
          LINKS.endTurn = "startTurn_basic_2";
        } else {
          LINKS.endTurn = "startTurn_basic_2";
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
        NEXTSPAWNID,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: {},
        capturespot: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = { ...step.TURNVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      TURNVARS.movedto = MARKS.selectmovetarget;
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
        amazons: {},
        myamazons: {},
        oppamazons: {},
        stones: {},
        mystones: {},
        oppstones: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let POS = TURNVARS["movedto"];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            {
              ARTIFACTS.firetargets[POS] = emptyObj;
            }
          }
        }
      }
      {
        let BLOCKS = Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.oppstones.hasOwnProperty(k))
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = TURNVARS["movedto"];
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            {
              ARTIFACTS.capturespot[POS] = { dir: DIR };
            }
            {
              if (!UNITLAYERS.units[POS] && WALKLENGTH > 0) {
                ARTIFACTS.firetargets[POS] = emptyObj;
              }
            }
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.firetargets)) {
        LINKS.marks[pos] = "selectfiretarget_basic_2";
      }
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        TURNVARS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    fire_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        firetargets: step.ARTIFACTS.firetargets,
        capturespot: step.ARTIFACTS.capturespot,
        victims: step.ARTIFACTS.victims,
        mymovers: {},
        oppmovers: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let TURNVARS = step.TURNVARS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      anim.enterFrom[MARKS.selectfiretarget] = TURNVARS["movedto"];
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectfiretarget,
          id: newunitid,
          group: "stones",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.victims) {
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        amazons: {},
        myamazons: {},
        oppamazons: {},
        stones: {},
        mystones: {},
        oppstones: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      for (let STARTPOS in UNITLAYERS.amazons) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS[UNITLAYERS.myunits[STARTPOS] ? "mymovers" : "oppmovers"][
            STARTPOS
          ] = emptyObj;
        }
      }
      if (
        Object.keys(ARTIFACTS.mymovers).length !== 0 &&
        Object.keys(ARTIFACTS.oppmovers).length === 0
      ) {
        for (const pos of Object.keys(
          Object.keys(ARTIFACTS.mymovers).length !== 0
            ? ARTIFACTS.mymovers
            : UNITLAYERS.myamazons
        )) {
          LINKS.marks[pos] = "selectunit_basic_2";
        }
      } else {
        if (true) {
          LINKS.starvation = {
            endGame: ["draw", "lose", "win"][
              Object.keys(UNITLAYERS.mystones).length >
              Object.keys(UNITLAYERS.oppstones).length
                ? 2
                : Object.keys(UNITLAYERS.oppstones).length >
                  Object.keys(UNITLAYERS.mystones).length
                ? 1
                : 0
            ],
            endedBy: "dominance",
            endMarks: Object.keys(
              Object.keys(UNITLAYERS.mystones).length >
                Object.keys(UNITLAYERS.oppstones).length
                ? UNITLAYERS.mystones
                : Object.keys(UNITLAYERS.oppstones).length >
                  Object.keys(UNITLAYERS.mystones).length
                ? UNITLAYERS.oppstones
                : emptyObj
            )
          };
          LINKS.endTurn = "startTurn_basic_1";
        } else {
          LINKS.endTurn = "startTurn_basic_1";
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
          { unittype: ["queen", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: step => {
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to fire with" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[TURNVARS["movedto"]] || {}).group],
              (UNITLAYERS.units[TURNVARS["movedto"]] || {}).owner,
              TURNVARS["movedto"]
            ]
          }
        ]
      });
    },
    fire_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return Object.keys(ARTIFACTS.mymovers).length !== 0 &&
        Object.keys(ARTIFACTS.oppmovers).length === 0
        ? collapseContent({
            line: [
              {
                text:
                  "Since your opponent is blocked you get to move again! Select"
              },
              { unittype: ["queen", 1] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 2 }
            ]
          });
    },
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
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
          { text: "to move" },
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
    selectfiretarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to spawn" },
          { unit: ["pawn", 1, MARKS.selectfiretarget] },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and capture" },
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
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["queen", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: step => {
      let TURNVARS = step.TURNVARS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to fire with" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[TURNVARS["movedto"]] || {}).group],
              (UNITLAYERS.units[TURNVARS["movedto"]] || {}).owner,
              TURNVARS["movedto"]
            ]
          }
        ]
      });
    },
    fire_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      return Object.keys(ARTIFACTS.mymovers).length !== 0 &&
        Object.keys(ARTIFACTS.oppmovers).length === 0
        ? collapseContent({
            line: [
              {
                text:
                  "Since your opponent is blocked you get to move again! Select"
              },
              { unittype: ["queen", 2] },
              { text: "to move" }
            ]
          })
        : collapseContent({
            line: [
              { text: "Press " },
              { endTurn: "end turn" },
              { text: " to submit your moves and hand over to " },
              { player: 1 }
            ]
          });
    },
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
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
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to move" },
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
    selectfiretarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "fire" },
          { text: "to spawn" },
          { unit: ["pawn", 2, MARKS.selectfiretarget] },
          Object.keys(ARTIFACTS.victims).length !== 0
            ? collapseContent({
                line: [
                  { text: "and capture" },
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
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "regular",
      code: "r",
      arr: {
        setup: {
          amazons: {
            "1": ["b7", "c4"],
            "2": ["a5", "d4"]
          },
          stones: {
            "1": ["a3", "b4", "c6", "d5", "d6", "e4"],
            "2": ["b5", "b6", "c5"]
          }
        },
        marks: ["d4"],
        potentialMarks: [
          "a1",
          "b2",
          "c3",
          "d1",
          "d2",
          "d3",
          "e3",
          "e5",
          "f2",
          "f6",
          "g1",
          "g7"
        ]
      }
    }
  ],
  boards: {
    basic: {
      height: 7,
      width: 7,
      terrain: {}
    }
  },
  setups: {
    basic: {
      amazons: {
        "1": ["a1", "g7"],
        "2": ["a7", "g1"]
      }
    }
  }
};
export default game;
