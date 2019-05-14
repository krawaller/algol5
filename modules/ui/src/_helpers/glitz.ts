import { GlitzClient } from "@glitz/core";
import transformers from "@glitz/transformers";
export const glitz = new GlitzClient({ transformer: transformers() });
