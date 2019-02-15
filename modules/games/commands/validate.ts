import * as fs from "fs-extra";
import * as path from "path";

import validate from "./helpers/validate";
import lib from "../dist/lib";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Validating all games ----");
  Object.keys(lib).forEach(name => {
    const problems = validate(lib[name]);
    if (problems.length) {
      console.log(`Problems in ${name}:`, problems);
    } else {
      console.log(`No problems in ${name}.`);
    }
  });
  console.log("---- All games validated ----");
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  const problems = validate(lib[gameId]);
  if (problems.length) {
    console.log(`Problems in ${gameId}:`, problems);
  } else {
    console.log(`No problems in ${gameId}.`);
  }
}
