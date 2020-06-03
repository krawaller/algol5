import { makePayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import about from "../../../payloads/dist/listings/about";
import { aboutIndexNav } from "../../../common/nav/aboutIndexNav";

// TODO - more metadata!

const AboutIndexPage = makePayloadArticleListPage(about, "About Chessicals");

AboutIndexPage.nav = aboutIndexNav;
AboutIndexPage.title = "About Chessicals";
AboutIndexPage.metaDesc = "Articles with more information about Chessicals";

export default AboutIndexPage;
