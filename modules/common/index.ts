export * from "./analysis";
export * from "./positions";
export * from "./layers";
export * from "./instr";
export * from "./connections";
export * from "./entities";
export * from "./utils";
export * from "./units";
export * from "./demo";

export const truthy = "TRUTHY";
export const falsy = "FALSY";

import { AlgolAnimCompiled } from "algol-types";
export const emptyAnim: AlgolAnimCompiled = {
  enterFrom: {},
  exitTo: {},
  ghosts: []
};
