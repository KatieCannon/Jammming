import React from 'react';
import './App.css';
import  SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

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
      playListTracks: [
        {
        name: 'playlistname1',
        artist: 'playlistartist1',
        album: 'playlistalbum1',
        id:' id1'
      }
    ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack =this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    if(this.state.playListTracks.find(track => track.id === track.id)) {
      return;
    }else {
      const tracks = this.state.playListTracks;
      tracks.push(track);
      this.setState({
        playListTracks: tracks
      });
    }
  }

  removeTrack(track) {
    const tracks = this.state.playListTracks.filter(playListTrack =>  playListTrack.id !== track.id);
    this.setState({
      playListTracks: tracks
    });
  }

  updatePlaylistName(name){
    this.setState({
      playListName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playListTracks.map(track => `spotify:track:${track.uri}`);
    return trackURIs;
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results})
    });
  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
    
  }
}

export default App;
