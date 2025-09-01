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
        cartInfo: '/index.php?route=common/cart.info&language=en-gb',
        admin: {
            manufacturers: '/admin/index.php?route=catalog/manufacturer.autocomplete&user_token=',
            categories: '/admin/index.php?route=catalog/category.autocomplete&user_token=',
            images: '/admin/index.php?route=common/filemanager.list&user_token=',
            products: '/admin/index.php?route=catalog/product.save&user_token='
        },
    },
    testData: {
        emailDomain: 'test.com',
    },
    admin: {
        home: '/admin/index.php',
        login: '/admin/index.php?route=common/login.login&login_token=',
        dashboard: '/admin/index.php?route=common/dashboard&user_token=',
        users: '/admin/index.php?route=user/user&user_token=',
        addUser: '/admin/index.php?route=user/user.form&user_token=',
        products: '/admin/index.php?route=catalog/product&user_token=',
        addProduct: '/admin/index.php?route=catalog/product.form&user_token=',
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
