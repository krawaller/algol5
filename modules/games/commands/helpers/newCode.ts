import allMeta from "../../dist/meta";

// Must only use letters, to be distinguishable in battlesave parsing
const chars = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvxyz".split("");
const codes = chars.reduce(
  (memo, char) =>
    memo.concat(
      // single letter code
      char,
      // double letter code
      ...chars.map(otherChar => char + otherChar)
    ),
  []
);

export const newCode = () => {
  const usedCodes = Object.values(allMeta)
    .map(meta => meta.code)
    .sort();
  const unusedCodes = codes.filter(c => usedCodes.includes(c) === false).sort();
  if (!unusedCodes.length) {
    throw new Error("Failed to find unused code");
  }
  const c = unusedCodes[Math.floor(Math.random() * unusedCodes.length)];
  return c;
};
