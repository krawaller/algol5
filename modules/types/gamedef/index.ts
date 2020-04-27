export * from "./generators";
export * from "./ai";
export * from "./board";
export * from "./flow";
export * from "./scripts";
export * from "./instructions";
export * from "./meta";
export * from "./setup";
export * from "./graphics";
export * from "./performance";
export * from "./anim";
export * from "./variants";

import { Generators } from "./generators";
import { Graphics } from "./graphics";
import { AlgolBoardBook } from "./board";
import { AI } from "./ai";
import { AlgolSetupBook } from "./setup";
import { Instructions } from "./instructions";
import { AlgolMeta } from "./meta";
import { Flow } from "./flow";
import { AlgolGameTestSuite } from "./scripts";
import { AlgolPerformance } from "./performance";
import { AlgolAnimCollection } from "./anim";
import { AlgolVariant } from "./variants";
import { AlgolGameBlobAnon } from "../blob";

export type FullDefAnon = FullDef<AlgolGameBlobAnon>;

export type FullDef<Blob extends AlgolGameBlobAnon> = {
  AI: AI<Blob>;
  anim: AlgolAnimCollection<Blob>;
  boards: AlgolBoardBook<Blob>;
  setups: AlgolSetupBook<Blob>;
  variants: AlgolVariant<Blob>[];
  graphics: Graphics<Blob>;
  instructions: Instructions<Blob>;
  meta: AlgolMeta<Blob>;
  flow: Flow<Blob>;
  generators: Generators<Blob>;
  scripts: AlgolGameTestSuite<Blob>;
  performance: AlgolPerformance<Blob>;
};
