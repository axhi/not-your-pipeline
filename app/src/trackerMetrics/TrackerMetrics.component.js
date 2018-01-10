import React from 'react';
import '../boxFrame/box.css';
import {currentEnv} from '../config';
import moment from 'moment';
import {Box} from "../box/Box.component";

export class TrackerMetrics extends Box {
    constructor() {
        super();
        this.metricsInterval = setInterval(this.getMetrics.bind(this), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.metricsInterval);
    }

    componentDidMount() {
        this.getMetrics();
    }

    getMetrics() {
        return fetch(currentEnv.loader + '/tracker?apiKey=' + this.props.apiKey + '&projectId=' + this.props.projectId)
            .then((js) => js.json())
            .then((ob) => {
                if (ob.error) {
                    clearInterval(this.metricsInterval);
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

    displayAnalytics() {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.start) {
            return <span>
                <h3>Iteration: {this.state.start} - {this.state.finish}</h3>
            <div className='stories'>
                <span>Stories Accepted:</span> {this.state.storiesAccepted | 0}
            </div>
            <div className='bugs'>
                <span>Bugs Created:</span> {this.state.bugsCreated | 0}
            </div>
            <div className='cycle'>
                <span>Cycle Time:</span> {this.state.cycleTime}
            </div>
            <div className='rejection'>
                <span>Rejection Rate:</span> {this.state.rejectionRate | 0}
            </div>
            </span>
        }
    }

    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <span className="reset" onClick={this.reset.bind(this)}>X</span>
            {this.displayAnalytics()}
        </div>
    }
}