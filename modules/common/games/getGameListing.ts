import { GameId } from "../../games/dist/list";
import meta from "../../games/dist/meta";
import actionShots from "../../graphics/dist/allRegularActionShots";
import { AlgolArticleListing } from "../../types";
import { gameSlug } from "../utils";

export const getGameListing = (gameId: GameId): AlgolArticleListing => ({
  id: gameId,
  blurb: meta[gameId].tagline,
  preloads: [],
  url: `/games/${gameSlug(meta[gameId])}`,
  title: meta[gameId].name,
  thumbdata: actionShots[gameId],
  sort: gameId,
});
