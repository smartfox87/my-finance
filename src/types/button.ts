import type { ReactNode } from "react";

export enum ButtonTypes {
  PRIMARY = "primary",
  DEFAULT = "default",
}

export enum ButtonSizes {
  LARGE = "large",
  DEFAULT = "default",
}

export type ButtonSize = `${ButtonSizes}`;

export type ButtonProps = {
  size?: ButtonSizes;
  type?: ButtonTypes;
  loading?: boolean;
  children: ReactNode;
  onClick: () => void;
};
