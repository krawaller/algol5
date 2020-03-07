// AI is not yet reimplemented in the new engine. Never mind this file, for now! :)

import { OrthokonDefinition } from "./_types";
type OrthokonAI = any; // OrthokonDefinition['AI']

const orthokonAI: OrthokonAI = {
  aspects: { headcount: { sizeof: "myunits" } },
  brains: { Bob: { plus: { headcount: 1 }, minus: {} } }
};

export default orthokonAI;
