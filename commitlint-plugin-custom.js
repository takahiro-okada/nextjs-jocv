module.exports = {
  rules: {
    'header-match-pattern': ({header}) => {
      const pattern = /^(🐛|✏️|✨|🎉|⚡️|♻️|💩|🗑️):\s.+$/;
      return [
        pattern.test(header),
        'header must start with one of the custom emojis followed by ": " and a subject'
      ];
    }
  }
};
