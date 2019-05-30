import stub from "./stub";
import overwrite from "./overwrite";

import lib from "../../dist/lib";

export default async function retemplate(gameId: string) {
  const savedDef = JSON.parse(JSON.stringify(lib[gameId]));
  await stub(gameId);
  await overwrite(gameId, savedDef);
  console.log(gameId, "is now retemplated");
}
