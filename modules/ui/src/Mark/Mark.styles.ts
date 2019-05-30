import { glitz } from "../_helpers";

export const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
  <circle cx='25' cy='25' r='21' stroke-width='6' stroke='white' fill='none'>
  </circle>
</svg>
`
  .replace(/\n/g, "")
  .replace(/ +/g, " ")
  .replace(/> </g, "><");

export const potentialCSS = glitz.injectStyle({
  opacity: 0.4,
  ":hover": {
    opacity: 0.8,
  },
});

export const scaleDiff = 0.3;
export const pulsateCSS = glitz.injectStyle({
  animationDuration: "0.85s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationName: {
    "0%": {
      transform: "scale(1, 1)",
    },
    "50%": {
      transform: `scale(${1 - scaleDiff}, ${1 - scaleDiff})`,
    },
    "100%": {
      transform: "scale(1, 1)",
    },
  },
});

export const markCSS = glitz.injectStyle({
  cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
});
