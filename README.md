[![Playwright Tests](https://github.com/jameskip/gaws/actions/workflows/playwright.yml/badge.svg)](https://github.com/jameskip/gaws/actions/workflows/playwright.yml)

# gaws

#### Core user flow: [Swag Labs](https://www.saucedemo.com/)
- [x] Login & Checkout
- [x] Single product & checkout
- [x] Multiple product & checkout

#### CRUD `/pet`: [Swagger Petstore](https://petstore.swagger.io/)
 - [x] Create & Delete pet
 - [x] Lookup pet


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
