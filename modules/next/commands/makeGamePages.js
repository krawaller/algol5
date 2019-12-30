const fs = require("fs-extra");
const path = require("path");
const list = require("../../games/dist/gameList");

const out = path.join(__dirname, "../pages/games");
fs.emptyDirSync(out);

for (const gameId of list) {
  const content = `
  import React from "react";
  
  import ${gameId} from "../../../../logic/dist/indiv/${gameId}";
  import { Tester } from "../../../../ui/src/components/Tester";
  import { makeStaticGameAPI } from "../../../../battle/src";
  import { Master } from "../../../components";
  import graphics from "../../../../graphics/dist/svgDataURIs/${gameId}";
  import meta from "../../../../games/dist/meta/${gameId}";
  
  export const Game = () => {
    return (
      <Master title={meta.name}>
        <Tester api={makeStaticGameAPI(${gameId})} graphics={graphics} link={meta.source} />
      </Master>
    );
  };
  
  export default Game;
  `;
  fs.emptyDirSync(path.join(out, gameId));
  fs.writeFileSync(path.join(out, gameId, "index.tsx"), content);
  console.log("Created page for", gameId);
}
