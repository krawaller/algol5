import { FullDefAnon } from "../../../types";
import makeParser from "../expressions";

export default function draw(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action,
  drawDef,
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
    key => `${key}: ${parser.val(drawDef.include[key])}`
  );
  const artifactLiteral = `{ ${entries.join(", ")} }`;

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
      ARTIFACTS = {
        ...ARTIFACTS,
        [targetlayername]: {
          ...ARTIFACTS[targetlayername],
          [${posVar}]: artifact
        },
        [${prefix} + targetlayername]: {
          ...ARTIFACTS[${prefix} + targetlayername],
          [${posVar}]: artifact
        }
      };
    `;
  } else {
    const name = parser.val(drawDef.tolayer) as string;
    const obviousName = name.match(/".*"$/);
    const layerIdx = obviousName
      ? `.${name.replace(/^"|"$/g, "")}`
      : `[${name}]`;
    body = `
      ARTIFACTS = {
        ...ARTIFACTS,
        ${parser.val(drawDef.tolayer)}: {
          ...ARTIFACTS${layerIdx},
          [${posVar}]: ${artifactLiteral}
        }
      }
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
