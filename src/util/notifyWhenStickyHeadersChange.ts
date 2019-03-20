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
  return Array.from(
    container.querySelectorAll(`.${stickyElementsClassName}`)
  ).map(stickyElement => {
    const sentinel = document.createElement('div');
    sentinel.classList.add('sticky-sentinel', className);
    const parentElement = stickyElement.parentElement!;

    return parentElement && parentElement.appendChild(sentinel);
  });
};

/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky-sentinel--top` become visible/invisible at the top of the container.
 */
const observeTopSentinels = ({
  container,
  stickyElementsClassName,
  root,
  headerRootMargin,
}: SentinelObserverSetupOptions): void => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const targetBoundsInfo = entry.boundingClientRect;
        const targetParentElement = entry.target.parentElement;
        const stickyElement =
          targetParentElement &&
          (targetParentElement.querySelector(
            `.${stickyElementsClassName}`
          ) as HTMLElement);
        const rootBoundsInfo = entry.rootBounds;

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
    },
    {
      rootMargin: headerRootMargin || '0px',
      threshold: [0],
      root,
    }
  );

  // Add the top sentinels to each section and attach an observer
  const topSentinels = addSentinels(
    container,
    stickyElementsClassName,
    'sticky-sentinel--top'
  );
  topSentinels.forEach(sentinel => observer.observe(sentinel));
};

/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky-sentinel--bottom` become visible/invisible at the bottom of the
 * container.
 */
const observeBottomSentinels = ({
  container,
  stickyElementsClassName,
  root,
  footerRootMargin,
}: SentinelObserverSetupOptions): void => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const targetBoundsInfo = entry.boundingClientRect;
        const targetParentElement = entry.target.parentElement;
        const stickyElement =
          targetParentElement &&
          (targetParentElement.querySelector(
            `.${stickyElementsClassName}`
          ) as HTMLElement);
        const rootBoundsInfo = entry.rootBounds;
        const ratio = entry.intersectionRatio;

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
    },
    {
      rootMargin: footerRootMargin || '0px',
      // Get callback slightly before element is 100% visible/invisible
      threshold: [1],
      root,
    }
  );

  // Add the bottom sentinels to each section and attach an observer
  const bottomSentinels = addSentinels(
    container,
    stickyElementsClassName,
    'sticky-sentinel--bottom'
  );
  bottomSentinels.forEach(sentinel => observer.observe(sentinel));
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
