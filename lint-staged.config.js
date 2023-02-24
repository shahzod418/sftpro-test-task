module.exports = {
  '*.+(ts|tsx)': ['yarn lint:fix', 'yarn format', 'yarn type'],
  '*.+(js|jsx|json)': 'yarn format',
};
