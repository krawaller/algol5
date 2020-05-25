import { makePayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import news from "../../../payloads/dist/listings/news";
import { newsIndexNav } from "../../../common/nav/newsIndexNav";

// TODO - more metadata!

const NewsIndexPage = makePayloadArticleListPage(news, "News");

NewsIndexPage.title = "News";
NewsIndexPage.nav = newsIndexNav;

export default NewsIndexPage;
