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
    const offset = Math.min(doc.scrollingElement!.scrollTop - 62, 210);
    if (Math.abs(prevOffset.current - offset) > 5) {
      prevOffset.current = offset;
      doc.body.setAttribute('style', `--magic-hero-number: ${356 - offset}px`);
    }
    window.requestAnimationFrame(magicHeroNumber);

    if (doc.body.dataset.browser !== 'legacy') {
      doc.body.dataset.browser = 'legacy';

      const css = doc.createElement('style');
      css.type = 'text/css';
      const styles = `
        .side-nav__title {
          background-attachment: fixed;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(to top, rgba(0, 0, 0, 1) 49%, rgba(255, 255, 255, 1) 51%);
          background-position: 0 calc(-50vh + var(--magic-hero-number));
          background-size: 100% 100vh;
          color: white;
          filter: opacity(0.9);
          -webkit-text-fill-color: transparent;
          will-change: background-position;
        }

        @media (max-width: 720px) {
          .side-nav__title {
            background-position: 0 calc(-50vh + var(--magic-hero-number) - 32px);
          }
        }
      `;
      css.appendChild(document.createTextNode(styles));
      doc.getElementsByTagName('head')[0].appendChild(css);
    }
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
