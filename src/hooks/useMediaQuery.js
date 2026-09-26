import { useSyncExternalStore } from 'react';

// Returns whether the media query currently matches, and re-renders when that changes.
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches
  );
}
