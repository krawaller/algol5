import { FullDefAnon, DrawDefAnon } from "../../../../../types";
import { makeParser } from "../../../executors";

/*
Use by generators to mutate ARTIFACTS.
*/

export default function draw(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  drawDef: DrawDefAnon | undefined,
  posVar = "POS"
) {
  if (!drawDef) return "";
  const parser = makeParser(gameDef, player, action);
  let conds = [];
  if (drawDef.condition) conds.push(parser.bool(drawDef.condition));
  if (drawDef.unlessover)
    conds.push(`!${parser.set(drawDef.unlessover)}[${posVar}]`);
  if (drawDef.ifover) conds.push(`${parser.set(drawDef.ifover)}[${posVar}]`);
  const entries = Object.keys(drawDef.include || {}).map(
    key => `${key}: ${parser.val(drawDef.include![key])}`
  );
  const artifactLiteral = entries.length
    ? `{ ${entries.join(", ")} }`
    : "emptyObj";

  let body;
  if (drawDef.include && drawDef.include.owner) {
    // if artifact has owner it must be added to more than one layer
    let prefix,
      owner = parser.val(drawDef.include.owner);
    if (owner === 0) {
      prefix = '"neutral"';
    } else if (owner === player) {
      prefix = '"my"';
    } else if (typeof owner === "number") {
      prefix = '"opp"';
    } else {
      prefix = "ownernames[artifact.owner]";
    }
    body = `
      let targetlayername=${parser.val(drawDef.tolayer)};
      let artifact=${artifactLiteral};
      ARTIFACTS[targetlayername][${posVar}] = ARTIFACTS[${prefix} + targetlayername] = artifact;
    `;
  } else {
    const name = parser.val(drawDef.tolayer) as string;
    const obviousName = name.match(/".*"$/);
    const layerIdx = obviousName
      ? `.${name.replace(/^"|"$/g, "")}`
      : `[${name}]`;
    body = `
      ARTIFACTS${layerIdx}[${posVar}] = ${artifactLiteral};
    `;
  }
  if (conds.length) {
    return `
      if (${conds.join(" && ")}) {
        ${body}
      }
    `;
  } else {
    return body;
  }
}
