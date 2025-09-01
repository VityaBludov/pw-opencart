import { expect, test as teardown } from '@playwright/test'
import { mysqlQuery } from '../../resources/helper'
import { urls } from '../../resources/config'

const deleteCustomersQuery = `DELETE FROM customer c WHERE c.email LIKE \'%@${urls.testData.emailDomain}\' AND c.date_added > DATE_SUB(NOW(), INTERVAL 1 DAY);`

teardown('delete test customers from database', async () => {
    const deleteResult = await mysqlQuery(deleteCustomersQuery)
    expect(deleteCustomersQuery, 'Delete customers query should return success').toBeTruthy()
})
