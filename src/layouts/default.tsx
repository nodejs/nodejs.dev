import React from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CommonComponents } from '../components';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { FeatureToggleProvider } from '../providers';

interface Props {
  title?: string;
  description?: string;
  img?: string;
  href?: string;
  showFooter?: boolean;
  showRandomContributor?: boolean;
}

const defaultTheme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          padding: '1rem',
          fontSize: '2rem',
        },
      },
    },
  },
});

const Layout = ({
  children,
  title,
  description,
  img,
  showFooter = true,
  showRandomContributor = false,
}: React.PropsWithChildren<Props>): JSX.Element => (
  <FeatureToggleProvider>
    <ThemeProvider theme={defaultTheme}>
      <CommonComponents.SEO title={title} description={description} img={img} />
      <MotionConfig reducedMotion="user">
        <div className="layout-container">
          <Header />
          {children}
          {showRandomContributor && <CommonComponents.RandomContributor />}
          {showFooter && <Footer />}
        </div>
      </MotionConfig>
    </ThemeProvider>
  </FeatureToggleProvider>
);

export default Layout;
