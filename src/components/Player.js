// Controls for the music player

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying }) => {
    // Use Ref in action to access audio HTML tag
    const audioRef = useRef(null);

    // Event Handlers

    // Playing the current song
    const playSongHandler = () => {
        // .current accesses the actual audio link
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const activeLibraryHandler = (nextPrevious) => {
        const newSongs = songs.map((song) => {
            // Map through each song and check for id
            // Changes the active states
            if (song.id === nextPrevious.id) {
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

    // For creating the usable time bar
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    // Skipping through the music list
    const skipTrackHandler = (direction) => {
        // Comparing song ids with current song id to find current index
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            // The modulus operation brings the index back to 0
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                // When the song index tried to go to -1, set current song to last song in list
                setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                // Return so the following function no longer runs
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
    }

    // Updating Time Bar
    const timeUpdateHandler = (e) => {
        // Updating song info state as song plays
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration})
    }

    // Autoplaying audio on load
    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }

    // Formating the time value
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    return (
        <div className="player">
            {/* div for the time bar slider */}
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler} 
                    type="range" 
                />
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            {/* div for the music control buttons */}
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')}
                    className="skip-back" 
                    size="2x" 
                    icon={ faAngleLeft } 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={ isPlaying ? faPause : faPlay  } 
                />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="skip-forward" 
                    size="2x" 
                    icon={ faAngleRight } 
                />
            </div>
            {/* Passing in the audio of the current song */}
            {/* ref property connects to ref in the function */}
            <audio 
                onLoadedData={autoPlayHandler} 
                onEnded={() => skipTrackHandler('skip-forward')}
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler} 
                ref={audioRef} 
                src={currentSong.audio}>
            </audio>
        </div>
    );
}

export default Player;