import * as isObject from "lodash/isObject";
import * as isArray from "lodash/isArray";
import * as isEqual from "lodash/isEqual";
import * as some from "lodash/some";
import * as reduce from "lodash/reduce";
import * as invert from "lodash/invert";
import * as uniq from "lodash/uniq";

import { FullDefAnon } from "./types";

// only used in blankUnitLayers, but needs to be its own function since it is recursive
export function deduceDynamicGroups(rules: any) {
  return uniq(
    rules[0] === "spawn"
      ? possibilities(rules[2])
      : rules[0] === "spawnin"
      ? possibilities(rules[2])
      : { setat: 1, setid: 1, setin: 1 }[rules[0]] &&
        contains(possibilities(rules[2]), "group")
      ? possibilities(rules[3])
      : isArray(rules) || isObject(rules)
      ? reduce(rules, (mem, def) => mem.concat(deduceDynamicGroups(def)), [])
      : []
  )
    .filter(g => typeof g === "string")
    .sort();
}

export function blankUnitLayers(gameDef: FullDefAnon) {
  return reduce(
    Object.keys(gameDef.setup || {})
      .concat(deduceDynamicGroups(gameDef.flow.commands || {}))
      .concat("units"),
    (mem, g) => ({
      ...mem,
      [g]: {},
      ["my" + g]: {},
      ["opp" + g]: {},
      ["neutral" + g]: {}
    }),
    {}
  );
}

export function isTerrainLayerRef(gameDef: FullDefAnon, name) {
  let names = Object.keys(getTerrain(gameDef));
  let variants = names.reduce((mem, n) => {
    ["my", "opp", "neutral", "no"].forEach(prefix => {
      if (contains(gameDef, prefix + n)) {
        mem.push(prefix + n);
      }
    });
    return mem;
  }, []);
  return names.concat(variants).indexOf(name) !== -1;
}

export function ifCodeContains(
  code: string,
  lines: { [needle: string]: string }
) {
  return Object.keys(lines).reduce(
    (mem, needle) => (code.match(needle) ? mem + " " + lines[needle] : mem),
    ""
  );
}

export function getTerrain(gameDef: FullDefAnon) {
  return Object.assign(
    {},
    (gameDef && gameDef.board && gameDef.board.terrain) || {},
    (gameDef && gameDef.AI && gameDef.AI.terrain) || {}
  );
}

/*
  Calculates all layers used by a generator
  */
export function generatorLayers(gendef) {
  return reduce(
    gendef.tolayer ? { foo: gendef } : gendef.draw,
    (mem2, drawdef) => {
      return reduce(
        possibilities(drawdef.tolayer),
        (mem3, l) => {
          const list =
            drawdef.include && drawdef.include.hasOwnProperty("owner")
              ? [l, "my" + l, "opp" + l, "neutral" + l]
              : [l];
          return reduce(list, (mem4, l) => ({ ...mem4, [l]: {} }), mem3);
        },
        mem2
      );
    },
    {}
  );
}

export function blankArtifactLayers(gameDef: FullDefAnon) {
  return reduce(
    gameDef.generators,
    (mem, genDef, key) => {
      return Object.assign(mem, generatorLayers(genDef));
    },
    {}
  );
}

export function isTerrainNeutral(gameDef: FullDefAnon) {
  return !Object.keys(getTerrain(gameDef)).filter(t => t[1] || t[2]).length;
}

export function contains(haystack, needle): boolean {
  if (!haystack) {
    return false;
  } else if (isEqual(needle, haystack)) {
    return true;
  } else if (isArray(haystack) || isObject(haystack)) {
    return some(haystack, child => contains(child, needle));
  } else {
    return false;
  }
}

export function usesTurnVars(search: FullDefAnon | any): boolean {
  return (
    contains(search, "turnvar") ||
    contains(search, "turnpos") ||
    contains(search, "setturnvar") ||
    contains(search, "setturnpos")
  );
}

export function usesBattleVars(search: FullDefAnon | any): boolean {
  return (
    contains(search, "battlevar") ||
    contains(search, "battlepos") ||
    contains(search, "setbattlevar") ||
    contains(search, "setbattlepos")
  );
}

const colnametonumber = reduce(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),
  (mem, char, n) => {
    mem[char] = n + 1;
    return mem;
  },
  {}
);

const colnumbertoname = invert(colnametonumber);

export function pos2coords(pos) {
  return {
    x: colnametonumber[pos[0]],
    y: parseInt(pos.substr(1))
  };
}

export function coords2pos(coords) {
  return colnumbertoname[coords.x] + coords.y;
}

export function possibilities(def) {
  return def[0] === "ifelse"
    ? possibilities(def[2]).concat(possibilities(def[3]))
    : def[0] === "playercase"
    ? possibilities(def[1]).concat(possibilities(def[2]))
    : def[0] === "if"
    ? possibilities(def[2])
    : def[0] === "ifplayer"
    ? possibilities(def[2])
    : def[0] === "indexlist"
    ? def[2]
    : [def];
}

export function listlength(def) {
  if (def[0] === "list") {
    return listlength(def[1]);
  } else if (def[0] === "playercase") {
    let len1 = listlength(def[1]);
    let len2 = listlength(def[2]);
    return len1 && len2 && len1 === len2 ? len1 : undefined;
  } else if (def[0] === "ifelse") {
    let len1 = listlength(def[2]);
    let len2 = listlength(def[3]);
    return len1 && len2 && len1 === len2 ? len1 : undefined;
  } else {
    return def.length;
  }
}
