export function mergeStrings(str1, str2) {
  var nextChar = str2 && str2.length ? str2[str2.length - 1] : "X";
  var between = nextChar.match(/[,!\.?]/) ? "" : " ";
  return str1 + between + str2;
}
