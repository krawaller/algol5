import React from "react";

import meta from "../../games/dist/meta";
import Link from "next/link";

const GameList = () => {
  return (
    <ul>
      {Object.values(meta).map(m => (
        <li key={m.id}>
          <h4>
            <Link href={"/games/" + m.id + "/"}>
              <a>{m.name}</a>
            </Link>
          </h4>
          <br />
          {m.tagline}
        </li>
      ))}
    </ul>
  );
};

export default GameList;
