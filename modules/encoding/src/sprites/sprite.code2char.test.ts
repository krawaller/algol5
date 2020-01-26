import { codes } from "./sprite.codes";
import { code2char } from "./sprite.code2char";

describe("the sprite code2char converter function", () => {
  for (const char of Object.keys(codes)) {
    test(`converts ${codes[char]} to ${char} correctly`, () => {
      expect(char).toEqual(code2char(codes[char]));
    });
  }
});
