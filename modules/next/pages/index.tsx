import dynamic from "next/dynamic";
import { AlgolPage } from "../../types";
import { Page } from "../../ui/src/components/Page";
import { setTitlePageAttributes } from "../../ui/src/components/TitlePage/setTitlePageAttributes";

// We don't want to server-side-render the TitlePage,
// since it will have different content depending on
// local data. This would case a server-client mismatch.

const EmptyPage = () => <Page title="Hello!" top={null} body={null} />;

const LazyTitlePage = dynamic(
  () => import("../../ui/src/components/TitlePage/TitlePage"),
  { ssr: false, loading: EmptyPage }
);

const TitlePage: AlgolPage = () => <LazyTitlePage />;

setTitlePageAttributes(TitlePage);

export default TitlePage;
