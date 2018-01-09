let ENV_SETTINGS = {
    local: {
        loader: 'http://localhost:8675'
    },
    dev: {
        loader: 'https://not-your-loader-dev.cfapps.io'
    },
    prod: {
        loader: 'https://not-your-loader.cfapps.io'
    },
    test: {
        loader: 'http://test.com'
    }
};
export let currentEnv = ENV_SETTINGS[process.env.REACT_APP_ENV || 'test'];