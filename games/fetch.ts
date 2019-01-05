const path = require("path");
const fs = require("fs-extra");
const beautify = require("js-beautify");
import analyze from "./analyze";
import stub from "./stub";

import { typeSignature } from "./types";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

fs.removeSync("./definitions");

fs.readdirSync("../library/defs")
  .filter(f => f !== ".DS_Store")
  .forEach(fname => {
    const gameId = fname.split(".")[0];
    const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
    stub(gameId);
    const json = JSON.parse(
      fs.readFileSync("../library/defs/" + fname).toString()
    );
    const {
      meta: { instructions = {}, ...otherMeta } = {},
      AI,
      graphics,
      board,
      setup,
      generators,
      ...flow
    } = json;
    graphics.icons = graphics.icons || {};
    graphics.tiles = graphics.tiles || {};
    board.terrain = board.terrain || {};

    fs.ensureDirSync("./definitions/" + gameId);

    // ---------------- SCRIPTS ----------
    let scripts;
    try {
      scripts = require(path.join(
        __dirname,
        "../gamescripts/pergame/" + gameId
      )).default;
    } catch (e) {}
    const scriptsPath = "./definitions/" + gameId + "/scripts.ts";
    const scriptsFile = fs.readFileSync(scriptsPath).toString();
    fs.writeFileSync(
      scriptsPath,
      scriptsFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(scripts || {})};`)
    );

    // -------------- META --------------
    const metaPath = "./definitions/" + gameId + "/meta.ts";
    const metaFile = fs.readFileSync(metaPath).toString();
    fs.writeFileSync(
      metaPath,
      metaFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(otherMeta || {})};`)
    );

    // -------------- FLOW --------------
    const flowPath = "./definitions/" + gameId + "/flow.ts";
    const flowFile = fs.readFileSync(flowPath).toString();
    fs.writeFileSync(
      flowPath,
      flowFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(flow || {})};`)
    );

    // -------------- AI --------------
    const aiPath = "./definitions/" + gameId + "/ai.ts";
    const aiFile = fs.readFileSync(aiPath).toString();
    fs.writeFileSync(
      aiPath,
      aiFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(AI || {})};`)
    );

    // -------------- INSTRUCTIONS --------------
    const instructionsPath = "./definitions/" + gameId + "/instructions.ts";
    const instructionsFile = fs.readFileSync(instructionsPath).toString();
    fs.writeFileSync(
      instructionsPath,
      instructionsFile.replace(
        / = {[\s\S]*};/,
        ` = ${makeNice(instructions || {})};`
      )
    );

    // -------------- GRAPHICS --------------
    const graphicsPath = "./definitions/" + gameId + "/graphics.ts";
    const graphicsFile = fs.readFileSync(graphicsPath).toString();
    fs.writeFileSync(
      graphicsPath,
      graphicsFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(graphics || {})};`)
    );

    // -------------- BOARD --------------
    const boardPath = "./definitions/" + gameId + "/board.ts";
    const boardFile = fs.readFileSync(boardPath).toString();
    fs.writeFileSync(
      boardPath,
      boardFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(board || {})};`)
    );

    // -------------- SETUP --------------
    const setupPath = "./definitions/" + gameId + "/setup.ts";
    const setupFile = fs.readFileSync(setupPath).toString();
    fs.writeFileSync(
      setupPath,
      setupFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(setup || {})};`)
    );

    // -------------- GENERATORS --------------
    const generatorsPath = "./definitions/" + gameId + "/generators.ts";
    const generatorsFile = fs.readFileSync(generatorsPath).toString();
    fs.writeFileSync(
      generatorsPath,
      generatorsFile.replace(
        / = {[\s\S]*};/,
        ` = ${makeNice(generators || {})};`
      )
    );

    analyze(gameId);
  });
