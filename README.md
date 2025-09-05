# pw-opencart

The purpose of the repository is to practice in Playwright automation testing. Opencart online store, set up locally, used to recreate real-life scenarios.

## Running tests

### Standalone

1. Install Playwright: <a href=https://playwright.dev/docs/intro#installing-playwright>official guide</a>
2. Run tests:

    npm run test-staging

### Docker

1. Generate image locally:

    docker build -t pw-opencart-tests .

2. (Optional) Run tests manually:

    docker run -it --rm pw-opencart-tests
    npm run test-staging

3. Run tests via docker-compose:

    docker-compose up && docker-compose rm -fs

## TODO
- move test passwords to secret storage
- separate buying steps from tests
- add unique identifier for eacg test run (for teardown)
