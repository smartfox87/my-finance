import type { MappingAlgorithm } from "antd";

export interface Theme {
  defaultAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
  darkAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
}
