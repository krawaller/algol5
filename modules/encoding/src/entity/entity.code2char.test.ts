import { codes } from "./entity.codes";
import { code2char } from "./entity.code2char";

describe("the entity code2char converter function", () => {
  for (const char of Object.keys(codes)) {
    test(`converts ${codes[char]} to ${char} correctly`, () => {
      expect(char).toEqual(code2char(codes[char]));
    });
  }
});
