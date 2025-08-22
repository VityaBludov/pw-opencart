import { APIRequestContext, expect } from '@playwright/test'
import { urls } from '../../resources/helper'

export class ApiPage {
    readonly request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    /**
     * Logs admin user in, using API requests
     * @param username 
     * @param password 
     * @param targetFile 
     * @returns user token
     */
    async login(username: string, password: string, targetFile: string): Promise<string> {
        const pageResponse = await this.request.get(urls.admin.home)
        expect(pageResponse.status(), 'GET admin home page should return 200').toEqual(200)
        
        const loginToken = (await pageResponse.text()).match(/(?<=login_token=).{32}/)?.[0]
        const sessionId = pageResponse.headers()['set-cookie'].match(/(?<=OCSESSID=).{26}/)?.[0]
    
        const postResponse = await this.request.post(`${urls.admin.login}${loginToken}`, {
            form: {
                username: `${username}`,
                password: `${password}`
            },
            headers: { Cookie: `OCSESSID=${sessionId}`}
        })
        expect(await postResponse.text(), 'POST login response should containg link to dashboard page').toContain('route=common\\/dashboard')
        const token = (await postResponse.text()).match(/(?<=user_token=).{32}/)?.[0]
        await this.request.storageState({ path: targetFile })

        return token ? token : ''
    }
}
