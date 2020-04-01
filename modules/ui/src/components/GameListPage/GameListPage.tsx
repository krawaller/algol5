import React, { FunctionComponent } from "react";
import { PageActions } from "../../helpers";
import { Page } from "../Page";
import { Crumb, Breadcrumbs } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";
import { GameLightList } from "../GameLightList";

type GameListPageProps = {
  actions: PageActions;
};

export const GameListPage: FunctionComponent<GameListPageProps> = props => {
  const { actions } = props;
  const crumbs: Crumb[] = [{ content: "Games" }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={
        <ScrollBox>
          <GameLightList actions={actions} />
        </ScrollBox>
      }
    />
  );
};
