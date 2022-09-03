module.exports = {
  parallel: (entries, callback) => {
    const results = {};

    Object.entries(entries).forEach(([key, value], index, array) => {
      value((_, item) => {
        results[key] = item;

        if (index === array.length - 1) {
          callback(null, results);
        }
      });
    });
  },
};
