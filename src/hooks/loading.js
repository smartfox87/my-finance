import { useCallback, useEffect, useRef, useState } from "react";

export const useLoading = (state) => {
  let loadingTimeStart = useRef(null);
  let timeout = useRef(null);

  const [isLoading, setIsLoading] = useState(state);

  if (state) loadingTimeStart.current = Date.now();

  const handleSetLoading = useCallback((state) => {
    if (state) {
      loadingTimeStart.current = Date.now();
      setIsLoading(state);
    } else timeout.current = setTimeout(() => setIsLoading(false), 600 - (Date.now() - loadingTimeStart.current));
  }, []);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [isLoading, handleSetLoading];
};
