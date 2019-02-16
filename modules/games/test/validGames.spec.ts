import * as test from "tape";

import validate from "../commands/helpers/validate";
import lib from "../dist/lib";

test("The game definitions are valid", t => {
  Object.keys(lib).forEach(gameId => {
    const problems = validate(lib[gameId]);
    t.deepEqual(problems, [], `${gameId} definition is valid`);
  });
  t.end();
});
