
/*
Build script that will loop over all game definitions in the `defs` folder,
and create individual background images for that game into `/boards`.
*/

import * as fs from 'fs';
import * as Canvas from 'canvas';

import lib from '../games/dist/lib'; // must have run npm run export in the Games dir first!
import { colnumber2name, coords2pos, terrainLayers } from '../common';

const cimg = Canvas.Image;

let BOARD_PARTS_PATH = __dirname + '/boardparts';
let OUTPUT_PATH = __dirname + '/dist';
let OUTPUT_BOARD_PIC_PATH = OUTPUT_PATH + '/boards';

let pics = {
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
  let board = game.board
    , layers = terrainLayers(board)
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
  let corner = new cimg(); corner.src = pics.corner_nw; ctx.drawImage(corner, 0, 0, EDGE, EDGE);
  corner = new cimg(); corner.src = pics.corner_ne; ctx.drawImage(corner, board.width*TILE + EDGE, 0, EDGE, EDGE);
  corner = new cimg(); corner.src = pics.corner_se; ctx.drawImage(corner, board.width*TILE + EDGE, board.height*TILE + EDGE, EDGE, EDGE);
  corner = new cimg(); corner.src = pics.corner_sw; ctx.drawImage(corner, 0, board.height*TILE + EDGE, EDGE, EDGE);

  for (let col=1; col <= board.width; col++){
    let colHeader = new cimg();
    colHeader.src = pics.colheader;
    ctx.drawImage(colHeader, EDGE + (col-1)*TILE, 0, TILE, EDGE);
    ctx.drawImage(colHeader, EDGE + (col-1)*TILE, board.height * TILE + EDGE, TILE, EDGE);
    ctx.fillText(colnumber2name[col], (col-1)*TILE + EDGE + TILE/2, EDGE/2);
    ctx.fillText(colnumber2name[col], (col-1)*TILE + EDGE + TILE/2, board.height * TILE + EDGE * 3/2);
  }
  for(let row = 1; row <= board.height; row++){
    let picY = EDGE + (board.height-row)*TILE
    let rowHeader = new cimg();
    rowHeader.src = pics.rowheader;
    ctx.drawImage(rowHeader, 0, picY, TILE, TILE);
    ctx.drawImage(rowHeader, board.width * TILE, picY, TILE, TILE);
    ctx.fillStyle = 'white';
    ctx.fillText(row, EDGE/2, picY + (TILE/2));
    ctx.fillText(row, board.width * TILE + EDGE * 3/2, picY + (TILE/2));
    for (let col=1; col <= board.width; col++){
      let pos = coords2pos({x:col,y:row})
      let dark = !((col+(row%2))%2)
      let sqr = tiletypes.reduce(function(mem,name){
        return layers[name][pos] ? tilemap[name]==='playercolour' ? {1:'player1base',2:'player2base'}[layers[name][pos].owner] : tilemap[name] : mem;
      },'empty');
      let img = new cimg()
      img.src = pics[sqr]
      let picX = EDGE + (col-1)*TILE
      ctx.drawImage(img, picX, picY, TILE, TILE);
      if (dark){
        ctx.globalAlpha = 0.05
        ctx.fillStyle = 'black'
        ctx.fillRect(picX, picY, TILE, TILE);
        ctx.globalAlpha = 1
      }
    }
  }

  let out = fs.createWriteStream(to)
    , stream = canvas.pngStream();

  stream.on('data', function(chunk){ out.write(chunk); });
  stream.on('end', function(){ console.log('saved',to); });

  let dataURI = canvas.toDataURL('image/png');
  dataURIusages[dataURI] = dataURIusages[dataURI] || [];
  dataURIusages[dataURI].push(game.meta.id);
}

Object.keys(lib).forEach(function(gameId){
  let def = lib[gameId];
  draw(def,OUTPUT_BOARD_PIC_PATH + '/'+gameId+'.png');
});

let CSSfile = Object.keys(dataURIusages).reduce(function(mem, uri){
  let gamelist = dataURIusages[uri];
  mem += gamelist.map(function(id){ return "."+id; }).join(", ") + " { background-image: url(" + uri + "); }\n";
  return mem;
}, '');

fs.writeFileSync(OUTPUT_PATH + '/boards.css', CSSfile);
