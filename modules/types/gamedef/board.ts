export type Board<Position extends string, Terrain extends string> = {
  height: Number;
  width: Number;
  terrain: { [terrain in Terrain]: any };
};
