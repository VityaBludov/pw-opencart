import { faker } from '@faker-js/faker'

export const config = {
    address: {
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

export class RandomUser {
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly password: string

    constructor() {
        this.firstName = faker.person.firstName()
        this.lastName = faker.person.lastName()
        this.email = `${this.firstName}.${this.lastName}${faker.number.int(1000)}@${config.testData.emailDomain}`
        this.password = faker.internet.password({ length: 8 })
    }
}
