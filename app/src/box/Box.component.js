import {Component} from 'react';

export class Box extends Component {
    constructor() {
        super();
        this.state = {};
    }

    reset() {
        this.props.callback(this.props.number, null, null);
    }
}