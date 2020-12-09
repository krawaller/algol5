import fs from "fs-extra";
import path from "path";
import { TokenHandler } from "./_handler";
import { encodePic } from "../../utils";
const sizeOf = require("image-size");

// Takes a PIC token and inlines it as dataURI image. expects `name`, `cred` and `title`

export const pic: TokenHandler = opts => {
  const { args, picSourcePath, picRefPath } = opts;
  // eslint-disable-next-line prefer-const
  let { name, inline, title, cred, credurl, naked } = args;
  if (!name) {
    throw new Error("Have to provide picture filename");
  }
  if (!fs.existsSync(picSourcePath)) {
    throw new Error("Could not find " + picSourcePath);
  }
  if (!cred && !naked) {
    throw new Error("Must provide cred for image " + name);
  }
  if (!title && !naked) {
    throw new Error("Must provide title for image " + name);
  }
  title = naked ? "" : title.replace(/COMMA/g, ",");
  let src;
  if (inline) {
    src = encodePic(path.join(picSourcePath, name));
  } else {
    if (!picRefPath) {
      throw new Error("Refered pic " + name + " but no picRefPath provided!");
    }
    src = `${picRefPath}/${name}`.replace("//", "/");
  }
  const dims = sizeOf(path.join(picSourcePath, name));
  if (dims.width > 800) {
    throw new Error(`Picture ${name} is too wide! (${dims.width})`);
  }
  const placeholder = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dims.width} ${dims.height}"%3E%3C/svg%3E`;
  const imgAttrs = !inline
    ? `data-src="${src}" src='${placeholder}'`
    : `src="${src}"`;
  const CredText = credurl
    ? `<span><a href="${credurl.replace(
        /EQUALS/g,
        "="
      )}" target="_blank" rel="noopener">${cred}</a></span>`
    : `<span>${cred}</span>`;
  return `<div class="md-img${
    !inline ? " md-img-with-placeholder" : ""
  }"><img ${imgAttrs} alt="${title}" title="${title}" />${
    naked
      ? ""
      : `<div class="md-img-info"><span>${title}</span>${CredText}</div>`
  }</div>`;
};
