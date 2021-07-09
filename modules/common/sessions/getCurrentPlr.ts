import { AlgolSession } from "../../types";

export const getCurrentPlr = (session?: AlgolSession | null) =>
  session?.player !== 0 ? session?.participants[session?.player] : null;
