import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./main/App";

let ENV_SETTINGS = {
    local: {
        loader: 'http://localhost:8080'
    },
    dev: {
        loader: 'https://not-your-loader-dev.cfapps.io'
    },
    prod: {
        loader: 'https://not-your-loader.cfapps.io'
    }
};
let currentEnv = ENV_SETTINGS[process.env.REACT_APP_ENV || 'local'];

ReactDOM.render(<App currentEnv={currentEnv} />, document.getElementById('root'));
registerServiceWorker();