import { pos2coords, coords2pos } from "../";

export function offsetPos(pos, dir, forward, right, board) {
  const forwardmods = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ]; // x,y
  const rightmods = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];
  const n = dir - 1;
  const coords = pos2coords(pos);
  const newx = coords.x + forwardmods[n][0] * forward + rightmods[n][0] * right;
  const newy = coords.y + forwardmods[n][1] * forward + rightmods[n][1] * right;
  const withinbounds =
    newx > 0 && newx <= board.width && newy > 0 && newy <= board.height;
  return withinbounds && coords2pos({ x: newx, y: newy });
}
