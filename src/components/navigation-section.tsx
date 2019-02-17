import React from 'react';
import { NavigationItemData } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  title: string;
  items: Array<NavigationItemData>;
  onItemClick: () => void;
}

const NavigationSection = ({ title, items, onItemClick }: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {items.map((item: NavigationItemData) => (
        <NavigationItem
          key={item.id}
          title={item.title}
          slug={item.slug}
          isDone={item.isDone}
          isActive={item.isActive}
          onClick={onItemClick}
        />
      ))}
    </ul>
  )
}

export default NavigationSection
