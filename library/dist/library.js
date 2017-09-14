
function isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

var colname2number = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split("").reduce(function(mem,char,n){
	mem[char] = n+1;
	return mem;
},{});

var colnumber2name = Object.keys(colname2number).reduce(function(mem,key){
  mem[colname2number[key]] = key;
  return mem;
},{});

function pos2coords(pos) {
  return {
		x: colname2number[pos[0]],
		y: parseInt(pos.substr(1))
	}
}

function coords2pos(coords){
  return colnumber2name[coords.x] + coords.y;
}

function boardPositions(board){
  var ret = [];
  for(var y = 1; y<= board.height; y++){
    for(var x = 1; x <= board.width; x++){
      ret.push(coords2pos({x: x, y: y}));
    }
  }
  return ret.sort();
}

function offsetPos(pos,dir,forward,right,board) {
  var forwardmods = [[0,1],[1, 1],[1, 0],[ 1,-1],[ 0,-1],[-1,-1],[-1,0],[-1,1]]; // x,y
  var rightmods =   [[1,0],[1,-1],[0,-1],[-1,-1],[-1, 0],[-1, 1],[ 0,1],[ 1,1]];
  var n = dir - 1;
  var coords = pos2coords(pos);
  var newx = coords.x + forwardmods[n][0]*forward + rightmods[n][0]*right;
  var newy = coords.y + forwardmods[n][1]*forward + rightmods[n][1]*right;
  var withinbounds = newx > 0 && newx <= board.width && newy > 0 && newy <= board.height;
  return withinbounds && coords2pos({x:newx, y:newy});
}

function posConnections(pos,board) {
  return [1,2,3,4,5,6,7,8].reduce(function(mem,dir){
    var newpos = offsetPos(pos,dir,1,0,board);
    if (newpos){
      mem[dir] = newpos;
    }
    // TODO - handle offsets better in here! :)
    return (board.offsets||[]).reduce(function(innermem,[forward,right]){
      var newpos = offsetPos(pos,dir,forward,right,board)
      if (newpos){
        innermem['o'+dir+'_'+forward+'_'+right] = newpos
      }
      return innermem;
    },mem);
  },{});
}

/*
Calculates the connections object
*/
function boardConnections(board){
  return boardPositions(board).reduce(function(mem, pos){
    mem[pos] = posConnections(pos, board);
    return mem;
  },{faux:{}});
}

/*
Calculates the three BOARD layers (board,light,dark) and returns them.
*/
function boardLayers(board){
  return boardPositions(board).reduce( function(mem, pos){
    var coords = pos2coords(pos);
    var colour = ["dark","light"][(coords.x+(coords.y%2))%2];
    mem.board[pos] = mem[colour][pos] = {colour: colour, x: coords.x, y: coords.y, pos: pos};
    return mem;
  }, {board:{},light:{},dark:{}});
}

function convertToEntities(def) {
  switch(def[0]){
    case "pos": // ["pos",list,blueprint]
      return def[1].map( function(pos){ return Object.assign({pos:pos},def[2]); } );
    case "rect": // ["rect",bottomleft,topright,blueprint]
    case "holerect": // ["holerect",bottomleft,topright,holes,blueprint]
      var bottomleft = pos2coords(def[1]);
      var topright = pos2coords(def[2]);
      var blueprint = def[3];
      var positions = [];
      for (var x=bottomleft.x; x<=topright.x; x++){
        for (var y=bottomleft.y; y<=topright.y; y++){
          positions.push(coords2pos({x:x, y:y}));
        }
      }
      if (def[0]==="holerect"){
        blueprint = def[4]
        positions = positions.filter(function(p){ return def[3].indexOf(p) === -1; });
      }
      return positions.map( function(p){ return Object.assign({pos:p},blueprint); });
    default: 
      if (typeof def === 'string'){
        return [{pos:def}];
      } else if (typeof def === 'object'){ // TODO - exclude arrays, funcs, etc
        return [def];
      } else {
        throw "Unknown entity def: "+def;
      }
  }
}

/*
the initial unit data blob
*/
function deduceInitialUnitData(setup) {
  var id = 1;
  return Object.keys(setup).reduce(function(mem,group) {
    var defsbyplr = setup[group];
    return Object.keys(defsbyplr).reduce(function(mem,plr) {
      var entitydefs = defsbyplr[plr];
      return entitydefs.reduce(function(mem,entitydef) {
        convertToEntities(entitydef).forEach(function(e){
          var newid = 'unit'+(id++);
          mem[newid] = Object.assign(e, {
            id: newid,
            group: group,
            owner: parseInt(plr)
          });
        });
        return mem;
      },mem);
    },mem);
  },{});
}

/*
Calculates all terrain layers and returns them. 
This should be done per player if any terrain has owner.
*/
function terrainLayers(board, forplayer, aiterrain){
  var terrainDef = Object.assign({}, board.terrain || {}, aiterrain || {});
  if (!Object.keys(terrainDef).length){
    return {};
  }
  var terrain = Object.keys(terrainDef).reduce(function(mem,name) {
    var def = terrainDef[name];
    mem[name] = {};
    if (isArray(def)){ // no ownership, we got array of entityddefs directly
      def.forEach(function(entityDef){
        convertToEntities(entityDef).forEach(function(e){
          mem[name][e.pos] = e;
        });
      });
    } else { // per-player object
      for(var owner in def){
        owner = parseInt(owner);
        def[owner].forEach(function(entityDef){
          convertToEntities(entityDef).forEach(function(e){
            e.owner = owner;
            mem[name][e.pos] = e;
            var prefix = owner === 0 ? 'neutral' : owner === forplayer ? 'my' : 'opp';
            mem[prefix+name] = mem[prefix+name] || {};
            mem[prefix+name][e.pos] = e;
          });
        });
      }
    }
    return mem;
  },{});
  // add no-variants of layers and return
  return Object.keys(terrain).reduce(function(mem, name){
    var t = terrain[name];
    var noname = 'no'+name;
    mem[noname] = {};
    boardPositions(board).forEach(function(pos){
      if (!t[pos]){
        mem[noname][pos] = {pos:pos};
      }
    });
    return mem;
  }, terrain);
}


module.exports = {
  _test: (
  function() {
    var game = {};
    game.commands = {};
    game.graphics = {
      "icons": {
        "stepsfirsts": "queens",
        "blocksfirsts": "queens",
        "defaultfirsts": "queens",
        "noblocks": "queens",
        "pawns": "pawns"
      },
      "tiles": {
        "steps": "grass"
      }
    };
    game.board = {
      "height": 10,
      "width": 10,
      "terrain": {
        "steps": [
          ["rect", "a1", "d4"]
        ]
      }
    };
    game.AI = [];
    game.id = "_test";
    var boardDef = {
      "height": 10,
      "width": 10,
      "terrain": {
        "steps": [
          ["rect", "a1", "d4"]
        ]
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "stepsfirsts": {
            "1": ["a3"]
          },
          "blocksfirsts": {
            "1": ["b3"]
          },
          "defaultfirsts": {
            "1": ["c3"]
          },
          "noblocks": {
            "1": ["d3"]
          },
          "pawns": {
            "2": ["a1", "a5", "b1", "b5", "c1", "c5", "d1", "d5"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          marks: Object.assign({}, step.ARTIFACTS.marks),
          blocks: Object.assign({}, step.ARTIFACTS.blocks)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mystepsfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myblocksfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mydefaultfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynoblocks,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.marks,
                s1 = ARTIFACTS.blocks;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectmark1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmark1 = function(turn, step, markpos) {
        var MARKS = {
          selectmark: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmark'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      };
      game.selectmark1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "marks": {},
          "blocks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "stepsfirsts": {},
          "mystepsfirsts": {},
          "oppstepsfirsts": {},
          "neutralstepsfirsts": {},
          "blocksfirsts": {},
          "myblocksfirsts": {},
          "oppblocksfirsts": {},
          "neutralblocksfirsts": {},
          "defaultfirsts": {},
          "mydefaultfirsts": {},
          "oppdefaultfirsts": {},
          "neutraldefaultfirsts": {},
          "noblocks": {},
          "mynoblocks": {},
          "oppnoblocks": {},
          "neutralnoblocks": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          marks: Object.assign({}, step.ARTIFACTS.marks),
          blocks: Object.assign({}, step.ARTIFACTS.blocks)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mystepsfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myblocksfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mydefaultfirsts,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
            if (BLOCKS[POS] && allowedsteps[POS]) {
              ARTIFACTS['blocks'][POS] = {};
            }
          }
        }
        var allowedsteps = TERRAIN.steps;
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynoblocks,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectunit']] = 1;
                return ret;
              }());
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 5];
          for (var walkerdirnbr = 0; walkerdirnbr < 2; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
              ARTIFACTS['marks'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = ARTIFACTS.marks,
                s1 = ARTIFACTS.blocks;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectmark2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmark2 = function(turn, step, markpos) {
        var MARKS = {
          selectmark: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmark'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      };
      game.selectmark2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "marks": {},
          "blocks": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "stepsfirsts": {},
          "mystepsfirsts": {},
          "oppstepsfirsts": {},
          "neutralstepsfirsts": {},
          "blocksfirsts": {},
          "myblocksfirsts": {},
          "oppblocksfirsts": {},
          "neutralblocksfirsts": {},
          "defaultfirsts": {},
          "mydefaultfirsts": {},
          "oppdefaultfirsts": {},
          "neutraldefaultfirsts": {},
          "noblocks": {},
          "mynoblocks": {},
          "oppnoblocks": {},
          "neutralnoblocks": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), amazon: (
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "fire": 1
    };
    game.graphics = {
      "icons": {
        "queens": "queens",
        "fires": "pawns"
      }
    };
    game.board = {
      "height": 10,
      "width": 10
    };
    game.AI = ["Steve"];
    game.id = "amazon";
    var boardDef = {
      "height": 10,
      "width": 10
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "queens": {
            "1": ["d10", "g10", "a7", "j7"],
            "2": ["a4", "d1", "g1", "j4"]
          }
        }),
        TURNVARS: {},
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.brain_Steve_1 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myroads = {};
        ARTIFACTS.opproads = {};
        ARTIFACTS.myreach = {};
        ARTIFACTS.oppreach = {};
        for (var STARTPOS in UNITLAYERS.queens) {
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var foundneighbours = [];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              foundneighbours.push(POS);
            }
          }
          var NEIGHBOURCOUNT = foundneighbours.length;
          ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
            count: NEIGHBOURCOUNT
          };
        }
        var BLOCKS = UNITLAYERS.units;
        var walkstarts = UNITLAYERS.queens;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
            }
          }
        }
        return reduce(ARTIFACTS.myroads, function(mem, obj) {
          return mem + obj['count'];
        }, 0) + Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
          return mem + obj['count'];
        }, 0) - Object.keys(ARTIFACTS.oppreach).length;
      };
      game.brain_Steve_1_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myroads = {};
        ARTIFACTS.opproads = {};
        ARTIFACTS.myreach = {};
        ARTIFACTS.oppreach = {};
        for (var STARTPOS in UNITLAYERS.queens) {
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var foundneighbours = [];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              foundneighbours.push(POS);
            }
          }
          var NEIGHBOURCOUNT = foundneighbours.length;
          ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
            count: NEIGHBOURCOUNT
          };
        }
        var BLOCKS = UNITLAYERS.units;
        var walkstarts = UNITLAYERS.queens;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
            }
          }
        }
        return {
          myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
            return mem + obj['count'];
          }, 0),
          mydomain: Object.keys(ARTIFACTS.myreach).length,
          opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
            return mem + obj['count'];
          }, 0),
          oppdomain: -Object.keys(ARTIFACTS.oppreach).length
        };
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return 'Select where to move the amazon';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return 'Choose Move to go here!';
      };
      game.selectfiretarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectfiretarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfiretarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire1';
        return newstep;
      };
      game.selectfiretarget1instruction = function(step) {
        return 'Choose Fire to shoot here!';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        TURNVARS['movedto'] = MARKS['selectmovetarget'];
        MARKS = {};
        UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "targets": {}
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = TURNVARS['movedto'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
            ,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selectfiretarget1';
        }
        return newstep;
      }
      game.move1instruction = function(step) {
        return 'Now select where to fire at';
      };
      game.fire1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectfiretarget'],
          id: newunitid,
          group: 'fires',
          owner: 0,
          from: TURNVARS['movedto']
        };
        MARKS = {};
        UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "targets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
          clones: clones,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "targets": {}
        };
        var UNITDATA = step.UNITDATA;
        var TURNVARS = {};
        var UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: [],
          TURNVARS: TURNVARS
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return 'Select an amazon to move and fire with';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.brain_Steve_2 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myroads = {};
        ARTIFACTS.opproads = {};
        ARTIFACTS.myreach = {};
        ARTIFACTS.oppreach = {};
        for (var STARTPOS in UNITLAYERS.queens) {
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var foundneighbours = [];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              foundneighbours.push(POS);
            }
          }
          var NEIGHBOURCOUNT = foundneighbours.length;
          ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
            count: NEIGHBOURCOUNT
          };
        }
        var BLOCKS = UNITLAYERS.units;
        var walkstarts = UNITLAYERS.queens;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
            }
          }
        }
        return reduce(ARTIFACTS.myroads, function(mem, obj) {
          return mem + obj['count'];
        }, 0) + Object.keys(ARTIFACTS.myreach).length - reduce(ARTIFACTS.opproads, function(mem, obj) {
          return mem + obj['count'];
        }, 0) - Object.keys(ARTIFACTS.oppreach).length;
      };
      game.brain_Steve_2_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myroads = {};
        ARTIFACTS.opproads = {};
        ARTIFACTS.myreach = {};
        ARTIFACTS.oppreach = {};
        for (var STARTPOS in UNITLAYERS.queens) {
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var foundneighbours = [];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              foundneighbours.push(POS);
            }
          }
          var NEIGHBOURCOUNT = foundneighbours.length;
          ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myroads' : 'opproads')][STARTPOS] = {
            count: NEIGHBOURCOUNT
          };
        }
        var BLOCKS = UNITLAYERS.units;
        var walkstarts = UNITLAYERS.queens;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              ARTIFACTS[(!!(UNITLAYERS.myunits[STARTPOS]) ? 'myreach' : 'oppreach')][POS] = {};
            }
          }
        }
        return {
          myroads: reduce(ARTIFACTS.myroads, function(mem, obj) {
            return mem + obj['count'];
          }, 0),
          mydomain: Object.keys(ARTIFACTS.myreach).length,
          opproads: -reduce(ARTIFACTS.opproads, function(mem, obj) {
            return mem + obj['count'];
          }, 0),
          oppdomain: -Object.keys(ARTIFACTS.oppreach).length
        };
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return 'Select where to move the amazon';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return 'Choose Move to go here!';
      };
      game.selectfiretarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectfiretarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfiretarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire2';
        return newstep;
      };
      game.selectfiretarget2instruction = function(step) {
        return 'Choose Fire to shoot here!';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = {
          targets: Object.assign({}, step.ARTIFACTS.targets)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        TURNVARS['movedto'] = MARKS['selectmovetarget'];
        MARKS = {};
        UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "targets": {}
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = TURNVARS['movedto'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            ARTIFACTS['targets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
            ,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.targets) {
          newlinks[linkpos] = 'selectfiretarget2';
        }
        return newstep;
      }
      game.move2instruction = function(step) {
        return 'Now select where to fire at';
      };
      game.fire2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var TURNVARS = Object.assign({}, step.TURNVARS);
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectfiretarget'],
          id: newunitid,
          group: 'fires',
          owner: 0,
          from: TURNVARS['movedto']
        };
        MARKS = {};
        UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "targets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
          clones: clones,
          TURNVARS: TURNVARS
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "targets": {}
        };
        var UNITDATA = step.UNITDATA;
        var TURNVARS = {};
        var UNITLAYERS = {
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "fires": {},
          "myfires": {},
          "oppfires": {},
          "neutralfires": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: [],
          TURNVARS: TURNVARS
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return 'Select an amazon to move and fire with';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), aries: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "corner": "playercolour"
      },
      "icons": {
        "soldiers": "rooks"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "corner": {
          "1": ["a1"],
          "2": ["h8"]
        }
      }
    };
    game.AI = [];
    game.id = "aries";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "corner": {
          "1": ["a1"],
          "2": ["h8"]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": [
              ["rect", "a1", "d4"]
            ],
            "2": [
              ["rect", "e5", "h8"]
            ]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
          squished: Object.assign({}, step.ARTIFACTS.squished)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        if (!!(UNITLAYERS.oppunits[MARKS['selectmovetarget']])) {
          var allowedsteps = UNITLAYERS.oppunits;
          var BLOCKS = UNITLAYERS.myunits;
          var STARTPOS = MARKS['selectmovetarget'];
          var DIR = relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'] - 2 + 1];
          var walkedsquares = [];
          var STOPREASON = "";
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            walkedsquares.push(POS);
            ARTIFACTS['beingpushed'][POS] = {};
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((['hitblock', 'outofbounds'].indexOf(STOPREASON) !== -1)) {
              ARTIFACTS['squished'][walkedsquares[WALKLENGTH - 1]] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in ARTIFACTS.beingpushed) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = (ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'];
            var dist = 1;
            var newpos = UNITDATA[pushid].pos;
            while (dist && connections[newpos][pushdir]) {
              newpos = connections[newpos][pushdir];
              dist--;
            }
            UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
              pos: newpos
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        var LOOPID;
        for (var POS in ARTIFACTS.squished) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = TERRAIN.oppcorner,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'invade';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          beingpushed: Object.assign({}, step.ARTIFACTS.beingpushed),
          squished: Object.assign({}, step.ARTIFACTS.squished)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        if (!!(UNITLAYERS.oppunits[MARKS['selectmovetarget']])) {
          var allowedsteps = UNITLAYERS.oppunits;
          var BLOCKS = UNITLAYERS.myunits;
          var STARTPOS = MARKS['selectmovetarget'];
          var DIR = relativedirs[(ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'] - 2 + 1];
          var walkedsquares = [];
          var STOPREASON = "";
          var POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while (!(STOPREASON = (!(POS = connections[POS][DIR]) ? "outofbounds" : BLOCKS[POS] ? "hitblock" : !allowedsteps[POS] ? "nomoresteps" : null))) {
            walkedsquares.push(POS);
            ARTIFACTS['beingpushed'][POS] = {};
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            if ((['hitblock', 'outofbounds'].indexOf(STOPREASON) !== -1)) {
              ARTIFACTS['squished'][walkedsquares[WALKLENGTH - 1]] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in ARTIFACTS.beingpushed) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            var pushid = LOOPID;
            var pushdir = (ARTIFACTS.movetargets[MARKS['selectmovetarget']] || {})['dir'];
            var dist = 1;
            var newpos = UNITDATA[pushid].pos;
            while (dist && connections[newpos][pushdir]) {
              newpos = connections[newpos][pushdir];
              dist--;
            }
            UNITDATA[pushid] = Object.assign({}, UNITDATA[pushid], {
              pos: newpos
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        var LOOPID;
        for (var POS in ARTIFACTS.squished) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            delete UNITDATA[LOOPID]; // TODO - check that it uses ['loopid'] ?
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = TERRAIN.oppcorner,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'invade';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "beingpushed": {},
          "squished": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), atrium: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "kings": "kings",
        "queens": "queens"
      }
    };
    game.board = {
      "height": 5,
      "width": 5
    };
    game.AI = [];
    game.id = "atrium";
    var boardDef = {
      "height": 5,
      "width": 5
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "kings": {
            "1": ["a2", "c5", "e2"],
            "2": ["b1", "b5", "e3"]
          },
          "queens": {
            "1": ["a3", "d5", "d1"],
            "2": ["a4", "c1", "e4"]
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH === 2)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madewinline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mykings[STARTPOS]) ? UNITLAYERS.mykings : UNITLAYERS.myqueens);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH === 2)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madewinline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "queens": {},
          "myqueens": {},
          "oppqueens": {},
          "neutralqueens": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), castle: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "walls": "castle",
        "thrones": "playercolour"
      },
      "icons": {
        "soldiers": "rooks"
      }
    };
    game.board = {
      "width": 19,
      "height": 19,
      "terrain": {
        "walls": [
          ["rect", "c2", "c8"],
          ["rect", "f1", "f6"],
          ["rect", "h2", "h6"],
          ["rect", "l2", "l6"],
          ["rect", "n1", "n6"],
          ["rect", "q2", "q8"],
          ["rect", "c8", "i8"],
          ["rect", "k8", "p8"],
          ["rect", "i6", "k6"], "i2", "k2", ["rect", "c12", "c18"],
          ["rect", "f14", "f19"],
          ["rect", "h14", "h18"],
          ["rect", "l14", "l18"],
          ["rect", "n14", "n19"],
          ["rect", "q12", "q18"],
          ["rect", "c12", "i12"],
          ["rect", "k12", "p12"],
          ["rect", "i14", "k14"], "i18", "k18"
        ],
        "thrones": {
          "1": ["j4"],
          "2": ["j16"]
        }
      }
    };
    game.AI = [];
    game.id = "castle";
    var boardDef = {
      "width": 19,
      "height": 19,
      "terrain": {
        "walls": [
          ["rect", "c2", "c8"],
          ["rect", "f1", "f6"],
          ["rect", "h2", "h6"],
          ["rect", "l2", "l6"],
          ["rect", "n1", "n6"],
          ["rect", "q2", "q8"],
          ["rect", "c8", "i8"],
          ["rect", "k8", "p8"],
          ["rect", "i6", "k6"], "i2", "k2", ["rect", "c12", "c18"],
          ["rect", "f14", "f19"],
          ["rect", "h14", "h18"],
          ["rect", "l14", "l18"],
          ["rect", "n14", "n19"],
          ["rect", "q12", "q18"],
          ["rect", "c12", "i12"],
          ["rect", "k12", "p12"],
          ["rect", "i14", "k14"], "i18", "k18"
        ],
        "thrones": {
          "1": ["j4"],
          "2": ["j16"]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": ["f1", "n1", "h2", "l2", "h6", "l6", "c8", "q8"],
            "2": ["f19", "n19", "h18", "l18", "h14", "l14", "c12", "q12"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && ((!!(TERRAIN.walls[STARTPOS]) && !(TERRAIN.walls[POS])) || (!(TERRAIN.walls[STARTPOS]) && !!(TERRAIN.walls[POS])))) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allowedsteps = (!!(TERRAIN.walls[STARTPOS]) ? TERRAIN.walls :
          (function() {
            var ret = {},
              s0 = TERRAIN.nowalls,
              s1 = TERRAIN.mythrones;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()));
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppthrones;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (Object.keys(UNITLAYERS.oppunits ||  {}).length === 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'genocide';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && ((!!(TERRAIN.walls[STARTPOS]) && !(TERRAIN.walls[POS])) || (!(TERRAIN.walls[STARTPOS]) && !!(TERRAIN.walls[POS])))) {
            if (!UNITLAYERS.myunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allowedsteps = (!!(TERRAIN.walls[STARTPOS]) ? TERRAIN.walls :
          (function() {
            var ret = {},
              s0 = TERRAIN.nowalls,
              s1 = TERRAIN.mythrones;
            for (var key in s0) {
              if (!s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }()));
        var allwalkerdirs = [1, 3, 5, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS] && !BLOCKS[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
          if (BLOCKS[POS] && allowedsteps[POS]) {
            if (UNITLAYERS.oppunits[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppthrones;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (Object.keys(UNITLAYERS.oppunits ||  {}).length === 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'genocide';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), coffee: (
  function() {
    var game = {};
    game.commands = {
      "uphill": 1,
      "downhill": 1,
      "horisontal": 1,
      "vertical": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "markers": "pawns"
      }
    };
    game.board = {
      "height": 5,
      "width": 5
    };
    game.AI = [];
    game.id = "coffee";
    var boardDef = {
      "height": 5,
      "width": 5
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({})
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdrop1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
          vertical: Object.assign({}, step.ARTIFACTS.vertical),
          uphill: Object.assign({}, step.ARTIFACTS.uphill),
          horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
          downhill: Object.assign({}, step.ARTIFACTS.downhill)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectdrop: markpos
        };
        var STARTPOS = MARKS['selectdrop'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS[['FOOBAR', 'vertical', 'uphill', 'horisontal', 'downhill', 'vertical', 'uphill', 'horisontal', 'downhill'][DIR]][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdrop'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.uphill ||  {}).length !== 0) {
          turn.links[newstepid].uphill = 'uphill1';
        }
        if (Object.keys(ARTIFACTS.downhill ||  {}).length !== 0) {
          turn.links[newstepid].downhill = 'downhill1';
        }
        if (Object.keys(ARTIFACTS.vertical ||  {}).length !== 0) {
          turn.links[newstepid].vertical = 'vertical1';
        }
        if (Object.keys(ARTIFACTS.horisontal ||  {}).length !== 0) {
          turn.links[newstepid].horisontal = 'horisontal1';
        }
        return newstep;
      };
      game.selectdrop1instruction = function(step) {
        return '';
      };
      game.uphill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.uphill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'uphill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'uphill',
          path: step.path.concat('uphill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.uphill1instruction = function(step) {
        return '';
      };
      game.downhill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.downhill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'downhill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'downhill',
          path: step.path.concat('downhill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.downhill1instruction = function(step) {
        return '';
      };
      game.horisontal1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.horisontal) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'horisontal';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'horisontal',
          path: step.path.concat('horisontal'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.horisontal1instruction = function(step) {
        return '';
      };
      game.vertical1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.vertical) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'vertical';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'vertical',
          path: step.path.concat('vertical'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.vertical1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in (Object.keys(UNITLAYERS.markers ||  {}).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
          newlinks[linkpos] = 'selectdrop1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectdrop2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          FOOBAR: Object.assign({}, step.ARTIFACTS.FOOBAR),
          vertical: Object.assign({}, step.ARTIFACTS.vertical),
          uphill: Object.assign({}, step.ARTIFACTS.uphill),
          horisontal: Object.assign({}, step.ARTIFACTS.horisontal),
          downhill: Object.assign({}, step.ARTIFACTS.downhill)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectdrop: markpos
        };
        var STARTPOS = MARKS['selectdrop'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var POS = STARTPOS;
          while ((POS = connections[POS][DIR])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS[['FOOBAR', 'vertical', 'uphill', 'horisontal', 'downhill', 'vertical', 'uphill', 'horisontal', 'downhill'][DIR]][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdrop'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.uphill ||  {}).length !== 0) {
          turn.links[newstepid].uphill = 'uphill2';
        }
        if (Object.keys(ARTIFACTS.downhill ||  {}).length !== 0) {
          turn.links[newstepid].downhill = 'downhill2';
        }
        if (Object.keys(ARTIFACTS.vertical ||  {}).length !== 0) {
          turn.links[newstepid].vertical = 'vertical2';
        }
        if (Object.keys(ARTIFACTS.horisontal ||  {}).length !== 0) {
          turn.links[newstepid].horisontal = 'horisontal2';
        }
        return newstep;
      };
      game.selectdrop2instruction = function(step) {
        return '';
      };
      game.uphill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.uphill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'uphill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'uphill',
          path: step.path.concat('uphill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.uphill2instruction = function(step) {
        return '';
      };
      game.downhill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.downhill) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'downhill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'downhill',
          path: step.path.concat('downhill'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.downhill2instruction = function(step) {
        return '';
      };
      game.horisontal2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.horisontal) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'horisontal';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'horisontal',
          path: step.path.concat('horisontal'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.horisontal2instruction = function(step) {
        return '';
      };
      game.vertical2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        for (var POS in UNITLAYERS.markers) {
          delete UNITDATA[(UNITLAYERS.units[POS]  || {}).id];
        }
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdrop'],
          id: newunitid,
          group: 'soldiers',
          owner: player
        };
        for (var POS in ARTIFACTS.vertical) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'markers',
            owner: 0
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var allowedsteps = UNITLAYERS.myunits;
        var walkstarts = UNITLAYERS.myunits;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((3 === WALKLENGTH)) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'vertical';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'vertical',
          path: step.path.concat('vertical'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(UNITLAYERS.markers ||  {}).length === 0) {
          turn.blockedby = "nolegal";
        } else
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.vertical2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "FOOBAR": {},
          "vertical": {},
          "uphill": {},
          "horisontal": {},
          "downhill": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "markers": {},
          "mymarkers": {},
          "oppmarkers": {},
          "neutralmarkers": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in (Object.keys(UNITLAYERS.markers ||  {}).length === 0 ? BOARD.board : UNITLAYERS.markers)) {
          newlinks[linkpos] = 'selectdrop2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), daggers: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "bases": "playercolour"
      },
      "icons": {
        "daggers": "bishops",
        "crowns": "kings"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "bases": {
          "1": [
            ["rect", "a8", "h8"]
          ],
          "2": [
            ["rect", "a1", "h1"]
          ]
        }
      }
    };
    game.AI = [];
    game.id = "daggers";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "bases": {
          "1": [
            ["rect", "a8", "h8"]
          ],
          "2": [
            ["rect", "a1", "h1"]
          ]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "crowns": {
            "1": ["d8", "e8"],
            "2": ["c1", "f1"]
          },
          "daggers": {
            "1": [
              ["rect", "c7", "f7"]
            ],
            "2": ["c3", "f3", ["rect", "b2", "g2"]]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              if (!(UNITLAYERS.myunits[POS])) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        } else {
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [8, 1, 2, 4, 5, 6];
          for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
            var POS = STARTPOS;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              LENGTH++;
              ARTIFACTS['movetarget'][POS] = {};
            }
            if (BLOCKS[POS]) {
              if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetarget) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "crowns": {},
          "mycrowns": {},
          "oppcrowns": {},
          "neutralcrowns": {},
          "daggers": {},
          "mydaggers": {},
          "oppdaggers": {},
          "neutraldaggers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetarget": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mycrowns,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetarget": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "crowns": {},
          "mycrowns": {},
          "oppcrowns": {},
          "neutralcrowns": {},
          "daggers": {},
          "mydaggers": {},
          "oppdaggers": {},
          "neutraldaggers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              if (!(UNITLAYERS.myunits[POS])) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        } else {
          var BLOCKS = UNITLAYERS.units;
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [8, 1, 2, 4, 5, 6];
          for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
            var POS = STARTPOS;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              LENGTH++;
              ARTIFACTS['movetarget'][POS] = {};
            }
            if (BLOCKS[POS]) {
              if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                ARTIFACTS['movetarget'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetarget) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "crowns": {},
          "mycrowns": {},
          "oppcrowns": {},
          "neutralcrowns": {},
          "daggers": {},
          "mydaggers": {},
          "oppdaggers": {},
          "neutraldaggers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetarget": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mycrowns,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetarget": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "crowns": {},
          "mycrowns": {},
          "oppcrowns": {},
          "neutralcrowns": {},
          "daggers": {},
          "mydaggers": {},
          "oppdaggers": {},
          "neutraldaggers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), gogol: (
  function() {
    var game = {};
    game.commands = {
      "deploy": 1,
      "move": 1,
      "jump": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "kings": "kings",
        "soldiers": "pawns"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a8", "h8"]
          ]
        },
        "edges": [
          ["rect", "a1", "a8"],
          ["rect", "h1", "h8"],
          ["rect", "b8", "g8"],
          ["rect", "b1", "g1"]
        ]
      }
    };
    game.AI = [];
    game.id = "gogol";
    var boardDef = {
      "height": 8,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a8", "h8"]
          ]
        },
        "edges": [
          ["rect", "a1", "a8"],
          ["rect", "h1", "h8"],
          ["rect", "b8", "g8"],
          ["rect", "b1", "g1"]
        ]
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
            "soldiers": {
              "1": [
                ["rect", "a1", "h1"]
              ],
              "2": [
                ["rect", "a8", "h8"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectkingdeploy1 = function(turn, step, markpos) {
        var MARKS = {
          selectkingdeploy: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkingdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy1';
        return newstep;
      };
      game.selectkingdeploy1instruction = function(step) {
        return '';
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          kingwalk: Object.assign({}, step.ARTIFACTS.kingwalk),
          adjacentenemies: Object.assign({}, step.ARTIFACTS.adjacentenemies),
          willdie: Object.assign({}, step.ARTIFACTS.willdie),
          jumptargets: Object.assign({}, step.ARTIFACTS.jumptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.mykings,
              s1 = ARTIFACTS.selectunit;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS['kingwalk'][POS] = {};
              }
            }
          }
        }
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['adjacentenemies'][POS] = {
              dir: DIR
            };
          }
        }
        for (var STARTPOS in ARTIFACTS.adjacentenemies) {
          var DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})['dir'] - 2 + 1];
          var POS = connections[STARTPOS][DIR];
          if (POS && !
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.units,
                s1 = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            var NEIGHBOURCOUNT = 1;
            ARTIFACTS['jumptargets'][POS] = {
              dir: DIR
            };
          }
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS['willdie'][STARTPOS] = {
              dir: DIR
            };
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.kingwalk :
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 =
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.units,
                    s1 =
                    (function() {
                      var k, ret = {},
                        s0 = ARTIFACTS.nosoldiers,
                        s1 = ARTIFACTS.jumptargets;
                      for (k in s0) {
                        ret[k] = 1;
                      }
                      for (k in s1) {
                        ret[k] = 1;
                      }
                      return ret;
                    }());
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()))) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.jumptargets) {
          newlinks[linkpos] = 'selectjumptarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.selectjumptarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          splashed: Object.assign({}, step.ARTIFACTS.splashed)
        });
        var MARKS = {
          selectjumptarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var filtersourcelayer = ARTIFACTS.willdie;
        var filtertargetlayer = ARTIFACTS.splashed;
        for (var POS in filtersourcelayer) {
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS['selectjumptarget']] || {})['dir']) {
              filtertargetlayer[POS] = filterobj;
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectjumptarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].jump = 'jump1';
        return newstep;
      };
      game.selectjumptarget1instruction = function(step) {
        return '';
      };
      game.deploy1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectkingdeploy'],
          id: newunitid,
          group: 'kings',
          owner: player
        };
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'deploy';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'deploy',
          path: step.path.concat('deploy'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.jump1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]]  || {}).id];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectjumptarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'jump';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jump',
          path: step.path.concat('jump')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jump1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        for (var STARTPOS in
            (function() {
              var ret = {},
                s0 = TERRAIN.edges,
                s1 = UNITLAYERS.mysoldiers;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          var neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              ARTIFACTS['nokings'][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.mykings) {
          var neighbourdirs = [1, 3, 5, 7];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
              ARTIFACTS['nosoldiers'][POS] = {};
            }
          }
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        if ((turn.turn > 2)) {
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.myunits) {
            newlinks[linkpos] = 'selectunit1';
          }
        } else {
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 =
                  (function() {
                    var k, ret = {},
                      s0 = UNITLAYERS.units,
                      s1 = ARTIFACTS.nokings;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectkingdeploy1';
          }
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectkingdeploy2 = function(turn, step, markpos) {
        var MARKS = {
          selectkingdeploy: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkingdeploy'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy2';
        return newstep;
      };
      game.selectkingdeploy2instruction = function(step) {
        return '';
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          kingwalk: Object.assign({}, step.ARTIFACTS.kingwalk),
          adjacentenemies: Object.assign({}, step.ARTIFACTS.adjacentenemies),
          willdie: Object.assign({}, step.ARTIFACTS.willdie),
          jumptargets: Object.assign({}, step.ARTIFACTS.jumptargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var walkstarts =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.mykings,
              s1 = ARTIFACTS.selectunit;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
              if (!ARTIFACTS.nokings[POS]) {
                ARTIFACTS['kingwalk'][POS] = {};
              }
            }
          }
        }
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['adjacentenemies'][POS] = {
              dir: DIR
            };
          }
        }
        for (var STARTPOS in ARTIFACTS.adjacentenemies) {
          var DIR = relativedirs[(ARTIFACTS.adjacentenemies[STARTPOS] || {})['dir'] - 2 + 1];
          var POS = connections[STARTPOS][DIR];
          if (POS && !
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.units,
                s1 = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.nokings : ARTIFACTS.nosoldiers);
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            var NEIGHBOURCOUNT = 1;
            ARTIFACTS['jumptargets'][POS] = {
              dir: DIR
            };
          }
          if (!!NEIGHBOURCOUNT) {
            ARTIFACTS['willdie'][STARTPOS] = {
              dir: DIR
            };
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? ARTIFACTS.kingwalk :
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 =
                (function() {
                  var k, ret = {},
                    s0 = UNITLAYERS.units,
                    s1 =
                    (function() {
                      var k, ret = {},
                        s0 = ARTIFACTS.nosoldiers,
                        s1 = ARTIFACTS.jumptargets;
                      for (k in s0) {
                        ret[k] = 1;
                      }
                      for (k in s1) {
                        ret[k] = 1;
                      }
                      return ret;
                    }());
                  for (k in s0) {
                    ret[k] = 1;
                  }
                  for (k in s1) {
                    ret[k] = 1;
                  }
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()))) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.jumptargets) {
          newlinks[linkpos] = 'selectjumptarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.selectjumptarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          splashed: Object.assign({}, step.ARTIFACTS.splashed)
        });
        var MARKS = {
          selectjumptarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var filtersourcelayer = ARTIFACTS.willdie;
        var filtertargetlayer = ARTIFACTS.splashed;
        for (var POS in filtersourcelayer) {
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (filterobj.dir === (ARTIFACTS.jumptargets[MARKS['selectjumptarget']] || {})['dir']) {
              filtertargetlayer[POS] = filterobj;
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectjumptarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].jump = 'jump2';
        return newstep;
      };
      game.selectjumptarget2instruction = function(step) {
        return '';
      };
      game.deploy2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectkingdeploy'],
          id: newunitid,
          group: 'kings',
          owner: player
        };
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'deploy';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'deploy',
          path: step.path.concat('deploy'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.jump2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]]  || {}).id];
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectjumptarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var newstepid = step.stepid + '-' + 'jump';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jump',
          path: step.path.concat('jump')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else
        if (((turn.turn > 2) && Object.keys(UNITLAYERS.oppkings ||  {}).length === 0)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'kingkill';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jump2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "nokings": {},
          "nosoldiers": {},
          "kingwalk": {},
          "adjacentenemies": {},
          "splashed": {},
          "willdie": {},
          "jumptargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        for (var STARTPOS in
            (function() {
              var ret = {},
                s0 = TERRAIN.edges,
                s1 = UNITLAYERS.mysoldiers;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          var neighbourdirs = (!!(TERRAIN.homerow[STARTPOS]) ? [1, 3, 5, 7] : [1, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS) {
              ARTIFACTS['nokings'][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.mykings) {
          var neighbourdirs = [1, 3, 5, 7];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && (!!(TERRAIN.homerow[POS]) || (!!(TERRAIN.edges[STARTPOS]) && !!(TERRAIN.edges[POS])))) {
              ARTIFACTS['nosoldiers'][POS] = {};
            }
          }
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        if ((turn.turn > 2)) {
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.myunits) {
            newlinks[linkpos] = 'selectunit2';
          }
        } else {
          var newlinks = turn.links.root;
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = BOARD.board,
                  s1 =
                  (function() {
                    var k, ret = {},
                      s0 = UNITLAYERS.units,
                      s1 = ARTIFACTS.nokings;
                    for (k in s0) {
                      ret[k] = 1;
                    }
                    for (k in s1) {
                      ret[k] = 1;
                    }
                    return ret;
                  }());
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectkingdeploy2';
          }
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), jostle: (
  function() {
    var game = {};
    game.commands = {
      "jostle": 1
    };
    game.graphics = {
      "icons": {
        "checkers": "pawns"
      }
    };
    game.board = {
      "height": 10,
      "width": 10
    };
    game.AI = [];
    game.id = "jostle";
    var boardDef = {
      "height": 10,
      "width": 10
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "checkers": {
            "1": ["c4", "c6", "c8", "d3", "d5", "d7", "e4", "e8", "f3", "f7", "g4", "g6", "g8", "h3", "h5", "h7"],
            "2": ["c3", "c5", "c7", "d4", "d6", "d8", "e3", "e7", "f4", "f8", "g3", "g5", "g7", "h4", "h6", "h8"]
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          initialenemy: Object.assign({}, step.ARTIFACTS.initialenemy),
          initialfriend: Object.assign({}, step.ARTIFACTS.initialfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS[(!(UNITLAYERS.units[POS]) ? 'movetargets' : (!!(UNITLAYERS.oppunits[POS]) ? 'initialenemy' : 'initialfriend'))][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('The current position is worth ' + '') + (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length));
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          newenemy: Object.assign({}, step.ARTIFACTS.newenemy),
          newfriend: Object.assign({}, step.ARTIFACTS.newfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'newenemy' : 'newfriend')][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length) > Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)) {
          turn.links[newstepid].jostle = 'jostle1';
        }
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('That position would be worth ' + '') + (Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)));
      };
      game.jostle1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var newstepid = step.stepid + '-' + 'jostle';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jostle',
          path: step.path.concat('jostle')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jostle1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycheckers) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return 'Select which unit to jostle!';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          initialenemy: Object.assign({}, step.ARTIFACTS.initialenemy),
          initialfriend: Object.assign({}, step.ARTIFACTS.initialfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS) {
            ARTIFACTS[(!(UNITLAYERS.units[POS]) ? 'movetargets' : (!!(UNITLAYERS.oppunits[POS]) ? 'initialenemy' : 'initialfriend'))][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('The current position is worth ' + '') + (Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length));
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          newenemy: Object.assign({}, step.ARTIFACTS.newenemy),
          newfriend: Object.assign({}, step.ARTIFACTS.newfriend)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.units[POS]) {
            ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'newenemy' : 'newfriend')][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length) > Object.keys(ARTIFACTS.initialfriend).length - Object.keys(ARTIFACTS.initialenemy).length)) {
          turn.links[newstepid].jostle = 'jostle2';
        }
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        var ARTIFACTS = step.ARTIFACTS;
        return (('That position would be worth ' + '') + (Object.keys(ARTIFACTS.newfriend).length - (1 + Object.keys(ARTIFACTS.newenemy).length)));
      };
      game.jostle2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var newstepid = step.stepid + '-' + 'jostle';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'jostle',
          path: step.path.concat('jostle')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.jostle2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "initialenemy": {},
          "initialfriend": {},
          "newenemy": {},
          "newfriend": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "checkers": {},
          "mycheckers": {},
          "oppcheckers": {},
          "neutralcheckers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycheckers) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return 'Select which unit to jostle!';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), kickrun: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "corners": "playercolour"
      },
      "icons": {
        "runners": "bishops",
        "sidekickers": "pawns"
      }
    };
    game.board = {
      "height": 5,
      "width": 5,
      "terrain": {
        "corners": {
          "1": ["a1"],
          "2": ["e5"]
        }
      }
    };
    game.AI = [];
    game.id = "kickrun";
    var boardDef = {
      "height": 5,
      "width": 5,
      "terrain": {
        "corners": {
          "1": ["a1"],
          "2": ["e5"]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "runners": {
            "1": ["a2", "b1"],
            "2": ["d5", "e4"]
          },
          "sidekickers": {
            "1": ["a1", "c1", "a3"],
            "2": ["c5", "e5", "e3"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = (!!(UNITLAYERS.myrunners[MARKS['selectunit']]) ? [1, 2, 3] : [8, 1, 3, 4]);
        var nbrofwalkerdirs = allwalkerdirs.length;
        for (var walkerdirnbr = 0; walkerdirnbr < nbrofwalkerdirs; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var MAX = (!!(UNITLAYERS.myrunners[MARKS['selectunit']]) ? 4 : 1);
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            LENGTH++;
            if (((DIR !== 8) && (DIR !== 4))) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
          if (BLOCKS[POS]) {
            if ((!!(UNITLAYERS.oppunits[POS]) && ((DIR === 8) || (DIR === 4)))) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "runners": {},
          "myrunners": {},
          "opprunners": {},
          "neutralrunners": {},
          "sidekickers": {},
          "mysidekickers": {},
          "oppsidekickers": {},
          "neutralsidekickers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myrunners,
                s1 = TERRAIN.oppcorners;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "runners": {},
          "myrunners": {},
          "opprunners": {},
          "neutralrunners": {},
          "sidekickers": {},
          "mysidekickers": {},
          "oppsidekickers": {},
          "neutralsidekickers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = (!!(UNITLAYERS.myrunners[MARKS['selectunit']]) ? [5, 6, 7] : [4, 5, 7, 8]);
        var nbrofwalkerdirs = allwalkerdirs.length;
        for (var walkerdirnbr = 0; walkerdirnbr < nbrofwalkerdirs; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var MAX = (!!(UNITLAYERS.myrunners[MARKS['selectunit']]) ? 4 : 1);
          var POS = STARTPOS;
          var LENGTH = 0;
          while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            LENGTH++;
            if (((DIR !== 8) && (DIR !== 4))) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
          if (BLOCKS[POS]) {
            if ((!!(UNITLAYERS.oppunits[POS]) && ((DIR === 8) || (DIR === 4)))) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "runners": {},
          "myrunners": {},
          "opprunners": {},
          "neutralrunners": {},
          "sidekickers": {},
          "mysidekickers": {},
          "oppsidekickers": {},
          "neutralsidekickers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myrunners,
                s1 = TERRAIN.oppcorners;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "runners": {},
          "myrunners": {},
          "opprunners": {},
          "neutralrunners": {},
          "sidekickers": {},
          "mysidekickers": {},
          "oppsidekickers": {},
          "neutralsidekickers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), krieg: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "corners": "playercolour",
        "bases": "castle"
      },
      "icons": {
        "notfrozens": "knights",
        "frozens": "rooks"
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
    var boardDef = {
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
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.brain_Fred_1 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myfrozenguardedthreat = {};
        ARTIFACTS.myfrozenfreethreat = {};
        ARTIFACTS.mymoverguardedthreat = {};
        ARTIFACTS.mymoverfreethreat = {};
        ARTIFACTS.oppfrozenguardedthreat = {};
        ARTIFACTS.oppfrozenfreethreat = {};
        ARTIFACTS.oppmoverguardedthreat = {};
        ARTIFACTS.oppmoverfreethreat = {};
        for (var STARTPOS in UNITLAYERS.myunits) {
          var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.oppunits) {
          var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
            }
          }
        }
        return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myfrozens,
              s1 = TERRAIN.oppbases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length + 6 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynotfrozens,
              s1 = TERRAIN.oppbases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.oppfrozens,
              s1 = TERRAIN.mybases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length - 6 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.oppnotfrozens,
              s1 = TERRAIN.mybases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length;
      };
      game.brain_Fred_1_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myfrozenguardedthreat = {};
        ARTIFACTS.myfrozenfreethreat = {};
        ARTIFACTS.mymoverguardedthreat = {};
        ARTIFACTS.mymoverfreethreat = {};
        ARTIFACTS.oppfrozenguardedthreat = {};
        ARTIFACTS.oppfrozenfreethreat = {};
        ARTIFACTS.oppmoverguardedthreat = {};
        ARTIFACTS.oppmoverfreethreat = {};
        for (var STARTPOS in UNITLAYERS.myunits) {
          var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [4] : [3, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.oppunits) {
          var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [8] : [7, 1]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
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
              var ret = {},
                s0 = UNITLAYERS.myfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length,
          myfreeinfiltrators: 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mynotfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
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
              var ret = {},
                s0 = UNITLAYERS.oppfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length,
          oppfreeinfiltrators: -6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppnotfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length
        };
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmove1 = function(turn, step, markpos) {
        var MARKS = {
          selectmove: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmove'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmove1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in UNITLAYERS.myfrozens) {
          LOOPID = UNITLAYERS.myfrozens[POS].id
          UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
            'group': 'notfrozens'
          });
          // TODO - check that it uses ['loopid'] ?
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'frozens'
          });
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmove']
          });
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = TERRAIN.oppcorners,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'cornerinfiltration';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.oppbases,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length === 2)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'occupation';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mynotfrozens) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.brain_Fred_2 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myfrozenguardedthreat = {};
        ARTIFACTS.myfrozenfreethreat = {};
        ARTIFACTS.mymoverguardedthreat = {};
        ARTIFACTS.mymoverfreethreat = {};
        ARTIFACTS.oppfrozenguardedthreat = {};
        ARTIFACTS.oppfrozenfreethreat = {};
        ARTIFACTS.oppmoverguardedthreat = {};
        ARTIFACTS.oppmoverfreethreat = {};
        for (var STARTPOS in UNITLAYERS.myunits) {
          var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.oppunits) {
          var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
            }
          }
        }
        return Object.keys(ARTIFACTS.myfrozenguardedthreat).length + 2 * Object.keys(ARTIFACTS.myfrozenfreethreat).length + 3 * Object.keys(ARTIFACTS.mymoverguardedthreat).length + 4 * Object.keys(ARTIFACTS.mymoverfreethreat).length + 5 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.myfrozens,
              s1 = TERRAIN.oppbases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length + 6 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.mynotfrozens,
              s1 = TERRAIN.oppbases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length - Object.keys(ARTIFACTS.oppfrozenguardedthreat).length - 2 * Object.keys(ARTIFACTS.oppfrozenfreethreat).length - 3 * Object.keys(ARTIFACTS.oppmoverguardedthreat).length - 4 * Object.keys(ARTIFACTS.oppmoverfreethreat).length - 5 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.oppfrozens,
              s1 = TERRAIN.mybases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length - 6 * Object.keys(
          (function() {
            var ret = {},
              s0 = UNITLAYERS.oppnotfrozens,
              s1 = TERRAIN.mybases;
            for (var key in s0) {
              if (s1[key]) {
                ret[key] = s0[key];
              }
            }
            return ret;
          }())).length;
      };
      game.brain_Fred_2_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.myfrozenguardedthreat = {};
        ARTIFACTS.myfrozenfreethreat = {};
        ARTIFACTS.mymoverguardedthreat = {};
        ARTIFACTS.mymoverfreethreat = {};
        ARTIFACTS.oppfrozenguardedthreat = {};
        ARTIFACTS.oppfrozenfreethreat = {};
        ARTIFACTS.oppmoverguardedthreat = {};
        ARTIFACTS.oppmoverfreethreat = {};
        for (var STARTPOS in UNITLAYERS.myunits) {
          var neighbourdirs = (!!(TERRAIN.oppbases[STARTPOS]) ? [8] : [7, 1]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.myfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'myfrozenguardedthreat' : 'myfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'mymoverguardedthreat' : 'mymoverfreethreat'))][POS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.oppunits) {
          var neighbourdirs = (!!(TERRAIN.mybases[STARTPOS]) ? [4] : [3, 5]);
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
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
              ARTIFACTS[(!!(UNITLAYERS.oppfrozens[STARTPOS]) ? (!!(UNITLAYERS.units[POS]) ? 'oppfrozenguardedthreat' : 'oppfrozenfreethreat') : (!!(UNITLAYERS.units[POS]) ? 'oppmoverguardedthreat' : 'oppmoverfreethreat'))][POS] = {};
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
              var ret = {},
                s0 = UNITLAYERS.myfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length,
          myfreeinfiltrators: 6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.mynotfrozens,
                s1 = TERRAIN.oppbases;
              for (var key in s0) {
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
              var ret = {},
                s0 = UNITLAYERS.oppfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length,
          oppfreeinfiltrators: -6 * Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.oppnotfrozens,
                s1 = TERRAIN.mybases;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length
        };
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmove2 = function(turn, step, markpos) {
        var MARKS = {
          selectmove: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmove'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmove2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var LOOPID;
        for (var POS in UNITLAYERS.myfrozens) {
          LOOPID = UNITLAYERS.myfrozens[POS].id
          UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
            'group': 'notfrozens'
          });
          // TODO - check that it uses ['loopid'] ?
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'frozens'
          });
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmove']
          });
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = TERRAIN.oppcorners,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'cornerinfiltration';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.oppbases,
                s1 = UNITLAYERS.myunits;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length === 2)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'occupation';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mynotfrozens) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), murusgallicus: (
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "kill": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "towers": "rooks",
        "walls": "pawns"
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
    var boardDef = {
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
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
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
      var TERRAIN = terrainLayers(boardDef, 1, {
        "threatrow": {
          "1": [
            ["rect", "a3", "h3"]
          ],
          "2": [
            ["rect", "a5", "h5"]
          ]
        }
      });
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      var mybasic = {
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
      var oppbasic = {
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        ARTIFACTS.oppheavythreats = {};
        ARTIFACTS.opplightthreats = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        var filtersourcelayer = TERRAIN.mythreatrow;
        for (var POS in filtersourcelayer) {
          var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (!!(ARTIFACTS.oppmoves[POS])) {
              filtertargetlayer[POS] = filterobj;
            }
          }
        }
        return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - 10000 * Object.keys(
          (function() {
            var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        ARTIFACTS.oppheavythreats = {};
        ARTIFACTS.opplightthreats = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        var filtersourcelayer = TERRAIN.mythreatrow;
        for (var POS in filtersourcelayer) {
          var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (!!(ARTIFACTS.oppmoves[POS])) {
              filtertargetlayer[POS] = filterobj;
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
              var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - 100 * Object.keys(
          (function() {
            var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
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
              var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.mymoves = {};
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.mytowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['mymoves'][POS] = {};
              }
            }
          }
        }
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - Object.keys(ARTIFACTS.oppmoves).length;
      };
      game.brain_Clive_1_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.mymoves = {};
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.mytowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['mymoves'][POS] = {};
              }
            }
          }
        }
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
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
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
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
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill1';
        }
        return newstep;
      };
      game.selecttower1instruction = function(step) {
        return '';
      };
      game.selectmove1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? 'madetowers' : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? 'madetowers' : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmove1instruction = function(step) {
        return '';
      };
      game.selectkill1 = function(turn, step, markpos) {
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill1';
        return newstep;
      };
      game.selectkill1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'walls',
            owner: 1,
            from: MARKS['selecttower']
          };
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.kill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'kill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2, {
        "threatrow": {
          "1": [
            ["rect", "a3", "h3"]
          ],
          "2": [
            ["rect", "a5", "h5"]
          ]
        }
      });
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      var oppbasic = {
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
      var mybasic = {
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        ARTIFACTS.oppheavythreats = {};
        ARTIFACTS.opplightthreats = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        var filtersourcelayer = TERRAIN.mythreatrow;
        for (var POS in filtersourcelayer) {
          var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (!!(ARTIFACTS.oppmoves[POS])) {
              filtertargetlayer[POS] = filterobj;
            }
          }
        }
        return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - 10000 * Object.keys(
          (function() {
            var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        ARTIFACTS.oppheavythreats = {};
        ARTIFACTS.opplightthreats = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        var filtersourcelayer = TERRAIN.mythreatrow;
        for (var POS in filtersourcelayer) {
          var filtertargetlayer = ARTIFACTS[(!!(UNITLAYERS.oppwalls[POS]) ? 'oppheavythreats' : 'opplightthreats')];
          if (filtersourcelayer[POS]) {
            var filterobj = filtersourcelayer[POS];
            if (!!(ARTIFACTS.oppmoves[POS])) {
              filtertargetlayer[POS] = filterobj;
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
              var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        return 2 * Object.keys(UNITLAYERS.mytowers).length + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + 2 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - 100 * Object.keys(
          (function() {
            var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
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
              var k, ret = {},
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
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.mymoves = {};
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.mytowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['mymoves'][POS] = {};
              }
            }
          }
        }
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
              }
            }
          }
        }
        return Object.keys(ARTIFACTS.mymoves).length + 3 * Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) + Object.keys(UNITLAYERS.mytowers).reduce(function(mem, pos) {
          return mem + (mybasic[pos] || 0);
        }, 0) - Object.keys(ARTIFACTS.oppmoves).length;
      };
      game.brain_Clive_2_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        ARTIFACTS.mymoves = {};
        ARTIFACTS.oppmoves = {};
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.mytowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['mymoves'][POS] = {};
              }
            }
          }
        }
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var walkstarts = UNITLAYERS.opptowers;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
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
                ARTIFACTS['oppmoves'][POS] = {};
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
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
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
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
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
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppwalls[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill2';
        }
        return newstep;
      };
      game.selecttower2instruction = function(step) {
        return '';
      };
      game.selectmove2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? 'madetowers' : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? 'madetowers' : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmove2instruction = function(step) {
        return '';
      };
      game.selectkill2 = function(turn, step, markpos) {
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill2';
        return newstep;
      };
      game.selectkill2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'walls',
            owner: 2,
            from: MARKS['selecttower']
          };
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.kill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'kill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), murusgallicusadvanced: (
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "kill": 1,
      "sacrifice": 1,
      "fire": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "towers": "rooks",
        "walls": "pawns",
        "catapults": "queens"
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
    game.AI = [];
    game.id = "murusgallicusadvanced";
    var boardDef = {
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
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selecttower1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.oppunits,
              s1 = UNITLAYERS.mycatapults;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
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
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppcatapults,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill1';
        }
        return newstep;
      };
      game.selecttower1instruction = function(step) {
        return '';
      };
      game.selectmove1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? 'madecatapults' : 'madetowers') : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? (!!(UNITLAYERS.mytowers[MARKS['selectmove']]) ? 'madecatapults' : 'madetowers') : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmove1instruction = function(step) {
        return '';
      };
      game.selectkill1 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill1';
        if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
          turn.links[newstepid].sacrifice = 'sacrifice1';
        }
        return newstep;
      };
      game.selectkill1instruction = function(step) {
        return '';
      };
      game.selectcatapult1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectcatapult: markpos
        };
        var STARTPOS = MARKS['selectcatapult'];
        var allwalkerdirs = [7, 8, 1, 2, 3];
        for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
          var MAX = 3;
          var POS = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
            LENGTH++;
            STEP++;
            if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
              ARTIFACTS['firetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectcatapult'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.firetargets) {
          newlinks[linkpos] = 'selectfire1';
        }
        return newstep;
      };
      game.selectcatapult1instruction = function(step) {
        return '';
      };
      game.selectfire1 = function(turn, step, markpos) {
        var MARKS = {
          selectfire: markpos,
          selectcatapult: step.MARKS.selectcatapult
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfire'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire1';
        return newstep;
      };
      game.selectfire1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        for (var POS in ARTIFACTS.madecatapults) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'catapults'
            });
          }
        }
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'walls',
            owner: 1,
            from: MARKS['selecttower']
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.kill1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
          var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        } else {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'kill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill1instruction = function(step) {
        return '';
      };
      game.sacrifice1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'sacrifice';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'sacrifice',
          path: step.path.concat('sacrifice')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.sacrifice1instruction = function(step) {
        return '';
      };
      game.fire1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.oppwalls[MARKS['selectfire']])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]  || {}).id];
        } else {
          if (!!(UNITLAYERS.oppunits[MARKS['selectfire']])) {
            var unitid = (UNITLAYERS.units[MARKS['selectfire']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': (!!(UNITLAYERS.oppcatapults[MARKS['selectfire']]) ? 'towers' : 'walls')
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selectfire'],
              id: newunitid,
              group: 'walls',
              owner: 1,
              from: MARKS['selectcatapult']
            };
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectcatapult']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'towers'
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower1';
        }
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycatapults) {
          newlinks[linkpos] = 'selectcatapult1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selecttower2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
          killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selecttower: markpos
        };
        var BLOCKS =
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.oppunits,
              s1 = UNITLAYERS.mycatapults;
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }());
        var STARTPOS = MARKS['selecttower'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var DIR = allwalkerdirs[walkerdirnbr];
          var walkedsquares = [];
          var MAX = 2;
          var POS = STARTPOS;
          var LENGTH = 0;
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
              ARTIFACTS['movetargets'][POS] = {
                dir: DIR
              };
            }
          }
        }
        var STARTPOS = MARKS['selecttower'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS &&
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppcatapults,
                s1 = UNITLAYERS.oppwalls;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())[POS]) {
            ARTIFACTS['killtargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttower'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmove2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.killtargets) {
          newlinks[linkpos] = 'selectkill2';
        }
        return newstep;
      };
      game.selecttower2instruction = function(step) {
        return '';
      };
      game.selectmove2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
          madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
          madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmove: markpos,
          selecttower: step.MARKS.selecttower
        };
        var STARTPOS = MARKS['selectmove'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
        if (POS) {
          ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? 'madecatapults' : 'madetowers') : 'madewalls')][POS] = {};
        }
        ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? (!!(UNITLAYERS.mytowers[MARKS['selectmove']]) ? 'madecatapults' : 'madetowers') : 'madewalls')][STARTPOS] = {};
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmove2instruction = function(step) {
        return '';
      };
      game.selectkill2 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectkill: markpos,
          selecttower: step.MARKS.selecttower
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectkill'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].kill = 'kill2';
        if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
          turn.links[newstepid].sacrifice = 'sacrifice2';
        }
        return newstep;
      };
      game.selectkill2instruction = function(step) {
        return '';
      };
      game.selectcatapult2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectcatapult: markpos
        };
        var STARTPOS = MARKS['selectcatapult'];
        var allwalkerdirs = [3, 4, 5, 6, 7];
        for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
          var MAX = 3;
          var POS = STARTPOS;
          var LENGTH = 0;
          var STEP = 0;
          while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
            LENGTH++;
            STEP++;
            if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
              ARTIFACTS['firetargets'][POS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectcatapult'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.firetargets) {
          newlinks[linkpos] = 'selectfire2';
        }
        return newstep;
      };
      game.selectcatapult2instruction = function(step) {
        return '';
      };
      game.selectfire2 = function(turn, step, markpos) {
        var MARKS = {
          selectfire: markpos,
          selectcatapult: step.MARKS.selectcatapult
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectfire'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].fire = 'fire2';
        return newstep;
      };
      game.selectfire2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        for (var POS in ARTIFACTS.madecatapults) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'catapults'
            });
          }
        }
        for (var POS in ARTIFACTS.madetowers) {
          var unitid = (UNITLAYERS.units[POS]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        }
        for (var POS in ARTIFACTS.madewalls) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: POS,
            id: newunitid,
            group: 'walls',
            owner: 2,
            from: MARKS['selecttower']
          };
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.kill2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
          var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
        } else {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'kill';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.kill2instruction = function(step) {
        return '';
      };
      game.sacrifice2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'walls'
          });
        }
        delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'sacrifice';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'sacrifice',
          path: step.path.concat('sacrifice')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.sacrifice2instruction = function(step) {
        return '';
      };
      game.fire2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.oppwalls[MARKS['selectfire']])) {
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]  || {}).id];
        } else {
          if (!!(UNITLAYERS.oppunits[MARKS['selectfire']])) {
            var unitid = (UNITLAYERS.units[MARKS['selectfire']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': (!!(UNITLAYERS.oppcatapults[MARKS['selectfire']]) ? 'towers' : 'walls')
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selectfire'],
              id: newunitid,
              group: 'walls',
              owner: 2,
              from: MARKS['selectcatapult']
            };
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectcatapult']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'towers'
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var newstepid = step.stepid + '-' + 'fire';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'fire',
          path: step.path.concat('fire'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.opphomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.fire2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "firetargets": {},
          "movetargets": {},
          "madecatapults": {},
          "madetowers": {},
          "madewalls": {},
          "killtargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "towers": {},
          "mytowers": {},
          "opptowers": {},
          "neutraltowers": {},
          "catapults": {},
          "mycatapults": {},
          "oppcatapults": {},
          "neutralcatapults": {},
          "walls": {},
          "mywalls": {},
          "oppwalls": {},
          "neutralwalls": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mytowers) {
          newlinks[linkpos] = 'selecttower2';
        }
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.mycatapults) {
          newlinks[linkpos] = 'selectcatapult2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), orthokon: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns"
      }
    };
    game.board = {
      "height": 4,
      "width": 4
    };
    game.AI = ["Bob"];
    game.id = "orthokon";
    var boardDef = {
      "height": 4,
      "width": 4
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": [
              ["rect", "a1", "d1"]
            ],
            "2": [
              ["rect", "a4", "d4"]
            ]
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.brain_Bob_1 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        return Object.keys(UNITLAYERS.myunits).length;
      };
      game.brain_Bob_1_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        return {
          headcount: Object.keys(UNITLAYERS.myunits).length
        };
      };
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH - 1]] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          victims: Object.assign({}, step.ARTIFACTS.victims)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['victims'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        var LOOPID;
        for (var POS in ARTIFACTS.victims) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'owner': 1
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "victims": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "victims": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.brain_Bob_2 = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        return Object.keys(UNITLAYERS.myunits).length;
      };
      game.brain_Bob_2_detailed = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        var ARTIFACTS = step.ARTIFACTS;
        return {
          headcount: Object.keys(UNITLAYERS.myunits).length
        };
      };
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var BLOCKS = UNITLAYERS.units;
        var STARTPOS = MARKS['selectunit'];
        var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
          var walkedsquares = [];
          var POS = STARTPOS;
          while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && !BLOCKS[POS]) {
            walkedsquares.push(POS);
          }
          var WALKLENGTH = walkedsquares.length;
          if (WALKLENGTH) {
            ARTIFACTS['movetargets'][walkedsquares[WALKLENGTH - 1]] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          victims: Object.assign({}, step.ARTIFACTS.victims)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectmovetarget'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && UNITLAYERS.oppunits[POS]) {
            ARTIFACTS['victims'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        var LOOPID;
        for (var POS in ARTIFACTS.victims) {
          if (LOOPID = (UNITLAYERS.units[POS] || {}).id) {
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'owner': 2
            });
            // TODO - check that it uses ['loopid'] ?
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "victims": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "victims": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), semaphor: (
  function() {
    var game = {};
    game.commands = {
      "deploy": 1,
      "promote": 1
    };
    game.graphics = {
      "icons": {
        "kings": "kings",
        "pawns": "pawns",
        "bishops": "bishops"
      }
    };
    game.board = {
      "width": 4,
      "height": 3
    };
    game.AI = [];
    game.id = "semaphor";
    var boardDef = {
      "width": 4,
      "height": 3
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({})
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectdeploytarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectdeploytarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeploytarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy1';
        return newstep;
      };
      game.selectdeploytarget1instruction = function(step) {
        return '';
      };
      game.selectunit1 = function(turn, step, markpos) {
        var MARKS = {
          selectunit: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].promote = 'promote1';
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.deploy1 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdeploytarget'],
          id: newunitid,
          group: 'pawns',
          owner: 0
        };
        MARKS = {};
        UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "line": {}
        };
        var walkstarts = UNITLAYERS.units;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['line'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'deploy';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'deploy',
          path: step.path.concat('deploy'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy1instruction = function(step) {
        return '';
      };
      game.promote1 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? 'bishops' : 'kings')
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "line": {}
        };
        var walkstarts = UNITLAYERS.units;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['line'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'promote';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'promote',
          path: step.path.concat('promote')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.promote1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "line": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 = UNITLAYERS.units;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectdeploytarget1';
        }
        var newlinks = turn.links.root;
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.pawns,
                s1 = UNITLAYERS.bishops;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectdeploytarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectdeploytarget: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeploytarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].deploy = 'deploy2';
        return newstep;
      };
      game.selectdeploytarget2instruction = function(step) {
        return '';
      };
      game.selectunit2 = function(turn, step, markpos) {
        var MARKS = {
          selectunit: markpos
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].promote = 'promote2';
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.deploy2 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        var newunitid = 'spawn' + (clones++);
        UNITDATA[newunitid] = {
          pos: MARKS['selectdeploytarget'],
          id: newunitid,
          group: 'pawns',
          owner: 0
        };
        MARKS = {};
        UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "line": {}
        };
        var walkstarts = UNITLAYERS.units;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['line'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'deploy';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'deploy',
          path: step.path.concat('deploy'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.deploy2instruction = function(step) {
        return '';
      };
      game.promote2 = function(turn, step) {
        var ARTIFACTS = {
          line: Object.assign({}, step.ARTIFACTS.line)
        };
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': (!!(UNITLAYERS.pawns[MARKS['selectunit']]) ? 'bishops' : 'kings')
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "line": {}
        };
        var walkstarts = UNITLAYERS.units;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {})['group']];
          var allwalkerdirs = [1, 2, 3, 4];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              if ((WALKLENGTH > 1)) {
                ARTIFACTS['line'][POS] = {};
              }
            }
          }
        }
        var newstepid = step.stepid + '-' + 'promote';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'promote',
          path: step.path.concat('promote')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.line ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.promote2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "line": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "bishops": {},
          "mybishops": {},
          "oppbishops": {},
          "neutralbishops": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = BOARD.board,
                s1 = UNITLAYERS.units;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectdeploytarget2';
        }
        var newlinks = turn.links.root;
        for (var linkpos in
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.pawns,
                s1 = UNITLAYERS.bishops;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), serauqs: (
  function() {
    var game = {};
    game.commands = {
      "makewild": 1,
      "move": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "wild": "kings"
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
    var boardDef = {
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
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": [
              ["rect", "a1", "d1"]
            ],
            "2": [
              ["rect", "a4", "d4"]
            ]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        if ((3 > turn.turn)) {
          turn.links[newstepid].makewild = 'makewild1';
        } else {
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.movetargets) {
            newlinks[linkpos] = 'selectmovetarget1';
          }
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.makewild1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'wild'
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var newstepid = step.stepid + '-' + 'makewild';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'makewild',
          path: step.path.concat('makewild')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.corners,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madex';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.middle,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'tookcenter';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.makewild1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var allowedsteps =
          (function() {
            var k, ret = {},
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
        var walkstarts =
          (function() {
            var k, ret = {},
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
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            var walkpositionstocount = TERRAIN.mybase;
            var CURRENTCOUNT = 0;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
            }
            var WALKLENGTH = walkedsquares.length;
            var TOTALCOUNT = CURRENTCOUNT;
            if (((WALKLENGTH === 3) && (TOTALCOUNT !== 3))) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.corners,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madex';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.middle,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'tookcenter';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        if ((3 > turn.turn)) {
          turn.links[newstepid].makewild = 'makewild2';
        } else {
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.movetargets) {
            newlinks[linkpos] = 'selectmovetarget2';
          }
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.makewild2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'group': 'wild'
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var newstepid = step.stepid + '-' + 'makewild';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'makewild',
          path: step.path.concat('makewild')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.corners,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madex';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.middle,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'tookcenter';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.makewild2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var allowedsteps =
          (function() {
            var k, ret = {},
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
        var walkstarts =
          (function() {
            var k, ret = {},
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
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            var walkpositionstocount = TERRAIN.mybase;
            var CURRENTCOUNT = 0;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
            }
            var WALKLENGTH = walkedsquares.length;
            var TOTALCOUNT = CURRENTCOUNT;
            if (((WALKLENGTH === 3) && (TOTALCOUNT !== 3))) {
              ARTIFACTS['winline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.corners,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madex';
        } else
        if ((Object.keys(
            (function() {
              var ret = {},
                s0 = TERRAIN.middle,
                s1 =
                (function() {
                  var k, ret = {},
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
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())).length > 3)) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'tookcenter';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {},
          "winline": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
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
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), snijpunt: (
  function() {
    var game = {};
    game.commands = {
      "snipe": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "sniper": "kings"
      },
      "tiles": {
        "zone": "grass",
        "corner": "castle"
      }
    };
    game.board = {
      "height": 6,
      "width": 6,
      "terrain": {
        "zone": {
          "1": [
            ["rect", "b6", "f6", 5]
          ],
          "2": [
            ["rect", "a1", "a5", 3]
          ]
        },
        "corner": ["a6"]
      }
    };
    game.AI = [];
    game.id = "snijpunt";
    var boardDef = {
      "height": 6,
      "width": 6,
      "terrain": {
        "zone": {
          "1": [
            ["rect", "b6", "f6", 5]
          ],
          "2": [
            ["rect", "a1", "a5", 3]
          ]
        },
        "corner": ["a6"]
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({})
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selecttarget1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          intersection: Object.assign({}, step.ARTIFACTS.intersection)
        });
        var MARKS = {
          selecttarget: markpos
        };
        var STARTPOS = MARKS['selecttarget'];
        var POS = STARTPOS;
        while ((POS = connections[POS][5])) {
          if (ARTIFACTS.enemyline[POS]) {
            ARTIFACTS['intersection'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].snipe = 'snipe1';
        return newstep;
      };
      game.selecttarget1instruction = function(step) {
        return '';
      };
      game.snipe1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline),
          loseline: Object.assign({}, step.ARTIFACTS.loseline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selecttarget'],
            id: newunitid,
            group: 'sniper',
            owner: player
          };
        } else {
          var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selecttarget']
            });
          }
        }
        if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
          if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
            var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: Object.keys(ARTIFACTS.intersection)[0],
              id: newunitid,
              group: 'soldiers',
              owner: 1,
              from: MARKS['selecttarget']
            };
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "sniper": {},
          "mysniper": {},
          "oppsniper": {},
          "neutralsniper": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "winline": {},
          "loseline": {},
          "intersection": {},
          "enemyline": {},
          "potentialempties": {},
          "mandatory": {}
        };
        var walkstarts = UNITLAYERS.soldiers;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH > 2)) {
              ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'snipe';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'snipe',
          path: step.path.concat('snipe'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeoppline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.snipe1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "winline": {},
          "loseline": {},
          "intersection": {},
          "enemyline": {},
          "potentialempties": {},
          "mandatory": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "sniper": {},
          "mysniper": {},
          "oppsniper": {},
          "neutralsniper": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
          var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
          var POS = STARTPOS;
          while ((POS = connections[POS][3])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS['potentialempties'][POS] = {};
            }
            ARTIFACTS['enemyline'][POS] = {};
          }
          ARTIFACTS['enemyline'][STARTPOS] = {};
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS['potentialempties'][POS] = {};
            }
            ARTIFACTS['enemyline'][POS] = {};
          }
          var walkstarts = ARTIFACTS.potentialempties;
          for (var STARTPOS in walkstarts) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][1])) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
              }
            }
          }
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in (Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
            (function() {
              var ret = {},
                s0 = TERRAIN.myzone,
                s1 = UNITLAYERS.sniper;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) : ARTIFACTS.mandatory)) {
          newlinks[linkpos] = 'selecttarget1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        return (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0 ? 'Select initial sniper deployment' : 'Select where to snipe from');
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selecttarget2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          intersection: Object.assign({}, step.ARTIFACTS.intersection)
        });
        var MARKS = {
          selecttarget: markpos
        };
        var STARTPOS = MARKS['selecttarget'];
        var POS = STARTPOS;
        while ((POS = connections[POS][3])) {
          if (ARTIFACTS.enemyline[POS]) {
            ARTIFACTS['intersection'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selecttarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].snipe = 'snipe2';
        return newstep;
      };
      game.selecttarget2instruction = function(step) {
        return '';
      };
      game.snipe2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          winline: Object.assign({}, step.ARTIFACTS.winline),
          loseline: Object.assign({}, step.ARTIFACTS.loseline)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var clones = step.clones;
        var UNITLAYERS = step.UNITLAYERS;
        if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selecttarget'],
            id: newunitid,
            group: 'sniper',
            owner: player
          };
        } else {
          var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selecttarget']
            });
          }
        }
        if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
          if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
            var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
              });
            }
          } else {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: Object.keys(ARTIFACTS.intersection)[0],
              id: newunitid,
              group: 'soldiers',
              owner: 2,
              from: MARKS['selecttarget']
            };
          }
        }
        MARKS = {};
        UNITLAYERS = {
          "sniper": {},
          "mysniper": {},
          "oppsniper": {},
          "neutralsniper": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "winline": {},
          "loseline": {},
          "intersection": {},
          "enemyline": {},
          "potentialempties": {},
          "mandatory": {}
        };
        var walkstarts = UNITLAYERS.soldiers;
        for (var STARTPOS in walkstarts) {
          var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]]) && allowedsteps[POS]) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if ((WALKLENGTH > 2)) {
              ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'snipe';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'snipe',
          path: step.path.concat('snipe'),
          clones: clones
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeline';
        } else
        if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'madeoppline';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.snipe2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "winline": {},
          "loseline": {},
          "intersection": {},
          "enemyline": {},
          "potentialempties": {},
          "mandatory": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "sniper": {},
          "mysniper": {},
          "oppsniper": {},
          "neutralsniper": {},
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
          var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
          var POS = STARTPOS;
          while ((POS = connections[POS][5])) {
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS['potentialempties'][POS] = {};
            }
            ARTIFACTS['enemyline'][POS] = {};
          }
          ARTIFACTS['enemyline'][STARTPOS] = {};
          for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (!UNITLAYERS.units[POS]) {
              ARTIFACTS['potentialempties'][POS] = {};
            }
            ARTIFACTS['enemyline'][POS] = {};
          }
          var walkstarts = ARTIFACTS.potentialempties;
          for (var STARTPOS in walkstarts) {
            var walkedsquares = [];
            var POS = STARTPOS;
            while ((POS = connections[POS][7])) {
              walkedsquares.push(POS);
            }
            var WALKLENGTH = walkedsquares.length;
            if (WALKLENGTH) {
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
              }
            }
          }
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          clones: step.clones,
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in (Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
            (function() {
              var ret = {},
                s0 = TERRAIN.myzone,
                s1 = UNITLAYERS.sniper;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) : ARTIFACTS.mandatory)) {
          newlinks[linkpos] = 'selecttarget2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        var UNITLAYERS = step.UNITLAYERS;
        return (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0 ? 'Select initial sniper deployment' : 'Select where to snipe from');
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), threemusketeers: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "pawns": "pawns",
        "kings": "kings"
      }
    };
    game.board = {
      "height": 5,
      "width": 5
    };
    game.AI = [];
    game.id = "threemusketeers";
    var boardDef = {
      "height": 5,
      "width": 5
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    var TERRAIN = terrainLayers(boardDef, 0);
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "kings": {
            "1": ["a1", "c3", "e5"]
          },
          "pawns": {
            "2": [
              ["holerect", "a1", "e5", ["a1", "c3", "e5"]]
            ]
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
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !!(UNITLAYERS.oppunits[POS])) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          musketeerline: Object.assign({}, step.ARTIFACTS.musketeerline),
          strandedmusketeers: Object.assign({}, step.ARTIFACTS.strandedmusketeers)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "strandedmusketeers": {},
          "musketeerline": {},
          "movetargets": {}
        };
        var walkstarts = UNITLAYERS.kings;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 3, 5, 7];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var POS = STARTPOS;
            var walkpositionstocount = UNITLAYERS.kings;
            var CURRENTCOUNT = 0;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((2 === TOTALCOUNT)) {
              ARTIFACTS['musketeerline'][STARTPOS] = {};
            }
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.musketeerline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'musketeersinline';
        } else
        if ((Object.keys(ARTIFACTS.strandedmusketeers).length === 3)) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'strandedmusketeers';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "strandedmusketeers": {},
          "musketeerline": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !(UNITLAYERS.units[POS])) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          musketeerline: Object.assign({}, step.ARTIFACTS.musketeerline),
          strandedmusketeers: Object.assign({}, step.ARTIFACTS.strandedmusketeers)
        });
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "strandedmusketeers": {},
          "musketeerline": {},
          "movetargets": {}
        };
        var walkstarts = UNITLAYERS.kings;
        for (var STARTPOS in walkstarts) {
          var allwalkerdirs = [1, 3, 5, 7];
          for (var walkerdirnbr = 0; walkerdirnbr < 4; walkerdirnbr++) {
            var POS = STARTPOS;
            var walkpositionstocount = UNITLAYERS.kings;
            var CURRENTCOUNT = 0;
            while ((POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              CURRENTCOUNT += (walkpositionstocount[POS] ? 1 : 0);
            }
            var TOTALCOUNT = CURRENTCOUNT;
            if ((2 === TOTALCOUNT)) {
              ARTIFACTS['musketeerline'][STARTPOS] = {};
            }
          }
        }
        for (var STARTPOS in UNITLAYERS.kings) {
          var neighbourdirs = [1, 3, 5, 7];
          var foundneighbours = [];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && UNITLAYERS.pawns[POS]) {
              foundneighbours.push(POS);
            }
          }
          var NEIGHBOURCOUNT = foundneighbours.length;
          if (!NEIGHBOURCOUNT) {
            ARTIFACTS['strandedmusketeers'][STARTPOS] = {};
          }
        }
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'move',
          path: step.path.concat('move')
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.musketeerline ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'musketeersinline';
        } else
        if ((Object.keys(ARTIFACTS.strandedmusketeers).length === 3)) {
          var winner = 1;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'strandedmusketeers';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "strandedmusketeers": {},
          "musketeerline": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "pawns": {},
          "mypawns": {},
          "opppawns": {},
          "neutralpawns": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), transet: (
  function() {
    var game = {};
    game.commands = {
      "move": 1,
      "swap": 1
    };
    game.graphics = {
      "icons": {
        "pinets": "pawns",
        "piokers": "bishops",
        "piases": "kings"
      },
      "tiles": {
        "base": "playercolour"
      }
    };
    game.board = {
      "height": 5,
      "width": 5,
      "terrain": {
        "base": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
          ]
        }
      }
    };
    game.AI = [];
    game.id = "transet";
    var boardDef = {
      "height": 5,
      "width": 5,
      "terrain": {
        "base": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
          ]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "pinets": {
            "1": ["a1", "e1"],
            "2": ["a5", "e5"]
          },
          "piokers": {
            "1": ["b1", "d1"],
            "2": ["b5", "d5"]
          },
          "piases": {
            "1": ["c1"],
            "2": ["c5"]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(UNITLAYERS.pinets[MARKS['selectunit']]) ? [1] : (!!(UNITLAYERS.piokers[MARKS['selectunit']]) ? [8, 2] : [8, 1, 2]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 =
                (function() {
                  var ret = {};
                  ret[MARKS['selectunit']] = 1;
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectswapunit1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((!!(UNITLAYERS.units[MARKS['selectmovetarget']]) && !(TERRAIN.oppbase[MARKS['selectmovetarget']]))) {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbase,
                  s1 = UNITLAYERS.oppunits;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeportdestination1';
          }
        } else {
          turn.links[newstepid].move = 'move1';
        }
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.selectdeportdestination1 = function(turn, step, markpos) {
        var MARKS = {
          selectdeportdestination: markpos,
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeportdestination'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectdeportdestination1instruction = function(step) {
        return '';
      };
      game.selectswapunit1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap1steps: Object.assign({}, step.ARTIFACTS.swap1steps)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswapunit: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['swap1steps'][POS] = {
              dir: DIR
            };
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswapunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.swap1steps) {
          newlinks[linkpos] = 'selectswap1target1';
        }
        return newstep;
      };
      game.selectswapunit1instruction = function(step) {
        return '';
      };
      game.selectswap1target1 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap2step: Object.assign({}, step.ARTIFACTS.swap2step)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswap1target: markpos,
          selectunit: step.MARKS.selectunit,
          selectswapunit: step.MARKS.selectswapunit
        };
        var STARTPOS = MARKS['selectswapunit'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS['selectswap1target']] || {})['dir'] - 2 + 5]];
        if (POS && !
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.units,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectswap1target']] = 1;
                return ret;
              }());
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          ARTIFACTS['swap2step'][POS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswap1target'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.swap2step ||  {}).length !== 0) {
          turn.links[newstepid].swap = 'swap1';
        }
        return newstep;
      };
      game.selectswap1target1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.units[MARKS['selectmovetarget']])) {
          if (!!(TERRAIN.oppbase[MARKS['selectmovetarget']])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
          } else {
            var unitid = (UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selectdeportdestination']
              });
            }
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.swap1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectswap1target']
          });
        }
        var unitid = (UNITLAYERS.units[MARKS['selectswapunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': Object.keys(ARTIFACTS.swap2step)[0]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'swap';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'swap',
          path: step.path.concat('swap')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.swap1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(UNITLAYERS.pinets[MARKS['selectunit']]) ? [5] : (!!(UNITLAYERS.piokers[MARKS['selectunit']]) ? [4, 6] : [4, 5, 6]));
        var nbrofneighbourdirs = neighbourdirs.length;
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
          var POS = startconnections[neighbourdirs[dirnbr]];
          if (POS && !UNITLAYERS.myunits[POS]) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        var newlinks = turn.links[newstepid];
        for (var linkpos in
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 =
                (function() {
                  var ret = {};
                  ret[MARKS['selectunit']] = 1;
                  return ret;
                }());
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }())) {
          newlinks[linkpos] = 'selectswapunit2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        if ((!!(UNITLAYERS.units[MARKS['selectmovetarget']]) && !(TERRAIN.oppbase[MARKS['selectmovetarget']]))) {
          var newlinks = turn.links[newstepid];
          for (var linkpos in
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbase,
                  s1 = UNITLAYERS.oppunits;
                for (var key in s0) {
                  if (!s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())) {
            newlinks[linkpos] = 'selectdeportdestination2';
          }
        } else {
          turn.links[newstepid].move = 'move2';
        }
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.selectdeportdestination2 = function(turn, step, markpos) {
        var MARKS = {
          selectdeportdestination: markpos,
          selectunit: step.MARKS.selectunit,
          selectmovetarget: step.MARKS.selectmovetarget
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectdeportdestination'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectdeportdestination2instruction = function(step) {
        return '';
      };
      game.selectswapunit2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap1steps: Object.assign({}, step.ARTIFACTS.swap1steps)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswapunit: markpos,
          selectunit: step.MARKS.selectunit
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = [1, 3, 5, 7];
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 4; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && !UNITLAYERS.units[POS]) {
            ARTIFACTS['swap1steps'][POS] = {
              dir: DIR
            };
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswapunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.swap1steps) {
          newlinks[linkpos] = 'selectswap1target2';
        }
        return newstep;
      };
      game.selectswapunit2instruction = function(step) {
        return '';
      };
      game.selectswap1target2 = function(turn, step, markpos) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
          swap2step: Object.assign({}, step.ARTIFACTS.swap2step)
        });
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectswap1target: markpos,
          selectunit: step.MARKS.selectunit,
          selectswapunit: step.MARKS.selectswapunit
        };
        var STARTPOS = MARKS['selectswapunit'];
        var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.swap1steps[MARKS['selectswap1target']] || {})['dir'] - 2 + 5]];
        if (POS && !
          (function() {
            var k, ret = {},
              s0 = UNITLAYERS.units,
              s1 =
              (function() {
                var ret = {};
                ret[MARKS['selectswap1target']] = 1;
                return ret;
              }());
            for (k in s0) {
              ret[k] = 1;
            }
            for (k in s1) {
              ret[k] = 1;
            }
            return ret;
          }())[POS]) {
          ARTIFACTS['swap2step'][POS] = {};
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectswap1target'
        });
        turn.links[newstepid] = {};
        if (Object.keys(ARTIFACTS.swap2step ||  {}).length !== 0) {
          turn.links[newstepid].swap = 'swap2';
        }
        return newstep;
      };
      game.selectswap1target2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(UNITLAYERS.units[MARKS['selectmovetarget']])) {
          if (!!(TERRAIN.oppbase[MARKS['selectmovetarget']])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
          } else {
            var unitid = (UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selectdeportdestination']
              });
            }
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.swap2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectswap1target']
          });
        }
        var unitid = (UNITLAYERS.units[MARKS['selectswapunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': Object.keys(ARTIFACTS.swap2step)[0]
          });
        }
        MARKS = {};
        UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'swap';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          stepid: newstepid,
          name: 'swap',
          path: step.path.concat('swap')
        });
        turn.links[newstepid] = {};
        if (Object.keys(
            (function() {
              var ret = {},
                s0 = UNITLAYERS.myunits,
                s1 = TERRAIN.oppbase;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'infiltration';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.swap2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "swap2step": {},
          "swap1steps": {},
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "pinets": {},
          "mypinets": {},
          "opppinets": {},
          "neutralpinets": {},
          "piokers": {},
          "mypiokers": {},
          "opppiokers": {},
          "neutralpiokers": {},
          "piases": {},
          "mypiases": {},
          "opppiases": {},
          "neutralpiases": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)(), uglyduck: (
  function() {
    var game = {};
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "kings": "kings"
      },
      "tiles": {
        "homerow": "playercolour"
      }
    };
    game.board = {
      "height": 5,
      "width": 5,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
          ]
        }
      }
    };
    game.AI = [];
    game.id = "uglyduck";
    var boardDef = {
      "height": 5,
      "width": 5,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "e1"]
          ],
          "2": [
            ["rect", "a5", "e5"]
          ]
        }
      }
    };
    var connections = boardConnections(boardDef);
    var BOARD = boardLayers(boardDef);
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    function reduce(coll, iterator, acc) {
      for (var key in coll) {
        acc = iterator(acc, coll[key], key);
      }
      return acc;
    }
    game.newGame = function() {
      var turnseed = {
        turn: 0
      };
      var stepseed = {
        UNITDATA: deduceInitialUnitData({
          "soldiers": {
            "1": [
              ["rect", "a1", "e1"]
            ],
            "2": [
              ["rect", "a5", "e5"]
            ]
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
      var TERRAIN = terrainLayers(boardDef, 1);
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? [4, 5, 6] : [8, 1, 2]);
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 3; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && (((DIR === 1) || (DIR === 5)) ? !(UNITLAYERS.units[POS]) : !(UNITLAYERS.myunits[POS]))) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget1';
        }
        return newstep;
      };
      game.selectunit1instruction = function(step) {
        return '';
      };
      game.selectmovetarget1 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move1';
        return newstep;
      };
      game.selectmovetarget1instruction = function(step) {
        return '';
      };
      game.move1 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(TERRAIN.opphomerow[MARKS['selectmovetarget']])) {
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'kings'
            });
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.myhomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 1;
          var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'swanhome';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move1instruction = function(step) {
        return '';
      };
      game.start1 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit1';
        }
        return turn;
      }
      game.start1instruction = function(step) {
        return '';
      };
      game.debug1 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    (function() {
      var TERRAIN = terrainLayers(boardDef, 2);
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 = function(turn, step, markpos) {
        var ARTIFACTS = {
          movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
        };
        var UNITLAYERS = step.UNITLAYERS;
        var MARKS = {
          selectunit: markpos
        };
        var STARTPOS = MARKS['selectunit'];
        var neighbourdirs = (!!(UNITLAYERS.mykings[MARKS['selectunit']]) ? [8, 1, 2] : [4, 5, 6]);
        var startconnections = connections[STARTPOS];
        for (var dirnbr = 0; dirnbr < 3; dirnbr++) {
          var DIR = neighbourdirs[dirnbr];
          var POS = startconnections[DIR];
          if (POS && (((DIR === 1) || (DIR === 5)) ? !(UNITLAYERS.units[POS]) : !(UNITLAYERS.myunits[POS]))) {
            ARTIFACTS['movetargets'][POS] = {};
          }
        }
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          ARTIFACTS: ARTIFACTS,
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectunit'
        });
        turn.links[newstepid] = {};
        var newlinks = turn.links[newstepid];
        for (var linkpos in ARTIFACTS.movetargets) {
          newlinks[linkpos] = 'selectmovetarget2';
        }
        return newstep;
      };
      game.selectunit2instruction = function(step) {
        return '';
      };
      game.selectmovetarget2 = function(turn, step, markpos) {
        var MARKS = {
          selectmovetarget: markpos,
          selectunit: step.MARKS.selectunit
        };
        var newstepid = step.stepid + '-' + markpos;
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: 'selectmovetarget'
        });
        turn.links[newstepid] = {};
        turn.links[newstepid].move = 'move2';
        return newstep;
      };
      game.selectmovetarget2instruction = function(step) {
        return '';
      };
      game.move2 = function(turn, step) {
        var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({}, step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        if (!!(TERRAIN.opphomerow[MARKS['selectmovetarget']])) {
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'kings'
            });
          }
        }
        var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
        if (unitid) {
          UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
            'pos': MARKS['selectmovetarget']
          });
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
        }
        MARKS = {};
        UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        ARTIFACTS = {
          "movetargets": {}
        };
        var newstepid = step.stepid + '-' + 'move';
        var newstep = turn.steps[newstepid] = Object.assign({}, step, {
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
              var ret = {},
                s0 = UNITLAYERS.mykings,
                s1 = TERRAIN.myhomerow;
              for (var key in s0) {
                if (s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) ||  {}).length !== 0) {
          var winner = 2;
          var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
          turn.links[newstepid][result] = 'swanhome';
        } else turn.links[newstepid].endturn = "start" + otherplayer;
        return newstep;
      }
      game.move2instruction = function(step) {
        return '';
      };
      game.start2 = function(turn, step) {
        var turn = {
          steps: {},
          player: player,
          turn: turn.turn + 1,
          links: {
            root: {}
          }
        };
        var MARKS = {};
        var ARTIFACTS = {
          "movetargets": {}
        };
        var UNITDATA = step.UNITDATA;
        var UNITLAYERS = {
          "soldiers": {},
          "mysoldiers": {},
          "oppsoldiers": {},
          "neutralsoldiers": {},
          "kings": {},
          "mykings": {},
          "oppkings": {},
          "neutralkings": {},
          "units": {},
          "myunits": {},
          "oppunits": {},
          "neutralunits": {}
        };
        for (var unitid in UNITDATA) {
          var currentunit = UNITDATA[unitid]
          var unitgroup = currentunit.group;
          var unitpos = currentunit.pos;
          var owner = ownernames[currentunit.owner]
          UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
        }
        var newstep = turn.steps.root = {
          ARTIFACTS: ARTIFACTS,
          UNITDATA: UNITDATA,
          UNITLAYERS: UNITLAYERS,
          MARKS: MARKS,
          stepid: 'root',
          name: 'start',
          path: []
        };
        var newlinks = turn.links.root;
        for (var linkpos in UNITLAYERS.myunits) {
          newlinks[linkpos] = 'selectunit2';
        }
        return turn;
      }
      game.start2instruction = function(step) {
        return '';
      };
      game.debug2 = function() {
        return {
          TERRAIN: TERRAIN
        };
      }
    })();
    return game;
  }
)()
};
