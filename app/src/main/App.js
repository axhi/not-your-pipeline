import React, {Component, createElement} from 'react';
import './app.css';
import {BoxFrame} from "../boxFrame/BoxFrame.component";
import {InputBox} from "../inputBox/InputBox.component";
import {TrackerMetrics} from "../trackerMetrics/TrackerMetrics.component";
import {ProdPush} from "../prodPush/ProdPush.component";

const components = {
    "BoxFrame": BoxFrame,
    "TrackerMetrics": TrackerMetrics,
    "ProdPush": ProdPush
};

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasFocus: null,
            0: null,
            1: null,
            2: null,
            3: null
        };
        this.interval = setInterval(this.checkForError.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    completeRequest(url) {
        return fetch(this.props.currentEnv.loader + '/url?go=' + url)
            .then((js) => js.json());
    }

    checkForError() {
        this.fetchPipelineErrors()
            .then((e) => {
                if (e) {
                    return this.setState({hasFocus: e});
                } else {
                    return this.setState({hasFocus: this.fetchProdPushErrors()})
                }
            });
    }

    fetchProdPushErrors() {
        const boxes = this.refs.app.getElementsByClassName('box-element');

        let fetchRequests = [];
        let focusObject = null;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].id.startsWith('prodPush')) {
                fetchRequests.push(boxes[i]);
            }
        }

        fetchRequests.forEach((e) => {
            if (Number(e.getElementsByClassName('days-since')[0].innerHTML) > 14) {
                focusObject = {
                    id: Number(e.getAttribute('id').split('-')[1])
                };
            }
        });

        return focusObject;
    }

    fetchPipelineErrors() {
        const boxes = this.refs.app.getElementsByClassName('box-element');

        let fetchRequests = [];
        let focusObject = null;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].id.startsWith('pipeline')) {
                fetchRequests.push(boxes[i]);
            }
        }

        return Promise.all(fetchRequests.map((box) => {
            return this.completeRequest(box.getElementsByTagName('iframe')[0].src)
        })).then((e) => {
            return e.map((z, i) => {
                return {
                    key: fetchRequests[i],
                    length: z.filter((x) => (x.finished_build
                        && (x.finished_build.status === "failed"
                            || x.finished_build.status === "errored")))
                        .length
                }
            });
        }).then((z) => {
            z.forEach((n) => {
                if (n.length) {
                    focusObject = {
                        id: n.key.id.split('-')[1],
                        src: n.key.getElementsByTagName('iframe')[0].src
                    }
                }
            });
        }).then(() => {
            return focusObject;
        });
    }

    displayBoxes() {
        if (!this.state.hasFocus) {
            return <span>
                {this.displayBoxComponents(0, 'topLeft')}
                {this.displayBoxComponents(1, 'bottom')}
                {this.displayBoxComponents(2, 'bottom')}
                </span>
        }
    }

    displayMainBox() {
        if (this.state.hasFocus) {
            this.state[this.state.hasFocus.id].data =
                Object.assign(this.state[this.state.hasFocus.id].data, {class: "box-element full", src: this.state.hasFocus.src});
            return createElement(components[this.state[this.state.hasFocus.id].type],
                this.state[this.state.hasFocus.id].data);
        }
    }

    displayBoxComponents(keyObj, position) {
        if (!this.state[keyObj]) {
            return <InputBox callback={this.setBoxState.bind(this)}
                             number={keyObj}
                             position={position}/>;
        }

        return createElement(components[this.state[keyObj].type],
            this.state[keyObj].data);
    }

    setBoxState(level, type, data) {
        this.setState({[level]: {type: type, data: data}});
    }

    render() {
        return (
            <div className="app" ref='app'>
                <div className='logo' />
                {this.displayBoxes()}
                {this.displayMainBox()}
            </div>
        );
    }
}

export default App;
