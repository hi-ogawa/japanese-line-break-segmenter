import React from "react";

export function useDebounce<T>(
  data: T,
  msec: number
): { data: T; isLoading: boolean } {
  const [debouncedData, setDebouncedData] = React.useState(data);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedData(data);
    }, msec);
    return () => {
      window.clearTimeout(id);
    };
  }, [data, msec]);

  return { data: debouncedData, isLoading: data !== debouncedData };
}
