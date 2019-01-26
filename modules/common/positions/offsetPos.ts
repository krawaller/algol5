import { pos2coords, coords2pos } from "../";

export function offsetPos(pos, dir, forward, right, board) {
  var forwardmods = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ]; // x,y
  var rightmods = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];
  var n = dir - 1;
  var coords = pos2coords(pos);
  var newx = coords.x + forwardmods[n][0] * forward + rightmods[n][0] * right;
  var newy = coords.y + forwardmods[n][1] * forward + rightmods[n][1] * right;
  var withinbounds =
    newx > 0 && newx <= board.width && newy > 0 && newy <= board.height;
  return withinbounds && coords2pos({ x: newx, y: newy });
}
