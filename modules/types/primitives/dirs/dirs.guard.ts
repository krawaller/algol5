import { AlgolDirsAnon, AlgolDirsListAnon } from "./dirs.anon";

export function isAlgolDirsList(
  expr: AlgolDirsAnon
): expr is AlgolDirsListAnon {
  return (expr as AlgolDirsListAnon).list !== undefined;
}
