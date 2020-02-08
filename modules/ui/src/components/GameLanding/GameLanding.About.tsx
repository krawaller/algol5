import React, { FunctionComponent } from "react";
import { Markdown } from "../Markdown";

export interface GameLandingAboutActions {
  navTo: (path: string) => void;
}

type GameLandingAbout = {
  actions: GameLandingAboutActions;
  html: string;
};

export const GameLandingAbout: FunctionComponent<GameLandingAbout> = props => {
  const { html, actions } = props;
  return <Markdown actions={actions} html={html} />;
};

export default GameLandingAbout;
