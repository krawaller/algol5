import { AppProps } from "next/app";
import { useMemo, useState, useEffect } from "react";
import { Shell } from "../../ui/src/components/Shell";
import { AlgolPage } from "../../ui/src/helpers/AlgolPage";
import { appActions } from "../helpers/appActions";
import { useBattleNavActions } from "../helpers";

function MyApp({ Component, pageProps }: AppProps) {
  const Comp = Component as AlgolPage;
  const [mode, sessionId, battleNavActions] = useBattleNavActions(Comp.domain);
  const [nav, setNav] = useState(Comp.nav);
  useEffect(() => setNav(Comp.nav), [Comp]);
  const actions = useMemo(
    () => ({ ...appActions, ...battleNavActions, setNav }),
    [battleNavActions]
  );
  const ctxt = useMemo(() => ({ sessionId, mode }), [sessionId, mode]);
  return (
    <Shell nav={nav}>
      <Component {...pageProps} actions={actions} ctxt={ctxt} />
    </Shell>
  );
}

export default MyApp;
