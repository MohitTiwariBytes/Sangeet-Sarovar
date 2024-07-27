import React, { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const playAudio = (audio) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
    }
    setCurrentAudio(audio);
    audio.play();
  };

  const pauseAudio = (audio) => {
    if (currentAudio === audio) {
      audio.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
