// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Recorder.css';


export default class Recorder extends Component {

  componentDidMount() {
  	if (this.props.displaySound) {
  		init();
  	}
  }

  render() {
    return (
    	<div className={styles.recorder} >
        <div className={styles.recordingLightWrapper}>
          <div className={styles.recordingLightOn} />
        </div>
        <div className={styles.visualizerWrapper}>

	        <svg className={styles.visualizer} preserveAspectRatio="none" id="visualizer" version="1.1" style={{textAlign: "center"}}>
	            <defs>

	                <mask id="mask">
	                    <g id="maskGroup">
	                  </g>
	                </mask>
	                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
	                    <stop offset="0%" style={{stopColor: "#ff0a0a", stopOpacity: 1 }} />
	                    <stop offset="20%" style={{stopColor: "#f1ff0a", stopOpacity: 1 }} />
	                    <stop offset="90%" style={{stopColor: "#d923b9", stopOpacity: 1 }} />
	                    <stop offset="100%" style={{stopColor: "#050d61", stopOpacity: 1 }} />
	                </linearGradient>
	            </defs>
	            <rect x="0" y="0" width="60vw" height="40vh" fill="url(#gradient)" mask="url(#mask)"></rect>
	        </svg>
        </div>  
			<h1></h1>
		</div>
    );
  }
}

var init = function () {
    "use strict";
    var visualizer = document.getElementById('visualizer');
    var mask = visualizer.getElementById('mask');
    var paths = mask.childNodes;

    console.log(mask.childNodes);
    var path;
    var report = 0;
    
    var soundAllowed = function (stream) {
        //Audio stops listening in FF without // window.persistAudioStream = stream;
        //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
        //https://support.mozilla.org/en-US/questions/984179
        window.persistAudioStream = stream;
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource( stream );
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        analyser.fftSize = 1024;

        var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        visualizer.setAttribute('viewBox', '0 0 255 255');
      
				//Through the frequencyArray has a length longer than 255, there seems to be no
        //significant data after this point. Not worth visualizing.
        for (var i = 0 ; i < 255; i++) {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-dasharray', '4,1');
            mask.appendChild(path);
        }
        var doDraw = function () {
            requestAnimationFrame(doDraw);
            analyser.getByteFrequencyData(frequencyArray);
          	var adjustedLength;
            for (var i = 0 ; i < 255; i++) {
              	adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
                paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
            }

        }
        doDraw();
    }

    var soundNotAllowed = function (error) {
        console.log(error);
    }

    /*window.navigator = window.navigator || {};
    /*navigator.getUserMedia =  navigator.getUserMedia       ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia    ||
                              null;*/
    navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

};
