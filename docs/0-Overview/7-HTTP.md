# HTTP Overview

The CMMV framework comes with built-in support for both Express and Fastify as HTTP adapters. However, the system allows for custom HTTP adapters by implementing the AbstractHttpAdapter class. This makes it possible to integrate other web frameworks or HTTP libraries with the same consistency and features provided by the default adapters. Developers can extend and customize their server architecture based on their requirements while maintaining the structure and benefits of the CMMV ecosystem.

The ExpressAdapter in CMMV provides an abstraction over the Express.js framework, enabling seamless integration with the CMMV ecosystem. This adapter includes features such as request compression, session management, custom headers, and middleware. Below are the key functionalities implemented:

Key Features:
* **HTTP and HTTPS Support:** The adapter can initialize servers using both HTTP and HTTPS based on configuration.
* **Middleware Management:** Preconfigured middlewares such as compression, CORS, Helmet (security), and session handling are included.
* **Static File Serving:** Automatically serves static files from the /public directory.
* **View Engine:** Supports rendering HTML views using CMMVRenderer, a custom template engine with security options like CSP.
* **Controller Registration:** Automatically registers controllers by scanning the ControllerRegistry and mapping HTTP methods (GET, POST, PUT, DELETE) to paths.
* **Session and Security Headers:** Adds session management using express-session and security headers like Content Security Policy, XSS Protection, and HSTS.
* **Request Tracking:** Each request is assigned a unique requestId for telemetry and monitoring.
* **Open Connection Tracking:** Tracks and closes open connections when the server shuts down.
* **Error Handling:** Captures and logs errors during request processing, providing detailed error messages.

## Dependences 

The modules used for the Express adapter in your code include:

* **express:** Core framework for handling HTTP requests.
* **body-parser:** Middleware for parsing incoming request bodies.
* **compression:** Middleware for compressing response bodies.
* **cors:** Middleware to enable Cross-Origin Resource Sharing.
* **express-session:** Middleware for managing sessions.
* **helmet:** Middleware for securing Express apps by setting HTTP headers.
* **uuid:** Utility for generating unique request IDs.

## Initialization

To use the ExpressAdapter:

```typescript
import { ExpressAdapter } from '@cmmv/http';
import { Application } from '@cmmv/core';

Application.create({
    httpAdapter: ExpressAdapter,
    modules: [YourModule]
});
```

The adapter registers all controllers automatically from the ControllerRegistry. It matches the controller’s routes to the corresponding HTTP methods (GET, POST, etc.), and processes middleware defined at the controller level.

## Fastify

The Fastify Adapter in CMMV provides an alternative to the Express Adapter, allowing for lightweight, high-performance HTTP handling using Fastify's framework. This adapter integrates key middleware like compression, CORS, helmet for security, and static file serving. It automatically registers controllers and manages the lifecycle of incoming requests. The Fastify Adapter follows the same structure as the Express Adapter, supporting session management and content rendering, while offering a faster, more optimized environment.

Both Express and Fastify adapters are natively supported, and custom HTTP adapters can be created by extending the AbstractHttpAdapter.

## Middlewares

The httpMiddlewares configuration allows you to inject custom middleware into the HTTP adapter (such as Express or Fastify) during the application's initialization. This provides additional flexibility by letting you apply any middleware functions to handle tasks like logging, request validation, or security checks.

To use this feature, define an array of middleware functions in the httpMiddlewares property when creating the application.

Here’s an example where we add the morgan logging middleware to an Express-based CMMV application:

```typescript
import { Application } from "@cmmv/core";
import { ExpressAdapter, ExpressModule } from "@cmmv/http";
import { ViewModule } from "@cmmv/view";
import morgan from "morgan";

Application.create({
    httpAdapter: ExpressAdapter,
    httpMiddlewares: [
        morgan('dev'), 
    ],
    modules: [ 
        ExpressModule,
        ViewModule
    ]
});
```

In this example, the morgan middleware is used to log incoming HTTP requests in the 'dev' format. This middleware is passed into the httpMiddlewares configuration, which applies it automatically during the application's initialization.

* The httpMiddlewares array can include any number of middlewares, and each will be applied in the order they are provided.
* Make sure to import any custom middleware before passing it into the configuration.

This configuration helps expand the capabilities of your application by allowing you to use any custom or third-party middleware that your chosen HTTP adapter (like Express or Fastify) supports.