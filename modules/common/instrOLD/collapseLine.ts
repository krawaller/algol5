import { mergeStrings } from "../";

export function collapseLine(line) {
  var parts = [];
  var remaining = line.content;
  while (remaining.length) {
    var next = remaining.shift();
    switch (next.type) {
      case "nothing":
        break;
      case "line":
        remaining = next.content.concat(remaining);
        break;
      case "text":
        var last = parts.length && parts[parts.length - 1];
        if (last && last.type === "text") {
          last.text = mergeStrings(last.text, next.text);
        } else {
          parts.push(next);
        }
        break;
      case "nothing":
        break;
      default:
        parts.push(next);
    }
  }
  return {
    type: "line",
    content: parts
  };
}
