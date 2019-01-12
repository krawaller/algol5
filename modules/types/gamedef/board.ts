export type Board<Terrain extends string = string> = {
  height: Number;
  width: Number;
  terrain: { [terrain in Terrain]: any };
};
