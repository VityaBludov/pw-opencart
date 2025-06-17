import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://172.18.73.229:80',
        actionTimeout: 10000,
    },

    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
})
