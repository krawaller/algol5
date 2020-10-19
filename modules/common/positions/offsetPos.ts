import { AlgolBoardAnon } from "../../types";
import { pos2coords, coords2pos } from "../";
import { boardHoles } from "./boardHoles";

export function offsetPos(
  pos: string,
  dir: number,
  forward: number,
  right: number,
  board?: AlgolBoardAnon
): string | false {
  const forwardmods = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ]; // x,y
  const rightmods = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  const n = dir - 1;
  const coords = pos2coords(pos);
  const newx = coords.x + forwardmods[n][0] * forward + rightmods[n][0] * right;
  const newy = coords.y + forwardmods[n][1] * forward + rightmods[n][1] * right;
  const newPos = coords2pos({ x: newx, y: newy });
  const withinbounds = board
    ? newx > 0 &&
      newx <= board.width &&
      newy > 0 &&
      newy <= board.height &&
      !boardHoles(board).includes(newPos)
    : true;
  return withinbounds && newPos;
}
