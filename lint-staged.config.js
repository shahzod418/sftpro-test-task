module.exports = {
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix', () => 'tsc --skipLibCheck --noEmit'],
  '*.{json,md,html,scss}': ['prettier --write'],
};
