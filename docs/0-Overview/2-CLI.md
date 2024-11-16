# CLI

The CMMV CLI simplifies project initialization by providing an interactive way to create a new project with customizable configurations. Below is the updated documentation for using the CLI to generate a CMMV project.

## Getting Started

Install the CLI Globally: To use the CLI globally on your system, install it using ``pnpm``:

```bash 
pnpm add -g cmmv-cli
```

Create a New Project: Run the ``cmmv init`` command to create a new project:

```bash
cmmv init <project-name>
```

This will start an interactive prompt asking for your project preferences, such as:

* Whether to enable Vite Middleware
* Use RPC (WebSocket)
* Enable the Cache module
* Select the repository type (SQLite, MongoDB, PostgreSQL, MySQL)
* Choose the View configuration (Reactivity, Vue3, or Vue3 + TailwindCSS)
* Enable ESLint, Prettier, and Vitest

## Using ``pnpm dlx``

If you don't want to install the CLI globally, use ``pnpm dlx`` to execute it directly:

```bash
pnpm dlx cmmv@latest init <project-name>
```

This ensures you always use the latest version of the CLI without requiring a global installation.

## Generated Project Structure

The CLI generates a structured project folder with necessary files and directories based on your preferences. Below is an example structure:

```
.
├── public/
│   ├── assets/
│   │   └── protobuf.min.js (if RPC is enabled)
│   ├── core/
│   ├── templates/
│   └── views/
├── src/
│   ├── contracts/
│   ├── controllers/
│   ├── entities/
│   ├── models/
│   ├── modules/
│   ├── services/
│   ├── locale/
│   ├── app.module.ts
│   ├── server.ts
│   └── client.ts (if Vite is enabled)
├── node_modules/
├── index.html (if Vite is enabled)
├── tailwind.config.js (if TailwindCSS is enabled)
├── tsconfig.json
├── tsconfig.client.json (if Vite is enabled)
├── tsconfig.vue.json (if Vue3 or Vue3 + TailwindCSS is enabled)
├── tsconfig.server.json
├── vite.config.js (if Vite is enabled)
├── vitest.config.ts (if Vitest is enabled)
├── .cmmv.config.js
├── package.json
├── .gitignore
└── ...
```

**Generated Configuration Files**
* ``.cmmv.config.js``: Central configuration for the CMMV application.
* ``package.json``: Includes necessary dependencies and scripts based on your selected options.
* ``tsconfig.json``: References for TypeScript configurations.
* ``.gitignore``, ``.npmignore``, ``.prettierignore``, ``.prettierrc``, ``.swcrc``: Pre-configured files for development standards.
* ``vite.config.js``: Vite configuration (if enabled).
* ``tailwind.config.js`` and ``src/tailwind.css``: TailwindCSS configuration (if enabled).

## Available Scripts

Development Mode:

```bash
pnpm dev
```

Build for Production:

```bash
pnpm build
```

Start Production Server:

```bash
pnpm start
```

Run Tests (if Vitest is enabled):

```bash
pnpm test
```