import { useState, useEffect } from 'react'

/**
 * Returns a value that updates after the given delay when the source value changes.
 * Useful for debouncing search input to reduce API calls.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
