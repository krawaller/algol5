const fs = require("fs-extra");
const path = require("path");
const beautify = require("js-beautify");
import { FullDef } from "./types";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

export default function update(gameId, def: FullDef) {
  // ---------------- SCRIPTS ----------
  const scriptsPath = "./definitions/" + gameId + "/scripts.ts";
  const scriptsFile = fs.readFileSync(scriptsPath).toString();
  fs.writeFileSync(
    scriptsPath,
    scriptsFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.scripts)};`)
  );

  // -------------- META --------------
  const metaPath = "./definitions/" + gameId + "/meta.ts";
  const metaFile = fs.readFileSync(metaPath).toString();
  fs.writeFileSync(
    metaPath,
    metaFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.meta)};`)
  );

  // -------------- FLOW --------------
  const flowPath = "./definitions/" + gameId + "/flow.ts";
  const flowFile = fs.readFileSync(flowPath).toString();
  fs.writeFileSync(
    flowPath,
    flowFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.flow)};`)
  );

  // -------------- AI --------------
  const aiPath = "./definitions/" + gameId + "/ai.ts";
  const aiFile = fs.readFileSync(aiPath).toString();
  fs.writeFileSync(
    aiPath,
    aiFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.AI)};`)
  );

  // -------------- INSTRUCTIONS --------------
  const instructionsPath = "./definitions/" + gameId + "/instructions.ts";
  const instructionsFile = fs.readFileSync(instructionsPath).toString();
  fs.writeFileSync(
    instructionsPath,
    instructionsFile.replace(
      / = {[\s\S]*};/,
      ` = ${makeNice(def.instructions || {})};`
    )
  );

  // -------------- GRAPHICS --------------
  const graphicsPath = "./definitions/" + gameId + "/graphics.ts";
  const graphicsFile = fs.readFileSync(graphicsPath).toString();
  fs.writeFileSync(
    graphicsPath,
    graphicsFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.graphics || {})};`)
  );

  // -------------- BOARD --------------
  const boardPath = "./definitions/" + gameId + "/board.ts";
  const boardFile = fs.readFileSync(boardPath).toString();
  fs.writeFileSync(
    boardPath,
    boardFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.board || {})};`)
  );

  // -------------- SETUP --------------
  const setupPath = "./definitions/" + gameId + "/setup.ts";
  const setupFile = fs.readFileSync(setupPath).toString();
  fs.writeFileSync(
    setupPath,
    setupFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(def.setup || {})};`)
  );

  // -------------- GENERATORS --------------
  const generatorsPath = "./definitions/" + gameId + "/generators.ts";
  const generatorsFile = fs.readFileSync(generatorsPath).toString();
  fs.writeFileSync(
    generatorsPath,
    generatorsFile.replace(
      / = {[\s\S]*};/,
      ` = ${makeNice(def.generators || {})};`
    )
  );

  console.log("Updated files for ", gameId);
}
