const fs = require("fs-extra");
const path = require("path");

const stubNews = date => {
  const out = path.join(__dirname, `../../material/news/${date}`);
  if (fs.existsSync(out)) {
    throw new Error(`News ${date} already exists!`);
  } else if (!date || !date.match(/news_2[0-9]{3}_[0-9]{2}_[0-9]{2}/)) {
    throw new Error(
      `Illegal news date "${date}", should be formatted as news_yyyy_mm_dd`
    );
  } else {
    fs.ensureDirSync(out);
    fs.ensureDirSync(path.join(out, `pics`));
    fs.writeFileSync(
      path.join(out, `news.md`),
      `---
id: "${date}"
title: "${date}"
slug: "add_your_unique_never_changing_url_slug_here"
blurb: "Add short description here!"
thumbnail: "picToUseAsThumbnail.png"
mainImage: "some_picture.jpg"
updated: "${date}"
created: "${date}"
---

Omg you can NEVER guess what happened ${date}!! :D
`
    );
  }
};

module.exports = stubNews;
