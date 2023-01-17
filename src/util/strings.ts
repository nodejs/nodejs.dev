export const toCamelCaseStatus = (str = '') =>
  str
    .toLowerCase()
    .split(' ')
    .map((s, index) => {
      if (index === 0) {
        return s;
      }

      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join('');
