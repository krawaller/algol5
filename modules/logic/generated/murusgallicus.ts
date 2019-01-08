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
  "move": 1,
  "kill": 1
};
game.graphics = {
  "tiles": {
    "homerow": "playercolour"
  },
  "icons": {
    "towers": "rook",
    "walls": "pawn"
  }
};
game.board = {
  "height": 7,
  "width": 8,
  "terrain": {
    "homerow": {
      "1": [
        ["rect", "a1", "h1"]
      ],
      "2": [
        ["rect", "a7", "h7"]
      ]
    }
  }
};
game.AI = ["Steve", "Joe", "Clive"];
game.id = "murusgallicus";
let boardDef = {
  "height": 7,
  "width": 8,
  "terrain": {
    "homerow": {
      "1": [
        ["rect", "a1", "h1"]
      ],
      "2": [
        ["rect", "a7", "h7"]
      ]
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
        "towers": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a7", "h7"]
          ]
        }
      })
      ,
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
(function() {
  let TERRAIN = terrainLayers(boardDef, 1, {
    "threatrow": {
      "1": [
        ["rect", "a3", "h3"]
      ],
      "2": [
        ["rect", "a5", "h5"]
      ]
    }
  });
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  let mybasic = {
    "h1": 0,
    "g1": 0,
    "f1": 0,
    "e1": 0,
    "d1": 0,
    "c1": 0,
    "b1": 0,
    "a1": 0,
    "h2": 0,
    "g2": 0,
    "f2": 1,
    "e2": 1,
    "d2": 1,
    "c2": 1,
    "b2": 0,
    "a2": 0,
    "h3": 0,
    "g3": 0,
    "f3": 2,
    "e3": 2,
    "d3": 2,
    "c3": 2,
    "b3": 0,
    "a3": 0,
    "h4": 0,
    "g4": 0,
    "f4": 3,
    "e4": 3,
    "d4": 3,
    "c4": 3,
    "b4": 0,
    "a4": 0,
    "h5": 2,
    "g5": 3,
    "f5": 4,
    "e5": 4,
    "d5": 4,
    "c5": 4,
    "b5": 3,
    "a5": 2,
    "h6": 1,
    "g6": 1,
    "f6": 1,
    "e6": 1,
    "d6": 1,
    "c6": 1,
    "b6": 1,
    "a6": 1,
    "h7": 0,
    "g7": 0,
    "f7": 0,
    "e7": 0,
    "d7": 0,
    "c7": 0,
    "b7": 0,
    "a7": 0
  };
  let oppbasic = {
    "h1": 0,
    "g1": 0,
    "f1": 0,
    "e1": 0,
    "d1": 0,
    "c1": 0,
    "b1": 0,
    "a1": 0,
    "h2": 1,
    "g2": 1,
    "f2": 1,
    "e2": 1,
    "d2": 1,
    "c2": 1,
    "b2": 1,
    "a2": 1,
    "h3": 2,
    "g3": 3,
    "f3": 4,
    "e3": 4,
    "d3": 4,
    "c3": 4,
    "b3": 3,
    "a3": 2,
    "h4": 0,
    "g4": 0,
    "f4": 3,
    "e4": 3,
    "d4": 3,
    "c4": 3,
    "b4": 0,
    "a4": 0,
    "h5": 0,
    "g5": 0,
    "f5": 2,
    "e5": 2,
    "d5": 2,
    "c5": 2,
    "b5": 0,
    "a5": 0,
    "h6": 0,
    "g6": 0,
    "f6": 1,
    "e6": 1,
    "d6": 1,
    "c6": 1,
    "b6": 0,
    "a6": 0,
    "h7": 0,
    "g7": 0,
    "f7": 0,
    "e7": 0,
    "d7": 0,
    "c7": 0,
    "b7": 0,
    "a7": 0
  };
  game.brain_Steve_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    ARTIFACTS.oppheavythreats = {};
    ARTIFACTS.opplightthreats = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let filtersourcelayer = TERRAIN.mythreatrow;
      for (let POS in filtersourcelayer) {
        let filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? "oppheavythreats" : "opplightthreats")];
        if (filtersourcelayer[POS]) {
          let filterobj = filtersourcelayer[POS];
          if (!!(ARTIFACTS.oppmoves[POS])) {
            filtertargetlayer[POS] = filterobj;
          }
        }
      }
    } 
    return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      10000 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length - 20 * Object.keys(ARTIFACTS.opplightthreats).length - 500 * Object.keys(ARTIFACTS.oppheavythreats).length;
  };
  game.brain_Steve_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    ARTIFACTS.oppheavythreats = {};
    ARTIFACTS.opplightthreats = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let filtersourcelayer = TERRAIN.mythreatrow;
      for (let POS in filtersourcelayer) {
        let filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? "oppheavythreats" : "opplightthreats")];
        if (filtersourcelayer[POS]) {
          let filterobj = filtersourcelayer[POS];
          if (!!(ARTIFACTS.oppmoves[POS])) {
            filtertargetlayer[POS] = filterobj;
          }
        }
      }
    } 
    return {
      mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppwinmoves: -10000 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length,
      opplightthreats: -20 * Object.keys(ARTIFACTS.opplightthreats).length,
      oppheavythreats: -500 * Object.keys(ARTIFACTS.oppheavythreats).length
    };
  };
  game.brain_Joe_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      100 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length;
  };
  game.brain_Joe_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return {
      mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppwinmoves: -100 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length
    };
  };
  game.brain_Clive_1 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.mymoves = {};
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.oppwalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.mytowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["mymoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      Object.keys(ARTIFACTS.oppmoves).length;
  };
  game.brain_Clive_1_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.mymoves = {};
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.oppwalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.mytowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["mymoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return {
      mymoves: Object.keys(ARTIFACTS.mymoves).length,
      mytowerpos: 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppmoves: -Object.keys(ARTIFACTS.oppmoves).length
    };
  };
  game.selecttower1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
      killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selecttower: markpos
    }; {
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.oppunits,
            s1 = UNITLAYERS.mytowers;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
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
          if (((WALKLENGTH === 2) && (STEP === 2))) {
            ARTIFACTS["movetargets"][POS] = {
              dir: DIR
            };
          }
        }
      }
    } {
      let STARTPOS = MARKS["selecttower"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (POS && UNITLAYERS.oppwalls[POS]) {
          ARTIFACTS["killtargets"][POS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selecttower'
    });
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmove1';
      }
    } { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.killtargets) {
        newlinks[linkpos] = 'selectkill1';
      }
    }
    return newstep;
  };
  game.selecttower1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select"
        },
        [{
          cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
          content: {
            type: 'text',
            text: "a move target"
          }
        }, {
          cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "an enemy"
            }, {
              type: "unittyperef",
              alias: "pawn",
              name: "pawn".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to kill"
            }]
          })
        }].filter(function(elem) {
          return elem.cond;
        }).reduce(function(mem, elem, n, list) {
          mem.content.push(elem.content);
          if (n === list.length - 2) {
            mem.content.push("or");
          } else if (n < list.length - 2) {
            mem.content.push(",");
          }
          return mem;
        }, {
          type: "line",
          content: []
        }), {
          type: 'text',
          text: "for the"
        }, {
          type: 'posref',
          pos: MARKS["selecttower"]
        }, {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, '')
        }
      ]
    });
  };
  game.selectmove1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
      madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmove: markpos,
      selecttower: step.MARKS.selecttower
    }; {
      let STARTPOS = MARKS["selectmove"];
      let POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5]];
      if (POS) {
        ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? "madetowers" : "madewalls")][POS] = {};
      }
      ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS["selectmove"]]) ? "madetowers" : "madewalls")][STARTPOS] = {};
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
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
        text: "to overturn your"
      }, {
        type: 'posref',
        pos: MARKS["selecttower"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "towards"
      }, {
        type: 'posref',
        pos: MARKS["selectmove"]
      }]
    });
  };
  game.selectkill1 = function(turn, step, markpos) {
    let MARKS = {
      selectkill: markpos,
      selecttower: step.MARKS.selecttower
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectkill'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].kill = 'kill1';
    return newstep;
  };
  game.selectkill1instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "kill"
      }, {
        type: 'text',
        text: "to make a section of the"
      }, {
        type: 'posref',
        pos: MARKS["selecttower"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "crush the enemy"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "at"
      }, {
        type: 'posref',
        pos: MARKS["selectkill"]
      }]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
    } { 
      for (let POS in ARTIFACTS.madetowers) {
        let unitid = (UNITLAYERS.units[POS]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "towers"
          });
        }
      }
    } { 
      for (let POS in ARTIFACTS.madewalls) {
        let newunitid = 'spawn' + (clones++);
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
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(
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
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
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
  game.kill1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let unitid = (UNITLAYERS.units[MARKS["selecttower"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "group": "walls"
        });
      }
    } { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let newstepid = step.stepid + '-' + 'kill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'kill',
      path: step.path.concat('kill')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
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
        }())).length !== 0) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
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
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.kill1instruction = function(turn, step) {
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      clones: step.clones,
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.mytowers) {
      newlinks[linkpos] = 'selecttower1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a"
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to act with"
      }]
    });
  };
  game.debug1 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
})();
(function() {
  let TERRAIN = terrainLayers(boardDef, 2, {
    "threatrow": {
      "1": [
        ["rect", "a3", "h3"]
      ],
      "2": [
        ["rect", "a5", "h5"]
      ]
    }
  });
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  let oppbasic = {
    "h1": 0,
    "g1": 0,
    "f1": 0,
    "e1": 0,
    "d1": 0,
    "c1": 0,
    "b1": 0,
    "a1": 0,
    "h2": 0,
    "g2": 0,
    "f2": 1,
    "e2": 1,
    "d2": 1,
    "c2": 1,
    "b2": 0,
    "a2": 0,
    "h3": 0,
    "g3": 0,
    "f3": 2,
    "e3": 2,
    "d3": 2,
    "c3": 2,
    "b3": 0,
    "a3": 0,
    "h4": 0,
    "g4": 0,
    "f4": 3,
    "e4": 3,
    "d4": 3,
    "c4": 3,
    "b4": 0,
    "a4": 0,
    "h5": 2,
    "g5": 3,
    "f5": 4,
    "e5": 4,
    "d5": 4,
    "c5": 4,
    "b5": 3,
    "a5": 2,
    "h6": 1,
    "g6": 1,
    "f6": 1,
    "e6": 1,
    "d6": 1,
    "c6": 1,
    "b6": 1,
    "a6": 1,
    "h7": 0,
    "g7": 0,
    "f7": 0,
    "e7": 0,
    "d7": 0,
    "c7": 0,
    "b7": 0,
    "a7": 0
  };
  let mybasic = {
    "h1": 0,
    "g1": 0,
    "f1": 0,
    "e1": 0,
    "d1": 0,
    "c1": 0,
    "b1": 0,
    "a1": 0,
    "h2": 1,
    "g2": 1,
    "f2": 1,
    "e2": 1,
    "d2": 1,
    "c2": 1,
    "b2": 1,
    "a2": 1,
    "h3": 2,
    "g3": 3,
    "f3": 4,
    "e3": 4,
    "d3": 4,
    "c3": 4,
    "b3": 3,
    "a3": 2,
    "h4": 0,
    "g4": 0,
    "f4": 3,
    "e4": 3,
    "d4": 3,
    "c4": 3,
    "b4": 0,
    "a4": 0,
    "h5": 0,
    "g5": 0,
    "f5": 2,
    "e5": 2,
    "d5": 2,
    "c5": 2,
    "b5": 0,
    "a5": 0,
    "h6": 0,
    "g6": 0,
    "f6": 1,
    "e6": 1,
    "d6": 1,
    "c6": 1,
    "b6": 0,
    "a6": 0,
    "h7": 0,
    "g7": 0,
    "f7": 0,
    "e7": 0,
    "d7": 0,
    "c7": 0,
    "b7": 0,
    "a7": 0
  };
  game.brain_Steve_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    ARTIFACTS.oppheavythreats = {};
    ARTIFACTS.opplightthreats = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let filtersourcelayer = TERRAIN.mythreatrow;
      for (let POS in filtersourcelayer) {
        let filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? "oppheavythreats" : "opplightthreats")];
        if (filtersourcelayer[POS]) {
          let filterobj = filtersourcelayer[POS];
          if (!!(ARTIFACTS.oppmoves[POS])) {
            filtertargetlayer[POS] = filterobj;
          }
        }
      }
    } 
    return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      10000 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length - 20 * Object.keys(ARTIFACTS.opplightthreats).length - 500 * Object.keys(ARTIFACTS.oppheavythreats).length;
  };
  game.brain_Steve_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    ARTIFACTS.oppheavythreats = {};
    ARTIFACTS.opplightthreats = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let filtersourcelayer = TERRAIN.mythreatrow;
      for (let POS in filtersourcelayer) {
        let filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? "oppheavythreats" : "opplightthreats")];
        if (filtersourcelayer[POS]) {
          let filterobj = filtersourcelayer[POS];
          if (!!(ARTIFACTS.oppmoves[POS])) {
            filtertargetlayer[POS] = filterobj;
          }
        }
      }
    } 
    return {
      mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppwinmoves: -10000 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length,
      opplightthreats: -20 * Object.keys(ARTIFACTS.opplightthreats).length,
      oppheavythreats: -500 * Object.keys(ARTIFACTS.oppheavythreats).length
    };
  };
  game.brain_Joe_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      100 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length;
  };
  game.brain_Joe_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return {
      mytowercount: 2 * Object.keys(UNITLAYERS.mytowers).length,
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mytowerpos: 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppwinmoves: -100 * Object.keys(
        (function() {
          let k, ret = {},
            s0 = ARTIFACTS.oppmoves,
            s1 = TERRAIN.myhomerow;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }())).length
    };
  };
  game.brain_Clive_2 = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.mymoves = {};
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.oppwalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.mytowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["mymoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) +
      Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0) -
      Object.keys(ARTIFACTS.oppmoves).length;
  };
  game.brain_Clive_2_detailed = function(step) {
    let UNITLAYERS = step.UNITLAYERS;
    let ARTIFACTS = step.ARTIFACTS;
    ARTIFACTS.mymoves = {};
    ARTIFACTS.oppmoves = {};
    { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.oppwalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.mytowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["mymoves"][POS] = {};
            }
          }
        }
      }
    }  { 
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.towers,
            s1 = UNITLAYERS.mywalls;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
      let walkstarts = UNITLAYERS.opptowers;
      for (let STARTPOS in walkstarts) {
        let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          let walkedsquares = [];
          let MAX = 2;
          let POS = STARTPOS;
          let LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
            LENGTH++;
          }
          var WALKLENGTH = walkedsquares.length;
          var STEP = 0;
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            STEP++;
            if (((WALKLENGTH === 2) && (STEP === 2))) {
              ARTIFACTS["oppmoves"][POS] = {};
            }
          }
        }
      }
    } 
    return {
      mymoves: Object.keys(ARTIFACTS.mymoves).length,
      mytowerpos: 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      mywallpos: Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
        return mem + (mybasic[pos] || 0);
      }, 0),
      oppmoves: -Object.keys(ARTIFACTS.oppmoves).length
    };
  };
  game.selecttower2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
      killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selecttower: markpos
    }; {
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.oppunits,
            s1 = UNITLAYERS.mytowers;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          return ret;
        }());
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
          if (((WALKLENGTH === 2) && (STEP === 2))) {
            ARTIFACTS["movetargets"][POS] = {
              dir: DIR
            };
          }
        }
      }
    } {
      let STARTPOS = MARKS["selecttower"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (POS && UNITLAYERS.oppwalls[POS]) {
          ARTIFACTS["killtargets"][POS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selecttower'
    });
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmove2';
      }
    } { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.killtargets) {
        newlinks[linkpos] = 'selectkill2';
      }
    }
    return newstep;
  };
  game.selecttower2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    let ARTIFACTS = step.ARTIFACTS;
    return collapseLine({
      type: 'line',
      content: [{
          type: 'text',
          text: "Select"
        },
        [{
          cond: Object.keys(ARTIFACTS.movetargets).length !== 0,
          content: {
            type: 'text',
            text: "a move target"
          }
        }, {
          cond: Object.keys(ARTIFACTS.killtargets).length !== 0,
          content: collapseLine({
            type: 'line',
            content: [{
              type: 'text',
              text: "an enemy"
            }, {
              type: "unittyperef",
              alias: "pawn",
              name: "pawn".replace(/s$/, '')
            }, {
              type: 'text',
              text: "to kill"
            }]
          })
        }].filter(function(elem) {
          return elem.cond;
        }).reduce(function(mem, elem, n, list) {
          mem.content.push(elem.content);
          if (n === list.length - 2) {
            mem.content.push("or");
          } else if (n < list.length - 2) {
            mem.content.push(",");
          }
          return mem;
        }, {
          type: "line",
          content: []
        }), {
          type: 'text',
          text: "for the"
        }, {
          type: 'posref',
          pos: MARKS["selecttower"]
        }, {
          type: "unittyperef",
          alias: "rook",
          name: "rook".replace(/s$/, '')
        }
      ]
    });
  };
  game.selectmove2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
      madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmove: markpos,
      selecttower: step.MARKS.selecttower
    }; {
      let STARTPOS = MARKS["selectmove"];
      let POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS["selectmove"]] || {})["dir"] - 2 + 5]];
      if (POS) {
        ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? "madetowers" : "madewalls")][POS] = {};
      }
      ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS["selectmove"]]) ? "madetowers" : "madewalls")][STARTPOS] = {};
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
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
        text: "to overturn your"
      }, {
        type: 'posref',
        pos: MARKS["selecttower"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "towards"
      }, {
        type: 'posref',
        pos: MARKS["selectmove"]
      }]
    });
  };
  game.selectkill2 = function(turn, step, markpos) {
    let MARKS = {
      selectkill: markpos,
      selecttower: step.MARKS.selecttower
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selectkill'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].kill = 'kill2';
    return newstep;
  };
  game.selectkill2instruction = function(turn, step) {
    let MARKS = step.MARKS;
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "kill"
      }, {
        type: 'text',
        text: "to make a section of the"
      }, {
        type: 'posref',
        pos: MARKS["selecttower"]
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "crush the enemy"
      }, {
        type: "unittyperef",
        alias: "pawn",
        name: "pawn".replace(/s$/, '')
      }, {
        type: 'text',
        text: "at"
      }, {
        type: 'posref',
        pos: MARKS["selectkill"]
      }]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecttower"]]  || {}).id];
    } { 
      for (let POS in ARTIFACTS.madetowers) {
        let unitid = (UNITLAYERS.units[POS]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            "group": "towers"
          });
        }
      }
    } { 
      for (let POS in ARTIFACTS.madewalls) {
        let newunitid = 'spawn' + (clones++);
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
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let newstepid = step.stepid + '-' + 'move';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'move',
      path: step.path.concat('move'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if (Object.keys(
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
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
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
  game.kill2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let unitid = (UNITLAYERS.units[MARKS["selecttower"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "group": "walls"
        });
      }
    } { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectkill"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let newstepid = step.stepid + '-' + 'kill';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'kill',
      path: step.path.concat('kill')
    });
    turn.links[newstepid] = {};
    if (Object.keys(
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
        }())).length !== 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'infiltration';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].infiltration =
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
        }());
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.kill2instruction = function(turn, step) {
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
      "movetargets": {},
      "madetowers": {},
      "madewalls": {},
      "killtargets": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "towers": {},
      "mytowers": {},
      "opptowers": {},
      "neutraltowers": {},
      "walls": {},
      "mywalls": {},
      "oppwalls": {},
      "neutralwalls": {},
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
      clones: step.clones,
      path: []
    };
    let newlinks = turn.links.root;
    for (let linkpos in UNITLAYERS.mytowers) {
      newlinks[linkpos] = 'selecttower2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a"
      }, {
        type: "unittyperef",
        alias: "rook",
        name: "rook".replace(/s$/, '')
      }, {
        type: 'text',
        text: "to act with"
      }]
    });
  };
  game.debug2 = function() {
    return {
      TERRAIN: TERRAIN
    };
  }
})();
export default game;