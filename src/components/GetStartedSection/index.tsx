import { Link } from 'gatsby-plugin-react-intl';
import React from 'react';
import './GetStartedSection.scss';
import { ReactComponent as BeginnerGuideIllustration } from '../../images/illustrations/beginners-guide-illustration.svg';
import { ReactComponent as DoMoreWithNodeIllustration } from '../../images/illustrations/do-more-illustration.svg';

interface Props {
  learnLinkText: string;
  beginnerGuideHeaderText: string;
  beginnerGuideBodyText: string;
  doMoreWithNodeHeaderText: string;
  doMoreWithNodeBodyText: string;
}

const GetStartedSection = ({
  learnLinkText,
  beginnerGuideBodyText,
  beginnerGuideHeaderText,
  doMoreWithNodeBodyText,
  doMoreWithNodeHeaderText,
}: Props): JSX.Element => (
  <section className="get-started-section">
    <div className="cta-container">
      <div className="cta">
        <BeginnerGuideIllustration className="image" />
        <h2 className="header">{beginnerGuideHeaderText}</h2>
        <p className="body-text">{beginnerGuideBodyText}</p>
      </div>
      <div className="cta">
        <DoMoreWithNodeIllustration className="image" />
        <h2 className="header">{doMoreWithNodeHeaderText}</h2>
        <p className="body-text">{doMoreWithNodeBodyText}</p>
      </div>
    </div>
    <Link to="/learn" className="btn circular-container">
      {learnLinkText}
    </Link>
  </section>
);

export default GetStartedSection;
