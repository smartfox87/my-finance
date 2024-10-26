import type { MappingAlgorithm } from "antd";

export type Theme = {
  defaultAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
  darkAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
};

export type UIContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};
