module.exports = {
    apps: [
        {
            name: "docs",
            script: "pnpm start",
            env: {
                DOCS_LANG: "en",
                PORT: 3000
            }
        }
    ]
};
