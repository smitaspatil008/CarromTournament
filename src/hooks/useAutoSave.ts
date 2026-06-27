import { useEffect, useRef } from 'react';

export function useAutoSave(
  data: unknown,
  onSave: () => void,
  delay = 600
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onSave, delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [data]);
}
