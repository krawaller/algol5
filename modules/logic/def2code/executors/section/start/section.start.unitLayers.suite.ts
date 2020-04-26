import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers_basic: {},
  step: {
    UNITLAYERS: {},
  },
};

const defaultStartEndContext = {
  emptyArtifactLayers_basic: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - UnitLayers",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            something: {
              condition: {
                isempty: { union: ["units", "myunits", "myflurps"] },
              },
            },
          },
          startTurn: {
            link: { if: [{ anyat: ["myunits", "somemark"] }, "endTurn"] },
          },
        },
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "bishop",
            gnurps: "king",
          },
        },
      },
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              UNITLAYERS: {
                units: "willstayunits",
                myunits: "shouldbecomeoppunits",
                oppunits: "shouldbecomemyunits",
                myflurps: "shouldbecomeoppflurps",
                oppflurps: "shouldbecomemyflurps",
              },
            },
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: {
                    units: "willstayunits",
                    oppunits: "shouldbecomeoppunits",
                    myunits: "shouldbecomemyunits",
                    oppflurps: "shouldbecomeoppflurps",
                    myflurps: "shouldbecomemyflurps",
                  },
                  desc: "Local use, so import and switch old layers here",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            UNITLAYERS: "localUnitLayers",
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "localUnitLayers",
                  desc:
                    "We're using layers locally so they've been initialised by startInit already",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "bishop",
            gnurps: "king",
          },
        },
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            something: {
              condition: {
                isempty: { union: ["units", "myunits", "mygnurps", "flurps"] },
              },
            },
          },
        },
      },
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc: "no reference locally, so we defer to startEnd",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              UNITLAYERS: {
                units: "willstayunits",
                myunits: "shouldbecomeoppunits",
                oppunits: "shouldbecomemyunits",
                flurps: "willstayflurps",
                mygnurps: "shouldbecomeoppgnurps",
                oppgnurps: "shouldbecomemygnurps",
              },
            },
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: {
                    units: "willstayunits",
                    oppunits: "shouldbecomeoppunits",
                    myunits: "shouldbecomemyunits",
                    flurps: "willstayflurps",
                    oppgnurps: "shouldbecomeoppgnurps",
                    mygnurps: "shouldbecomemygnurps",
                  },
                  desc:
                    "since we're not using them locally startInit hasn't set them, so we must",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
