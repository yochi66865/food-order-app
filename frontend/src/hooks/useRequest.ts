import { useCallback, useState } from "react";

const URL_BACKEND = "http://localhost:3001/";

export const useRequest = () => {
  const [isLoading, setIsLouding] = useState(false);
  const [hasError, setError] = useState(false);

  const sendRequest = useCallback(
    async (endPoint: string, requestinit: RequestInit = {}) => {
      setIsLouding(true);
      const response: Response = await fetch(
        `${URL_BACKEND}${endPoint}`,
        requestinit
      );
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      if (!response.ok) {
        setError(true);
        setIsLouding(false);
      } else {
        setError(false);
        setIsLouding(false);
      }
      return await response.json();
    },
    []
  );

  return { isLoading, hasError, sendRequest };
};
