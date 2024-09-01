module.exports = {
    server: {
        host: "0.0.0.0",
        port: 3000
    },

    i18n: {
        localeFiles: "./src/locale",
        default: "en"
    },

    head: {
        title: "Documentation | CMMV - A progressive Node.js framework",
        htmlAttrs: {
            lang: "pt-br"
        },
        meta: [
            { charset: 'utf-8' },
            { "http-equiv": "content-type", content: "text/html; charset=UTF-8" },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'icon', href: 'assets/favicon/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/favicon/favicon-16x16.png' },
            { rel: 'manifest', href: 'assets/favicon/site.webmanifest' },
            { rel: "dns-prefetch", href: "https://.docs.cmmv.io" },
            { rel: "preconnect", href: "https://.docs.cmmv.io" },     
        ]
    },

    scripts: [
        { type: "text/javascript", src: '/assets/bundle.min.js', body: true }
    ]
};