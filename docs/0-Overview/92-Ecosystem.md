# Ecosystem

CMMV offers a range of plugins to complement applications, providing additional and optimized features for various needs. These plugins extend the framework's capabilities by integrating communication, storage, caching, and more in a native and well-integrated manner. Below is a list of available plugins at the moment:

| Plugin                 | Description                                                                                       |
|------------------------|---------------------------------------------------------------------------------------------------|
| [@cmmv/core](https://github.com/andrehrferreira/cmmv/tree/main/packages/core)             | Core module providing the foundation for building applications, managing modules, services, and contracts. |
| [@cmmv/http](https://github.com/andrehrferreira/cmmv/tree/main/packages/http)            | HTTP server management module with support for multiple HTTP adapters, including default, Express, and Fastify. |
| [@cmmv/protobuf](https://github.com/andrehrferreira/cmmv/tree/main/packages/protobuf)         | Provides Protobuf support for serialization and deserialization, optimizing binary communication.  |
| [@cmmv/ws](https://github.com/andrehrferreira/cmmv/tree/main/packages/ws)               | Native WebSocket support for real-time communication between the client and server.               |
| [@cmmv/auth](https://github.com/andrehrferreira/cmmv/tree/main/packages/auth)             | Handles user authentication and authorization, managing security and access control.              |
| [@cmmv/cache](https://github.com/andrehrferreira/cmmv/tree/main/packages/cache)            | Caching module to optimize performance by storing temporary data for quick access.                |
| [@cmmv/queue](https://github.com/andrehrferreira/cmmv/tree/main/packages/queue)            | Manages job queues and background processing tasks to help improve application performance.        |
| [@cmmv/repository](https://github.com/andrehrferreira/cmmv/tree/main/packages/repository)       | Database management with repositories for handling entities and persistent data access.           |
| [@cmmv/scheduling](https://github.com/andrehrferreira/cmmv/tree/main/packages/scheduling)       | Module for scheduling tasks and automating routines with task management support.                 |
| [@cmmv/view](https://github.com/andrehrferreira/cmmv/tree/main/packages/view)             | Server-Side Rendering (SSR) engine for rendering views, including its own template engine.         |
| [@cmmv/reactivity](https://github.com/andrehrferreira/cmmv-reactivity)       | Enables reactive data binding and management to create more dynamic applications.                 |
| [@cmmv/server](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/server)           | Default HTTP server for high-performance applications, providing more control over server features. |
| [@cmmv/server-static](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/server-static)    | Serves static files from the file system, enabling faster delivery of assets like HTML, CSS, and JS. |
| [@cmmv/body-parser](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/body-parser)      | Middleware for parsing incoming request bodies, including support for JSON and URL-encoded payloads. |
| [@cmmv/compression](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/compression)      | Compression middleware to reduce the size of the response body and improve application performance. |
| [@cmmv/cookie-parser](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/cookie-parser)    | Parses cookies in requests, making it easier to manage session and user data via cookies.         |
| [@cmmv/cors](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/cors)             | Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing secure cross-origin requests. |
| [@cmmv/etag](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/etag)             | ETag generation for response caching, improving efficiency by validating cached responses.        |
| [@cmmv/helmet](https://github.com/andrehrferreira/cmmv-server/tree/main/packages/helmet)           | Security middleware to help protect applications by setting various HTTP headers.                 |
| [@cmmv/swagger](https://github.com/andrehrferreira/cmmv-swagger)          | Provides API documentation with Swagger integration, automatically generating OpenAPI specifications. |
| [@cmmv/plugin-vite](https://github.com/andrehrferreira/cmmv-swagger)          | Enables Vite to interpret ``.cmmv`` files, similar to how Vue files are processed, with full support for CMMV syntax. |
