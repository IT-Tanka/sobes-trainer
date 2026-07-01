import { useState, useEffect } from 'react';


export function useCountdown(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = window.setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [timeLeft]);

  return { 
    timeLeft, 
    isExpired: timeLeft <= 0 
  };
}
