import { AlgolAnimCompiled } from "../types";

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

export const emptyAnim: AlgolAnimCompiled = {
  enterFrom: {},
  exitTo: {},
  ghosts: [],
};
