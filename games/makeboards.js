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

function draw(game){
  var board = game.board
    , terraindef = board.terrain || {}
    , layers = lib.terrainLayers({rules:game},true)
    , layernames = Object.keys(terraindef)
    , tilemap = game.graphics.tiles
    , canvas = new Canvas(board.width*200, board.height*200)
    , ctx = canvas.getContext('2d')
  for(var row = 1; row <= board.height; row++){
    for (var col=1; col <= board.width; col++){
      var pos = lib.coords2pos({x:col,y:row})
      var dark = !((col+(row%2))%2)
      var sqr = layernames.reduce(function(mem,name){
        return layers[name][pos] ? tilemap[name]==='playercolour' ? {1:'player1base',2:'player2base'}[layers[name][pos].owner] : tilemap[name] : mem;
      },'empty');
      console.log("POS",pos,"IS",sqr,dark)
    }
  }
}

var krieg = require(__dirname+'/defs/krieg.json')

draw(krieg)