import prettier from "prettier";
import fs from "fs-extra";
import path from "path";
import { AlgolListing } from "../../../types";
import aboutCompositeMap from "../../../payloads/dist/composites/about/about";

const outFolder = path.join(__dirname, "../../dist/listings/about");

export const makeAboutListing = (aboutId: string) => {
  const yaml = require(`../../../content/dist/about/${aboutId}/listing`)
    .listing;
  const composite = aboutCompositeMap[yaml.thumbnail];
  const listing: AlgolListing = {
    blurb: yaml.blurb,
    preloads: yaml.preloads,
    url: `/about/${yaml.slug}`,
    title: yaml.title,
    sort: yaml.sort,
    composite,
  };
  const code = `// generated by makeAboutListing
import { AlgolListing } from '../../../../types'

export const ${aboutId}: AlgolListing = ${JSON.stringify(listing)};

export default ${aboutId}
`;
  fs.ensureDirSync(outFolder);
  fs.writeFileSync(
    path.join(outFolder, `${aboutId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Made listing for about", aboutId);
};
