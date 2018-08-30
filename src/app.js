import React from 'react';
import { Node } from './components/node';
import { NodeConnectors } from './components/node-connectors';

export class App extends React.Component {

    state = {
        nodes: [
            {location: {x:0, y: 0}}, 
            {location: {x:0, y: 0}}, 
            {location: {x:0, y: 0}}
        ],
        nodeConnections: [{nodeFrom: 0, nodeTo: 1},{nodeFrom: 1, nodeTo: 2}]
    };

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
    }

    addNodeRef(node) {
        this.nodeRefs.push(node);
    }

    componentDidUpdate() {
        if(this.props.canvasRef) {
            this.drawLineXY(0,0);
        }
    }

    updateLocation(id, x, y) {   
        const nodes = this.state.nodes;        
        nodes[id].location.x = x;
        nodes[id].location.y = y;

        this.setState({nodes: nodes});
    }

    render() {
        return (
            <div>
                <NodeConnectors canvasRef={this.canvasRef} 
                                nodes={this.state.nodes}
                                nodeConnections={this.state.nodeConnections}>
                    <canvas height={window.innerHeight} width={window.innerWidth} ref={this.canvasRef} style={{position: 'absolute', zIndex:-100 }}/>
                    {this.state.nodes && this.state.nodes.map((n, index) => 
                        <Node id={'node' + index} key={index} nodeKey={index} canvasRef={this.canvasRef} updateLocation={(id, x, y) => this.updateLocation(id, x, y)}/>
                    )}
                </NodeConnectors>
            </div>
        );
    }
}