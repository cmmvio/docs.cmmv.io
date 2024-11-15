# Vue 3

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

## Generating Mixins

To enable the generation of Vue-compatible mixins for RPC, you need to include the ``VueTranspile`` transpile in your application configuration. This ensures that the ``rpc-mixins.js`` file is generated automatically during the build process, providing seamless integration with Vue 3 or Nuxt applications.

Below is an example configuration to include the VueTranspile:

```typescript
import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule, VueTranspile } from '@cmmv/view';
import { ViteModule } from '@cmmv/vite';

// Contracts
import { TasksContract } from './contracts/tasks.contract';
import { IndexModule } from './modules/index.module';

Application.create({
    httpAdapter: DefaultAdapter,
    wsAdapter: WSAdapter,
    modules: [...],
    services: [...],
    transpilers: [VueTranspile], // Add VueTranspile here
    contracts: [TasksContract],
});
```

## Template Setup

If Vue is required for your project, ensure it is loaded in your HTML template. For instance, you can modify the ``default.html`` template as follows:

```html
<!DOCTYPE html>
<html lang="en" :data-theme="$style.theme" scope>
    <head>
        <headers />
        <script src="https://unpkg.com/vue@3.5.12/dist/vue.global.prod.js"></script>
    </head>
    <body scope>
        <slot />
        <scripts />
    </body>
</html>
```

This example includes Vue 3 as a global script. Adjust the ``<script>`` tag if using a local or CDN version of Vue.

## Using Mixins for RPC

CMMV now supports generating RPC mixins to streamline communication between the frontend and the backend. The mixins are auto-generated and accessible via ``/assets/rpc-mixins.js``.

To integrate the mixin into your Vue 3 application, import it dynamically:

```javascript
const { default: CMMVMixin } = await import('/assets/rpc-mixins.js');

const app = createApp({
    mixins: [CMMVMixin],
    data() {
        return {
            example: "Hello, CMMV!"
        };
    },
    mounted() {
        console.log(this.example);
    }
});

app.mount('#app');
```

## Vue 3 Application

```bash
npm install vue@next
```

**main.js**

```javascript
import { createApp } from 'vue';

const initApp = async () => {
    const { default: CMMVMixin } = 
        await import('http://localhost:3000/assets/rpc-mixins.js');
    
    const app = createApp({
        mixins: [CMMVMixin],
        data() {
            return {
                example: "Hello, Vue with RPC!"
            };
        },
        methods: {
            fetchData() {
                this.GetAllTaskRequest();
            }
        },
        mounted() {
            console.log("App is mounted with example:", this.example);
        }
    });

    app.mount('#app');
};

initApp();
```

Create a basic Vue application:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Vue RPC Integration</title>
        <script src="https://unpkg.com/vue@3.5.12/dist/vue.global.prod.js"></script>
    </head>
    <body>
        <div id="app">
            <h1>{{ example }}</h1>
            <button @click="fetchData">Fetch Data</button>
        </div>
        <script type="module" src="/main.js"></script>
    </body>
</html>
```

## Nuxt Application

```bash
npx nuxi init nuxt-rpc
cd nuxt-rpc
npm install
```

**plugins/cmmv-mixins.client.ts**

```javascript
// plugins/cmmv-mixins.client.ts
export default defineNuxtPlugin(async () => {
    const { default: CMMVMixin } = 
        await import('http://localhost:3000/assets/rpc-mixins.js');

    return {
        provide: {
            cmmvMixin: CMMVMixin,
        },
    };
});
```

Use the mixin in a page:

```html
<!-- pages/index.vue -->
<template>
    <div>
        <h1>{{ example }}</h1>
        <button @click="fetchData">Fetch Data</button>
    </div>
</template>

<script setup>
import { useNuxtApp } from '#app';

const { $cmmvMixin } = useNuxtApp();
const mixins = [$cmmvMixin];

const data = reactive({
    example: "Hello, Nuxt with RPC!"
});

const fetchData = () => {
    mixins[0].methods.GetAllTaskRequest.call({
        pack: mixins[0].methods.pack,
        send: mixins[0].methods.send,
        example: "Task Data!"
    });
};
</script>
```