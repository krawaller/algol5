import { FullDefAnon } from "algol-types";
import overwrite from "./overwrite";

import lib from "../../dist/lib";

export default async function updateDefinitions(
  translator: (d: FullDefAnon) => FullDefAnon
) {
  await Promise.all(
    Object.keys(lib).map(async gameId => {
      const oldDef: FullDefAnon = lib[gameId];
      const newDef = translator(oldDef);
      return await overwrite(gameId, newDef);
    })
  );
}
