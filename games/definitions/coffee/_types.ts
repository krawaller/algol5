export type CoffeeTerrain = never;
export type CoffeeUnit = "soldiers" | "markers";
export type CoffeeMark = "selectdrop";
export type CoffeeCommand = "uphill" | "downhill" | "horisontal" | "vertical";
export type CoffeePhase = "startTurn" | CoffeeCommand | CoffeeMark;
