import { AlgolMatcherIs, AlgolMatcherIsnt } from "./matcher.interfaces";
import { AlgolMatcher } from ".";

type s = string;

export type AlgolMatcherAnon = AlgolMatcher<s, s, s, s, s, s, s, s>;
export type AlgolMatcherIsAnon = AlgolMatcherIs<s, s, s, s, s, s, s, s>;
export type AlgolMatcherIsntAnon = AlgolMatcherIsnt<s, s, s, s, s, s, s, s>;
