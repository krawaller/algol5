import {
  AlgolContentAnon,
  isAlgolContentLine,
  isAlgolContentText,
  AlgolContentLineAnon,
  AlgolContentText
} from "../../../../types";

// included in parcel
export function collapseContent(content: AlgolContentAnon): AlgolContentAnon {
  if (isAlgolContentLine(content)) {
    let items = content.line;
    let idx;
    while ((idx = items.findIndex(isAlgolContentLine)) !== -1) {
      items.splice(idx, 1, ...(items[idx] as AlgolContentLineAnon).line);
    }

    items = items.filter(Boolean);

    while (
      (idx = items.findIndex(
        (c, n) =>
          isAlgolContentText(c) &&
          n < items.length - 1 &&
          isAlgolContentText(items[n + 1])
      )) !== -1
    ) {
      const mergedText = {
        text:
          (items[idx] as AlgolContentText).text +
          (items[idx + 1] as AlgolContentText).text
      };
      items.splice(idx, 2, mergedText);
    }

    return items.length > 1 ? { line: items } : items[0];
  }
  return content;
}
