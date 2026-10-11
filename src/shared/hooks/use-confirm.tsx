"use client"

import {useEffect, useRef, useState} from "react";

export function useConfirm(action: () => void, delay: number = 3000) {
  const [isConfirming, setIsConfirming] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const confirm = () => {
    if (timer.current) clearTimeout(timer.current);

    if (isConfirming) {
      setIsConfirming(false);
      action();
      return;
    }

    setIsConfirming(true);
    timer.current = setTimeout(() => setIsConfirming(false), delay);
  }

  return {isConfirming, confirm};
}
