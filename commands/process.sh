#!/bin/bash 
gameId="$1"
echo "Gonna process ${gameId}"

cd modules/games;
npm run analyze "$gameId"

cd ../logic;
npm run compile "$gameId"

cd ../graphics;
npm run exportGameGraphics "$gameId"

cd ../battle;
npm run makeDemo "$gameId"

cd ../next;
npm run importGameImages "$gameId"