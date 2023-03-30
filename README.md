[![Playwright Tests](https://github.com/jameskip/gaws/actions/workflows/playwright.yml/badge.svg)](https://github.com/jameskip/gaws/actions/workflows/playwright.yml)

# gaws

#### Core user flow: [Swag Labs](https://www.saucedemo.com/)

- [x] Login
- [x] Unsuccessful login with locked out user
- [x] Single product & checkout
- [x] Multiple product & checkout
- [x] Sort inventory
- [x] Remove item from cart

#### CRUD `/pet`: [Swagger Petstore](https://petstore.swagger.io/)

- [x] Create pet
- [x] Read pet
- [x] Update pet
- [x] Delete pet

### Install

```bash
npm install
```

### Run tests

```bash
npm test
```

### View report

```bash
npx playwright show-report
```

### Create snapshots

To emulate your CI Linux box and generate snapshots

```bash
docker run -v $(pwd):/gaws mcr.microsoft.com/playwright:v1.32.1-focal bash -c 'cd gaws && npm run test'
```
