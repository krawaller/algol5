import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers: {},
  step: {
    UNITLAYERS: {}
  }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Init - UnitLayers",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: {
            link: { if: [{ anyat: ["units", "somemark"] }, "endturn"] }
          }
        },
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
            ...defaultStartInitContext,
            step: {
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
              expr: "startInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
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
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: emptyFullDef,
      player: 1,
      action: "start",
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
                  desc: "no reference locally, so we defer to startEnd"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
