import React from 'react';
import { MotionConfig } from 'framer-motion';
import RandomContributor from '../RandomContributor';
import { FeatureToggleProvider } from '../../containers/FeatureToggles';

import Header from '../Header';
import Footer from '../Footer';
import SEO from '../Seo';

import '../../styles/index.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  showRandomContributor?: boolean;
}

const Layout = ({
  children,
  title,
  description,
  img,
  showFooter = true,
  showRandomContributor = false,
}: Props): JSX.Element => (
  <FeatureToggleProvider>
    <SEO title={title} description={description} img={img} />
    <MotionConfig reducedMotion="user">
      <div className="layout-container">
        <Header />
        {children}
        {showRandomContributor && (
          <section className="bottom-info">
            <RandomContributor />
          </section>
        )}
        {showFooter && <Footer />}
      </div>
    </MotionConfig>
  </FeatureToggleProvider>
);

export default Layout;
