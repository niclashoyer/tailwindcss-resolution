const plugin = require('tailwindcss/plugin');

function toDppx(value) {
  const regex = /([0-9.]+)([A-Za-z]+)/;
  let str = value + '';
  let result = str.match(regex);
  // proper value found
  if (result.length === 3) {
    let num = result[1];
    let unit = result[2].toLowerCase();
    if (unit === 'dpi') {
      // css uses fixed 1:96 ratio: https://w3c.github.io/csswg-drafts/css-values-4/#resolution-value
      return num / 96;
    } else if (unit === 'dpcm') {
      // 1 dpcm = 2.54dpi
      return (num * 2.54) / 96;
    } else if (unit === 'dppx') {
      return num;
    }
  }
  // fallback
  return 0;
}

const resolutionPlugin = plugin.withOptions(
  function(options) {
    const className = options ? options.className : 'markdown';

    return function({ matchVariant, theme }) {
      matchVariant(
        'resolution',
        (value) => `@media (min-resolution: ${value})`,
        {
          values: theme('resolutions'),
          sort(a, z) {
            return toDppx(a.value) - toDppx(z.value);
          }
        }
      )
    }
  }, function(options) {
    return {
      theme: {
        resolutions: {
          2: '2dppx',
          3: '3dppx',
          4: '4dppx',
        }
      },
    };
  }
)

module.exports = resolutionPlugin;
