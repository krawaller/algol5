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
  "eat": 1
};
game.graphics = {
  "tiles": {
    "water": "water"
  },
  "icons": {
    "seals": "queen",
    "bears": "queen",
    "holes": "pawn"
  }
};
game.board = {
  "height": 8,
  "width": 8,
  "terrain": {
    "water": ["a1", "a2", "a7", "a8", "b1", "b8", "g1", "g8", "h1", "h2", "h7", "h8"]
  }
};
game.AI = [];
game.id = "gowiththefloe";
let boardDef = {
  "height": 8,
  "width": 8,
  "terrain": {
    "water": ["a1", "a2", "a7", "a8", "b1", "b8", "g1", "g8", "h1", "h2", "h7", "h8"]
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
        "seals": {
          "1": ["b2", "b7"]
        },
        "bears": {
          "2": ["g2", "g7"]
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
  let TERRAIN = terrainLayers(boardDef, 1);
  let ownernames = ["neutral", "my", "opp"];
  let player = 1;
  let otherplayer = 2;
  game.selectunit1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
      eattargets: Object.assign({}, step.ARTIFACTS.eattargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    }; {
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.seals,
            s1 = UNITLAYERS.bears,
            s2 = TERRAIN.water;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          for (k in s2) {
            ret[k] = 1;
          }
          return ret;
        }());
      let STARTPOS = MARKS["selectunit"];
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let MAX = 2;
        let POS = STARTPOS;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS["movetargets"][POS] = {
              dir: DIR
            };
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
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmovetarget1';
      }
    }
    return newstep;
  };
  game.selectunit1instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move"
      }]
    });
  };
  game.selectmovetarget1 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      cracks: Object.assign({}, step.ARTIFACTS.cracks)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let BLOCKS =
      (function() {
        let ret = {};
        ret[MARKS["selectunit"]] = 1;
        return ret;
      }());
    let STARTPOS = MARKS["selectmovetarget"];
    let STOPREASON = "";
    let POS = STARTPOS;
    while (!(STOPREASON = (!(POS = connections[POS][relativedirs[5 - 2 + (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"]]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
      if (!UNITLAYERS.holes[POS]) {
        ARTIFACTS["cracks"][POS] = {};
      }
    }
    if (BLOCKS[POS]) {
      ARTIFACTS["cracks"][POS] = {};
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
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
        text: "to go here"
      }]
    });
  };
  game.selecteattarget1 = function(turn, step, markpos) {
    let MARKS = {
      selecteattarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selecteattarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].eat = 'eat1';
    return newstep;
  };
  game.selecteattarget1instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "eat"
      }, {
        type: 'text',
        text: "to, well, eat"
      }]
    });
  };
  game.move1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      canmove: Object.assign({}, step.ARTIFACTS.canmove)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    } { 
      for (let POS in ARTIFACTS.cracks) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let walkstarts = UNITLAYERS.seals;
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let MAX = 2;
        let POS = STARTPOS;
        let walkpositionstocount =
          (function() {
            let ret = {},
              s0 = TERRAIN.nowater,
              s1 = UNITLAYERS.holes;
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        let CURRENTCOUNT = 0;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
          LENGTH++;
        }
        var TOTALCOUNT = CURRENTCOUNT;
        if ((TOTALCOUNT > 0)) {
          ARTIFACTS["canmove"][STARTPOS] = {};
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
      path: step.path.concat('move'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'safeseal';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].safeseal =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.seals,
            s1 = ARTIFACTS.canmove;
          for (let key in s0) {
            if (!s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'sealseaten';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move1instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
  game.eat1 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      canmove: Object.assign({}, step.ARTIFACTS.canmove)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectunit"]]  || {}).id];
    } { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecteattarget"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let walkstarts = UNITLAYERS.seals;
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let MAX = 2;
        let POS = STARTPOS;
        let walkpositionstocount =
          (function() {
            let ret = {},
              s0 = TERRAIN.nowater,
              s1 = UNITLAYERS.holes;
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        let CURRENTCOUNT = 0;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
          LENGTH++;
        }
        var TOTALCOUNT = CURRENTCOUNT;
        if ((TOTALCOUNT > 0)) {
          ARTIFACTS["canmove"][STARTPOS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + 'eat';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'eat',
      path: step.path.concat('eat')
    });
    turn.links[newstepid] = {};
    if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
      let winner = 1;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'safeseal';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].safeseal =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.seals,
            s1 = ARTIFACTS.canmove;
          for (let key in s0) {
            if (!s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      let result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'sealseaten';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.eat1instruction = function(turn, step) {
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit1';
    }
    return turn;
  }
  game.start1instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move"
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
  let TERRAIN = terrainLayers(boardDef, 2);
  let ownernames = ["neutral", "opp", "my"];
  let player = 2;
  let otherplayer = 1;
  game.selectunit2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
      eattargets: Object.assign({}, step.ARTIFACTS.eattargets)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectunit: markpos
    }; {
      let BLOCKS =
        (function() {
          let k, ret = {},
            s0 = UNITLAYERS.seals,
            s1 = UNITLAYERS.bears,
            s2 = TERRAIN.water;
          for (k in s0) {
            ret[k] = 1;
          }
          for (k in s1) {
            ret[k] = 1;
          }
          for (k in s2) {
            ret[k] = 1;
          }
          return ret;
        }());
      let STARTPOS = MARKS["selectunit"];
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let DIR = allwalkerdirs[walkerdirnbr];
        let MAX = 2;
        let POS = STARTPOS;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          LENGTH++;
          if (!UNITLAYERS.holes[POS]) {
            ARTIFACTS["movetargets"][POS] = {
              dir: DIR
            };
          }
        }
      }
    } {
      let STARTPOS = MARKS["selectunit"];
      let neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      let startconnections = connections[STARTPOS];
      for (let dirnbr = 0; dirnbr < 8; dirnbr++) {
        let POS = startconnections[neighbourdirs[dirnbr]];
        if (POS && UNITLAYERS.seals[POS]) {
          ARTIFACTS["eattargets"][POS] = {};
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
    turn.links[newstepid] = {}; { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.movetargets) {
        newlinks[linkpos] = 'selectmovetarget2';
      }
    } { 
      let newlinks = turn.links[newstepid];
      for (let linkpos in ARTIFACTS.eattargets) {
        newlinks[linkpos] = 'selecteattarget2';
      }
    }
    return newstep;
  };
  game.selectunit2instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select where to move"
      }]
    });
  };
  game.selectmovetarget2 = function(turn, step, markpos) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      cracks: Object.assign({}, step.ARTIFACTS.cracks)
    });
    let UNITLAYERS = step.UNITLAYERS;
    let MARKS = {
      selectmovetarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let BLOCKS =
      (function() {
        let ret = {};
        ret[MARKS["selectunit"]] = 1;
        return ret;
      }());
    let STARTPOS = MARKS["selectmovetarget"];
    let STOPREASON = "";
    let POS = STARTPOS;
    while (!(STOPREASON = (!(POS = connections[POS][relativedirs[5 - 2 + (ARTIFACTS.movetargets[MARKS["selectmovetarget"]] || {})["dir"]]]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : null))) {
      if (!UNITLAYERS.holes[POS]) {
        ARTIFACTS["cracks"][POS] = {};
      }
    }
    if (BLOCKS[POS]) {
      ARTIFACTS["cracks"][POS] = {};
    }
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
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
        text: "to go here"
      }]
    });
  };
  game.selecteattarget2 = function(turn, step, markpos) {
    let MARKS = {
      selecteattarget: markpos,
      selectunit: step.MARKS.selectunit
    };
    let newstepid = step.stepid + '-' + markpos;
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      MARKS: MARKS,
      stepid: newstepid,
      path: step.path.concat(markpos),
      name: 'selecteattarget'
    });
    turn.links[newstepid] = {};
    turn.links[newstepid].eat = 'eat2';
    return newstep;
  };
  game.selecteattarget2instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Press"
      }, {
        type: 'cmndref',
        cmnd: "eat"
      }, {
        type: 'text',
        text: "to, well, eat"
      }]
    });
  };
  game.move2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      canmove: Object.assign({}, step.ARTIFACTS.canmove)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let clones = step.clones;
    let UNITLAYERS = step.UNITLAYERS;
    { 
      let unitid = (UNITLAYERS.units[MARKS["selectunit"]]  || {}).id;
      if (unitid) {
        UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
          "pos": MARKS["selectmovetarget"]
        });
      }
    } { 
      for (let POS in ARTIFACTS.cracks) {
        let newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: POS,
          id: newunitid,
          group: "holes",
          owner: 0
        };
      }
    }
    MARKS = {};
    UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let walkstarts = UNITLAYERS.seals;
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let MAX = 2;
        let POS = STARTPOS;
        let walkpositionstocount =
          (function() {
            let ret = {},
              s0 = TERRAIN.nowater,
              s1 = UNITLAYERS.holes;
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        let CURRENTCOUNT = 0;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
          LENGTH++;
        }
        var TOTALCOUNT = CURRENTCOUNT;
        if ((TOTALCOUNT > 0)) {
          ARTIFACTS["canmove"][STARTPOS] = {};
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
      path: step.path.concat('move'),
      clones: clones
    });
    turn.links[newstepid] = {};
    if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
      let winner = 1;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'safeseal';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].safeseal =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.seals,
            s1 = ARTIFACTS.canmove;
          for (let key in s0) {
            if (!s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'sealseaten';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.move2instruction = function(turn, step) {
    return {
      type: 'text',
      text: ""
    };
  };
  game.eat2 = function(turn, step) {
    let ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
      canmove: Object.assign({}, step.ARTIFACTS.canmove)
    });
    let MARKS = step.MARKS;
    let UNITDATA = Object.assign({}, step.UNITDATA);
    let UNITLAYERS = step.UNITLAYERS;
    { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selectunit"]]  || {}).id];
    } { 
      delete UNITDATA[(UNITLAYERS.units[MARKS["selecteattarget"]]  || {}).id];
    }
    MARKS = {};
    UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let walkstarts = UNITLAYERS.seals;
    for (let STARTPOS in walkstarts) {
      let allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
        let MAX = 2;
        let POS = STARTPOS;
        let walkpositionstocount =
          (function() {
            let ret = {},
              s0 = TERRAIN.nowater,
              s1 = UNITLAYERS.holes;
            for (let key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        let CURRENTCOUNT = 0;
        let LENGTH = 0;
        while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
          CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
          LENGTH++;
        }
        var TOTALCOUNT = CURRENTCOUNT;
        if ((TOTALCOUNT > 0)) {
          ARTIFACTS["canmove"][STARTPOS] = {};
        }
      }
    }
    let newstepid = step.stepid + '-' + 'eat';
    let newstep = turn.steps[newstepid] = Object.assign({}, step, {
      ARTIFACTS: ARTIFACTS,
      MARKS: MARKS,
      UNITDATA: UNITDATA,
      UNITLAYERS: UNITLAYERS,
      stepid: newstepid,
      name: 'eat',
      path: step.path.concat('eat')
    });
    turn.links[newstepid] = {};
    if ((Object.keys(ARTIFACTS.canmove).length !== Object.keys(UNITLAYERS.seals).length)) {
      let winner = 1;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'safeseal';
      turn.endMarks[newstepid] = turn.endMarks[newstepid] ||  {};
      turn.endMarks[newstepid].safeseal =
        (function() {
          let ret = {},
            s0 = UNITLAYERS.seals,
            s1 = ARTIFACTS.canmove;
          for (let key in s0) {
            if (!s1[key]) {
              ret[key] = s0[key];
            }
          }
          return ret;
        }());
    } else
    if (Object.keys(UNITLAYERS.seals).length === 0) {
      let winner = 2;
      let result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
      turn.links[newstepid][result] = 'sealseaten';
    } else turn.links[newstepid].endturn = "start" + otherplayer;
    return newstep;
  }
  game.eat2instruction = function(turn, step) {
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
      "eattargets": {},
      "movetargets": {},
      "canmove": {},
      "cracks": {}
    };
    let UNITDATA = step.UNITDATA;
    let UNITLAYERS = {
      "seals": {},
      "myseals": {},
      "oppseals": {},
      "neutralseals": {},
      "bears": {},
      "mybears": {},
      "oppbears": {},
      "neutralbears": {},
      "holes": {},
      "myholes": {},
      "oppholes": {},
      "neutralholes": {},
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
    for (let linkpos in UNITLAYERS.myunits) {
      newlinks[linkpos] = 'selectunit2';
    }
    return turn;
  }
  game.start2instruction = function(turn, step) {
    return collapseLine({
      type: 'line',
      content: [{
        type: 'text',
        text: "Select a unit to move"
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