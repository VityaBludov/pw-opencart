import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'html',

    use: {
        baseURL: 'https://fake-production.test.com',
        actionTimeout: 5000,
    },

    projects: [
        {
            name: 'registration setup',
            testMatch: 'registration.setup.ts',
        },
        {
            name: 'prepare products',
            testMatch: 'prepareProducts.setup.ts'
        },
        {
            name: 'chromium',
            testIgnore: 'account.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/storageState.json',
            },
            dependencies: ['registration setup', 'prepare products'],
        },
        {
            name: 'chromium no auth',
            testMatch: 'account.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
})
