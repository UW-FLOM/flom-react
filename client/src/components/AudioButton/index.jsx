// https://stackoverflow.com/a/47686478

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const useAudio = (src) => {
  const [audio] = useState(new Audio(src));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => { if (playing) { audio.play(); } else { audio.pause(); } }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioButton = function AudioButton({ src }) {
  AudioButton.propTypes = {
    src: PropTypes.string.isRequired,
  };
  const [playing, toggle] = useAudio(src);

  return (
    <div>
      <Button onClick={toggle}>{playing ? 'Pause' : 'Play'}</Button>
    </div>
  );
};

export default AudioButton;
