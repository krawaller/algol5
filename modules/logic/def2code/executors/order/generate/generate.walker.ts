import {
  FullDefAnon,
  WalkerDefAnon,
  AlgolWalkerStop,
  isAlgolBoolStoppedBecause,
} from "../../../../../types";
import { contains } from "../../../utils";
import draw from "./generate.draw";
import { makeParser } from "../../../executors";
import { find } from "../../../../../common";

/*
draw directly in whileloop if:
def.draw.steps and def.draw.all doesn't contain walklength or totalcount or stopreason
*/

const defaultStopPrio: AlgolWalkerStop[] = [
  "reachedmax",
  "outofbounds",
  "nomoresteps",
  "hitblock",
];

export default function executeWalker(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  walkDef: WalkerDefAnon
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const intro = `
    ${
      walkDef.steps && needLevel(walkDef.steps, "start")
        ? `let allowedsteps = ${parser.set(walkDef.steps)};`
        : ""
    }
    ${
      walkDef.blocks && needLevel(walkDef.blocks, "start")
        ? `let BLOCKS = ${parser.set(walkDef.blocks)};`
        : ""
    }
  `;
  if (walkDef.starts) {
    return `{
        ${intro}
        for(let STARTPOS in ${parser.set(walkDef.starts)}) {
          ${walkFromStart(gameDef, player, action, ruleset, walkDef, {
            startVar: "STARTPOS",
          })}
        }
      }
    `;
  } else if (walkDef.draw.start || contains(walkDef, ["start"])) {
    return `{
      ${intro}
      let STARTPOS = ${parser.pos(walkDef.start!)};
      ${walkFromStart(gameDef, player, action, ruleset, walkDef, {
        startVar: "STARTPOS",
      })}
    }`;
  } else {
    return `{
      ${intro}
      ${walkFromStart(gameDef, player, action, ruleset, walkDef, {
        startVar: parser.pos(walkDef.start!) as string,
      })}
    }`;
  }
}

function walkFromStart(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  walkDef: WalkerDefAnon,
  { startVar }: { startVar: string }
) {
  const parse = makeParser(gameDef, player, action, ruleset);
  const dirMatters = contains(walkDef.draw, ["dir"]);
  const intro = `
    ${
      walkDef.steps && needLevel(walkDef.steps, "dir")
        ? `let allowedsteps = ${parse.set(walkDef.steps)};`
        : ""
    }
    ${
      walkDef.blocks && needLevel(walkDef.blocks, "dir")
        ? `let BLOCKS = ${parse.set(walkDef.blocks)};`
        : ""
    }
  `;
  if (walkDef.dirs) {
    return (
      intro +
      `
      for(let DIR of ${parse.dirs(walkDef.dirs)}){
        ${walkInDir(gameDef, player, action, ruleset, walkDef, {
          dirVar: "DIR",
          startVar,
        })}
      }
    `
    );
  } else {
    let dirVar = dirMatters ? "DIR" : (parse.val(walkDef.dir!) as string);
    return (
      intro +
      `
      ${dirMatters ? `let DIR = ${parse.val(walkDef.dir!)}; ` : ""}
      ${walkInDir(gameDef, player, action, ruleset, walkDef, {
        dirVar,
        startVar,
      })}
    `
    );
  }
}

const defNeedsStopReason = (def: any) =>
  find(
    def,
    i =>
      i &&
      (i === "reachedmax" ||
        i === "outofbounds" ||
        i === "hitblock" ||
        i === "nomoresteps" ||
        i[0] === "stopreason" ||
        isAlgolBoolStoppedBecause(i))
  );

function walkInDir(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  walkDef: WalkerDefAnon,
  { dirVar, startVar }: { dirVar: string | number; startVar: string }
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const needsStopReason = defNeedsStopReason(walkDef);
  const drawDuringWhile =
    !contains(
      [walkDef.draw.steps, walkDef.draw.all, walkDef.draw.counted],
      ["totalcount"]
    ) &&
    !contains([walkDef.draw.steps, walkDef.draw.all], ["walklength"]) &&
    !defNeedsStopReason([walkDef.draw.steps, walkDef.draw.all]);
  const needsWalkLength =
    walkDef.draw.last ||
    walkDef.draw.counted ||
    contains(walkDef.draw, ["walklength"]);
  const needsWalkPath = !drawDuringWhile || needsWalkLength;

  const countSoFar = walkDef.count && contains(walkDef.draw, ["countsofar"]);

  let ret = ``;

  if (needsWalkPath) ret += `let walkedsquares = []; `;

  if (needsStopReason) ret += `let STOPREASON = ""; `;

  if (walkDef.max) {
    ret += `let MAX = ${parser.val(walkDef.max)};`;
  }

  if (walkDef.startasstep) {
    ret += `
    let POS = "faux"
    connections.faux[${dirVar}]=${startVar};
    `;
  } else {
    ret += `let POS = ${startVar}; `;
  }

  if (needLevel(walkDef.blocks, "loop")) {
    ret += `let allowedsteps = ${parser.set(walkDef.steps!)}; `; // TODO <--- really always have steps here?
    ret += `let BLOCKS = ${parser.set(walkDef.blocks!)}; `;
  }

  if (walkDef.count) {
    ret += `let walkpositionstocount = ${parser.set(walkDef.count)}; `;
    ret += `let CURRENTCOUNT = 0; `;
  }
  if (countSoFar) ret += `let countedwalkpositions = []; `;
  if (walkDef.max) ret += `let LENGTH = 0;`;

  const needStepVarInLoop =
    drawDuringWhile &&
    contains(
      [walkDef.draw.steps, walkDef.draw.all, walkDef.draw.counted],
      ["step"]
    );

  if (needStepVarInLoop) ret += `let STEP = 0; `;

  const whileCondition = needsStopReason
    ? `!(STOPREASON=${calcStopReason(walkDef, dirVar)})`
    : calcStopCondition(walkDef, dirVar);
  ret += `while(${whileCondition}){`; // ---- OPENING WHILE LOOP

  if (needsWalkPath) ret += `walkedsquares.push(POS); `;

  if (countSoFar)
    ret += `countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0)); `;

  if (walkDef.count && !countSoFar)
    ret += `CURRENTCOUNT+=(walkpositionstocount[POS]?1:0); `;

  if (walkDef.max) ret += `LENGTH++;`;

  if (drawDuringWhile) {
    if (needStepVarInLoop) ret += "STEP++; ";
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.steps);
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.all);
    if (walkDef.draw.counted) {
      ret += `if (walkpositionstocount[POS]){`;
      ret += draw(gameDef, player, action, ruleset, walkDef.draw.counted);
      ret += `}`;
    }
  }

  ret += "}"; // CLOSING WHILE LOOP

  if (needsWalkLength) ret += "let WALKLENGTH = walkedsquares.length; ";
  if (walkDef.count) ret += "let TOTALCOUNT = CURRENTCOUNT; ";

  if (walkDef.draw.block) {
    if (contains(walkDef.draw.block, ["step"]))
      ret += "let STEP = WALKLENGTH + 1; ";
    const prio = walkDef.stopPrio || defaultStopPrio;
    const blockBeforeStep =
      prio.indexOf("hitblock") < prio.indexOf("nomoresteps");
    const drawBlockCond = ["BLOCKS[POS]"]
      .concat(walkDef.steps && !blockBeforeStep ? "allowedsteps[POS]" : [])
      .join(" && ");
    ret += `if (${drawBlockCond}){`;
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.block);
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.all);
    ret += `}`;
  }

  if (walkDef.draw.start || walkDef.draw.all) {
    ret += `POS = ${startVar}; `;
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.start, "POS");
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.all, "POS");
  }

  const drawWalkAfterLoop =
    (!drawDuringWhile && walkDef.draw.steps) ||
    walkDef.draw.all ||
    walkDef.draw.counted;
  if (drawWalkAfterLoop) {
    const needStepsAfterLoop = contains(
      [walkDef.draw.steps, walkDef.draw.all, walkDef.draw.counted],
      ["step"]
    );
    if (needStepsAfterLoop) ret += `let STEP = 0; `;
    ret += `for(let walkstepper=0;walkstepper<${
      needsWalkLength ? "WALKLENGTH" : "walkedsquares.length"
    };walkstepper++){`;
    ret += `POS=walkedsquares[walkstepper]; `;
    if (needStepsAfterLoop) ret += `STEP++; `;
    if (countSoFar) ret += `CURRENTCOUNT = countedwalkpositions[walkstepper];`;
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.steps);
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.all);
    if (walkDef.draw.counted) {
      ret += `if (walkpositionstocount[POS]){`;
      ret += draw(gameDef, player, action, ruleset, walkDef.draw.counted);
      ret += `}`;
    }
    ret += "}";
  }

  if (walkDef.draw.counted) {
    ret += "if (walkpositionstocount[POS]){";
    ret += draw(gameDef, player, action, ruleset, walkDef.draw.counted);
    ret += "}";
  }

  if (walkDef.draw.last) {
    const lastNeedsPos = contains(walkDef.draw.last, ["target"]);
    const lastNeedsStep = contains(walkDef.draw.last, ["step"]);
    ret += "if (WALKLENGTH) {";
    if (lastNeedsStep) ret += "STEP = WALKLENGTH;";
    if (lastNeedsPos) ret += "POS = walkedsquares[WALKLENGTH-1];";
    ret += draw(
      gameDef,
      player,
      action,
      ruleset,
      walkDef.draw.last,
      lastNeedsPos ? "POS" : "walkedsquares[WALKLENGTH-1]"
    );
    ret += "}";
  }

  return ret;
}

// when do we need it? :D
function needLevel(expr: any, when: "loop" | "dir" | "start") {
  return (
    (contains(expr, ["dir"])
      ? "loop"
      : contains(expr, ["start"])
      ? "dir"
      : expr
      ? "start"
      : "") === when
  );
}

// ---- TODO: the two helpers below will likely be of use in floater too, so might be nice to put them elsewhere

// assumes connections, DIR, LENGTH
// and if used BLOCKS, allowedsteps, MAX
function calcStopReason(
  genDef: WalkerDefAnon,
  dirVar: string | number = "DIR",
  blocksVar = "BLOCKS"
) {
  let ret = "";
  const prio = genDef.stopPrio || defaultStopPrio;
  for (const stop of prio) {
    if (stop === "reachedmax" && genDef.max) {
      ret += 'LENGTH === MAX ? "reachedmax" : ';
    }
    if (stop === "outofbounds") {
      ret += "!(POS=connections[POS][" + dirVar + ']) ? "outofbounds" : ';
    }
    if (stop === "nomoresteps" && genDef.steps) {
      ret += '!allowedsteps[POS] ? "nomoresteps" : ';
    }
    if (stop === "hitblock" && genDef.blocks) {
      ret += blocksVar + '[POS] ? "hitblock" : ';
    }
  }
  return "(" + ret + " null)";
}

// assumes connections, DIR, LENGTH
// and if used BLOCKS, allowedsteps, MAX

function calcStopCondition(
  genDef: WalkerDefAnon,
  dirVar: string | number = "DIR",
  blocksVar = "BLOCKS"
) {
  const prio = genDef.stopPrio || defaultStopPrio;
  let conds = [];
  for (const stop of prio) {
    if (stop === "reachedmax" && genDef.max) {
      conds.push("LENGTH < MAX");
    }
    if (stop === "outofbounds") {
      conds.push("(POS=connections[POS][" + dirVar + "])");
    }
    if (stop === "nomoresteps" && genDef.steps) {
      conds.push("allowedsteps[POS]");
    }
    if (stop === "hitblock" && genDef.blocks) {
      conds.push("!" + blocksVar + "[POS]");
    }
  }
  return conds.join(" && ");
}

// OLD TODO from drawwalkstart - handle all + startasstep?
