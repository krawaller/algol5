import { FullDef } from "../types";
import makeParser from "./";

export default function parseBool(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  expression
) {
  const parse = makeParser(gameDef, player, action, "boolean");
  const [type, ...args] = expression;
  switch (type) {
    case "cmndavailable": {
      if (action === "rules") {
        return "false";
      }
      const [cmndname] = args;
      let special = makeParser(gameDef, player, action, "position");
      let name = special.val(cmndname);
      return `
        Object.keys(turn.links[step.stepid]).filter(function(action){
          return action === ${name};
        }).length
      `;
    }
    case "markavailable": {
      const [markname] = args;
      let special = makeParser(gameDef, player, action, "position");
      let name = special.val(markname);
      return `
        Object.keys(turn.links[step.stepid]).filter(function(action){
          let func = turn.links[step.stepid][action];
          return func.substr(0,func.length-1) === ${name};
        }).length
      `;
    }
    case "truthy": {
      const [val] = args;
      return `!!${parse.val(val)}`;
    }
    case "falsy": {
      const [val] = args;
      return `!${parse.val(val)}`;
    }
    case "same": {
      const [v1, v2] = args;
      return `(${parse.val(v1)} === ${parse.val(v2)})`;
    }
    case "samepos": {
      const [p1, p2] = args;
      return `(${parse.pos(p1)} === ${parse.pos(p2)})`;
    }
    case "different": {
      const [v1, v2] = args;
      return `(${parse.val(v1)} !== ${parse.val(v2)})`;
    }
    case "differentpos": {
      const [p1, p2] = args;
      return `(${parse.pos(p1)} !== ${parse.pos(p2)})`;
    }
    case "morethan": {
      const [v1, v2] = args;
      return `(${parse.val(v1)} > ${parse.val(v2)})`;
    }
    case "anyat": {
      const [set, pos] = args;
      return `!!(${parse.set(set)}[${parse.pos(pos)}])`;
    }
    case "noneat": {
      const [set, pos] = args;
      return `!(${parse.set(set)}[${parse.pos(pos)}])`;
    }
    case "overlaps": {
      const sets = args;
      return parse.bool(["notempty", ["intersect", ...sets]]);
    }
    case "isempty": {
      const [set] = args;
      return `Object.keys(${parse.set(set)}).length === 0`;
    }
    case "notempty": {
      const [set] = args;
      return `Object.keys(${parse.set(set)}).length !== 0`;
    }
    case "and": {
      const bools = args;
      return `(${bools.map(b => parse.bool(b)).join(" && ")})`;
    }
    case "or": {
      const bools = args;
      return `(${bools.map(b => parse.bool(b)).join(" || ")})`;
    }
    case "higher": {
      const [pos1, pos2] = args;
      return `(BOARD.board[${parse.pos(pos1)}].y > BOARD.board[${parse.pos(
        pos2
      )}].y)`;
    }
    case "further": {
      const [pos1, pos2] = args;
      return `(BOARD.board[${parse.pos(pos1)}].x > BOARD.board[${parse.pos(
        pos2
      )}].x)`;
    }
    case "not": {
      const [bool] = args;
      return `!${parse.bool(bool)}`;
    }
    case "true": {
      return "true";
    }
    case "false": {
      return "false";
    }
    case "valinlist": {
      const [val, list] = args;
      return `(${parse.list(list)}.indexOf(${parse.val(val)}) !== -1)`;
    }
    default:
      throw "Unknown bool! Boolshit! " + expression;
  }
}
