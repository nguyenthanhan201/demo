import { RefObject, useEffect, useState } from 'react';

function useIntersectionObserver(
  elementRef: RefObject<Element> | undefined,
  options?: IntersectionObserverInit | undefined
): IntersectionObserverEntry | undefined {
  const { threshold = 0, root = null, rootMargin = '0%' } = options || {};
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([e]: IntersectionObserverEntry[]): void => {
    setEntry(e);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);
    if (elementRef) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [elementRef]);

  return entry;
}

export default useIntersectionObserver;
