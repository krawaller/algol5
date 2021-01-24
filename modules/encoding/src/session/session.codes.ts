import { AlgolSession } from "../../../types";

type SessionType = AlgolSession["type"];

export const sessionCodes: Record<string, [0 | 1 | 2, SessionType]> = {
  x: [0, "fork"],
  p: [0, "imported"],
  t: [0, "normal"],
  f: [1, "fork"],
  j: [1, "imported"],
  I: [1, "normal"],
  X: [2, "fork"],
  n: [2, "imported"],
  a: [2, "normal"],
};

export const codeForSession = (plr: 0 | 1 | 2, type: SessionType) =>
  Object.entries(sessionCodes)
    .filter(([, [p, t]]) => plr === p && type === t)
    .map(([c]) => c)
    .pop();
