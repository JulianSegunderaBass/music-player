import React, { useState } from 'react';
// Inport Styles
import './styles/app.scss';
// Adding Components
import Player from './components/Player';
import Song from './components/Song';
// Import Util
import data from './util';

function App() {
    // State

    // Fetching the songs list
    const [songs, setSongs] = useState(data());
    // Setting a current song
    const [currentSong, setCurrentSong] = useState(songs[0]);
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player />
        </div>
    );
}

export default App;
