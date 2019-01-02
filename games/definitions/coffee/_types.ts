export type CoffeeTerrain = never;
export type CoffeeUnit = "soldiers" | "markers";
export type CoffeeMark = "selectdrop";
export type CoffeeCommand = "uphill" | "downhill" | "horisontal" | "vertical";
export type CoffeePhaseCommand = never;
export type CoffeePhase = "startTurn" | CoffeeMark;
