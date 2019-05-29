import validate from "../commands/helpers/validate";
import lib from "../dist/lib";

describe("the game definitions", () => {
  Object.keys(lib).forEach(gameId => {
    const problems = validate(lib[gameId]);
    test(`${gameId} is valid`, () => {
      expect(problems).toEqual([]);
    });
  });
});
