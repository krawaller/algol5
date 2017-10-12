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

function mergeStrings(str1, str2){
  var nextChar = str2 && str2.length ? str2[str2.length-1] : 'X';
  var between = nextChar.match(/[,!\.?]/) ? '' : ' ';
  return str1 + between + str2;
}

function collapseLine(line){
  var parts = [];
  var remaining = line.content;
  while(remaining.length){
    var next = remaining.shift();
    switch(next.type){
      case "nothing":
        break;
      case "line":
        remaining = next.content.concat(remaining);
        break;
      case "text":
        var last = parts.length && parts[parts.length - 1];
        if (last && last.type === "text"){
          last.text = mergeStrings(last.text, next.text);
        } else {
          parts.push(next);
        }
        break;
      case "nothing":
        break;
      default:
        parts.push(next);
    }
  }
  return {
    type: "line",
    content: parts
  };
}
