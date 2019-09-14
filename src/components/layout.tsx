import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React, { useEffect, useRef } from 'react';
import Header from './header';
import './layout.css';
import './mobile.css';
import SEO from './seo';
import { isMobileScreen } from '../util/isScreenWithinWidth';
import { notifyWhenStickyHeadersChange } from '../util/notifyWhenStickyHeadersChange';
import { StickyChange, SentinelObserverSetupOptions } from '../types';
import {
  addFocusOutlineListeners,
  removeFocusOutlineListeners,
} from '../util/outlineOnKeyboardNav';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
}
const setupObserver = (): void => {
  const container: HTMLElement = document.querySelector(
    '.side-nav'
  ) as HTMLElement;
  const stickyElementsClassName = 'side-nav__title';
  const root: HTMLElement | null = isMobileScreen() ? null : container;
  const headerRootMargin = '-93px 0px 0px 0px';
  const setupOptions: SentinelObserverSetupOptions = {
    container,
    stickyElementsClassName,
    root,
    headerRootMargin,
  };
  if (container) {
    notifyWhenStickyHeadersChange(setupOptions);
  }

  document.addEventListener('stickychange', (({
    detail,
  }: CustomEvent<StickyChange>): void => {
    const { target, stuck }: StickyChange = detail;
    // Update sticking header color
    target.style.color = stuck ? '#fff' : '#000';
  }) as EventListener);
};
const cleanUp = (): void => {
  return removeFocusOutlineListeners();
};

const Layout = ({ children, title, description, img }: Props): JSX.Element => {
  const prevOffset = useRef<number>(-1);
  const magicHeroNumber = (): void => {
    if (typeof window === 'undefined') {
      // Guard for SSR
      return;
    }
    const doc: Document = window.document;
    if (!doc.body.dataset.browser) {
      doc.body.dataset.browser = 'legacy';
    }
    const scrollingElement: HTMLElement | null = doc.scrollingElement as HTMLElement;
    if (scrollingElement) {
      const offset: number = Math.min(scrollingElement.scrollTop - 62, 210);
      if (Math.abs(prevOffset.current - offset) > 5) {
        prevOffset.current = offset;
        doc.body.setAttribute(
          'style',
          `--magic-hero-number: ${356 - offset}px`
        );
      }
    }
    window.requestAnimationFrame(magicHeroNumber);
  };

  useEffect(() => {
    if (window.document && 'documentElement' in window.document) {
      addFocusOutlineListeners();
    }
    if ('IntersectionObserver' in window) {
      setupObserver();
    } else {
      // Use polyfill for browsers without IntersectionObserver support
      import('intersection-observer')
        .then(setupObserver)
        // Fallback for browsers without IntersectionObserver support
        .catch(magicHeroNumber);
    }

    return cleanUp;
  });

  return (
    <React.Fragment>
      <SEO title={title} description={description} img={img} />
      <Header />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
