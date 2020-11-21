// Controls for the music player

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
    return (
        <div className="player">
            {/* div for the time bar slider */}
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            {/* div for the music control buttons */}
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={ faAngleLeft } />
                <FontAwesomeIcon className="play" size="2x" icon={ faPlay } />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={ faAngleRight } />
            </div>
        </div>
    );
}

export default Player;