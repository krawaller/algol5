export type Meta = {
  rules?: RuleDescription;
  performance: {
    canAlwaysEnd: {
      [actionName: string]: boolean;
    };
  };
  [otherMeta: string]: any;
};

export type RuleObject = {
  who: (0 | 1 | 2)[];
  rule: Content;
};

export type RuleDescription = {
  flow: Content;
  concepts?: {
    [conceptName: string]: Content;
  };
  actions: {
    [actionName: string]: RuleObject;
  };
  tiles: {
    [tileName: string]: RuleObject;
  };
  goals: {
    [goalName: string]: RuleObject;
  };
  units: {
    [unitName: string]: RuleObject;
  };
};

export type Content = ComplexContent | string[] | string | any; // | Line | UnitRef | TileRef | string;

export type ComplexContent = { type: string; [other: string]: any };

/*
interface Line extends Array<Content> {
  0: "line";
  [idx: number]: Content;
}

type UnitName =
  | "bishop"
  | "king"
  | "pawn"
  | "queen"
  | "knight"
  | "rook"
  | "bishops"
  | "kings"
  | "pawns"
  | "queens"
  | "knights"
  | "rooks";

type UnitRef = ["unitname", string];

type TileRef = ["tile", any];

*/
