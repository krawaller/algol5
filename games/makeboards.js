var fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image;

import lib from '../src/codegen'

var pics = {
  castle: fs.readFileSync(__dirname+'/boardparts/castle.png'),
  corner: fs.readFileSync(__dirname+'/boardparts/corner.png'),
  empty: fs.readFileSync(__dirname+'/boardparts/empty.png'),
  grass: fs.readFileSync(__dirname+'/boardparts/grass.png'),
  player1base: fs.readFileSync(__dirname+'/boardparts/player1base.png'),
  player2base: fs.readFileSync(__dirname+'/boardparts/player2base.png'),
  side: fs.readFileSync(__dirname+'/boardparts/side.png'),
  water: fs.readFileSync(__dirname+'/boardparts/water.png')
}

const TILE = 200, EDGE = 0

function draw(game,to){
  var board = game.board
    , terraindef = board.terrain || {}
    , layers = lib.terrainLayers({rules:game},true)
    , layernames = Object.keys(terraindef)
    , tilemap = game.graphics.tiles
    , tiletypes = Object.keys(game.graphics.tiles||{})
    , height = board.height*TILE+EDGE*2
    , width = board.width*TILE+EDGE*2
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d')
  for(var row = 1; row <= board.height; row++){
    for (var col=1; col <= board.width; col++){
      var pos = lib.coords2pos({x:col,y:row})
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

fs.readdirSync(__dirname+'/defs').filter(function(file){return file !== '.DS_Store'}).forEach(function(file){
  var rules = require(__dirname+'/defs/'+file)
  draw(rules,__dirname+'/boards/'+file.replace('.json','.png'))
})
