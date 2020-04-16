import { makeGameAboutArticle } from "./helpers/makeGameAboutArticle";
import list from "../../games/dist/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---------- making about articles for all games ---------- ");
  for (const gameId of list) {
    makeGameAboutArticle(gameId);
  }
  console.log("------- all games got about articles ---------- ");
} else {
  makeGameAboutArticle(gameId);
}
