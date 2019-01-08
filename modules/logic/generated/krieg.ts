import {
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
game.commands = {
  "move": 1
};
game.graphics = {
  "tiles": {
    "corners": "playercolour",
    "bases": "castle"
  },
  "icons": {
    "notfrozens": "knight",
    "frozens": "rook"
  }
};
game.board = {
  "width": 4,
  "height": 4,
  "terrain": {
    "southeast": ["a4", "c2"],
    "northwest": ["b3", "d1"],
    "corners": {
      "1": ["a4"],
      "2": ["d1"]
    },
    "bases": {
      "1": ["b4", "a3", "b3"],
      "2": ["c2", "d2", "c1"]
    }
  }
};
game.AI = ["Fred"];
game.id = "krieg";
let boardDef = {
  "width": 4,
  "height": 4,
  "terrain": {
    "southeast": ["a4", "c2"],
    "northwest": ["b3", "d1"],
    "corners": {
      "1": ["a4"],
      "2": ["d1"]
    },
    "bases": {
      "1": ["b4", "a3", "b3"],
      "2": ["c2", "d2", "c1"]
    }
  }
};
let connections = boardConnections(boardDef);
let BOARD = boardLayers(boardDef);
let relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
game.newGame = function() {
  let turnseed = {
    turn: 0
  };
  let stepseed = {
    UNITDATA: deduceInitialUnitData({
      "notfrozens": {
        "1": ["a4", "b4", "a3", "b3"],
        "2": ["c2", "c1", "d2", "d1"]
      }
    })
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
(function() {
  let TERRAIN = terrainLayers(boardDef, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.brain_Fred_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myfrozenguardedthreat = {};
    ARTIFACTS.myfrozenfreethreat = {};
    ARTIFACTS.mymoverguardedthreat = {};
    ARTIFACTS.mymoverfreethreat = {};
    ARTIFACTS.oppfrozenguardedthreat = {};
    ARTIFACTS.oppfrozenfreethreat = {};
    ARTIFACTS.oppmoverguardedthreat = {};
    ARTIFACTS.oppmoverfreethreat = {};
    { 
      for (let STARTPOS in UNITLAYERS.myunits) {
        let neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.oppbases,
                s1 = TERRAIN.oppcorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "myfrozenguardedthreat" : "myfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "mymoverguardedthreat" : "mymoverfreethreat"))][POS] = {};
          }
        }
      }
    }  { 
      for (let STARTPOS in UNITLAYERS.oppunits) {
        let neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.mybases,
                s1 = TERRAIN.mycorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "oppfrozenguardedthreat" : "oppfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "oppmoverguardedthreat" : "oppmoverfreethreat"))][POS] = {};
          }
        }
      }
    } 
    return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.myfrozens,
          s1 = TERRAIN.oppbases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length + 6 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.mynotfrozens,
          s1 = TERRAIN.oppbases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.oppfrozens,
          s1 = TERRAIN.mybases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length - 6 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.oppnotfrozens,
          s1 = TERRAIN.mybases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length;
  };
  game.brain_Fred_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myfrozenguardedthreat = {};
    ARTIFACTS.myfrozenfreethreat = {};
    ARTIFACTS.mymoverguardedthreat = {};
    ARTIFACTS.mymoverfreethreat = {};
    ARTIFACTS.oppfrozenguardedthreat = {};
    ARTIFACTS.oppfrozenfreethreat = {};
    ARTIFACTS.oppmoverguardedthreat = {};
    ARTIFACTS.oppmoverfreethreat = {};
    { 
      for (let STARTPOS in UNITLAYERS.myunits) {
        let neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.oppbases,
                s1 = TERRAIN.oppcorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "myfrozenguardedthreat" : "myfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "mymoverguardedthreat" : "mymoverfreethreat"))][POS] = {};
          }
        }
      }
    }  { 
      for (let STARTPOS in UNITLAYERS.oppunits) {
        let neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.mybases,
                s1 = TERRAIN.mycorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "oppfrozenguardedthreat" : "oppfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "oppmoverguardedthreat" : "oppmoverfreethreat"))][POS] = {};
          }
        }
      }
    } 
    return {
      myfrozenguardedthreat: Object.keys(ARTIFACTS.myfrozenguardedthreat).length,
      myfrozenfreethreat: 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length,
      mymoverguardedthreat: 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length,
      mymoverfreethreat: 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length,
      myfrozeninfiltrators: 5 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myfrozens,
            s1 = TERRAIN.oppbases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      myfreeinfiltrators: 6 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mynotfrozens,
            s1 = TERRAIN.oppbases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      oppfrozenguardedthreat: -Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,
      oppfrozenfreethreat: -2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length,
      oppmoverguardedthreat: -3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length,
      oppmoverfreethreat: -4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length,
      oppfrozeninfiltrators: -5 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.oppfrozens,
            s1 = TERRAIN.mybases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      oppfreeinfiltrators: -6 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.oppnotfrozens,
            s1 = TERRAIN.mybases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length
    };
  };
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
    let nbrofneighbourdirs = neighbourdirs.length;
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS["movetargets"][POS] = {};
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
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmove1';
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Select an empty square to move to"
    };
  };
  game.selectmove1 = function(turn, step, markpos) {
    let MARKS = {
      selectmove: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmove'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].move = 'move1';
    return newstep;
  };
  game.selectmove1instruction = function(turn, step) {
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
      }, ((!!(TERRAIN.oppbases[MARKS["selectmove"]]) && !(TERRAIN.oppbases[MARKS["selectunit"]])) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "into the opponent base at"
        }, {
          type: 'posref',
          pos: MARKS["selectmove"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmove"]
        }]
      }))]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let LOOPID;
      for (let POS in UNITLAYERS.myfrozens) {
        LOOPID = UNITLAYERS.myfrozens[POS].id
        UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
          "group": "notfrozens"
        });
        // TODO - check that it uses ['loopid'] ?
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "group": "frozens"
        });
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmove"]
        });
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "notfrozens": {},
      "mynotfrozens": {},
      "oppnotfrozens": {},
      "neutralnotfrozens": {},
      "frozens": {},
      "myfrozens": {},
      "oppfrozens": {},
      "neutralfrozens": {},
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
    ARTIFACTS = {
      "movetargets": {}
    };
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
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorners,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'cornerinfiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].cornerinfiltration =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorners,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppbases,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length === 2)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'occupation';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].occupation =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppbases,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move1instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
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
    let ARTIFACTS = {
      "movetargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "notfrozens": {},
      "mynotfrozens": {},
      "oppnotfrozens": {},
      "neutralnotfrozens": {},
      "frozens": {},
      "myfrozens": {},
      "oppfrozens": {},
      "neutralfrozens": {},
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
    for (let linkpos in UNITLAYERS.mynotfrozens) {
      newlinks[linkpos] = 'selectunit1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move that your didn't move last turn"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move"
      }]
    }));
  };
  game.debug1 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
})();
(function() {
  let TERRAIN = terrainLayers(boardDef, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.brain_Fred_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myfrozenguardedthreat = {};
    ARTIFACTS.myfrozenfreethreat = {};
    ARTIFACTS.mymoverguardedthreat = {};
    ARTIFACTS.mymoverfreethreat = {};
    ARTIFACTS.oppfrozenguardedthreat = {};
    ARTIFACTS.oppfrozenfreethreat = {};
    ARTIFACTS.oppmoverguardedthreat = {};
    ARTIFACTS.oppmoverfreethreat = {};
    { 
      for (let STARTPOS in UNITLAYERS.myunits) {
        let neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.oppbases,
                s1 = TERRAIN.oppcorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "myfrozenguardedthreat" : "myfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "mymoverguardedthreat" : "mymoverfreethreat"))][POS] = {};
          }
        }
      }
    }  { 
      for (let STARTPOS in UNITLAYERS.oppunits) {
        let neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.mybases,
                s1 = TERRAIN.mycorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "oppfrozenguardedthreat" : "oppfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "oppmoverguardedthreat" : "oppmoverfreethreat"))][POS] = {};
          }
        }
      }
    } 
    return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.myfrozens,
          s1 = TERRAIN.oppbases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length + 6 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.mynotfrozens,
          s1 = TERRAIN.oppbases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.oppfrozens,
          s1 = TERRAIN.mybases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length - 6 * Object.keys(
      (function() {
        let ret = {},
          s0 = UNITLAYERS.oppnotfrozens,
          s1 = TERRAIN.mybases;
        for (let key in s0) {
          if (s1[key]) {
            ret[key] = s0[key];
          }
        }
        return ret;
      }())).length;
  };
  game.brain_Fred_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.myfrozenguardedthreat = {};
    ARTIFACTS.myfrozenfreethreat = {};
    ARTIFACTS.mymoverguardedthreat = {};
    ARTIFACTS.mymoverfreethreat = {};
    ARTIFACTS.oppfrozenguardedthreat = {};
    ARTIFACTS.oppfrozenfreethreat = {};
    ARTIFACTS.oppmoverguardedthreat = {};
    ARTIFACTS.oppmoverfreethreat = {};
    { 
      for (let STARTPOS in UNITLAYERS.myunits) {
        let neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.oppbases,
                s1 = TERRAIN.oppcorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "myfrozenguardedthreat" : "myfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "mymoverguardedthreat" : "mymoverfreethreat"))][POS] = {};
          }
        }
      }
    }  { 
      for (let STARTPOS in UNITLAYERS.oppunits) {
        let neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
        let nbrofneighbourdirs = neighbourdirs.length;
        let startconnections = connections[STARTPOS];
        for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          let POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              let k, ret = {},
                s0 = TERRAIN.mybases,
                s1 = TERRAIN.mycorners;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? "oppfrozenguardedthreat" : "oppfrozenfreethreat") : (!!(UNITLAYERS.units[POS]) ? "oppmoverguardedthreat" : "oppmoverfreethreat"))][POS] = {};
          }
        }
      }
    } 
    return {
      myfrozenguardedthreat: Object.keys(ARTIFACTS.myfrozenguardedthreat).length,
      myfrozenfreethreat: 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length,
      mymoverguardedthreat: 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length,
      mymoverfreethreat: 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length,
      myfrozeninfiltrators: 5 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.myfrozens,
            s1 = TERRAIN.oppbases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      myfreeinfiltrators: 6 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.mynotfrozens,
            s1 = TERRAIN.oppbases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      oppfrozenguardedthreat: -Object.keys(ARTIFACTS.oppfrozenguardedthreat).length,
      oppfrozenfreethreat: -2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length,
      oppmoverguardedthreat: -3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length,
      oppmoverfreethreat: -4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length,
      oppfrozeninfiltrators: -5 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.oppfrozens,
            s1 = TERRAIN.mybases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length,
      oppfreeinfiltrators: -6 * Object.keys(
        (function() {
          let ret = {},
            s0 = UNITLAYERS.oppnotfrozens,
            s1 = TERRAIN.mybases;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length
    };
  };
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
    };
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    };
    let STARTPOS = MARKS["selectunit"];
    let neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
    let nbrofneighbourdirs = neighbourdirs.length;
    let startconnections = connections[STARTPOS];
    for (let dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
      let POS = startconnections[neighbourdirs[dirnbr]];
      if (POS && !UNITLAYERS.units[POS]) {
        ARTIFACTS["movetargets"][POS] = {};
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
    let newlinks = turn.links[newstepid];
    for (let linkpos in ARTIFACTS.movetargets) {
      newlinks[linkpos] = 'selectmove2';
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    return {
      type: 'text',
      text: "Select an empty square to move to"
    };
  };
  game.selectmove2 = function(turn, step, markpos) {
    let MARKS = {
      selectmove: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectmove'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].move = 'move2';
    return newstep;
  };
  game.selectmove2instruction = function(turn, step) {
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
      }, ((!!(TERRAIN.oppbases[MARKS["selectmove"]]) && !(TERRAIN.oppbases[MARKS["selectunit"]])) ? collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "into the opponent base at"
        }, {
          type: 'posref',
          pos: MARKS["selectmove"]
        }]
      }) : collapseLine({
        type: 'line',
        content: [{
          type: 'text',
          text: "to"
        }, {
          type: 'posref',
          pos: MARKS["selectmove"]
        }]
      }))]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let LOOPID;
      for (let POS in UNITLAYERS.myfrozens) {
        LOOPID = UNITLAYERS.myfrozens[POS].id
        UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
          "group": "notfrozens"
        });
        // TODO - check that it uses ['loopid'] ?
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "group": "frozens"
        });
      }
    } { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmove"]
        });
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "notfrozens": {},
      "mynotfrozens": {},
      "oppnotfrozens": {},
      "neutralnotfrozens": {},
      "frozens": {},
      "myfrozens": {},
      "oppfrozens": {},
      "neutralfrozens": {},
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
    ARTIFACTS = {
      "movetargets": {}
    };
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
    if (Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorners,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'cornerinfiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].cornerinfiltration =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppcorners,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if ((Object.keys(
        (function() {
          let ret = {},
            s0 = TERRAIN.oppbases,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }())).length === 2)) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'occupation';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].occupation =
        (function() {
          let ret = {},
            s0 = TERRAIN.oppbases,
            s1 = UNITLAYERS.myunits;
          for (let key in s0) {
            if (s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move2instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
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
    let ARTIFACTS = {
      "movetargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "notfrozens": {},
      "mynotfrozens": {},
      "oppnotfrozens": {},
      "neutralnotfrozens": {},
      "frozens": {},
      "myfrozens": {},
      "oppfrozens": {},
      "neutralfrozens": {},
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
    for (let linkpos in UNITLAYERS.mynotfrozens) {
      newlinks[linkpos] = 'selectunit2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return ((turn.turn > 2) ? collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move that your didn't move last turn"
      }]
    }) : collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move"
      }]
    }));
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
})();
export default game;