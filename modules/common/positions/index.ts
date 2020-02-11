export * from "./pos2coords";
export * from "./boardPositions";
export * from "./coords2pos";
export * from "./offsetPos";

export const colname2number = "ZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXY"
  .split("")
  .reduce(function(mem, char, n) {
    mem[char] = n;
    return mem;
  }, {} as { [idx: string]: number });

export const colnumber2name = Object.keys(colname2number).reduce(function(
  mem,
  key
) {
  mem[colname2number[key]] = key;
  return mem;
},
{} as { [idx: string]: string });
