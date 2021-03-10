import {
  offsetPos,
  whoWins,
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
import boards from "../../games/definitions/dao/boards";
import setups from "../../games/definitions/dao/setups";
import variants from "../../games/definitions/dao/variants";
const emptyObj = {};
const iconMapping = { soldiers: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  soldiers: [["units"], ["units", "myunits"], ["units", "oppunits"]]
};
const groupLayers2 = {
  soldiers: [["units"], ["units", "oppunits"], ["units", "myunits"]]
};
const prefixes1 = ["neutral", "my", "opp"];
const prefixes2 = ["neutral", "opp", "my"];
const emptyArtifactLayers_basic = {
  movetargets: {},
  winline: {},
  winblock: {},
  blockvictim: {},
  forbidden: {}
};
const game = {
  gameId: "dao",
  commands: { move: {} },
  iconMap: iconMapping,
  setBoard: board => {
    TERRAIN1 = terrainLayers(board, 1);
    TERRAIN2 = terrainLayers(board, 2);
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
        TURN: step.TURN + 1
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
        TURN: step.TURN
      };
    },
    selectunit_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        blockvictim: {},
        forbidden: {},
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN1.corners)
          .concat(Object.keys(UNITLAYERS.oppunits))
          .reduce((mem, k) => {
            mem[k] = (mem[k] || 0) + 1;
            return mem;
          }, {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => {
          mem[key] = emptyObj;
          return mem;
        }, {})) {
        let TOTALCOUNT = 0;
        let specialCountSet = Object.keys(UNITLAYERS.myunits)
          .filter(k => k !== MARKS.selectunit)
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            foundneighbours.push(POS);
            if (specialCountSet[POS]) {
              TOTALCOUNT++;
            }
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (TOTALCOUNT === 2 && !UNITLAYERS.units[POS]) {
            ARTIFACTS.forbidden[POS] = emptyObj;
          }
        }
        if (TOTALCOUNT === 2) {
          ARTIFACTS.blockvictim[STARTPOS] = emptyObj;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (!ARTIFACTS.forbidden[walkedsquares[WALKLENGTH - 1]]) {
              ARTIFACTS.movetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
        canAlwaysEnd: true
      };
    },
    selectunit_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        blockvictim: {},
        forbidden: {},
        movetargets: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectunit: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      for (let STARTPOS in Object.entries(
        Object.keys(TERRAIN2.corners)
          .concat(Object.keys(UNITLAYERS.oppunits))
          .reduce((mem, k) => {
            mem[k] = (mem[k] || 0) + 1;
            return mem;
          }, {})
      )
        .filter(([key, n]) => n === 2)
        .reduce((mem, [key]) => {
          mem[key] = emptyObj;
          return mem;
        }, {})) {
        let TOTALCOUNT = 0;
        let specialCountSet = Object.keys(UNITLAYERS.myunits)
          .filter(k => k !== MARKS.selectunit)
          .reduce((m, k) => {
            m[k] = emptyObj;
            return m;
          }, {});
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of roseDirs) {
          let POS = startconnections[DIR];
          if (POS) {
            foundneighbours.push(POS);
            if (specialCountSet[POS]) {
              TOTALCOUNT++;
            }
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (TOTALCOUNT === 2 && !UNITLAYERS.units[POS]) {
            ARTIFACTS.forbidden[POS] = emptyObj;
          }
        }
        if (TOTALCOUNT === 2) {
          ARTIFACTS.blockvictim[STARTPOS] = emptyObj;
        }
      }
      {
        let BLOCKS = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let POS = MARKS.selectunit;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if (!ARTIFACTS.forbidden[walkedsquares[WALKLENGTH - 1]]) {
              ARTIFACTS.movetargets[walkedsquares[WALKLENGTH - 1]] = emptyObj;
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
        canAlwaysEnd: true
      };
    },
    move_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        blockvictim: step.ARTIFACTS.blockvictim,
        forbidden: step.ARTIFACTS.forbidden,
        movetargets: step.ARTIFACTS.movetargets,
        winline: {},
        winblock: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
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
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in UNITLAYERS.myunits) {
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
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
      for (let STARTPOS in UNITLAYERS.myunits) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, 3]) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.myunits[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (NEIGHBOURCOUNT === 3) {
            ARTIFACTS.winblock[POS] = emptyObj;
          }
        }
        if (NEIGHBOURCOUNT === 3) {
          ARTIFACTS.winblock[STARTPOS] = emptyObj;
        }
      }
      if (
        4 ===
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN1.corners))
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
        ).length
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "occupycorners";
        LINKS.endMarks = Object.keys(TERRAIN1.corners);
      } else if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(ARTIFACTS.winblock).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeblock";
        LINKS.endMarks = Object.keys(ARTIFACTS.winblock);
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
    move_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let ARTIFACTS = {
        blockvictim: step.ARTIFACTS.blockvictim,
        forbidden: step.ARTIFACTS.forbidden,
        movetargets: step.ARTIFACTS.movetargets,
        winline: {},
        winblock: {}
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let MARKS = step.MARKS;
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
      {
        let allowedsteps = UNITLAYERS.myunits;
        for (let STARTPOS in UNITLAYERS.myunits) {
          for (let DIR of orthoDirs) {
            let walkedsquares = [];
            let POS = "faux";
            connections.faux[DIR] = STARTPOS;
            while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
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
      for (let STARTPOS in UNITLAYERS.myunits) {
        let foundneighbours = [];
        let startconnections = connections[STARTPOS];
        for (let DIR of [1, 2, 3]) {
          let POS = startconnections[DIR];
          if (POS && UNITLAYERS.myunits[POS]) {
            foundneighbours.push(POS);
          }
        }
        let NEIGHBOURCOUNT = foundneighbours.length;
        for (
          let neighbournbr = 0;
          neighbournbr < NEIGHBOURCOUNT;
          neighbournbr++
        ) {
          let POS = foundneighbours[neighbournbr];
          if (NEIGHBOURCOUNT === 3) {
            ARTIFACTS.winblock[POS] = emptyObj;
          }
        }
        if (NEIGHBOURCOUNT === 3) {
          ARTIFACTS.winblock[STARTPOS] = emptyObj;
        }
      }
      if (
        4 ===
        Object.keys(
          Object.entries(
            Object.keys(UNITLAYERS.myunits)
              .concat(Object.keys(TERRAIN2.corners))
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
        ).length
      ) {
        LINKS.endGame = "win";
        LINKS.endedBy = "occupycorners";
        LINKS.endMarks = Object.keys(TERRAIN2.corners);
      } else if (Object.keys(ARTIFACTS.winline).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeline";
        LINKS.endMarks = Object.keys(ARTIFACTS.winline);
      } else if (Object.keys(ARTIFACTS.winblock).length !== 0) {
        LINKS.endGame = "win";
        LINKS.endedBy = "madeblock";
        LINKS.endMarks = Object.keys(ARTIFACTS.winblock);
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
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 1] },
          { text: "to move" }
        ]
      });
    },
    move_basic_1: () => defaultInstruction(1),
    selectunit_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
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
          },
          Object.keys(ARTIFACTS.forbidden).length !== 0
            ? collapseContent({
                line: [
                  { text: "(except to" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.forbidden)
                      .map(p => ({ pos: p }))
                      .reduce((mem, i, n, list) => {
                        mem.push(i);
                        if (n === list.length - 2) {
                          mem.push({ text: " and " });
                        } else if (n < list.length - 2) {
                          mem.push({ text: ", " });
                        }
                        return mem;
                      }, [])
                  }),
                  { text: "which blocks" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.blockvictim)
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
                  }),
                  { text: ")" }
                ]
              })
            : undefined
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "slide to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    },
    startTurn_basic_2: step => {
      return collapseContent({
        line: [
          { select: "Select" },
          { unittype: ["pawn", 2] },
          { text: "to move" }
        ]
      });
    },
    move_basic_2: () => defaultInstruction(2),
    selectunit_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
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
          },
          Object.keys(ARTIFACTS.forbidden).length !== 0
            ? collapseContent({
                line: [
                  { text: "(except to" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.forbidden)
                      .map(p => ({ pos: p }))
                      .reduce((mem, i, n, list) => {
                        mem.push(i);
                        if (n === list.length - 2) {
                          mem.push({ text: " and " });
                        } else if (n < list.length - 2) {
                          mem.push({ text: ", " });
                        }
                        return mem;
                      }, [])
                  }),
                  { text: "which blocks" },
                  collapseContent({
                    line: Object.keys(ARTIFACTS.blockvictim)
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
                  }),
                  { text: ")" }
                ]
              })
            : undefined
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
          { text: "to make" },
          {
            unit: [
              iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
              (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
              MARKS.selectunit
            ]
          },
          { text: "slide to" },
          { pos: MARKS.selectmovetarget }
        ]
      });
    }
  },
  variants,
  boards,
  setups
};
export default game;
