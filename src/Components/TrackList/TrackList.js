import React from 'react';
import './TrackList.css';
import Track  from '../Track/Track';

class TrackList extends React.Component{
    render(){
        return (
            <div className="TrackList">
                 {this.props.tracks.map(track => {
                     return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemoveFromSearchList={this.props.onRemoveFromSearchList} onRemoveFromSearchList={this.props.onRemoveFromSearchList} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                 })}
            </div>
        )
    }
}

export default TrackList;