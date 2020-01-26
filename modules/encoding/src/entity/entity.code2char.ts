import { codes, AlgolBoardEntityCode } from "./entity.codes";

const mapper = Object.entries(codes)
  .map(([key, val]) => [val.toString(), key])
  .reduce(
    (memo, [val, key]) => ({
      ...memo,
      [val]: key,
    }),
    {} as Record<string, string>
  );

export const code2char = (code: AlgolBoardEntityCode) => {
  const key = mapper[code.toString()];
  if (!key) {
    throw new Error("Failed to convert entity code to proper character");
  }
  return key;
};
