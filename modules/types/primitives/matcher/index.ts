import { AlgolMatcherIs, AlgolMatcherIsnt } from "./matcher.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export * from "./matcher.anon";
export * from "./matcher.interfaces";
export * from "./matcher.guard";

export type AlgolMatcher<Blob extends AlgolGameBlobAnon> =
  | AlgolMatcherIs<Blob>
  | AlgolMatcherIsnt<Blob>;
