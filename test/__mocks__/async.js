module.exports = {
  parallel: (entries, callback) => {
    const results = {};

    let totalExecuted = 0;

    Object.entries(entries).forEach(([key, value], __, array) => {
      value((_, item) => {
        results[key] = item;

        totalExecuted += 1;

        if (totalExecuted === array.length) {
          callback(null, results);
        }
      });
    });
  },
};
