# Enterprise Playwright Automation

This project is a Playwright + TypeScript automation suite designed as a portfolio-ready example for enterprise-grade web and API testing. It demonstrates a structured approach to test automation across multiple web applications, reusable page objects, configuration management, and validation flows that are commonly required in real-world QA engineering teams.

## Project goal

Build a clean, scalable, and maintainable automation framework that can be used to validate:

- Multi-application enterprise web workflows
- Authentication and authorization flows
- UI regression and functional checks
- API validation
- Reusable test architecture for growing product ecosystems

## Tech stack

- Playwright
- TypeScript
- Page Object Model (POM)

## Why this project matters

This repository is intended to showcase how to build automation for modern enterprise environments where teams often need to test:

- Multiple business applications and portals
- Complex user journeys across pages and modules
- Reusable components and page abstractions
- API endpoints alongside UI flows
- Secure configuration handling for credentials and environment settings

## Project structure

```text
.
├── config/
│   ├── config.ts
│   └── secret.ts
├── src/
│   ├── apps/
│   │   └── saucedemo/
│   │       ├── pages/
│   │       ├── SauceDemoBasePage.ts
│   │       ├── SauceDemoFacade.ts
│   │       └── ...
│   ├── core/
│   │   └── BasePage.ts
│   └── data/
├── tests/
│   ├── example.spec.ts
│   └── sd-login.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
├── playwright-report/
├── test-results/
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Initialize TypeScript and CSV support

Run these commands when setting up the project for the first time:

```bash
npm install --save-dev typescript
npx tsc --init
npm install --save-dev csv-parse
npm install --save-dev csv-stringify
```

The TypeScript and CSV parser dependencies are saved in `package.json`. The `tsc --init` command creates a `tsconfig.json` file.

### Install Playwright browsers

```bash
npx playwright install
```

## Running tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/sd-login.spec.ts
```

### Run with UI mode

```bash
npx playwright test --ui
```

### View HTML report

```bash
npx playwright show-report
```

## Configuration

The project uses `playwright.config.ts` for browser configuration, retry strategy, timeout settings, reporters, and global test settings. The `config/` directory is used to separate environment URLs and credentials from tests and page objects.

Important note:

- Public or low-risk test accounts can be stored in config files for demo purposes.
- Real credentials should be loaded from environment variables or a secure secret manager in production and never committed to source control.

## Testing approach

This project follows a maintainable automation structure:

- `tests/`: end-to-end scenarios written for business flows
- `src/apps/.../pages`: page-specific selectors and actions
- `src/apps/.../SauceDemoFacade.ts`: a high-level app abstraction for reuse
- `src/core/BasePage.ts`: shared browser helper methods
- `config/`: environment and test setup values

This structure makes it easier to scale when multiple websites, modules, or APIs are added to the portfolio project.

## Portfolio use-case

This repository is intentionally structured to demonstrate strong QA automation skills expected in enterprise environments:

- Clear folder organization
- Reusable page objects
- Centralized configuration
- Support for multi-scenario testing
- Easy extension for additional applications and APIs
- Organized reporting and execution flow

## Future enhancements

This project can be expanded with:

- API testing with `fetch` or dedicated API clients
- Environment-based config (`dev`, `staging`, `prod`)
- CI/CD integration with GitHub Actions or Azure DevOps
- Data-driven test scenarios
- Test result dashboards and artifacts
- Cross-browser and mobile coverage

## License

This project is for demonstration and portfolio purposes.
