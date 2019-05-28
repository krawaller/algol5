import { pos2coords } from "algol-common";
import { CSSProperties } from "react";

type PositionStylesOpts = {
  height: number;
  width: number;
  pos: string;
};

export function positionStyles({
  height,
  width,
  pos
}: PositionStylesOpts): CSSProperties {
  const { x, y } = pos2coords(pos);
  return {
    height: `${(1 / (height + 1)) * 100}%`,
    width: `${(1 / (width + 1)) * 100}%`,
    position: "absolute",
    left: `${((x - 0.5) / (width + 1)) * 100}%`,
    bottom: `${((y - 0.5) / (height + 1)) * 100}%`
  };
}
