#!/bin/bash 
gameId="$1"
echo "Gonna stub ${gameId}"

cd modules/games &&
npm run stub "$gameId" &&
npm run analyze "$gameId" &&
npm run export &&

cd ../logic &&
npm run compile "$gameId" &&
npm run generateGameTests &&
npm run exportCompiledGames &&

cd ../graphics &&
npm run makeGameGraphics "$gameId" &&
npm run renderGameActionShots "$gameId" &&
npm run exportGameGraphics &&

cd ../battle &&
npm run exportGameAPIs &&
npm run generateGameTests &&
npm run makeDemo "$gameId" &&
npm run exportDemos &&

cd ../content &&
npm run stubGame "$gameId" &&
npm run writeGame "$gameId" &&

cd ../payloads &&
npm run makeComposites &&
npm run makeGamePayload "$gameId" &&
npm run exportAllGamePayloads &&
npm run makeGameListing "$gameId" &&
npm run makeGameAboutArticle "$gameId" &&
npm run makeGameRulesArticle "$gameId" &&
npm run makeListingIndexes &&
npm run makeArticleIndexes &&

cd ../ui &&
npm run importGameImages &&

cd ../next &&
npm run getStatic &&
npm run makeGamePages
