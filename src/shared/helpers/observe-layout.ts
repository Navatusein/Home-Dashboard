export function observeLayout(element: HTMLElement, callback: () => void) {
  const observer = new ResizeObserver(callback);

  for (let current: HTMLElement | null = element; current; current = current.parentElement)
    observer.observe(current);

  return () => observer.disconnect();
}
