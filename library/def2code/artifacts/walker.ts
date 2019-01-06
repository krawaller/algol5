import { FullDef, GeneratorDef, WalkerDef } from "../types";
import { contains, listlength } from "../utils";
import draw from "./draw";
import makeParse from "../expressions";

/*
draw directly in whileloop if:
def.draw.steps and def.draw.all doesn't contain walklength or totalcount
*/

export default function executeWalker(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  walkDef
) {
  const parse = makeParse(gameDef, player, action);
  const intro = `
    ${
      needLevel(walkDef.steps, "start")
        ? `var allowedsteps = ${parse.set(walkDef.steps)};`
        : ""
    }
    ${
      needLevel(walkDef.blocks, "start")
        ? `var BLOCKS = ${parse.set(walkDef.blocks)};`
        : ""
    }
  `;
  if (walkDef.starts) {
    return (
      intro +
      `
      var walkstarts = ${parse.set(walkDef.starts)};
      for(var STARTPOS in walkstarts) {
        ${walkFromStart(gameDef, player, action, walkDef)}
      }
    `
    );
  } else {
    return (
      intro +
      `
      var STARTPOS = ${parse.position(walkDef.start)};
      ${walkFromStart(gameDef, player, action, walkDef)}
    `
    );
  }
}

function walkFromStart(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  walkDef
) {
  const parse = makeParse(gameDef, player, action);
  const dirMatters = contains(walkDef.draw, ["dir"]) || walkDef.startasstep; // because startasstep accesses faux with DIR
  const intro = `
    ${
      needLevel(walkDef.steps, "dir")
        ? `var allowedsteps = ${parse.set(walkDef.steps)};`
        : ""
    }
    ${
      needLevel(walkDef.blocks, "dir")
        ? `var BLOCKS = ${parse.set(walkDef.blocks)};`
        : ""
    }
  `;
  if (walkDef.dirs) {
    let dirVar = dirMatters ? "DIR" : "allwalkerdirs[walkerdirnbr]";
    const predictedNbrOfDirs = listlength(walkDef.dirs);
    let nbrOfDirs = predictedNbrOfDirs || "nbrofwalkerdirs";
    return (
      intro +
      `
      var allwalkerdirs = ${parse.list(walkDef.dirs)};
      ${!predictedNbrOfDirs ? "var nbrofwalkerdirs=allwalkerdirs.length; " : ""}
      for(var walkerdirnbr=0; walkerdirnbr<${nbrOfDirs}; walkerdirnbr++){
        ${dirMatters ? "var DIR = allwalkerdirs[walkerdirnbr]; " : ""}
        ${walkInDir(gameDef, player, action, walkDef, dirVar)}
      }
    `
    );
  } else {
    let dirVar = dirMatters ? "DIR" : parse.value(walkDef.dir);
    return (
      intro +
      `
      ${dirMatters ? `var DIR = ${parse.value(walkDef.dir)}; ` : ""}
      ${walkInDir(gameDef, player, action, walkDef, dirVar)}
    `
    );
  }
}

// TODO - totalcount might not always be needed
function walkInDir(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  walkDef,
  dirVar
) {
  const parse = makeParse(gameDef, player, action);
  const O = { rules: gameDef, player, action, usefordir: dirVar };
  const drawDuringWhile =
    !contains([walkDef.draw.steps, walkDef.draw.all], ["totalcount"]) &&
    !contains([walkDef.draw.steps, walkDef.draw.all], ["walklength"]);
  const drawStepsInLoop =
    drawDuringWhile &&
    contains(
      [walkDef.draw.steps, walkDef.draw.all, walkDef.draw.counted],
      ["step"]
    );
  const needsStopReason =
    walkDef.draw.block || contains(walkDef, ["stopreason"]); // TODO - drawblock? :P
  const needsWalkLength =
    walkDef.draw.last || contains(walkDef.draw, ["walklength"]);
  const needsWalkPath = !drawDuringWhile || needsWalkLength;
  const blockNeedsStep = contains(walkDef.draw.block, ["step"]);
  const whileCondition = needsStopReason
    ? `!(STOPREASON=${calcStopReason(walkDef, dirVar)})`
    : calcStopCondition(walkDef, dirVar);
  const countSoFar = walkDef.count && contains(walkDef.draw, ["countsofar"]);
  const drawBlockCond = ["BLOCKS[POS]"]
    .concat(
      walkDef.steps && !walkDef.testblocksbeforesteps ? "allowedsteps[POS]" : []
    )
    .join(" && ");
  const shouldDrawStart = walkDef.draw.start || walkDef.draw.all;
  const startNeedsPosVar = contains(
    [walkDef.draw.start, walkDef.draw.all],
    ["target"]
  );
  const drawWalkAfterLoop =
    (!drawDuringWhile && walkDef.draw.steps) ||
    walkDef.draw.all ||
    walkDef.draw.counted;
  const needStepsAfterLoop =
    drawWalkAfterLoop &&
    contains(
      [walkDef.draw.steps, walkDef.draw.all, walkDef.draw.counted],
      ["step"]
    );
  const lastNeedsStep = contains(walkDef.draw.last, ["step"]);
  const lastNeedsPos = contains(walkDef.draw.last, ["target"]);
  return `
    ${
      needsWalkPath
        ? "var walkedsquares = [];                                                    "
        : ""
    }
    ${
      needsStopReason
        ? 'var STOPREASON = "";                                                       '
        : ""
    }
    ${
      walkDef.max
        ? `var MAX = ${parse.value(
            walkDef.max
          )};                                     `
        : ""
    }
    ${
      walkDef.startasstep
        ? 'var POS = "faux";                                                          '
        : ""
    }
    ${
      walkDef.startasstep
        ? "connections.faux[DIR]=STARTPOS;                                            "
        : ""
    }
    ${!walkDef.startasstep ? "var POS = STARTPOS;" : ""}
    ${
      needLevel(walkDef.steps, "loop")
        ? `var allowedsteps = ${parse.set(walkDef.steps)};`
        : ""
    }
    ${
      needLevel(walkDef.blocks, "loop")
        ? `var BLOCKS = ${parse.set(walkDef.blocks)};`
        : ""
    }
    ${
      walkDef.count
        ? `var walkpositionstocount = ${parse.set(walkDef.count)};`
        : ""
    }
    ${walkDef.count ? `var CURRENTCOUNT = 0;` : ""}
    ${countSoFar ? `var countedwalkpositions = [];` : ""}
    ${walkDef.max ? `var LENGTH = 0;` : ""}
    ${drawStepsInLoop ? `var STEP = 0;` : ""}
                                          while(${whileCondition}){
    ${needsWalkPath ? "  walkedsquares.push(POS);" : ""}
    ${
      countSoFar
        ? "  countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0));"
        : ""
    }
    ${
      walkDef.count && !countSoFar
        ? "  CURRENTCOUNT+=(walkpositionstocount[POS]?1:0); "
        : ""
    }
    ${walkDef.max ? `  LENGTH++;` : ""}
    ${
      drawDuringWhile
        ? `
        ${drawStepsInLoop ? "  STEP++;" : ""}
        ${
          walkDef.count && countSoFar
            ? "  CURRENTCOUNT = countedwalkpositions[walkstepper];"
            : ""
        }
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.steps
                                            )}
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.all
                                            )}
        ${
          walkDef.draw.counted
            ? `  if (walkpositionstocount[POS]){
                                              ${draw(
                                                gameDef,
                                                player,
                                                action,
                                                walkDef.draw.counted
                                              )}
                                            }`
            : ""
        }
    `
        : ""
    }
                                          }
    ${needsWalkLength ? "var WALKLENGTH = walkedsquares.length; " : ""}
    ${walkDef.count ? "var TOTALCOUNT = CURRENTCOUNT; " : ""}
    ${blockNeedsStep ? "var STEP = WALKLENGTH + 1; " : ""}
    ${
      walkDef.draw.block
        ? `if (${drawBlockCond}){
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.block
                                            )}
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.all
                                            )}
                                          }
    `
        : ""
    }
    ${
      shouldDrawStart
        ? `
       ${startNeedsPosVar ? "POS = STARTPOS;" : ""}
                                          ${draw(
                                            gameDef,
                                            player,
                                            action,
                                            walkDef.draw.start,
                                            startNeedsPosVar
                                              ? "POS"
                                              : "STARTPOS"
                                          )}
                                          ${draw(
                                            gameDef,
                                            player,
                                            action,
                                            walkDef.draw.all,
                                            startNeedsPosVar
                                              ? "POS"
                                              : "STARTPOS"
                                          )}
    `
        : ""
    }
    ${
      drawWalkAfterLoop
        ? `
      ${needStepsAfterLoop ? "var STEP = 0; " : ""}
                                          for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){
                                            POS=walkedsquares[walkstepper];
      ${needStepsAfterLoop ? "  STEP++;" : ""}
      ${countSoFar ? "  CURRENTCOUNT = countedwalkpositions[walkstepper];" : ""}
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.steps
                                            )}
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.all
                                            )}
      ${
        walkDef.draw.counted
          ? `
                                            if (walkpositionstocount[POS]){
                                              ${draw(
                                                gameDef,
                                                player,
                                                action,
                                                walkDef.draw.counted
                                              )}
                                            }
      `
          : ""
      }
                                          }
    `
        : ""
    }
    ${
      walkDef.draw.last
        ? `
                                          if (WALKLENGTH){
      ${lastNeedsStep ? "  STEP = WALKLENGTH;" : ""}
      ${lastNeedsPos ? "  POS = walkedsquares[WALKLENGTH-1];" : ""}
                                            ${draw(
                                              gameDef,
                                              player,
                                              action,
                                              walkDef.draw.last,
                                              lastNeedsPos
                                                ? "POS"
                                                : "walkedsquares[WALKLENGTH-1]"
                                            )}
                                          }
    `
        : ""
    }
  `;
}

// when do we need it? :D
function needLevel(expr, when) {
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
  genDef: WalkerDef,
  dirVar = "DIR",
  blocksVar = "BLOCKS"
) {
  let ret = "";
  if (genDef.max) {
    ret += 'LENGTH === MAX ? "reachedmax" : ';
  }
  ret += "!(POS=connections[POS][" + dirVar + ']) ? "outofbounds" : ';
  /*if (genDef.type==='floater'){
    ret += 'REACHED[POS] ? "alreadyreached" : '
  }*/
  if (genDef.blocks && genDef.steps && genDef.testblocksbeforesteps) {
    ret += blocksVar + '[POS] ? "hitblock" : ';
  }
  if (genDef.steps) {
    ret += '!allowedsteps[POS] ? "nomoresteps" : ';
  }
  if (genDef.blocks && !genDef.testblocksbeforesteps) {
    ret += blocksVar + '[POS] ? "hitblock" : ';
  }
  return "(" + ret + " null)";
}

// assumes connections, DIR, LENGTH
// and if used BLOCKS, allowedsteps, MAX

function calcStopCondition(
  genDef: WalkerDef,
  dirVar = "DIR",
  blocksVar = "BLOCKS"
) {
  let conds = [];
  if (genDef.max) {
    conds.push("LENGTH < MAX");
  }
  conds.push("(POS=connections[POS][" + dirVar + "])");
  /*if (genDef.type==='floater'){
    conds.push('!REACHED[POS]')
  }*/
  if (genDef.blocks && genDef.steps && genDef.testblocksbeforesteps) {
    conds.push("!" + blocksVar + "[POS]");
  }
  if (genDef.steps) {
    conds.push("allowedsteps[POS]");
  }
  if (genDef.blocks && !genDef.testblocksbeforesteps) {
    conds.push("!" + blocksVar + "[POS]");
  }
  return conds.join(" && ");
}

// OLD TODO from drawwalkstart - handle all + startasstep?
