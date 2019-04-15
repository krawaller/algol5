import { KriegAI } from "./_types";

const kriegAI: KriegAI = {
  generators: {
    findmythreats: {
      type: "neighbour",
      starts: "myunits",
      dirs: {
        playercase: [
          { ifelse: [{ anyat: ["oppbases", ["start"]] }, [4], [3, 5]] },
          { ifelse: [{ anyat: ["oppbases", ["start"]] }, [8], [7, 1]] }
        ]
      },
      ifover: { union: ["oppbases", "oppcorners"] },
      draw: {
        neighbours: {
          tolayer: {
            ifelse: [
              { anyat: ["myfrozens", ["start"]] },
              {
                ifelse: [
                  { anyat: ["units", ["target"]] },
                  "myfrozenguardedthreat",
                  "myfrozenfreethreat"
                ]
              },
              {
                ifelse: [
                  { anyat: ["units", ["target"]] },
                  "mymoverguardedthreat",
                  "mymoverfreethreat"
                ]
              }
            ]
          }
        }
      }
    },
    findoppthreats: {
      type: "neighbour",
      starts: "oppunits",
      dirs: {
        playercase: [
          { ifelse: [{ anyat: ["mybases", ["start"]] }, [8], [7, 1]] },
          { ifelse: [{ anyat: ["mybases", ["start"]] }, [4], [3, 5]] }
        ]
      },
      ifover: { union: ["mybases", "mycorners"] },
      draw: {
        neighbours: {
          tolayer: {
            ifelse: [
              { anyat: ["oppfrozens", ["start"]] },
              {
                ifelse: [
                  { anyat: ["units", ["target"]] },
                  "oppfrozenguardedthreat",
                  "oppfrozenfreethreat"
                ]
              },
              {
                ifelse: [
                  { anyat: ["units", ["target"]] },
                  "oppmoverguardedthreat",
                  "oppmoverfreethreat"
                ]
              }
            ]
          }
        }
      }
    }
  },
  aspects: {
    myfrozenguardedthreat: { sizeof: "myfrozenguardedthreat" },
    myfrozenfreethreat: { sizeof: "myfrozenfreethreat" },
    mymoverguardedthreat: { sizeof: "mymoverguardedthreat" },
    mymoverfreethreat: { sizeof: "mymoverfreethreat" },
    myfrozeninfiltrators: { sizeof: { intersect: ["myfrozens", "oppbases"] } },
    myfreeinfiltrators: { sizeof: { intersect: ["mynotfrozens", "oppbases"] } },
    oppfrozenguardedthreat: { sizeof: "oppfrozenguardedthreat" },
    oppfrozenfreethreat: { sizeof: "oppfrozenfreethreat" },
    oppmoverguardedthreat: { sizeof: "oppmoverguardedthreat" },
    oppmoverfreethreat: { sizeof: "oppmoverfreethreat" },
    oppfrozeninfiltrators: { sizeof: { intersect: ["oppfrozens", "mybases"] } },
    oppfreeinfiltrators: { sizeof: { intersect: ["oppnotfrozens", "mybases"] } }
  },
  brains: {
    Fred: {
      generators: ["findmythreats", "findoppthreats"],
      plus: {
        myfrozenguardedthreat: 1,
        myfrozenfreethreat: 2,
        mymoverguardedthreat: 3,
        mymoverfreethreat: 4,
        myfrozeninfiltrators: 5,
        myfreeinfiltrators: 6
      },
      minus: {
        oppfrozenguardedthreat: 1,
        oppfrozenfreethreat: 2,
        oppmoverguardedthreat: 3,
        oppmoverfreethreat: 4,
        oppfrozeninfiltrators: 5,
        oppfreeinfiltrators: 6
      }
    }
  }
};

export default kriegAI;
