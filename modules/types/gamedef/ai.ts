import { AlgolVal, Partial, Generators } from "../";

export type AI<
  AiArtifactLayer extends string,
  AiAspect extends string,
  AiBrain extends string,
  AiGenerator extends string,
  AiGrid extends string,
  AiTerrain extends string,
  AiTerrainLayer extends string,
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string
> = {
  terrain?: { [t in AiTerrain]: any };
  grids?: { [s in AiGrid]: any };
  generators?: Generators<
    AiArtifactLayer,
    Btlp,
    Btlv,
    Cmnd,
    AiGenerator,
    Grid | AiGrid,
    Layer | AiTerrainLayer | AiArtifactLayer,
    Mrk,
    Turnp,
    Turnv
  >;
  aspects: {
    [a in AiAspect]: AlgolVal<
      AiGenerator,
      Btlp,
      Btlv,
      Cmnd,
      Layer | AiTerrainLayer | AiArtifactLayer,
      Mrk,
      Turnp,
      Turnv
    >
  };
  brains: {
    [b in AiBrain]: {
      generators?: AlgolVal<
        AiGenerator,
        Btlp,
        Btlv,
        Cmnd,
        Layer | AiTerrainLayer | AiArtifactLayer,
        Mrk,
        Turnp,
        Turnv
      >[];
      plus: Partial<
        {
          [a in AiAspect]: AlgolVal<
            number,
            Btlp,
            Btlv,
            Cmnd,
            Layer | AiTerrainLayer | AiArtifactLayer,
            Mrk,
            Turnp,
            Turnv
          >
        }
      >;
      minus: Partial<
        {
          [a in AiAspect]: AlgolVal<
            number,
            Btlp,
            Btlv,
            Cmnd,
            Layer | AiTerrainLayer | AiArtifactLayer,
            Mrk,
            Turnp,
            Turnv
          >
        }
      >;
    }
  };
};
