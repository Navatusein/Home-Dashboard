"use client"

import {MouseEvent, PointerEvent, useEffect, useRef} from "react";

type GestureCallback<T extends HTMLElement> = (event: PointerEvent<T>) => void;

export const stopGestures = {
  onPointerDown: (event: PointerEvent<HTMLElement>) => event.stopPropagation(),
};

type GesturesOptions<T extends HTMLElement> = {
  onClickAction?: GestureCallback<T>;
  onDoubleClickAction?: GestureCallback<T>;
  onLongPressAction?: GestureCallback<T>;
  onReleaseAction?: GestureCallback<T>;
  doubleClickDelay?: number;
  longPressDelay?: number;
  moveThreshold?: number;
};

export default function useGestures<T extends HTMLElement = HTMLElement>({
  onClickAction: onClick,
  onDoubleClickAction: onDoubleClick,
  onLongPressAction: onLongPress,
  onReleaseAction: onRelease,
  doubleClickDelay = 250,
  longPressDelay = 600,
  moveThreshold = 10,
}: GesturesOptions<T>) {
  const activePointerId = useRef<number | null>(null);
  const startCoordinates = useRef({x: 0, y: 0});
  const longPressFired = useRef(false);

  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  const cancelPress = (event: PointerEvent<T>) => {
    activePointerId.current = null;

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    onRelease?.(event);
  };

  const handlePointerDown = (event: PointerEvent<T>) => {
    if (activePointerId.current !== null || (event.pointerType === "mouse" && event.button !== 0))
      return;

    activePointerId.current = event.pointerId;
    startCoordinates.current = {x: event.clientX, y: event.clientY};
    longPressFired.current = false;

    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        longPressFired.current = true;
        onLongPress(event);
      }, longPressDelay);
    }
  };

  const handlePointerMove = (event: PointerEvent<T>) => {
    if (event.pointerId !== activePointerId.current)
      return;

    const diffX = Math.abs(event.clientX - startCoordinates.current.x);
    const diffY = Math.abs(event.clientY - startCoordinates.current.y);

    if (diffX > moveThreshold || diffY > moveThreshold)
      cancelPress(event);
  };

  const handlePointerUp = (event: PointerEvent<T>) => {
    if (event.pointerId !== activePointerId.current)
      return;

    cancelPress(event);

    if (longPressFired.current)
      return;

    if (!onDoubleClick) {
      onClick?.(event);
      return;
    }

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onDoubleClick(event);
      return;
    }

    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      onClick?.(event);
    }, doubleClickDelay);
  };

  const handlePointerCancel = (event: PointerEvent<T>) => {
    if (event.pointerId === activePointerId.current)
      cancelPress(event);
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
    onPointerLeave: handlePointerCancel,

    onContextMenu: onLongPress
      ? (event: MouseEvent<T>) => event.preventDefault()
      : undefined,
  };
}