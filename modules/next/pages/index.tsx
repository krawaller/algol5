import dynamic from "next/dynamic";
import { AlgolPageProps } from "../../types";

// We don't want to server-side-render the TitlePage,
// since it will have different content depending on
// local data. This would case a server-client mismatch.

const LazyTitlePage = dynamic(
  () => import("../../ui/src/components/TitlePage/TitlePage"),
  { ssr: false }
);

export default (props: AlgolPageProps) => <LazyTitlePage {...props} />;
