import React, {Component} from 'react';
import './app.css';
import {Box} from "../box/Box.component";
import {BoxFrame} from "../box/BoxFrame.component";

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hasFocus: null
        }
    }

    componentDidMount() {
        // this.checkForError();
        // this.interval = setInterval(this.checkForError.bind(this), 1000);
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

        Promise.all(fetchRequests.map((box) => {
            return this.completeRequest(box.getElementsByTagName('iframe')[0].src)
        })).then((e) => {
            return e.map((z, i) => {
                return {
                    key: fetchRequests[i],
                    length: z.filter((x) => (x.finished_build && (x.finished_build.status === "failed" || x.finished_build.status === "errored"))).length
                }
            });
        }).then((newThing) => {
            newThing.forEach((n) => {
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
        if (this.state.hasFocus) {
            return <BoxFrame id={this.state.hasFocus.id}
                             class={'box-element full'}
                             src={this.state.hasFocus.src}/>
        }

        return <span>
            <BoxFrame id="pipeline-1"
                      class={'box-element'}
                      src="http://54.174.113.230:8080/teams/main/pipelines/not-your-pipeline?groups=dev"/>
            <BoxFrame id="pipeline-2"
                      class={'box-element quarter'}
                      half={true}
                      src="http://54.174.113.230:8080/teams/main/pipelines/not-your-pipeline?groups=prod"/>
            <Box id="tracker-1"
                 class={'box-element quarter'}
                 half={true}/>
        </span>
    }

    render() {
        return (
            <div className="app" ref='app'>
                {this.displayBoxes()}
            </div>
        );
    }
}

export default App;
