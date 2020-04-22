#!/bin/bash 

cd modules/games;
npm run export;

cd ../logic;
npm run exportCompiledGames;

cd ../battle;
npm run exportGameAPIs;
npm run exportDemos;

cd ../payloads;
npm run makeListingIndexes;
npm run makeArticleIndexes;
npm run exportAllGamePayloads;
