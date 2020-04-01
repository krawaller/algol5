const fs = require("fs-extra");
const path = require("path");

const support = ["png", "svg"];

const img2data = f => {
  const ext = path.extname(f).substr(1);
  if (!support.includes(ext)) {
    throw new Error(`Cannot make data URI for images of type "${ext}"`);
  }
  const data = fs.readFileSync(f);
  const base64 = `data:image/${
    ext === "svg" ? "svg+xml" : ext
  };base64,${data.toString("base64")}`;
  return base64;
};

module.exports = img2data;
