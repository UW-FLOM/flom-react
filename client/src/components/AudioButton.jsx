// https://stackoverflow.com/a/47686478

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const useAudio = (src) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
  [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioButton = ({ src }) => {
  const [playing, toggle] = useAudio(src);

  return (
    <div>
      <Button onClick={toggle}>{playing ? 'Pause' : 'Play'}</Button>
    </div>
  );
};

export default AudioButton;
