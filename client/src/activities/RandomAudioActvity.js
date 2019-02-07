import React, { Component } from 'react';
import styled from 'styled-components';
import { each, shuffle } from 'lodash';
import { Button } from 'react-bootstrap';
import Sound from 'react-sound';

import FormInputRenderer from '../components/FormInputRenderer';
import { FaPlayCircle } from 'react-icons/fa';
import { PlainText } from '../components/Typography';
import { idFromString } from '../util';

// TODO: Clearly these are hard-coded. They should be loaded from the server
import alpaca from '../assets/alpaca.mp3';
import camel from '../assets/camel.mp3';
import llama from '../assets/llama.wav';

const NextButton = styled(Button)`
  float: right;
`;

// TODO: Make this a component. Grid is questionable.
const PlayButton = styled(Button)`
  display: grid;
  margin-bottom: 10px;
`;

const PlayIcon = styled(FaPlayCircle)`
  font-size: 30px;
`;

const setUpQuestions = (audioFiles, questions) => {
  const toReturn = {};
  each(questions, (question) => {
    each(audioFiles, (file) => {
      const questionId = `${file.split('.')[0]}.${idFromString(question.question)}`;
      const questionData = {
        type: question.type,
        audioFile: file
      };
      toReturn[questionId] = questionData;
    });
  });
  return toReturn;
};

const audioMap = {
  'alpaca.mp3': alpaca,
  'camel.mp3': camel,
  'llama.wav': llama
};

class RandomAudioActivity extends Component {

  state = {
    audioState: Sound.status.PAUSED,
    questions: setUpQuestions(
      this.props.activity.audioFiles,
      this.props.activity.questions
    ),
    // Shuffle the audio files. We will index into this in order
    // to produce random order.
    audioFiles: shuffle([...this.props.activity.audioFiles]),
    audioIndex: 0,
    activityComplete: false
  }

  handleValueUpdate = (questionId, questionData) => {
    //TODO: anything
  }

  getCurrentAudioFileName(){
    return this.state.audioFiles[this.state.audioIndex];
  }

  onNext(){
    const nextAudioIndex = this.state.audioIndex + 1;
    const activityComplete = nextAudioIndex >= this.props.activity.audioFiles.length;

    if (activityComplete) {
      this.setState({
        activityComplete: true
      });
    } else {
      this.setState({
        audioIndex: nextAudioIndex
      });
    }
  }

  playAudio = () => {
    this.setState({
      audioState: Sound.status.PLAYING
    });
  }

  handleAudioFinishedPlaying = () => {
    this.setState({
      audioState: Sound.status.PAUSED
    });
  }

  render() {
    console.log('INFO: form state on render:', JSON.stringify(this.state));

    return <div>
      <h1>{this.props.activity.title}</h1>
      <PlainText>
        {this.props.activity.helpText}
      </PlainText>
      <PlayButton
        bsStyle="primary"
        title="Play audio"
        onClick={this.playAudio}
      >
        <PlayIcon/>
      </PlayButton>
      <Sound
        url={audioMap[this.getCurrentAudioFileName()]}
        playStatus={this.state.audioState}
        onFinishedPlaying={this.handleAudioFinishedPlaying}
      />
      <FormInputRenderer
        questions={this.props.activity.questions}
        onValueChange={this.handleValueUpdate}
        values={this.state.questions}
      />
      <NextButton
          bsStyle="primary"
          onClick={() => this.onNext()}
        >
          Next
      </NextButton>
    </div>;
  }
}

export default RandomAudioActivity;
