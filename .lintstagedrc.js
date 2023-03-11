const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.{js,ts,jsx,tsx,json}": ["npx pretty-quick --staged"],
  "**/*.{ts,tsx}": [buildEslintCommand],
};
