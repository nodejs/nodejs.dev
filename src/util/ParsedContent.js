// @ts-check

/**
 * @typedef {typeof ParsedContent} Constructor
 * @typedef {import('../types/').ContentPageData['content']} GeneratedContent
 * @typedef {DocumentFragment & {ownerDocument: Document}} Fragment
 * @typedef {HTMLElement[]} Sections
 */
export class ParsedContent {
  /** @param {ParsedContent} content */
  static createTemplate(content) {
    /** @type {typeof ParsedContent} */
    const constructor = this || ParsedContent;

    /** @type {WeakMap<Document, HTMLTemplateElement | null>} */
    let templates;

    const { ownerDocument, template } = content;

    if (template !== undefined) return template;

    /* eslint-disable */

    // IF initialized without DOM we do mutate
    if (ownerDocument === null) content.template = null;
    // IF uninitialized we don't mutate
    if (ownerDocument == null) return null;

    // SO initialized with DOM

    // MAYBE Create constructor.templates
    (constructor.hasOwnProperty('templates') &&
      WeakMap[Symbol.hasInstance](constructor.templates)) ||
      Object.defineProperty(constructor, 'templates', {
        value: new WeakMap(),
      });

    // GET content.template is already catched
    content.template = constructor.templates.get(ownerDocument);

    // IF not catched at all (not even null)
    if (content.template === undefined) {
      try {
        // Create content.template for content.ownerDocument
        content.template = ownerDocument.createElement('template');
      } catch (exception) {
        // Set content.template to prevent destructuring fallbacks
        content.template = null;
      } finally {
        // Update map entry regardless
        constructor.templates.set(ownerDocument, content.template || null);
      }
    }

    /* eslint-enable */

    return content.template || null;
  }

  /** @param {ParsedContent} content */
  static createFragment(content) {
    if (!content || !ParsedContent[Symbol.hasInstance](content)) return null;

    const {
      ownerDocument,
      template = ((this && this.createTemplate) ||
        ParsedContent.createTemplate)(content),
      generatedContent,
    } = content;

    if (ownerDocument === null || template === null) return null;
    if (generatedContent == null) return document.createDocumentFragment();

    template.innerHTML = generatedContent.html;
    return template.content.cloneNode(true);
  }

  /** @param {ParsedContent} content */
  static parseFragment(content) {
    if (!content || !ParsedContent[Symbol.hasInstance](content)) return null;

    const parsedHTML = '';

    const { documentFragment: fragment, ownerDocument: document } = content;

    if (!fragment || !document) return; // parsedHTML;

    const { textContent: generatedHTML } = fragment;

    if (!generatedHTML || !generatedHTML.trim()) return; // generatedHTML;

    ParsedContent.processCodeBlocks(content);
    ParsedContent.processAnchorTargets(content);
    ParsedContent.processSections(content);
  }

  /** @param {ParsedContent} content */
  static processSections(content) {
    if (!content || !content.documentFragment || !content.ownerDocument) return;
    /* eslint-disable */
    content.sections = Object.freeze(
      /** @type {HTMLElement[]} */ ([
        ...content.documentFragment.querySelectorAll(':scope > section[name]'),
      ])
    );
    /* eslint-enable */
  }

  /** @param {ParsedContent} content */
  static processAnchorTargets(content) {
    if (!content || !content.documentFragment || !content.ownerDocument) return;
    /* eslint-disable */
    const origin =
      content.ownerDocument.origin ||
      /** @type {Window} */ (content.ownerDocument.defaultView).location.origin;
    for (const anchor of /** @type {Iterable<HTMLAnchorElement>} */ ([
      ...content.documentFragment.querySelectorAll('a:not([target])'),
    ])) {
      if (anchor.origin !== origin) anchor.target = '_blank';
    }
    /* eslint-enable */
  }

  /** @param {ParsedContent} content */
  static processCodeBlocks(content) {
    if (!content || !content.documentFragment || !content.ownerDocument) return;
    /* eslint-disable */

    for (const code of [
      ...content.documentFragment.querySelectorAll('pre > code'),
    ]) {
      /** @type {HTMLElement | undefined} */ let line;
      let {
        className,
        TEXT_NODE,
        parentElement,
      } = /** @type {HTMLElement & {parentElement: HTMLElement}} */ (code);

      if (parentElement.childElementCount > 1) continue;

      const isShell = /\blanguage-(?:bash)\b/.test(className);

      className = `${className || ''} ${'line'}`.trim();

      for (const node of [...code.childNodes]) {
        if (line === undefined) {
          (line = parentElement.appendChild(
            content.ownerDocument.createElement('code')
          )).className = className;
        }
        if (node.nodeType === TEXT_NODE) {
          for (const text of /** @type {Text} */ (node).wholeText.split(
            /(\n)/
          )) {
            if (text === '\n') {
              parentElement.appendChild(
                content.ownerDocument.createElement('br')
              );
              (line = parentElement.appendChild(
                content.ownerDocument.createElement('code')
              )).className = className;
            } else {
              line.appendChild(new Text(text));
            }
          }
          node.remove();
        } else {
          line.appendChild(node);
        }
      }
      code.remove();
      if (!isShell) continue;
      for (const line of parentElement.querySelectorAll(':scope > code.line')) {
        line.firstChild &&
          (line.firstChild.nodeType === TEXT_NODE
            ? /^\s*\w/.test(/** @type {Text } */ (line.firstChild).data)
            : line.firstElementChild === line.firstChild &&
              !line.firstElementChild.classList.contains('comment')) &&
          line.classList.add('shell-command');
      }
    }
    /* eslint-enable */
  }

  /** @param {GeneratedContent} [content] @param {Document} [ownerDocument] */
  constructor(content, ownerDocument) {
    /* eslint-disable */
    if (!ownerDocument) ownerDocument = typeof document === 'object' && document || undefined;
    this.ownerDocument =
      /** @type {Document | null | undefined} */ ((ownerDocument != null &&
        typeof ownerDocument === 'object' &&
        typeof ownerDocument.createElement === 'function' &&
        ownerDocument) ||
      null);
    this.template = /** @type {HTMLTemplateElement | null | undefined} */ (undefined);
    this.sections = ParsedContent.empty;
    this.content = content || undefined;
    /* eslint-enable */
  }

  /* eslint-disable */
  /** @param {string | Error} reason @param {new (message: string) => Error} [type] */
  throw(reason, type) {
    throw new (typeof type === 'function' ? type : Error)(
      (reason &&
        reason.toString !== Symbol.prototype.toString &&
        `${reason}`.trim()) ||
        `Exception thrown — ${Object.prototype.toString.call(reason)}`
    );
  }
  /* eslint-enable */

  /** @type {string} */
  get parsedHTML() {
    return this[ParsedContent.HTML] || '';
  }

  /** @type {DocumentFragment | undefined} */
  get documentFragment() {
    return this[ParsedContent.FRAGMENT];
  }

  /** @type {GeneratedContent | undefined} */
  get generatedContent() {
    return this[ParsedContent.CONTENT];
  }

  set generatedContent(value) {
    if (
      /* eslint-disable */
      this.constructor.prototype === this ||
      value == this[ParsedContent.CONTENT]
      /* eslint-enable */
    )
      return;
    if (!value) {
      this[ParsedContent.CONTENT] = undefined;
      this[ParsedContent.FRAGMENT] = undefined;
      this[ParsedContent.HTML] = undefined;
      this.sections = ParsedContent.empty;
      return;
    }
    if (value !== null && typeof value !== 'object') {
      this.throw(
        new TypeError(
          `‹ParsedContent›.content must be either ‹empty› or ‹object› — cannot be ‹${typeof value}›.`
        )
      );
    }
    this[ParsedContent.CONTENT] = value;
    this[ParsedContent.FRAGMENT] = ParsedContent.createFragment(this);
    this[ParsedContent.HTML] = ParsedContent.parseFragment(this) || undefined;
  }

  static get CONTENT() {
    const value = Symbol('ParsedContent.content');
    Object.defineProperty(ParsedContent, 'CONTENT', {
      value,
      enumerable: false,
      writable: false,
    });
    return value;
  }

  static get FRAGMENT() {
    const value = Symbol('ParsedContent.fragment');
    Object.defineProperty(ParsedContent, 'FRAGMENT', {
      value,
      enumerable: false,
      writable: false,
    });
    return value;
  }

  static get HTML() {
    const value = Symbol('ParsedContent.html');
    Object.defineProperty(ParsedContent, 'HTML', {
      value,
      enumerable: false,
      writable: false,
    });
    return value;
  }
}

// @ts-ignore
ParsedContent.templates = /** @type {WeakMap<Document, HTMLTemplateElement | null>} */ (undefined);

ParsedContent.empty = Object.freeze(/** @type {HTMLElement[]} */ ([]));
