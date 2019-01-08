import { FullDef } from "../types";
import * as isNumber from "lodash/isNumber";
import * as map from "lodash/map";
import makeExpr from "../expressions";

// TODO - targetLayerPredefined never ever used?

export default function draw(
  gameDef: FullDef,
  player: 1 | 2,
  action,
  drawDef,
  posVar = "POS",
  targetLayerPredefined?: boolean
) {
  if (!drawDef) return "";
  const expr = makeExpr(gameDef, player, action);
  let conds = [];
  if (drawDef.condition) conds.push(expr.bool(drawDef.condition));
  if (drawDef.unlessover)
    conds.push(`!${expr.set(drawDef.unlessover)}[${posVar}]`);
  if (drawDef.ifover) conds.push(`${expr.set(drawDef.ifover)}[${posVar}]`);
  let artifactLiteral = `{${map(
    drawDef.include,
    (valdef, key) => `${key}: ${expr.value(valdef)}`
  ).join(", ")}}`;
  let body;
  if (drawDef.include && drawDef.include.owner) {
    // if artifact has owner it must be added to more than one layer
    let prefix,
      owner = expr.value(drawDef.include.owner);
    if (owner === 0) {
      prefix = '"neutral"';
    } else if (owner === player) {
      prefix = '"my"';
    } else if (isNumber(owner)) {
      prefix = '"opp"';
    } else {
      prefix = "ownernames[artifact.owner]";
    }
    body = `
      ${
        !targetLayerPredefined
          ? `let targetlayername=${expr.value(drawDef.tolayer)};`
          : ""
      }
      let artifact=${artifactLiteral};
      ARTIFACTS[targetlayername][${posVar}]=artifact;
      ARTIFACTS[${prefix} + targetlayername][${posVar}]=artifact;
    `;
  } else {
    body = `
      ARTIFACTS[${
        targetLayerPredefined ? "targetlayername" : expr.value(drawDef.tolayer)
      }][${posVar}]=${artifactLiteral};
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
