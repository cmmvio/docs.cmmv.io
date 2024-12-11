require('dotenv').config();

const port = (process.env.PORT) ? parseInt(process.env.PORT) : 3000;

module.exports = {
    env: process.env.NODE_ENV,

    docs: {
        lang: process.env.DOCS_LANG || "en"
    },
    
    server: {
        host: "0.0.0.0",
        port: port,        
        poweredBy: false,
        removePolicyHeaders: false,
        compress: {
            enabled: true,
            options: {
                level: 6 
            }
        },
        cors: true,
        helmet: {
            enabled: false,
            options: {
                contentSecurityPolicy: false
            }
        },
        vite: true,
        session: {
            enabled: true,
            options: {
                sessionCookieName: process.env.SESSION_COOKIENAME || "cmmv-session",
                secret: process.env.SESSION_SECRET || "secret",
                resave: false,
                saveUninitialized: false ,
                cookie: { 
                    secure: true,
                    maxAge: 60000 
                }
            }
        }
    },

    i18n: {
        localeFiles: "./src/locale",
        default: process.env.DOCS_LANG || "en"
    },

    rpc: {
        enabled: false
    },

    view: {
        extractInlineScript: false,
        minifyHTML: true,
        vue3: true
    },

    head: {
        title: "Documentation | CMMV - A minimalistic Node.js framework",
        htmlAttrs: {
            lang: "en-US"
        },
        meta: [
            { charset: 'utf-8' },
            { "http-equiv": "content-type", content: "text/html; charset=UTF-8" },
            { name: 'description', content: 'CMMV is a minimalist Node.js framework focused on contract-driven development, combining automatic code generation, RPC communication, and declarative programming to build efficient, scalable applications with simplified backend and frontend integration.' },
            { name: 'keywords', content: 'CMMV, Node.js framework, contract-driven development, RPC communication, TypeScript, automatic code generation, backend, frontend integration, scalable applications, minimalist framework, WebSocket, HTTP, high-performance.' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: "robots", content: "index,follow" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: "@cmmvjs" },
            { name: "twitter:image", content: "https://cmmv.io/assets/social/cmmv_twittercard.png" },
            { name: "twitter:description", content: "CMMV (Contract Model Model View) is a revolution in web application development" },
            { property: "og:title", content: "CMMV - Minimalistic Node.js Server Framework" },
            { property: "og:description", content: "CMMV (Contract Model Model View) is a revolution in web application development" },
            { property: "og:url", content: "https://cmmv.io/" },
            { property: "og:type", content: "website" },
            { property: "og:image", content: "https://cmmv.io/assets/social/cmmv_opengraph_card.png" },
            { property: "og:image:alt", content: "altText of the image" },
            { property: "og:site_name", content: "CMMV" }
        ],
        link: [
            { rel: 'icon', href: '/assets/favicon/favicon.ico' },
            { rel: 'shortcut', href: '/assets/favicon/favicon-32x32.png' },
            { rel: 'apple-touch-icon', href: '/assets/favicon/favicon-32x32.png' },
            { rel: "dns-prefetch", href: "https://cmmv.io" },
            { rel: "preconnect", href: "https://cmmv.io" },             
            { rel: "stylesheet", href: "/assets/tailwind.min.css" },   
            { rel: "stylesheet", href: "/assets/docs.css" }            
        ]
    },

    scripts: [
        { type: "text/javascript", src: "/assets/bundle.min.js", defer: "defer" },
        { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3", defer: "defer" },
        { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/js/all.min.js", async: "async" },
    ]
};