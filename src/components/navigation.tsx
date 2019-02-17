import React from 'react';
import NavigationSection from './navigation-section';
import { RemarkPage, NavigationSectionData } from '../types';

/** Small screen width
 *  If the width of the viewport is lesser than this value
 * it means that the website is viewed in a tablet or mobile
 * TODO have this number shared in one place in the project
 */
const MAX_SMALLSCREEN_WIDTH = 1262

type Props = {
  activePage: RemarkPage;
  sections: Array<NavigationSectionData>;
}

type State = {
  isOpen: boolean;
}

class Navigation extends React.Component<Props, State> {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onItemClick = () => {
    // Get viewport width
    // Source - https://stackoverflow.com/a/8876069/2621400
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    // If width is lesser or equal to max small screen width
    if (w <= MAX_SMALLSCREEN_WIDTH) {
      this.toggle();
    }
  }

  render() {
    const className = this.state.isOpen ? 'side-nav side-nav--open': 'side-nav';
    return (
      <nav className={className}>
        <button className="side-nav__open" onClick={this.toggle}>Menu</button>
        {this.props.sections.map((section: NavigationSectionData) => {
          return (
            <NavigationSection 
              title={section.title}
              items={section.items}
              key={section.title}
              onItemClick={this.onItemClick}
            />
          )
        })}
      </nav>
    )
  }
}

export default Navigation
