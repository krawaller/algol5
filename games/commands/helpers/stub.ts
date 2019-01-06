import * as fs from "fs-extra";
import * as path from "path";

import templateAI from './templates/ai';
import templateAnalysis from './templates/ai';
import templateBoard from './templates/board';
import templateGraphics from './templates/graphics';
import templateInstructions from './templates/instructions';
import templateMeta from './templates/meta';
import templateFlow from './templates/flow';
import templateGenerators from './templates/generators';
import templateScripts from './templates/scripts';
import templateSetup from './templates/setup';
import templateIndex from './templates/index';

export default async function stub(gameId) {
  await fs.ensureDir(path.join(__dirname, "../../definitions", gameId));
  await Promise.all([
    template(gameId, templateAI, 'ai'),
    template(gameId, templateAnalysis, '_types'),
    template(gameId, templateBoard, 'board'),
    template(gameId, templateFlow, 'flow'),
    template(gameId, templateGenerators, 'generators'),
    template(gameId, templateGraphics, 'graphics'),
    template(gameId, templateInstructions, 'instructions'),
    template(gameId, templateMeta, 'meta'),
    template(gameId, templateScripts, 'scripts'),
    template(gameId, templateSetup, 'setup'),
    template(gameId, templateIndex, 'index'),
  ]);
  return console.log("Stubbed", gameId);
}

function template(gameId, template, name) {
  return fs.writeFile(
    path.join(__dirname, "../../definitions", gameId, name + ".ts"),
    template(gameId)
  );
}
