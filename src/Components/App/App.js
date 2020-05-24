import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name:'name1',
        album: 'album1',
        artist: 'artist1',
        id: 'id1'
      },
      {
        name:'name2',
        album: 'album2',
        artist: 'artist2',
        id: 'id2'
      }]
    }
  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults}/>
            <!-- Add a Playlist component -->
          </div>
        </div>
      </div>
    )
    
  }
}

export default App;
