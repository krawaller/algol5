import { checkCodes } from "../commands/helpers/checkCodes";

describe("the game definitions", () => {
  test("all have unique codes", () => {
    expect(checkCodes).not.toThrow();
  });
});
