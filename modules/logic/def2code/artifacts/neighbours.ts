import { FullDefAnon, NeighbourDefAnon } from "../../../types";
import makeParser from "../expressions";
import { contains } from "../utils";
import draw from "./draw";

// TODO - not drawing counted?

export default function executeNeighbours(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  nghDef: NeighbourDefAnon
) {
  const parser = makeParser(gameDef, player, action);
  // single start
  if (nghDef.start) {
    return `
      let STARTPOS = ${parser.pos(nghDef.start)};
      ${findAndDrawNeighboursFromStart(gameDef, player, action, nghDef)}
      ${draw(gameDef, player, action, nghDef.draw.start, "STARTPOS")}
    `;
    // many starts, must loop
  } else {
    return `
      for(let STARTPOS in ${parser.set(nghDef.starts)}){
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
  nghDef: NeighbourDefAnon
) {
  const parser = makeParser(gameDef, player, action);
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
      ${findAndDrawSingleNeighbour(gameDef, player, action, nghDef, parser.val(
        nghDef.dir
      ) as string)}
    `;
  } else {
    // one dir, sth in def needs to now which
    return `
      let DIR=${parser.val(nghDef.dir)};
      ${findAndDrawSingleNeighbour(gameDef, player, action, nghDef)}
    `;
  }
}

function findAndDrawSingleNeighbour(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  nghDef: NeighbourDefAnon,
  dirVar = "DIR"
) {
  const parser = makeParser(gameDef, player, action);
  const drawCaresAboutCount = contains(nghDef.draw, ["neighbourcount"]);
  let conds = ["POS"];
  if (nghDef.condition) conds.push(parser.bool(nghDef.condition) as string);
  if (nghDef.ifover) conds.push(parser.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parser.set(nghDef.unlessover) + "[POS]");
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
  nghDef: NeighbourDefAnon
) {
  const parser = makeParser(gameDef, player, action);
  const dirMatters = contains(
    [nghDef.draw.neighbours, nghDef.condition],
    ["dir"]
  );
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  return `
    ${countMatters ? "let foundneighbours = []; " : ""}
    ${countMatters && dirMatters ? "let foundneighbourdirs=[]; " : ""}
    let startconnections = connections[STARTPOS];
    for(let DIR of ${parser.dirs(nghDef.dirs)}){
      ${findNeighbourInDir(
        gameDef,
        player,
        action,
        nghDef,
        "DIR",
        "startconnections"
      )}
    }
  `;
}

function findNeighbourInDir(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  nghDef: NeighbourDefAnon,
  dirVar = "DIR",
  startsVar = "connections[STARTPOS]"
) {
  const parser = makeParser(gameDef, player, action);
  const dirMatters = contains(nghDef.draw.neighbours, ["dir"]);
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  let conds = ["POS"];
  if (nghDef.condition) conds.push(parser.bool(nghDef.condition) as string);
  if (nghDef.ifover) conds.push(parser.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parser.set(nghDef.unlessover) + "[POS]");
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
