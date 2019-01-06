import { FullDef } from "../types";
import makeParser from "../expressions";
import { contains, listlength } from "../utils";
import draw from "./draw";

// TODO - not drawing counted?

export default function executeNeighbours(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  nghDef: any
) {
  const parse = makeParser(gameDef, player, action);
  // single start
  if (nghDef.start) {
    return `
      var STARTPOS = ${parse.pos(nghDef.start)};
      ${findAndDrawNeighboursFromStart(gameDef, player, action, nghDef)}
      ${draw(gameDef, player, action, nghDef.draw.start, "STARTPOS")}
    `;
    // many starts, must loop
  } else {
    return `
      for(var STARTPOS in ${parse.set(nghDef.starts)}){
        ${findAndDrawNeighboursFromStart(gameDef, player, action, nghDef)}
        ${draw(gameDef, player, action, nghDef.draw.start, "STARTPOS")}
      }
    `;
  }
}

function findAndDrawNeighboursFromStart(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  nghDef: any
) {
  const parse = makeParser(gameDef, player, action);
  const counting = contains(nghDef.draw, ["neighbourcount"]);
  const dirMatters = contains(nghDef, ["dir"]);
  if (nghDef.dirs && !counting) {
    // many dirs, no counting so they'll be drawn individually
    return `
      ${findManyNeighbours(gameDef, player, action, nghDef)}
    `;
  } else if (nghDef.dirs && counting && !nghDef.draw.neighbours) {
    // many dirs, counting, no draw now
    return `
      ${findManyNeighbours(gameDef, player, action, nghDef)}
      var NEIGHBOURCOUNT = foundneighbours.length;
    `;
  } else if (nghDef.dirs && counting && nghDef.draw.neighbours) {
    // many dirs, counting, drawing neigh
    return `
      ${findManyNeighbours(gameDef, player, action, nghDef)}
      var NEIGHBOURCOUNT = foundneighbours.length;
      for(var neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){
        POS=foundneighbours[neighbournbr];
        ${dirMatters ? "var DIR=foundneighbourdirs[neighbournbr]; " : ""}
        ${draw(gameDef, player, action, nghDef.draw.neighbours)}
      }
    `;
  } else if (nghDef.dir && !dirMatters) {
    // one dir, nothing cares about exactly which
    return `
      ${findAndDrawSingleNeighbour(
        gameDef,
        player,
        action,
        nghDef,
        parse.val(nghDef.dir)
      )}
    `;
  } else {
    // one dir, sth in def needs to now which
    return `
      var DIR=${parse.val(nghDef.dir)};
      ${findAndDrawSingleNeighbour(gameDef, player, action, nghDef)}
    `;
  }
}

function findAndDrawSingleNeighbour(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  nghDef: any,
  dirVar = "DIR"
) {
  const parse = makeParser(gameDef, player, action);
  let conds = ["POS"];
  if (nghDef.condition) conds.push(parse.bool(nghDef.condition));
  if (nghDef.ifover) conds.push(parse.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parse.set(nghDef.unlessover) + "[POS]");
  const drawCaresAboutCount = contains(nghDef.draw, ["neighbourcount"]);
  return `
    var POS=connections[STARTPOS][${dirVar}];
    if (${conds.join(" && ")}){
      ${drawCaresAboutCount ? "var NEIGHBOURCOUNT=1; " : ""}
      ${draw(gameDef, player, action, nghDef.draw.neighbours)}
    }
  `;
}

function findManyNeighbours(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  nghDef: any
) {
  const parse = makeParser(gameDef, player, action);
  const dirMatters = contains(
    [nghDef.draw.neighbours, nghDef.condition],
    ["dir"]
  );
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  const predictedNbrOfDirs = listlength(nghDef.dirs);
  let nbrOfDirs = predictedNbrOfDirs || "nbrofneighbourdirs";
  return `
    var neighbourdirs = ${parse.list(nghDef.dirs)};
    ${predictedNbrOfDirs ? "" : "var nbrofneighbourdirs=neighbourdirs.length; "}
    ${countMatters ? "var foundneighbours = []; " : ""}
    ${countMatters && dirMatters ? "var foundneighbourdirs=[]; " : ""}
    var startconnections = connections[STARTPOS];
    for(var dirnbr=0;dirnbr<${nbrOfDirs};dirnbr++){
      ${dirMatters ? "var DIR=neighbourdirs[dirnbr]; " : ""}
      ${
        dirMatters
          ? findNeighbourInDir(
              gameDef,
              player,
              action,
              nghDef,
              "DIR",
              "startconnections"
            )
          : ""
      }
      ${
        !dirMatters
          ? findNeighbourInDir(
              gameDef,
              player,
              action,
              nghDef,
              "neighbourdirs[dirnbr]",
              "startconnections"
            )
          : ""
      }
    }
  `;
}

function findNeighbourInDir(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  nghDef,
  dirVar = "DIR",
  startsVar = "connections[STARTPOS]"
) {
  const parse = makeParser(gameDef, player, action);
  const dirMatters = contains(nghDef.draw.neighbours, ["dir"]);
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  let conds = ["POS"];
  if (nghDef.condition) conds.push(parse.bool(nghDef.condition));
  if (nghDef.ifover) conds.push(parse.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parse.set(nghDef.unlessover) + "[POS]");
  return `
    var POS=${startsVar}[${dirVar}];
    if (${conds.join(" && ")}){
      ${countMatters ? "foundneighbours.push(POS); " : ""}
      ${countMatters && dirMatters ? "foundneighbourdirs.push(DIR); " : ""}
      ${
        !countMatters
          ? draw(gameDef, player, action, nghDef.draw.neighbours)
          : ""
      }
    }
  `;
}
