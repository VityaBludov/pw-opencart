import { expect, test as setup } from '@playwright/test'
import { defaultUsers, urls } from '../resources/helper'

const authFileSuperAdmin = '.auth/admin/storageStateSuperAdmin.json'

setup('login as admin super user for tests', async ({ page, request }) => {
    const pageResponse = await request.get(urls.admin.home)
    expect(pageResponse.status(), 'GET admin home page should return 200').toEqual(200)
    
    const loginToken = (await pageResponse.text()).match(/(?<=login_token=).{32}/)?.[0]
    const sessionId = pageResponse.headers()['set-cookie'].match(/(?<=OCSESSID=).{26}/)?.[0]

    const postResponse = await request.post(`${urls.admin.login}${loginToken}`, {
        form: {
            username: `${defaultUsers.admin.superAdmin.username}`,
            password: `${defaultUsers.admin.superAdmin.password}`
        },
        headers: { Cookie: `OCSESSID=${sessionId}`}
    })
    expect(await postResponse.text(), 'POST login response should containg link to dashboard page').toContain('route=common\\/dashboard')
    process.env.TOKEN_ADMIN_SUPER = (await postResponse.text()).match(/(?<=user_token=).{32}/)?.[0]
    await request.storageState({ path: authFileSuperAdmin })
})
