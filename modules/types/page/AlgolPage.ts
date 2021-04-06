import { FunctionComponent } from "react";
import { AlgolNav } from "./nav";

export type AlgolPage = FunctionComponent & {
  domain?: string;
  nav?: AlgolNav;
  title?: string;
  metaTitle?: string;
  mainImage?: string;
  metaDesc?: string;
  preloadImages?: string[];
};
