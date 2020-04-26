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
const iconMapping = { stones: "pawn" };
let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions;
const groupLayers1 = {
  stones: [
    ["units", "stones"],
    ["units", "myunits", "stones"],
    ["units", "oppunits", "stones"]
  ]
};
const groupLayers2 = {
  stones: [
    ["units", "stones"],
    ["units", "oppunits", "stones"],
    ["units", "myunits", "stones"]
  ]
};
const emptyArtifactLayers_basic = { doomed: {}, pushed: {} };
const game = {
  gameId: "momentum",
  commands: { pie: {}, drop: {} },
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
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
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
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        stones: oldUnitLayers.stones
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
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
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN: step.TURN + 1,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    startTurn_basic_2: step => {
      const oldUnitLayers = step.UNITLAYERS;
      let UNITLAYERS = {
        units: oldUnitLayers.units,
        myunits: oldUnitLayers.oppunits,
        oppunits: oldUnitLayers.myunits,
        stones: oldUnitLayers.stones
      };
      let LINKS = {
        marks: {},
        commands: {}
      };
      let TURN = step.TURN;
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
      if (TURN === 1) {
        LINKS.commands.pie = "pie_basic_2";
      }
      return {
        UNITDATA: step.UNITDATA,
        LINKS,
        UNITLAYERS,
        ARTIFACTS: emptyArtifactLayers_basic,
        MARKS: {},
        TURN,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_1: (step, newMarkPos) => {
      let ARTIFACTS = {
        doomed: {},
        pushed: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectdroptarget;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            {
              if (STOPREASON === "outofbounds") {
                ARTIFACTS.doomed[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
            {
              if (STOPREASON === "nomoresteps") {
                ARTIFACTS.pushed[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
          }
        }
      }
      LINKS.commands.drop = "drop_basic_1";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    selectdroptarget_basic_2: (step, newMarkPos) => {
      let ARTIFACTS = {
        doomed: {},
        pushed: {}
      };
      let LINKS = { marks: {}, commands: {} };
      let MARKS = {
        selectdroptarget: newMarkPos
      };
      let UNITLAYERS = step.UNITLAYERS;
      {
        let allowedsteps = UNITLAYERS.units;
        for (let DIR of roseDirs) {
          let walkedsquares = [];
          let STOPREASON = "";
          let POS = MARKS.selectdroptarget;
          while (
            !(STOPREASON = !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
          ) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            {
              if (STOPREASON === "outofbounds") {
                ARTIFACTS.doomed[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
            {
              if (STOPREASON === "nomoresteps") {
                ARTIFACTS.pushed[walkedsquares[WALKLENGTH - 1]] = {
                  pushdir: DIR
                };
              }
            }
          }
        }
      }
      LINKS.commands.drop = "drop_basic_2";
      return {
        LINKS,
        ARTIFACTS,
        UNITLAYERS,
        UNITDATA: step.UNITDATA,
        TURN: step.TURN,
        MARKS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_1: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        doomed: step.ARTIFACTS.doomed,
        pushed: step.ARTIFACTS.pushed
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.doomed;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).pushdir,
            1,
            0
          );
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "stones",
          owner: 1
        };
      }
      for (let LOOPPOS in ARTIFACTS.doomed) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        const LOOPSET = ARTIFACTS.pushed;
        for (let LOOPPOS in LOOPSET) {
          {
            let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: offsetPos(
                  LOOPPOS,
                  (LOOPSET[LOOPPOS] || {}).pushdir,
                  1,
                  0,
                  dimensions
                )
              };
            }
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers1[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.myunits).length === 8) {
        LINKS.endGame = "win";
        LINKS.endedBy = "allout";
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
        NEXTSPAWNID,
        anim
      };
    },
    pie_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      {
        let unitid = (
          UNITLAYERS.units[Object.keys(UNITLAYERS.oppunits)[0]] || {}
        ).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            owner: 2
          };
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      LINKS.endTurn = "startTurn_basic_1";
      return {
        LINKS,
        MARKS: {},
        ARTIFACTS: step.ARTIFACTS,
        TURN: step.TURN,
        UNITDATA,
        UNITLAYERS,
        NEXTSPAWNID: step.NEXTSPAWNID
      };
    },
    drop_basic_2: step => {
      let LINKS = { marks: {}, commands: {} };
      let anim = { enterFrom: {}, exitTo: {}, ghosts: [] };
      let ARTIFACTS = {
        doomed: step.ARTIFACTS.doomed,
        pushed: step.ARTIFACTS.pushed
      };
      let UNITLAYERS = step.UNITLAYERS;
      let UNITDATA = { ...step.UNITDATA };
      let NEXTSPAWNID = step.NEXTSPAWNID;
      let MARKS = step.MARKS;
      {
        const LOOPSET = ARTIFACTS.doomed;
        for (let LOOPPOS in LOOPSET) {
          anim.exitTo[LOOPPOS] = offsetPos(
            LOOPPOS,
            (LOOPSET[LOOPPOS] || {}).pushdir,
            1,
            0
          );
        }
      }
      {
        let newunitid = "spawn" + NEXTSPAWNID++;
        UNITDATA[newunitid] = {
          pos: MARKS.selectdroptarget,
          id: newunitid,
          group: "stones",
          owner: 2
        };
      }
      for (let LOOPPOS in ARTIFACTS.doomed) {
        delete UNITDATA[(UNITLAYERS.units[LOOPPOS] || {}).id];
      }
      {
        const LOOPSET = ARTIFACTS.pushed;
        for (let LOOPPOS in LOOPSET) {
          {
            let unitid = (UNITLAYERS.units[LOOPPOS] || {}).id;
            if (unitid) {
              UNITDATA[unitid] = {
                ...UNITDATA[unitid],
                pos: offsetPos(
                  LOOPPOS,
                  (LOOPSET[LOOPPOS] || {}).pushdir,
                  1,
                  0,
                  dimensions
                )
              };
            }
          }
        }
      }
      UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, stones: {} };
      for (let unitid in UNITDATA) {
        const currentunit = UNITDATA[unitid];
        const { group, pos, owner } = currentunit;
        for (const layer of groupLayers2[group][owner]) {
          UNITLAYERS[layer][pos] = currentunit;
        }
      }
      if (Object.keys(UNITLAYERS.myunits).length === 8) {
        LINKS.endGame = "win";
        LINKS.endedBy = "allout";
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
        NEXTSPAWNID,
        anim
      };
    }
  },
  instruction: {
    startTurn_basic_1: step => {
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              { text: "Select where to drop" },
              Object.keys(UNITLAYERS.myunits).length === 7
                ? collapseContent({
                    line: [
                      { text: "your last remaining" },
                      { unittype: ["pawn", 1] }
                    ]
                  })
                : collapseContent({
                    line: [
                      { text: "one of your" },
                      { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                      { text: "remaining" },
                      { unittype: ["pawn", 1] }
                    ]
                  })
            ]
          }),
          undefined
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
      });
    },
    drop_basic_1: () => defaultInstruction(1),
    selectdroptarget_basic_1: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to" },
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "spawn" },
                  { unit: ["pawn", 1, MARKS.selectdroptarget] }
                ]
              }),
              Object.keys(ARTIFACTS.pushed).length !== 0
                ? collapseContent({
                    line: [
                      { text: "push" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.pushed)
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
                : undefined,
              Object.keys(ARTIFACTS.doomed).length !== 0
                ? collapseContent({
                    line: [
                      { text: "kill" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.doomed)
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
      let UNITLAYERS = step.UNITLAYERS;
      let TURN = step.TURN;
      return collapseContent({
        line: [
          collapseContent({
            line: [
              { text: "Select where to drop" },
              Object.keys(UNITLAYERS.myunits).length === 7
                ? collapseContent({
                    line: [
                      { text: "your last remaining" },
                      { unittype: ["pawn", 2] }
                    ]
                  })
                : collapseContent({
                    line: [
                      { text: "one of your" },
                      { text: 8 - Object.keys(UNITLAYERS.myunits).length },
                      { text: "remaining" },
                      { unittype: ["pawn", 2] }
                    ]
                  })
            ]
          }),
          TURN === 1
            ? collapseContent({
                line: [
                  { text: "press" },
                  { command: "pie" },
                  { text: "to take over" },
                  {
                    unit: [
                      iconMapping[
                        (
                          UNITLAYERS.units[Object.keys(UNITLAYERS.units)[0]] ||
                          {}
                        ).group
                      ],
                      (UNITLAYERS.units[Object.keys(UNITLAYERS.units)[0]] || {})
                        .owner,
                      Object.keys(UNITLAYERS.units)[0]
                    ]
                  }
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
      });
    },
    pie_basic_2: () => defaultInstruction(2),
    drop_basic_2: () => defaultInstruction(2),
    selectdroptarget_basic_2: step => {
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITLAYERS = step.UNITLAYERS;
      return collapseContent({
        line: [
          { text: "Press" },
          { command: "drop" },
          { text: "to" },
          collapseContent({
            line: [
              collapseContent({
                line: [
                  { text: "spawn" },
                  { unit: ["pawn", 2, MARKS.selectdroptarget] }
                ]
              }),
              Object.keys(ARTIFACTS.pushed).length !== 0
                ? collapseContent({
                    line: [
                      { text: "push" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.pushed)
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
                : undefined,
              Object.keys(ARTIFACTS.doomed).length !== 0
                ? collapseContent({
                    line: [
                      { text: "kill" },
                      collapseContent({
                        line: Object.keys(ARTIFACTS.doomed)
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
      code: "k",
      arr: {
        marks: [],
        potentialMarks: [
          "b1",
          "d1",
          "f1",
          "g1",
          "b2",
          "c2",
          "d2",
          "e2",
          "f2",
          "g2",
          "a3",
          "b3",
          "d3",
          "f3",
          "g3",
          "b4",
          "d4",
          "e4",
          "f4",
          "g4",
          "a5",
          "b5",
          "c5",
          "d5",
          "f5",
          "g5",
          "a6",
          "d6",
          "e6",
          "f6",
          "a7",
          "b7",
          "c7",
          "d7",
          "e7",
          "f7",
          "g7"
        ],
        setup: {
          stones: {
            "1": ["a1", "c1", "e1", "c4", "b6", "c6"],
            "2": ["a2", "c3", "e3", "a4", "e5", "g6"]
          }
        }
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
    basic: {}
  }
};
export default game;
