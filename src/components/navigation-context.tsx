import React from 'react';

export interface NavigationContextInterface {
  isOpen: boolean,
  selectedItem: {}
}

const NavigationContext =
  React.createContext<NavigationContextInterface | null>(null);
NavigationContext.displayName = 'NavigationContext';

export default NavigationContext;
