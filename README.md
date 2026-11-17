# Enterprise Playwright Automation

This project is a Playwright and TypeScript UI automation suite for the Sauce Demo application. It uses the Page Object Model (POM) and includes login, product, cart, checkout, and CSV-driven checkout tests.

## Project goal

Validate the main Sauce Demo shopping workflows, including login, product sorting, cart management, checkout form validation, and order completion.

## Tech stack

- Playwright
- TypeScript
- Page Object Model (POM)
- `csv-parse` and `csv-stringify` for CSV test data and result summaries

## Project structure

```text
.
├── config/
│   ├── config.ts
│   └── secret.ts
├── src/
│   ├── apps/
│   │   └── saucedemo/
│   │       ├── SauceDemoBasePage.ts
│   │       ├── SauceDemoFacade.ts
│   │       └── pages/
│   │           ├── CartPage.ts
│   │           ├── CheckoutPage.ts
│   │           ├── LoginPage.ts
│   │           └── ProductPage.ts
│   ├── core/
│   │   └── BasePage.ts
│   ├── data/
│   │   └── saucedemo/
│   │       └── checkout-cases.csv
│   └── utils/
│       ├── csvReader.ts
│       └── writeCSV.ts
├── tests/
│   └── saucedemo/
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       ├── data-driven.spec.ts
│       ├── login.spec.ts
│       └── product.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

Playwright reports and test results are generated under `playwright-report/` and `test-results/`; these output folders are ignored by Git.

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

TypeScript, `csv-parse`, and `csv-stringify` are already listed in `package.json`. The project includes `tsconfig.json`, so `npm install` installs the required packages without needing to initialize TypeScript again.

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
npx playwright test tests/saucedemo/login.spec.ts
```

### Run the CSV-driven checkout tests

```bash
npx playwright test tests/saucedemo/data-driven.spec.ts
```

### Run with UI mode

```bash
npx playwright test --ui
```

### View HTML report

```bash
npx playwright show-report
```

The CSV-driven checkout cases are defined in `src/data/saucedemo/checkout-cases.csv`. Each row becomes a test case, and the run writes a timestamped result summary to `test-results/saucedemo/`. Named workflow steps are visible in the Playwright HTML report.

## Configuration

The project uses `playwright.config.ts` for browser configuration, retry strategy, timeouts, reporting, and global test settings. The `config/` directory contains the application URL and Sauce Demo test credentials.

Important note:

- Public or low-risk test accounts can be stored in config files for demo purposes.
- Real credentials should be loaded from environment variables or a secure secret manager in production and never committed to source control.

## Testing approach

The project separates tests, page objects, shared browser helpers, and CSV utilities:

- `tests/`: end-to-end scenarios written for business flows
- `src/apps/.../pages`: page-specific selectors and actions
- `src/apps/.../SauceDemoFacade.ts`: access to the application page objects
- `src/core/BasePage.ts`: shared browser helper methods
- `src/utils/`: CSV input and result-summary helpers
- `src/data/saucedemo/`: CSV test data
- `config/`: environment and test setup values

## Portfolio use-case

This repository demonstrates:

- Page Object Model organization
- Reusable page-level actions and assertions
- CSV-driven test scenarios
- Playwright HTML reporting and trace capture on failure

## Future enhancements

This project can be expanded with:

- API testing with `fetch` or dedicated API clients
- Extend the framework to support additional web applications and API testing as the portfolio grows
- Data-driven test scenarios
- Test result dashboards and artifacts

## License

This project is for demonstration and portfolio purposes.
