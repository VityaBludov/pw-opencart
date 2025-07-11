import { expect, test as setup } from '@playwright/test'
import { urls, RandomUser } from '../resources/helper'
import fs from 'fs'

const authFile = '.auth/user.json'
const user = new RandomUser()
// TODO: save user object globally if needed in tests. Use env variables?

setup('register user for tests', async ({ request }) => {
    const pageResponse = await request.get(urls.page.registration)
    expect(pageResponse.status(), 'GET registration page should return 200').toEqual(200)
    
    fs.writeFileSync(authFile, JSON.stringify(await request.storageState()))
    const registerToken = (await pageResponse.text()).match(/(?<=register_token=).{26}/)?.[0]

    const postResponse = await request.post(`${urls.endpoint.registration}${registerToken}`, {
        form: {
            firstname: `${user.firstName}`,
            lastname: `${user.lastName}`,
            email: `${user.email}`,
            password: `${user.password}`,
            newsletter: '1',
            agree: '1',
        }
    })
    expect(await postResponse.text(), 'POST register response should containg link to success page').toContain('route=account\\/success')
})
