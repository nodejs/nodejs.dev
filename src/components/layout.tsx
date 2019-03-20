import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React, { useEffect, useRef } from 'react';
import Header from './header';
import './layout.css';
import './mobile.css';
import SEO from './seo';
import {
  isScreenWithinWidth,
  MAX_MOBILE_SCREEN_WIDTH,
} from '../util/isScreenWithinWidth';
import { notifyWhenStickyHeadersChange } from '../util/notifyWhenStickyHeadersChange';
import { StickyChange, SentinelObserverSetupOptions } from '../types';

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
};

const Layout = ({ children, title, description, img }: Props) => {
  const prevOffset = useRef<number>(-1);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      setupObserver();
    } else {
      // Fallback for browsers without IntersectionObserver support
      magicHeroNumber();
    }
  });

  const setupObserver = (): void => {
    const container = document.querySelector('.side-nav') as HTMLElement;
    const stickyElementsClassName = 'side-nav__title';
    const root = isScreenWithinWidth(MAX_MOBILE_SCREEN_WIDTH)
      ? null
      : container;
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
    }: CustomEvent<StickyChange>) => {
      const { target, stuck } = detail;
      // Update sticking header color
      target.style.color = stuck ? '#fff' : '#000';
    }) as EventListener);
  };

  const magicHeroNumber = (): void => {
    if (typeof window === 'undefined') {
      // Guard for SSR
      return;
    }
    const doc = window.document;
    if (!doc.body.dataset.browser) {
      doc.body.dataset.browser = 'legacy';
    }
    const offset = Math.min(doc.scrollingElement!.scrollTop - 62, 210);
    if (Math.abs(prevOffset.current - offset) > 5) {
      prevOffset.current = offset;
      doc.body.setAttribute('style', `--magic-hero-number: ${356 - offset}px`);
    }
    window.requestAnimationFrame(magicHeroNumber);
  };

  return (
    <>
      <SEO title={title} description={description} img={img} />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
