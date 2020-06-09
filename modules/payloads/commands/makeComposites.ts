const fs = require("fs-extra");
const path = require("path");
const tagsFolder = path.join(__dirname, "../material/tags");
const prettier = require("prettier");
const composite = require("../../graphics/composite");

const content = path.join(__dirname, "../../content/dist");
const root = path.join(__dirname, "../dist/composites");

const toMake = [
  { name: "tags", folder: "tags" },
  { name: "news", folder: "news" },
  { name: "about", folder: "about" },
];

const compositeSize = 160;

async function makeComposite(opts) {
  const { name, folder } = opts;
  const paths = fs
    .readdirSync(path.join(content, folder))
    .filter(f => f != ".DS_Store")
    .map(t => {
      const { thumbnail } = require(path.join(
        content,
        folder,
        t,
        "listing.ts"
      )).listing;
      return path.join(content, folder, t, "pics", thumbnail);
    });
  await composite({ paths, size: compositeSize, name, root });
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
    size: compositeSize,
    root,
  });
})();
