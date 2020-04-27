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
  knightDirs
} from "../../common";
const emptyObj = {};
const iconMapping = { soldiers: "rook" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const emptyArtifactLayers_basic = {
  movetargets: {},
  beingpushed: {},
  squished: {}
};
const game = {
  gameId: "aries",
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers2[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action[`startTurn_${ruleset}_1`]({
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
        oppunits: oldUnitLayers.myunits
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
        BATTLEVARS: step.BATTLEVARS
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits
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
        BATTLEVARS: step.BATTLEVARS
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of orthoDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !(
                POS === BATTLEVARS["pushsquare"] &&
                (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                  BATTLEVARS["pusheeid"]
              ) &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
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
        BATTLEVARS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: {},
        squished: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          let DIR =
            relativeDirs[1][
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ];
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[DIR] = MARKS.selectmovetarget;
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
            ARTIFACTS.beingpushed[POS] = emptyObj;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (STOPREASON === "hitblock" || STOPREASON === "outofbounds") {
              ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = { dir: DIR };
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
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of orthoDirs) {
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
          if (BLOCKS[POS]) {
            if (
              !(
                POS === BATTLEVARS["pushsquare"] &&
                (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
                  BATTLEVARS["pusheeid"]
              ) &&
              UNITLAYERS.oppunits[POS]
            ) {
              ARTIFACTS.movetargets[POS] = { dir: DIR };
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
        BATTLEVARS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: {},
        squished: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.oppunits[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.oppunits;
          let BLOCKS = UNITLAYERS.myunits;
          let DIR =
            relativeDirs[1][
              (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
            ];
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[DIR] = MARKS.selectmovetarget;
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
            ARTIFACTS.beingpushed[POS] = emptyObj;
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (STOPREASON === "hitblock" || STOPREASON === "outofbounds") {
              ARTIFACTS.squished[walkedsquares[WALKLENGTH - 1]] = { dir: DIR };
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
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: step.ARTIFACTS.beingpushed,
        squished: step.ARTIFACTS.squished
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.squished;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
      BATTLEVARS.pushsquare = MARKS.selectmovetarget;
      for (let LOOPPOS in ARTIFACTS.beingpushed) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos:
                connections[pos][
                  (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
                ]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.squished) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            Object.keys(TERRAIN1.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        LINKS.endedBy = "invade";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN1.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        BATTLEVARS,
        anim
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        beingpushed: step.ARTIFACTS.beingpushed,
        squished: step.ARTIFACTS.squished
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.squished;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).dir,
            1,
            0
          );
        }
      }
      BATTLEVARS.pusheeid = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).id;
      BATTLEVARS.pushsquare = MARKS.selectmovetarget;
      for (let LOOPPOS in ARTIFACTS.beingpushed) {
        {
          let pos = LOOPPOS;
          let unitid = (UNITLAYERS.units[pos] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos:
                connections[pos][
                  (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
                ]
            };
          }
        }
      }
      for (let LOOPPOS in ARTIFACTS.squished) {
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
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {} };
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
            Object.keys(TERRAIN2.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        LINKS.endedBy = "invade";
        LINKS.endMarks = Object.keys(
          Object.entries(
            Object.keys(TERRAIN2.oppcorner)
              .concat(Object.keys(UNITLAYERS.myunits))
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
        BATTLEVARS,
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
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let BATTLEVARS = step.BATTLEVARS;
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
          (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
          BATTLEVARS["pusheeid"]
            ? collapseContent({
                line: [
                  { text: "(but you can't push back at" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).group
                      ],
                      (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).owner,
                      BATTLEVARS["pushsquare"]
                    ]
                  },
                  { text: "this turn)" }
                ]
              })
            : undefined
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
          Object.keys(ARTIFACTS.squished).length !== 0
            ? collapseContent({
                line: [
                  { text: "and squash" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(ARTIFACTS.squished)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).owner,
                      Object.keys(ARTIFACTS.squished)[0]
                    ]
                  }
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
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let BATTLEVARS = step.BATTLEVARS;
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
          (UNITLAYERS.units[MARKS.selectunit] || {}).id ===
          BATTLEVARS["pusheeid"]
            ? collapseContent({
                line: [
                  { text: "(but you can't push back at" },
                  {
                    unit: [
                      iconMapping[
                        (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).group
                      ],
                      (UNITLAYERS.units[BATTLEVARS["pushsquare"]] || {}).owner,
                      BATTLEVARS["pushsquare"]
                    ]
                  },
                  { text: "this turn)" }
                ]
              })
            : undefined
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
          Object.keys(ARTIFACTS.squished).length !== 0
            ? collapseContent({
                line: [
                  { text: "and squash" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[
                            Object.keys(ARTIFACTS.squished)[0]
                          ] || {}
                        ).group
                      ],
                      (
                        UNITLAYERS.units[Object.keys(ARTIFACTS.squished)[0]] ||
                        {}
                      ).owner,
                      Object.keys(ARTIFACTS.squished)[0]
                    ]
                  }
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
      code: "e",
      arr: {
        marks: ["c7"],
        potentialMarks: ["c4", "c5", "c6", "a7", "b7", "d7", "e7", "c8"],
        setup: {
          soldiers: {
            "1": ["a1", "b1", "a2", "a3", "c3", "a4", "b4", "c7", "d8"],
            "2": ["g1", "b5", "f6", "h6", "e7", "f7", "h7", "f8", "h8"]
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
        corner: {
          "1": ["a1"],
          "2": ["h8"]
        }
      }
    }
  },
  setups: {
    basic: {
      soldiers: {
        "1": [
          {
            rect: ["a1", "d4"]
          }
        ],
        "2": [
          {
            rect: ["e5", "h8"]
          }
        ]
      }
    }
  }
};
export default game;
