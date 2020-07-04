export type AlgolNav = {
  key: string;
  crumbs: AlgolNavStep[];
  me: AlgolNavStep;
};

export type AlgolNavStep = {
  id: string;
  title: string;
  shortTitle?: string;
  desc: string;
  url?: string;
  links: AlgolNavStep[];
  onClick?: () => void;
};
