import { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { Shell } from "../../ui/src/components/Shell";
import { appActions } from "../helpers/appActions";
import { useBattleNavActions, AlgolPage } from "../helpers";

function MyApp({ Component, pageProps }: AppProps) {
  const Comp = Component as AlgolPage;
  const [mode, sessionId, battleNavActions] = useBattleNavActions(Comp.domain);
  const [nav, setNav] = useState();
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
