import { AlgolStaticGameAPI } from "./session";
import { AlgolGameGraphics, AlgolMeta } from "./gamedef";
import { AlgolGameBlobAnon } from "./blob";
import { AlgolDemo } from "./generated";

export type AlgolGamePayload = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  rules: {
    updated: string;
    html: string;
  };
  imgsToPreload: string[];
  demo: AlgolDemo;
};
