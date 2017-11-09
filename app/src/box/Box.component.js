import React, {Component} from 'react';
import './box.css';
import {currentEnv} from '../config';
import moment from 'moment';

export class Box extends Component {
    constructor() {
        super();
        this.state = {};
        this.interval = setInterval(this.getMetrics.bind(this), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.getMetrics();
    }

    getMetrics() {
        return fetch(currentEnv.loader + '/tracker?apiKey=' + this.props.apiKey + '&projectId=' + this.props.projectId)
            .then((js) => js.json())
            .then((ob) => {
                this.setState({
                    storiesAccepted: ob.stories_accepted,
                    bugsCreated: ob.bugs_created,
                    cycleTime: moment.duration(ob.cycle_time).humanize(),
                    rejectionRate: ob.rejection_rate
                })
            });
    }

    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <div className='stories'>
                Stories Accepted: {this.state.storiesAccepted}
            </div>
            <div className='bugs'>
                Bugs Created: {this.state.bugsCreated}
            </div>
            <div className='cycle'>
                Cycle Time: {this.state.cycleTime}
            </div>
            <div className='rejection'>
                Rejection Rate: {this.state.rejectionRate}
            </div>
        </div>
    }
}