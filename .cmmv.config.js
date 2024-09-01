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
            { rel: 'icon', href: 'assets/favicon/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/favicon/favicon-16x16.png' },
            { rel: 'manifest', href: 'assets/favicon/site.webmanifest' },
            { rel: "dns-prefetch", href: "https://.docs.cmmv.io" },
            { rel: "preconnect", href: "https://.docs.cmmv.io" },     
            { rel: "preconnect", href: "https://cdnjs.cloudflare.com", crossorigin: "" },
            { rel: "preconnect", href: "https://cdn.tailwindcss.com", crossorigin: "" },
            { rel: "preconnect", href: "https://code.jquery.com", crossorigin: "" },       
            { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/vs2015.min.css" },       
            { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" },
            { rel: "stylesheet", href: "/assets/tailwind.min.css" },   
            { rel: "stylesheet", href: "/assets/docs.css" }            
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
            "font-src 'self' https://cdnjs.cloudflare.com"
        ]
    },

    scripts: [
        { type: "text/javascript", src: 'https://code.jquery.com/jquery-3.6.1.min.js'},
        { type: "text/javascript", src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js' }
    ]
};