const path = require("path");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: [path.join(__dirname, "/test/**/?(*.)test.{ts,tsx}")],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/lib/", "/node_modules/"]
};
