import { FullDefAnon, NeighbourDefAnon } from "../../../../../types";
import { makeParser } from "../../../executors";
import { contains } from "../../../utils";
import draw from "./generate.draw";

// TODO - not drawing counted?

export default function executeNeighbours(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  nghDef: NeighbourDefAnon
) {
  const parser = makeParser(gameDef, player, action, ruleset);

  // Single start
  if (nghDef.start) {
    // inothing cares where single startpos is
    if (nghDef.start && !nghDef.draw.start && !contains(nghDef, ["start"])) {
      return `{ ${findAndDrawNeighboursFromStart(
        gameDef,
        player,
        action,
        ruleset,
        nghDef,
        {
          startVar: parser.pos(nghDef.start) as string,
        }
      )} }`;
    }
    // Something cares about startpos so we must store it
    return `{
      let STARTPOS = ${parser.pos(nghDef.start)};
      ${findAndDrawNeighboursFromStart(
        gameDef,
        player,
        action,
        ruleset,
        nghDef,
        {
          startVar: "STARTPOS",
        }
      )}
      ${draw(gameDef, player, action, ruleset, nghDef.draw.start, "STARTPOS")}
    }`;
  }

  // many starts, we must loop for each one
  return `
      for(let STARTPOS in ${parser.set(nghDef.starts!)}){
        ${findAndDrawNeighboursFromStart(
          gameDef,
          player,
          action,
          ruleset,
          nghDef,
          {
            startVar: "STARTPOS",
          }
        )}
        ${draw(gameDef, player, action, ruleset, nghDef.draw.start, "STARTPOS")}
      }
    `;
}

function findAndDrawNeighboursFromStart(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  nghDef: NeighbourDefAnon,
  { startVar }: { startVar: string }
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const counting = contains(nghDef.draw, ["neighbourcount"]);
  const dirMatters = contains(nghDef, ["dir"]);
  if (nghDef.dirs && !counting) {
    // many dirs, no counting so they'll be drawn individually
    return `
      ${findManyNeighbours(gameDef, player, action, ruleset, nghDef, {
        startVar,
      })}
    `;
  } else if (nghDef.dirs && counting && !nghDef.draw.neighbours) {
    // many dirs, counting, no draw now
    return `
      ${findManyNeighbours(gameDef, player, action, ruleset, nghDef, {
        startVar,
      })}
      let NEIGHBOURCOUNT = foundneighbours.length;
    `;
  } else if (nghDef.dirs && counting && nghDef.draw.neighbours) {
    // many dirs, counting, drawing neigh
    return `
      ${findManyNeighbours(gameDef, player, action, ruleset, nghDef, {
        startVar,
      })}
      let NEIGHBOURCOUNT = foundneighbours.length;
      for(let neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){
        let POS=foundneighbours[neighbournbr];
        ${dirMatters ? "let DIR=foundneighbourdirs[neighbournbr]; " : ""}
        ${draw(gameDef, player, action, ruleset, nghDef.draw.neighbours)}
      }
    `;
  } else if (nghDef.dir && !dirMatters) {
    // one dir, nothing cares about exactly which
    return `
      ${handleNeighbour(gameDef, player, action, ruleset, nghDef, {
        pos: `connections[${startVar}][${parser.val(nghDef.dir)}]`,
      })}
    `;
  } else {
    // one dir, sth in def needs to now which
    return `
      let DIR=${parser.val(nghDef.dir!)};
      ${handleNeighbour(gameDef, player, action, ruleset, nghDef, {
        pos: `connections[${startVar}][DIR]`,
      })}
    `;
  }
}

function findManyNeighbours(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  nghDef: NeighbourDefAnon,
  { startVar }: { startVar: string }
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const dirMatters = contains(
    [nghDef.draw.neighbours, nghDef.condition],
    ["dir"]
  );
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  return `
    ${countMatters ? "let foundneighbours = []; " : ""}
    ${countMatters && dirMatters ? "let foundneighbourdirs=[]; " : ""}
    let startconnections = connections[${startVar}];
    for(let DIR of ${parser.dirs(nghDef.dirs!)}){
      ${handleNeighbour(gameDef, player, action, ruleset, nghDef, {
        pos: "startconnections[DIR]",
      })}
    }
  `;
}

function handleNeighbour(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  nghDef: NeighbourDefAnon,
  { pos }: { pos: string }
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const dirMatters = contains(nghDef.draw.neighbours, ["dir"]);
  const countMatters = contains(nghDef.draw, ["neighbourcount"]);
  const singleDir = nghDef.dir && !nghDef.dirs;
  const conds = ["POS"];
  if (nghDef.condition) conds.push(parser.bool(nghDef.condition) as string);
  if (nghDef.ifover) conds.push(parser.set(nghDef.ifover) + "[POS]");
  if (nghDef.unlessover)
    conds.push("!" + parser.set(nghDef.unlessover) + "[POS]");
  return `
    ${countMatters && singleDir ? "let NEIGHBOURCOUNT = 0; " : ""}
    let POS=${pos};
    if (${conds.join(" && ")}){
      ${
        countMatters
          ? singleDir
            ? "NEIGHBOURCOUNT = 1;"
            : "foundneighbours.push(POS); "
          : ""
      }
      ${
        countMatters && dirMatters && !singleDir
          ? "foundneighbourdirs.push(DIR); "
          : ""
      }
      ${
        !countMatters || singleDir
          ? draw(gameDef, player, action, ruleset, nghDef.draw.neighbours)
          : ""
      }
    }
  `;
}
