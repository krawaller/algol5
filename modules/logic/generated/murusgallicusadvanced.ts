import fullDef from "../../games/dist/games/murusgallicusadvanced";
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
const emptyArtifactLayer = {
  firetargets: {},
  movetargets: {},
  madecatapults: {},
  madetowers: {},
  madewalls: {},
  killtargets: {}
};
game.commands = { move: 1, kill: 1, sacrifice: 1, fire: 1 };
game.graphics = {
  tiles: { homerow: "playercolour" },
  icons: { towers: "rook", walls: "pawn", catapults: "queen" }
};
game.board = {
  height: 7,
  width: 8,
  terrain: {
    homerow: { "1": [["rect", "a1", "h1"]], "2": [["rect", "a7", "h7"]] }
  }
};
game.AI = [];
game.id = "murusgallicusadvanced";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);

game.newGame = function() {
  let turnseed = { turn: 0 };
  let stepseed = {
    UNITDATA: deduceInitialUnitData(fullDef.setup),

    clones: 0
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

  game.selecttower1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selecttower: markpos };
    {
      let BLOCKS = (function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.oppunits,
          s1 = UNITLAYERS.mycatapults;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })();

      let STARTPOS = MARKS["selecttower"];

      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let MAX = 2;

        let POS = STARTPOS;

        let LENGTH = 0;

        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);

          LENGTH++;
        }
        var WALKLENGTH = walkedsquares.length;

        var STEP = 0;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;

          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["movetargets"]: {
                ...ARTIFACTS["movetargets"],
                [POS]: { dir: DIR }
              }
            };
          }
        }
      }
    }
    {
      let STARTPOS = MARKS["selecttower"];

      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (
          POS &&
          (function() {
            let k,
              ret = {},
              s0 = UNITLAYERS.oppcatapults,
              s1 = UNITLAYERS.oppwalls;
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
            ["killtargets"]: {
              ...ARTIFACTS["killtargets"],
              [POS]: {}
            }
          };
        }
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selecttower"
    }));
    turn.links[newstepid] = {};
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = "selectmove1";
      }
    }
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.killtargets) {
        newlinks[linkpos] = "selectkill1";
      }
    }
    return newstep;
  };
  game.selecttower1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
            content: { type: "text", text: "a move target" }
          },
          {
            cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "an enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "to kill" }
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
          ),
        { type: "text", text: "for the" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        }
      ]
    });
  };

  game.selectmove1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectmove: markpos, selecttower: step.MARKS.selecttower };

    let STARTPOS = MARKS["selectmove"];

    let POS =
      connections[STARTPOS][
        relativedirs[
          (ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5
        ]
      ];
    if (POS) {
      ARTIFACTS = {
        ...ARTIFACTS,
        [!!UNITLAYERS.myunits[POS]
          ? !!UNITLAYERS.mytowers[POS]
            ? "madecatapults"
            : "madetowers"
          : "madewalls"]: {
          ...ARTIFACTS[
            !!UNITLAYERS.myunits[POS]
              ? !!UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ],
          [POS]: {}
        }
      };
    }

    ARTIFACTS = {
      ...ARTIFACTS,
      [!!UNITLAYERS.myunits[MARKS["selectmove"]]
        ? !!UNITLAYERS.mytowers[MARKS["selectmove"]]
          ? "madecatapults"
          : "madetowers"
        : "madewalls"]: {
        ...ARTIFACTS[
          !!UNITLAYERS.myunits[MARKS["selectmove"]]
            ? !!UNITLAYERS.mytowers[MARKS["selectmove"]]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ],
        [STARTPOS]: {}
      }
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmove"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move1";

    return newstep;
  };
  game.selectmove1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to overturn your" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        },
        { type: "text", text: "towards" },
        { type: "posref", pos: MARKS["selectmove"] }
      ]
    });
  };

  game.selectkill1 = function(turn, step, markpos) {
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectkill: markpos, selecttower: step.MARKS.selecttower };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectkill"
    }));
    turn.links[newstepid] = {};
    {
      turn.links[newstepid].kill = "kill1";
    }
    if (!!UNITLAYERS.oppcatapults[MARKS["selectkill"]]) {
      {
        turn.links[newstepid].sacrifice = "sacrifice1";
      }
    }

    return newstep;
  };
  game.selectkill1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "kill" },
        { type: "text", text: "to make a section of the" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        },
        !!UNITLAYERS.walls[MARKS["selectkill"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "crush the enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectkill"] }
              ]
            })
          : collapseLine({
              type: "line",
              content: [
                { type: "text", text: "reduce the enemy" },
                {
                  type: "unittyperef",
                  alias: "queen",
                  name: "queen".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectkill"] },
                { type: "text", text: "to a" },
                {
                  type: "unittyperef",
                  alias: "rook",
                  name: "rook".replace(/s$/, "")
                },
                { type: "text", text: ", or" },
                { type: "cmndref", cmnd: "sacrifice" },
                { type: "text", text: "your" },
                {
                  type: "unittyperef",
                  alias: "rook",
                  name: "rook".replace(/s$/, "")
                },
                { type: "text", text: "entirely to turn the" },
                {
                  type: "unittyperef",
                  alias: "queen",
                  name: "queen".replace(/s$/, "")
                },
                { type: "text", text: "to a" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "!" }
              ]
            })
      ]
    });
  };

  game.selectcatapult1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectcatapult: markpos };

    let STARTPOS = MARKS["selectcatapult"];

    let allwalkerdirs = [7, 8, 1, 2, 3];

    for (let walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
      let MAX = 3;

      let POS = STARTPOS;

      let LENGTH = 0;
      let STEP = 0;
      while (
        LENGTH < MAX &&
        (POS = connections[POS][allwalkerdirs[walkerdirnbr]])
      ) {
        LENGTH++;

        STEP++;

        if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["firetargets"]: {
              ...ARTIFACTS["firetargets"],
              [POS]: {}
            }
          };
        }
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectcatapult"
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.firetargets) {
      newlinks[linkpos] = "selectfire1";
    }

    return newstep;
  };
  game.selectcatapult1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select where to fire the top section of your" },
        { type: "posref", pos: MARKS["selectcatapult"] },
        {
          type: "unittyperef",
          alias: "queen",
          name: "queen".replace(/s$/, "")
        }
      ]
    });
  };

  game.selectfire1 = function(turn, step, markpos) {
    let MARKS = {
      selectfire: markpos,
      selectcatapult: step.MARKS.selectcatapult
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectfire"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].fire = "fire1";

    return newstep;
  };
  game.selectfire1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "fire" },
        { type: "text", text: "to shoot a section of the" },
        { type: "posref", pos: MARKS["selectcatapult"] },
        {
          type: "unittyperef",
          alias: "queen",
          name: "queen".replace(/s$/, "")
        },
        !!UNITLAYERS.walls[MARKS["selectfire"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "and destroy the enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] }
              ]
            })
          : !!UNITLAYERS.units[MARKS["selectfire"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: ", reducing the enemy" },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectfire"]] || {})["group"]
                    ]
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] },
                { type: "text", text: "to a" },
                !!UNITLAYERS.catapults[MARKS["selectfire"]]
                  ? {
                      type: "unittyperef",
                      alias: "rook",
                      name: "rook".replace(/s$/, "")
                    }
                  : {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, "")
                    }
              ]
            })
          : collapseLine({
              type: "line",
              content: [
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] },
                { type: "text", text: ", gaining a" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "there" }
              ]
            })
      ]
    });
  };

  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]] || {}).id];
    }
    {
      for (let POS in ARTIFACTS.madecatapults) {
        let unitid = (UNITLAYERS.units[POS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "catapults"
          });
        }
      }
    }
    {
      for (let POS in ARTIFACTS.madetowers) {
        let unitid = (UNITLAYERS.units[POS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "towers"
          });
        }
      }
    }
    {
      for (let POS in ARTIFACTS.madewalls) {
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "walls",
          owner: 1,
          from: MARKS["selecttower"]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.kill1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selecttower"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "walls"
        });
      }
    }
    if (!!UNITLAYERS.oppcatapults[MARKS["selectkill"]]) {
      {
        let unitid = (UNITLAYERS.units[MARKS["selectkill"]] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "towers"
          });
        }
      }
    } else {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]] || {}).id];
      }
    }

    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "kill";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "kill",
      path: step.path.concat("kill")
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.sacrifice1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectkill"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "walls"
        });
      }
    }
    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]] || {}).id];
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "sacrifice";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "sacrifice",
      path: step.path.concat("sacrifice")
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.fire1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.oppwalls[MARKS["selectfire"]]) {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectfire"]] || {}).id];
      }
    } else {
      if (!!UNITLAYERS.oppunits[MARKS["selectfire"]]) {
        {
          let unitid = (UNITLAYERS.units[MARKS["selectfire"]] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              group: !!UNITLAYERS.oppcatapults[MARKS["selectfire"]]
                ? "towers"
                : "walls"
            });
          }
        }
      } else {
        {
          let newunitid = "spawn" + clones++;
          UNITDATA[newunitid] = {
            pos: MARKS["selectfire"],
            id: newunitid,
            group: "walls",
            owner: 1,
            from: MARKS["selectcatapult"]
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectcatapult"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "towers"
        });
      }
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "fire";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "fire",
      path: step.path.concat("fire"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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
      clones: step.clones,
      path: []
    });

    {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.mytowers) {
        newlinks[linkpos] = "selecttower1";
      }
    }
    {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.mycatapults) {
        newlinks[linkpos] = "selectcatapult1";
      }
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a" },
        [
          {
            cond: Object.keys(UNITLAYERS.mytowers).length !== 0,
            content: {
              type: "unittyperef",
              alias: "rook",
              name: "rook".replace(/s$/, "")
            }
          },
          {
            cond: Object.keys(UNITLAYERS.mycatapults).length !== 0,
            content: {
              type: "unittyperef",
              alias: "queen",
              name: "queen".replace(/s$/, "")
            }
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
          ),
        { type: "text", text: "to act with" }
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

  game.selecttower2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selecttower: markpos };
    {
      let BLOCKS = (function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.oppunits,
          s1 = UNITLAYERS.mycatapults;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })();

      let STARTPOS = MARKS["selecttower"];

      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let MAX = 2;

        let POS = STARTPOS;

        let LENGTH = 0;

        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          walkedsquares.push(POS);

          LENGTH++;
        }
        var WALKLENGTH = walkedsquares.length;

        var STEP = 0;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          STEP++;

          if (WALKLENGTH === 2 && STEP === 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["movetargets"]: {
                ...ARTIFACTS["movetargets"],
                [POS]: { dir: DIR }
              }
            };
          }
        }
      }
    }
    {
      let STARTPOS = MARKS["selecttower"];

      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (
          POS &&
          (function() {
            let k,
              ret = {},
              s0 = UNITLAYERS.oppcatapults,
              s1 = UNITLAYERS.oppwalls;
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
            ["killtargets"]: {
              ...ARTIFACTS["killtargets"],
              [POS]: {}
            }
          };
        }
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selecttower"
    }));
    turn.links[newstepid] = {};
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = "selectmove2";
      }
    }
    {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.killtargets) {
        newlinks[linkpos] = "selectkill2";
      }
    }
    return newstep;
  };
  game.selecttower2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
            content: { type: "text", text: "a move target" }
          },
          {
            cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "an enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "to kill" }
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
          ),
        { type: "text", text: "for the" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        }
      ]
    });
  };

  game.selectmove2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectmove: markpos, selecttower: step.MARKS.selecttower };

    let STARTPOS = MARKS["selectmove"];

    let POS =
      connections[STARTPOS][
        relativedirs[
          (ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5
        ]
      ];
    if (POS) {
      ARTIFACTS = {
        ...ARTIFACTS,
        [!!UNITLAYERS.myunits[POS]
          ? !!UNITLAYERS.mytowers[POS]
            ? "madecatapults"
            : "madetowers"
          : "madewalls"]: {
          ...ARTIFACTS[
            !!UNITLAYERS.myunits[POS]
              ? !!UNITLAYERS.mytowers[POS]
                ? "madecatapults"
                : "madetowers"
              : "madewalls"
          ],
          [POS]: {}
        }
      };
    }

    ARTIFACTS = {
      ...ARTIFACTS,
      [!!UNITLAYERS.myunits[MARKS["selectmove"]]
        ? !!UNITLAYERS.mytowers[MARKS["selectmove"]]
          ? "madecatapults"
          : "madetowers"
        : "madewalls"]: {
        ...ARTIFACTS[
          !!UNITLAYERS.myunits[MARKS["selectmove"]]
            ? !!UNITLAYERS.mytowers[MARKS["selectmove"]]
              ? "madecatapults"
              : "madetowers"
            : "madewalls"
        ],
        [STARTPOS]: {}
      }
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectmove"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].move = "move2";

    return newstep;
  };
  game.selectmove2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "move" },
        { type: "text", text: "to overturn your" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        },
        { type: "text", text: "towards" },
        { type: "posref", pos: MARKS["selectmove"] }
      ]
    });
  };

  game.selectkill2 = function(turn, step, markpos) {
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectkill: markpos, selecttower: step.MARKS.selecttower };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectkill"
    }));
    turn.links[newstepid] = {};
    {
      turn.links[newstepid].kill = "kill2";
    }
    if (!!UNITLAYERS.oppcatapults[MARKS["selectkill"]]) {
      {
        turn.links[newstepid].sacrifice = "sacrifice2";
      }
    }

    return newstep;
  };
  game.selectkill2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "kill" },
        { type: "text", text: "to make a section of the" },
        { type: "posref", pos: MARKS["selecttower"] },
        {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, "")
        },
        !!UNITLAYERS.walls[MARKS["selectkill"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "crush the enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectkill"] }
              ]
            })
          : collapseLine({
              type: "line",
              content: [
                { type: "text", text: "reduce the enemy" },
                {
                  type: "unittyperef",
                  alias: "queen",
                  name: "queen".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectkill"] },
                { type: "text", text: "to a" },
                {
                  type: "unittyperef",
                  alias: "rook",
                  name: "rook".replace(/s$/, "")
                },
                { type: "text", text: ", or" },
                { type: "cmndref", cmnd: "sacrifice" },
                { type: "text", text: "your" },
                {
                  type: "unittyperef",
                  alias: "rook",
                  name: "rook".replace(/s$/, "")
                },
                { type: "text", text: "entirely to turn the" },
                {
                  type: "unittyperef",
                  alias: "queen",
                  name: "queen".replace(/s$/, "")
                },
                { type: "text", text: "to a" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "!" }
              ]
            })
      ]
    });
  };

  game.selectcatapult2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectcatapult: markpos };

    let STARTPOS = MARKS["selectcatapult"];

    let allwalkerdirs = [3, 4, 5, 6, 7];

    for (let walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
      let MAX = 3;

      let POS = STARTPOS;

      let LENGTH = 0;
      let STEP = 0;
      while (
        LENGTH < MAX &&
        (POS = connections[POS][allwalkerdirs[walkerdirnbr]])
      ) {
        LENGTH++;

        STEP++;

        if (STEP > 1 && !UNITLAYERS.myunits[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["firetargets"]: {
              ...ARTIFACTS["firetargets"],
              [POS]: {}
            }
          };
        }
      }
    }

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectcatapult"
    }));
    turn.links[newstepid] = {};

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.firetargets) {
      newlinks[linkpos] = "selectfire2";
    }

    return newstep;
  };
  game.selectcatapult2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select where to fire the top section of your" },
        { type: "posref", pos: MARKS["selectcatapult"] },
        {
          type: "unittyperef",
          alias: "queen",
          name: "queen".replace(/s$/, "")
        }
      ]
    });
  };

  game.selectfire2 = function(turn, step, markpos) {
    let MARKS = {
      selectfire: markpos,
      selectcatapult: step.MARKS.selectcatapult
    };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectfire"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].fire = "fire2";

    return newstep;
  };
  game.selectfire2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "fire" },
        { type: "text", text: "to shoot a section of the" },
        { type: "posref", pos: MARKS["selectcatapult"] },
        {
          type: "unittyperef",
          alias: "queen",
          name: "queen".replace(/s$/, "")
        },
        !!UNITLAYERS.walls[MARKS["selectfire"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: "and destroy the enemy" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] }
              ]
            })
          : !!UNITLAYERS.units[MARKS["selectfire"]]
          ? collapseLine({
              type: "line",
              content: [
                { type: "text", text: ", reducing the enemy" },
                {
                  type: "unittyperef",
                  name:
                    game.graphics.icons[
                      (UNITLAYERS.units[MARKS["selectfire"]] || {})["group"]
                    ]
                },
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] },
                { type: "text", text: "to a" },
                !!UNITLAYERS.catapults[MARKS["selectfire"]]
                  ? {
                      type: "unittyperef",
                      alias: "rook",
                      name: "rook".replace(/s$/, "")
                    }
                  : {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, "")
                    }
              ]
            })
          : collapseLine({
              type: "line",
              content: [
                { type: "text", text: "at" },
                { type: "posref", pos: MARKS["selectfire"] },
                { type: "text", text: ", gaining a" },
                {
                  type: "unittyperef",
                  alias: "pawn",
                  name: "pawn".replace(/s$/, "")
                },
                { type: "text", text: "there" }
              ]
            })
      ]
    });
  };

  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]] || {}).id];
    }
    {
      for (let POS in ARTIFACTS.madecatapults) {
        let unitid = (UNITLAYERS.units[POS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "catapults"
          });
        }
      }
    }
    {
      for (let POS in ARTIFACTS.madetowers) {
        let unitid = (UNITLAYERS.units[POS] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "towers"
          });
        }
      }
    }
    {
      for (let POS in ARTIFACTS.madewalls) {
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "walls",
          owner: 2,
          from: MARKS["selecttower"]
        };
      }
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "move",
      path: step.path.concat("move"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.kill2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selecttower"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "walls"
        });
      }
    }
    if (!!UNITLAYERS.oppcatapults[MARKS["selectkill"]]) {
      {
        let unitid = (UNITLAYERS.units[MARKS["selectkill"]] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            group: "towers"
          });
        }
      }
    } else {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]] || {}).id];
      }
    }

    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "kill";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "kill",
      path: step.path.concat("kill")
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.sacrifice2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    {
      let unitid = (UNITLAYERS.units[MARKS["selectkill"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "walls"
        });
      }
    }
    {
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]] || {}).id];
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "sacrifice";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "sacrifice",
      path: step.path.concat("sacrifice")
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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

  game.fire2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    if (!!UNITLAYERS.oppwalls[MARKS["selectfire"]]) {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selectfire"]] || {}).id];
      }
    } else {
      if (!!UNITLAYERS.oppunits[MARKS["selectfire"]]) {
        {
          let unitid = (UNITLAYERS.units[MARKS["selectfire"]] || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              group: !!UNITLAYERS.oppcatapults[MARKS["selectfire"]]
                ? "towers"
                : "walls"
            });
          }
        }
      } else {
        {
          let newunitid = "spawn" + clones++;
          UNITDATA[newunitid] = {
            pos: MARKS["selectfire"],
            id: newunitid,
            group: "walls",
            owner: 2,
            from: MARKS["selectcatapult"]
          };
        }
      }
    }
    {
      let unitid = (UNITLAYERS.units[MARKS["selectcatapult"]] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          group: "towers"
        });
      }
    }
    MARKS = {};

    UNITLAYERS = {
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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

    let newstepid = step.stepid + "-" + "fire";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "fire",
      path: step.path.concat("fire"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (
      Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myunits,
            s1 = TERRAIN.opphomerow;
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
          s1 = TERRAIN.opphomerow;
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
      towers: {},
      mytowers: {},
      opptowers: {},
      neutraltowers: {},
      catapults: {},
      mycatapults: {},
      oppcatapults: {},
      neutralcatapults: {},
      walls: {},
      mywalls: {},
      oppwalls: {},
      neutralwalls: {},
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
      clones: step.clones,
      path: []
    });

    {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.mytowers) {
        newlinks[linkpos] = "selecttower2";
      }
    }
    {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.mycatapults) {
        newlinks[linkpos] = "selectcatapult2";
      }
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select a" },
        [
          {
            cond: Object.keys(UNITLAYERS.mytowers).length !== 0,
            content: {
              type: "unittyperef",
              alias: "rook",
              name: "rook".replace(/s$/, "")
            }
          },
          {
            cond: Object.keys(UNITLAYERS.mycatapults).length !== 0,
            content: {
              type: "unittyperef",
              alias: "queen",
              name: "queen".replace(/s$/, "")
            }
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
          ),
        { type: "text", text: "to act with" }
      ]
    });
  };

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
