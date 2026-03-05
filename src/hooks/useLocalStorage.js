import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (nextValue) => {
    try {
      const resolvedValue =
        typeof nextValue === 'function' ? nextValue(value) : nextValue;
      setValue(resolvedValue);

      if (resolvedValue === null || resolvedValue === undefined) {
        localStorage.removeItem(key);
        return;
      }

      localStorage.setItem(key, JSON.stringify(resolvedValue));
    } catch {
      setValue(nextValue);
    }
  };

  return [value, updateValue];
}
