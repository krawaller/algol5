const withCSS = require("@zeit/next-css");
const path = require("path");

module.exports = withCSS({
  exportTrailingSlash: true,
  cssModules: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.forEach(rule => {
      if (
        rule.test.toString().includes("tsx|ts") &&
        rule.use &&
        rule.use.loader === "next-babel-loader"
      ) {
        rule.include.push(path.join(__dirname, "../../"));
      }
    });
    return config;
  },
});
