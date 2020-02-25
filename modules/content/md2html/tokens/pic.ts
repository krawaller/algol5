import fs from "fs-extra";
import path from "path";
import { TokenHandler } from "./_handler";
import { encodePic } from "../../utils";

// Takes a PIC token and inlines it as dataURI image. expects `name`, `cred` and `title`

export const pic: TokenHandler = opts => {
  const { args, picSourcePath, picRefPath } = opts;
  let { name, inline, title, cred, credurl } = args;
  if (!name) {
    throw new Error("Have to provide picture filename");
  }
  if (!fs.existsSync(picSourcePath)) {
    throw new Error("Could not find " + picSourcePath);
  }
  if (!cred) {
    throw new Error("Must provide cred for image " + name);
  }
  if (!title) {
    throw new Error("Must provide title for image " + name);
  }
  title = title.replace(/COMMA/g, ",");
  let src;
  if (inline) {
    src = encodePic(path.join(picSourcePath, name));
  } else {
    if (!picRefPath) {
      throw new Error("Refered pic " + name + " but no picRefPath provided!");
    }
    src = `${picRefPath}/${name}`.replace("//", "/");
  }
  return `<div class="md-img"><img src="${src}" alt="${title}" title="${title}" /><div class="md-img-info"><span>${title}</span>${
    credurl
      ? `<span><a href="${credurl.replace(
          /EQUALS/g,
          "="
        )}" target="_blank" rel="noopener">${cred}</a></span>`
      : `<span>${cred}</span>`
  }</div></div>`;
};
