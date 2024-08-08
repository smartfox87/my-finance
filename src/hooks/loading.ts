import { useCallback, useEffect, useRef, useState } from "react";

export const useLoading = (state: boolean): [boolean, (state: boolean) => void] => {
  let loadingTimeStart = useRef(0);
  let timeout = useRef<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(state);

  if (state) loadingTimeStart.current = Date.now();

  const handleSetLoading = useCallback((state: boolean): void => {
    if (state) {
      loadingTimeStart.current = Date.now();
      setIsLoading(state);
    } else timeout.current = setTimeout(() => setIsLoading(false), 600 - (Date.now() - loadingTimeStart.current));
  }, []);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  return [isLoading, handleSetLoading];
};
