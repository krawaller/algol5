import fullDef from '../../games/dist/games/serauqs';
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
} from '../../common';
let game: any = {};
const emptyArtifactLayer = {
  "movetargets": {},
  "winline": {}
};
game.commands = {
  "promote": 1,
  "move": 1
};
game.graphics = {
  "icons": {
    "soldiers": "pawn",
    "wild": "king"
  },
  "tiles": {
    "corners": "grass",
    "middle": "castle"
  }
};
game.board = {
  "height": 4,
  "width": 4,
  "terrain": {
    "base": {
      "1": [
        ["rect", "a1", "d1"]
      ],
      "2": [
        ["rect", "a4", "d4"]
      ]
    },
    "corners": ["a1", "a4", "d1", "d4"],
    "middle": [
      ["rect", "b2", "c3"]
    ]
  }
};
game.AI = [];
game.id = "serauqs";
let connections = boardConnections(fullDef.board);
let BOARD = boardLayers(fullDef.board);
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
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
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [POS]: {}
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectunit'
    });
    turn.links[newstepid] = {};
    if ((3 > turn.turn)) {
      turn.links[newstepid].promote = 'promote1';
    } else {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmovetarget1';
      }
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }, {
        type: 'text',
        text: "the"
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, !!(UNITLAYERS.wild[MARKS["selectunit"]]) ? {
        type: 'text',
        text: "(remeber that it matches for your opponent too!)"
      } : {
        type: 'nothing'
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "promote"
      }, {
        type: 'text',
        text: "to turn this"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to a"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: ", making it match for your opponent too"
      }]
    }));
  };
  game.selectmovetarget1 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmovetarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].move = 'move1';
    return newstep;
  };
  game.selectmovetarget1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }, {
        type: 'text',
        text: "to go from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }]
    });
  };
  game.promote1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "group": "wild"
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstepid = step.stepid + '-' + 'promote';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'promote',
      path: step.path.concat('promote')
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.corners,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madex';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madex = TERRAIN.corners;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.middle,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'tookcenter';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].tookcenter = TERRAIN.middle;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move1 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let allowedsteps =
      (function() {
        let k, ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = UNITLAYERS.oppwild;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      }());
    let walkstarts =
      (function() {
        let k, ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = UNITLAYERS.oppwild;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      }());
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let walkpositionstocount = TERRAIN.mybase;
        let CURRENTCOUNT = 0;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
        }
        var WALKLENGTH = walkedsquares.length;
        var TOTALCOUNT = CURRENTCOUNT;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          if (((WALKLENGTH === 4) && (TOTALCOUNT !== 4))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            }
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move')
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.corners,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madex';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madex = TERRAIN.corners;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.middle,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'tookcenter';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].tookcenter = TERRAIN.middle;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.start1 = function(lastTurn, step) {
    let turn: {
      [f: string]: any
    } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: {
        root: {}
      },
      endMarks: {}
    };
    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstep = turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: 'root',
      name: 'start',
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select which"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select which"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'cmndref',
        cmnd: "promote"
      }]
    }));
  };
  game.debug1 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
{
  // Actions for player 2
  let TERRAIN = terrainLayers(fullDef.board, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = step.ARTIFACTS;
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS = {
          ...ARTIFACTS,
          ["movetargets"]: {
            ...ARTIFACTS["movetargets"],
            [POS]: {}
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectunit'
    });
    turn.links[newstepid] = {};
    if ((3 > turn.turn)) {
      turn.links[newstepid].promote = 'promote2';
    } else {
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmovetarget2';
      }
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }, {
        type: 'text',
        text: "the"
      }, {
        type: "unittyperef",
        name: game.graphics.icons[(UNITLAYERS.units[MARKS["selectunit"]] || {})["group"]]
      }, !!(UNITLAYERS.wild[MARKS["selectunit"]]) ? {
        type: 'text',
        text: "(remeber that it matches for your opponent too!)"
      } : {
        type: 'nothing'
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "promote"
      }, {
        type: 'text',
        text: "to turn this"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to a"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: ", making it match for your opponent too"
      }]
    }));
  };
  game.selectmovetarget2 = function(turn, step, markpos) {
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmovetarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].move = 'move2';
    return newstep;
  };
  game.selectmovetarget2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }, {
        type: 'text',
        text: "to go from"
      }, {
        type: 'posref',
        pos: MARKS["selectunit"]
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'posref',
        pos: MARKS["selectmovetarget"]
      }]
    });
  };
  game.promote2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "group": "wild"
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstepid = step.stepid + '-' + 'promote';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'promote',
      path: step.path.concat('promote')
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.corners,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madex';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madex = TERRAIN.corners;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.middle,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'tookcenter';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].tookcenter = TERRAIN.middle;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move2 = function(turn, step) {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
    if (unitid) {
      UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
        "pos": MARKS["selectmovetarget"]
      });
    }
    MARKS = {};
    UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let allowedsteps =
      (function() {
        let k, ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = UNITLAYERS.oppwild;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      }());
    let walkstarts =
      (function() {
        let k, ret = {},
          s0 = UNITLAYERS.myunits,
          s1 = UNITLAYERS.oppwild;
        for (k in s0) {
          ret[k] = 1;
        }
        for (k in s1) {
          ret[k] = 1;
        }
        return ret;
      }());
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let walkedsquares = [];
        let POS = "faux";
        connections.faux[DIR] = STARTPOS;
        let walkpositionstocount = TERRAIN.mybase;
        let CURRENTCOUNT = 0;
        while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
          walkedsquares.push(POS);
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
        }
        var WALKLENGTH = walkedsquares.length;
        var TOTALCOUNT = CURRENTCOUNT;
        for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
          POS = walkedsquares[walkstepper];
          if (((WALKLENGTH === 4) && (TOTALCOUNT !== 4))) {
            ARTIFACTS = {
              ...ARTIFACTS,
              ["winline"]: {
                ...ARTIFACTS["winline"],
                [POS]: {}
              }
            }
          }
        }
      }
    }
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move')
    });
    turn.links[newstepid] = {};
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madeline';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madeline = ARTIFACTS.winline;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.corners,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'madex';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].madex = TERRAIN.corners;
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.middle,
            s1 =
            (function() {
              let k, ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = UNITLAYERS.oppwild;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length > 3)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'tookcenter';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].tookcenter = TERRAIN.middle;
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.start2 = function(lastTurn, step) {
    let turn: {
      [f: string]: any
    } = {
      steps: {},
      player: player,
      turn: lastTurn.turn + 1,
      links: {
        root: {}
      },
      endMarks: {}
    };
    let MARKS = {};
    let ARTIFACTS = emptyArtifactLayer;
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "soldiers": {},
      "mysoldiers": {},
      "oppsoldiers": {},
      "neutralsoldiers": {},
      "wild": {},
      "mywild": {},
      "oppwild": {},
      "neutralwild": {},
      "units": {},
      "myunits": {},
      "oppunits": {},
      "neutralunits": {}
    };
    for (let unitid in UNITDATA) {
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownernames[currentunit.owner]
      UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
    }
    let newstep = turn.steps.root = {
      ARTIFACTS: ARTIFACTS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      MARKS: MARKS,
      stepid: 'root',
      name: 'start',
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select which"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "or"
      }, {
        type: "unittyperef",
        alias: "king",
        name: "king".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'cmndref',
        cmnd: "move"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select which"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to"
      }, {
        type: 'cmndref',
        cmnd: "promote"
      }]
    }));
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
};
export default game;