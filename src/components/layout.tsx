import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React, { useEffect, useRef } from 'react';
import Header from './header';
import './layout.css';
import './mobile.css';
import SEO from './seo';

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

  const setupObserver = () => {
    const root = document.querySelector('.side-nav');
    const options = { root, threshold: 0.5, rootMargin: '-93px 0px 0px 0px' };
    const observer = new IntersectionObserver(onIntersectionChange, options);
    const targets = document.querySelectorAll('.side-nav__title');
    targets.forEach((target: Element) => observer.observe(target));
  };

  const onIntersectionChange = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const element = entry.target as HTMLElement;
      element.style.color = entry.intersectionRatio > 0.5 ? '#000' : '#fff';
    });
  };

  const magicHeroNumber = () => {
    if (typeof window === 'undefined') {
      return;
    } // Guard for SSR.
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
