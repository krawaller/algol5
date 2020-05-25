import { makePayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import games from "../../../payloads/dist/listings/games";
import { gameIndexNav } from "../../../common/nav/gameIndexNav";

// TODO - more metadata!

const title = `All ${games.length} games`;

const GameIndexPage = makePayloadArticleListPage(games, title);
GameIndexPage.title = title;
GameIndexPage.nav = gameIndexNav;

export default GameIndexPage;
