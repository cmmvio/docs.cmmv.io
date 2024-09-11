module.exports = {
    env: process.env.NODE_ENV,
    
    server: {
        host: process.env.HOST || "0.0.0.0",
        port: process.env.PORT || 3000,        
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
            enabled: true,
            options: {
                contentSecurityPolicy: false
            }
        },
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
        default: "en"
    },

    rpc: {
        enabled: false
    },

    view: {
        extractInlineScript: false,
        minifyHTML: true
    },

    head: {
        title: "Documentation | CMMV - A minimalistic Node.js framework",
        htmlAttrs: {
            lang: "pt-br"
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
            { property: "og:title", content: "CMMV - Minimalistic Node.js Server Framework" },
            { property: "og:description", content: "CMMV (Contract Model Model View) is a revolution in web application development" },
            { property: "og:url", content: "https://cmmv.io/" },
            { property: "og:type", content: "website" },
            { property: "og:image", content: "" },
            { property: "og:image:alt", content: "altText of the image" },
            { property: "og:site_name", content: "CMMV" },
            { name: "ahrefs-site-verification", content: "" },
        ],
        link: [
            { rel: 'icon', href: '/assets/favicon/favicon.ico' },
            { rel: 'shortcut', href: '/assets/favicon/favicon-32x32.png' },
            { rel: 'apple-touch-icon', href: '/assets/favicon/favicon-32x32.png' },
            { rel: "dns-prefetch", href: "https://docs.cmmv.io" },
            { rel: "preconnect", href: "https://docs.cmmv.io" },             
            { rel: "stylesheet", href: "/assets/tailwind.min.css" },   
            { rel: "stylesheet", href: "/assets/docs.css" }            
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
            "font-src 'self'",
            "connect-src 'self' ws://localhost:3001 http://localhost:3001 https://*.algolianet.com https://*.algolia.net https://googletagmanager.com https://www.google-analytics.com",
            "img-src 'self' data: https://googletagmanager.com"
        ]
    },

    scripts: [
        { type: "text/javascript", src: "/assets/bundle.min.js", defer: "defer" },
        { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3", defer: "defer" },
        { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/js/all.min.js", async: "async" },
    ]
};