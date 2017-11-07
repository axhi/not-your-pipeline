import React, {Component} from 'react';
import Iframe from 'react-iframe';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className='box-element'>
                    <Iframe url="http://54.174.113.230:8080/teams/main/pipelines/not-your-pipeline?groups=dev"
                            height="100%"
                            position="relative"/>
                </div>
                <div className='box-element'>
                    <Iframe url="http://54.174.113.230:8080/teams/main/pipelines/not-your-pipeline?groups=prod"
                            position="relative"/>
                </div>
            </div>
        );
    }
}

export default App;
