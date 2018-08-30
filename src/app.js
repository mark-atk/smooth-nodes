import React from 'react';
import { Node } from './components/node';
import { NodeConnectors } from './components/node-connectors';
import { guid } from './utils/guid';

export class App extends React.Component {

    state = {
        nodes: [],
        nodeItems: [],
        nodeItemConnections: []
    };

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.prevNodeItem = {};

        //These are just for adding dummy data, can be removed.
        const nodesNew = [];
        const nodeConnectionsNew = [];
        
        var i;
        for (i = 0; i < 3; i++) { 
            var uuid = guid();
            nodesNew.push({ id: uuid, x:0, y: 0});
        }

        this.state = {nodes: nodesNew,
            nodeItems: [],
            nodeItemConnections: nodeConnectionsNew};
    }

    updateLocation(id, x, y) {   
        const nodeItems = this.state.nodeItems;
        const len = nodeItems.length;
                
        var i;
        for (i = 0; i < len; i++) { 
            if(nodeItems[i].id === id) {    
                nodeItems[i].x = x;
                nodeItems[i].y = y;
            }
        }   

        this.setState({nodeItems: nodeItems});
    }

    addNodeItem(item) {
        const nodeItems = this.state.nodeItems;
        const nodeItemConnections = this.state.nodeItemConnections;

        nodeItems.push(item);
        nodeItemConnections.push({nodeFrom: item.id, nodeTo: this.prevNodeItem.id ? this.prevNodeItem.id : ''});

        this.setState({nodeItems: nodeItems});

        this.prevNodeItem = item;
    }

    render() {
        return (
            <div>
                <NodeConnectors canvasRef={this.canvasRef} 
                                nodeItems={this.state.nodeItems}
                                nodeItemConnections={this.state.nodeItemConnections}>
                    <canvas height={window.innerHeight} width={window.innerWidth} ref={this.canvasRef} style={{position: 'absolute', zIndex:-100 }}/>
                    {this.state.nodes && this.state.nodes.map((n) => 
                        <Node id={n.id} 
                            key={n.id} 
                            canvasRef={this.canvasRef} 
                            addNodeItem={(item) => this.addNodeItem(item)}
                            updateLocation={(id, x, y) => this.updateLocation(id, x, y)}/>
                    )}
                </NodeConnectors>
            </div>
        );
    }
}