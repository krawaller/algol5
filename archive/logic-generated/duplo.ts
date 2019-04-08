import fullDef from "../../games/dist/games/duplo";
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
  spawndirs: {},
  growstarts: {},
  targets: {},
  potentialopptargets: {},
  spawns: {}
};
game.commands = { deploy: 1, expand: 1 };
game.graphics = { icons: { soldiers: "pawn" }, tiles: {} };
game.board = { height: 8, width: 8, terrain: {} };
game.AI = [];
game.id = "duplo";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
let TERRAIN = terrainLayers(fullDef.board, 0);
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

  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;

  game.selectdeploy1 = function(turn, step, markpos) {
    let MARKS = Object.assign({}, step.MARKS, { selectdeploy: markpos });

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeploy"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].deploy = "deploy1";

    return newstep;
  };
  game.selectdeploy1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "deploy" },
            { type: "text", text: "to place your second unit at" },
            { type: "posref", pos: MARKS["selectdeploy"] }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "deploy" },
            { type: "text", text: "to place your first unit at" },
            { type: "posref", pos: MARKS["selectdeploy"] }
          ]
        });
  };

  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };
    {
      let STARTPOS = MARKS["selectunit"];

      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let DIR = neighbourdirs[dirnbr];

        let POS = startconnections[DIR];
        if (POS) {
          if (!UNITLAYERS.myunits[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["spawndirs"]: {
                ...ARTIFACTS["spawndirs"],
                [POS]: { dir: DIR }
              }
            };
          }
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;

      let walkstarts = ARTIFACTS.spawndirs;
      for (let STARTPOS in walkstarts) {
        let DIR =
          relativedirs[5 - 2 + (ARTIFACTS.spawndirs[STARTPOS] || {})["dir"]];

        let walkedsquares = [];

        let POS = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        ARTIFACTS = {
          ...ARTIFACTS,
          ["growstarts"]: {
            ...ARTIFACTS["growstarts"],
            [STARTPOS]: { dir: relativedirs[5 - 2 + DIR], strength: WALKLENGTH }
          }
        };
      }
    }
    {
      let allowedsteps = (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
      let BLOCKS = UNITLAYERS.oppunits;

      let walkstarts = ARTIFACTS.growstarts;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.growstarts[STARTPOS] || {})["dir"];

        let STOPREASON = "";
        let MAX = (ARTIFACTS.growstarts[STARTPOS] || {})["strength"];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        let LENGTH = 0;
        let STEP = 0;
        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;

          STEP++;

          if (STEP === MAX) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["targets"]: {
                ...ARTIFACTS["targets"],
                [POS]: { dir: relativedirs[5 - 2 + DIR] }
              }
            };
          }
        }

        if (BLOCKS[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["potentialopptargets"]: {
              ...ARTIFACTS["potentialopptargets"],
              [POS]: { dir: DIR, strength: MAX }
            }
          };
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.oppunits;

      let walkstarts = ARTIFACTS.potentialopptargets;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["dir"];

        let STOPREASON = "";
        let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["strength"];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        let LENGTH = 0;

        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;
        }

        if (STOPREASON !== "reachedmax") {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["targets"]: {
              ...ARTIFACTS["targets"],
              [STARTPOS]: { dir: relativedirs[5 - 2 + DIR] }
            }
          };
        }
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

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = "selecttarget1";
    }

    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    return { type: "text", text: "Now select which square to expand to" };
  };

  game.selecttarget1 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selecttarget: markpos, selectunit: step.MARKS.selectunit };
    {
      let BLOCKS = UNITLAYERS.units;

      let STARTPOS = MARKS["selecttarget"];

      let POS = STARTPOS;

      while (
        (POS =
          connections[POS][
            (ARTIFACTS.targets[MARKS["selecttarget"]] || {})["dir"]
          ]) &&
        !BLOCKS[POS]
      ) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["spawns"]: {
            ...ARTIFACTS["spawns"],
            [POS]: {}
          }
        };
      }

      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["spawns"]: {
            ...ARTIFACTS["spawns"],
            [STARTPOS]: {}
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
      name: "selecttarget"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].expand = "expand1";

    return newstep;
  };
  game.selecttarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "expand" },
        { type: "text", text: "to expand to from " },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selecttarget"] },
        !!UNITLAYERS.units[MARKS["selecttarget"]]
          ? { type: "text", text: "and neutralise the enemy there" }
          : { type: "nothing" }
      ]
    });
  };

  game.deploy1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    let newunitid = "spawn" + clones++;
    UNITDATA[newunitid] = {
      pos: MARKS["selectdeploy"],
      id: newunitid,
      group: "soldiers",
      owner: player
    };

    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    let newstepid = step.stepid + "-" + "deploy";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "deploy",
      path: step.path.concat("deploy"),
      clones: clones
    });
    turn.links[newstepid] = {};

    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        let winner =
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 1
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 2
            : 0;
        let result = winner === 1 ? "win" : winner ? "lose" : "draw";
        turn.links[newstepid][result] = "boardfull";
      } else turn.links[newstepid].endturn = "start" + otherplayer;
    } else {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeploy1";
      }
    }

    return newstep;
  };

  game.deploy1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? {
          type: "text",
          text: "Now select where to deploy your second and last initial unit"
        }
      : { type: "nothing" };
  };

  game.expand1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    {
      for (let POS in ARTIFACTS.spawns) {
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "soldiers",
          owner: 1,
          from: MARKS["selectunit"]
        };
      }
    }
    if (!!UNITLAYERS.units[MARKS["selecttarget"]]) {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttarget"]] || {}).id];
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: MARKS["selecttarget"],
          id: newunitid,
          group: "soldiers",
          owner: 0,
          from: MARKS["selectunit"]
        };
      }
    }

    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    let newstepid = step.stepid + "-" + "expand";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "expand",
      path: step.path.concat("expand"),
      clones: clones
    });
    turn.links[newstepid] = {};

    if (Object.keys(UNITLAYERS.units).length === 64) {
      let winner =
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 1
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 2
          : 0;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "boardfull";
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    if (turn.turn > 2) {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.myunits) {
        newlinks[linkpos] = "selectunit1";
      }
    } else {
      let newlinks = turn.links.root;
      for (let linkpos in (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeploy1";
      }
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    return turn.turn > 2
      ? { type: "text", text: "Select unit to expand from" }
      : {
          type: "text",
          text: "Select where to deploy the first of your two initial units"
        };
  };

  game.debug1 = function() {
    return { TERRAIN: TERRAIN };
  };
}

{
  // Actions for player 2

  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;

  game.selectdeploy2 = function(turn, step, markpos) {
    let MARKS = Object.assign({}, step.MARKS, { selectdeploy: markpos });

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = {
      ...step,

      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeploy"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].deploy = "deploy2";

    return newstep;
  };
  game.selectdeploy2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "deploy" },
            { type: "text", text: "to place your second unit at" },
            { type: "posref", pos: MARKS["selectdeploy"] }
          ]
        })
      : collapseLine({
          type: "line",
          content: [
            { type: "text", text: "Press" },
            { type: "cmndref", cmnd: "deploy" },
            { type: "text", text: "to place your first unit at" },
            { type: "posref", pos: MARKS["selectdeploy"] }
          ]
        });
  };

  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selectunit: markpos };
    {
      let STARTPOS = MARKS["selectunit"];

      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];

      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let DIR = neighbourdirs[dirnbr];

        let POS = startconnections[DIR];
        if (POS) {
          if (!UNITLAYERS.myunits[POS]) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["spawndirs"]: {
                ...ARTIFACTS["spawndirs"],
                [POS]: { dir: DIR }
              }
            };
          }
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.myunits;

      let walkstarts = ARTIFACTS.spawndirs;
      for (let STARTPOS in walkstarts) {
        let DIR =
          relativedirs[5 - 2 + (ARTIFACTS.spawndirs[STARTPOS] || {})["dir"]];

        let walkedsquares = [];

        let POS = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        ARTIFACTS = {
          ...ARTIFACTS,
          ["growstarts"]: {
            ...ARTIFACTS["growstarts"],
            [STARTPOS]: { dir: relativedirs[5 - 2 + DIR], strength: WALKLENGTH }
          }
        };
      }
    }
    {
      let allowedsteps = (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })();
      let BLOCKS = UNITLAYERS.oppunits;

      let walkstarts = ARTIFACTS.growstarts;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.growstarts[STARTPOS] || {})["dir"];

        let STOPREASON = "";
        let MAX = (ARTIFACTS.growstarts[STARTPOS] || {})["strength"];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        let LENGTH = 0;
        let STEP = 0;
        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : BLOCKS[POS]
              ? "hitblock"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;

          STEP++;

          if (STEP === MAX) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["targets"]: {
                ...ARTIFACTS["targets"],
                [POS]: { dir: relativedirs[5 - 2 + DIR] }
              }
            };
          }
        }

        if (BLOCKS[POS]) {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["potentialopptargets"]: {
              ...ARTIFACTS["potentialopptargets"],
              [POS]: { dir: DIR, strength: MAX }
            }
          };
        }
      }
    }
    {
      let allowedsteps = UNITLAYERS.oppunits;

      let walkstarts = ARTIFACTS.potentialopptargets;
      for (let STARTPOS in walkstarts) {
        let DIR = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["dir"];

        let STOPREASON = "";
        let MAX = (ARTIFACTS.potentialopptargets[STARTPOS] || {})["strength"];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        let LENGTH = 0;

        while (
          !(STOPREASON =
            LENGTH === MAX
              ? "reachedmax"
              : !(POS = connections[POS][DIR])
              ? "outofbounds"
              : !allowedsteps[POS]
              ? "nomoresteps"
              : null)
        ) {
          LENGTH++;
        }

        if (STOPREASON !== "reachedmax") {
          ARTIFACTS = {
            ...ARTIFACTS,
            ["targets"]: {
              ...ARTIFACTS["targets"],
              [STARTPOS]: { dir: relativedirs[5 - 2 + DIR] }
            }
          };
        }
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

    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.targets) {
      newlinks[linkpos] = "selecttarget2";
    }

    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    return { type: "text", text: "Now select which square to expand to" };
  };

  game.selecttarget2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;

    let MARKS = { selecttarget: markpos, selectunit: step.MARKS.selectunit };
    {
      let BLOCKS = UNITLAYERS.units;

      let STARTPOS = MARKS["selecttarget"];

      let POS = STARTPOS;

      while (
        (POS =
          connections[POS][
            (ARTIFACTS.targets[MARKS["selecttarget"]] || {})["dir"]
          ]) &&
        !BLOCKS[POS]
      ) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["spawns"]: {
            ...ARTIFACTS["spawns"],
            [POS]: {}
          }
        };
      }

      if (!UNITLAYERS.units[STARTPOS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["spawns"]: {
            ...ARTIFACTS["spawns"],
            [STARTPOS]: {}
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
      name: "selecttarget"
    });
    turn.links[newstepid] = {};

    turn.links[newstepid].expand = "expand2";

    return newstep;
  };
  game.selecttarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "expand" },
        { type: "text", text: "to expand to from " },
        { type: "posref", pos: MARKS["selectunit"] },
        { type: "text", text: "to" },
        { type: "posref", pos: MARKS["selecttarget"] },
        !!UNITLAYERS.units[MARKS["selecttarget"]]
          ? { type: "text", text: "and neutralise the enemy there" }
          : { type: "nothing" }
      ]
    });
  };

  game.deploy2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    let newunitid = "spawn" + clones++;
    UNITDATA[newunitid] = {
      pos: MARKS["selectdeploy"],
      id: newunitid,
      group: "soldiers",
      owner: player
    };

    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    let newstepid = step.stepid + "-" + "deploy";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "deploy",
      path: step.path.concat("deploy"),
      clones: clones
    });
    turn.links[newstepid] = {};

    if (Object.keys(UNITLAYERS.mysoldiers).length > 1) {
      if (Object.keys(UNITLAYERS.units).length === 64) {
        let winner =
          Object.keys(UNITLAYERS.myunits).length >
          Object.keys(UNITLAYERS.oppunits).length
            ? 2
            : Object.keys(UNITLAYERS.oppunits).length ===
              Object.keys(UNITLAYERS.myunits).length
            ? 1
            : 0;
        let result = winner === 2 ? "win" : winner ? "lose" : "draw";
        turn.links[newstepid][result] = "boardfull";
      } else turn.links[newstepid].endturn = "start" + otherplayer;
    } else {
      let newlinks = turn.links[newstepid];
      for (let linkpos in (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeploy2";
      }
    }

    return newstep;
  };

  game.deploy2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return Object.keys(UNITLAYERS.myunits).length === 1
      ? {
          type: "text",
          text: "Now select where to deploy your second and last initial unit"
        }
      : { type: "nothing" };
  };

  game.expand2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = { ...step.UNITDATA };
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    {
      for (let POS in ARTIFACTS.spawns) {
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "soldiers",
          owner: 2,
          from: MARKS["selectunit"]
        };
      }
    }
    if (!!UNITLAYERS.units[MARKS["selecttarget"]]) {
      {
        delete UNITDATA[(UNITLAYERS.units[MARKS["selecttarget"]] || {}).id];
        let newunitid = "spawn" + clones++;
        UNITDATA[newunitid] = {
          pos: MARKS["selecttarget"],
          id: newunitid,
          group: "soldiers",
          owner: 0,
          from: MARKS["selectunit"]
        };
      }
    }

    MARKS = {};

    UNITLAYERS = {
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    let newstepid = step.stepid + "-" + "expand";
    let newstep = (turn.steps[newstepid] = {
      ...step,
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "expand",
      path: step.path.concat("expand"),
      clones: clones
    });
    turn.links[newstepid] = {};

    if (Object.keys(UNITLAYERS.units).length === 64) {
      let winner =
        Object.keys(UNITLAYERS.myunits).length >
        Object.keys(UNITLAYERS.oppunits).length
          ? 2
          : Object.keys(UNITLAYERS.oppunits).length ===
            Object.keys(UNITLAYERS.myunits).length
          ? 1
          : 0;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "boardfull";
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
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {},
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

    if (turn.turn > 2) {
      let newlinks = turn.links.root;
      for (let linkpos in UNITLAYERS.myunits) {
        newlinks[linkpos] = "selectunit2";
      }
    } else {
      let newlinks = turn.links.root;
      for (let linkpos in (function() {
        let ret = {},
          s0 = BOARD.board,
          s1 = UNITLAYERS.units;
        for (let key in s0) {
          if (!s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectdeploy2";
      }
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    return turn.turn > 2
      ? { type: "text", text: "Select unit to expand from" }
      : {
          type: "text",
          text: "Select where to deploy the first of your two initial units"
        };
  };

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
