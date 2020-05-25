import { AlgolNav } from "../../ui/src/helpers";

export const homeNav: AlgolNav = {
  key: "home",
  crumbs: [],
  links: [
    {
      title: "Games",
      desc: "See the list of games to play!",
      url: "/games",
    },
    {
      title: "Tags",
      desc: "The tags we sort our games by",
      url: "/tags",
    },
    {
      title: "About",
      desc: "Read more about the site",
      url: "/about",
    },
    {
      title: "News",
      desc: "All about the latest updates!",
      url: "/news",
    },
  ],
};
