# Introduction

CMMV (Contract-Model-Model-View) is a minimalistic framework designed to streamline the development of scalable and modular applications using TypeScript. By combining the power of contracts with a modular architecture, CMMV allows developers to define their entire application structure, from ORM entities to REST controllers and WebSocket endpoints, in a clear and maintainable way.

The project is divided into two main components:

1. **Core System**: The heart of CMMV, written in TypeScript and running on Node.js, is responsible for managing contracts, generating code, integrating with databases, and handling server-side operations. This component handles everything from parsing and code generation to integration with external services like cloud servers and databases.

3. **Backend**: The CMMV backend is inspired by NestJS in terms of structure and organization, using a similar format of decorators, services, controllers, and other architectural patterns. This allows for a familiar development experience for those who already use NestJS, making it easier to create scalable and organized applications with a modular and object-oriented approach. Some implementations are quite different, especially when it comes to context and the need for dependency injection.

2. **Frontend**: CMMV utilizes its own reactivity system, inspired by Vue 3 as the base framework. However, in the future, support for other frameworks such as React, Angular, and Vue will be available, even though their use is not recommended due to potential performance reduction and SEO issues. This approach simplifies the process of creating, managing, and deploying applications while offering optimal performance.

CMMV draws inspiration from a wide range of technologies and concepts, blending ideas from game development (e.g., Unreal Engine's Blueprints), component-based architectures (e.g., Delphi), and modern web development practices. It challenges traditional paradigms of web and application development, aiming to make the creation of complex systems as intuitive as possible.

This project reflects over 20 years of experience in different languages and frameworks, with influences from Delphi, Unity, Unreal, C#, C++, JavaScript, Node.js, TypeScript, VSCode.

We hope you find CMMV as exciting and powerful as we do. It's the culmination of nearly a decade of work and passion for simplifying and improving the development process.

André Ferreira (CEO)