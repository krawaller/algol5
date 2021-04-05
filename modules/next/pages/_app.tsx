import { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";
import { useMemo, useEffect, Fragment } from "react";
import { Shell } from "../../ui/src/components/Shell";
import { AppActionContext, BattleNavContext } from "../../ui/src/contexts";
import { AlgolPage } from "../../types";
import { useBattleNavActions, useAppActions } from "../helpers";
import compositeId from "../../payloads/dist/compositeId";

const compositePrefix = `/images/composites/`;

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
  const appActions = useAppActions({ router, global, initialNav: Comp.nav });
  useEffect(() => appActions.setNav(Comp.nav), [Comp]);
  const actions = useMemo(() => ({ ...appActions, ...battleNavActions }), [
    battleNavActions,
    appActions,
  ]);
  useEffect(() => {
    if (global.document) {
      global.document.body.addEventListener("click", e => {
        const node = e.target as HTMLDivElement;
        if (node.matches('a[href^="http"]')) {
          actions.logEvent({
            action: "linkclick",
            category: "external",
            label: node.getAttribute("href"),
          });
        }
      });
    }
  }, []);
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
        {(Comp.metaTitle || Comp.title) && (
          <meta property="og:title" content={Comp.metaTitle || Comp.title} />
        )}
        {preloads.length > 0 && preloads}
        <link
          rel="preload"
          as="image"
          href={`${compositePrefix}about_${compositeId}.png`}
        />
        <link
          rel="preload"
          as="image"
          href={`${compositePrefix}news_${compositeId}.png`}
        />
        <link
          rel="preload"
          as="image"
          href={`${compositePrefix}tags_${compositeId}.png`}
        />
        <link
          rel="preload"
          as="image"
          href={`${compositePrefix}games_${compositeId}.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <AppActionContext.Provider value={appActions}>
        <BattleNavContext.Provider value={battleNavActions}>
          <Shell nav={appActions.nav} actions={actions}>
            <Component {...pageProps} actions={actions} ctxt={ctxt} />
          </Shell>
        </BattleNavContext.Provider>
      </AppActionContext.Provider>
    </Fragment>
  );
}

export default MyApp;
