import { MdxLink } from 'gatsby-theme-i18n';
import { ApiComponents, ArticleComponents } from './components';

export const mdxComponents = {
  code: ArticleComponents.InlineCode,
  pre: ArticleComponents.Codebox,
  inlineCode: ArticleComponents.InlineCode,
  a: MdxLink,
  table: ArticleComponents.Table,
  blockquote: ArticleComponents.BlockQuote,
  Alert: ArticleComponents.Alert,
};

export const apiMdxComponents = {
  DataTag: ArticleComponents.DataTag,
  a: ApiComponents.ApiLink,
  h3: ApiComponents.H3,
  h4: ApiComponents.H4,
  h5: ApiComponents.H5,
};
