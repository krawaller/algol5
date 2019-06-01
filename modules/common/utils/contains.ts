import { find } from "./find";

export function contains(haystack: any, needle: any) {
  return find(haystack, needle).length > 0;
}
