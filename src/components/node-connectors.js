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
            
            var connections = this.props.nodeItemConnections;
            var i;
            for (i = 0; i < connections.length; i++) {
                if(connections[i].nodeTo) {
                    this.drawLineXY(connections[i].nodeFrom,connections[i].nodeTo);
                }                
            }
        }
    }

    drawLineXY(fromXY, toXY) {
        const fromNode = this.getNode(fromXY);
        const toNode = this.getNode(toXY);

        if(fromNode && toNode) {
            var context = this.canvasRef.current.getContext('2d');    
            context.beginPath();
            context.moveTo(fromNode.x, fromNode.y);
            context.lineTo(toNode.x, toNode.y);
            context.stroke();
        }
    }

    getNode(id) {
        if(this.props.nodeItems) {            
            const nodes = this.props.nodeItems;
            const len = nodes.length;
                    
            var i;
            for (i = 0; i < len; i++) { 
                if(nodes[i].id === id) {    
                    return nodes[i];
                }
            }   
        }
    }

    render() {
        return <div 
        >{this.props.children}</div>;
    }
}