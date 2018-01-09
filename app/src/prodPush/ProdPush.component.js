import React from 'react';
import '../boxFrame/box.css';
import moment from 'moment';
import {Box} from "../box/Box.component";

export class ProdPush extends Box {
    constructor() {
        super();
        this.daysPushInterval = setInterval(this.getDaysSincePush.bind(this), 100000);
    }

    componentWillUnmount() {
        clearInterval(this.daysPushInterval);
    }

    componentDidMount() {
        this.getDaysSincePush();
    }

    getDaysSincePush() {
        this.setState({daysSinceLastPush: moment().diff(moment(this.props.prodDate), 'days')})
    }

    displayProdPush() {
        return <div className='days-since'>{this.state.daysSinceLastPush}</div>
    }

    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <span className="reset" onClick={this.reset.bind(this)}>X</span>
            <h3>Days Since Last Push</h3>
            {this.displayProdPush()}
        </div>
    }
}