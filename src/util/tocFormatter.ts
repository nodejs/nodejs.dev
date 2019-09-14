// See related issue: https://github.com/gatsbyjs/gatsby/issues/8982
export default function fixTocCodeTag(tocLinks: string = ''): string {
  const lessThanSignRegex = /&#x3C;/gi;

  return tocLinks.replace(lessThanSignRegex, '<');
}
