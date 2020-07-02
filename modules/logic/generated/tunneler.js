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
const iconMapping = { foremen: "king", tunnelers: "rook", rocks: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  foremen: [
    ["units", "neutralunits"],
    ["units", "myunits", "myforemen"],
    ["units", "oppunits", "oppforemen"]
  ],
  tunnelers: [
    ["units", "neutralunits", "tunnelers"],
    ["units", "myunits", "tunnelers"],
    ["units", "oppunits", "tunnelers"]
  ],
  rocks: [
    ["units", "neutralunits", "rocks"],
    ["units", "myunits", "rocks"],
    ["units", "oppunits", "rocks"]
  ]
};
const groupLayers2 = {
  foremen: [
    ["units", "neutralunits"],
    ["units", "oppunits", "oppforemen"],
    ["units", "myunits", "myforemen"]
  ],
  tunnelers: [
    ["units", "neutralunits", "tunnelers"],
    ["units", "oppunits", "tunnelers"],
    ["units", "myunits", "tunnelers"]
  ],
  rocks: [
    ["units", "neutralunits", "rocks"],
    ["units", "oppunits", "rocks"],
    ["units", "myunits", "rocks"]
  ]
};
const emptyArtifactLayers_basic = { bitsum: {}, movetargets: {} };
const game = {
  gameId: "tunneler",
  commands: { move: {} },
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
      neutralunits: {},
      myforemen: {},
      oppforemen: {},
      tunnelers: {},
      rocks: {}
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
        neutralunits: oldUnitLayers.neutralunits,
        myforemen: oldUnitLayers.oppforemen,
        oppforemen: oldUnitLayers.myforemen,
        tunnelers: oldUnitLayers.tunnelers,
        rocks: oldUnitLayers.rocks
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
        neutralunits: oldUnitLayers.neutralunits,
        myforemen: oldUnitLayers.oppforemen,
        oppforemen: oldUnitLayers.myforemen,
        tunnelers: oldUnitLayers.tunnelers,
        rocks: oldUnitLayers.rocks
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
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        let STARTPOS = MARKS.selectunit;
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            {
              if (
                UNITLAYERS.neutralunits[POS] ||
                (UNITLAYERS.oppunits[POS] && UNITLAYERS.tunnelers[STARTPOS])
              ) {
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
        MARKS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        bitsum: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmovetarget;
        let foundneighbours = [];
        let foundneighbourdirs = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.neutralunits[POS]) {
            foundneighbours.push(POS);
            foundneighbourdirs.push(DIR);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          let DIR = foundneighbourdirs[neighbournbr];
          ARTIFACTS.bitsum[POS] = {
            empty: [0, 1, 2, 4, 8, 16, 32, 64, 128][DIR]
          };
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.bitsum[STARTPOS] = {
            bit: Object.entries(ARTIFACTS.bitsum).reduce(
              (mem, [pos, obj]) => mem + obj["empty"],
              0
            )
          };
        }
      }
      if (
        !(
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 7) === 7 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 28) === 28 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 112) ===
            112 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 193) === 193
        )
      ) {
        LINKS.commands.move = "move_basic_1";
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
        let STARTPOS = MARKS.selectunit;
        for (let DIR of orthoDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            {
              if (
                UNITLAYERS.neutralunits[POS] ||
                (UNITLAYERS.oppunits[POS] && UNITLAYERS.tunnelers[STARTPOS])
              ) {
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
        MARKS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        bitsum: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let STARTPOS = MARKS.selectmovetarget;
        let foundneighbours = [];
        let foundneighbourdirs = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS && !UNITLAYERS.neutralunits[POS]) {
            foundneighbours.push(POS);
            foundneighbourdirs.push(DIR);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          let DIR = foundneighbourdirs[neighbournbr];
          ARTIFACTS.bitsum[POS] = {
            empty: [0, 1, 2, 4, 8, 16, 32, 64, 128][DIR]
          };
        }
        if (!!NEIGHBOURCOUNT) {
          ARTIFACTS.bitsum[STARTPOS] = {
            bit: Object.entries(ARTIFACTS.bitsum).reduce(
              (mem, [pos, obj]) => mem + obj["empty"],
              0
            )
          };
        }
      }
      if (
        !(
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 7) === 7 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 28) === 28 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 112) ===
            112 ||
          ((ARTIFACTS.bitsum[MARKS.selectmovetarget] || {}).bit & 193) === 193
        )
      ) {
        LINKS.commands.move = "move_basic_2";
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
    move_basic_1: step => {
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
        neutralunits: {},
        myforemen: {},
        oppforemen: {},
        tunnelers: {},
        rocks: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppforemen).length < 2) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
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
    move_basic_2: step => {
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
        neutralunits: {},
        myforemen: {},
        oppforemen: {},
        tunnelers: {},
        rocks: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppforemen).length < 2) {
        LINKS.endGame = "win";
        LINKS.endedBy = "regicide";
        LINKS.endMarks = Object.keys({ [MARKS.selectmovetarget]: 1 });
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
          { select: "Select" },
          { unittype: ["king", 1] },
          { text: "or" },
          { unittype: ["rook", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
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
          { text: "to" },
          UNITLAYERS.rocks[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "make" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "dig" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : UNITLAYERS.oppunits[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "make" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "capture" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : collapseContent({
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
              })
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["king", 2] },
          { text: "or" },
          { unittype: ["rook", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
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
    selectmovetarget_basic_2: step => {
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "move" },
          { text: "to" },
          UNITLAYERS.rocks[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "make" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "dig" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : UNITLAYERS.oppunits[MARKS.selectmovetarget]
            ? collapseContent({
                line: [
                  { text: "make" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectunit] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                      MARKS.selectunit
                    ]
                  },
                  { text: "capture" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                      ],
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner,
                      MARKS.selectmovetarget
                    ]
                  }
                ]
              })
            : collapseContent({
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
        setup: {},
        marks: [],
        potentialMarks: []
      }
    }
  ],
  boards: {
    basic: {
      height: 11,
      width: 11,
      terrain: {}
    }
  },
  setups: {
    basic: {
      foremen: {
        "1": ["c2", "i2"],
        "2": ["c10", "i10"]
      },
      tunnelers: {
        "1": ["e2", "e4", "g4", "g2"],
        "2": ["e10", "e8", "g8", "g10"]
      },
      rocks: {
        "0": [
          {
            holerect: [
              "a1",
              "k11",
              "c2",
              "i2",
              "c10",
              "i10",
              "e2",
              "e4",
              "g4",
              "g2",
              "e10",
              "e8",
              "g8",
              "g10"
            ]
          }
        ]
      }
    }
  }
};
export default game;
