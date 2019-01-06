import { FullDef } from "../../../types";
import overwrite from "./overwrite";

import lib from '../../dist/lib';

export default async function updateDefinitions(translator: (d: FullDef) => FullDef) {
  await Promise.all(Object.keys(lib).map(async gameId => {
    const oldDef: FullDef = lib[gameId];
    const newDef = translator(oldDef);
    return await overwrite(gameId, newDef);
  }));
}
