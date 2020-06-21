import { FullDefAnon, FloaterDefAnon } from "../../../../../types";
import { makeParser } from "../../../executors";
import draw from "./generate.draw";

export default function executeFloater(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  def: FloaterDefAnon
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const startArr = def.start
    ? `[${parser.pos(def.start)}]`
    : `Object.keys(${parser.set(def.starts!)})`;
  const drawStep = def.draw.steps
    ? draw(gameDef, player, action, ruleset, def.draw.steps)
    : "";
  const drawBlock = def.draw.blocks
    ? draw(gameDef, player, action, ruleset, def.draw.blocks)
    : "";
  const tests = ["POS", "!visited[POS]"];
  let stepDef = "";
  let blockDef = "";
  if (def.steps) {
    stepDef = `const steps = ${parser.set(def.steps)}`;
    tests.push("steps[POS]");
  }
  if (def.blocks) {
    blockDef = `const blocks = ${parser.set(def.blocks)}; `;
    tests.push("!blocks[POS]");
    if (def.draw.blocks) {
      blockDef += `let seenBlocks = {}; `;
    }
  }
  return `
    const visited = {};
    const toCheck = ${startArr};
    ${stepDef}
    ${blockDef}
    while (toCheck.length) {
      const from = toCheck.shift();
      visited[from] = true;
      for (const DIR of ${parser.dirs(def.dirs)}) {
        const POS = connections[from][DIR];
        if (${tests.join(" && ")}) {
          toCheck.push(POS);
          ${drawStep}
        }
        ${def.draw.blocks ? `if (blocks[POS]) { ${drawBlock} } ` : ""}
      }
    }
  `;
}
