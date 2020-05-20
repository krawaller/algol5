export type AlgolNav = {
  key: string;
  crumbs: { title: string; desc: string; onClick: () => void }[];
  links: { title: string; desc: string; onClick: () => void }[];
};
