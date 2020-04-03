import { makeAboutPage } from "./helpers/makeAboutPage";
import { aboutList } from "../../content/dist/aboutList";

const aboutId = process.argv[2];

if (!aboutId) {
  console.log("---- Making pages for all about ----");
  for (const data of aboutList) {
    makeAboutPage(data);
  }
  console.log("---- All about got pages ----");
} else {
  const data = aboutList.find(d => d.id === aboutId);
  if (!data) {
    console.log(`About "${aboutId}" doesn't exists!`);
  } else {
    makeAboutPage(data);
  }
}
