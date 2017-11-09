import React, {Component, createElement} from 'react';
import './app.css';
import {Box} from "../box/Box.component";
import {BoxFrame} from "../box/BoxFrame.component";
import {InputBox} from "../inputBox/InputBox.component";

const components = {
    "BoxFrame": BoxFrame,
    "Box": Box
};

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasFocus: null,
            topLeft: null,
            bottomLeft: null,
            bottomRight: null
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
                        id: n.key.id,
                        src: n.key.getElementsByTagName('iframe')[0].src
                    }
                }
            });
        }).then(() => {
            this.setState({hasFocus: focusObject});
        });
    }

    displayBoxes() {
        if (!this.state.hasFocus) {
            return <span>
                {this.displayTopLeftBox()}
                {this.displayBottomLeftBox()}
                {this.displayBottomRightBox()}
                </span>
        }
    }

    displayMainBox() {
        if (this.state.hasFocus) {
            return <BoxFrame id={this.state.hasFocus.id}
                             class={'box-element full'}
                             src={this.state.hasFocus.src}/>
        }
    }

    displayTopLeftBox() {
        if (!this.state.topLeft) {
            return <InputBox callback={this.setBoxState.bind(this)}
                             position='topLeft'/>;
        }

        return createElement(components[this.state.topLeft.type],
            this.state.topLeft.data);
    }

    displayBottomLeftBox() {
        if (!this.state.bottomLeft) {
            return <InputBox callback={this.setBoxState.bind(this)}
                             position='bottomLeft'/>;
        }

        return createElement(components[this.state.bottomLeft.type],
            this.state.bottomLeft.data);
    }

    displayBottomRightBox() {
        if (!this.state.bottomRight) {
            return <InputBox callback={this.setBoxState.bind(this)}
                             position='bottomRight'/>;
        }

        return createElement(components[this.state.bottomRight.type],
            this.state.bottomRight.data);
    }

    setBoxState(level, type, data) {
        this.setState({[level]: {type: type, data: data}});
    }

    render() {
        return (
            <div className="app" ref='app'>
                {this.displayBoxes()}
                {this.displayMainBox()}
            </div>
        );
    }
}

export default App;
