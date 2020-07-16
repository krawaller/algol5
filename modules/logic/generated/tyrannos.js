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
const iconMapping = {
  warriors: "pawn",
  heroes: "queen",
  barricades: "rook",
  tyrannos: "king"
};
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  warriors: [
    ["units", "warriors"],
    ["units", "myunits", "warriors"],
    ["units", "oppunits", "warriors"]
  ],
  heroes: [
    ["units", "heroes"],
    ["units", "myunits", "heroes"],
    ["units", "oppunits", "heroes"]
  ],
  barricades: [
    ["units", "barricades"],
    ["units", "myunits", "barricades"],
    ["units", "oppunits", "barricades"]
  ],
  tyrannos: [
    ["units", "tyrannos"],
    ["units", "myunits", "tyrannos", "mytyrannos"],
    ["units", "oppunits", "tyrannos", "opptyrannos"]
  ]
};
const groupLayers2 = {
  warriors: [
    ["units", "warriors"],
    ["units", "oppunits", "warriors"],
    ["units", "myunits", "warriors"]
  ],
  heroes: [
    ["units", "heroes"],
    ["units", "oppunits", "heroes"],
    ["units", "myunits", "heroes"]
  ],
  barricades: [
    ["units", "barricades"],
    ["units", "oppunits", "barricades"],
    ["units", "myunits", "barricades"]
  ],
  tyrannos: [
    ["units", "tyrannos"],
    ["units", "oppunits", "tyrannos", "opptyrannos"],
    ["units", "myunits", "tyrannos", "mytyrannos"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = { movetargets: {}, attacktargets: {} };
const game = {
  gameId: "tyrannos",
  commands: { move: {}, attack: {} },
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
      warriors: {},
      heroes: {},
      barricades: {},
      tyrannos: {},
      mytyrannos: {},
      opptyrannos: {}
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
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        warriors: oldUnitLayers.warriors,
        heroes: oldUnitLayers.heroes,
        barricades: oldUnitLayers.barricades,
        tyrannos: oldUnitLayers.tyrannos,
        mytyrannos: oldUnitLayers.opptyrannos,
        opptyrannos: oldUnitLayers.mytyrannos
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
        TURN: step.TURN + 1
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        warriors: oldUnitLayers.warriors,
        heroes: oldUnitLayers.heroes,
        barricades: oldUnitLayers.barricades,
        tyrannos: oldUnitLayers.tyrannos,
        mytyrannos: oldUnitLayers.opptyrannos,
        opptyrannos: oldUnitLayers.mytyrannos
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
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        attacktargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of UNITLAYERS.warriors[MARKS.selectunit]
          ? BOARD.dark[MARKS.selectunit]
            ? [8, 1, 2]
            : [1]
          : BOARD.dark[MARKS.selectunit]
          ? roseDirs
          : orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = UNITLAYERS.heroes[MARKS.selectunit] ? 10 : 1;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : LENGTH === MAX
              ? "reachedmax"
              : BLOCKS[POS]
              ? "hitblock"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
            if (!UNITLAYERS.heroes[MARKS.selectunit] || !TERRAIN1.temple[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (
              (UNITLAYERS.heroes[MARKS.selectunit] || WALKLENGTH === 0) &&
              !UNITLAYERS.barricades[POS] &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.attacktargets[POS] = emptyObj;
            }
          }
        }
      }
      if (!UNITLAYERS.barricades[MARKS.selectunit]) {
        for (const pos of Object.keys(ARTIFACTS.attacktargets)) {
          LINKS.marks[pos] = "selectattacktarget_basic_1";
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
        MARKS
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
        }
      };
    },
    selectattacktarget_basic_1: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.attack = "attack_basic_1";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectattacktarget: newMarkPos
        }
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {},
        attacktargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of UNITLAYERS.warriors[MARKS.selectunit]
          ? BOARD.dark[MARKS.selectunit]
            ? [4, 5, 6]
            : [5]
          : BOARD.dark[MARKS.selectunit]
          ? roseDirs
          : orthoDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let MAX = UNITLAYERS.heroes[MARKS.selectunit] ? 10 : 1;
          let POS = MARKS.selectunit;
          let LENGTH = 0;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : LENGTH === MAX
              ? "reachedmax"
              : BLOCKS[POS]
              ? "hitblock"
              : null)
          ) {
            walkedsquares.push(POS);
            LENGTH++;
            if (!UNITLAYERS.heroes[MARKS.selectunit] || !TERRAIN2.temple[POS]) {
              ARTIFACTS.movetargets[POS] = emptyObj;
            }
          }
          let WALKLENGTH = walkedsquares.length;
          if (BLOCKS[POS]) {
            if (
              (UNITLAYERS.heroes[MARKS.selectunit] || WALKLENGTH === 0) &&
              !UNITLAYERS.barricades[POS] &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.attacktargets[POS] = emptyObj;
            }
          }
        }
      }
      if (!UNITLAYERS.barricades[MARKS.selectunit]) {
        for (const pos of Object.keys(ARTIFACTS.attacktargets)) {
          LINKS.marks[pos] = "selectattacktarget_basic_2";
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
        MARKS
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
        }
      };
    },
    selectattacktarget_basic_2: (step, newMarkPos) => {
      let LINKS = { marks: {}, commands: {} };
      LINKS.commands.attack = "attack_basic_2";
      return {
        LINKS,
        ARTIFACTS: step.ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS: {
          selectunit: step.MARKS.selectunit,
          selectattacktarget: newMarkPos
        }
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.warriors[MARKS.selectunit] &&
        TERRAIN1.oppbase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "heroes"
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        warriors: {},
        heroes: {},
        barricades: {},
        tyrannos: {},
        mytyrannos: {},
        opptyrannos: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.opptyrannos).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectunit]: 1 });
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
    attack_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selectunit, MARKS.selectattacktarget, "pawn", 1]);
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectattacktarget] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        warriors: {},
        heroes: {},
        barricades: {},
        tyrannos: {},
        mytyrannos: {},
        opptyrannos: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.opptyrannos).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectunit]: 1 });
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
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      if (
        UNITLAYERS.warriors[MARKS.selectunit] &&
        TERRAIN2.oppbase[MARKS.selectmovetarget]
      ) {
        {
          let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              group: "heroes"
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
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        warriors: {},
        heroes: {},
        barricades: {},
        tyrannos: {},
        mytyrannos: {},
        opptyrannos: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.opptyrannos).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectunit]: 1 });
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
    attack_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      anim.ghosts.push([MARKS.selectunit, MARKS.selectattacktarget, "pawn", 2]);
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectattacktarget] || {}).id];
      UNITLAYERS = {
        units: {},
        myunits: {},
        oppunits: {},
        warriors: {},
        heroes: {},
        barricades: {},
        tyrannos: {},
        mytyrannos: {},
        opptyrannos: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.opptyrannos).length === 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectunit]: 1 });
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
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({ line: [{ text: "Select a unit to act with" }] });
    },
    move_basic_1: () => defaultInstruction(1),
    attack_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          !UNITLAYERS.barricades[MARKS.selectunit]
            ? { text: "or attack" }
            : undefined,
          { text: "with" },
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
    selectattacktarget_basic_1: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "attack" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "kill" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectattacktarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectattacktarget] || {}).owner,
              MARKS.selectattacktarget
            ]
          }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({ line: [{ text: "Select a unit to act with" }] });
    },
    move_basic_2: () => defaultInstruction(2),
    attack_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Select where to move" },
          !UNITLAYERS.barricades[MARKS.selectunit]
            ? { text: "or attack" }
            : undefined,
          { text: "with" },
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
    selectattacktarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "attack" },
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "kill" },
          {
            unit: [
              iconMapping[
                (UNITLAYERS.units[MARKS.selectattacktarget] || {}).group
              ],
              (UNITLAYERS.units[MARKS.selectattacktarget] || {}).owner,
              MARKS.selectattacktarget
            ]
          }
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
        setup: {},
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 9,
      width: 9,
      terrain: {
        base: {
          "1": [
            {
              rect: ["a1", "i1"]
            }
          ],
          "2": [
            {
              rect: ["a9", "i9"]
            }
          ]
        },
        temple: ["e5"]
      }
    }
  },
  setups: {
    basic: {
      barricades: {
        "1": ["e3"],
        "2": ["e7"]
      },
      tyrannos: {
        "1": ["e2"],
        "2": ["e8"]
      },
      warriors: {
        "1": [
          {
            holerect: ["a3", "i3", "e3"]
          }
        ],
        "2": [
          {
            holerect: ["a7", "i7", "e7"]
          }
        ]
      },
      heroes: {
        "1": ["a2", "b2", "c2", "g2", "h2", "i2"],
        "2": ["a8", "b8", "c8", "g8", "h8", "i8"]
      }
    }
  }
};
export default game;
