// Structure of a song in the Library

import React from 'react';

const LibrarySong = ({ song, songs, setCurrentSong, setSongs, id }) => {

    // For selecting a new song
    const songSelectHandler = () => {
        setCurrentSong(song);
        // Adding active state
        const newSongs = songs.map((song) => {
            // Map through each song and check for id
            // Changes the active states
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        // Setting the song data state to the new array with updated active states
        setSongs(newSongs);
    }

    return (
        <div className={`library-song ${song.active ? 'selected' : ""}`} onClick={songSelectHandler} >
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;