import { GameId } from "../../games/dist/list";
import { AlgolGameBlobAnon } from "../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type AlgolMeta<Blob extends AlgolGameBlobAnon> = {
  author: string | null;
  id: GameId;
  name: string;
  tagline: string;
  tags: string[];
  hidden?: boolean;
  [otherMeta: string]: any;
  code: string;
  slug: string;
  demo?: string;
  added: string;
  addedBy?: string;
};

export type Content = ComplexContent | string[] | string | any; // | Line | UnitRef | TileRef | string;

export type ComplexContent = { type: string; [other: string]: any };

/*
type Line extends Array<Content>  = {
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
