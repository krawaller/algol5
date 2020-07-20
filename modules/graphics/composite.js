const path = require("path");
const fs = require("fs-extra");
const { createCanvas, loadImage } = require("canvas");

/**
 * @typedef {Object} CompositeOpts
 * @property {string[]} paths List of paths to square images with unique names
 * @property {string} name Name for composite
 * @property {string} imageSuffix cache-busting suffix for images
 * @property {number} size Square side length
 * @property {string} root Root folder to create resources in
 */

/**
 * Create a composite image
 * @param {CompositeOpts} opts
 */
const composite = async opts => {
  const { size, paths, name, root, imageSuffix = "" } = opts;
  paths.sort((p1, p2) => (path.basename(p1) < path.basename(p2) ? -1 : 1));
  const perRow = 5;
  const rows = Math.ceil(paths.length / perRow);
  const canvas = createCanvas(perRow * size, rows * size);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    const ratio = images[i].height / images[i].width;
    ctx.drawImage(images[i], x, y, size, size * ratio);
    const pname = path.basename(paths[i]);
    map[pname] = { x, y, ratio };
  }
  const pngStream = canvas.createPNGStream();
  const outFolder = path.join(root, name);
  await fs.ensureDir(outFolder);
  const outStream = fs.createWriteStream(
    path.join(outFolder, `${name}${imageSuffix}.png`)
  );
  await new Promise(resolve => {
    outStream.on("finish", resolve);
    pngStream.pipe(outStream);
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
