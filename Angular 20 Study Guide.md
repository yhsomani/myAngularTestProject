# Angular 20 Study Guide

This guide provides a comprehensive review of key concepts in Angular 20, based on the provided sources. It includes a quiz to test your understanding, essay questions for deeper thought, and a detailed glossary of essential terms.

## Quiz: Short-Answer Questions

Answer each of the following questions in 2-3 sentences, based on the provided context.

1.  What are the primary advantages of using Standalone Components over the traditional NgModule system in Angular 20?
2.  Explain the purpose of the mandatory `track` expression in the new `@for` control flow syntax.
3.  What are the three main functions for working with Signals, and what is the role of each?
4.  Describe the primary purpose of a Route Guard, using the `canActivate` function as an example.
5.  What is Incremental Hydration, and how does it improve performance compared to the old hydration method?
6.  In the "Smart/Dumb" component pattern, what defines a "Dumb" (or Presentational) component?
7.  Using the analogy from the text, explain the concept of Dependency Injection (DI) in Angular.
8.  What problem does the `toSignal()` function solve when working with data from Angular's `HttpClient`?
9.  How does Angular's built-in Cross-Site Scripting (XSS) protection work by default?
10. What is the key performance advantage of a modern test runner like Vitest compared to the classic Karma setup?

## Answer Key

1.  **What are the primary advantages of using Standalone Components over the traditional NgModule system in Angular 20?**
    Standalone Components are superior to NgModules because they reduce "boilerplate" code by eliminating the need for separate `NgModule` files. They make dependencies clearer since everything a component needs is imported directly within its file, which also simplifies lazy loading and makes the framework easier for beginners to learn.

2.  **Explain the purpose of the mandatory track expression in the new @for control flow syntax.**
    The `track` expression is mandatory because it provides a unique identifier, like a "name tag," for each item in a list. When the list changes, Angular uses this `track` value to identify which items have moved, been added, or been removed, allowing it to move existing DOM elements instead of destroying and recreating them. This results in much better performance and efficiency.

3.  **What are the three main functions for working with Signals, and what is the role of each?**
    The three main Signal functions are `signal()`, `computed()`, and `effect()`. `signal()` creates a writable container for a value; `computed()` creates a read-only signal that derives its value from other signals (like a spreadsheet formula); and `effect()` runs a side-effect (like logging) whenever a signal it depends on changes.

4.  **Describe the primary purpose of a Route Guard, using the canActivate function as an example.**
    A Route Guard is a check that runs before a route is loaded to determine if a user can access it, acting like a "bouncer at a club." The `canActivate` guard, for example, can check if a user is logged in and has the correct permissions (e.g., is an admin); if the conditions are not met, it can redirect the user to another page, such as a login screen.

5.  **What is Incremental Hydration, and how does it improve performance compared to the old hydration method?**
    Incremental Hydration is a feature that makes server-rendered pages interactive in pieces, rather than all at once. It prioritizes "waking up" components that are in the user's viewport or that the user interacts with first, improving the Time to Interactive (TTI) score and making the application feel responsive much sooner.

6.  **In the "Smart/Dumb" component pattern, what defines a "Dumb" (or Presentational) component?**
    A "Dumb" component is a worker component that does not inject services or fetch its own data. Its sole responsibilities are to display data that is passed down to it via `@Input()` properties and to emit events up to a parent component using `@Output()`. This makes them simple, predictable, and highly reusable.

7.  **Using the analogy from the text, explain the concept of Dependency Injection (DI) in Angular.**
    Dependency Injection is like having a pizza delivery service on speed dial. Instead of a component building its own services (like making a pizza from scratch), it simply declares what it needs in its constructor. The Angular Injector system then automatically "delivers" the single, shared instance of that service to the component.

8.  **What problem does the toSignal() function solve when working with data from Angular's HttpClient?**
    The `HttpClient` returns data as an RxJS Observable, which requires manual subscription management to avoid memory leaks. The `toSignal()` function solves this by converting the Observable stream into a Signal, which automatically handles the subscription and unsubscription process, making the code safer, cleaner, and easier to use in templates.

9.  **How does Angular's built-in Cross-Site Scripting (XSS) protection work by default?**
    Angular's built-in XSS protection works by automatically sanitizing all data bound with interpolation (`{{ }}`). This process treats potentially malicious code, like a `<script>` tag, as plain text to be displayed to the user rather than as code to be executed by the browser.

10. **What is the key performance advantage of a modern test runner like Vitest compared to the classic Karma setup?**
    The key advantage of Vitest is its speed. Unlike Karma, which must boot up a full browser to run tests, Vitest runs tests in Node.js using a simulated browser environment called `jsdom`. This allows tests to start almost instantly, dramatically speeding up the development feedback loop.

## Essay Questions

The following questions are designed to encourage a deeper synthesis of the concepts. Answers are not provided.

1.  Discuss the evolution of Angular's architecture from an `NgModule`-centric model to the "standalone-first" world of Angular 20. How has this fundamental shift impacted code organization, lazy loading strategies, and the overall developer experience?
2.  Explain Angular's modern approach to reactivity, comparing the classic RxJS model (Observables) with the new Signals-based model. Describe how tools like `toSignal()` bridge the gap between these two paradigms and what the "golden rule" is for choosing between them in a component.
3.  Detail the key performance optimization strategies available in a modern Angular 20 application. Your answer should cover the roles and benefits of Change Detection strategies (`OnPush`), Server-Side Rendering (SSR) with Incremental Hydration, and component-level lazy loading.
4.  Describe the complete lifecycle of fetching and displaying data from a server in an Angular 20 application. Your explanation should trace the process from a user action in a "Smart Component," through a Service using `HttpClient`, the role of Observables, the conversion to a Signal, and finally rendering in a "Dumb Component's" template, including how loading and empty states are handled.
5.  You are tasked with upgrading an older Angular 17 application to Angular 20. Outline the process, the specific Angular CLI commands you would use, and the common pitfalls to avoid. Pay special attention to migrating deprecated APIs (like `*ngIf`) and managing third-party library compatibility.

## Glossary of Key Terms

| Term | Definition |
| --- | --- |
| `@for` | The new, built-in control flow syntax for looping over a list in a template. It replaces `*ngFor` and requires a mandatory `track` expression for performance. |
| `@if` | The new, built-in control flow syntax for conditional logic in a template, replacing `*ngIf`. It supports `@else` and `@else if` blocks. |
| `@Input()` | A decorator that marks a component property as an "input," allowing a parent component to pass data down to it. |
| `@Output()` | A decorator used with an `EventEmitter` that allows a child component to send events and data up to its parent component. |
| `@switch` | The new, built-in control flow syntax for multi-condition logic based on a single variable's state, replacing `*ngSwitch`. |
| `Angular CLI` | The Command Line Interface for Angular. It is a tool used to create projects, generate components, run tests, and manage builds. |
| `Angular DevTools` | A browser extension for Chrome and Firefox that allows developers to inspect the component tree, view component state (including Signals), and profile application performance. |
| `Angular Material` | The official UI component library from the Angular team, providing a set of pre-built, accessible, and high-quality components that implement Google's Material Design. |
| `Change Detection` | The core Angular mechanism for synchronizing the application's data with its view. The `OnPush` strategy is a performance-optimized mode that limits when a component is checked for changes. |
| `Component` | The fundamental building block of an Angular application. Each component consists of a TypeScript class (logic), an HTML template (view), and optional CSS styles. |
| `computed()` | A function that creates a read-only Signal whose value is derived from other Signals. It automatically re-calculates its value only when its dependencies change. |
| `Content Projection` | A pattern using the `<ng-content>` tag that allows a parent component to insert, or "project," HTML content into a designated "slot" within a child component's template. |
| `CSRF` | Cross-Site Request Forgery. A type of attack where a malicious site causes a user's browser to perform an unwanted action on a trusted site where the user is authenticated. Angular's `HttpClient` has built-in protections. |
| `Dependency Injection (DI)`| A core design pattern in Angular where components "declare" their dependencies (like services) in their constructor, and the framework automatically provides, or "injects," the required instances. |
| `Directive` | An instruction in the template that changes the appearance or behavior of a DOM element. Includes structural directives (`@if`, `@for`) and attribute directives (`[ngClass]`, `[ngStyle]`). |
| `effect()` | A function that schedules a side-effect to run whenever any of the Signals used inside it change. It is used for tasks like logging or saving to `localStorage`, not for changing other state. |
| `Hydration` | The process of "waking up" a server-rendered HTML page in the browser, making it interactive by attaching Angular's event listeners and state. |
| `HttpClient` | Angular's built-in service for making network requests to a server. It returns RxJS Observables. |
| `Incremental Hydration` | An advanced feature in Angular 20 where a server-rendered page is hydrated in pieces, prioritizing components in the user's viewport to improve the Time to Interactive (TTI). |
| `Interceptor` | A special type of service that can intercept every outgoing HTTP request and incoming response, useful for tasks like adding authentication tokens or handling global errors. |
| `Lazy Loading` | A performance optimization technique where the code for a route's component is not downloaded until the user navigates to that route, keeping the initial application bundle size small. |
| `Lifecycle Hooks` | Methods on a component class that Angular calls at specific moments in a component's lifecycle, such as `ngOnInit()` (creation), `ngOnChanges()` (input change), and `ngOnDestroy()` (destruction). |
| `Micro-frontends (MFEs)` | An architectural pattern where a large web application is split into smaller, independent applications (the "micro-frontends") that are loaded into a main "shell" application. |
| `Monorepo` | A software development strategy where code for multiple projects (e.g., several apps and shared libraries) is stored in a single Git repository. Tools like Nx help manage this. |
| `NgModule` | The "old way" of organizing Angular applications. It was a class that acted as a container or "box" to declare components and manage dependencies for a section of an application. |
| `Pipe` | A simple way to transform and format data directly in the HTML template, using the `|` character (e.g., `{{ myDate | date:'short' }}`). |
| `PWA` | Progressive Web App. A web application that can be installed on a user's device, work offline, and behave like a native application, enabled in Angular via the `@angular/pwa` package. |
| `Reactive Forms` | An Angular module for building forms where the form model (the "source of truth") is defined and managed in the TypeScript code. It is the preferred method for complex forms. |
| `Route Guard` | A function that runs before a route is activated to determine if navigation is allowed, commonly used for authentication and authorization checks. |
| `Service` | A TypeScript class with a focused purpose (e.g., fetching data) that can be shared across multiple components via Dependency Injection. |
| `Signals` | Angular's modern, built-in reactivity system. A Signal is a wrapper around a value that can notify interested consumers when that value changes, simplifying state management. |
| `SSR` | Server-Side Rendering. The process of rendering an Angular application's pages on a server and sending fully formed HTML to the browser, which improves initial load performance and SEO. |
| `Standalone Component` | The modern and default way to create components in Angular. A standalone component manages its own dependencies directly in its `@Component` decorator, eliminating the need for `NgModules`. |
| `TestBed` | Angular's primary testing utility. It creates a special, dynamically constructed module to provide and configure services and components during unit tests. |
| `toSignal()` | A utility function from `@angular/core/rxjs-interop` that converts an RxJS Observable into a Signal, automatically managing the subscription and unsubscription process. |
| `Vitest` | A modern, fast test runner that is now supported by the Angular CLI. It gains its speed by running tests in a simulated browser environment within Node.js. |
| `XSS` | Cross-Site Scripting. A security vulnerability where an attacker injects malicious scripts into a website. Angular provides protection by default through automatic data sanitization. |
| `zoneless` | A future direction for Angular that involves removing the `zone.js` dependency. In a zoneless application, change detection is triggered primarily by Signals, leading to more precise and performant updates. |