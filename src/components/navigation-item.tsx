import React from 'react';
import { Link } from 'gatsby';

type Props = {
  isDone: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  onClick: () => void;
}

class NavigationItem extends React.Component<Props> {
  private element?: HTMLAnchorElement;

  setReference = (ref: HTMLAnchorElement) => {
    if (this.props.isActive) {
      this.element = ref;
    }
  }

  componentDidMount() {
    if (this.element) {
      // TODO: Scroll ref element in to view
      // this.element.scrollIntoView(true);
    }
  }

  render() {
    const { isDone, isActive, slug, title, onClick } = this.props;
    let className = 'side-nav__item ';
    if (isDone) {
      className += 'side-nav__item--done';
    } else if (isActive) {
      className += 'side-nav__item--active';
    }
    return (
      <Link to={`/learn/${slug}`} ref={this.setReference as any} onClick={onClick} className={className}>
        {title}
      </Link>
    )
  }
}

export default NavigationItem
