import {
  AlgolContentAnon,
  isAlgolContentLine,
  isAlgolContentText,
  AlgolContentLineAnon,
  AlgolContentText
} from "../../types";

const noSpacesBefore = /[,!\.? ]/;

// included in parcel
export function collapseContent(
  content: AlgolContentAnon
): AlgolContentAnon | "undefined" {
  if (content === undefined) return "undefined";
  if (isAlgolContentLine(content)) {
    let items = content.line;
    let idx;

    // flatten all lines into a single line
    while ((idx = items.findIndex(isAlgolContentLine)) !== -1) {
      items.splice(idx, 1, ...(items[idx] as AlgolContentLineAnon).line);
    }

    // remove all non-content items
    items = items.filter(i => i !== undefined);

    // merge all adjacent text strings
    while (
      (idx = items.findIndex(
        (c, n) =>
          isAlgolContentText(c) &&
          n < items.length - 1 &&
          isAlgolContentText(items[n + 1])
      )) !== -1
    ) {
      const firstText = (items[idx] as AlgolContentText).text + "";
      const secondText = (items[idx + 1] as AlgolContentText).text + "";
      const between =
        firstText[firstText.length - 1] === " " ||
        (secondText[0] || ".").match(noSpacesBefore)
          ? ""
          : " ";
      const mergedText = {
        text: firstText + between + secondText
      };
      items.splice(idx, 2, mergedText);
    }

    // insert space before and after all text
    items = items.map((i, n) =>
      isAlgolContentText(i)
        ? {
            text: (
              (n && !i.text[0].match(noSpacesBefore) ? " " : "") +
              i.text +
              (n < items.length - 1 ? " " : "")
            ).replace(/  /, " ")
          }
        : i
    );

    return items.length > 1 ? { line: items } : items[0];
  }
  return content;
}
