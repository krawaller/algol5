import { AlgolSession } from "../../types";
import { getCurrentPlr } from "./getCurrentPlr";

export const isWaitingForRemote = (session?: AlgolSession | null) =>
  getCurrentPlr(session)?.type === "remote";
