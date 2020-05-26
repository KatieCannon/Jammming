const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://playlist_app.surge.sh/";
let accessToken;
const Spotify = {
    getAccessToken(){
     
        if(accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } 
         else {
             const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
             window.location = accessUrl;
         }
        
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                )
            )}
            
        })
    },

    savePlaylist(playListName, trackURIs){
        if(!playListName || !trackURIs) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
        return fetch('https://api.spotify.com/v1/me', 
        {
            headers: headers
        }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
           userId = jsonResponse.id;
           return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
           {
               headers: headers,
               method: 'POST',
               body: JSON.stringify({name: playListName})
           }).then(response => {
               return response.json();
           }).then(jsonResponse => {
               const playListId = jsonResponse.id;
               return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
               {
                   headers: headers,
                   method: 'POST',
                   body: JSON.stringify({uris: trackURIs})
               })
           })
        })
    }
};

export default Spotify;