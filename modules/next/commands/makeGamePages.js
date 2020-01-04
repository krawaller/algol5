const fs = require("fs-extra");
const path = require("path");
const list = require("../../games/dist/gameList");

const out = path.join(__dirname, "../pages/games");
fs.emptyDirSync(out);

for (const gameId of list) {
  const content = `
  import React from "react";
  
  import ${gameId} from "../../../../logic/dist/indiv/${gameId}";
  import { GamePage } from "../../../../ui/src/components/GamePage";
  import { makeStaticGameAPI } from "../../../../battle/src";
  import { Master } from "../../../components";
  import { pageActions } from "../../../helpers";
  import graphics from "../../../../graphics/dist/svgDataURIs/${gameId}";
  import meta from "../../../../games/dist/meta/${gameId}";
  import demo from "../../../../battle/dist/demos/${gameId}";
  
  export const Game = () => {
    return (
      <Master title={meta.name}>
        <GamePage
          api={makeStaticGameAPI(${gameId})}
          graphics={graphics}
          meta={meta}
          demo={demo}
          actions={pageActions} 
        />
      </Master>
    );
  };
  
  export default Game;
  `;
  fs.emptyDirSync(path.join(out, gameId));
  fs.writeFileSync(path.join(out, gameId, "index.tsx"), content);
  console.log("Created page for", gameId);
}
