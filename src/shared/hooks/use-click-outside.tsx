"use client"

import {useEffect, useRef} from "react";

export default function useClickOutside(callback: () => void) {
  const reference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const current = reference?.current;

      if (!current || current.contains(event.target as Node))
        return;

      callback();
    }

    window?.addEventListener("click", handleClick, { capture: true });

    return () => {
      window?.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback, reference]);

  return reference;
}