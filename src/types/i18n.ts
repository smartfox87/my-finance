import { Pages } from "@/types/router";

enum OtherNamespaces {
  COMMON = "common",
}

export const Namespaces = {
  ...Pages,
  ...OtherNamespaces,
};

export type Namespaces = typeof Namespaces;

export type Namespace = Namespaces[keyof Namespaces];
