const path = require("path");

module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  exportTrailingSlash: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const babelRule = config.module.rules.find(
      rule =>
        rule.test.toString().includes("tsx|ts") &&
        rule.use &&
        rule.use.loader === "next-babel-loader"
    );
    if (!babelRule) {
      throw new Error("Couldn't find babel rule!");
    }
    babelRule.include.push(path.join(__dirname, "../../"));
    return config;
  },
};
