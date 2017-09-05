/*
Build script that will loop over all game definitions in the `defs` folder,
and create individual background images for that game into `/boards`.
*/

var META_PATH = __dirname + '/../library/dist/meta';
var BOARD_PARTS_PATH = __dirname + '/boardparts';
var OUTPUT_PATH = __dirname + '/dist';

var fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image;

// TODO - import? 
var colnametonumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split("").reduce(function(mem,char,n) {
	mem[char] = n+1;
	return mem;
},{});
const colnumbertoname = Object.keys(colnametonumber).reduce(function(mem,key){
  var val = colnametonumber[key];
  mem[val] = key;
  return mem;
},{});
var coords2pos = function(coords) { return colnumbertoname[coords.x]+coords.y}

var games = require(META_PATH);

var pics = {
  castle: fs.readFileSync(BOARD_PARTS_PATH + '/castle.png'),
  corner: fs.readFileSync(BOARD_PARTS_PATH + '/corner.png'),
  empty: fs.readFileSync(BOARD_PARTS_PATH + '/empty.png'),
  grass: fs.readFileSync(BOARD_PARTS_PATH + '/grass.png'),
  player1base: fs.readFileSync(BOARD_PARTS_PATH + '/player1base.png'),
  player2base: fs.readFileSync(BOARD_PARTS_PATH + '/player2base.png'),
  side: fs.readFileSync(BOARD_PARTS_PATH + '/side.png'),
  water: fs.readFileSync(BOARD_PARTS_PATH + '/water.png')
}

const TILE = 200, EDGE = 0

function draw(game,to){
  var board = game.board
    , terraindef = board.terrain || {}
    , layers = game.board.terrainLayers
    , layernames = Object.keys(terraindef)
    , tilemap = game.graphics.tiles
    , tiletypes = Object.keys(game.graphics.tiles||{})
    , height = board.height*TILE+EDGE*2
    , width = board.width*TILE+EDGE*2
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d')
  for(var row = 1; row <= board.height; row++){
    for (var col=1; col <= board.width; col++){
      var pos = coords2pos({x:col,y:row})
      var dark = !((col+(row%2))%2)
      var sqr = tiletypes.reduce(function(mem,name){
        return layers[name][pos] ? tilemap[name]==='playercolour' ? {1:'player1base',2:'player2base'}[layers[name][pos].owner] : tilemap[name] : mem;
      },'empty');
      var img = new Image()
      img.src = pics[sqr]
      var picX = EDGE + (col-1)*TILE
      var picY = EDGE + (board.height-row)*TILE
      ctx.drawImage(img, picX, picY, TILE, TILE);
      if (dark){
        ctx.globalAlpha = 0.05
        ctx.fillStyle = 'black'
        ctx.fillRect(picX, picY, TILE, TILE);
        ctx.globalAlpha = 1
      }
    }
  }

  var out = fs.createWriteStream(to)
    , stream = canvas.pngStream();

  stream.on('data', function(chunk){ out.write(chunk); });
  stream.on('end', function(){ console.log('saved',to); });
}

Object.keys(games).forEach(function(game){
  var rules = games[game];
  draw(rules,OUTPUT_PATH + '/'+game+'.png');
});
