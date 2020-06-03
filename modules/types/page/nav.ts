export type AlgolNav = {
  key: string;
  crumbs: AlgolNavStep[];
  me: AlgolNavStep;
};

export type AlgolNavStep = {
  title: string;
  desc: string;
  url?: string;
  links: AlgolNavStep[];
  onClick?: () => void;
};
