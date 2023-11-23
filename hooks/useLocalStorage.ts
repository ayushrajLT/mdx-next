import { useState, useEffect } from "react";

const isEmpty = (value: string | null | undefined) =>
  value === null || value === undefined || value === '""' || value === "''" || value === "";

function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      const localValue = localStorage.getItem(key);
      if (isEmpty(localValue)) {
        currentValue = defaultValue;
      } else {
        if (localValue) currentValue = localValue;
      }
    } catch (error) {
      console.error(error);
      currentValue = defaultValue;
    }

    return currentValue || defaultValue;
  });

  useEffect(() => {
	if (value)
    localStorage.setItem(key, value);
  }, [value, key]);

  return {value, setValue};
}

export default useLocalStorage;
