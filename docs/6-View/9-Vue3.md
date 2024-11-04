## Vue 3

CMMV provides support for [Vue 3](https://vuejs.org/) as the frontend framework, enabling you to build rich, reactive interfaces for your views. By using Vue 3, you can leverage its reactive system, composables, and templating syntax. Here’s how to configure and use Vue 3 in your CMMV project.

## Settings

To enable Vue 3 support in your CMMV project, you need to configure the ``.cmmv.config.js`` file. Add or modify the ``view`` configuration to include the ``vue3`` option:

```javascript
module.exports = {
    ...

    i18n: {
        localeFiles: "./src/locale",
        default: "en"
    },

    view: {
        extractInlineScript: true,
        minifyHTML: true,
        vue3: true
    },

    ...
}
```

Once Vue 3 is configured, you can use Vue's syntax and features directly in your views. The views will be rendered using Vue 3, and your setup scripts will behave similarly to how they work in Vue Single File Components (SFCs).

## Sample

By configuring your project for Vue 3, you can leverage the full power of Vue's ecosystem while still benefiting from CMMV's server-side rendering and RPC integration.

```html
<div id="app">
    <span>{{ test }}</span>
</div>

<script s-setup>
export default {
    layout: "default",

    data() {
        return {
            test: 123
        };
    },

    mounted() {
        console.log(this.test);
    }
}
</script>
```

With the correct setup, Vue 3 will handle reactive data binding. This means the test variable will automatically render in the HTML and update whenever the state changes. The mounted method will be called when the component is mounted, and you should see 123 logged in the console.

## Current Limitation

At present, the project does not support dynamic loading of Vue 3 components. In the future, CMMV will have built-in support for dynamically loading components using Vite. This will allow efficient serving of templates and ``.vue`` files, enhancing the overall performance and flexibility of the application.

Currently, when importing components, they are loaded into the bundle, which may work for most cases but can lead to conflicts, especially with recursive component loading. Developers should be cautious of these potential issues and test their component hierarchy to ensure it functions correctly. The upcoming Vite integration will address these limitations and provide a more streamlined experience for handling dynamic components in Vue 3.