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
const iconMapping = { kings: "king", queens: "queen" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  kings: [
    ["units"],
    ["units", "myunits", "mykings"],
    ["units", "oppunits", "oppkings"]
  ],
  queens: [
    ["units"],
    ["units", "myunits", "myqueens"],
    ["units", "oppunits", "oppqueens"]
  ]
};
const groupLayers2 = {
  kings: [
    ["units"],
    ["units", "oppunits", "oppkings"],
    ["units", "myunits", "mykings"]
  ],
  queens: [
    ["units"],
    ["units", "oppunits", "oppqueens"],
    ["units", "myunits", "myqueens"]
  ]
};
const emptyArtifactLayers_basic = {
  movetargets: {},
  pushees: {},
  lastpushee: {},
  winline: {}
};
const game = {
  gameId: "atrium",
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
      mykings: {},
      oppkings: {},
      myqueens: {},
      oppqueens: {}
    };
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
        oppunits: oldUnitLayers.myunits,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        myqueens: oldUnitLayers.oppqueens,
        oppqueens: oldUnitLayers.myqueens
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
        oppunits: oldUnitLayers.myunits,
        mykings: oldUnitLayers.oppkings,
        oppkings: oldUnitLayers.mykings,
        myqueens: oldUnitLayers.oppqueens,
        oppqueens: oldUnitLayers.myqueens
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
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_1";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        pushees: {},
        lastpushee: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.units[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.units;
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ] = MARKS.selectmovetarget;
          while (
            !(STOPREASON = !(POS =
              connections[POS][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.pushees[POS] = emptyObj;
            }
          }
          if (WALKLENGTH) {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.lastpushee[walkedsquares[WALKLENGTH - 1]] = emptyObj;
            }
          }
        }
      }
      if (
        !UNITLAYERS.units[MARKS.selectmovetarget] ||
        (Object.keys(ARTIFACTS.pushees).length !== 0 &&
          !(
            MARKS.selectunit === BATTLEVARS["forbiddenpusher"] &&
            MARKS.selectmovetarget === BATTLEVARS["forbiddenpushtarget"]
          ))
      ) {
        LINKS.commands.move = "move_basic_1";
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
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      {
        let startconnections = connections[MARKS.selectunit];
        for (let DIR of orthoDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            ARTIFACTS.movetargets[POS] = { dir: DIR };
          }
        }
      }
      for (const pos of Object.keys(ARTIFACTS.movetargets)) {
        LINKS.marks[pos] = "selectmovetarget_basic_2";
      }
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS: step.UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        BATTLEVARS: step.BATTLEVARS
      };
    },
    selectmovetarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        pushees: {},
        lastpushee: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      };
      let BATTLEVARS = step.BATTLEVARS;
      let UNITLAYERS = step.UNITLAYERS;
      if (UNITLAYERS.units[MARKS.selectmovetarget]) {
        {
          let allowedsteps = UNITLAYERS.units;
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = "faux";
          connections.faux[
            (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
          ] = MARKS.selectmovetarget;
          while (
            !(STOPREASON = !(POS =
              connections[POS][
                (ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}).dir
              ])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.pushees[POS] = emptyObj;
            }
          }
          if (WALKLENGTH) {
            if (STOPREASON === "nomoresteps") {
              ARTIFACTS.lastpushee[walkedsquares[WALKLENGTH - 1]] = emptyObj;
            }
          }
        }
      }
      if (
        !UNITLAYERS.units[MARKS.selectmovetarget] ||
        (Object.keys(ARTIFACTS.pushees).length !== 0 &&
          !(
            MARKS.selectunit === BATTLEVARS["forbiddenpusher"] &&
            MARKS.selectmovetarget === BATTLEVARS["forbiddenpushtarget"]
          ))
      ) {
        LINKS.commands.move = "move_basic_2";
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
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        pushees: step.ARTIFACTS.pushees,
        lastpushee: step.ARTIFACTS.lastpushee,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      BATTLEVARS.pushdir = (
        ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}
      ).dir;
      if (Object.keys(ARTIFACTS.pushees).length !== 0) {
        BATTLEVARS.forbiddenpushtarget = Object.keys(ARTIFACTS.lastpushee)[0];
        BATTLEVARS.forbiddenpusher = offsetPos(
          Object.keys(ARTIFACTS.lastpushee)[0],
          BATTLEVARS["pushdir"],
          1,
          0
        );
        for (let LOOPPOS in ARTIFACTS.pushees) {
          {
            let pos = LOOPPOS;
            let unitid = (UNITLAYERS.units[pos] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: connections[pos][BATTLEVARS["pushdir"]]
              };
            }
          }
        }
      } else {
        BATTLEVARS.forbiddenpusher = Object.keys(ARTIFACTS.lastpushee)[0];
        BATTLEVARS.forbiddenpushtarget = Object.keys(ARTIFACTS.lastpushee)[0];
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
        mykings: {},
        oppkings: {},
        myqueens: {},
        oppqueens: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.myunits) {
          let allowedsteps = UNITLAYERS.mykings[STARTPOS]
            ? UNITLAYERS.mykings
            : UNITLAYERS.myqueens;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 3) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madewinline";
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
        BATTLEVARS
      };
    },
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        movetargets: step.ARTIFACTS.movetargets,
        pushees: step.ARTIFACTS.pushees,
        lastpushee: step.ARTIFACTS.lastpushee,
        winline: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let BATTLEVARS = { ...step.BATTLEVARS };
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
      BATTLEVARS.pushdir = (
        ARTIFACTS.movetargets[MARKS.selectmovetarget] || {}
      ).dir;
      if (Object.keys(ARTIFACTS.pushees).length !== 0) {
        BATTLEVARS.forbiddenpushtarget = Object.keys(ARTIFACTS.lastpushee)[0];
        BATTLEVARS.forbiddenpusher = offsetPos(
          Object.keys(ARTIFACTS.lastpushee)[0],
          BATTLEVARS["pushdir"],
          1,
          0
        );
        for (let LOOPPOS in ARTIFACTS.pushees) {
          {
            let pos = LOOPPOS;
            let unitid = (UNITLAYERS.units[pos] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: connections[pos][BATTLEVARS["pushdir"]]
              };
            }
          }
        }
      } else {
        BATTLEVARS.forbiddenpusher = Object.keys(ARTIFACTS.lastpushee)[0];
        BATTLEVARS.forbiddenpushtarget = Object.keys(ARTIFACTS.lastpushee)[0];
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
        mykings: {},
        oppkings: {},
        myqueens: {},
        oppqueens: {}
      };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      {
        for (let STARTPOS in UNITLAYERS.myunits) {
          let allowedsteps = UNITLAYERS.mykings[STARTPOS]
            ? UNITLAYERS.mykings
            : UNITLAYERS.myqueens;
          for (let DIR of roseDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            let WALKLENGTH = walkedsquares.length;
            for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if (WALKLENGTH === 3) {
                ARTIFACTS.winline[POS] = emptyObj;
              }
            }
          }
        }
      }
      if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madewinline";
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
        BATTLEVARS
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a" },
          { unittype: ["king", 1] },
          { text: "or" },
          { unittype: ["queen", 1] },
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
          { text: "orthogonal neighbour to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          MARKS.selectunit === BATTLEVARS["forbiddenpusher"]
            ? collapseContent({
                line: [
                  { text: " (but you cannot push back at" },
                  { pos: BATTLEVARS["forbiddenpushtarget"] },
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
      return Object.keys(ARTIFACTS.pushees).length === 0
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to walk" },
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
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to make" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "push" },
              collapseContent({
                line: Object.keys(ARTIFACTS.pushees)
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
          });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { text: "a" },
          { unittype: ["king", 2] },
          { text: "or" },
          { unittype: ["queen", 2] },
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
          { text: "orthogonal neighbour to move" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "to" },
          MARKS.selectunit === BATTLEVARS["forbiddenpusher"]
            ? collapseContent({
                line: [
                  { text: " (but you cannot push back at" },
                  { pos: BATTLEVARS["forbiddenpushtarget"] },
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
      return Object.keys(ARTIFACTS.pushees).length === 0
        ? collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to walk" },
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
          })
        : collapseContent({
            line: [
              { text: "Press" },
              { command: "move" },
              { text: "to make" },
              {
                unit: [
                  iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
                  (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
                  MARKS.selectunit
                ]
              },
              { text: "push" },
              collapseContent({
                line: Object.keys(ARTIFACTS.pushees)
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
        marks: ["b2"],
        potentialMarks: ["a2", "c2"],
        setup: {
          kings: {
            "1": ["b2", "d2", "c4"],
            "2": ["b1", "d3", "b4"]
          },
          queens: {
            "1": ["d1", "b3", "d5"],
            "2": ["c3", "a4", "e4"]
          }
        }
      }
    }
  ],
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {}
    }
  },
  setups: {
    basic: {
      kings: {
        "1": ["a2", "c5", "e2"],
        "2": ["b1", "b5", "e3"]
      },
      queens: {
        "1": ["a3", "d5", "d1"],
        "2": ["a4", "c1", "e4"]
      }
    }
  }
};
export default game;
