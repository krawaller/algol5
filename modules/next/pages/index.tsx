import React from "react";

import amazons from "../../logic/dist/indiv/amazons";
import { Tester } from "../../ui/src/Tester";
import { makeStaticGameAPI } from "../../battle/src";
import { Master } from "../components";
import graphics from "../../graphics/dist/svgDataURIs/amazons";

const Home = () => {
  return (
    <Master title="OMG YEAH!">
      <Tester api={makeStaticGameAPI(amazons)} graphics={graphics} />
    </Master>
  );
};

export default Home;
