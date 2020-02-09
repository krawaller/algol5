import path from "path";
import fs from "fs-extra";

const support = ["png", "svg", "jpg"];

export const encodePic = (filePath: string) => {
  const ext = path.extname(filePath).substr(1);
  if (support.includes(ext)) {
    let data;
    try {
      data = fs.readFileSync(filePath);
    } catch (e) {
      throw new Error("Failed to read picture " + filePath);
    }
    const base64 = `data:image/${
      ext === "svg" ? "svg+xml" : ext
    };base64,${data.toString("base64")}`;
    return base64;
  }
  throw new Error(`Extension ${ext} not supported`);
};
