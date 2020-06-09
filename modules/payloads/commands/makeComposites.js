const fs = require("fs-extra");
const path = require("path");
const fm = require("front-matter");
const tagsFolder = path.join(__dirname, "../material/tags");
const prettier = require("prettier");
const composite = require("../../graphics/composite");

const content = path.join(__dirname, "../../content/material");

const toMake = [
  { name: "tags", folder: "tags", info: "tag.md" },
  { name: "news", folder: "news", info: "news.md" },
  { name: "about", folder: "about", info: "about.md" },
];

async function makeComposite(opts) {
  const { name, folder, info } = opts;
  const paths = fs
    .readdirSync(path.join(content, folder))
    .filter(f => f != ".DS_Store")
    .map(t => {
      const thumbnail = fm(
        fs.readFileSync(path.join(content, folder, t, info)).toString()
      ).attributes.thumbnail;
      return path.join(content, folder, t, "pics", thumbnail);
    });
  await composite({ paths, size: 140, name });
}

(async function() {
  for (const thing of toMake) {
    await makeComposite(thing);
  }
  const actionShotsFolder = path.join(
    __dirname,
    "../../graphics/dist/actionShots"
  );
  const actionShots = fs
    .readdirSync(actionShotsFolder)
    .filter(f => f != ".DS_Store")
    .map(p => p.match(/([^/]*)$/)[0])
    .map(gameId => path.join(actionShotsFolder, gameId, `${gameId}_small.jpg`));
  await composite({
    name: "games",
    paths: actionShots,
    size: 140,
  });
})();
