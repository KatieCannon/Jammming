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
      searchResults: [],
      playListName: 'My Playlist',
      playListTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack =this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.removeFromSearchList = this.removeFromSearchList.bind(this);
  }
  addTrack(track){
    if(this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
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
    const trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
       this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      });
    });
  }

  async handleSearch(term) {
    const searchResults = await Spotify.search(term);
    const playListTrackIds = this.state.playListTracks.map(track => track.id);
    const filteredSearchResults = searchResults.filter(searchListTrack => {
        return !playListTrackIds.includes(searchListTrack.id);
    });
    this.setState({
      searchResults: filteredSearchResults
    });
  }

  removeFromSearchList(trackId){
      const filteredSearchResults=this.state.searchResults.filter(searchListTrack => {
        return searchListTrack.id !== trackId;
      });
      this.setState({
        searchResults: filteredSearchResults
      });
  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.handleSearch}/>
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemoveFromSearchList={this.removeFromSearchList}/>
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
    
  }
}

export default App;
