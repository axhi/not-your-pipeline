import React, {Component} from 'react';
import './box.css';

export class Box extends Component {
    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            Box for Tracker
        </div>
    }
}