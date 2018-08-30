import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Draggable from '../utils/draggable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NodeItem from './node-item';

export class Node extends React.Component {

    state = {
        x: 100,
        y: 100
    };
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        };
    }

    move = (e) =>  {        
        this.setState(e);
    }

    render() {
        const {x, y} = this.state;
        return(
            <Draggable x={x} y={y} onMove={this.move}>            
                <Card id="cardX" style={{width: "240px"}}>
                    <CardContent>
                        <Typography variant="headline">
                            Node {this.props.id}
                        </Typography>
                        <Typography>
                            Node Item
                        </Typography>
                        <List>
                            <ListItem>
                                <NodeItem canvasRef={this.props.canvasRef}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Draggable>
        )
    }

}

export default Node;