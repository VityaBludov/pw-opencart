import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'html',

    use: {
        baseURL: 'http://172.18.73.229:80',
        actionTimeout: 10000,
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
            name: 'admin setup',
            testMatch: 'adminLogin.setup.ts',
        },
        {
            name: 'shopping',
            testMatch: 'shopping.spec.ts',
            use: {
                ...devices['Desktop Firefox'],
                storageState: '.auth/storageState.json',
            },
            dependencies: ['registration setup', 'prepare products'],
        },
        {
            name: 'account',
            testMatch: 'account.spec.ts',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'admin',
            testMatch: 'admin.spec.ts',
            use: {
                ...devices['Desktop Firefox'],
            },
            dependencies: ['admin setup'],
        },
    ],
})
