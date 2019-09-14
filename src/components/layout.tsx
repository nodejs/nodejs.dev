import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-okaidia.css';
import React, {  useRef } from 'react';
import Header from './header';
import '../styles/tokens.css';
import '../styles/layout.css';
import '../styles/mobile.css';
import SEO from './seo';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
}

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

  return (
    <React.Fragment>
      <SEO title={title} description={description} img={img} />
      <Header />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
