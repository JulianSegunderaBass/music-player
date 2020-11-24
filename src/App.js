import React, { useState } from 'react';
// Inport Styles
import './styles/app.scss';
// Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
// Import Util
import data from './util';

function App() {
    // State

    // Fetching the songs list
    const [songs, setSongs] = useState(data());
    // Setting a current song
    const [currentSong, setCurrentSong] = useState(songs[0]);
    // Checking if music is playing or not
    const [isPlaying, setIsPlaying] = useState(false);
    // For opening the library with the nav
    const [libraryStatus, setLibraryStatus] = useState(false);

    return (
        // For pushing the player to the right when library is open
        <div className={`App ${libraryStatus ? "library-open" : ""}`}>
            <Nav 
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song 
                currentSong={currentSong} 
            />
            <Player 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying} 
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                songs={songs} 
                setSongs={setSongs}
            />
            <Library 
                songs={songs} 
                setCurrentSong={setCurrentSong} 
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
        </div>
    );
}

export default App;
