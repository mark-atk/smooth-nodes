import React from 'react';

export class NodeConnectors extends React.Component {

    constructor(props) {
        super(props);     
        this.canvasRef = this.props.canvasRef;
    }        

    componentDidUpdate() {        
        if(this.props.canvasRef) {

            var context = this.canvasRef.current.getContext('2d');    
            context.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
            
            var connections = this.props.nodeConnections;
            var i;
            for (i = 0; i < connections.length; i++) {                
                this.drawLineXY(connections[i].nodeFrom,connections[i].nodeTo);
            }
        }
    }

    getNode(id) {
        if(this.props.nodes) {
            return this.props.nodes[id];
        }
    }

    drawLineXY(fromXY, toXY) {
        const fromNode = this.getNode(fromXY);
        const toNode = this.getNode(toXY);

        if(fromNode && toNode) {
            var context = this.canvasRef.current.getContext('2d');    
            context.beginPath();
            context.moveTo(fromNode.location.x, fromNode.location.y);
            context.lineTo(toNode.location.x, toNode.location.y);
            context.stroke();
        }
    }

    render() {
        return <div 
        >{this.props.children}</div>;
    }
}