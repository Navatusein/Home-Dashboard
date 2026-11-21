"use client";

const PRELOAD_DISTANCE = "300px";

function scrollParent(element: HTMLElement) {
  let parent = element.parentElement;

  while (parent && parent != document.body && !/(auto|scroll)/.test(getComputedStyle(parent).overflowY))
    parent = parent.parentElement;

  return parent == document.body ? null : parent;
}

export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean) {
  return (element: HTMLDivElement | null) => {
    if (!element || !enabled)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting)
          onLoadMore();
      },
      {root: scrollParent(element), rootMargin: `0px 0px ${PRELOAD_DISTANCE} 0px`}
    );

    observer.observe(element);
    return () => observer.disconnect();
  };
}
