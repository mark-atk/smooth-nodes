import React from 'react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

export class NodeItem extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.radioRef = React.createRef();
        this.canvasRef = this.props.canvasRef;
    }    

    componentDidUpdate() {
        if(this.props.canvasRef) {
            this.drawLineXY(0,0);
        }
    }

    drawLineXY(fromXY, toXY) {
        const point1Box = this.radioRef.current.getBoundingClientRect();
        var context = this.canvasRef.current.getContext('2d');

        context.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        context.beginPath();
        context.moveTo(5.5, 0);
        context.lineTo(point1Box.left, point1Box.top);
        context.stroke();
    }

    render() { 
        return(
            <div>
                <Typography>
                    Node Item
                </Typography>
                <span ref={this.radioRef}>
                    <Radio color="primary"/>
                </span>
            </div>
        );
    }

}

export default NodeItem;