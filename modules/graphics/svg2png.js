const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");

const svg2png = async svgPath => {
  const buffer = await fs.readFile(svgPath);
  const img = await loadImage(buffer);

  const svg = buffer.toString();
  const dims = svg.match(/^<svg[^>]* viewBox="(\d+) (\d+) (\d+) (\d+)"[^>]*>/);
  if (!dims) {
    throw new Error("Failed to get dimensions for SVG");
  }
  const [, x1, y1, x2, y2] = dims;
  const width = +x2 * 2; // - x1;
  const height = +y2 * 2; // - y1;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.createPNGStream();
};

module.exports = svg2png;
