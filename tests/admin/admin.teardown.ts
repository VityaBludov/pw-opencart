import { expect, test as teardown } from '@playwright/test'
import { mysqlQuery, urls } from '../../resources/helper'

const deleteCustomersQuery = `DELETE FROM user u WHERE u.email LIKE \'%@${urls.testData.emailDomain}\' AND u.date_added > DATE_SUB(NOW(), INTERVAL 1 DAY);`
const deleteProductsQuery  = 'DELETE FROM product p WHERE p.model LIKE \'testProduct%\' AND p.date_added > DATE_SUB(NOW(), INTERVAL 1 DAY);'

// TODO: update assertions so that DB response to be parsed

teardown('delete test admin users from database', async () => {
    const deleteResult = await mysqlQuery(deleteCustomersQuery)
    expect(deleteResult, 'Delete admin users query should return success').toBeTruthy()
})

teardown('delete test products', async () => {
    const deleteResult = await mysqlQuery(deleteProductsQuery)
    expect(deleteResult, 'Delete test products query should return success').toBeTruthy()
})
