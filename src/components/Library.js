// The Library List of other songs

import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, setSongs, libraryStatus }) => {
    return(
        // Checking library status and toggling the active class
        <div className={`library ${libraryStatus ? 'active-library': ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
            {/* Mapping through the list of songs and creating library items */}
                {songs.map(song => (
                    <LibrarySong 
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        setSongs={setSongs}
                        song={song} 
                        id={song.id} 
                        key={song.id} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;