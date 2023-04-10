const path = require('path');
const examplePlugin = require('.');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  let { currentTestName } = expect.getState();
  config = {
    ...{
      plugins: [examplePlugin],
      corePlugins: {
        preflight: false,
      }
    },
    ...config,
  };

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

it('matchVariant (media)', () => {
  const config = {
    content: [{
      raw: String.raw`
      <div class="resolution-2:hidden"></div>
      <div class="resolution-[288dpi]:block></div>
      <div class="resolution-4:hidden"></div>"`
    }],
  };

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      @media (min-resolution: 2dppx) {
        .resolution-2\:hidden {
          display: none;
        }
      }
      @media (min-resolution: 288dpi) {
        .resolution-\[288dpi\]\:block {
          display: block;
        }
      }
      @media (min-resolution: 4dppx) {
        .resolution-4\:hidden {
          display: none;
        }
      }
    `)
  });
});
