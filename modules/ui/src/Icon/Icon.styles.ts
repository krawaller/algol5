import { glitz } from "../_helpers";

export const iconBasic = glitz.injectStyle({
  position: "relative",
  transformOrigin: "50% 50%"
});

export const scaleDiff = 0.2;
export const available = glitz.injectStyle({
  animationDuration: "0.85s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationName: {
    "0%": {
      transform: "scale(1, 1)"
    },
    "25%": {
      transform: `scale(${1 - scaleDiff}, ${1 - scaleDiff})`
    },
    "50%": {
      transform: "scale(1, 1)"
    },
    "75%": {
      transform: `scale(${1 + scaleDiff}, ${1 + scaleDiff})`
    },
    "100%": {
      transform: "scale(1, 1)"
    }
  }
});

export const rotateDiff = 15;
export const selected = glitz.injectStyle({
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationName: {
    "0%": {
      transform: "rotate(0deg)"
    },
    "25%": {
      transform: `rotate(-${rotateDiff}deg)`
    },
    "50%": {
      transform: "rotate(0deg)"
    },
    "75%": {
      transform: `rotate(${rotateDiff}deg)`
    },
    "100%": {
      transform: "rotate(0deg)"
    }
  }
});

export const fills = ["lightyellow", "lightpink", "lightsteelblue"];
export const strokes = ["orange", "darkred", "darkblue"];
