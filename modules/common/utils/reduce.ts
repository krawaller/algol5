export function reduce(coll, iterator, acc) {
  for (var key in coll) {
    acc = iterator(acc, coll[key], key);
  }
  return acc;
}
