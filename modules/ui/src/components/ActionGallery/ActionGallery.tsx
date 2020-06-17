import React, { FunctionComponent } from "react";
import { list } from "../../../../games/dist/list";
import lib from "../../../../games/dist/lib";
import meta from "../../../../games/dist/meta";
import css from "./ActionGallery.cssProxy";

type ActionGalleryProps = {
  active?: boolean;
};

export const ActionGallery: FunctionComponent<ActionGalleryProps> = props => {
  const { active } = props;
  return (
    <div className={css.actionGalleryContainer}>
      {list.map(gameId => {
        const variantCode = lib[gameId].variants[0].code;
        const name = meta[gameId].name
          .split(" ")
          .map((word, n) => <span key={n}>{word} </span>);
        return (
          <div className={css.actionGalleryItemBox}>
            <img
              key={gameId}
              src={`/images/games/${gameId}/${gameId}${
                active ? "_active" : ""
              }.png`}
            />
            <div className={css.actionGalleryItemNameBox}>
              <span className={css.actionGalleryItemNameInner}>{name}</span>
            </div>
          </div>
        );
      })}
      <div className={css.actionGalleryEnding}>...and plenty more to come!</div>
    </div>
  );
};
