import React, { Component } from 'react';
import styled from 'styled-components';
import { each, shuffle } from 'lodash';
import { Button } from 'react-bootstrap';
import Sound from 'react-sound';

import FormInputRenderer from '../components/FormInputRenderer';
import { PlainText } from '../components/Typography';
import { idFromString } from '../util';

const NextButton = styled(Button)`
  float: right;
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

  render() {
    console.log('INFO: form state on render:', JSON.stringify(this.state));

    return <div>
      <h1>Llama</h1>
      <PlainText>
        {this.getCurrentAudioFileName().split('.')[0]}
      </PlainText>
      <Button
       onClick={this.playAudio}
      >
        Play
      </Button>
      <Sound
        url="http://urlserveurs.free.fr/sound/misc/ooorgle.wav"
        playStatus={this.state.audioState}
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
