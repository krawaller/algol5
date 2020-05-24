export type AlgolNav = {
  key: string;
  crumbs: AlgolNavLink[];
  links: AlgolNavLink[];
};

export type AlgolNavLink = {
  title: string;
  desc: string;
  url?: string;
  onClick?: () => void;
};
