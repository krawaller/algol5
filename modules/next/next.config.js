const path = require("path");

module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  trailingSlash: true,
  future: {
    // TODO - make webpack 5 work!
    // Right now it works fine for the built app, but dev app fails for inter-module imports..
    webpack5: false,
  },
  webpack: config => {
    const babelRule = config.module.rules.find(
      rule =>
        rule.test &&
        rule.test.toString().includes("tsx|ts") &&
        [].concat(rule.use).find(l => l.loader === "next-babel-loader")
    );
    babelRule.include = babelRule.include
      .filter(p => p !== path.join(__dirname)) // remove path that just includes this dir
      .concat(path.join(__dirname, "../../")); // instead add path that includes all Algol5 modules
    if (!babelRule) {
      throw new Error("Couldn't find babel rule!");
    }
    return config;
  },
};
