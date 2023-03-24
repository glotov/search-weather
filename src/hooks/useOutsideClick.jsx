import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref || !ref.current || ref.current.contains(event?.target || null)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
}
