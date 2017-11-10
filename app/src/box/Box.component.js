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
                if (ob.error) {
                    clearInterval(this.interval);
                    this.setState({error: ob.error});
                } else {
                    this.setState({
                        storiesAccepted: ob.stories_accepted,
                        bugsCreated: ob.bugs_created,
                        cycleTime: moment.duration(ob.cycle_time).humanize(),
                        rejectionRate: ob.rejection_rate,
                        start: moment(ob.start).format('M/D/YYYY'),
                        finish: moment(ob.finish).format('M/D/YYYY')
                    });
                }
            });
    }

    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            {this.displayAnalytics()}
        </div>
    }

    displayAnalytics() {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.start) {
            return <span>
                <h3>Iteration: {this.state.start} - {this.state.finish}</h3>
            <div className='stories'>
                Stories Accepted: {this.state.storiesAccepted | 0}
            </div>
            <div className='bugs'>
                Bugs Created: {this.state.bugsCreated | 0}
            </div>
            <div className='cycle'>
                Cycle Time: {this.state.cycleTime}
            </div>
            <div className='rejection'>
                Rejection Rate: {this.state.rejectionRate | 0}
            </div>
            </span>
        }
    }
}