export interface Theme {
  defaultAlgorithm: any;
  darkAlgorithm: any;
}

export interface AntdContextType {
  initAntd: () => void;
  isLoadedAntd: boolean;
  isLoadingAntd: boolean;
  setIsLoadingAntd: (isLoading: boolean) => void;
}
