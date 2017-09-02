const suite = process.argv[2] || '*';

import Jasmine from 'jasmine';

let jasmine = new Jasmine();
jasmine.loadConfig({
  "spec_dir": "./specs",
  "spec_files": [
    `**/${suite}.[sS]pec.js`
  ]
});

jasmine.execute();