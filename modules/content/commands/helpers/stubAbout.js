const fs = require("fs-extra");
const path = require("path");

const stubAbout = id => {
  const out = path.join(__dirname, `../../material/about/${id}`);
  if (fs.existsSync(out)) {
    throw new Error(`News ${id} already exists!`);
  } else if (!id || id.match(/[^A-Za-z0-9]/)) {
    throw new Error(
      `Illegal id "${id}", should be string with letters/numbers only`
    );
  } else {
    fs.ensureDirSync(out);
    fs.ensureDirSync(path.join(out, `pics`));
    fs.writeFileSync(
      path.join(out, `about.md`),
      `---
id: "${id}"
title: "${id}"
slug: "add_your_unique_never_changing_url_slug_here"
blurb: "Add short description here!"
thumbnail: "picToUseAsThumbnail.png"
mainImage: "some_picture.jpg"
sort: 42
---

Come one, come all, read all about ${id}! :D
`
    );
  }
};

module.exports = stubAbout;
