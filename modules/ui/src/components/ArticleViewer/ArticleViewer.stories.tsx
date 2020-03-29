import React from "react";
import { storiesOf } from "@storybook/react";

import { ArticleViewer } from ".";
import { newsList } from "../../../../content/dist/newsList";
import { allNews } from "../../../../content/dist/allNews";
import { ArticleViewerActions } from "./ArticleViewer";

storiesOf("ArticleViewer", module).add(
  "A common ArticleViewer component",
  () => {
    const actions: ArticleViewerActions = {
      prefetch: url => console.log("PREFETCH", url),
      navTo: url => console.log("NAV TO", url),
    };
    return (
      <div style={{ padding: 10 }}>
        <ArticleViewer
          list={newsList}
          articles={allNews}
          actions={actions}
          backButtonText="Back to news list"
        />
      </div>
    );
  }
);
