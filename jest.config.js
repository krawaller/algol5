const { defaults } = require("jest-config");
const path = require("path");

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testMatch: [path.join(__dirname, "./modules/**/*.test.ts")],
};
