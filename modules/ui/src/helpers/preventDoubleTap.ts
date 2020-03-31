// https://gist.github.com/mutewinter/b86fc06bae43fd3e13169bfb569b06b1
import { TouchEvent, MouseEvent } from "react";

// Ensure touches occur rapidly
const delay = 500;

// Track state of the last touch
let lastTapAt = 0;

export function preventDoubleTapZoom(event: TouchEvent | MouseEvent) {
  const tapAt = new Date().getTime();
  const timeDiff = tapAt - lastTapAt;
  lastTapAt = tapAt;
  if (timeDiff < delay) {
    event.preventDefault();
    event.stopPropagation();
  }
}
