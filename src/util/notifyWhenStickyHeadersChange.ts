import { StickyChange, SentinelObserverSetupOptions } from '../types';

/**
 * Dispatches a `stickychange` custom event.
 */
const fireStickyChange = (stuck: boolean, target: HTMLElement): void => {
  const detail: StickyChange = { stuck, target };
  const event: CustomEvent<StickyChange> = new CustomEvent('stickychange', {
    detail,
  });
  document.dispatchEvent(event);
};

/**
 * Adds DOM nodes (aka sentinels) in each sticky section to act as waypoints for
 * figuring out scroll position.
 */
const addSentinels = (
  container: HTMLElement,
  stickyElementsClassName: string,
  className: string
): HTMLDivElement[] => {
  const stickyElements: HTMLElement[] = Array.from(
    container.querySelectorAll(`.${stickyElementsClassName}`)
  ) as HTMLElement[];
  const sentinels: HTMLDivElement[] = stickyElements.map(
    (stickyElement: HTMLElement) => {
      const sentinel: HTMLDivElement = document.createElement('div');
      sentinel.classList.add('sticky-sentinel', className);
      const appendedSentinel: HTMLDivElement = stickyElement.parentElement!.appendChild(
        sentinel
      );

      return appendedSentinel;
    }
  );

  return sentinels;
};

/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky-sentinel--top` become visible/invisible at the top of the container.
 */
const observeTopSentinels = ({
  container,
  stickyElementsClassName,
  root = container,
  headerRootMargin,
}: SentinelObserverSetupOptions): void => {
  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const targetBoundsInfo: ClientRect = entry.boundingClientRect;
      const targetParentElement: HTMLElement | null =
        entry.target.parentElement;
      const stickyElement: HTMLElement | null =
        targetParentElement &&
        (targetParentElement.querySelector(
          `.${stickyElementsClassName}`
        ) as HTMLElement);
      const rootBoundsInfo: ClientRect = entry.rootBounds;

      // Started sticking
      if (stickyElement && targetBoundsInfo.bottom < rootBoundsInfo.top) {
        fireStickyChange(true, stickyElement);
      }

      // Stopped sticking
      if (
        stickyElement &&
        targetBoundsInfo.bottom >= rootBoundsInfo.top &&
        targetBoundsInfo.bottom < rootBoundsInfo.bottom
      ) {
        fireStickyChange(false, stickyElement);
      }
    });
  };
  const options: IntersectionObserverInit = {
    root,
    rootMargin: headerRootMargin || '0px',
    threshold: [0],
  };
  const observer: IntersectionObserver = new IntersectionObserver(
    callback,
    options
  );

  // Add the top sentinels to each section and attach an observer
  const topSentinels: HTMLDivElement[] = addSentinels(
    container,
    stickyElementsClassName,
    'sticky-sentinel--top'
  );
  topSentinels.forEach((sentinel: HTMLDivElement) =>
    observer.observe(sentinel)
  );
};

/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky-sentinel--bottom` become visible/invisible at the bottom of the
 * container.
 */
const observeBottomSentinels = ({
  container,
  stickyElementsClassName,
  root = container,
  footerRootMargin,
}: SentinelObserverSetupOptions): void => {
  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const targetBoundsInfo: ClientRect = entry.boundingClientRect;
      const targetParentElement: HTMLElement | null =
        entry.target.parentElement;
      const stickyElement: HTMLElement | null =
        targetParentElement &&
        (targetParentElement.querySelector(
          `.${stickyElementsClassName}`
        ) as HTMLElement);
      const rootBoundsInfo: ClientRect = entry.rootBounds;
      const ratio: number = entry.intersectionRatio;

      // Started sticking
      if (
        stickyElement &&
        targetBoundsInfo.bottom > rootBoundsInfo.top &&
        ratio === 1
      ) {
        fireStickyChange(true, stickyElement);
      }

      // Stopped sticking
      if (
        stickyElement &&
        targetBoundsInfo.top < rootBoundsInfo.top &&
        targetBoundsInfo.bottom < rootBoundsInfo.bottom
      ) {
        fireStickyChange(false, stickyElement);
      }
    });
  };
  const options: IntersectionObserverInit = {
    root,
    rootMargin: footerRootMargin || '0px',
    // Get callback slightly before element is 100% visible/invisible
    threshold: [1],
  };
  const observer: IntersectionObserver = new IntersectionObserver(
    callback,
    options
  );

  // Add the bottom sentinels to each section and attach an observer
  const bottomSentinels: HTMLDivElement[] = addSentinels(
    container,
    stickyElementsClassName,
    'sticky-sentinel--bottom'
  );
  bottomSentinels.forEach((sentinel: HTMLDivElement) =>
    observer.observe(sentinel)
  );
};

/**
 * Notifies when elements that have the class `stickyElementsClassName`
 * (specified in `setupOptions`) begin to stick or not.
 * Note: these should be children of the `container` element.
 */
export const notifyWhenStickyHeadersChange = (
  setupOptions: SentinelObserverSetupOptions
): void => {
  observeTopSentinels(setupOptions);
  observeBottomSentinels(setupOptions);
};
