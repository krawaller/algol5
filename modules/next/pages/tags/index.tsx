import { makePayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import tags from "../../../payloads/dist/listings/tags";
import { tagIndexNav } from "../../../common/nav/tagIndexNav";

// TODO - more metadata!

const TagIndexPage = makePayloadArticleListPage(tags, "Tags");

TagIndexPage.nav = tagIndexNav;
TagIndexPage.title = "Tags";

export default TagIndexPage;
