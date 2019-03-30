import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartEndContext = {
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - End - UnitLayers",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "bishop",
            gnurps: "king"
          }
        }
      },
      player: 1,
      action: "start",
      contexts: [
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
                myflurps: "shouldbecomeoppflurps",
                oppflurps: "shouldbecomemyflurps",
                gnurps: "willstaygnurps",
                mygnurps: "shouldbecomeoppgnurps",
                oppgnurps: "shouldbecomemygnurps"
              }
            }
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
                    oppflurps: "shouldbecomeoppflurps",
                    myflurps: "shouldbecomemyflurps",
                    gnurps: "willstaygnurps",
                    oppgnurps: "shouldbecomeoppgnurps",
                    mygnurps: "shouldbecomemygnurps"
                  },
                  desc:
                    "since we're not using them locally startInit hasn't set them, so we must"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: {
            link: { if: [{ anyat: ["units", "somemark"] }, "endturn"] }
          }
        }
      },
      player: 1,
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            UNITLAYERS: "localUnitLayers"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "localUnitLayers",
                  desc:
                    "We're using layers locally so they've been initialised by startInit already"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
