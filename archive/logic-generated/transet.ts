import fullDef from "../../games/dist/games/transet";
import {
  relativedirs,
  reduce,
  pos2coords,
  coords2pos,
  boardPositions,
  offsetPos,
  posConnections,
  boardConnections,
  boardLayers,
  convertToEntities,
  deduceInitialUnitData,
  terrainLayers,
  mergeStrings,
  collapseLine
} from "../../common";
let game: any = {};
const emptyArtifactLayer = { swap2step: {}, swap1steps: {}, movetargets: {} };
game.commands = { move: 1, swap: 1 };
game.graphics = {
  icons: { pinets: "pawn", piokers: "bishop", piases: "king" },
  tiles: { base: "playercolour" }
};
game.board = {
  height: 5,
  width: 5,
  terrain: {
    base: { "1": [["rect", "a1", "e1"]], "2": [["rect", "a5", "e5"]] }
  }
};
game.AI = [];
game.id = "transet";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);

game.newGame = function() {
  let turnseed = { turn: 0 };
  let stepseed = {
    UNITDATA: deduceInitialUnitData(fullDef.setup)
  };
  return game.start1(turnseed, stepseed);
};
game.debug = function() {
  return {
    BOARD: BOARD,
    connections: connections,
    plr1: game.debug1(),
    plr2: game.debug2()
  };
};

{
  // Actions for player 1

  let TERRAIN = terrainLayers(fullDef.board, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;

  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = !!UNITLAYERS.pinets[MARKS["selectunit"]]
      ? [1]
      : !!UNITLAYERS.piokers[MARKS["selectunit"]]
      ? [8, 2]
      : [8, 1, 2];
    let nbrofneighbourdirs = neighbourdirs.length;

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.myunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    });
    turn.links[newstepid] = {};
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = "selectmovetarget1";
      }
    }
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = (function() {
            let ret = {};
            ret[MARKS["selectunit"]] = 1;
            return ret;
          })();
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectswapunit1";
      }
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "a square to" },
                { type: "cmndref", cmnd: "move" },
                { type: "text", text: "the" },
                { type: "posref", pos: MARKS["selectunit"] },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]
                    ]
                },
                { type: "text", text: "to" }
              ]
            })
          },
          {
            cond: Object.keys(turn.links[step.stepid]).filter(function(action) {
              let func = turn.links[step.stepid][action];
              return func.substr(0, func.length - 1) === "selectswapunit";
            }).length,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "another unit to swap the" },
                { type: "posref", pos: MARKS["selectunit"] },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]
                    ]
                },
                { type: "text", text: "with" }
              ]
            })
          }
        ]
          .filter(function(elem) {
            return elem.cond;
          })
          .reduce(
            function(mem, elem, n, list) {
              mem.content.push(elem.content);
              if (n === list.length - 2) {
                mem.content.push("or");
              } else if (n < list.length - 2) {
                mem.content.push(",");
              }
              return mem;
            },
            { type: "line", content: [] }
          )
      ]
    });
  };

  game.selectmovetarget1 = function(turn, step, markpos) {
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmovetarget"
    });
    turn.links[newstepid] = {};

    if (
      !!UNITLAYERS.units[MARKS["selectmovetarget"]] &&
      !TERRAIN.oppbase[MARKS["selectmovetarget"]]
    ) {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = TERRAIN.oppbase,
          s1 = UNITLAYERS.oppunits;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeportdestination1";
      }
    } else {
      turn.links[newstepid].move = "move1";
    }

    return newstep;
  };
  game.selectmovetarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return !!UNITLAYERS.units[MARKS["selectmovetarget"]] &&
      !TERRAIN.oppbase[MARKS["selectmovetarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Select where the enemy," },
            {
              type: "unittyperef",
              name:
                game.graphics.icons[
                  (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]
                ]
            },
            { type: "text", text: "at" },
            { type: "posref", pos: MARKS["selectmovetarget"] },
            { type: "text", text: "should end up" }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "move" },
            { type: "text", text: "to go from" },
            { type: "posref", pos: MARKS["selectunit"] },
            { type: "text", text: "to" },
            { type: "posref", pos: MARKS["selectmovetarget"] }
          ]
        });
  };

  game.selectdeportdestination1 = function(turn, step, markpos) {
    let MARKS = {
      selectdeportdestination: markpos,
      selectunit: step.MARKS.selectunit,
      selectmovetarget: step.MARKS.selectmovetarget
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeportdestination"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move1";

    return newstep;
  };
  game.selectdeportdestination1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to go from" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] },
        { type: "text", text: "and deport the enemy to" },
        { type: "posref", pos: MARKS["selectdeportdestination"] }
      ]
    });
  };

  game.selectswapunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectswapunit: markpos, selectunit: step.MARKS.selectunit };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = [1, 3, 5, 7];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let DIR = neighbourdirs[dirnbr];

      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["swap1steps"]: {
            ...ARTIFACTS["swap1steps"],
            [POS]: { dir: DIR }
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectswapunit"
    });
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.swap1steps) {
      newlinks[linkpos] = "selectswap1target1";
    }

    return newstep;
  };
  game.selectswapunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a neighbouring square for" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to step to. The" },
        { type: "posref", pos: MARKS["selectswapunit"] },
        { type: "text", text: "unit will step in the opposite direction" }
      ]
    });
  };

  game.selectswap1target1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = {
      selectswap1target: markpos,
      selectunit: step.MARKS.selectunit,
      selectswapunit: step.MARKS.selectswapunit
    };

    let STARTPOS = MARKS["selectswapunit"];

    let POS =
      connections[STARTPOS][
        relativedirs[
          (ARTIFACTS.swap1steps[MARKS["selectswap1target"]] || {})["dir"] -
            2 +
            5
        ]
      ];
    if (
      POS &&
      !(function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.units,
          s1 = (function() {
            let ret = {};
            ret[MARKS["selectswap1target"]] = 1;
            return ret;
          })();
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })()[POS]
    ) {
      ARTIFACTS = {
        ...ARTIFACTS,
        ["swap2step"]: {
          ...ARTIFACTS["swap2step"],
          [POS]: {}
        }
      };
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectswap1target"
    });
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
      turn.links[newstepid].swap = "swap1";
    }

    return newstep;
  };
  game.selectswap1target1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "swap" },
        { type: "text", text: "to step" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectswap1target"] },
        { type: "text", text: "and step" },
        { type: "posref", pos: MARKS["selectswapunit"] },
        { type: "text", text: "in the other direction to" },
        {
          type: "text",
          text: Object.keys(ARTIFACTS.swap2step)[0]
        }
      ]
    });
  };

  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };

    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.units[MARKS["selectmovetarget"]]) {
      if (!!TERRAIN.oppbase[MARKS["selectmovetarget"]]) {
        {
          delete UNITDATA[
            (UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id
          ];
        }
      } else {
        {
          let unitid = (UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS["selectdeportdestination"]
            };
          }
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS["selectmovetarget"]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move")
    });
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        })()
      ).length !== 0
    ) {
      let winner = 1;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "infiltration";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].infiltration = (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = TERRAIN.oppbase;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.swap1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS["selectswap1target"]
        };
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectswapunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: Object.keys(ARTIFACTS.swap2step)[0]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "swap";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "swap",
      path: step.path.concat("swap")
    });
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        })()
      ).length !== 0
    ) {
      let winner = 1;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "infiltration";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].infiltration = (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = TERRAIN.oppbase;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.start1 = function(lastTurn, step) {
    let turn: { [f: string]: any } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: { root: {} },
      endMarks: {}
    };

    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;

    let UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstep = (turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: "root",
      name: "start",

      path: []
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit1";
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a unit to" },
        { type: "cmndref", cmnd: "move" }
      ]
    });
  };

  game.debug1 = function() {
    return { TERRAIN: TERRAIN };
  };
}

{
  // Actions for player 2

  let TERRAIN = terrainLayers(fullDef.board, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;

  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = !!UNITLAYERS.pinets[MARKS["selectunit"]]
      ? [5]
      : !!UNITLAYERS.piokers[MARKS["selectunit"]]
      ? [4, 6]
      : [4, 5, 6];
    let nbrofneighbourdirs = neighbourdirs.length;

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.myunits[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [POS]: {}
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    });
    turn.links[newstepid] = {};
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = "selectmovetarget2";
      }
    }
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = (function() {
            let ret = {};
            ret[MARKS["selectunit"]] = 1;
            return ret;
          })();
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectswapunit2";
      }
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "a square to" },
                { type: "cmndref", cmnd: "move" },
                { type: "text", text: "the" },
                { type: "posref", pos: MARKS["selectunit"] },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]
                    ]
                },
                { type: "text", text: "to" }
              ]
            })
          },
          {
            cond: Object.keys(turn.links[step.stepid]).filter(function(action) {
              let func = turn.links[step.stepid][action];
              return func.substr(0, func.length - 1) === "selectswapunit";
            }).length,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "another unit to swap the" },
                { type: "posref", pos: MARKS["selectunit"] },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]
                    ]
                },
                { type: "text", text: "with" }
              ]
            })
          }
        ]
          .filter(function(elem) {
            return elem.cond;
          })
          .reduce(
            function(mem, elem, n, list) {
              mem.content.push(elem.content);
              if (n === list.length - 2) {
                mem.content.push("or");
              } else if (n < list.length - 2) {
                mem.content.push(",");
              }
              return mem;
            },
            { type: "line", content: [] }
          )
      ]
    });
  };

  game.selectmovetarget2 = function(turn, step, markpos) {
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmovetarget"
    });
    turn.links[newstepid] = {};

    if (
      !!UNITLAYERS.units[MARKS["selectmovetarget"]] &&
      !TERRAIN.oppbase[MARKS["selectmovetarget"]]
    ) {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = TERRAIN.oppbase,
          s1 = UNITLAYERS.oppunits;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeportdestination2";
      }
    } else {
      turn.links[newstepid].move = "move2";
    }

    return newstep;
  };
  game.selectmovetarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return !!UNITLAYERS.units[MARKS["selectmovetarget"]] &&
      !TERRAIN.oppbase[MARKS["selectmovetarget"]]
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Select where the enemy," },
            {
              type: "unittyperef",
              name:
                game.graphics.icons[
                  (UNITLAYERS.units[MARKS["selectmovetarget"]] || {})["group"]
                ]
            },
            { type: "text", text: "at" },
            { type: "posref", pos: MARKS["selectmovetarget"] },
            { type: "text", text: "should end up" }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "move" },
            { type: "text", text: "to go from" },
            { type: "posref", pos: MARKS["selectunit"] },
            { type: "text", text: "to" },
            { type: "posref", pos: MARKS["selectmovetarget"] }
          ]
        });
  };

  game.selectdeportdestination2 = function(turn, step, markpos) {
    let MARKS = {
      selectdeportdestination: markpos,
      selectunit: step.MARKS.selectunit,
      selectmovetarget: step.MARKS.selectmovetarget
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeportdestination"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move2";

    return newstep;
  };
  game.selectdeportdestination2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to go from" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectmovetarget"] },
        { type: "text", text: "and deport the enemy to" },
        { type: "posref", pos: MARKS["selectdeportdestination"] }
      ]
    });
  };

  game.selectswapunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectswapunit: markpos, selectunit: step.MARKS.selectunit };

    let STARTPOS = MARKS["selectunit"];

    let neighbourdirs = [1, 3, 5, 7];

    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 4; dirnbr++) {
      let DIR = neighbourdirs[dirnbr];

      let POS = startconnections[DIR];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["swap1steps"]: {
            ...ARTIFACTS["swap1steps"],
            [POS]: { dir: DIR }
          }
        };
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectswapunit"
    });
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.swap1steps) {
      newlinks[linkpos] = "selectswap1target2";
    }

    return newstep;
  };
  game.selectswapunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a neighbouring square for" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to step to. The" },
        { type: "posref", pos: MARKS["selectswapunit"] },
        { type: "text", text: "unit will step in the opposite direction" }
      ]
    });
  };

  game.selectswap1target2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = {
      selectswap1target: markpos,
      selectunit: step.MARKS.selectunit,
      selectswapunit: step.MARKS.selectswapunit
    };

    let STARTPOS = MARKS["selectswapunit"];

    let POS =
      connections[STARTPOS][
        relativedirs[
          (ARTIFACTS.swap1steps[MARKS["selectswap1target"]] || {})["dir"] -
            2 +
            5
        ]
      ];
    if (
      POS &&
      !(function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.units,
          s1 = (function() {
            let ret = {};
            ret[MARKS["selectswap1target"]] = 1;
            return ret;
          })();
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })()[POS]
    ) {
      ARTIFACTS = {
        ...ARTIFACTS,
        ["swap2step"]: {
          ...ARTIFACTS["swap2step"],
          [POS]: {}
        }
      };
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectswap1target"
    });
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.swap2step).length !== 0) {
      turn.links[newstepid].swap = "swap2";
    }

    return newstep;
  };
  game.selectswap1target2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "swap" },
        { type: "text", text: "to step" },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selectswap1target"] },
        { type: "text", text: "and step" },
        { type: "posref", pos: MARKS["selectswapunit"] },
        { type: "text", text: "in the other direction to" },
        {
          type: "text",
          text: Object.keys(ARTIFACTS.swap2step)[0]
        }
      ]
    });
  };

  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };

    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.units[MARKS["selectmovetarget"]]) {
      if (!!TERRAIN.oppbase[MARKS["selectmovetarget"]]) {
        {
          delete UNITDATA[
            (UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id
          ];
        }
      } else {
        {
          let unitid = (UNITLAYERS.units[MARKS["selectmovetarget"]] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = {
              ...UNITDATA[unitid],
              pos: MARKS["selectdeportdestination"]
            };
          }
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS["selectmovetarget"]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "move";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move")
    });
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        })()
      ).length !== 0
    ) {
      let winner = 2;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "infiltration";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].infiltration = (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = TERRAIN.oppbase;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.swap2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS["selectswap1target"]
        };
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectswapunit"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: Object.keys(ARTIFACTS.swap2step)[0]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstepid = step.stepid + "-" + "swap";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "swap",
      path: step.path.concat("swap")
    });
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.oppbase;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        })()
      ).length !== 0
    ) {
      let winner = 2;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "infiltration";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].infiltration = (function() {
        let ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = TERRAIN.oppbase;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.start2 = function(lastTurn, step) {
    let turn: { [f: string]: any } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: { root: {} },
      endMarks: {}
    };

    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;

    let UNITLAYERS = {
      pinets: {},
      mypinets: {},
      opppinets: {},
      neutralpinets: {},
      piokers: {},
      mypiokers: {},
      opppiokers: {},
      neutralpiokers: {},
      piases: {},
      mypiases: {},
      opppiases: {},
      neutralpiases: {},
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid];
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner];
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[
        owner + unitgroup
      ][unitpos] = UNITLAYERS[owner + "units"][unitpos] = currentunit;
    }

    let newstep = (turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: "root",
      name: "start",

      path: []
    });

    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = "selectunit2";
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a unit to" },
        { type: "cmndref", cmnd: "move" }
      ]
    });
  };

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
