import { expect, test as setup } from '@playwright/test'
import { mysqlQuery } from '../resources/helper'
import fs from 'fs'

const productsFile = '.db/products.json'
const getProductsQuery = 'SELECT pd.`name` FROM product p LEFT JOIN product_description pd ON p.product_id = pd.product_id WHERE p.quantity > 0 AND p.`status` = 1 LIMIT 1000;'

setup('prepare list of available products for shopping tests', async ({}) => {
    const products = await mysqlQuery(getProductsQuery)
    expect(products, 'Products array should not be empty').toBeTruthy()
    fs.writeFileSync(productsFile, JSON.stringify(products))
})
