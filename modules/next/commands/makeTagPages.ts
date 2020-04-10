import { makeTagPage } from "./helpers/makeTagPage";
import { tagList } from "../../content/dist/tagList";

const tagId = process.argv[2];

if (!tagId) {
  console.log("---- Making pages for all tags ----");
  for (const data of tagList) {
    makeTagPage(data);
  }
  console.log("---- All tags got pages ----");
} else {
  const data = tagList.find(d => d.id === tagId);
  if (!data) {
    console.log(`Tag "${tagId}" doesn't exists!`);
  } else {
    makeTagPage(data);
  }
}
