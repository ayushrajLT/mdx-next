import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

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

  const debouncedSetValue = debounce((value: string) => {
    setValue(value)
  }, 1000);

  return {value, setValue, debouncedSetValue};
}

export default useLocalStorage;
