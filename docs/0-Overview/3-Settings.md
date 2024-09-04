# Settings

The system configuration for a CMMV project is managed through a ``.cmmv.config.js`` file in the root directory. This file defines various settings, such as:

* **Server Settings:** Configures the host and port for the application.
* **I18n:** Manages internationalization with locale files and default languages.
* **Repository:** Defines the database type (e.g., SQLite) and connection details.
* **Head Configuration:** Sets HTML attributes, meta tags, and links for the application’s frontend.
* **Headers:** Security policies like Content-Security-Policy.
* **Scripts:** Specifies JavaScript files to load.

Modules can extend this configuration based on the application's requirements.

```typescript
module.exports = {
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 3000
    },

    i18n: {
        localeFiles: "./src/locale",
        default: "en"
    },

    head: {
        title: "Documentation | CMMV - A minimalistic Node.js framework",
        htmlAttrs: {
            lang: "pt-br"
        },
        meta: [
            { charset: 'utf-8' },
            { "http-equiv": "content-type", content: "text/html; charset=UTF-8" },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: "robots", content: "noodp" }
        ],
        link: [
            { rel: 'icon', href: '/assets/favicon/favicon.ico' },
            { rel: "dns-prefetch", href: "https://docs.cmmv.io" },
            { rel: "preconnect", href: "https://docs.cmmv.io" },    
            { rel: "stylesheet", href: "/assets/docs.css" }            
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'"
        ]
    },

    scripts: [
        { type: "text/javascript", src: '/assets/bundle.min.js'},
    ]
};
```

The default HTTP renderer in CMMV natively supports internationalization, SEO configuration, and security-focused custom headers. These features allow developers to manage localized content, improve search engine optimization, and apply security policies like Content-Security-Policy directly in the configuration. Additional settings for templates and views can also be added later, providing flexibility for customizing pages. More detailed instructions can be found in the "View" documentation, which explains how to implement these configurations within the template system.

## API

The system configurations in a CMMV-based application can be accessed programmatically through the Config class from the ``@cmmv/core`` module. This allows developers to dynamically retrieve, modify, or delete configuration values throughout the application. For example, the server's host and port settings, database configurations, or internationalization options can be accessed and altered by calling methods like Config.get(), Config.set(), and Config.has(). These features enable a flexible and centralized approach to managing system settings.

```typescript
import { Config } from "@cmmv/core";

//Get
const serverPort = Config.get<number>('server.port');
console.log(`Server running on port: ${serverPort}`);

//Set
Config.set('server.host', '127.0.0.1');

//Delete
Config.delete('repository.logging');

//Get All
const allConfig = Config.getAll();
console.log(allConfig);

//Assign
Config.assign({
    server: { port: 4000 },
    repository: { type: 'sqlite' }
});
```

Each module in the CMMV system has its own set of configurations that can be added to the central configuration file (.cmmv.config.js). This allows developers to customize the behavior and features of the modules they are using. Because different modules may require specific settings, it's essential to review each module's documentation carefully to understand the available configuration options and how they integrate with the core system. This ensures optimal setup and use of advanced functionalities such as RPC, authentication, caching, and more.