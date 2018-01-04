import React, {Component} from 'react';
import '../boxFrame/box.css';
import moment from 'moment';

export class ProdPush extends Component {
    constructor() {
        super();
        this.state = {};
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

    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <h3>Days Since Last Push</h3>
            {this.displayProdPush()}
        </div>
    }

    displayProdPush() {
        return <div className='days-since'>{this.state.daysSinceLastPush}</div>
    }
}