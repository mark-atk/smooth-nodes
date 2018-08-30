import React from 'react';

export class Draggable extends React.Component {
    state = {
        relX: this.props.x,
        relY: this.props.y
    };

    constructor(props) {
        super(props);        
        this.draggableRef = React.createRef();

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        
        this.state = {
            relX: props.x,
            relY: props.y
        };
    }

    onMouseDown(e) {
        if(e.button !== 0) return;
        
        const body = document.body;  
        const box = this.draggableRef.current.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
        });
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    onMouseUp(e) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      e.preventDefault();
    }

    onMouseMove(e) {
        this.props.onMove({
            x: e.pageX - this.state.relX,
            y: e.pageY - this.state.relY
        });
        e.preventDefault();
    }

    render() {
        return <div 
        ref={this.draggableRef}
        onMouseDown={this.onMouseDown}
        style={{
            position: 'absolute',
            left: this.props.x,
            top: this.props.y
        }}
        >{this.props.children}</div>;
    }
}

export default Draggable;