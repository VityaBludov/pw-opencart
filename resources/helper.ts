import { faker } from '@faker-js/faker'
import mysql from 'mysql2/promise'

export const urls = {
    page: {
        home: '/index.php',
        registration: '/index.php?route=account/register&language=en-gb',
        accountCreated: '/index.php?route=account/success&language=en-gb&customer_token=',
        account: '/index.php?route=account/account&language=en-gb&customer_token=',
        checkout: '/index.php?route=checkout/checkout&language=en-gb',
    },
    endpoint: {
        registration: '/index.php?route=account/register.register&language=en-gb&register_token=',
        cartInfo: '/index.php?route=common/cart.info&language=en-gb'
    },
    testData: {
        emailDomain: 'test.com',
    },
    admin: {
        home: '/admin/index.php',
        login: '/admin/index.php?route=common/login.login&login_token=',
        dashboard: '/admin/index.php?route=common/dashboard&user_token=',
        users: '/admin/index.php?route=user/user&user_token=',
        addUser: '/admin/index.php?route=user/user.form&user_token='
    },
}

export const defaultUsers = {
    admin: {
        superAdmin: {
            username: 'admin',
            password: 'admin',    // TODO: move to secret
        },
        productAdmin: {
            username: 'productAdmin',
            password: '123123',   // TODO: move to secret
        }
    },
}

export const mysqlParameters = {
    host: '172.18.73.229',        // TODO: replace with env-dependent variable
    port: 3306,
    user: 'pw',
    password: 'pw',               // TODO: move to secret
    database: 'opencartdb'
}

export const testValues = {
    timeouts: {
        short: 5000,
        medium: 10000,
        long: 20000
    }
}

/**
 * User with fake random name and email address
 */
export class RandomUser {
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly password: string

    constructor() {
        this.firstName = faker.person.firstName()
        this.lastName = faker.person.lastName()
        this.email = `${this.firstName}.${this.lastName}${faker.number.int(1000)}@${urls.testData.emailDomain}`
        this.password = faker.internet.password({ length: 8 })
    }
}

/**
 * Connects to mySQL database and executes required query
 * @param query - string containing query to execute
 * @returns array of objects, containing query results
 */
export async function mysqlQuery(query: string) {
    const connection = await mysql.createConnection({
        host: mysqlParameters.host,
        port: mysqlParameters.port,
        user: mysqlParameters.user,
        password: mysqlParameters.password,
        database: mysqlParameters.database,
        connectTimeout: testValues.timeouts.long        // reverse resolution takes ~10s for unknown reason, extended timeout in case of missing record in WSL's hosts
    })

    try {
        const [results, fields] = await connection.query(query)
        await connection.end()
        return results
    } catch (err) {
        console.log(err)
    }
}

/**
 * 
 * @param array 
 * @returns random element from array
 */
export function randomElement(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
}
