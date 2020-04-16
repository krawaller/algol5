import { makeNewsPage } from "./helpers/makeNewsPage";
import newsList from "../../payloads/dist/articles/news";

const newsId = process.argv[2];

if (!newsId) {
  console.log("---- Making pages for all news ----");
  for (const data of newsList) {
    makeNewsPage(data);
  }
  console.log("---- All news got pages ----");
} else {
  const data = newsList.find(d => d.id === newsId);
  if (!data) {
    console.log(`News "${newsId}" doesn't exists!`);
  } else {
    makeNewsPage(data);
  }
}
