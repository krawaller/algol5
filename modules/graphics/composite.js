const path = require("path");
const fs = require("fs-extra");
const { createCanvas, loadImage } = require("canvas");

const outBase = path.join(__dirname, "dist/composites");

/**
 * @typedef {Object} CompositeOpts
 * @property {string[]} paths List of paths to square images with unique names
 * @property {string} name Name for composite
 * @property {number} size Square side length
 */

/**
 * Create a composite image
 * @param {CompositeOpts} opts
 */
const composite = async opts => {
  const { size, paths, name } = opts;
  paths.sort((p1, p2) => (path.basename(p1) < path.basename(p2) ? -1 : 1));
  const perRow = 5;
  const rows = Math.ceil(paths.length / perRow);
  const canvas = createCanvas(perRow * size, rows * size);
  const ctx = canvas.getContext("2d");
  const buffers = await Promise.all(
    paths.map(
      p => new Promise(res => fs.readFile(p, {}, (err, data) => res(data)))
    )
  );
  const images = await Promise.all(buffers.map(loadImage));
  const map = {};
  for (let i = 0; i < images.length; i++) {
    const row = Math.floor(i / perRow);
    const col = row * perRow ? i % (row * perRow) : i;
    const x = col * size;
    const y = row * size;
    ctx.drawImage(images[i], x, y, size, size);
    const pname = path.basename(paths[i]);
    map[pname] = { x, y };
  }
  const jpgStream = canvas.createJPEGStream();
  const outFolder = path.join(outBase, name);
  await fs.ensureDir(outFolder);
  const outStream = fs.createWriteStream(path.join(outFolder, `${name}.jpg`));
  await new Promise(resolve => {
    outStream.on("finish", resolve);
    jpgStream.pipe(outStream);
  });
  await new Promise(res => {
    fs.writeFile(
      path.join(outFolder, `${name}.js`),
      `const map = ${JSON.stringify(map)}; export default map;`,
      res
    );
  });
  console.log("Composite created for", name);
};

module.exports = composite;
