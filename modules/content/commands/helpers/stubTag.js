const fs = require("fs-extra");
const path = require("path");

const stubTag = id => {
  const out = path.join(__dirname, `../../material/tags/${id}`);
  if (fs.existsSync(out)) {
    throw new Error(`Tag ${id} already exists!`);
  } else if (!id || id.match(/[^A-Za-z0-9]/)) {
    throw new Error(
      `Illegal id "${id}", should be string with letters/numbers only`
    );
  } else {
    fs.ensureDirSync(out);
    fs.ensureDirSync(path.join(out, `pics`));
    fs.writeFileSync(
      path.join(out, `tag.md`),
      `---
id: "${id}"
title: "${id}"
slug: "add_your_unique_never_changing_url_slug_here"
blurb: "Add short description here!"
thumbnail: "picToUseAsThumbnail.png"
mainImage: "some_picture.jpg"
sort: 42
updated: ${new Date().toISOString().slice(0, 10)}
---

Some games are tagged with ${id}! :D
`
    );
  }
};

module.exports = stubTag;
