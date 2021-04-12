const fs = require("fs-extra");
const path = require("path");
const out = path.join(__dirname, "../src/components");

const rawCompName = process.argv[2] || "";
const compName = rawCompName[0].toUpperCase() + rawCompName.slice(1);
// const useCSS = process.argv[3];
const nonCap = compName[0].toLowerCase() + compName.slice(1);

if (!compName || !compName.length) {
  console.log('Usage: "npm run stub <newComponentName>');
} else if (fs.existsSync(path.join(out, compName))) {
  console.log(`Component ${compName} already exists!`);
} else {
  fs.emptyDirSync(path.join(out, compName));
  fs.writeFileSync(
    path.join(out, compName, "index.ts"),
    `export * from './${compName}'\n`
  );
  fs.writeFileSync(
    path.join(out, compName, `${compName}.tsx`),
    `import React from "react";
import css from "./${compName}.cssProxy";

type ${compName}Props = {};

export const ${compName} = (props: ${compName}Props) => {
  return (
    <div className={css.${nonCap}Container}>Stub for ${compName}</div>
  );
};
`
  );
  fs.writeFileSync(
    path.join(out, compName, `${compName}.cssProxy.js`),
    `// Generated by the 'harvestCss' command from ${compName}.css

const styles = {
  ${nonCap}Container: "${nonCap}Container"
};
export default styles;
`
  );
  fs.writeFileSync(
    path.join(out, compName, `${compName}.css`),
    `.${nonCap}Container {

}
`
  );
  fs.writeFileSync(
    path.join(out, compName, `${compName}.stories.tsx`),
    `
import React from "react";
import { storiesOf } from "@storybook/react";

import { ${compName} } from ".";

storiesOf("${compName}", module).add("A common ${compName} component", () => {
  return (
    <div style={{ padding: 10 }}>
      <${compName} />
    </div>
  );
});
`
  );
  console.log(`Created stub files at src/components/${compName}`);
}
