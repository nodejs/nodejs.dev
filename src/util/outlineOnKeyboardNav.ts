const TAB_KEYCODE = 9;
const FOCUS_ATTR = 'data-is-focused';
const BLUR_EVENT = 'blur';
const FOCUS_EVENT = 'focus';
const KEYDOWN_EVENT = 'keydown';
const MOUSEDOWN_EVENT = 'mousedown';

let IS_MOUSE_EVENT = false;

/**
 * Attaches listeners for keydown, mousedown, focus, and blur to the document,
 * which handle adding or removing focus outline css class for mouse events.
 */
export function addFocusOutlineListeners() {
  const docEl = window.document.documentElement;
  IS_MOUSE_EVENT = false;

  docEl.addEventListener(KEYDOWN_EVENT, handleKeyDown, false);
  docEl.addEventListener(MOUSEDOWN_EVENT, handleMouseDown, false);
  docEl.addEventListener(FOCUS_EVENT, handleFocus, true);
  docEl.addEventListener(BLUR_EVENT, handleBlur, true);
}

/**
 * Detaches listeners
 */
export function removeFocusOutlineListeners() {
  const docEl = window.document.documentElement;

  if (docEl) {
    docEl.removeEventListener(KEYDOWN_EVENT, handleKeyDown, false);
    docEl.removeEventListener(MOUSEDOWN_EVENT, handleMouseDown, false);
    docEl.removeEventListener(FOCUS_EVENT, handleFocus, true);
    docEl.removeEventListener(BLUR_EVENT, handleBlur, true);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.keyCode === TAB_KEYCODE) {
    IS_MOUSE_EVENT = false;
  }
}

function handleMouseDown(event: MouseEvent) {
  IS_MOUSE_EVENT = true;
}

function handleFocus(event: Event) {
  if (IS_MOUSE_EVENT && event.target && event.target !== event.currentTarget) {
    (event.target as Element).setAttribute(FOCUS_ATTR, 'true');
  }
}

function handleBlur(event: Event) {
  if (event.target !== event.currentTarget) {
    (event.target as Element).removeAttribute(FOCUS_ATTR);
  }
}
