import React from 'react';
import {
  handleMouseDown,
  handleFocus,
  handleKeyDown,
  handleBlur,
} from '../../src/util/outlineOnKeyboardNav';

describe('Tests for focus and blur handlers', () => {
  const FOCUS_ATTR = 'data-is-focused';
  const TAB_KEYCODE = 9;
  let event = {};
  beforeEach(() => {
    event = {
      target: document.createElement('div'),
      currentTarget: document.createElement('div'),
      keyCode: TAB_KEYCODE,
    };
  });
  it('hides outline for mouse focus', () => {
    handleMouseDown(event as Event);
    handleFocus(event as Event);
    expect(
      (event as React.KeyboardEvent<HTMLDivElement>).target.getAttribute(
        FOCUS_ATTR
      )
    ).toEqual('true');
  });
  it('doesnt hide outline for keyboard focus', () => {
    handleKeyDown(event as KeyboardEvent);
    handleFocus(event as Event);
    expect(
      (event as React.KeyboardEvent<HTMLDivElement>).target.getAttribute(
        FOCUS_ATTR
      )
    ).toBeNull();
  });
  it('Blurs after leaving focus', () => {
    handleMouseDown(event as Event);
    handleFocus(event as Event);
    expect(
      (event as React.KeyboardEvent<HTMLDivElement>).target.getAttribute(
        FOCUS_ATTR
      )
    ).toEqual('true');
    handleBlur(event as Event);
    expect(
      (event as React.KeyboardEvent<HTMLDivElement>).target.getAttribute(
        FOCUS_ATTR
      )
    ).toBeNull();
  });
});
