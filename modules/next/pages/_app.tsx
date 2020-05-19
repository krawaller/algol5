import { AppProps } from "next/app";
import { appActions } from "../helpers/appActions";
import { FunctionComponent, useMemo } from "react";
import { useBattleNavActions } from "../helpers";

function MyApp({ Component, pageProps }: AppProps) {
  const Comp = Component as FunctionComponent & { domain?: string };
  const [mode, sessionId, battleNavActions] = useBattleNavActions(Comp.domain);
  const actions = useMemo(() => ({ ...appActions, ...battleNavActions }), [
    battleNavActions,
  ]);
  const ctxt = useMemo(() => ({ sessionId, mode }), [sessionId, mode]);
  return (
    <>
      <Component {...pageProps} actions={actions} ctxt={ctxt} />
    </>
  );
}

export default MyApp;
