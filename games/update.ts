const fs = require("fs-extra");
const path = require("path");
const beautify = require("js-beautify");
import { FullDef } from "./types";
import analyze from "./analyze";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

export default function update(gameId, def: FullDef) {
  return Promise.all(
    Object.keys(def).map(aspect => {
      const apath = `./definitions/${gameId}/${aspect}.ts`;
      return new Promise((resolve, reject) => {
        fs.readFile(apath, (err, f) => {
          fs.writeFile(
            apath,
            f
              .toString()
              .replace(/ = {[\s\S]*};/, ` = ${makeNice(def[aspect])};`),
            () => {
              resolve();
            }
          );
        });
      });
    })
  ).then(() => {
    console.log("Updated files for", gameId);
    analyze(def);
  });
}
