"use client"

import {Dispatch, SetStateAction, useCallback, useSyncExternalStore} from "react";

function parse<T>(raw: string | null, fallback: T): T {
  if (raw == null)
    return fallback;

  try {
    return JSON.parse(raw) as T;
  }
  catch {
    return fallback;
  }
}

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);

  const stored = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(key),
    () => null,
  );

  const value = parse(stored, initialValue);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((action) => {
    const current = parse(window.localStorage.getItem(key), initialValue);
    const next = action instanceof Function ? action(current) : action;

    window.localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new StorageEvent("storage"));
  }, [key, initialValue]);

  return [value, setValue];
}