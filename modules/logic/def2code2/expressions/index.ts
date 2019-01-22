import { FullDefAnon, AlgolValAnon } from "../../../types";

export default function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number => {
      if (typeof expr === "string") {
        return `"${expr}"`;
      }
      if (typeof expr === "number") {
        return expr;
      }
      if (Array.isArray(expr)) {
        const cmnd = expr[0];
        if (cmnd === "dir") {
          return "DIR";
        }
        return undefined;
      }
      if ((expr as any).minus) {
        return `(${(expr as any).minus.map(parsers.val).join(" - ")})`;
      }
      if ((expr as any).value) {
        return parsers.val((expr as any).value);
      }
    }
  };
  return parsers;
}
