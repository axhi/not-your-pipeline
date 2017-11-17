import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./main/App";
import notYourPipeline from "./index.reducers";
import {createStore} from 'redux'

let store = createStore(notYourPipeline);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();