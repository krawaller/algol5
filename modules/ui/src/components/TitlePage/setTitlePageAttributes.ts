import { homeNav } from "../../../../common/nav/homeNav";
import { AlgolPage } from "../../../../types";

/*
This is a separate function since we want to add these same attributes in the next
module, in the container for lazy-loaded title page
*/

export const setTitlePageAttributes = (TitlePage: AlgolPage) => {
  TitlePage.title = "Chessicals";
  TitlePage.nav = homeNav;
  TitlePage.mainImage = "/images/title.png";
};
