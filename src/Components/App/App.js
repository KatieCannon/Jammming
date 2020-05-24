import React from 'react';
import './App.css';
import  SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
        name:'name1',
        album: 'album1',
        artist: 'artist1',
        id: 'searchid1'
      },
      {
        name:'name2',
        album: 'album2',
        artist: 'artist2',
        id: 'searchid2'
      }
    ],
      playListName: 'PlayListName',
      playList: [
        {
        name: 'name1',
        artist: 'artist1',
        album: 'album1',
        id:' id1'
      }
    ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack =this.removeTrack.bind(this);
  }
  addTrack(track){
    if(this.state.playList.find(track =>   track.id === track.id)) {
      return;
    }else {
      const tracks = this.state.playList;
      tracks.push(track);
      this.setState({
        playList: tracks
      });
    }
  }

  removeTrack(track) {
    const tracks = this.state.playList.filter(playListTrack =>  playListTrack.id !== track.id);
    this.setState({
      playListTracks: tracks
    });
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playList} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
    
  }
}

export default App;
