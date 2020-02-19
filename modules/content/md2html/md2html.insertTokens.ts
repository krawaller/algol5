import { tokenHandlers } from "./tokens";
import { TokenHandlerOpts } from "./tokens/_handler";

type InsertTokenOpts = {
  md: string;
} & Omit<TokenHandlerOpts, "args">;

export const insertTokens = (opts: InsertTokenOpts) => {
  const { md, arrs, gameId, yaml, picSourcePath, picRefPath } = opts;
  return md.replace(
    /\[([A-Z]{2,}):?([^\]]*)]/g,
    (_: string, token: string, instr: string) => {
      const args = instr.split(",").reduce(
        (memo, arg) => ({
          ...memo,
          [arg.split("=")[0]]: arg.split("=")[1],
        }),
        {} as { [key: string]: string }
      );
      const fToken = token.toLowerCase() as keyof typeof tokenHandlers;
      if (!tokenHandlers[fToken]) {
        throw new Error(
          `Unknown token "${token}"! Available tokens: ${Object.keys(
            tokenHandlers
          )
            .map(n => n.toUpperCase())
            .join(", ")}`
        );
      }
      return tokenHandlers[fToken]({
        args,
        arrs,
        gameId,
        yaml,
        picSourcePath,
        picRefPath,
      });
    }
  );
};
