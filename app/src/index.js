import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./main/App";
import {currentEnv} from "./config";

ReactDOM.render(<App currentEnv={currentEnv} />, document.getElementById('root'));
registerServiceWorker();