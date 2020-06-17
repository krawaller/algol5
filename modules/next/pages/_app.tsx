import { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";
import { useMemo, useState, useEffect, Fragment } from "react";
import { Shell } from "../../ui/src/components/Shell";
import { AlgolPage } from "../../types";
import { useBattleNavActions, appActions } from "../helpers";

const ref = { last: "" };
const global = (typeof window === "undefined" ? {} : window) as Window &
  typeof globalThis & { ga: (a1: string, a2: string, a3?: string) => void };

Router.events.on("routeChangeStart", url => {
  const canon = url
    .replace(/sid=[^&]*|&|m=/g, "")
    .replace(/\/?\?/, "/")
    .replace(/\/$/, "")
    .replace(/^$/, "/");
  if (global.ga && ref.last !== canon) {
    global.ga("set", "page", canon);
    global.ga("send", "pageview");
    ref.last = canon;
  }
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const Comp = Component as AlgolPage;
  const [mode, sessionId, battleNavActions] = useBattleNavActions(router);
  const [nav, setNav] = useState(Comp.nav);
  useEffect(() => setNav(Comp.nav), [Comp]);
  const actions = useMemo(
    () => ({ ...appActions, ...battleNavActions, setNav }),
    [battleNavActions]
  );
  const ctxt = useMemo(() => ({ sessionId, mode }), [sessionId, mode]);
  const preloads = useMemo(
    () =>
      (Comp.preloadImages || []).map(url => (
        <link key={url} rel="preload" as="image" href={url} />
      )),
    [Comp.preloadImages]
  );
  return (
    <Fragment>
      <Head>
        {Comp.mainImage && (
          <meta property="og:image" content={Comp.mainImage} />
        )}
        {Comp.metaDesc && (
          <meta property="og:description" content={Comp.metaDesc} />
        )}
        {Comp.title && <title>{Comp.title}</title>}
        {Comp.metaTitle ||
          (Comp.title && (
            <meta property="og:title" content={Comp.metaTitle || Comp.title} />
          ))}
        {preloads.length > 0 && preloads}
        <link rel="preload" as="image" href="/images/composites/about.png" />
        <link rel="preload" as="image" href="/images/composites/news.png" />
        <link rel="preload" as="image" href="/images/composites/tags.png" />
        <link rel="preload" as="image" href="/images/composites/games.png" />
      </Head>
      <Shell nav={nav} actions={actions}>
        <Component {...pageProps} actions={actions} ctxt={ctxt} />
      </Shell>
    </Fragment>
  );
}

export default MyApp;
