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

  public articleRef: React.RefObject<HTMLElement>;

  public selectRef: React.RefObject<HTMLSelectElement>;

  public optionMap: Map<HTMLOptionElement, HTMLElement>;

  public options: HTMLOptionElement[];

  public sections: HTMLElement[];

  public currentSection: HTMLElement | null;

  public constructor(props: Props) {
    super(props);
    this.parsedContent = (props && props.parsedContent) || new ParsedContent();
    this.articleRef = React.createRef();
    this.selectRef = React.createRef();
    this.optionMap = new Map<HTMLOptionElement, HTMLElement>();
    this.options = [];
    this.sections = [];
    this.currentSection = null;
  }

  public componentDidMount() {
    this.populate();
  }

  public populate() {
    /* eslint-disable */
    this.options.splice(0, this.options.length);
    this.sections.splice(0, this.sections.length);
    this.currentSection = null;

    // @ts-ignore
    for (const node of [].concat(...this.optionMap.entries()))
      node && node.remove();

    this.optionMap.clear();

    const {
      parsedContent,
      articleRef: { current: articleNode },
      selectRef: { current: selectNode },
    } = this;

    if (!articleNode || !selectNode) return; // requestAnimationFrame(() => this.populate());

    for (const node of [
      // @ts-ignore
      ...articleNode.querySelectorAll(':scope > section'),
      // @ts-ignore
      ...selectNode.childNodes,
    ])
      node && node.remove();

    if (parsedContent.sections) {
      this.sections.push(...this.parsedContent.sections);

      for (const section of this.sections) {
        section.removeAttribute('visible');
        const name = section.getAttribute('name') || '';
        const option = selectNode.appendChild(document.createElement('option'));
        this.optionMap.set(option, section);
        option.setAttribute('value', (option.innerText = name));
        this.options.push(option);
      }

      // articleNode.append(... this.sections);
      articleNode.append(...this.sections, ...articleNode.children);
      selectNode.append(...this.options);
      this.select(this.sections[0]);
    }
    /* eslint-enable */
  }

  public select(selection: HTMLOptionElement | HTMLElement) {
    /* eslint-disable */
    !selection ||
      this.sections.includes(selection) ||
      // @ts-ignore
      (selection = this.optionMap.get(selection));
    if (!selection || selection === this.currentSection) return;
    if (this.currentSection != null)
      this.currentSection.removeAttribute('visible');
    selection.setAttribute('visible', '');
    this.currentSection = selection;

    const heading = /** @type {HTMLHeadingElement} */ this.currentSection.querySelector(
      'h2:first-child, h3:first-child'
    );
    if (heading) heading.hidden = true;
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
                  {parent && parent.relativePath && (
                    <EditLink relativePath={parent.relativePath} />
                  )}
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
