export type Game = {
  commands: any;
  id: string;
  graphics: {
    icons: any;
    tiles: any;
  };
  board: {
    terrain: any;
    height: number;
    width: number;
  };
  canalwaysend?: {
    [funcname: string]: true;
  };
  debug: () => Object;
};
