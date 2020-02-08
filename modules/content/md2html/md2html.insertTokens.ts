import { AlgolArrangements } from "../../types";
import { GameId } from "../../games/dist/list";
import { tokenHandlers } from "./tokens";

type InsertTokenOpts = {
  md: string;
  arrs: AlgolArrangements;
  gameId: GameId;
  yaml: Record<string, string>;
  picPath: string;
};

export const insertTokens = (opts: InsertTokenOpts) => {
  const { md, arrs, gameId, yaml, picPath } = opts;
  return md.replace(
    /\[([A-Z]{3,}):?([^\]]*)]/g,
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
        throw new Error(`Unknown token: ${fToken}`);
      }
      return tokenHandlers[fToken]({
        args,
        arrs,
        gameId,
        yaml,
        picPath,
      });
    }
  );
};
