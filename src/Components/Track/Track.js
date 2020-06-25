import React from 'react';
import './Track.css';

class Track extends React.Component{
    constructor(props){
        super(props);
        this.handleAddTrack = this.handleAddTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    handleAddTrack(){
         this.props.onAdd(this.props.track);
         this.props.onRemoveFromSearchList(this.props.track.id);
    }
    removeTrack(){
         this.props.onRemove(this.props.track);
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.handleAddTrack}>{this.props.isRemoval ? '-' : '+'} </button>
            </div>
        )
    }
}

export default Track;