import React from "react";

import amazons from "../../logic/dist/indiv/amazons";
import { Tester } from "../../ui/src/Tester";
import { makeStaticGameAPI } from "../../battle/src";

const Home = () => {
  return <Tester api={makeStaticGameAPI(amazons)} />;
};

export default Home;
