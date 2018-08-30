import React from 'react';
import { Node } from './components/node';

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
    }

    render() {
        return (
            <div>
                <canvas height={window.innerHeight} width={window.innerWidth} ref={this.canvasRef} style={{position: 'absolute', zIndex:-100 }}/>
                <Node id="1" canvasRef={this.canvasRef}/>
                <Node id="2" />
            </div>
        );
    }
}