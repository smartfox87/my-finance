import { Pages } from "@/types/router";

enum OtherNamespaces {
  COMMON = "common",
}

export const Namespaces = {
  ...Pages,
  ...OtherNamespaces,
};

export type Namespaces = typeof Namespaces;

type NamespacesKeys = keyof typeof Namespaces;

export type Namespace = (typeof Namespaces)[NamespacesKeys];
