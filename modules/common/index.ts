export * from "./positions";
export * from "./layers";
export * from "./instr";
export * from "./connections";
export * from "./entities";

export const relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

export function reduce(coll, iterator, acc) {
  for (var key in coll) {
    acc = iterator(acc, coll[key], key);
  }
  return acc;
}
