import { AlgolMatcherIs, AlgolMatcherIsnt } from "./matcher.interfaces";
import { AlgolMatcher } from ".";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolMatcherAnon = AlgolMatcher<AlgolGameBlobAnon>;
export type AlgolMatcherIsAnon = AlgolMatcherIs<AlgolGameBlobAnon>;
export type AlgolMatcherIsntAnon = AlgolMatcherIsnt<AlgolGameBlobAnon>;
