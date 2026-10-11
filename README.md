# ESPN Playwright Automation

A Playwright automation framework for testing ESPN search functionality (players, teams, etc).

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# Run a specific test file
npx playwright test tests/searchTests.spec.ts
```

## Project Structure

├── tests/             # Test specifications
├── pages/             # Page Object Model classes
├── fixtures/          # Custom Playwright fixtures
├── node_modules/      # Installed dependencies
├── package.json       # Project manifest
├── playwright.config.ts # Playwright configuration
└── README.md          # Project documentation