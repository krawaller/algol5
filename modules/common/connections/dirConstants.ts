export const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
export const orthoDirs = [1, 3, 5, 7];
export const diagDirs = [2, 4, 6, 8];
export const knightDirs = [
  "d1f2r1",
  "d1f2r-1",
  "d3f2r1",
  "d3f2r-1",
  "d5f2r1",
  "d5f2r-1",
  "d7f2r1",
  "d7f2r-1",
];
export const jumpTwoDirs = [
  "d1f2r0",
  "d2f2r0",
  "d3f2r0",
  "d4f2r0",
  "d5f2r0",
  "d6f2r0",
  "d7f2r0",
  "d8f2r0",
];
export const ringTwoDirs = knightDirs.concat(jumpTwoDirs);
