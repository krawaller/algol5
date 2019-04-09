import compile from "./helpers/compile";
import names from "./helpers/_names";

const gameId = process.argv[2];

if (!gameId) {
  console.log("---- Compiling all games ----");
  Promise.all(names.map(compile)).then(() =>
    console.log("---- All games compiled ----")
  );
} else if (names.indexOf(gameId) === -1) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  compile(gameId).catch(e => console.log("Compilation failed", e));
}
