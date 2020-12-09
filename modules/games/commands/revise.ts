import update from "./helpers/update";
import { FullDefAnon } from "../../types";

function translator(def: FullDefAnon): FullDefAnon {
  const { performance = {}, ...otherMeta } = def.meta;
  return {
    ...def,
    meta: otherMeta,
    performance: {
      ...performance,
      massiveTree: {},
    },
  };
  // // revise scripts
  // return {
  //   ...def,
  //   scripts: Object.keys(def.scripts).reduce((mem, scriptName) => ({
  //     ...mem,
  //     [scriptName]: def.scripts[scriptName].map(([commands, include, exclude]) => ({
  //       commands,
  //       ...include && include.length && { include },
  //       ...exclude && exclude.length && { exclude },
  //     }))
  //   }), {})
  // }
}

update(translator);
