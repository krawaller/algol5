interface Line extends Array<Content> {
  0: "line",
  [idx: number]: Content
}

type UnitName = "bishop"  | "king"  | "pawn"  | "queen"  | "knight"  | "rook"
              | "bishops" | "kings" | "pawns" | "queens" | "knights" | "rooks"

type UnitRef = ["unitname", string];

type TileRef = ["tile", any];

type OrBool = any; // Todo - import!

type OrListPart = [OrBool, Content]
  | "orlist"; // TODO - bug :P

interface OrList {
  0: "orlist"
  [idx: number]: OrListPart
}

export type Content = ComplexContent | string[] | string | any; // | Line | UnitRef | TileRef | string;

export type ComplexContent = {type: string, [other:string]: any};
