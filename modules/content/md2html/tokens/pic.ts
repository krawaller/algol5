import fs from "fs-extra";
import path from "path";
import { TokenHandler } from "./_handler";

// Takes a PIC token and inlines it as dataURI image. expects `name`, `cred` and `title`

export const pic: TokenHandler = opts => {
  const { args, picSourcePath, gameId, picRefPath } = opts;
  const { name, inline, title, cred } = args;
  if (!name) {
    throw new Error("Have to provide picture filename");
  }
  if (!cred) {
    throw new Error("Must provide cred for image " + name);
  }
  if (!title) {
    throw new Error("Must provide title for image " + name);
  }
  if (!fs.existsSync(picSourcePath)) {
    throw new Error("Could not find " + picSourcePath);
  }
  let src;
  if (inline) {
    src = encodePic(path.join(picSourcePath, name));
  } else {
    if (!picRefPath) {
      throw new Error("Refered pic " + name + " but no picRefPath provided!");
    }
    src = `/images/${gameId}/${name}`;
  }
  return `<div class="md-img"><img src="${src}" alt="${title}" title="${title}" />${
    cred
      ? `<div class="md-img-info"><span>${title}</span><span>${cred}</span></div>`
      : ""
  }</div>`;
};

const support = ["png", "svg", "jpg"];

const encodePic = (filePath: string) => {
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
