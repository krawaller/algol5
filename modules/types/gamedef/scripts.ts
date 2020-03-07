import { AlgolGameBlobAnon } from "../blob";

export type AlgolScriptLine<Blob extends AlgolGameBlobAnon> = {
  commands: (Blob["cmnd"] | Blob["pos"] | "endTurn")[];
  include?: (Blob["cmnd"] | Blob["pos"] | "endTurn")[];
  exclude?: (Blob["cmnd"] | Blob["pos"] | "endTurn")[];
  endedBy?: string;
  endedIn?: "win" | "draw" | "lose";
};
export type Test<Blob extends AlgolGameBlobAnon> = [
  string,
  string,
  AlgolScriptLine<Blob>[]
];
export type AlgolGameTestSuite<Blob extends AlgolGameBlobAnon> = {
  [desc: string]: AlgolScriptLine<Blob>[];
};
