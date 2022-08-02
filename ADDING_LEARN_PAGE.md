# Documentation RFCs (Request for Comments)

While the Website Redesign working group continues to iterate on site design and content structure, we will use an RFC process to accept and evaluate Node.js documentation contributions in this repo. Once the new site architecture and documentation ingestion flow is finalized, all docs content will be migrated to its final location and this process updated accordingly.

## When you need to follow this process

With the working group iterating on design and content structure, this process is our way of making sure all content gets good feedback and, with approval, eventually finds its way to the right place in the documentation.

You need to follow this process if you intend to make a "substantial" addition or change to the proposed Node.js getting started guides in this repo. What constitutes a "substantial" change evolves based on community norms. Some changes do not require an RFC. These may include reasonably sized re-phasing, reorganizing, or refactoring an existing documentation page.

If you submit a pull request to implement a significant change to the documentation without going through the RFC process, it may be closed with a polite request to submit an RFC first!

## To begin drafting a documentation page:

1. Fork the [nodejs/nodejs.dev repo](https://github.com/nodejs/nodejs.dev) so that you have your own copy of the repository to which you have push access.
1. Create your documentation file in `content/learn`. Use a reasonable and descriptive name for the file.
  - If you're writing a simple Markdown file, use an `.md` extension. Otherwise, if you want to incorporate [JSX](https://reactjs.org/docs/introducing-jsx.html) features, save it with an `.mdx` extension.
1. Copy the metadata from the template below. This metadata defines crucial information such as authors, the title of your documentation page, and more.
  ```mdx
  ---
  title: 'A title for your page'
  description: 'A short description of your page'
  authors: your-github-username
  section: Name of the Section # Available categories are 'Quick Start' and 'Getting Started'
  category: learn # Leave this as it is
  ---
  ```
1. Edit your file and begin writing out your article. Put care into the details! Please review the proposed [Node.js Voice and Tone Guidelines](https://github.com/nodejs/nodejs.dev/blob/main/style-guide/0001-voice-and-tone.md) before you begin writing.
1. When you are ready to get some feedback on your article, submit a pull request back to the main nodejs/nodejs.dev repository. As a pull request, the draft will receive feedback from the larger community, and the author should be prepared to revise it in response.
1. Build consensus on your article by integrating feedback from the community.
1. Eventually, the Website Redesign Working Group will decide in one of their bi-weekly meetings whether the RFC is a candidate for inclusion on the Node.js website.

### Recommendations

- We recommend you read general Markdown and MDX documentation before you start writing your article.
- If you're adding code snippets within your article, please run `npm run lint:js` to check if your snippets follow our linting rules.
- If you're in doubt regarding a specific Node.js API, refer to the [Node.js Docs](https://nodejs.org/en/docs/).

### Acceptance Criteria

RFCs that are candidates for inclusion on the Node.js website will enter a "final comment period" lasting 7 days. The beginning of this period will be signaled with a comment and tag on the RFC's pull request. The RFC can be modified based upon feedback from the community. Significant modifications may trigger a new final comment period. At the close of this review period, the RFC may be:

- **Accepted** at the close of its final comment period. A working group member will merge the RFC's associated pull request, at which point the RFC will become 'active', or;
- **Rejected** by the Website Redesign working group after public discussion has settled and comments have been made summarizing the rationale for rejection. A member of the working group should then close the RFC's associated pull request.
