import React from 'react';
import './box.css';
import {Box} from "../box/Box.component";

export class BoxFrame extends Box {
    render() {
        return <div className={this.props.class}
                    id={this.props.id}>
            <span className="reset" onClick={this.reset.bind(this)}>X</span>
            <iframe frameBorder="0"
                    src={this.props.src}
                    width="100%"
                    title={this.props.id}
                    height="100%"
            />
        </div>
    }
}