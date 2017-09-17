var fs = require("fs-extra");

fs.removeSync("dist");

fs.copySync(__dirname + "/../graphics/dist", __dirname + "/dist/images");
fs.copySync(__dirname + "/../engine/dist/algol_worker.js", __dirname + "/dist/algol_worker.js");
fs.copySync(__dirname + "/styles.css", __dirname + "/dist/styles.css");

var html = fs.readFileSync(__dirname + "/template.html").toString();

fs.writeFileSync(__dirname + "/dist/index.html", html.replace("BUNDLEPATH", "bundle.js"));