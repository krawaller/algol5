import { makeTagPage } from "./helpers/makeTagPage";
import tags from "../../payloads/dist/articles/tags";

const tagId = process.argv[2];

if (!tagId) {
  console.log("---- Making pages for all tags ----");
  for (const tag of tags) {
    makeTagPage(tag);
  }
  console.log("---- All tags got pages ----");
} else {
  const tag = tags.find(t => t.id === tagId);
  if (!tag) {
    console.log(`Tag "${tagId}" doesn't exists!`);
  } else {
    makeTagPage(tag);
  }
}
