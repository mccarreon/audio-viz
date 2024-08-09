import React, { useEffect, useState } from 'react';
import AudioVisualizer from './AudioVisualizer';

function AudioControls() {
  const [volume, setVolume] = useState("1");

  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();
  let audioElement: HTMLAudioElement | null;
  let track: MediaElementAudioSourceNode;
  let volumeControl : HTMLAudioElement | null;
  let analyser : AnalyserNode | null;

  useEffect(() => {
    audioElement = document.querySelector("audio");
    volumeControl = document.querySelector("#volume");

    if (audioElement) {
      track = audioContext.createMediaElementSource(audioElement);
      track.connect(gainNode).connect(audioContext.destination);
    }
    if (volumeControl) {
      volumeControl.addEventListener(
        "input",
        () => {
          gainNode.gain.value = volumeControl.value;
        },
        false,
      );
      }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const playButton = e.currentTarget
    if (audioElement && playButton) {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      
      if (playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
      }
    }
  }

  const handleVolume = (e : React.FormEvent<HTMLInputElement>) => {
    setVolume(e.currentTarget.value);
  }

  return (
    <>
      <audio src="src/assets/Project_4.wav"></audio>
      <button 
        data-playing="false" 
        role="switch" 
        aria-checked="false"
        onClick={handleClick}
      >
        <span>Play/Pause</span>
      </button>
      <input 
        type="range" 
        id="volume"
        min="0" 
        max="2" 
        value={volume} 
        step="0.01" 
        onChange={handleVolume}
      />
    </>
  )
}

export default AudioControls
