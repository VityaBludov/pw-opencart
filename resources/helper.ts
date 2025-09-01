import { faker } from '@faker-js/faker'
import mysql from 'mysql2/promise'
import { mysqlParameters, testValues, urls } from './config'

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
