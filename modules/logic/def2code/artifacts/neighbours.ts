import { FullDefAnon } from "../types";
import makeParser from "../expressions";
import { contains, listlength } from "../utils";
import draw from "./draw";

// TODO - not drawing counted?

export default function executeNeighbours(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  nghDef: any
) {
  const parse = makeParser(gameDef, player, action);
  // single start
  if (nghDef.start) {
    return `
      let STARTPOS = ${parse.pos(nghDef.start)};
      ${findAndDrawNeighboursFromStart(gameDef, player, action, nghDef)}
      ${draw(gameDef, player, action, nghDef.draw.start, "STARTPOS")}
    `;
    // many starts, must loop
  } else {
    return `
      for(let STARTPOS in ${parse.set(nghDef.starts)}){
        ${findAndDrawNeighboursFromStart(gameDef, player, action, nghDef)}
        ${draw(gameDef, player, action, nghDef.draw.start, "STARTPOS")}
      }
    `;
  }
}

function findAndDrawNeighboursFromStart(
  gameDef: FullDefAnon,
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
      let NEIGHBOURCOUNT = foundneighbours.length;
    `;
  } else if (nghDef.dirs && counting && nghDef.draw.neighbours) {
    // many dirs, counting, drawing neigh
    return `
      ${findManyNeighbours(gameDef, player, action, nghDef)}
      let NEIGHBOURCOUNT = foundneighbours.length;
      for(let neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){
        POS=foundneighbours[neighbournbr];
        ${dirMatters ? "let DIR=foundneighbourdirs[neighbournbr]; " : ""}
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
      let DIR=${parse.val(nghDef.dir)};
      ${findAndDrawSingleNeighbour(gameDef, player, action, nghDef)}
    `;
  }
}

function findAndDrawSingleNeighbour(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  nghDef: any,
  dirVar = "DIR"
) {
  const parse = makeParser(gameDef, player, action);
  const drawCaresAboutCount = contains(nghDef.draw, ["neighbourcount"]);
  let conds = ["POS"];
  if (nghDef.condition) conds.push(parse.bool(nghDef.condition));
  if (nghDef.ifover) conds.push(parse.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parse.set(nghDef.unlessover) + "[POS]");
  return `
    ${drawCaresAboutCount ? "let NEIGHBOURCOUNT;" : ""}
    let POS=connections[STARTPOS][${dirVar}];
    if (${conds.join(" && ")}){
      ${drawCaresAboutCount ? "NEIGHBOURCOUNT=1; " : ""}
      ${draw(gameDef, player, action, nghDef.draw.neighbours)}
    }
  `;
}

function findManyNeighbours(
  gameDef: FullDefAnon,
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
    let neighbourdirs = ${parse.list(nghDef.dirs)};
    ${predictedNbrOfDirs ? "" : "let nbrofneighbourdirs=neighbourdirs.length; "}
    ${countMatters ? "let foundneighbours = []; " : ""}
    ${countMatters && dirMatters ? "let foundneighbourdirs=[]; " : ""}
    let startconnections = connections[STARTPOS];
    for(let dirnbr=0;dirnbr<${nbrOfDirs};dirnbr++){
      ${dirMatters ? "let DIR=neighbourdirs[dirnbr]; " : ""}
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
  gameDef: FullDefAnon,
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
    let POS=${startsVar}[${dirVar}];
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
