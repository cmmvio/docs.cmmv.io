module.exports = {
    apps: [
        {
            name: "docs-en",
            script: "pnpm run start",
            env: {
                DOCS_LANG: "en",
                PORT: 3000 
            }
        },
        {
            name: "docs-ptbr",
            script: "pnpm run start",
            env: {
                DOCS_LANG: "ptbr",
                PORT: 3001
            }
        }
    ]
};
