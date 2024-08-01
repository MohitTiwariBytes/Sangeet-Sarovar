import React, { useState, useEffect, useRef } from "react";
import "./BottomBar.css";
import questionMarkImg from "../assets/questionMark.png";

let currentAudio = null;

const BottomBar = ({ dataToSend }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const audioRef = useRef(null);
  const durationRef = useRef(0);
  const currentDataToSend = useRef(dataToSend);

  useEffect(() => {
    if (dataToSend.url) {
      const audio = new Audio(dataToSend.url);
      audioRef.current = audio;

      audio.addEventListener("loadedmetadata", () => {
        durationRef.current = audio.duration;
      });

      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
      };
    }
  }, [dataToSend.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Set volume of the audio element
      if (isPlaying) {
        if (currentAudio && currentAudio !== audioRef.current) {
          currentAudio.pause();
        }
        currentAudio = audioRef.current;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        if (currentAudio === audioRef.current) {
          currentAudio = null;
        }
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    if (currentDataToSend.current.url !== dataToSend.url && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      currentDataToSend.current = dataToSend;
    }
  }, [dataToSend]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setValue(audioRef.current.currentTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleChange = (input) => {
    const minutes = Math.floor(input / 60);
    const seconds = input % 60;
    document.getElementById("minutes").innerText = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").innerText = String(seconds).padStart(
      2,
      "0"
    );
  };

  const handleSliderChange = (e) => {
    const input = parseInt(e.target.value, 10);
    setValue(input);
    handleChange(input);
    if (audioRef.current) {
      audioRef.current.currentTime = input;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="main-bottombar">
      <div className="bottombar">
        <div className="left">
          <div className="songCoverSmall">
            <img
              height="80px"
              style={{ borderRadius: "20px" }}
              src={dataToSend.album || questionMarkImg}
              alt={dataToSend.name || "Song Cover"}
            />
          </div>

          <div className="songInfo">
            <h1>{dataToSend.name || "Song Name"}</h1>
            <span>By {dataToSend.artist || "Artist Name"}</span>
          </div>

          <div className="controls">
            <div className="playButton">
              <button onClick={handleClick}>
                <i
                  style={{ color: "black" }}
                  className={
                    isPlaying
                      ? "fa-solid fa-pause fa-2x"
                      : "fa-solid fa-play fa-2x"
                  }
                ></i>
              </button>
            </div>
            <div className="slider">
              <input
                onChange={handleSliderChange}
                type="range"
                max={durationRef.current}
                min="0"
                id="slider"
                value={value}
              />
              <span>
                <h1 id="minutes">00</h1>
                <h1>:</h1>
                <h1 id="seconds">00</h1>
              </span>
            </div>
            <div className="volume">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
              <i
                style={{ color: "white" }}
                className="fa-solid fa-volume-high fa-2x"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
