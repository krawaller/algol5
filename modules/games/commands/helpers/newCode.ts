import allMeta from "../../dist/meta";

const codes = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvxyz";

export const newCode = () => {
  const usedCodes = Object.values(allMeta)
    .map(meta => meta.code)
    .sort();
  const unusedCodes = codes
    .split("")
    .filter(c => usedCodes.includes(c) === false)
    .sort();
  if (!unusedCodes.length) {
    throw new Error("Failed to find unused code");
  }
  const c = unusedCodes[Math.floor(Math.random() * unusedCodes.length)];
  return c;
};
