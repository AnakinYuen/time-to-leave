import { useEffect } from 'react';

type Callback = () => void;

export const runOnClient = (task: Callback): void => {
  if (typeof window !== 'undefined') {
    task();
  } else {
    useEffect(() => {
      task();
    }, []);
  }
};
