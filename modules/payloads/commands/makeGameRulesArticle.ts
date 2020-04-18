import { makeGameRulesArticle } from "./helpers/makeGameRulesArticle";
import list from "../../games/dist/list";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---------- making rules articles for all games ---------- ");
  for (const gameId of list) {
    makeGameRulesArticle(gameId);
  }
  console.log("------- all games got rules articles ---------- ");
} else {
  makeGameRulesArticle(gameId);
}
