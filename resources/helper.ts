import { faker } from '@faker-js/faker'
import mysql from 'mysql2/promise'

export const urls = {
    page: {
        home: '/index.php',
        registration: '/index.php?route=account/register&language=en-gb',
        accountCreated: '/index.php?route=account/success&language=en-gb&customer_token=',
        account: '/index.php?route=account/account&language=en-gb&customer_token=',
    },
    endpoint: {
        registration: '/index.php?route=account/register.register&language=en-gb&register_token='
    },
    testData: {
        emailDomain: 'test.com',
    }
}

export const mysqlParameters = {
    host: '172.18.73.229',  // TODO: replace with variable
    port: 3306,
    user: 'pw',
    password: 'pw',         // TODO: move to secret
    database: 'opencartdb'
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
        database: mysqlParameters.database
    })

    try {
        const [results, fields] = await connection.query(query)
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
