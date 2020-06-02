export type AlgolNav = {
  key: string;
  crumbs: AlgolNavStep[];
  links: AlgolNavStep[];
  me: AlgolNavStep;
};

export type AlgolNavStep = {
  title: string;
  desc: string;
  url?: string;
  onClick?: () => void;
};
