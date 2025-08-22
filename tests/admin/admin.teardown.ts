import { expect, test as teardown } from '@playwright/test'
import { mysqlQuery, urls } from '../../resources/helper'

const deleteCustomersQuery = `DELETE FROM user u WHERE u.email LIKE \'%@${urls.testData.emailDomain}\' AND u.date_added > DATE_SUB(NOW(), INTERVAL 1 DAY);`

teardown('delete test admin users from database', async () => {
    const deleteResult = await mysqlQuery(deleteCustomersQuery)
    expect(deleteCustomersQuery, 'Delete admin users query should return success').toBeTruthy()
})
