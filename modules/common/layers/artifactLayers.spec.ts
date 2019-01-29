import * as test from "tape";
import { FullDefAnon } from "../../types";
import { artifactLayers, emptyFullDef } from "../";

type ArtifactLayerTest = {
  def: Partial<FullDefAnon>;
  expected: {
    [artifactLayerName: string]: {};
  };
};

const artifactLayerTests: ArtifactLayerTest[] = [
  {
    def: {
      generators: {
        walk: {
          type: "walker",
          draw: { steps: { tolayer: { playercase: ["w1", "w2"] } } }
        }
      }
    },
    expected: {
      w1: {},
      w2: {}
    }
  },
  {
    def: {
      generators: {
        filt: {
          type: "filter",
          layer: "whatev",
          tolayer: { ifelse: [["true"], "f1", "f2"] }
        }
      }
    },
    expected: {
      f1: {},
      f2: {}
    }
  },
  {
    def: {
      generators: {
        nei: {
          type: "neighbour",
          draw: {
            start: { tolayer: "n1", include: { foo: "bar" } },
            neighbours: { tolayer: "n2", include: { owner: 1 } }
          }
        }
      }
    },
    expected: {
      n1: {},
      n2: {},
      myn2: {},
      oppn2: {},
      neutraln2: {}
    }
  }
];

test("artifactLayers", t => {
  artifactLayerTests.forEach(({ def, expected }) =>
    t.deepEqual(
      artifactLayers({ ...emptyFullDef, ...def }),
      expected,
      `Correctly calculates artifactLayers for ${JSON.stringify(def)}`
    )
  );
  t.end();
});
