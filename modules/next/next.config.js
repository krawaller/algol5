const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.forEach(rule => {
      const ruleContainsTs = rule.test.toString().includes("tsx|ts");
      console.log(ruleContainsTs, rule);
      if (
        ruleContainsTs &&
        rule.use &&
        rule.use.loader === "next-babel-loader"
      ) {
        rule.include.push(path.join(__dirname, "../../"));
      }
    });
    return config;
  },
};
