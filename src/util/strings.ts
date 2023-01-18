export const toCamelCaseStatus = (str = '') =>
  str
    .toLowerCase()
    .split(' ')
    .reduce((acc, s, index) => {
      if (index === 0) {
        return s;
      }

      return acc + s.charAt(0).toUpperCase() + s.slice(1);
    }, '');
