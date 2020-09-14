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
import boards from "../../games/definitions/euclid/boards";
import setups from "../../games/definitions/euclid/setups";
import variants from "../../games/definitions/euclid/variants";
const emptyObj = {};
const iconMapping = { soldiers: "rook", kings: "queen", projectiles: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [
    ["units"],
    ["units", "myunits", "mysoldiers"],
    ["units", "oppunits", "oppsoldiers"]
  ],
  kings: [
    ["units"],
    ["units", "myunits", "mykings"],
    ["units", "oppunits", "oppkings"]
  ],
  projectiles: [
    ["units", "projectiles"],
    ["units", "myunits", "projectiles"],
    ["units", "oppunits", "projectiles"]
  ]
};
const groupLayers2 = {
  soldiers: [
    ["units"],
    ["units", "oppunits", "oppsoldiers"],
    ["units", "myunits", "mysoldiers"]
  ],
  kings: [
    ["units"],
    ["units", "oppunits", "oppkings"],
    ["units", "myunits", "mykings"]
  ],
  projectiles: [
    ["units", "projectiles"],
    ["units", "oppunits", "projectiles"],
    ["units", "myunits", "projectiles"]
  ]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  movetargets: {},
  intersection: {},
  lines: {}
};
const game = {
  gameId: "euclid",
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
      mysoldiers: {},
      oppsoldiers: {},
      mykings: {},
      oppkings: {},
      projectiles: {}
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
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        projectiles: oldUnitLayers.projectiles
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
        mysoldiers: oldUnitLayers.oppsoldiers,
        oppsoldiers: oldUnitLayers.mysoldiers,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        projectiles: oldUnitLayers.projectiles
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
        for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
          ? roseDirs
          : orthoDirs) {
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
        MARKS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        intersection: {},
        lines: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        !UNITLAYERS.mykings[MARKS.selectunit] &&
        BOARD.board[MARKS.selectmovetarget].x !==
          BOARD.board[Object.keys(UNITLAYERS.mykings)[0]].x &&
        BOARD.board[MARKS.selectmovetarget].y !==
          BOARD.board[Object.keys(UNITLAYERS.mykings)[0]].y
      ) {
        {
          for (let STARTPOS in {
            ...UNITLAYERS.mykings,
            ...{ [MARKS.selectmovetarget]: 1 }
          }) {
            for (let DIR of orthoDirs) {
              let POS = STARTPOS;
              while ((POS = connections[POS][DIR])) {
                {
                  if (ARTIFACTS.lines[POS]) {
                    ARTIFACTS.intersection[POS] = emptyObj;
                  }
                }
                {
                  if (UNITLAYERS.oppsoldiers[POS]) {
                    ARTIFACTS.lines[POS] = emptyObj;
                  }
                }
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
        for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
          ? roseDirs
          : orthoDirs) {
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
        MARKS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        intersection: {},
        lines: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (
        !UNITLAYERS.mykings[MARKS.selectunit] &&
        BOARD.board[MARKS.selectmovetarget].x !==
          BOARD.board[Object.keys(UNITLAYERS.mykings)[0]].x &&
        BOARD.board[MARKS.selectmovetarget].y !==
          BOARD.board[Object.keys(UNITLAYERS.mykings)[0]].y
      ) {
        {
          for (let STARTPOS in {
            ...UNITLAYERS.mykings,
            ...{ [MARKS.selectmovetarget]: 1 }
          }) {
            for (let DIR of orthoDirs) {
              let POS = STARTPOS;
              while ((POS = connections[POS][DIR])) {
                {
                  if (ARTIFACTS.lines[POS]) {
                    ARTIFACTS.intersection[POS] = emptyObj;
                  }
                }
                {
                  if (UNITLAYERS.oppsoldiers[POS]) {
                    ARTIFACTS.lines[POS] = emptyObj;
                  }
                }
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
        MARKS
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        intersection: step.ARTIFACTS.intersection,
        lines: step.ARTIFACTS.lines
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.intersection) {
        anim.ghosts.push([MARKS.selectmovetarget, LOOPPOS, "pawn", 0]);
      }
      for (let LOOPPOS in ARTIFACTS.intersection) {
        anim.ghosts.push([
          Object.keys(UNITLAYERS.mykings)[0],
          LOOPPOS,
          "pawn",
          0
        ]);
      }
      for (let LOOPPOS in ARTIFACTS.intersection) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
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
        mysoldiers: {},
        oppsoldiers: {},
        mykings: {},
        oppkings: {},
        projectiles: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length < 3) {
        LINKS.endGame = "win";
        LINKS.endedBy = "domination";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
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
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        intersection: step.ARTIFACTS.intersection,
        lines: step.ARTIFACTS.lines
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      for (let LOOPPOS in ARTIFACTS.intersection) {
        anim.ghosts.push([MARKS.selectmovetarget, LOOPPOS, "pawn", 0]);
      }
      for (let LOOPPOS in ARTIFACTS.intersection) {
        anim.ghosts.push([
          Object.keys(UNITLAYERS.mykings)[0],
          LOOPPOS,
          "pawn",
          0
        ]);
      }
      for (let LOOPPOS in ARTIFACTS.intersection) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
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
        mysoldiers: {},
        oppsoldiers: {},
        mykings: {},
        oppkings: {},
        projectiles: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.oppunits).length < 3) {
        LINKS.endGame = "win";
        LINKS.endedBy = "domination";
        LINKS.endMarks = Object.keys(UNITLAYERS.myunits);
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
      let ARTIFACTS = step.ARTIFACTS;
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
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.intersection).length !== 0
            ? collapseContent({
                line: [
                  { text: "and kill" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.intersection)
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
          { unittype: ["rook", 2] },
          { text: "or" },
          { unittype: ["queen", 2] },
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
      let ARTIFACTS = step.ARTIFACTS;
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
          { pos: MARKS.selectmovetarget },
          Object.keys(ARTIFACTS.intersection).length !== 0
            ? collapseContent({
                line: [
                  { text: "and kill" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.intersection)
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
  variants,
  boards,
  setups
};
export default game;
