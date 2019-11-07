import React from 'react';
import { DarkModeController } from '@smotaal.io/dark-mode-controller';

interface ReactDarkModeController extends DarkModeController {
  onPointerDown(
    event: React.PointerEvent | React.MouseEvent | PointerEvent
  ): void;
  onPointerUp(
    event: React.PointerEvent | React.MouseEvent | PointerEvent
  ): void;
  handleEvent(event?: React.PointerEvent | React.MouseEvent | Event): void;
}

// We're exporting a singleton
export default new DarkModeController() as ReactDarkModeController;
