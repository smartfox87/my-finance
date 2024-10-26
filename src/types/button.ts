import type { ReactNode } from "react";

export enum ButtonTypes {
  PRIMARY = "primary",
  DEFAULT = "default",
}

export enum ButtonSizes {
  LARGE = "large",
  DEFAULT = "default",
}

export type ButtonProps = {
  size?: ButtonSizes;
  type?: ButtonTypes;
  title?: string;
  loading?: boolean;
  children: ReactNode;
  onClick: () => void;
};
