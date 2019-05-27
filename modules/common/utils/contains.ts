import { find } from "./find";

export function contains(haystack, needle) {
  return find(haystack, needle).length > 0;
}
