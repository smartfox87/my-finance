import type { MappingAlgorithm } from "antd";

export interface Theme {
  defaultAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
  darkAlgorithm: MappingAlgorithm | MappingAlgorithm[] | undefined;
}

export interface AntdContextType {
  initAntd: () => void;
  isLoadedAntd: boolean;
  isLoadingAntd: boolean;
  setIsLoadingAntd: (isLoading: boolean) => void;
}
