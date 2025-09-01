import { test as setup } from '../../fixtures/admin'
import { defaultUsers } from '../../resources/config'

const authFileSuperAdmin = '.auth/admin/storageStateSuperAdmin.json'
const authFileProductAdmin = '.auth/admin/storageStateProductAdmin.json'

setup('login as admin super user for tests', async ({ apiHandler }) => {
    process.env.TOKEN_ADMIN_SUPER = await apiHandler.login(defaultUsers.admin.superAdmin.username, defaultUsers.admin.superAdmin.password, authFileSuperAdmin)
})

setup('login as product admin for tests', async ({ apiHandler }) => {
    process.env.TOKEN_ADMIN_PRODUCT = await apiHandler.login(defaultUsers.admin.productAdmin.username, defaultUsers.admin.productAdmin.password, authFileProductAdmin)
})
