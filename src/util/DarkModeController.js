// @ts-check

/*eslint-disable */

export default class DarkModeController {
  static get timeout() {
    const value = Symbol.for('dark-mode.toggler.timeout');
    Object.defineProperty(this, 'timeout', { value, writable: false });
    return value;
  }

  static get resetting() {
    const value = Symbol.for('dark-mode.toggler.resetting');
    Object.defineProperty(this, 'resetting', { value, writable: false });
    return value;
  }

  static get prefersLightMode() {
    const value =
      (typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: light)')) ||
      undefined;
    Object.defineProperty(this, 'prefersLightMode', { value, writable: false });
    return value;
  }

  static get prefersDarkMode() {
    const value =
      (typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)')) ||
      undefined;
    Object.defineProperty(this, 'prefersDarkMode', { value, writable: false });
    return value;
  }

  /** @param {HTMLElement} [target] */
  constructor(target) {
    Object.defineProperties(this, {
      target: {
        value:
          /** @type {HTMLElement|undefined} */ (target ||
          (typeof document === 'object' && document.body) ||
          undefined),
        writable: false,
      },
      [DarkModeController.timeout]: {
        value: /** @type {number|undefined} */ (undefined),
        writable: true,
      },
      [DarkModeController.resetting]: {
        value: /** @type {boolean|undefined} */ (undefined),
        writable: true,
      },
      state: {
        value: /** @type {DarkModeState|undefined} */ (undefined),
        writable: true,
      },
      prefers: {
        value: /** @type {PrefersColorSchemes|undefined} */ (undefined),
        writable: true,
      },
      enable: { value: this.enable.bind(this), writable: false },
      disable: { value: this.disable.bind(this), writable: false },
      toggle: { value: this.toggle.bind(this), writable: false },
      onPointerDown: { value: this.onPointerDown.bind(this), writable: false },
      onPointerUp: { value: this.onPointerUp.bind(this), writable: false },
    });

    ((prefersDarkMode, prefersLightMode, localStorage) => {
      if (!localStorage || !prefersDarkMode || !prefersLightMode) return;
      localStorage.darkMode === 'enabled'
        ? ((this.state = 'enabled'), this.enable())
        : localStorage.darkMode === 'disabled'
        ? ((this.state = 'disabled'), this.disable())
        : this.toggle(
            prefersDarkMode.matches === true ||
              prefersLightMode.matches !== true,
            !!(localStorage.darkMode = this.state = 'auto')
          );
      prefersDarkMode.addListener(
        ({ matches = false }) =>
          matches === true && this.toggle(!!matches, true)
      );
      prefersLightMode.addListener(
        ({ matches = false }) => matches === true && this.toggle(!matches, true)
      );
    })(
      DarkModeController.prefersDarkMode,
      DarkModeController.prefersLightMode,
      (typeof localStorage === 'object' && localStorage) || undefined
    );

    Object.preventExtensions(this);
  }

  /**
   * @param {DarkModeState|boolean} [state]
   * @param {boolean} [auto]
   */
  async toggle(state, auto) {
    const { classList } = this.target;

    if (auto === true) {
      if (state === true) this.prefers = 'dark';
      else if (state === false) this.prefers = 'light';
      if (this.state !== 'auto') return;
    }

    state =
      state === 'auto'
        ? ((auto = true), this.prefers !== 'light')
        : state == null
        ? !classList.contains('dark-mode')
        : !!state;

    this.state = localStorage.darkMode = auto
      ? 'auto'
      : state
      ? 'enabled'
      : 'disabled';

    state
      ? (classList.add('dark-mode'), classList.remove('light-mode'))
      : (classList.add('light-mode'), classList.remove('dark-mode'));
  }

  /** @param {boolean} [auto] */
  enable(auto) {
    this.toggle(true, auto);
  }

  /** @param {boolean} [auto] */
  disable(auto) {
    this.toggle(false, auto);
  }

  onPointerDown() {
    clearTimeout(this[DarkModeController.timeout]);
    this[DarkModeController.timeout] = setTimeout(() => {
      this.toggle('auto');
      this[DarkModeController.resetting] = true;
      // console.log('Reset dark mode!');
    }, 2000);
  }

  onPointerUp() {
    this[DarkModeController.timeout] = clearTimeout(
      this[DarkModeController.timeout]
    );
    this[DarkModeController.resetting] === true
      ? (this[DarkModeController.resetting] = false)
      : this.toggle();
  }
}

Object.preventExtensions(DarkModeController);

/** @typedef {'auto'|'enabled'|'disabled'} DarkModeState */
/** @typedef {'light'|'dark'} PrefersColorSchemes */

/* eslint-enable */
