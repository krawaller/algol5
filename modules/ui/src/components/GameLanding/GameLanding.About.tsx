import React, { FunctionComponent } from "react";

type GameLandingAbout = {
  html: string;
};

export const GameLandingAbout: FunctionComponent<GameLandingAbout> = props => {
  const { html } = props;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default GameLandingAbout;
