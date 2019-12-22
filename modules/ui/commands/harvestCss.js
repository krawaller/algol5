const fs = require("fs-extra");
const path = require("path");
const prettier = require("prettier");

const noCrap = d => Boolean(d) && d !== ".DS_Store" && d !== "node_modules";
const isCss = p => p.slice(-4) === ".css";
const isJsCss = p => p.slice(-7) === ".css.js";

const seenClasses = {};
const seenKeyframes = {};
const builtFiles = {};

let harvested = "/******** Collected CSS from all UI components ********/\n\n";

const root = path.join(__dirname, "../src");
const out = path.join(__dirname, "../dist");

fs.emptyDirSync(out);

const toCheck = [root];
while (toCheck.length) {
  const p = toCheck.shift();
  if (fs.lstatSync(p).isDirectory()) {
    toCheck.push(
      ...fs
        .readdirSync(p)
        .filter(noCrap)
        .map(n => path.join(p, n))
    );
  } else if (isCss(p)) {
    const content = fs.readFileSync(p).toString();
    const name = p.split("/").pop();

    harvested += `/* ------- Harvested from ${name} -------- */\n\n` + content;
    const classes = [
      ...new Set(
        content.match(/([^0-9A-Za-z]|^)\.[A-Za-z_-][A-Za-z0-9_-]*/g) || []
      ),
    ].map(cls => cls.replace("\n", "").replace(/^.*\./, ""));
    for (const cls of classes) {
      if (seenClasses[cls]) {
        throw new Error(`Duplicate class ${cls} in ${name}`);
      }
    }
    for (const cls of classes) {
      seenClasses[cls] = true;
    }
    const keyframes =
      content.match(/\[\n ^]@keyframes ([A-Za-z0-9_-]*)/g) || [];
    for (const keyframe of keyframes) {
      if (seenKeyframes[keyframe]) {
        throw new Error(`Duplicate keyframe ${keyframe} in ${name}`);
      }
      seenKeyframes[keyframe] = true;
    }
    const code = `// Generated from ${name}

    const styles = {${classes.map(cls => `"${cls}": "${cls}",\n`).join("")}};
    export default styles
    `;
    fs.writeFileSync(p + ".js", prettier.format(code, { filepath: "foo.js" }));
    builtFiles[p + ".js"] = true;
  } else if (isJsCss(p)) {
    // old file, clean it up!
    if (!builtFiles[p]) {
      console.log("Removing", p);
      fs.removeSync(p);
    }
  }
}

fs.ensureDir(out);
fs.writeFileSync(path.join(out, "styles.css"), harvested);