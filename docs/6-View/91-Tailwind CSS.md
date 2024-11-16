# Tailwind CSS

Follow these steps to integrate [TailwindCSS](https://tailwindcss.com/) into your CMMV project for enhanced styling capabilities:

## Install TailwindCSS

Run the following command to add TailwindCSS as a development dependency:

```bash 
pnpm add -D tailwindcss
```

## Enable Tailwind

Modify your CMMV configuration file to enable TailwindCSS. Add ``tailwind: true`` under the ``view`` section:

```javascript
module.exports = {
    ...
    view: {
        extractInlineScript: false,
        minifyHTML: true,
        vue3: true,
        tailwind: true,
    },
    ...
};
```

## Create entry file

Create a new file ``src/tailwind.css`` in your project and add the Tailwind directives:

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Create configuration

Generate a ``tailwind.config.js`` file at the root of your project with the following content:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    darkMode: 'class',
    purge: ['./index.html', './public/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

## Finalizing integration

To ensure TailwindCSS is correctly applied to your project, you need to include the generated CSS file in your application. There are two methods to achieve this: adding the ``<link>`` tag directly to your template or configuring it via the settings.


### Method 1: Add the <link> Tag in the Template

Edit your template file (e.g., ``public/templates/default.html``) and include the following ``<link>`` tag in the ``<head>`` section:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <headers />
        <link rel="stylesheet" href="/assets/bundle.min.css" />
    </head>
    <body>
        <slot />
        <scripts />
    </body>
</html>
```

<br/>

### Method 2: Add CSS via Settings in .cmmv.config.js

Alternatively, you can configure the inclusion of the CSS file in the head property within the view settings in ``.cmmv.config.js``:

```javascript
module.exports = {
    ...
    head: {
        title: 'CMMV',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'icon', href: 'assets/favicon/favicon.ico' },
            { rel: 'stylesheet', href: '/assets/bundle.min.css' }, // Include TailwindCSS bundle
        ],
    },
    ...
};
```

This approach allows dynamic configuration of your HTML ``<head>`` and keeps your template files cleaner.