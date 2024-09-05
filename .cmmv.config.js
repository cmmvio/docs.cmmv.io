module.exports = {
    env: process.env.NODE_ENV,
    
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 3000,
        sessionSecret: process.env.SESSION_SECRET || "secret",
        sessionCookieName: process.env.SESSION_COOKIENAME || "cmmv-session"
    },

    i18n: {
        localeFiles: "./src/locale",
        default: "en"
    },

    rpc: {
        enabled: false
    },

    view: {
        extractInlineScript: true,
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
            { rel: "dns-prefetch", href: "https://.docs.cmmv.io" },
            { rel: "preconnect", href: "https://.docs.cmmv.io" },     
            { rel: "preconnect", href: "https://cdnjs.cloudflare.com", crossorigin: "" },
            { rel: "preconnect", href: "https://cdn.tailwindcss.com", crossorigin: "" },
            { rel: "preconnect", href: "https://code.jquery.com", crossorigin: "" },              
            { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" },
            { rel: "stylesheet", href: "/assets/tailwind.min.css" },   
            { rel: "stylesheet", href: "/assets/docs.css" }            
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
            "font-src 'self' https://cdnjs.cloudflare.com"
        ]
    },

    scripts: [
        { type: "text/javascript", src: "/assets/bundle.min.js", defer: "defer" },
    ]
};