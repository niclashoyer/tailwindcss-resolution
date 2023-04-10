# tailwindcss-resolution

Tailwind plugin to add `resolution-` variants, to target devices based on screen pixel density (retina, dpi).

## Installation

Install the plugin from npm:

```sh
npm install -D tailwind-resolution
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // default resolutions
    resolutions: {
      '2': '2dppx',
      '3': '3dppx',
      '4': '4dppx'
    },
    // ...
  },
  plugins: [
    require('tailwindcss-resolution'),
    // ...
  ],
}
```

## Usage

Add `resolution-` if you need to target specific device resolutions. The following code example will change background image based on dpi:

```html
<div class="bg-[url(/example.webp)] resolution-2:bg-url(/example_2x.webp)"></div>
```

This plugin will generate the following CSS:

```css
.bg-\[url\(\/example\.webp\)\] {
  background-image: url(/example.webp);
}
@media (min-resolution: 2dppx) {
  .resolution-2\:bg-\[url\(\/example_2x\.webp\)\] {
    background-image: url(/example_2x.webp);
  }
}
```
