import { useEffect, useState } from "react";

/**
 * Devuelve `true` solo tras el montaje en cliente. Útil para evitar
 * mismatches de hidratación al leer estado persistido (localStorage).
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
