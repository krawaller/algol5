export type Graphics<
  Terrain extends string = string,
  Unit extends string = string
> = {
  icons: { [unit in Unit]: any };
  tiles: Partial<{ [terrain in Terrain]: any }>;
};
