import React, {Component} from 'react';
import './inputBox.css';

const classMappings = {
    topLeft: {
        class: 'box-element',
        id: 1,
        frameClass: 'quarter-box box'
    },
    bottomLeft: {
        class: 'box-element quarter',
        half: true,
        id: 2,
        frameClass: 'quarter-box'
    },
    bottomRight: {
        class: 'box-element quarter',
        half: true,
        id: 3,
        frameClass: 'quarter-box'
    },
    pipeline: 'BoxFrame',
    tracker: 'Box'
};

export class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'pipeline',
            src: '',
            apiKey: '',
            projectId: ''
        };
    }

    handleChange(event, type) {
        this.setState({[type]: event.target.value});
    }

    handleSubmit() {
        const classMappingType = classMappings[this.props.position];
        this.props.callback(this.props.position,
            classMappings[this.state.type], {
                class: classMappingType.class,
                half: classMappingType.half,
                id: this.state.type + '-' + classMappingType.id,
                src: this.state.src,
                apiKey: this.state.apiKey,
                projectId: this.state.projectId
            });
    }

    render() {
        return <div className={classMappings[this.props.position].frameClass}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <select value={this.state.type}
                        onChange={(e) => this.handleChange(e, 'type')}>
                    <option value="pipeline">Concourse</option>
                    <option value="tracker">Pivotal Tracker</option>
                </select>
                {this.displayConcourse()}
                {this.displayTracker()}
                <input type="submit" value="Submit" disabled={this.isComplete() ? '' : 'true'}/>
            </form>
        </div>
    }

    displayConcourse() {
        if (this.state.type === 'pipeline') {
            return <input type='text'
                          id='src-box'
                          value={this.state.src}
                          onChange={(e) => this.handleChange(e, 'src')}
                          placeholder='Concourse url'/>
        }
    }

    displayTracker() {
        if (this.state.type === 'tracker') {
            return <div>
                <input type='text'
                       id='api-box'
                       value={this.state.apiKey}
                       onChange={(e) => this.handleChange(e, 'apiKey')}
                       placeholder='Tracker Key'/>
                <input type='text'
                       id='api-tracker-id'
                       value={this.state.projectId}
                       onChange={(e) => this.handleChange(e, 'projectId')}
                       placeholder='Tracker Project Id'/>
            </div>
        }
    }

    isComplete() {
        return (this.state.type === 'tracker' && (this.state.apiKey && this.state.projectId))
            || (this.state.type === 'pipeline' && this.state.src)
    }
}