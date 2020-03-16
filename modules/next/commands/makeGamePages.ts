import fs from "fs-extra";
import path from "path";
import lib from "../../games/dist/lib";
import { punctuate } from "../../common";

const out = path.join(__dirname, "../pages/games");
fs.emptyDirSync(out);

for (const [gameId, def] of Object.entries(lib)) {
  const metaDesc = `Play the abstract board game ${
    def.meta.name
  } at Chessicals! ${punctuate(def.meta.tagline)}`;
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
const content = { about, rules };

export const Game = () => {
  const preloadTags = preloads.map(url => <link key={url} rel="preload" as="image" href={url} /> )
  return (
    <Fragment>
      <Head>
        <meta property="og:site_name" content="Chessicals"/>
        <meta property="og:image" content="/images/games/${gameId}/${gameId}_${def.variants[0].code}_active.png"/>
        <meta property="og:title" content="Play ${def.meta.name} online"/>
        <meta property="og:description" content="${metaDesc}"/>
        <title>{meta.name}</title>
        {preloadTags}
      </Head>
      <GamePage
        api={api}
        content={content}
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