# Singleton

In CMMV, dependency injection was replaced with singleton registries to simplify global services management. In typical dependency injection, you must declare all necessary providers for each module. However, in real-world applications, many modules share common services like cache, queues, or databases. Using singletons allows these services to be instantiated once and accessed globally throughout the application. This reduces complexity, prevents circular dependencies, and ensures a single instance manages its state. Here's an example of a globally scoped singleton class implementation:

```typescript
import { Singleton } from "@cmmv/core";

export class Scope extends Singleton {
    private data: Map<string, any> = new Map();

    public static set(name: string, data: any): boolean {
        const scope = Scope.getInstance();

        if (!scope.data.has(name)) {
            scope.data.set(name, data);
            return true;
        }

        return false;
    }

    public static has(name: string): boolean {
        const scope = Scope.getInstance();
        return scope.data.has(name);
    }

    public static get<T = any>(name: string): T | null {
        const scope = Scope.getInstance();
        return scope.data.has(name) ? (scope.data.get(name) as T) : null;
    }

    public static clear(name: string): void {
        const scope = Scope.getInstance();
        scope.data.delete(name);
    }

    public static addToArray<T = any>(name: string, value: T): boolean {
        const scope = Scope.getInstance();
        const array = scope.data.get(name) || [];
        
        if (Array.isArray(array)) {
            array.push(value);
            scope.data.set(name, array);
            return true;
        }

        return false;
    }

    public static removeFromArray<T = any>(name: string, value: T): boolean {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);
        
        if (Array.isArray(array)) {
            const index = array.indexOf(value);

            if (index > -1) {
                array.splice(index, 1);
                scope.data.set(name, array);
                return true;
            }
        }

        return false;
    }

    public static getArray<T = any>(name: string): T[] | null {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);

        if (Array.isArray(array)) 
            return array as T[];
        
        return null;
    }

    public static getArrayFromIndex<T = any>(name: string, index: number): T | null {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);

        if (Array.isArray(array) && array.length >= index) 
            return array[index] as T;
        
        return null;
    }
}
```

In my opinion, using the singleton pattern over NestJS-style dependency injection offers several advantages, particularly for larger applications with many controllers and providers.

**Performance:** Singleton instances are created once and reused, reducing the overhead of instantiating services multiple times, which can slow down bootstrapping in NestJS as it resolves dependencies.

**Simplified Design:** Global services are readily accessible without requiring explicit injection, minimizing complexity in managing common services (like cache, queues, or databases) across modules.

**Avoid Circular Dependencies:** Singletons naturally avoid circular dependency issues because they manage their lifecycle independently, whereas dependency injection systems might struggle when multiple services depend on each other.

**Scalability:** As the application grows, using singleton registries streamlines service management. NestJS requires defining global providers or importing modules, which can complicate application scaling and make maintaining a long dependency chain more cumbersome.

In summary, while both approaches have their pros and cons, the singleton model can offer more performance and simplicity, especially for larger, production-heavy applications.