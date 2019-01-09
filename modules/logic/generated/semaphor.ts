import fullDef from "../../games/dist/games/semaphor";
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
const emptyArtifactLayer = { line: {} };
game.commands = { deploy: 1, promote: 1 };
game.graphics = {
  icons: { kings: "king", pawns: "pawn", bishops: "bishop" },
  tiles: {}
};
game.board = { width: 4, height: 3, terrain: {} };
game.AI = [];
game.id = "semaphor";
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

  game.selectdeploytarget1 = function(turn, step, markpos) {
    let MARKS = { selectdeploytarget: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeploytarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].deploy = "deploy1";

    return newstep;
  };
  game.selectdeploytarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "deploy" },
        { type: "text", text: "to place a pawn at" },
        { type: "posref", pos: MARKS["selectdeploytarget"] }
      ]
    });
  };

  game.selectunit1 = function(turn, step, markpos) {
    let MARKS = { selectunit: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].promote = "promote1";

    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "promote" },
        { type: "text", text: "to turn the" },
        !!UNITLAYERS.pawns[MARKS["selectunit"]]
          ? { type: "text", text: "pawn into a bishop" }
          : { type: "text", text: "bishop into a king" }
      ]
    });
  };

  game.deploy1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    let newunitid = "spawn" + clones++;
    UNITDATA[newunitid] = {
      pos: MARKS["selectdeploytarget"],
      id: newunitid,
      group: "pawns",
      owner: 0
    };

    MARKS = {};

    UNITLAYERS = {
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.units;
    for (let STARTPOS in walkstarts) {
      let allowedsteps =
        UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];

      let allwalkerdirs = [1, 2, 3, 4];

      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["line"]: {
                ...ARTIFACTS["line"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "deploy";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "deploy",
      path: step.path.concat("deploy"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.line;
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.promote1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        group: !!UNITLAYERS.pawns[MARKS["selectunit"]] ? "bishops" : "kings"
      });
    }

    MARKS = {};

    UNITLAYERS = {
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.units;
    for (let STARTPOS in walkstarts) {
      let allowedsteps =
        UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];

      let allwalkerdirs = [1, 2, 3, 4];

      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["line"]: {
                ...ARTIFACTS["line"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "promote";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "promote",
      path: step.path.concat("promote")
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.line;
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
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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
        newlinks[linkpos] = "selectdeploytarget1";
      }
    }
    {
      let newlinks = turn.links.root;
      for (let linkpos in (function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.pawns,
          s1 = UNITLAYERS.bishops;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectunit1";
      }
    }

    return turn;
  };
  game.start1instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(UNITLAYERS.units).length !== 12,
            content: { type: "text", text: "an empty square to deploy to" }
          },
          {
            cond:
              Object.keys(
                (function() {
                  let k,
                    ret = {},
                    s0 = UNITLAYERS.bishops,
                    s1 = UNITLAYERS.pawns;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                })()
              ).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "a" },
                [
                  {
                    cond: Object.keys(UNITLAYERS.pawns).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, "")
                    }
                  },
                  {
                    cond: Object.keys(UNITLAYERS.bishops).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "bishop",
                      name: "bishop".replace(/s$/, "")
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
                { type: "text", text: "to promote" }
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

  game.debug1 = function() {
    return { TERRAIN: TERRAIN };
  };
}

{
  // Actions for player 2

  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;

  game.selectdeploytarget2 = function(turn, step, markpos) {
    let MARKS = { selectdeploytarget: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectdeploytarget"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].deploy = "deploy2";

    return newstep;
  };
  game.selectdeploytarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "deploy" },
        { type: "text", text: "to place a pawn at" },
        { type: "posref", pos: MARKS["selectdeploytarget"] }
      ]
    });
  };

  game.selectunit2 = function(turn, step, markpos) {
    let MARKS = { selectunit: markpos };

    let newstepid = step.stepid + "-" + markpos;
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: "selectunit"
    }));
    turn.links[newstepid] = {};

    turn.links[newstepid].promote = "promote2";

    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Press" },
        { type: "cmndref", cmnd: "promote" },
        { type: "text", text: "to turn the" },
        !!UNITLAYERS.pawns[MARKS["selectunit"]]
          ? { type: "text", text: "pawn into a bishop" }
          : { type: "text", text: "bishop into a king" }
      ]
    });
  };

  game.deploy2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;

    let newunitid = "spawn" + clones++;
    UNITDATA[newunitid] = {
      pos: MARKS["selectdeploytarget"],
      id: newunitid,
      group: "pawns",
      owner: 0
    };

    MARKS = {};

    UNITLAYERS = {
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.units;
    for (let STARTPOS in walkstarts) {
      let allowedsteps =
        UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];

      let allwalkerdirs = [1, 2, 3, 4];

      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["line"]: {
                ...ARTIFACTS["line"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "deploy";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "deploy",
      path: step.path.concat("deploy"),
      clones: clones
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.line;
    } else turn.links[newstepid].endturn = "start" + otherplayer;

    return newstep;
  };

  game.promote2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);

    let UNITLAYERS = step.UNITLAYERS;

    let unitid = (UNITLAYERS.units[MARKS["selectunit"]] || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        group: !!UNITLAYERS.pawns[MARKS["selectunit"]] ? "bishops" : "kings"
      });
    }

    MARKS = {};

    UNITLAYERS = {
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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

    let walkstarts = UNITLAYERS.units;
    for (let STARTPOS in walkstarts) {
      let allowedsteps =
        UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})["group"]];

      let allwalkerdirs = [1, 2, 3, 4];

      for (let walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];

        let walkedsquares = [];

        let POS = "faux";
        connections.faux[DIR] = STARTPOS;

        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
        }
        var WALKLENGTH = walkedsquares.length;

        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];

          if (WALKLENGTH > 2) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["line"]: {
                ...ARTIFACTS["line"],
                [POS]: {}
              }
            };
          }
        }
      }
    }

    let newstepid = step.stepid + "-" + "promote";
    let newstep = (turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: "promote",
      path: step.path.concat("promote")
    }));
    turn.links[newstepid] = {};

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? "win" : winner ? "lose" : "draw";
      turn.links[newstepid][result] = "madeline";

      turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.line;
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
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
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
        newlinks[linkpos] = "selectdeploytarget2";
      }
    }
    {
      let newlinks = turn.links.root;
      for (let linkpos in (function() {
        let k,
          ret = {},
          s0 = UNITLAYERS.pawns,
          s1 = UNITLAYERS.bishops;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      })()) {
        newlinks[linkpos] = "selectunit2";
      }
    }

    return turn;
  };
  game.start2instruction = function(turn, step) {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseLine({
      type: "line",
      content: [
        { type: "text", text: "Select" },
        [
          {
            cond: Object.keys(UNITLAYERS.units).length !== 12,
            content: { type: "text", text: "an empty square to deploy to" }
          },
          {
            cond:
              Object.keys(
                (function() {
                  let k,
                    ret = {},
                    s0 = UNITLAYERS.bishops,
                    s1 = UNITLAYERS.pawns;
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                })()
              ).length !== 0,
            content: collapseLine({
              type: "line",
              content: [
                { type: "text", text: "a" },
                [
                  {
                    cond: Object.keys(UNITLAYERS.pawns).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "pawn",
                      name: "pawn".replace(/s$/, "")
                    }
                  },
                  {
                    cond: Object.keys(UNITLAYERS.bishops).length !== 0,
                    content: {
                      type: "unittyperef",
                      alias: "bishop",
                      name: "bishop".replace(/s$/, "")
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
                { type: "text", text: "to promote" }
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

  game.debug2 = function() {
    return { TERRAIN: TERRAIN };
  };
}

export default game;
