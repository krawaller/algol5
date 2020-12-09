import { GeneratorsAnon } from "../../types";
import { emptyArtifactLayers } from "..";

type EmptyArtifactLayerTest = {
  generators: GeneratorsAnon;
  expected: {
    [artifactLayerName: string]: Record<string, unknown>;
  };
};

const emptyArtifactLayerTests: EmptyArtifactLayerTest[] = [
  {
    generators: {
      walk: {
        type: "walker",
        draw: { steps: { tolayer: { playercase: ["w1", "w2"] } } },
      },
    },
    expected: {
      w1: {},
      w2: {},
    },
  },
  {
    generators: {
      filt: {
        type: "filter",
        layer: "whatev",
        tolayer: { ifelse: [["true"], "f1", "f2"] },
      },
    },
    expected: {
      f1: {},
      f2: {},
    },
  },
  {
    generators: {
      nei: {
        type: "neighbour",
        draw: {
          start: { tolayer: "n1", include: { foo: "bar" } },
          neighbours: { tolayer: "n2", include: { owner: 1 } },
        },
      },
    },
    expected: {
      n1: {},
      n2: {},
      myn2: {},
      oppn2: {},
      neutraln2: {},
    },
  },
];

test("artifactLayers", () => {
  emptyArtifactLayerTests.forEach(({ generators, expected }) =>
    expect(emptyArtifactLayers(generators, "")).toEqual(expected)
  );
});
