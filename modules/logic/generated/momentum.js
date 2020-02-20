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
const dimensions = { height: 7, width: 7 };
const BOARD = boardLayers(dimensions);
const iconMapping = { stones: "pawn" };
const emptyArtifactLayers = { doomed: {}, pushed: {} };
const connections = boardConnections({ height: 7, width: 7 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(7, 7, {});
let game = {
  gameId: "momentum",
  action: {},
  instruction: {},
  commands: { pie: {}, drop: {} },
  iconMap: { stones: "pawn" }
};
{
  const groupLayers = {
    stones: [
      ["units", "stones"],
      ["units", "myunits", "stones"],
      ["units", "oppunits", "stones"]
    ]
  };
  game.action.startTurn1 = step => {
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
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdroptarget1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn1 = step => {
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
  };
  game.action.drop1 = step => {
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.myunits).length === 8) {
      LINKS.endGame = "win";
      LINKS.endedBy = "allout";
    } else {
      LINKS.endTurn = "startTurn2";
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
  };
  game.instruction.drop1 = () => defaultInstruction(1);
  game.action.selectdroptarget1 = (step, newMarkPos) => {
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
    LINKS.commands.drop = "drop1";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdroptarget1 = step => {
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
  };
}
{
  const groupLayers = {
    stones: [
      ["units", "stones"],
      ["units", "oppunits", "stones"],
      ["units", "myunits", "stones"]
    ]
  };
  game.action.startTurn2 = step => {
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
        .reduce((m, k) => ({ ...m, [k]: emptyObj }), {})
    )) {
      LINKS.marks[pos] = "selectdroptarget2";
    }
    if (TURN === 1) {
      LINKS.commands.pie = "pie2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.startTurn2 = step => {
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
                      (UNITLAYERS.units[Object.keys(UNITLAYERS.units)[0]] || {})
                        .group
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
  };
  game.newBattle = () => {
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA: {},
      UNITLAYERS: { units: {}, myunits: {}, oppunits: {}, stones: {} }
    });
  };
  game.action.pie2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    {
      let unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.oppunits)[0]] || {})
        .id;
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.myunits).length === 8) {
      LINKS.endGame = "win";
      LINKS.endedBy = "allout";
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.pie2 = () => defaultInstruction(2);
  game.action.drop2 = step => {
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
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (Object.keys(UNITLAYERS.myunits).length === 8) {
      LINKS.endGame = "win";
      LINKS.endedBy = "allout";
    } else {
      LINKS.endTurn = "startTurn1";
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
  };
  game.instruction.drop2 = () => defaultInstruction(2);
  game.action.selectdroptarget2 = (step, newMarkPos) => {
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
    LINKS.commands.drop = "drop2";
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectdroptarget2 = step => {
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
  };
}
export default game;
