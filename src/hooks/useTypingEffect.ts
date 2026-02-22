import { useEffect, useState } from 'react';

export function useTypingEffect(value: string, delay = 10, resetKey?: string) {
  const [typedValue, setTypedValue] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const timer = window.setInterval(() => {
      currentIndex += 1;
      setTypedValue(value.slice(0, currentIndex));

      if (currentIndex >= value.length) {
        window.clearInterval(timer);
      }
    }, delay);

    return () => window.clearInterval(timer);
  }, [value, delay, resetKey]);

  return typedValue;
}
