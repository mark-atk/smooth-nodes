import React from 'react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

export class NodeItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.locationRef = React.createRef();
    }    

    componentDidMount() {
        if(this.locationRef) {
            const box = this.locationRef.current.getBoundingClientRect();
            this.props.updateLocation(this.props.id, box.left, box.top);
        }
    }

    updateItemLocations() {
        if(this.locationRef) {
            const box = this.locationRef.current.getBoundingClientRect();
            this.props.updateLocation(this.props.id, box.left, box.top);
        }
    }

    render() { 
        return(
            <div>
                <span ref={this.locationRef}>
                    {this.props.nodeLocation}
                    <Radio color="primary"/>
                </span>
            </div>
        );
    }

}

export default NodeItem;