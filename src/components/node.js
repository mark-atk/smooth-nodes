import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Draggable from '../utils/draggable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NodeItem from './node-item';
import { guid } from '../utils/guid';

export class Node extends React.Component {

    state = {
        items: [],
        x: 100,
        y: 100
    };
    
    constructor(props) {
        super(props);
        
        //These are just for adding dummy data, can be removed.
        const nodeItemsNew = [];
        
        var i;
        for (i = 0; i < 3; i++) { 
            var uuid = guid();
            const nodeItem = { id: uuid, nodeId: props.id, x: 0, y: 0 };
            nodeItemsNew.push(nodeItem);
            this.props.addNodeItem(nodeItem);
        }

        this.state = {
            items: nodeItemsNew,
            key: props.id
        };
    }

    move = (e) =>  {
        this.setState(e);

        if(this.state.items) {
            var i;
            for (i = 0; i < this.state.items.length; i++) {
                this.refs[this.state.items[i].id].updateItemLocations();
            }   
        }
    }

    updateListItemLocation = (id, x, y) => {
        const items = this.state.items;
        const len = items.length;
                
        var i;
        for (i = 0; i < len; i++) {
            if(items[i].id === id) {    
                items[i].x = x;
                items[i].y = y;
            }
        }   

        this.props.updateLocation(id, x, y);
        this.setState({ items: items});
    }

    render() {      
        const {x, y} = this.state;  

        return (
        <Draggable x={x} y={y} onMove={this.move}>            
            <Card style={{width: "240px"}}>
                <CardContent>
                    <Typography variant="headline">
                        Node {this.state.key.substring(0,5)}
                    </Typography>
                    <Typography>
                        Node Item
                    </Typography>
                    <List>
                            {this.state.items && this.state.items.map((i) =>       
                            <ListItem key={i.id}>                          
                            <NodeItem ref={i.id}           
                                    id={i.id} 
                                    nodeLocation={this.state.x}
                                    updateLocation={this.updateListItemLocation} />
                            </ListItem>
                            )}
                    </List>
                </CardContent>
            </Card>
        </Draggable>
        )
    }
}

export default Node;