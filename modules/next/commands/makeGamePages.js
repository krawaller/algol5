const fs = require("fs-extra");
const path = require("path");
const list = require("../../games/dist/gameList");

const out = path.join(__dirname, "../pages/games");
fs.emptyDirSync(out);

for (const gameId of list) {
  const content = `
// Generated by the makeGamePages command

import React, { Fragment } from "react";

import Head from "next/head";
import api from "../../../../battle/dist/apis/${gameId}/static";
import { GamePage } from "../../../../ui/src/components/GamePage";
import { pageActions } from "../../../helpers";
import graphics from "../../../../graphics/dist/svgDataURIs/${gameId}";
import meta from "../../../../games/dist/meta/${gameId}";
import demo from "../../../../battle/dist/demos/${gameId}";
import { about } from "../../../../content/dist/games/${gameId}/about";
import { rules } from "../../../../content/dist/games/${gameId}/rules";
import { preloads } from "../../../../content/dist/games/${gameId}/preloads";
const html = { about, rules };

export const Game = () => {
  const preloadTags = preloads.map(url => <link key={url} rel="preload" as="image" href={url} /> )
  return (
    <Fragment>
      <Head>
        <title>{meta.name}</title>
        {preloadTags}
      </Head>
      <GamePage
        api={api}
        html={html}
        graphics={graphics}
        meta={meta}
        demo={demo}
        actions={pageActions} 
      />
    </Fragment>
  );
};

export default Game;
`;
  fs.emptyDirSync(path.join(out, gameId));
  fs.writeFileSync(path.join(out, gameId, "index.tsx"), content);
  console.log("Created page for", gameId);
}
