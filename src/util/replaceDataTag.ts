const DATA_TAGS_REGEX = {
  hrefRegex: /(data)?tag-(tagc|tagm|tage)--/,
  textRegex: /<(Data)?Tag tag="(M|C|E)" \/> /,
};

// This adds a text prefix to were the `<DataTag>` was in the text
// Note this applies only to non MDX rendered content, such as the ToC
const createTextPrefix = (t: string) => {
  switch (t) {
    case 'C':
      return 'Class: ';
    case 'E':
      return 'Event: ';
    default:
      return '';
  }
};

export const replaceDataTagFromString = (text: string) =>
  text
    .replace(DATA_TAGS_REGEX.hrefRegex, '')
    .replace(DATA_TAGS_REGEX.textRegex, (_, __, t) => createTextPrefix(t));
