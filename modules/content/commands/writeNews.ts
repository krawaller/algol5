import { writeNews } from "./helpers";

const date = process.argv[2];

if (!date) {
  console.log("Writing all news not supported yet!");
} else {
  writeNews(date);
}
