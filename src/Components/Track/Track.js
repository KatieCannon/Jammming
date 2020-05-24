import React from 'react';
import './Track.css';

class Track extends React.Component{
    constructor(props){
        super(props);
        this.onAddTrack = this.onAddTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    onAddTrack=this.props.onAdd(this.props.track);
    removeTrack = this.props.onRemove(this.props.track);
    renderAction() {
        return isRemoval ? <button className="Track-action" onClick={this.removeTrack}>-</button> : <button className="Track-action" onClick={this.onAddTrack}>+</button>;
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{renderAction()}</button>
            </div>
        )
    }
}

export default Track;