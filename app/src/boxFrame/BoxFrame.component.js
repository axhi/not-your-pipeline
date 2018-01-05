import React, {Component} from 'react';
import './box.css';

export class BoxFrame extends Component {
    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <iframe frameBorder="0"
                    src={this.props.src}
                    width="100%"
                    title={this.props.id}
                    height="100%"
            />
        </div>
    }
}