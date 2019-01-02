import {AI} from '../../types';

const amazonsAI: AI = {
  generators: {
    findroads: {
      type: "neighbour",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      starts: "queens",
      unlessover: "units",
      draw: {
        start: {
          tolayer: ["ifelse", ["anyat", "myunits", ["start"]], "myroads", "opproads"],
          include: {
            count: ["neighbourcount"]
          }
        }
      }
    },
    findreach: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      starts: "queens",
      blocks: "units",
      draw: {
        steps: {
          tolayer: ["ifelse", ["anyat", "myunits", ["start"]], "myreach", "oppreach"]
        }
      }
    }
  },
  aspects: {
    myroads: ["harvest", "myroads", "count"],
    mydomain: ["sizeof", "myreach"],
    opproads: ["harvest", "opproads", "count"],
    oppdomain: ["sizeof", "oppreach"]
  },
  brains: {
    Steve: {
      generators: ["findroads", "findreach"],
      plus: {
        myroads: 1,
        mydomain: 1
      },
      minus: {
        opproads: 1,
        oppdomain: 1
      }
    }
  }
};

export default amazonsAI;
