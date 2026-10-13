# Playwright UI Testing Framework

This project is a Playwright UI Testing Framework, written in TypeScript and using a Page Component Object Model pattern.

The project is setup so that:

- Page classes contain all the locators and methods for a given page
- Component classes contain generic methods for shared components, like data grids, modals etc.
- Test files contain the actual test cases, and use the page classes to interact with the UI
- Utility files contain shared methods, like login steps, or accessibility scanning

The project is setup to be as robust and maintainable as possible, with best practices for writing tests, using Playwright and TypeScript.

## Table of Contents

- [Playwright UI Testing Framework](#playwright-ui-testing-framework)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [TypeScript](#typescript)
    - [Playwright](#playwright)
  - [Project Structure](#project-structure)
  - [Project Best Practices](#project-best-practices)
    - [Page Component Object Model](#page-component-object-model)
      - [Pages](#pages)
      - [Locators](#locators)
      - [Components](#components)
      - [Methods](#methods)
      - [Utilities](#utilities)
    - [Test Best Practices](#test-best-practices)
      - [Assertions](#assertions)
      - [Robustness](#robustness)
    - [Blazor-Specific Considerations](#blazor-specific-considerations)
      - [Blazor Server](#blazor-server)
      - [Blazor WebAssembly (WASM)](#blazor-webassembly-wasm)
      - [Approaches](#approaches)
    - [Automated Testing Principles](#automated-testing-principles)
    - [File Naming](#file-naming)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Clone the Repo](#clone-the-repo)
    - [Environment Files](#environment-files)
      - [CLI](#cli)
      - [VS Code Extension](#vs-code-extension)
    - [Installation](#installation)
  - [ESLint](#eslint)
    - [Rule List](#rule-list)
    - [Disabling Rules](#disabling-rules)
    - [Fixing ESLint Issues](#fixing-eslint-issues)
  - [Using Playwright](#using-playwright)
    - [CLI](#cli-1)
    - [VS Code Extension](#vs-code-extension-1)
    - [Playwright CRX Chrome Extension](#playwright-crx-chrome-extension)
  - [Creating Pages and Tests](#creating-pages-and-tests)
    - [Pages](#pages-1)
      - [Locators](#locators-1)
      - [Methods](#methods-1)
      - [Page Class Content](#page-class-content)
    - [Tests](#tests)
      - [Functional Tests](#functional-tests)
      - [Accessibility Tests](#accessibility-tests)
        - [Internal Accessibility Tests](#internal-accessibility-tests)
        - [Accessibility Statements](#accessibility-statements)
      - [Additional Test Types](#additional-test-types)
  - [Running \& Debugging Tests](#running--debugging-tests)
    - [Running](#running)
    - [Test Targeting](#test-targeting)
      - [Deployed Sites](#deployed-sites)
      - [Local Sites](#local-sites)
    - [Debugging](#debugging)
      - [VS Test Runner](#vs-test-runner)
      - [CLI Debugging](#cli-debugging)
      - [Logging](#logging)
  - [Test Setup \& Fixtures](#test-setup--fixtures)
    - [Global Setup \& Teardown](#global-setup--teardown)
      - [Setup Steps](#setup-steps)
      - [Teardown Steps](#teardown-steps)
    - [Fixtures](#fixtures)
      - [Built-in Fixtures](#built-in-fixtures)
      - [Custom Fixtures](#custom-fixtures)
      - [Extending Fixtures with Parameters](#extending-fixtures-with-parameters)
  - [Configuration](#configuration)
  - [CI/CD Tests](#cicd-tests)
    - [Common-Template](#common-template)
    - [Directly in a Test Stage](#directly-in-a-test-stage)
    - [Secrets \& Environment Variables](#secrets--environment-variables)
  - [Azure Playwright Testing](#azure-playwright-testing)
    - [Connection](#connection)
    - [Access](#access)
    - [Reports](#reports)
    - [Devices](#devices)
  - [Summary \& References](#summary--references)
    - [TypeScript](#typescript-1)
    - [Playwright](#playwright-1)
    - [Videos](#videos)
    - [Accessibility](#accessibility)
    - [Other](#other)

## Overview

### TypeScript

Playwright can be integrated with the following languages:

- TypeScript using Node.js
- C# using .NET
- Java using the JVM
- Python using Python

When deciding on a language for the framework, we chose TypeScript for a number of reasons:

- It's the primary language supported by Playwright, so has the best support and documentation
- It's a superset of JavaScript, meaning all valid TypeScript is valid JavaScript, so is easy to learn for anyone with JavaScript experience i.e. Postman
- Uses the `npx playwright` command to run tests, rather than the `dotnet test`  or `pwsh bin/Debug/net8.0/playwright.ps1 show-report` commands for C#, and more easily takes arguments
- Allows us to use the Playwright `expect` assertion methods, which are more modern and robust than the `Assert` methods in NUnit

Without delving too deep into TypeScript, here are some key points:

- TypeScript is a statically typed language, meaning you have to define the types of variables, parameters, and return values:

``` ts
let myString: string = 'Hello World'; // Define a variable myString of type string
let myNumber: number = 42; // Define a variable myNumber of type number
let myBoolean: boolean = true; // Define a variable myBoolean of type boolean
```

- TypeScript has interfaces, which are like classes but without any implementation, and are used to define the shape of an object:

``` ts
interface Person {
    name: string;
    age: number;
    isAlive: boolean;
}
```

- We also define return types for methods, which are the type of value the method will return:

``` ts
function add(a: number, b: number): number { // Define a function add which takes two numbers and returns a number
    return a + b; // Return the sum of a and b
}
```

- TypeScript has classes, which are like classes in other languages, and are used to define objects with properties and methods:

``` ts
class Person {
    name: string; // Define a property name of type string
    age: number; // Define a property age of type number
    isAlive: boolean; // Define a property isAlive of type boolean

    constructor(name: string, age: number, isAlive: boolean) { // Define a constructor which takes three parameters
        this.name = name; // Set the name property to the name parameter
        this.age = age; // Set the age property to the age parameter
        this.isAlive = isAlive; // Set the isAlive property to the isAlive parameter
    }

    sayHello(): void { // Define a method sayHello which takes no parameters and returns nothing
        console.log(`Hello, my name is ${this.name}`); // Log a message to the console
    }
}
```

- TypeScript can also take advantage of linting, which is a way of enforcing best practices and catching errors before they happen. More on this later.

``` ts

- TypeScript has modules, which are used to split code into separate files, and are imported and exported using the `import` and `export` keywords:

Importing a module:

``` ts
import { Person } from './pages/person'; // Import the Person interface from the person module
```

Exporting a module:

``` ts
export interface Person { // Export the Person interface
    name: string;
    age: number;
    isAlive: boolean;
}
```

These can also be organised through an `index.ts` file:

``` ts
export * from './person'; // Export everything from the person module
export * as Organisation from './organisation'; // Export everything from the organisation module as Organisation, overriding the name
```

which allows us to import them in a more concise way:

``` ts
import { Person, Organisation } from './pages'; // Import the Person and Organisation interfaces from the pages module
```

Further reading on TypeScript can be found at:

- [TypeScript Documentation](https://www.TypeScriptlang.org/docs/)
- [TypeScript Handbook](https://www.TypeScriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.TypeScriptlang.org/play)

### Playwright

Playwright is a framework for web testing and browser automation created by Microsoft. It allows you to write tests in TypeScript, Java, Python or C#, and run them in Chromium (including Chrome and Edge), Firefox and WebKit.

Playwright is similar to Selenium, but has a number of advantages (over the current Selenium framework):

- Uses a more modern and robust automation API which use 'web-first' assertions against things like roles, text, labels etc rather than relying solely on ids, classes and xpaths
- Runs in parallel by default (using workers), so tests are faster
- Can more easily interact with other areas of the browser, like the network, storage, and service workers
- Can run in a UI debug mode which allows you to see the browser and interact with it as the test runs
- To debug issues, can store traces of the test runs with screenshots, network logs etc
- Can share browser state between tests, so you can login once and then run multiple tests without logging in again

For more info on Playwright see:

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repo](https://github.com/microsoft/playwright)
- [Playwright DevDocs](https://devdocs.io/playwright/)
- [Microsoft Learn - Playwright](https://learn.microsoft.com/en-us/training/modules/build-with-playwright/)
- [Playwright Blog](https://dev.to/playwright)
- [Checkly Playwright Blog](https://www.checklyhq.com/learn/playwright/what-is-playwright/)

And for learning videos there are:

- [Official Playwright Channel](https://www.youtube.com/@Playwrightdev)
- [Microsoft Playwright Introduction](https://www.youtube.com/watch?v=1yaqKDHhktI&pp=ygUUcGxheXdyaWdodCBtaWNyb3NvZnQ%3D)
- [Commit Quality Playwright Playlist](https://www.youtube.com/playlist?list=PLXgRgGX8-5UVm9yioRY329rfcfy3MusiY)
- [Checkly Playwright Playlist](https://www.youtube.com/watch?v=OFoF-QTCRs0&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc)

## Project Structure

Here's an outline of the project structure (with a non-exhaustive list of files):

``` folder
ui-tests                                            # Separate test code from the rest of the repo
|                          
|── components                         
│   ├── TopNav.component.ts                         # Utility for the top navigation
│   └── SidebarNav.component.ts                     # Utility for the sidebar
|── fixtures                         
│   ├── cardholder-navigations.fixture.ts           # The test fixture (intial steps) used for all cardholder tests
├── pages                         
│   ├── dashboard.page.ts                           # Contains locators and methods for the dashboard page
│   ├── funding-account.page.ts                     # Contains locators and methods for the funding account page
│   ├── funding-account-transactions.section.ts     # Contains locators and methods for the funding account transactions datagrid
│   └── index.ts                                    # Simplifies referencing of each page within tests
├── tests                         
│   ├── loginTest.test.ts                           # Test cases for the login functionality
│   └── homeTest.test.ts                            # Test cases for the home page functionality
├── utilities                         
│   └── login-steps.util.ts                         # Performs the login steps for the shared auth
│   └── a11y-helper.util.ts                         # Handles the accessibility scanning through the axe-core tool
|                                                   # Any . folders are temporary and will be cleaned up at the start/end of test runs
|── .auth                                           # Folder to store the authenticated browser state
|── .a11y                                           # Folder to store accessibility test results
|── .downloads                                      # Folder to store any downloaded files during tests
├── config.ts                                       # Configuration file with the environemnt urls, authentication data etc.
├── eslint.config.mjs                               # eslint configuration file which enforces TypeScript best practice
├── package.json                                    # npm configuration file
├── playwright.config.ts                            # Playwright configuration file
├── tsconfig.json                                   # TypeScript configuration file
└── README.md                                       # You are here
```

## Project Best Practices

Here are some best practices we'll be following when writing tests:

### Page Component Object Model

#### Pages

- Page classes should be as small as possible
- Only the locators and methods specific to that page should be present.
- Consider breaking pages down into sections (with the `page-section.section.ts` naming convention) if theyare too large.
- Avoid creating methods for simple actions like `.click()` or `.toBeVisible()`, as the built-in Playwright methods are sufficient & robust. This avoids a lot of boiler-plate code.
- Methods should be used for more complex actions, like inputting text, selecting a date from a date picker etc.
- Methods should also be used for asserting the state of the page, like checking all elements are visible andwell-formatted.
- Consider whether a locator or method belongs to the page, or a shared component.

#### Locators

- Avoid using CSS Selectors or XPaths where possible, as they are prone to change, both from code updates and from updating DOMs
- Should be defined in a consistent way, using the `locator = () => this.page.locator('locator')` pattern.
- Are to be defined exclusively within page or component classes, never directly in tests.
- This means if a locator changes, we only need to update it in one place.
- This also separates test logic from page logic, making tests easier to read and maintain.
- Locators should be defined in a way that is as robust as possible, using roles, text, labels etc where possible.

#### Components

- Consider whether the component is shared across multiple pages.
- Assess what is in the actual component, and what may be in the specific implementation of the component on a page.
  - For example, a specific modal may contain arbitrary HTML content such as a table that might not be shared in other modal instances.
- Try and expose helper functions that allow a page to assert the component state in one step
  - e.g. a "snackbar" notification can have a `snackbar.check(type, text)` method that asserts its type (success, danger etc.), and text content

#### Methods

- Similarly for methods, if a method is only used in one test, or is a simple `.click()` etc, then it can be in the test.
- Otherwise if it should be in the page or component class to be reused.
  
#### Utilities

- Utilities are for shared methods that are not directly related to the UI, like parsing CSV files, accessibility scanning or shared regexes.
- They should be kept as small and separated as possible, and only contain methods that are shared across multiple tests.

### Test Best Practices

#### Assertions

- `expect` statements or other assertions may be present in test, page, component or utility classes.
- The aim should be to have them as close to the test as possible, but abstracting into the page or component class when they are shared.
- Try and validate user-visible behaviour rather than internal state where possible.
- Assertions should be as specific as possible, so if a test fails, it's clear what went wrong.
- Consider adding logging before or after assertions to make it easier to debug failures.
- Use the various built-in `.to...()` methods such as `.toBeVisible()`, `.toHaveText()`, `.toHaveValue()` etc where possible.
  
#### Robustness

- Tests should be as robust as possible, so they can be provide fast and reliable feedback.
- Use the built-in Playwright methods where possible, as they use built-in retries and timeouts to make tests more reliable.
- Wrap flaky steps in the `.toPass()` method to automatically retry before failing.
- Avoid hard waits! Think about what you're waiting for and use the built-in methods to wait for elements to be visible, clickable etc.

### Blazor-Specific Considerations

Blazor is the front-end framework used by Allpay, and comes in two types:

#### Blazor Server

Server-side Blazor is used by sites like:

- Payments Hub
- Admin Hub
- Prepaid Client UI (Organisation Portal)

The app runs on the server, and the UI is rendered on the server. Updates are sent to the client as HTML via a SignalR WebSocket connection.

This means that:

- We aren't able to interact/mock requests the app makes on the server side, so we can't mock things like API calls
- The DOM may be updated after the page has loaded, so we may need to wait for elements to be visible, clickable etc
  
#### Blazor WebAssembly (WASM)

WASM Blazor is used by sites like:

- Cardholder Portal
- File Manager
- Customer Account Manager

The code is compiled as a WebAssembly bundle, and is sent to the client's browser and then run in the browser.

This means that:

- Initial page load times may be longer as the browser has to download and compile the WebAssembly bundle
- We can directly interact with the browser's network requests, so we can mock things like API calls
- Some sites may use server-side rendering for the initial page load, so we may still need to wait for the page to fully load

#### Approaches

Overall, the way to handle either the lack of visibility over the server-side rendering or the longer load times of the WebAssembly bundle is to:

- Select an element which is loaded relatively late in the page load process, like a datagrid component
- Use the built-in Playwright methods to wait for the element to be visible, clickable etc
- Wrap it in a `.toPass()` method to retry before failing

It's not recommended to use the `page.waitForLoadState()` method, as it waits for the page to be in a certain state, rather than the user-visible elements to be visible and clickable.

### Automated Testing Principles

Now here are some principles we'll be following when writing tests:

- Write deterministic and isolated tests
  - Tests should be repeatable and not rely on external factors
- Avoid unnecessary abstractions
  - For example, don't create a method to click a button if it's only used once
- Write tests. Not too many. Mostly integration.
  - Write tests that cover the most important use cases, not every possible scenario
- Use case and quality over coverage
  - Don't try and cover every possible scenario, focus on the most important ones
- Don't test things not under your control
  - Where possible, don't test external services, like APIs, databases etc.
- Tests should be fast
  - Tests should run quickly, so they can be run often, fast tests are also more reliable

Now the previous Selenium framework had a few issues which impeded these principles:

- Every test had to perform a login, which was slow and unreliable. This meant each test had to do a lot to be worth it, which made them slow and unreliable and so on.
- Tests could only be run sequentially by dotnet/VS
- Elements would be found by classes or xpath, which were often brittle and slow

We can get around these in Playwright by:

- Using the `auth` folder to store the authenticated browser state, so we can login once and then run multiple tests without needing to successfully pass the login page steps again
- Running tests in parallel by default, so tests are faster
- Tests can be significantly smaller and more focused, so we can have more of them

### File Naming

When creating new files, please follow the naming convention of:

- `component-name.component.ts` for components
- `page-name.page.ts` for pages,
- `page-name-section-name.section.ts` for sections of pages (where a page is too large for one file),
- `test-name.test.ts` for tests
- `utility-name.util.ts` for utilities

## Setup

To get started we need to:

- Install any pre-qrequisites
- Clone the repo
- Setup environment files
- Install node modules and playwright browsers

### Prerequisites

- [Node](https://nodejs.org/en/) - Is the JavaScript engine that runs everything
- [VS Code](https://code.visualstudio.com/) - By far the best way of editing & running tests
- [VS Code Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) - Simplifies debugging, running tests etc.

### Clone the Repo

Clone the repo through either git or directly from DevOps.

### Environment Files

We use the `.env` system to manage environment variables, which we pull through to our `config.ts` file which, then constructs and exports the variables we need for the tests.

**.env** files are used to store sensitive information, like usernames, passwords, and API keys, so they should not be committed to source control.

``` env {title=.env.example}
`.env` Example File

ENVIRONMENT='dev01'
BRANCH_ALIAS='-101'
APP_USERNAME='testuser1@allpay.net' // We can't use USERNAME as this is already populated with your local machine's username
PASSWORD='qwerty123@'
```

To select an environment, you need to set your Node environment variable to the environment you want to use, e.g. `dev`, `qua`, `prd` etc.

This changes depending on whether we are running our tests via the CLI or via the VS Code extension:

#### CLI

To set the environment variable in the CLI, you can use the following command:

``` bash

``` pwsh
$env:NODE_ENV = 'qua' # Set the environment variable to the environment you want to use
npx playwright test # These will now run using the `.env.qua` variables
```

#### VS Code Extension

To set the environment variable in VS Code, you can update the following in the `settings.json` file:

``` json
{
    "playwright.env": {
        "NODE_ENV": "qua", // Set the environment variable to the environment you want to use
    }
}
```

and then the `launch.json` file:

``` json
{
    "playwright.env": {
        "PWD": "${workspaceFolder}/ui-tests/"
    }
}
```

### Installation

To install dependencies, run:

``` node
cd ./ui-tests/
npm run setup
```

This runs the following commands:

``` node
npm install // Installs all node packages depending on the versions specified in packge.json and package-lock.json
npm install @types/node --save-dev // Installs all types used by all modules
npx playwright install // Installs all of the playwright dependencies like browsers etc.
```

> N.B. This may hang due to the internal firewall, so disconnect from the VPN if it does.

This in order:

- Moves into the `ui-test` directory, where configs and packages are defined
- Install all the package dependencies including the base Playwright project
- Install the TypeScript *types* which is what ensures we don't break type-safety
- Installs the Playwright browsers

To view the current version of playwright installed, run:

```node
npx playwright --version // -V for brevity
```

To update Playwright, run:

``` node
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

you may also need to update your other `node` packages, which you can do with:

```node
npm update --save
```

this will update all package versions in both the `package.json` and `package-lock.json` files.

## ESLint

ESLint is a tool for enforcing best practices in TypeScript code, and can be used to catch errors before they happen. We import two sets of rules into our ESLint config:

- The `TypeScriptConfigs` which are the recommended rules for all TypeScript code
- The `playwrightConfigs` which are the recommended rules for Playwright code

Rules can be turned on or off, and have different levels of severity:

- `off` — Turn the rule off
- `warn` — Log a warning if the rule is broken
- `error` — Log an error if the rule is broken

The ESLint config is defined in `eslint.config.mjs` file. VS Code will pick up and run the rules automatically and continuously, with any issues shown in the 'Problems' tab.

It can also run them manually with:

``` node
npx eslint .
```

### Rule List

✅ Set in the `recommended` configuration\
🔧 Automatically fixable by the [`--fix`](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix)
CLI option\
💡 Manually fixable by
[editor suggestions](https://eslint.org/docs/latest/developer-guide/working-with-rules#providing-suggestions)

| Rule                                                                                                                                                | Description                                                        | ✅  | 🔧  | 💡  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | :-: | :-: | :-: |
| [expect-expect](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/expect-expect.md)                             | Enforce assertion to be made in a test body                        | ✅  |     |     |
| [max-expects](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/max-expects.md)                                 | Enforces a maximum number assertion calls in a test body           |     |     |     |
| [max-nested-describe](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/max-nested-describe.md)                 | Enforces a maximum depth to nested describe calls                  | ✅  |     |     |
| [missing-playwright-await](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/missing-playwright-await.md)       | Enforce Playwright APIs to be awaited                              | ✅  | 🔧  |     |
| [no-commented-out-tests](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-commented-out-tests.md)           | Disallow commented out tests                                       |     |     |     |
| [no-conditional-expect](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-conditional-expect.md)             | Disallow calling `expect` conditionally                            | ✅  |     |     |
| [no-conditional-in-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-conditional-in-test.md)           | Disallow conditional logic in tests                                | ✅  |     |     |
| [no-duplicate-hooks](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-duplicate-hooks.md)                   | Disallow duplicate setup and teardown hooks                        |     |     |     |
| [no-element-handle](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-element-handle.md)                     | Disallow usage of element handles                                  | ✅  |     | 💡  |
| [no-eval](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-eval.md)                                         | Disallow usage of `page.$eval()` and `page.$$eval()`               | ✅  |     |     |
| [no-focused-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-focused-test.md)                         | Disallow usage of `.only` annotation                               | ✅  |     | 💡  |
| [no-force-option](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-force-option.md)                         | Disallow usage of the `{ force: true }` option                     | ✅  |     |     |
| [no-get-by-title](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-get-by-title.md)                         | Disallow using `getByTitle()`                                      |     | 🔧  |     |
| [no-hooks](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-hooks.md)                                       | Disallow setup and teardown hooks                                  |     |     |     |
| [no-nested-step](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-nested-step.md)                           | Disallow nested `test.step()` methods                              | ✅  |     |     |
| [no-networkidle](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-networkidle.md)                           | Disallow usage of the `networkidle` option                         | ✅  |     |     |
| [no-nth-methods](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-nth-methods.md)                           | Disallow usage of `first()`, `last()`, and `nth()` methods         |     |     |     |
| [no-page-pause](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-page-pause.md)                             | Disallow using `page.pause()`                                      | ✅  |     |     |
| [no-raw-locators](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-raw-locators.md)                         | Disallow using raw locators                                        |     |     |     |
| [no-restricted-matchers](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-restricted-matchers.md)           | Disallow specific matchers & modifiers                             |     |     |     |
| [no-skipped-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-skipped-test.md)                         | Disallow usage of the `.skip` annotation                           | ✅  |     | 💡  |
| [no-slowed-test](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-slowed-test.md)                           | Disallow usage of the `.slow` annotation                           |     |     | 💡  |
| [no-standalone-expect](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-standalone-expect.md)               | Disallow using expect outside of `test` blocks                     | ✅  |     |     |
| [no-unsafe-references](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-unsafe-references.md)               | Prevent unsafe variable references in `page.evaluate()`            | ✅  | 🔧  |     |
| [no-useless-await](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-useless-await.md)                       | Disallow unnecessary `await`s for Playwright methods               | ✅  | 🔧  |     |
| [no-useless-not](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-useless-not.md)                           | Disallow usage of `not` matchers when a specific matcher exists    | ✅  | 🔧  |     |
| [no-wait-for-selector](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-wait-for-selector.md)               | Disallow usage of `page.waitForSelector()`                         | ✅  |     | 💡  |
| [no-wait-for-timeout](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-wait-for-timeout.md)                 | Disallow usage of `page.waitForTimeout()`                          | ✅  |     | 💡  |
| [prefer-comparison-matcher](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-comparison-matcher.md)     | Suggest using the built-in comparison matchers                     |     | 🔧  |     |
| [prefer-equality-matcher](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-equality-matcher.md)         | Suggest using the built-in equality matchers                       |     |     | 💡  |
| [prefer-hooks-in-order](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-hooks-in-order.md)             | Prefer having hooks in a consistent order                          |     |     |     |
| [prefer-hooks-on-top](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-hooks-on-top.md)                 | Suggest having hooks before any test cases                         |     |     |     |
| [prefer-lowercase-title](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-lowercase-title.md)           | Enforce lowercase test names                                       |     | 🔧  |     |
| [prefer-native-locators](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-native-locators.md)           | Suggest built-in locators over `page.locator()`                    |     | 🔧  |     |
| [prefer-locator](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-locator.md)                           | Suggest locators over page methods                                 |     |     |     |
| [prefer-strict-equal](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-strict-equal.md)                 | Suggest using `toStrictEqual()`                                    |     |     | 💡  |
| [prefer-to-be](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-be.md)                               | Suggest using `toBe()`                                             |     | 🔧  |     |
| [prefer-to-contain](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-contain.md)                     | Suggest using `toContain()`                                        |     | 🔧  |     |
| [prefer-to-have-count](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-have-count.md)               | Suggest using `toHaveCount()`                                      |     | 🔧  |     |
| [prefer-to-have-length](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-have-length.md)             | Suggest using `toHaveLength()`                                     |     | 🔧  |     |
| [prefer-web-first-assertions](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-web-first-assertions.md) | Suggest using web first assertions                                 | ✅  | 🔧  |     |
| [require-hook](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-hook.md)                               | Require setup and teardown code to be within a hook                |     |     |     |
| [require-soft-assertions](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-soft-assertions.md)         | Require assertions to use `expect.soft()`                          |     | 🔧  |     |
| [require-to-throw-message](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-to-throw-message.md)       | Require a message for `toThrow()`                                  |     |     |     |
| [require-top-level-describe](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-top-level-describe.md)   | Require test cases and hooks to be inside a `test.describe` block  |     |     |     |
| [valid-describe-callback](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-describe-callback.md)         | Enforce valid `describe()` callback                                | ✅  |     |     |
| [valid-expect-in-promise](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-expect-in-promise.md)         | Require promises that have expectations in their chain to be valid | ✅  |     |     |
| [valid-expect](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-expect.md)                               | Enforce valid `expect()` usage                                     | ✅  |     |     |
| [valid-title](https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-title.md)                                 | Enforce valid titles                                               | ✅  | 🔧  |     |

### Disabling Rules

Now there is no one-size fits all, so some rules are disabled across the entire project, such as:

|Rule Name | Rule Reason |  Disabled Reason |
| --- | --- | --- |
| expect-expect | `test` blocks should contain `expect` | We may abstract all the `expect` statements into helper functions within the page or component classes |
| no-standalone-expect | `expect` statements should exist inside `test` blocks | This rule allows `expect` statements inside helper functions, but they must exist within a `test.describe` block at minimum, which breaks the POM abstractions |
| no-conditional-in-test | Disallow conditional logic in tests | We may need to handle different conditions in tests, so this rule is disabled |

If you need to disable a specific rule for a specific line, you can do so with a comment:

``` ts
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
```

or for a whole file:

``` ts
// Please provide a comment for why turning the rule off is required
/* eslint {ruleName}: "off" */
```

### Fixing ESLint Issues

We can fix eslint issues in a few ways:

- Some issues can be fixed automatically by running `npx eslint . --fix`, which is very easy for missing `await` statements
- Using the 'Quick Fix' option in VS Code, which will suggest a fix when you hover over the issue
- Using CoPilot, either inline on the problem `Ctrl` + `I`, or through the chat window `Ctrl` + `Alt` + `I`

## Using Playwright

There are several ways to interact with Playwright, depending on your familiarity with the terminal:

### CLI

The CLI (through the PowerShell terminal in VS Code normally) is one of the main ways to interact with Playwright.

The base commands are `npx playwright`, you can then use the `-h` "help" flag to see the list of available commands without running anything.

The main commands are:

``` node
// Testing
- test [options] [test-filter...]        run tests with Playwright Test

// Exploratory
- open [options] [url]                   open page in browser specified via -b, --browser
- cr [options] [url]                     open page in Chromium
- ff [options] [url]                     open page in Firefox
- wk [options] [url]                     open page in WebKit
- codegen [options] [url]                open page and generate code for user actions

// Reporting
- screenshot [options] <url> <filename>  capture a page screenshot
- pdf [options] <url> <filename>         save page as pdf
- show-trace [options] [trace...]        show trace viewer
- show-report [options] [report]         show HTML report
```

Example:

``` node
npx playwright test
```

Useful test flags:

``` node
--browser <browser>              Define which browsers to use for the tests, one of "all", "chromium", "firefox" or "webkit" (default: "chromium")
--debug                          Opens the Playwright inspector. Shortcut for "PWDEBUG=1" environment variable and "--timeout=0 --max-failures=1 --headed --workers=1" options
-g, --grep <grep>                Only run tests matching this regular expression (default: ".*")
-gv, --grep-invert <grep>        Only run tests that do not match this regular expression
--headed                         Run tests in headed browsers (default: headless) 
-j, --workers <workers>          Number of concurrent workers or percentage of logical CPU cores, use 1 to run in a single worker (default: 50%)
--last-failed                    Only re-run the failures
--list                           Collect all the tests and report them, but do not run
--project <project-name...>      Only run tests from the specified list of projects, supports '*' wildcard (default: run all projects)
--repeat-each <N>                Run each test N times (default: 1)
--trace <mode>                   Force tracing mode, can be "on", "off", "on-first-retry", "on-all-retries", "retain-on-failure", "retain-on-first-failure"
--ui                             Run tests in interactive UI mode
```

By default this runs using the config defined in `playwright.config.ts`, which is explained in more detail below. CLI flags always take priority over the config file.

### VS Code Extension

The Playwright extension for VS Code is a great way to run tests, debug them, and see the results. Once installed, you can view tests in the test explorer, or run them directly from the test file with the icons next to each test declaration.

> Just make sure to filter with `@playwright` to exclude any .NET unit tests from the view.

There's also the Playwright section below the test explorer, which includes tools to:

- Open a new browser and select locators
- Start recording a test from a new browser (more on this later)
- Start recording a test from the current cursor location within a test
- Show the test output (which opens the "Test Results" tab of the terminal)

as well as which browser projects will run.

Additional setup info can be found at: [Playwright - Getting started - VS Code](https://playwright.dev/docs/getting-started-vscode)

### Playwright CRX Chrome Extension

The [Playwright CRX Extension](https://chromewebstore.google.com/detail/playwright-crx/jambeljnbnfbkcpnoiaedcabbgmnnlcd) is a Chrome extension that allows you to:

- Directly attach to an existing browser window
- Select locators from the page
- Record a user journey as a test
- Directly edit and update that test as TypeScript
- Run and debug that test

[Playwright CRX Repo](https://github.com/ruifigueira/playwright-crx)

## Creating Pages and Tests

### Pages

Let's create a page file for a `FraudReport` page. First, create a new file in the `pages` folder, with the name in the format `page-name.page.ts`, so `fraud-report.page.ts`. This just allows us to easily distinguish between pages, components and tests.

This is a basic example page with locators and methods:

``` ts
import { Page, expect } from '@playwright/test'; // Import the Page and expect objects from Playwright

// Page is a class which contains all the locators and methods for pages within Playwright
// expect is the Playwright assertion method, which we use to assert the state of the page

export class FraudReportPage { // Export the class in this format: `PageNamePage`
    constructor(public page: Page) { } // Pass the page object to the constructor

    // "Standard" Locators
    allpayLogo = () => this.page.locator('#allpay-logo'); // Get by id
    prepaidIcon = () => this.page.locator('.prepaid-icon'); // Get by class
    fraudReportTitle = () => this.page.locator('xpath=//title') // Get by xpath

    // Playwright Web-First Locators
    fraudReportButton = () => this.page.getByRole('button', { name: 'Fraud Report button' }) // Get by role
    fraudReportDisclaimer = () => this.page.getByText('text=This is a disclaimer'); // Get by text
    fraudReportInputLabel = () => this.page.getByLabel('Name'); // Get by the label adjacent to the input
    fraudReportInputPlaceholder = () => this.page.getByPlaceholderText('Enter your name'); // Get by placeholder text within the input
    fraudReportLogo = () => this.page.getByAltText('Fraud Report Logo'); // Get by alt text of an image
    fraudReportTitle = () => this.page.getByTitle('Fraud Report Title'); // Get by title attribute

    // Methods
    // A basic assert an element is visible, though this may be better placed diretly in the test
    async assertAllpayLogoExists(): Promise<void> {
        await expect(this.allpayLogo()).toBeVisible();
    }

    // A basic click method, which again will be better placed directly in the test
    async clickFraudReportButton(): Promise<void> {
        await this.fraudReportButton().click();
    }

    // A better example of the sort of method we would define in a page class, performing multiple asserts that are specific to a page
    async assertFraudReportWellFormatted(): Promise<void> {
        // Assert all the elements on the page are visible and well-formatted
        await expect(this.allpayLogo()).toBeVisible();
        await expect(this.prepaidIcon()).toBeVisible();
        await expect(this.fraudReportTitle()).toBeVisible();
        await expect(this.fraudReportButton()).toBeVisible();
        await expect(this.fraudReportDisclaimer()).toBeVisible();
        await expect(this.fraudReportInputLabel()).toBeVisible();
    }
}
```

#### Locators

We define locators in the following way:

``` ts
locator      //name of locator
= () =>      //is a function which takes no parameters
this.page    //is the page object passed to the constructor which contains the Playwright methods
.locator     //is the Playwright method to get the locator
('locator')  //is the locator strategy, e.g. id, class, xpath etc

//So when we want to use the locator, we call it as a function, e.g. 
this.allpayLogo()
```

#### Methods

Now you may have been used to defining basic 'visible' and 'click' methods, in a Page class, but in Playwright we can avoid that unnecessary layer of abstraction, as the built-in methods are already quite clear, resilient and easy to use.

However, if you so desire, here is the an example of checking an element for visibility:

``` ts
async assertAllpayLogoExists(): Promise<void> {
    await expect(this.allpayLogo()).toBeVisible();
}
```

This is defined in the following way:

``` ts
async                     // means the method is asynchronous and will return a Promise
assertAllpayLogoExists()  // is the name of the method
: Promise<void>           // is the return type of the method, 
                          // in this case a Promise which resolves to void (nothing)
await                     // is used to wait for the result of the method to be returned
expect                    // is the Playwright assertion method, 
                          // this is what returns the result of the assertion to the test
this                      // refers to the current class instance
.allpayLogo()             // is the locator method we defined earlier
.toBeVisible()            // is the Playwright method to assert the element is visible
```

And for an example click method:

``` ts
    async clickFraudReportButton(): Promise<void> {
        await this.fraudReportButton().click();
    }
```

This is defined in the following way:

``` ts
async                     // means the method is asynchronous and will return a Promise
clickFraudReportButton()  // is the name of the method
: Promise<void>           // is the return type of the method, 
                          // in this case a Promise which resolves to void (nothing)
await                     // is used to wait for the result of the method to be returned
this                      // refers to the current class instance
.fraudReportButton()      // is the locator method we defined earlier
.click()                  // is the Playwright method to click the element
```

We can also do things like defining a list of locators in an array:

``` ts
fraudLocators = [
    this.fraudReportButton,
    this.fraudReportsDisclaimer,
    this.fraudReportInputLabel,
    this.fraudReportTitle
];
```

And then running them through a loop to assert they are all visible:

``` ts
async assertDashboardButtons(): Promise<void> {
    for (const locator of this.fraudLocators) {
        await expect(locator()).toBeVisible();
    }
}
```

#### Page Class Content

The Page classes should contain **Page Specific Things** such as:

- Locators for elements *specifically* on that page, if they're in a shared component, they should be in a component class
- Methods to interact with those elements if they require more than a simple click or visibility check
  - Think inputting text or a whole form, or selecting a date from a date picker
- Methods to assert the state of the page, such as checking all elements are visible and well-formatted
  - So if we are loading a bank account for example, does the balance show, is the account name correct etc.
- Methods to navigate to other pages, if that is a common action on that page
- Specific instances of shared components, if they are unique to that page e.g. a specific modal or data grid
  - However if the component is fully generic, then keep it in the component class

### Tests

#### Functional Tests

Now let's create a test file for the `FraudReport` page. First, create a new file in the `tests` folder, with the name in the format `test-name.test.ts`, so `fraud-report.test.ts`.

This is a basic example test:

``` ts
import { test, expect } from '@playwright/test'; // Import the test and expect objects from Playwright
import { FraudReportPage } from '../../pages'; // Import the FraudReportPage class

test('Fraud Report Page', async ({ page }) => { // Define a test with a name and an async function
    const fraudReportPage = new FraudReportPage(page); // Create a new instance of the FraudReportPage class

    await page.goto('https://www.allpay.net/fraud-report'); // Navigate to the Fraud Report page

    await expect fraudReportPage.allpayLogo().toBeVisible(); // Use locator defined in the page class to assert the Allpay logo is visible 
});
```

But the sky's the limit in terms of assertions and interactions you can perform. We can do things like:

- Download and upload files
- Handle multiple pages and popups
- Create objects and arrays from tables/grids and bulk assert against them
- Assert classes, attributes and styles of elements

Or pretty much anything else you can do in a browser, you can do in Playwright.

#### Accessibility Tests

As this application is used by public sector organisations we have a legal requirement to ensure it meets the WCAG 2.2 AA accessibility standard. We deal with this in two ways using automated accessibility scanning tools:

- Run scans on pages and raise violations as bugs to be fixed
- Compile scan results into an Accessibility Statement for the application, which is our public declaration of conformance

##### Internal Accessibility Tests

These are used to raise bugs internally allowing us to fix violations against specific elements on a page. We output each page's violations in a single results file, which is then output as an artifact on the pipeline, and published as test results to DevOps.

To run an accessibility test on the page, using the `axe-core` tool, which is wrapped in an `checkAccessibility()` method from the `AccessibilityTest` class. All that's needed is:

``` ts
import { test } from '@playwright/test';                          // Import the test object from Playwright
import { DashboardPage } from '../../pages';                      // Import the DashboardPage class
import { AccessibilityTest } from '../../accessibility';          // Import the AccessibilityTest class

test.describe('Dashboard Page Accessibility', () => {
    test('@a11y - @Dashboard', async ({ page }) => {
        const dashboard = new DashboardPage(page);                       // Create a new instance of the DashboardPage class

        await dashboard.goToDashboard();                                 // Navigate to the Dashboard page
        await dashboard.assertDashboardButtons();                        // Do a basic assert that the page is loaded correctly

        await AccessibilityTest.checkAccessibility(page, 'Dashboard');   // Run the accessibility check on the page passing the page object and the page name
    });
});
```

The `checkAccessibility()` method has the following parameters:

- `page` — The Playwright page object.
- `pageName` — A label for the page (e.g. 'Dashboard').
- `allowedViolations` — The maximum number of violations allowed.
  - This defaults to `{ minor: 10, moderate: 5, serious: 5, critical: 2 }` which is the maximum number of violations allowed for each category.
- `includeSelector` — A selector to limit the scan (default: '#body-wrapper').
  - The default excludes the navigation bars, meaning we aren't testing against them repeatedly
- `tags` — The Axe tags (accessbility rulesets) to run.
  - The default is : `["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"]`
  - The higher levels do not include the lower levels, so if you want to run all levels, you need to include them all.

Running this will create an NUnit results file in the `.a11y` folder, which is output on the pipeline as an artifact, and published as test results to DevOps.

For more info on the `axe-core` tool, see:

- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [axe-core github repo](https://github.com/dequelabs/axe-core)
- [axe-core npm repo](https://www.npmjs.com/package/@axe-core/react)

##### Accessibility Statements

We also have the requirement to produce an Accessibility Statement for the application, which is a public declaration of conformance against the WCAG 2.2 AA standard. This is an overall summary of the accessibility of the application, and is used by public sector organisations to determine if the application meets their accessibility requirements.

This is done again through `axe-core`, but instead by grouping results against the WCAG criteria, and then outputting the results into a pre-formatted Accessibility Statement template.

``` ts
import { test } from '@playwright/test';
import { AccessibilityReport } from '../../accessibility';
import { cardholderTest } from '../../fixtures';
import * as pages from '../../pages';
import { ProductHelper } from '../../utilities';

test.describe('Create Accessibility Report', () => {
    // Create an empty site report
    let siteReport: Awaited<ReturnType<typeof AccessibilityReport.createSiteReport>>;
    test.beforeAll(async () => {
        // Then initialise it with the site details
        siteReport = await AccessibilityReport.createSiteReport(
            'prepaid-client-ui',
            'Disbursements Client Site',
            'https://disbursements.paymenthub.allpay.cloud/',
            'AA'
        );
    });

    // This is a basic example, navigate to the page, assert it is loaded, then run the scan
    test('Dashboard - Accessibility Report Scan', async ({ page }) => {
        const dashboardPage = new pages.DashboardPage(page);
        await dashboardPage.goTo();

        await dashboardPage.assertWellFormed();

        siteReport = await AccessibilityReport.runAxeScanAndUpdateReport(
            siteReport,
            page,
            'Dashboard'
        );
    });

    // This is an example of using a custom fixture, which navigates us to the cardholder page
    cardholderTest('Cardholder Details - Accessibility Report Scan', async ({ cardholderPage, selectedProduct }) => {
        void selectedProduct;

        await cardholderPage.assertDetails();

        siteReport = await AccessibilityReport.runAxeScanAndUpdateReport(
            siteReport,
            cardholderPage.page,
            'Cardholder - Base Page'
        );
    });

    // This is an example of performing multiple scans
    test('Reports - Accessibility Report Scan', async ({ page }) => {
        const reportsPage = new pages.ReportsPage(page);
        const reportsTable = new pages.ReportsGenerationTable(page);
        const safeguardedReports = new pages.SafeguardingReportsTable(page);

        await reportsPage.goTo();

        await reportsPage.assertTabs();

        siteReport = await AccessibilityReport.runAxeScanAndUpdateReport(
            siteReport,
            page,
            'Reports - Base Page'
        );

        await reportsPage.reportGenerationTab().click();
        await reportsTable.assertReportOptions();

        siteReport = await AccessibilityReport.runAxeScanAndUpdateReport(
            siteReport,
            page,
            'Reports - Reports Table'
        );
    });

    // After all tests have run, generate the final report
    test.afterAll(async () => {
        await AccessibilityReport.generateSiteReport(siteReport.reportId);
    });
});

```

We then map the results to the Accessibility Statement template, which is then output as a HTML file in the `.a11y-statement` folder. More info on the accessibility logic can be found in [Accessibility README](./accessibility/README.md).

#### Additional Test Types

Playwright also has the ability to integrate with tools such as:

- k6 for browser load-testing
- Google Lighthouse for performance & additional accessibility testing
- OWASP ZAP for security penetration testing

## Running & Debugging Tests

### Running

You can run tests using the Playwright CLI or via the VS Test Runner (with the Playwright extension). It is recommended to run all affected tests when making changes and run the full suite before committing.

### Test Targeting

Tests can be executed against either a deployed site or a locally running version. There are things to bear in mind with both:

#### Deployed Sites

Tests run against the live site provide the most realistic test environment, however we are more likely to run into network issues or the site changing in unexpected ways during testing.

#### Local Sites

Running the site locally, we may run into some issues which can cause flakiness, particularly when running tests in parallel:

- We may experience port conflicts or resource usage issues
- We may experience issues with shared state between tests
- We may have configuration issues compared with the live site

It's generally advised to run only a few tests locally, where you may need to debug the site as the test proceeds, or update locators etc., and then run the full suite against the live site.

### Debugging

Debugging tests can be done in a number of ways, depending on the method of running the tests:

#### VS Test Runner

- In the VS Code Test Runner combined with the Playwright extension, running a test in "debug" mode, which will then show the execution through the tests as it proceeds and hits any set breakpoints, you can use normal `console.log()` statements which are output to the debug console, actual results are output in the "Test Results" tab of the terminal. The debug console will also allow you to view any variables and change their values as the test runs.

#### CLI Debugging

- Running a test in the terminal with the:
  - `--debug` flag, which will open the Playwright inspector, allowing you to see the browser and interact with it as the test runs, you can also see the console output and network logs etc.
  - `--trace on` flag, which will store traces of the test runs with screenshots, network logs etc, which can be viewed in the Playwright inspector or in the `.trace` folder
  - `--ui` flag, which will run the tests in interactive UI mode, allowing you to see the browser and interact with it as the test runs, you can also see the console output and network logs etc.
  - `--headed` flag, which will run the tests in headed mode, meaning you can see the browser as the test runs, you can also see the console output and network logs etc.
  - You can also use breakpoints and debug as normal, or the `await page.pause()` method to pause the test at a certain point (requires running in headed mode)

#### Logging

A key part of debugging is logging, which can be done in a number of ways:

- `console.log()` statements, which are output to the debug console in VS Code or the terminal
- The debug-console within VS Code, which will show the output of the test as it runs and allow you to inspect & change variables
- The Playwright inspector, which will show the browser and allow you to interact with it as the test runs, you can also see the console output and network logs etc.
- Through the `logger.log()` method for more structure logging

Always consider leaving logging in place where appropriate, as it can be useful for debugging issues in the future.

## Test Setup & Fixtures

We only test what is necessary and avoid duplicating setup steps by using global setups, teardowns, and fixtures.

### Global Setup & Teardown

Playwright allows us to define global setup and teardown files, which are run before and after the tests respectively. This allows us to do things like:

- Run setup steps which are common to all tests and/or run steps once and store a browser state so we can start tests from a known state
  - i.e. Login to the site once and then run multiple tests without logging in again
- Clear any results from previous test runs we no longer want

We can set this up by:

1. Create setup and teardown 'tests' as `setup.ts` and `teardown.ts` in our tests folder.
2. In the `playwright.config.ts` file, define a `setup` project like so:
   >`{ name: 'setup', testMatch: /.*\.setup\.ts/, teardown: 'cleanup' }`

   which will run the setup test based on the testMatch, and uses the `cleanup` project as a teardown.
3. and then the `teardown` project which runs the teardown file:
    > `{ name: 'teardown', testMatch: /.*\.teardown\.ts/}`
4. In each browser project, set the dependencies to include the setup project:
    >`dependencies: ['setup']`

Now the setup file will run by itself before the tests, and the teardown file will run by itself after the tests.

#### Setup Steps

Setup steps can include:

- Deleting any previous custom result files
- Deleting any previous browser storage states
- Deleting any downloaded files
- Performing login steps where we're not looking to test login functionality
- Saving the generated authorized state so pages can start already authorized
- Setting up any custom browser or network configurations

#### Teardown Steps

Teardown steps can include:

- Deleting any previous custom result files
- Deleting any previous browser storage states
- Deleting any downloaded files
- Logging out of the site

### Fixtures

Fixtures are another way of sharing setup steps between tests, but are more flexible than global setup and teardown files. This allows us to define a set of steps which are run before or after each test. Playwright has built-in fixtures and custom fixtures.

#### Built-in Fixtures

Playwright comes with five built-in fixtures. The main one we use is the `page` fixture. This fixture allows us to not worry about starting a browser process and instead hands our tests a ready-to-go browser, configured as we defined in `playwright.config.ts`.

Of course, if we need to do more involved steps like opening a new tab, we can use the `context` BrowserContext for this.

| Fixture     | Type              | Description                                                                                                           |
|-------------|-------------------|-----------------------------------------------------------------------------------------------------------------------|
| page        | Page              | Isolated page for this test run.                                                                                      |
| context     | BrowserContext    | Isolated context for this test run. The page fixture belongs to this context as well. Learn how to configure context. |
| browser     | Browser           | Browsers are shared across tests to optimize resources. Learn how to configure browser.                               |
| browserName | string            | The name of the browser currently running the test. Either chromium, firefox or webkit.                               |
| request     | APIRequestContext | Isolated APIRequestContext instance for this test run.                                                                |

#### Custom Fixtures

Playwright allows us to extend any existing class such as the `page` fixture and create our own fixtures.

For example, where some navigation steps are required to get to the Fraud Report page before we can do each test:

``` ts
// Import the ReportsPage and FraudReportPage classes we need
import { test as baseTest, expect } from '@playwright/test';
import { ReportsPage, FraudReportPage  } from '../pages';

// Define a type for the fixture
type FraudReportFixture = {
    fraudReport: FraudReportPage;
};

// Extend the base Playwright `test` class with the fixture
export const fraudReportTest = baseTest.extend<FraudReportFixture>({     
    // Define the fixture with the page object and a 'use' function
    fraudReport: async ({ page }, use) => {
        // Create a new instance of the FraudReportPage nad ReportsPage classes
        const reports = new ReportsPage(page);                             
        const fraudReport = new FraudReportPage(page);          

        // Do some shared steps like navigate to the reports page, then the fraud report page then past any prompts etc
        await reports.goToReports();
        await reports.goToFraudReport();
        await fraudReport.enterFraudReportPage();
    
        // Pass the page object which is now in the desired state to the 'use' function
        await use(fraudReport);

        // We can also do teardown steps which will run after all the steps in the tests
        await fraudReport.exitFraudReportPage();
      },
});

export { expect as fraudReportExpect }; // Also export the `expect` object for use in the tests
```

Now when we want to use this fixture in a test, we can do so like this:

``` ts
import { fraudReportTest as test } from '../../fixtures';   // Import the test object from the fixture, renaming it back to 'test'
import { FraudReportPage  } from '../pages';                // Import the FraudReportPage class

// Define a test using the fixture, not the 'page' object
test('Fraud Report Base Page', async ({ fraudReport }) => {
    // Now to instantiate a page object, we call is on the fixture object
    const fraudReport = new FraudReportPage(fraudReport.page);

    // Now we can use the page object as normal
    await fraudReport.assertFraudReportWellFormatted();
});
```

#### Extending Fixtures with Parameters

We can also extend fixtures with parameters, allowing us to pass in additional data to the fixture. This is useful for when we want to run the same test with a different setup, e.g. a different prepaid product. This is a very simplistic example, but it shows the concept:

First we define the fixture:

``` ts
// Do usual imports, but alisas the `test` object to `baseTest` to avoid confusion with our custom fixture
import { expect as baseExpect, test as baseTest } from '@playwright/test';
import type { DisbursementProduct } from '../models';
import { DashboardPage } from '../pages';
import { ProductHelper } from '../utilities';

// Define our custom fixture options type
type ProductFixtureOptions = { productName?: DisbursementProduct };

// The define our fixtures type, which includes the product and dashboard page
export type Fixtures = {
    product: DisbursementProduct;
    dashboard: DashboardPage;
};

// Then extend the base test with the fixture options
const testWithOption = baseTest.extend<ProductFixtureOptions>({
    productName: ['General Spend' as DisbursementProduct, { option: true }],
});

// And then extend that test with the Fixtures type
export const test = testWithOption.extend<Fixtures>({
    // We then need two fixtures defined inside, one for each of the properties in the Fixtures type
    // `product` fixture: yields the DisbursementProduct object
    product: async ({ page, productName }, use) => {
        const selected: DisbursementProduct = productName ?? ('General Spend' as DisbursementProduct);

        const dashboardPage = new DashboardPage(page);
        const productHelper = new ProductHelper(page);

        await dashboardPage.goTo();
        await productHelper.setProduct(selected);
        await use(selected);
  },

  // `dashboard` fixture: yields the DashboardPage object
    dashboard: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
});

// and then export the expect object for use in the tests
export const expect = baseExpect;
```

Now in our test file, we can use the fixture like this:

``` ts
import { TopNavComponent } from '../components';
// Import test & expect from the fixture file, not the base Playwright test
import { expect, test } from '../fixtures/product.fixture';
import type { DisbursementProduct } from '../models';

// Supply our desired product to the fixture option
test.use({ 'Instant Issue' }); 

test(`Dashboard - ${productName}`, async ({ dashboard, product }) => {
    // When the test starts, we pick up from the last step of the fixture
    const top = new TopNavComponent(dashboard.page);
    await expect(top.productTitle()).toHaveText(product);
});
```

or if we want to use an array of products, we can use the `test.describe()` method to create a suite for each product:

``` ts
import { TopNavComponent } from '../components';
// Import test & expect from the fixture file, not the base Playwright test
import { expect, test } from '../fixtures/product.fixture';
import type { DisbursementProduct } from '../models';

// Array of products to test
const products: DisbursementProduct[] = [
    'Direct Payments',
    'Instant Issue',
];

// Generate one 'suite' per product
for (const productName of products) {
    test.describe(`${productName} @Dashboard`, () => {
        // This is where the parameter is passed to the fixture
        test.use({ productName });

        // Which is then passed on through the fixture to the `product` fixture

        test(`Dashboard - ${productName}`, async ({ dashboard, product }) => {
            // When the test starts, we pick up from the last step of the fixture
            const top = new TopNavComponent(dashboard.page);
            await expect(top.productTitle()).toHaveText(product);
        });
    });
}
```

The exact structure of `test.describe()`, `test.use()` and `test()` are not interchangeable, so you must use them in this order. The `test.describe()` is used to group tests together, the `test.use()` is used to apply the fixture options to the tests within the describe block, and the `test()` is used to define the actual test.

More information on how to handle this is availab in the [Playwright documentation](https://playwright.dev/docs/test-fixtures#fixtures-options).

## Configuration

Playwright is configured through the `playwright.config.ts` file, which is where we define the browsers to run the tests in, the test files to run, and any additional options.

This is the layout of the file used for this project:

``` json
import { defineConfig, devices } from '@playwright/test';  // Import the defineConfig and devices objects from Playwright
import path from 'path';                                   // Import the path object from Node

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') }); // We don't currently use environment variables, but if we did

/**
 * See https://playwright.dev/docs/test-configuration.
 */

/** 
 * The path to the stored browser auth state is dependent on where we execute from, 
 * if through the VS Code extension, then we need to move from the root down to the test folder
 */
const storageStatePath = path.join(__dirname, '.auth', 'user.json');

/**
 * The viewport size is set to 1920x945, which is the smallest compatible size for Chrome/Edge/Firefox/Webkit
 * on a 1920x1080 screen with no bookmark bar.
 * This is the default size for the Playwright inspector, so we can see the browser as it runs the tests.
 */
const viewport = { width: 1920, height: 945 }; 

export default defineConfig({
  testMatch: '**/*.test.ts', // Our test files are named in the format `test-name.test.ts`
  /* Run tests in files in parallel */
  fullyParallel: true, // Run tests in parallel by default
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, // If on CI, then attempt 2 retries, otherwise 1
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 8, // Locally you can use more paralleism than on CI, so fewer workers when on CI
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['junit'], ['list']] : [['list'], ['html']], // Use the JUnit & list reporters on CI, otherwise use the list & html reporters
  /* Up the default timeout to 10,000 from 5,000*/
  expect: { timeout: 10_000}, // This is the default timeout used for in all 'wait' methods. Our site load times are not worthy of the standard 5 seconds
  /* Includes the git info for the current commit in the HTML reports */
  captureGitInfo: { commit: true, diff: true }, // 'Commit' includes the commit hash, author, timestamps, messages etc, 'diff' includes the changes in the commit 
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    launchOptions: {
      slowMo: process.env.PWDEBUG ? 400 : 100, // Playwright can be FAST, this adds additional minor delays between each step, and makes things more realistic and resilient
    },
    viewport: { width: 1920, height: 1080 }, // Set the viewport size to 1920x1080
    trace: 'on-all-retries', // Collect a trace on all the first retries
    locale: 'en-GB',         // Set the browser locale to en-GB, this can affect how dates, numbers, currency symbols  etc are displayed
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/, teardown: 'teardown'}, // Define a setup project, which runs the setup file, and then the teardown project
    { name: 'teardown', testMatch: /.*\.teardown\.ts/},                 // The teardown project
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],                                 // Uses the desktop chromium device, 
        storageState: storageStatePath,                               // Which initialises with the saved storage state from the setup project
        viewport: viewport, 
                                                                      // meaning we can skip the login page
      },
      dependencies: ['setup'],                                        // The setup project which runs first
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: storageStatePath,
        viewport: viewport,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: storageStatePath,
        viewport: viewport,
      },
      dependencies: ['setup'],
    },

    /* Test against mobile **viewports** if desired. */
    /* This is **NOT** the same as testing against an actual mobile browser */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'], 
        channel: 'msedge',               // By using the 'channel' option, we test against the actual Edge browser, not just the base Chromium
        storageState: storageStatePath,
        viewport: viewport,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        storageState: storageStatePath,
        viewport: viewport,
      },
      dependencies: ['setup'],
    },
  ],
});
```

## CI/CD Tests

Tests can be run as part of a release pipeline, by using the common-template or directly in a test stage.

### Common-Template

The steps performed by the common-template are as follows:

- Any pre-test setup, such as creating the config file containing URLs, user credentials etc.
- Installing Playwright, the other node packages, TypeScript types and Playwright browsers
- Setting the trace mode and browser projects to run, dependent on the git branch
  - `main` & `develop` branches runs all the browser projects, feature branches run only the Chromium project
  - `main` branch runs with traces fully on, other branches only on the first retry
  - a `--grep` filter matches any provided regex to run only tests which match e.g. `--grep 'login'` runs only tests with 'login' in the name
- Retrieves the releveant Azure Playwright Testing workspace
- Runs the tests  with the provided parameters
- Collects the test results and artifacts, and publishes them to the pipeline and DevOps test results
- Formats the trace folders to contain the relevant test names and publishes them

It can be used in the following way:

``` yml
parameters: 
- name: azureSubscription
  type: string
- name: UITestPattern
  type: string
  default: '.*'
- name: TestFolderPath
  type: string
  default: 'ui-tests'

steps:
- template: playwright-test.yml@templates
  parameters:
    azureSubscription: ${{ parameters.azureSubscription }}
    uiTestPattern: ${{ parameters.UITestPattern }}
    testFolderPath: ${{ parameters.TestFolderPath }}
    playwrightWorkspaceName: 'ppclientui'
    preTestTasks:
    - task: AzurePowerShell@5
      displayName: 'Create Config File'
      inputs:
        azureSubscription: ${{ parameters.azureSubscription }}
        azurePowerShellVersion: 'LatestVersion'
        ScriptType: 'InlineScript'
        Inline: |
          $testsFolder = Get-ChildItem -Path "$(Build.SourcesDirectory)" `
                                       -Filter ${{ parameters.TestFolderPath }} `
                                       -Recurse `
                                       | Select-Object -First 1

          cd $testsFolder.FullName

          $branchAlias = "$(branchAlias)"
          $BaseUrl = "https://allpay-uks-$(EnvironmentName)-appserv-ppclientui$(branchAlias).allpay-uks-$(EnvironmentName)-asev3.appserviceenvironment.net" 

          $configContent = @"
          export const config = {
            baseUrl: "$BaseUrl",
            username: "testuser1@allpay.net",
            password: "qwerty123@"
          };
          "@ 

          $configContent | Set-Content .\config.ts 
          Write-Host "Created config file : "
          Get-Content .\config.ts 
```

### Directly in a Test Stage

The same steps can be done in a test stage if the `preTestTasks` are limiting depending on what pipeline setup is needed, or if some specific flags are required to be passed to the test runner.

### Secrets & Environment Variables

While the 'testuser1' login details are not particularly sensitive, if we also had production user credentials or API keys (for making API requests from Playwright) these should not be stored in code, and would need to be passed either from:

- A library group variable stored as a secret and interpolated into the config file e.g. `"$(UiTestUserName)"`
- From an appropriate Azure resource like ACS, APIM or even Key Vault and accessed using Azure PowerShell

Consider whether the data is sensitive, and if so, how it should be stored and accessed.

## Azure Playwright Testing

Azure Playwright Testing is an Azure-hosted service allowing us to either run Playwright tests on Azure-hosted browsers, or host results from either local or pipeline tests.

### Connection

We configure one workspace per application per subscription, e.g. dev01adminhub, dev01ppclientui, qua01adminhub etc. Each workspace is connected to our tests through the `playwright.service.config.ts` file and a `PLAYWRIGHT_SERVICE_URL` environment variable, configured in the common template from the workspace name:

``` ts
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import { defineConfig } from '@playwright/test';
import config from './playwright.config';

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: false // Set to false if you want to only use reporting and not cloud hosted browsers
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [['list'], ['junit'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
```

### Access

Access is through your Microsoft account in the development tenancy. You may need to switch from the corporate tenancy when first accessing it.

### Reports

The main functionalilty we are currently using is the ability to view test results and traces from the Azure Playwright Testing service. This allows us to view the results of tests run on Azure-hosted browsers, or locally run tests which have been uploaded to the service.

When a run starts, the service will create a new run and provide a link to that run. Once the run has completed it will run any other reporters specificed (list, junit etc.) and then upload the results to the service.

You can then view the full results of the run, including the test results, screenshots, network logs, and any traces collected. This is particularly useful for debugging issues which may only occur on certain browsers or configurations.

### Devices

While we are not currently looking to use this functionality, Azure Playwright Testing also allows us to run tests on very large numbers of devices for highly parallel testing. This is particularly useful for testing on mobile devices or specific browser versions.

## Summary & References

This is a basic guide to the Playwright framework, and how to structure and write tests using it. There are many more features and options available, and would recommend reading the official Playwright documentation, as well as the other resources linked at the start of this document.

### TypeScript

- [TypeScript Documentation](https://www.TypeScriptlang.org/docs/)
- [TypeScript Handbook](https://www.TypeScriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.TypeScriptlang.org/play)

### Playwright

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Documentation](https://playwright.dev/docs/api/class-playwright)
- [Playwright GitHub Repo](https://github.com/microsoft/playwright)
- [Playwright DevDocs](https://devdocs.io/playwright/)
- [Microsoft Learn - Playwright](https://learn.microsoft.com/en-us/training/modules/build-with-playwright/)
- [Playwright Blog](https://dev.to/playwright)
- [Checkly Playwright Blog](https://www.checklyhq.com/learn/playwright/what-is-playwright/)
- [Playwright - Getting started - VS Code](https://playwright.dev/docs/getting-started-vscode)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration)

### Videos

- [Official Playwright Channel](https://www.youtube.com/@Playwrightdev)
- [Microsoft Playwright Introduction](https://www.youtube.com/watch?v=1yaqKDHhktI&pp=ygUUcGxheXdyaWdodCBtaWNyb3NvZnQ%3D)
- [Blazor App Testing with Playwright](https://www.youtube.com/watch?v=lJa3YlUliEs&pp=ygURcGxheXdyaWdodCBibGF6b3I%3D)
- [Testing Blazor Applications with Playwright](https://www.youtube.com/watch?v=VavFU2vLnT0&pp=ygURcGxheXdyaWdodCBibGF6b3I%3D)
- [PluralSight Playwright Foundations with Node.js](https://app.pluralsight.com/library/courses/playwright-nodejs-fundamentals/table-of-contents)
- [Commit Quality Playwright Playlist](https://www.youtube.com/playlist?list=PLXgRgGX8-5UVm9yioRY329rfcfy3MusiY)
- [Checkly Playwright Playlist](https://www.youtube.com/watch?v=OFoF-QTCRs0&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc)

### Accessibility

- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [axe-core github repo](https://github.com/dequelabs/axe-core)
- [axe-core npm repo](https://www.npmjs.com/package/@axe-core/react)

### Other

- [Performing E2E Testing In Blazor with Playwright](https://chrisdunderdale.medium.com/performing-end-to-end-testing-in-blazor-with-playwright-9ab8587f7c34)
