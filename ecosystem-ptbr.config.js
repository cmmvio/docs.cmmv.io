module.exports = {
    apps: [
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
