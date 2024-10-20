import type { MappingAlgorithm } from "antd";

export type Theme = {
  defaultAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
  darkAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
};
