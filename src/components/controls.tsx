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
    color: #999;
    background: linear-gradient(to right, #9993, #9993), #333f46;
    border-radius: 1ch;

    font-family: initial;
    /* -apple-system', system-ui, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;*/
    font-size: 16px;
    font-weight: 200;
    min-height: 2em;
    line-height: normal;
    white-space: normal;
    text-size-adjust: 100%;
    text-shadow: #333f46 0px 0.875px 0px;
    user-select: none;
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
  controller = new DarkModeController(document.body),
}: Props) => (
  <header css={controlsStyles.header}>
    <div id="controls">
      <span>
        <a
          className="icon-button"
          id="contrast"
          title="Dark/Light"
          onPointerDown={() => controller.onPointerDown()}
          onPointerUp={() => controller.onPointerUp()}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <i className="material-icons light-mode-only">{darkModeIcon}</i>
          <i className="material-icons dark-mode-only">{lightModeIcon}</i>
        </a>
      </span>
    </div>
  </header>
);

export default Controls;
