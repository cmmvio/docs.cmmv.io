module.exports = {
    apps: [
        {
            name: "docs",
            script: "pnpm run start",
            env: {
                DOCS_LANG: "en",
                PORT: 3000 
            }
        }
    ]
};
