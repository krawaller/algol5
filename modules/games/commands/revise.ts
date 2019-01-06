import update from './helpers/update';
import { FullDef } from '../../types';

function translator(def: FullDef): FullDef {
  return def;
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
