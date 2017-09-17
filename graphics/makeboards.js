
/*
Build script that will loop over all game definitions in the `defs` folder,
and create individual background images for that game into `/boards`.
*/

var META_PATH = __dirname + '/../library/dist/meta';
var BOARD_PARTS_PATH = __dirname + '/boardparts';
var OUTPUT_PATH = __dirname + '/dist';
var OUTPUT_PIC_PATH = OUTPUT_PATH + '/pics';

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
  water: fs.readFileSync(BOARD_PARTS_PATH + '/water.png'),
  rowheader: fs.readFileSync(BOARD_PARTS_PATH + '/rowheader.png'),
  colheader: fs.readFileSync(BOARD_PARTS_PATH + '/colheader.png'),
  corner_nw: fs.readFileSync(BOARD_PARTS_PATH + '/corner-nw.png'),
  corner_ne: fs.readFileSync(BOARD_PARTS_PATH + '/corner-ne.png'),
  corner_sw: fs.readFileSync(BOARD_PARTS_PATH + '/corner-sw.png'),
  corner_se: fs.readFileSync(BOARD_PARTS_PATH + '/corner-se.png'),
}

const TILE = 200, EDGE = 75;

let dataURIusages = {};

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
    , ctx = canvas.getContext('2d');
  ctx.font = '42px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  var corner = new Image(); corner.src = pics.corner_nw; ctx.drawImage(corner, 0, 0, EDGE, EDGE);
  var corner = new Image(); corner.src = pics.corner_ne; ctx.drawImage(corner, board.width*TILE + EDGE, 0, EDGE, EDGE);
  var corner = new Image(); corner.src = pics.corner_se; ctx.drawImage(corner, board.width*TILE + EDGE, board.height*TILE + EDGE, EDGE, EDGE);
  var corner = new Image(); corner.src = pics.corner_sw; ctx.drawImage(corner, 0, board.height*TILE + EDGE, EDGE, EDGE);

  for (var col=1; col <= board.width; col++){
    var colHeader = new Image();
    colHeader.src = pics.colheader;
    ctx.drawImage(colHeader, EDGE + (col-1)*TILE, 0, TILE, EDGE);
    ctx.drawImage(colHeader, EDGE + (col-1)*TILE, board.height * TILE + EDGE, TILE, EDGE);
    ctx.fillText(colnumbertoname[col], (col-1)*TILE + EDGE + TILE/2, EDGE/2);
    ctx.fillText(colnumbertoname[col], (col-1)*TILE + EDGE + TILE/2, board.height * TILE + EDGE * 3/2);
  }
  for(var row = 1; row <= board.height; row++){
    var picY = EDGE + (board.height-row)*TILE
    var rowHeader = new Image();
    rowHeader.src = pics.rowheader;
    ctx.drawImage(rowHeader, 0, picY, TILE, TILE);
    ctx.drawImage(rowHeader, board.width * TILE, picY, TILE, TILE);
    ctx.fillStyle = 'white';
    ctx.fillText(row, EDGE/2, picY + (TILE/2));
    ctx.fillText(row, board.width * TILE + EDGE * 3/2, picY + (TILE/2));
    for (var col=1; col <= board.width; col++){
      var pos = coords2pos({x:col,y:row})
      var dark = !((col+(row%2))%2)
      var sqr = tiletypes.reduce(function(mem,name){
        return layers[name][pos] ? tilemap[name]==='playercolour' ? {1:'player1base',2:'player2base'}[layers[name][pos].owner] : tilemap[name] : mem;
      },'empty');
      var img = new Image()
      img.src = pics[sqr]
      var picX = EDGE + (col-1)*TILE
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

  let dataURI = canvas.toDataURL('image/png');
  dataURIusages[dataURI] = dataURIusages[dataURI] || [];
  dataURIusages[dataURI].push(game.id);
}

Object.keys(games).forEach(function(game){
  var rules = games[game];
  draw(rules,OUTPUT_PIC_PATH + '/'+game+'.png');
});

var CSS = Object.keys(dataURIusages).reduce(function(mem, uri){
  var gamelist = dataURIusages[uri];
  mem += gamelist.map(function(id){ return "."+id; }).join(", ") + " { background-image: url(" + uri + "); }\n";
  return mem;
}, '');

fs.writeFileSync(OUTPUT_PATH + '/boards.css', CSS);
