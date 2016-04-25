import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

const AudioPlayer = ({audioUrl, timeUpdate}) => {
    return <audio autoPlay="autoplay" onTimeUpdate={timeUpdate}>
        <source src={audioUrl}/>
    </audio>
}

export default AudioPlayer;

