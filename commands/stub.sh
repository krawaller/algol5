#!/bin/bash 
gameId="$1"
echo "Gonna stub ${gameId}"

cd modules/games;
npm run stub "$gameId"
npm run analyze "$gameId"
npm run export

cd ../logic;
npm run compile "$gameId"
npm run generateGameTests
npm run exportCompiledGames

cd ../graphics;
npm run makeGameGraphics "$gameId"
npm run exportGameGraphics

cd ../battle;
npm run exportGameAPIs
npm run generateGameTests
npm run makeDemo "$gameId"

cd ../content;
npm run stubGame "$gameId"
npm run writeGame "$gameId"

cd ../next;
npm run makeGamePages
npm run importGameImages
