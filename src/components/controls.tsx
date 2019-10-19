import React from 'react';
import { css } from '@emotion/core';
import DarkModeController from '../util/DarkModeController';

const controlsStyles = {
  header: css/* scss */ `
    position: fixed;
    padding: 0.25ch 1ch;
    margin-bottom: 1ch;
    margin-top: -1ch;
    right: 0;
    z-index: 999;
    box-sizing: border-box;
    will-change: transform;

    display: grid;
    grid-auto-flow: column dense;
    grid-gap: 1ch;
    align-items: center;

    opacity: 0.9;
    color: var(--color-text-accent, #999);
    background-color: var(--black9, #9993);
    border-top-left-radius: 1ch;
    border-bottom-left-radius: 1ch;

    min-width: max-content;
    width: 0;
    white-space: normal;
    text-size-adjust: 100%;
    text-shadow: #333f46 0px 0.875px 0px;
    user-select: none;
  `,
  button: css/* scss */ `
    color: inherit;
    border: none;
    width:max-content;
    display: contents;
  `,
  controls: css/* scss */ `
    color: inherit;
  `,
};

interface Props {
  lightModeIcon?: string;
  darkModeIcon?: string;
  controller?: DarkModeController;
}

const Controls = ({
  lightModeIcon = 'wb_sunny',
  darkModeIcon = 'nights_stay',
  controller = new DarkModeController(),
}: Props) => (
  <header css={controlsStyles.header}>
    <div id="controls" css={controlsStyles.controls}>
      <span>
        <button
          type="button"
          css={controlsStyles.button}
          id="contrast"
          title="Dark/Light"
          onPointerDown={(): void => {
            controller.onPointerDown();
          }}
          onPointerUp={(): void => {
            controller.onPointerUp();
          }}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <i className="material-icons light-mode-only">{darkModeIcon}</i>
          <i className="material-icons dark-mode-only">{lightModeIcon}</i>
        </button>
      </span>
    </div>
  </header>
);

export default Controls;
