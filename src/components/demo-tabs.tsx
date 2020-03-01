import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ContentPageData } from '../types';
import AuthorsList from './authors-list';
import EditLink from './edit-link';
import { ParsedContent } from '../util/ParsedContent';

const query = graphql`
  query DemoTabsContent {
    content: markdownRemark(
      frontmatter: {
        title: { eq: "Installing via Package Manager" }
        section: { eq: "Content" }
      }
    ) {
      id
      html
      tableOfContents
      frontmatter {
        title
        description
      }
      fields {
        slug
        authors
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
`;

export interface Props {
  parsedContent?: ParsedContent;
}

class DemoTabs extends React.Component<Props> {
  public parsedContent: ParsedContent;

  public parsedFragment: DocumentFragment | null;

  public articleRef: React.RefObject<HTMLElement>;

  public selectRef: React.RefObject<HTMLSelectElement>;

  public optionMap: WeakMap<HTMLOptionElement, HTMLElement>;

  public options: HTMLOptionElement[];

  public sections: HTMLElement[];

  public currentSection: HTMLElement | null;

  public constructor(props: Props) {
    super(props);
    this.parsedContent = (props && props.parsedContent) || new ParsedContent();
    this.articleRef = React.createRef();
    this.selectRef = React.createRef();
    this.optionMap = new WeakMap<HTMLOptionElement, HTMLElement>();
    this.options = [];
    this.sections = [];
    this.currentSection = null;
    this.parsedFragment = null;
  }

  public componentDidMount() {
    this.populate();
  }

  public populate() {
    if (this.parsedFragment === this.parsedContent.documentFragment) return;

    /* eslint-disable */

    const {
      parsedContent,
      parsedFragment,
      articleRef: { current: articleNode },
      selectRef: { current: selectNode },
    } = this;

    const splicedNodes = [
      ...this.options.splice(0, this.options.length),
      ...this.sections.splice(0, this.sections.length),
    ];

    this.currentSection = null;

    // @ts-ignore
    for (const node of splicedNodes) node.remove();

    if (!articleNode || !selectNode) return;

    if (parsedContent.sections) {
      for (const section of parsedContent.sections) {
        const clone = section.cloneNode(true) as HTMLElement;
        clone.removeAttribute('visible');
        const name = clone.getAttribute('name') || '';
        const option = selectNode.appendChild(document.createElement('option'));
        this.optionMap.set(option, clone);
        option.setAttribute('value', (option.innerText = name));
        this.sections.push(clone);
        this.options.push(option);
        const heading = /** @type {HTMLHeadingElement} */ clone.querySelector(
          `h2:first-child,h3:first-child`
        );
        if (heading && heading.parentElement === clone) heading.hidden = true;
      }

      articleNode.append(...this.sections, ...articleNode.children);
      selectNode.append(...this.options);

      this.select(this.sections[0]);
    }

    this.parsedFragment = parsedFragment;
    /* eslint-enable */
  }

  public select(selection: HTMLOptionElement | HTMLElement) {
    /* eslint-disable */
    selection === undefined
      ? (selection = this.sections[0])
      : !selection ||
        this.sections.includes(selection) ||
        // @ts-ignore
        (selection = this.optionMap.get(selection));
    if (!selection || selection === this.currentSection) return;
    if (this.currentSection != null)
      this.currentSection.removeAttribute('visible');
    selection.setAttribute('visible', '');
    this.currentSection = selection;

    const name = selection.getAttribute('name');

    !this.selectRef.current ||
      !this.selectRef.current.parentElement ||
      this.selectRef.current.parentElement.setAttribute(
        'aria-selected',
        name || ''
      );
    /* eslint-enable */
  }

  public render() {
    return (
      <React.Fragment>
        <label htmlFor="demo-input">
          <select
            id="demo-input"
            ref={this.selectRef}
            onChange={({ target: { selectedOptions } }) =>
              this.select(selectedOptions && selectedOptions[0])
            }
          />
        </label>
        <article className="article-reader" ref={this.articleRef}>
          <StaticQuery
            query={query}
            render={({ content }: ContentPageData) => {
              const { parent, fields } = content;
              this.parsedContent.generatedContent = content;

              this.populate();

              return (
                <footer>
                  <hr />
                  <AuthorsList authors={fields.authors} />
                </footer>
              );
            }}
          />
        </article>
      </React.Fragment>
    );
  }
}

export default DemoTabs;
